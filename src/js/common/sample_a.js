/**
 * common.js - sample_a.js
 * Author: sekiya
 * ---------------------------------------------------------------------- */
// run
$(function () {
  sampleA.init();
  sampleFunction1();
});

// sample A module
let sampleA = {
  init: function () {
    Utility.console('A');
  }
};

// sample function
function sampleFunction1 () {
  var hoge1 = 1;
  var huga1 = 2;
}
