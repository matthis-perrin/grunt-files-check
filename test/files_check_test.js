'use strict';

var grunt = require('grunt');

exports.files_check = {

  setUp: function (done) {
    // setup here if necessary
    done();
  },

  test: function (test) {

    test.expect(1);

    test.equal(1, 1, 'should pass this dummy test.');

    test.done();
  }

};
