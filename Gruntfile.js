/*
 * grunt-files-check
 * https://github.com/matthis-perrin/grunt-files-check
 *
 * Copyright (c) 2013 Matthis Perrin
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>',
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp'],
    },

    // Configuration to be run (and then tested).
    files_check: {

      basic: {
        options: {
          patterns: [ '[0-9]', '\\@todo' ]
        },
        src: ['test/fixtures/**/*']
      },

      basicOneError: {
        options: {
          patterns: [ '[0-9]', '\\@todo' ]
        },
        src: ['test/fixtures/one-error']
      },

      excluded: {
        options: {
          excluded: ['test/fixtures/multiple-error'],
          patterns: [ '[0-9]', '\\@todo' ]
        },
        src: ['test/fixtures/**/*']
      },

      verbose: {
        options: {
          patterns: [ '[0-9]', '\\@todo' ],
          verbose: true
        },
        src: ['test/fixtures/**/*']
      },

      withoutParams: {
        options: {
        },
        src: ['test/fixtures/**/*']
      },

      success: {
        options: {
          patterns: [ '[0-9]', '\\@todo' ]
        },
        src: ['test/fixtures/no-error']
      },

      saveIntoFile: {
        options: {
          patterns: [ '[0-9]', '\\@todo' ],
          output: 'tmp/todo-notes.txt'
        },
        src: ['test/fixtures/multiple-error']
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js'],
    },

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'files_check']);

};
