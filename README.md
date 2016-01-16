# grunt-files-check

> Grunt plugin to apply regular expressions on files and check their validity.

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-files-check --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-files-check');
```

## The "files_check" task

### Overview
In your project's Gruntfile, add a section named `files_check` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  files_check: {
    your_target: {
      options: {
        patterns: [ /* your regex array */ ]
      },
      src: /* the files that will be checked */
    },
  },
})
```

### Options

#### options.patterns
Type: `String[]`
Default value: `[ '^$' ]`

An array of regex strings that will by applied on every file.
**Note:** Regex string require escaping. Therefore, `\@todo` need to be ```\\@todo``` and similar.

#### options.excluded
Type: `Array`
Default value: `[]`

An array which contains the files that will not be checked

#### options.verbose
Type: `Array`
Default value: `false`

When set to `true` the task will display the files that have been checked.

#### options.maxFileNameWidth
Type: `Integer`
Default value: `40`

Define the max width used to display a file name in the output. When the file is too long, ellipsis -> '...' are written.

#### options.output
Type: `String`
Default value: null

Define file name where log content will be saved.

### Usage Examples

#### Check for `console.log`
In this example, we check every js files in the `app/scripts` folder to ensure that there no `console.log` anymore. We exclude the `app/scripts/debug` which contains files we do not want to check.

```js
grunt.initConfig({
  console_log: {
    your_target: {
      options: {
        excluded: ['app/scripts/debug/**/*.js'],
        pattern: [
          'console\\.log' // there should be no more logs
        ]
      },
      src: ['app/scripts/**/*.js']
    },
  },
})
```

#### Check for `console.log` with output formatting
Same example as the previous one, except that we are going to format the output. We display the files that have been checked with the option `verbose: true` and we fix the max width used to display files name to 100 characters (large console) with the option `maxFileNameWidth: 100`.

```js
grunt.initConfig({
  console_log: {
    your_target: {
      options: {
        excluded: ['app/scripts/debug/**/*.js'],
        pattern: [
          'console\\.log'  // there should be no more logs
        ],
        verbose: true,
        maxFileNameWidth: 100
      },
      src: ['app/scripts/**/*.js']
    },
  },
})
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).
