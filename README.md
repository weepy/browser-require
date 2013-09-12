browser-require
===============

CommonJS for the browser in less than 80 lines. Works (pretty much) just like Node's require.


Include in your page
--------------------

```
  <script src='require.js'></script>
  <script>
    var app = require("./app")
    var libs = require("./path/to/file")
  </script>
```

Prebuild
--------

`require` uses sync XHR to fetch unresolved dependencies. Fine for development, but you probably want to package them up for production.

You can do this like so:

  bin/build path/to/src.js >> path/to/package.js


Notes
-----

* Currently doesn't try to load from /index.js (unlike node)

* `build` uses static analysis, meaning that dynamic filenames won't work.

* uses XHR, so you need to serve local files or turn off web security


Test
----

* dev mode

  1. serve -p 3000
  2. goto http://localhost:3000/test/test.html
  3. check the console

* test build

  1. bin/build test/b >> test/_build.js
  2. serve -p 3000
  3. goto http://localhost:3000/test/test.html
  4. check the console
