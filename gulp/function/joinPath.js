'use strict';
/**
 * 渡された値をパスに結合して返す
 * @return string
 */
module.exports = function () {
  var args  = Array.prototype.slice.call(arguments),
      len   = args.length,
      paths = [];

  for (var i = 0; i < len; i++) {
    if (args[i]) {
      var path = args[i].trim().replace(/^\/+|\/+$/g,'');
      paths.push(path);
    }
  }
  return paths.join('/');
};
