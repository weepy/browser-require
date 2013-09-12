// CommonJS require() 
// monkey patched from version in visionmedia/mocha
// (which was in turn based on original by weepy #justsaying)
// added lines are commented

function require(p) {
    var path = require.resolve(p)
      , mod = require.modules[path];

    // following line added by weepy
    if (!mod) mod = require.load(path); 

    if (!mod) throw new Error('failed to require "' + p + '"');

    if (!mod.exports) {
      mod.exports = {};
      mod.call(mod.exports, mod, mod.exports, require.relative(path));
    }
    return mod.exports;
  }

require.modules = {};

require.resolve = function (path){
    var orig = path
      , reg = path + '.js'
      , index = path + '/index.js';
    return require.modules[reg] && reg
      || require.modules[index] && index
      || orig;
  };

require.register = function (path, fn){
    require.modules[path] = fn;
  };

require.relative = function (parent) {
    return function(p){
      if ('.' != p.charAt(0)) return require(p);

      var path = parent.split('/')
        , segs = p.split('/');
      path.pop();

      for (var i = 0; i < segs.length; i++) {
        var seg = segs[i];
        if ('..' == seg) path.pop();
        else if ('.' != seg) path.push(seg);
      }

      return require(path.join('/'));
    };
  };


// following added by weepy
require.load = function( path ) {
    var request = new XMLHttpRequest();
    request.open('GET', path + '.js', false);
    request.send();    
    
    var src = "require.register('" + path + "', function(module, exports, require) {\n\n" + request.responseText + "\n\n}); //@ sourceURL=" + path + '.js'

    window.execScript
      ? window.execScript( src ) // IE
      : window['eval'].call(null, src);

    return require.modules[ path ];
  }

this.require = require;