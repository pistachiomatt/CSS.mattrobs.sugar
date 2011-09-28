/*
Sorts selected lines ascending or descending

action.setup:
	- direction (string): 'asc', 'desc', 'random'
	- removeDuplicates (bool): if true, will remove duplicate lines
*/

var utils = loadLibrary('tea-utils');
var utils2 = loadLibrary('jq');

action.performWithContext = function(context, outError) {
	// Check if there's a selection, otherwise use all lines
	var ranges = context.selectedRanges;
//	if (ranges.length === 1 && ranges[0].length === 0) {
//		ranges = [new Range(0, context.string.length)]; // select everything
//	}

  // the page: context.string
  // a range is a selection. use to replace stuff
  
  
	// Setup our recipe
	var recipe = new CETextRecipe();
	
	
	
	
  
  // Init variabes used in loop
  var text, range, lines, numLines, j, line, result;
  // Loop over the ranges and process them
  var count = ranges.length;
  for (var i = 0; i < count; i++) {
  	range = ranges[i]; // an array of the selected text or cursor position
  	
  	var everythingUpToInsertionPoint = context.string.substr(0,parseInt(range.toString().split('{')[1].split(',')[0]));

    
    var array = everythingUpToInsertionPoint.split('{');
    
    var out = array[array.length-2].split('}')[1];
    
    // trim whitespace
    out = out.replace(/^\s+|\s+$/g, '');
    
    // Insert the text back into the document
    recipe.replaceRange(range, out.toString());
    
    
  }
	
	
	// Add an undo name if there is one
	if (action.setup.undoName) {
		recipe.undoActionName = action.setup.undoName;
	}
	
	// Return false if nothing was selected or changed
	recipe.prepare;
	if (recipe.numberOfChanges === 0) {
		return false;
	}
	// Apply the recipe
	return context.applyTextRecipe(recipe);
};