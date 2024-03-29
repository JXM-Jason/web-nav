// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"epB2":[function(require,module,exports) {
var $lastli = $('.last'); //这是最后一个li内容为新增网址

var $sitelist = $('.sitelist'); //这是所有的li的父级ul

var x = localStorage.getItem('x');
var xObject = JSON.parse(x);
var hashMap = xObject || [{
  logo: 'a',
  url: 'https://www.acfun.cn/'
}, {
  logo: 'b',
  url: 'https://www.bilibili.com/'
}, {
  logo: 'j',
  url: 'https://juejin.cn/'
}, {
  logo: 'z',
  url: 'https://zh.javascript.info/'
}, {
  logo: 'd',
  url: 'https://developer.mozilla.org/zh-CN/'
}]; //简化URL

var simplifyUrl = function simplifyUrl(url) {
  return url.replace('https://', '').replace('http://', '').replace('www.', '').replace(/\/.*/, ''); //使用正则表达式简化/后面的内容
};

var render = function render() {
  $sitelist.find('li:not(.last)').remove();
  hashMap.forEach(function (node, index) {
    var $li = $(" \n            <li>\n                <div class=\"site\">\n                    <div class=\"logo\">".concat(node.logo[0], "</div>\n                    <div class=\"link\">").concat(simplifyUrl(node.url), "</div>\n                    <div class=\"close\">\n                        <svg class=\"icon\">\n                            <use xlink:href=\"#icon-close\"></use\n                        </svg>\n                    </div>\n                </div>\n            </li>")).insertBefore($lastli);
    $li.on('click', function (e) {
      window.open(node.url);
    });
    $li.on('click', '.close', function (e) {
      e.stopPropagation();
      hashMap.splice(index, 1);
      render();
    });
  });
};

render();
$('.input').focus(function () {
  console.log("jxmxjm");
});
$('.addButton').on('click', function () {
  //获取网址
  //不能有中文
  var url = window.prompt('请输入网址！');

  if (/.*[\u4e00-\u9fa5]+.*$/.test(url)) {
    url = null;
    alert("请按照网站的形式输入，不能包含中文！");
  } else if (url.indexOf('http') !== 0) {
    url = 'http://' + url;
  } //生成新的li并放在最后一个li的前面


  hashMap.push({
    logo: simplifyUrl(url)[0],
    url: url
  });
  render();
});

window.onbeforeunload = function () {
  //将哈希变成字符串存储
  var string = JSON.stringify(hashMap);
  window.localStorage.setItem('x', string);
};

{
  /* 
  <svg class="icon">
     <use xlink:href="#icon-diandian"></use>
  </svg> */
}
$(document).on('keypress', function (e) {
  var key = e.key; //可以简写为 const{key} =e;

  for (var i = 0; i < hashMap.length; i++) {
    if (hashMap[i].logo.toLowerCase() === key) {
      window.open(hashMap[i].url);
    }
  }
});
},{}]},{},["epB2"], null)
//# sourceMappingURL=/main.49940b13.js.map