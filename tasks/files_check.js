/*
 * grunt-files-check
 * https://github.com/matthis-perrin/grunt-files-check
 *
 * Copyright (c) 2013 Matthis Perrin
 * Licensed under the MIT license.
 */

'use strict';

var colors = require('colors');

module.exports = function(grunt) {

  grunt.registerMultiTask('files_check', 'Your task description goes here.', function() {

    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      excluded: [],
      pattern: /^$/,
      verbose: false
    });

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {

      // Filtering of the files described in the `src` option by 
      // removing those specified in the `excluded` option and those
      // which do not exist.
      var files = f.src.filter(function(filepath) {
        if (!grunt.file.exists(filepath)) {
          return false;
        }
        else if (inArray(filepath, options.excluded)) {
          return false;
        }
        else {
          return true;
        }
      });



      // When calculate the max size of files name.
      // This is useful for the error display.
      var maxSize = 0;
      for (var i = 0; i < files.length; i++) {
        var lineNumber = files[i].split(/\r?\n/).length;
        var fileNameSize = files[i].length + 1 + lineNumber.toString().length; // max length of 'fileName:lineNumber'
        if (fileNameSize > maxSize) {
          maxSize = fileNameSize;
        }
      }



      // Then we apply the regex on the files
      var incorrect = 0;
      for (i = 0; i < files.length; i++) {

        // Get the content of the file
        var fileName = files[i];
        var fileContent = grunt.file.read(fileName);

        // Extract each line of the file
        var fileLines = fileContent.split(/\r?\n/);

        // Applying the regex on every line
        var fileCorrect = true;
        for (var j = 0; j < fileLines.length; j++) {

          // Apply the regex on the line
          var matchResult = fileLines[j].match(options.pattern);
          
          // Check if there is a match
          if (matchResult !== null) {

            // Update the tracking variables
            fileCorrect = false;
            incorrect++;

            // Displaying the error in the console
            var fileNameFormatted = fileName + ':' + j;
            fileNameFormatted += new Array(maxSize - fileNameFormatted.length + 1).join(" "); // Append remaining spaces
            grunt.log.error(fileNameFormatted + '   found \'' + matchResult[0] + '\' in the line \'' + matchResult.input + '\'');

          }
        }

        // If the file is correct, we display a message in the console (only in verbose mode)
        if (fileCorrect && options.verbose) {
          fileName += new Array(maxSize - fileName.length + 1).join(" "); // Append remaining spaces
          grunt.log.ok(fileName + '   OK'.green);
        }

      }
      

      // Display the final message
      if (incorrect > 0) {
        var message = incorrect + ' error' + (incorrect > 1 ? 's' : '') + ' found.';
        grunt.fail.warn(message);
      }
      else {
        grunt.log.ok(files.length + ' file' + (files.length > 1 ? 's' : '') + ' correct');
      }

    });
  });




  // ----------------------------------------
  // Return true if `value` is present in the
  // array `array`
  // ----------------------------------------
  function inArray(value, array) {

    if (typeof array === 'undefined') {
      return false;
    }

    for (var i = 0; i < array.length; i++) {
      if (value === array[i]) {
        return true;
      }
    }

    return false;

  }

};
