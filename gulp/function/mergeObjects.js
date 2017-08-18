'use strict';
/**
 * Object を結合して返す
 * @return {Object}
 */
module.exports = function () {
  var args = Array.prototype.slice.call(arguments),
    len = args.length,
    obj = {},
    item;

  for (var i = 0; i < len; i++) {
    var arg = args[i];
    for (item in arg) {
      if (arg.hasOwnProperty(item)) {
        obj[item] = arg[item];
      }
    }
  }
  return obj;
};
