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
})({"node_modules/reveal.js/dist/reveal.esm.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/*!
* reveal.js 4.1.0
* https://revealjs.com
* MIT licensed
*
* Copyright (C) 2020 Hakim El Hattab, https://hakim.se
*/
const e = /registerPlugin|registerKeyboardShortcut|addKeyBinding|addEventListener/,
      t = /fade-(down|up|right|left|out|in-then-out|in-then-semi-out)|semi-fade-out|current-visible|shrink|grow/,
      i = (e, t) => {
  for (let i in t) e[i] = t[i];

  return e;
},
      a = (e, t) => Array.from(e.querySelectorAll(t)),
      n = (e, t, i) => {
  i ? e.classList.add(t) : e.classList.remove(t);
},
      s = e => {
  if ("string" == typeof e) {
    if ("null" === e) return null;
    if ("true" === e) return !0;
    if ("false" === e) return !1;
    if (e.match(/^-?[\d\.]+$/)) return parseFloat(e);
  }

  return e;
},
      o = (e, t) => {
  e.style.transform = t;
},
      r = (e, t) => {
  let i = e.matches || e.matchesSelector || e.msMatchesSelector;
  return !(!i || !i.call(e, t));
},
      l = (e, t) => {
  if ("function" == typeof e.closest) return e.closest(t);

  for (; e;) {
    if (r(e, t)) return e;
    e = e.parentNode;
  }

  return null;
},
      d = (e, t, i, a = "") => {
  let n = e.querySelectorAll("." + i);

  for (let t = 0; t < n.length; t++) {
    let i = n[t];
    if (i.parentNode === e) return i;
  }

  let s = document.createElement(t);
  return s.className = i, s.innerHTML = a, e.appendChild(s), s;
},
      c = e => {
  let t = document.createElement("style");
  return t.type = "text/css", e && e.length > 0 && (t.styleSheet ? t.styleSheet.cssText = e : t.appendChild(document.createTextNode(e))), document.head.appendChild(t), t;
},
      h = () => {
  let e = {};
  location.search.replace(/[A-Z0-9]+?=([\w\.%-]*)/gi, t => {
    e[t.split("=").shift()] = t.split("=").pop();
  });

  for (let t in e) {
    let i = e[t];
    e[t] = s(unescape(i));
  }

  return void 0 !== e.dependencies && delete e.dependencies, e;
},
      u = (e, t = 0) => {
  if (e) {
    let i,
        a = e.style.height;
    return e.style.height = "0px", e.parentNode.style.height = "auto", i = t - e.parentNode.offsetHeight, e.style.height = a + "px", e.parentNode.style.removeProperty("height"), i;
  }

  return t;
},
      g = navigator.userAgent,
      v = document.createElement("div"),
      p = /(iphone|ipod|ipad|android)/gi.test(g) || "MacIntel" === navigator.platform && navigator.maxTouchPoints > 1,
      m = /chrome/i.test(g) && !/edge/i.test(g),
      f = /android/gi.test(g),
      b = "zoom" in v.style && !p && (m || /Version\/[\d\.]+.*Safari/.test(g));

var y = {};
Object.defineProperty(y, "__esModule", {
  value: !0
});

var w = Object.assign || function (e) {
  for (var t = 1; t < arguments.length; t++) {
    var i = arguments[t];

    for (var a in i) Object.prototype.hasOwnProperty.call(i, a) && (e[a] = i[a]);
  }

  return e;
},
    R = y.default = function (e) {
  if (e) {
    var t = function (e) {
      return [].slice.call(e);
    },
        i = 0,
        a = 1,
        n = 2,
        s = 3,
        o = [],
        r = null,
        l = "requestAnimationFrame" in e ? function () {
      e.cancelAnimationFrame(r), r = e.requestAnimationFrame(function () {
        return c(o.filter(function (e) {
          return e.dirty && e.active;
        }));
      });
    } : function () {},
        d = function (e) {
      return function () {
        o.forEach(function (t) {
          return t.dirty = e;
        }), l();
      };
    },
        c = function (e) {
      e.filter(function (e) {
        return !e.styleComputed;
      }).forEach(function (e) {
        e.styleComputed = v(e);
      }), e.filter(p).forEach(m);
      var t = e.filter(g);
      t.forEach(u), t.forEach(function (e) {
        m(e), h(e);
      }), t.forEach(f);
    },
        h = function (e) {
      return e.dirty = i;
    },
        u = function (e) {
      e.availableWidth = e.element.parentNode.clientWidth, e.currentWidth = e.element.scrollWidth, e.previousFontSize = e.currentFontSize, e.currentFontSize = Math.min(Math.max(e.minSize, e.availableWidth / e.currentWidth * e.previousFontSize), e.maxSize), e.whiteSpace = e.multiLine && e.currentFontSize === e.minSize ? "normal" : "nowrap";
    },
        g = function (e) {
      return e.dirty !== n || e.dirty === n && e.element.parentNode.clientWidth !== e.availableWidth;
    },
        v = function (t) {
      var i = e.getComputedStyle(t.element, null);
      t.currentFontSize = parseFloat(i.getPropertyValue("font-size")), t.display = i.getPropertyValue("display"), t.whiteSpace = i.getPropertyValue("white-space");
    },
        p = function (e) {
      var t = !1;
      return !e.preStyleTestCompleted && (/inline-/.test(e.display) || (t = !0, e.display = "inline-block"), "nowrap" !== e.whiteSpace && (t = !0, e.whiteSpace = "nowrap"), e.preStyleTestCompleted = !0, t);
    },
        m = function (e) {
      e.element.style.whiteSpace = e.whiteSpace, e.element.style.display = e.display, e.element.style.fontSize = e.currentFontSize + "px";
    },
        f = function (e) {
      e.element.dispatchEvent(new CustomEvent("fit", {
        detail: {
          oldValue: e.previousFontSize,
          newValue: e.currentFontSize,
          scaleFactor: e.currentFontSize / e.previousFontSize
        }
      }));
    },
        b = function (e, t) {
      return function () {
        e.dirty = t, e.active && l();
      };
    },
        y = function (e) {
      return function () {
        o = o.filter(function (t) {
          return t.element !== e.element;
        }), e.observeMutations && e.observer.disconnect(), e.element.style.whiteSpace = e.originalStyle.whiteSpace, e.element.style.display = e.originalStyle.display, e.element.style.fontSize = e.originalStyle.fontSize;
      };
    },
        R = function (e) {
      return function () {
        e.active || (e.active = !0, l());
      };
    },
        S = function (e) {
      return function () {
        return e.active = !1;
      };
    },
        E = function (e) {
      e.observeMutations && (e.observer = new MutationObserver(b(e, a)), e.observer.observe(e.element, e.observeMutations));
    },
        A = {
      minSize: 16,
      maxSize: 512,
      multiLine: !0,
      observeMutations: "MutationObserver" in e && {
        subtree: !0,
        childList: !0,
        characterData: !0
      }
    },
        k = null,
        L = function () {
      e.clearTimeout(k), k = e.setTimeout(d(n), P.observeWindowDelay);
    },
        x = ["resize", "orientationchange"];

    return Object.defineProperty(P, "observeWindow", {
      set: function (t) {
        var i = (t ? "add" : "remove") + "EventListener";
        x.forEach(function (t) {
          e[i](t, L);
        });
      }
    }), P.observeWindow = !0, P.observeWindowDelay = 100, P.fitAll = d(s), P;
  }

  function C(e, t) {
    var i = w({}, A, t),
        a = e.map(function (e) {
      var t = w({}, i, {
        element: e,
        active: !0
      });
      return function (e) {
        e.originalStyle = {
          whiteSpace: e.element.style.whiteSpace,
          display: e.element.style.display,
          fontSize: e.element.style.fontSize
        }, E(e), e.newbie = !0, e.dirty = !0, o.push(e);
      }(t), {
        element: e,
        fit: b(t, s),
        unfreeze: R(t),
        freeze: S(t),
        unsubscribe: y(t)
      };
    });
    return l(), a;
  }

  function P(e) {
    var i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
    return "string" == typeof e ? C(t(document.querySelectorAll(e)), i) : C([e], i)[0];
  }
}("undefined" == typeof window ? null : window);

class S {
  constructor(e) {
    this.Reveal = e, this.startEmbeddedIframe = this.startEmbeddedIframe.bind(this);
  }

  shouldPreload(e) {
    let t = this.Reveal.getConfig().preloadIframes;
    return "boolean" != typeof t && (t = e.hasAttribute("data-preload")), t;
  }

  load(e, t = {}) {
    e.style.display = this.Reveal.getConfig().display, a(e, "img[data-src], video[data-src], audio[data-src], iframe[data-src]").forEach(e => {
      ("IFRAME" !== e.tagName || this.shouldPreload(e)) && (e.setAttribute("src", e.getAttribute("data-src")), e.setAttribute("data-lazy-loaded", ""), e.removeAttribute("data-src"));
    }), a(e, "video, audio").forEach(e => {
      let t = 0;
      a(e, "source[data-src]").forEach(e => {
        e.setAttribute("src", e.getAttribute("data-src")), e.removeAttribute("data-src"), e.setAttribute("data-lazy-loaded", ""), t += 1;
      }), p && "VIDEO" === e.tagName && e.setAttribute("playsinline", ""), t > 0 && e.load();
    });
    let i = e.slideBackgroundElement;

    if (i) {
      i.style.display = "block";
      let a = e.slideBackgroundContentElement,
          n = e.getAttribute("data-background-iframe");

      if (!1 === i.hasAttribute("data-loaded")) {
        i.setAttribute("data-loaded", "true");
        let s = e.getAttribute("data-background-image"),
            o = e.getAttribute("data-background-video"),
            r = e.hasAttribute("data-background-video-loop"),
            l = e.hasAttribute("data-background-video-muted");
        if (s) a.style.backgroundImage = s.split(",").map(e => `url(${encodeURI(e.trim())})`).join(",");else if (o && !this.Reveal.isSpeakerNotes()) {
          let e = document.createElement("video");
          r && e.setAttribute("loop", ""), l && (e.muted = !0), p && (e.muted = !0, e.setAttribute("playsinline", "")), o.split(",").forEach(t => {
            e.innerHTML += '<source src="' + t + '">';
          }), a.appendChild(e);
        } else if (n && !0 !== t.excludeIframes) {
          let e = document.createElement("iframe");
          e.setAttribute("allowfullscreen", ""), e.setAttribute("mozallowfullscreen", ""), e.setAttribute("webkitallowfullscreen", ""), e.setAttribute("allow", "autoplay"), e.setAttribute("data-src", n), e.style.width = "100%", e.style.height = "100%", e.style.maxHeight = "100%", e.style.maxWidth = "100%", a.appendChild(e);
        }
      }

      let s = a.querySelector("iframe[data-src]");
      s && this.shouldPreload(i) && !/autoplay=(1|true|yes)/gi.test(n) && s.getAttribute("src") !== n && s.setAttribute("src", n);
    }

    this.layout(e);
  }

  layout(e) {
    Array.from(e.querySelectorAll(".r-fit-text")).forEach(e => {
      R(e, {
        minSize: 24,
        maxSize: .8 * this.Reveal.getConfig().height,
        observeMutations: !1,
        observeWindow: !1
      });
    });
  }

  unload(e) {
    e.style.display = "none";
    let t = this.Reveal.getSlideBackground(e);
    t && (t.style.display = "none", a(t, "iframe[src]").forEach(e => {
      e.removeAttribute("src");
    })), a(e, "video[data-lazy-loaded][src], audio[data-lazy-loaded][src], iframe[data-lazy-loaded][src]").forEach(e => {
      e.setAttribute("data-src", e.getAttribute("src")), e.removeAttribute("src");
    }), a(e, "video[data-lazy-loaded] source[src], audio source[src]").forEach(e => {
      e.setAttribute("data-src", e.getAttribute("src")), e.removeAttribute("src");
    });
  }

  formatEmbeddedContent() {
    let e = (e, t, i) => {
      a(this.Reveal.getSlidesElement(), "iframe[" + e + '*="' + t + '"]').forEach(t => {
        let a = t.getAttribute(e);
        a && -1 === a.indexOf(i) && t.setAttribute(e, a + (/\?/.test(a) ? "&" : "?") + i);
      });
    };

    e("src", "youtube.com/embed/", "enablejsapi=1"), e("data-src", "youtube.com/embed/", "enablejsapi=1"), e("src", "player.vimeo.com/", "api=1"), e("data-src", "player.vimeo.com/", "api=1");
  }

  startEmbeddedContent(e) {
    e && !this.Reveal.isSpeakerNotes() && (a(e, 'img[src$=".gif"]').forEach(e => {
      e.setAttribute("src", e.getAttribute("src"));
    }), a(e, "video, audio").forEach(e => {
      if (l(e, ".fragment") && !l(e, ".fragment.visible")) return;
      let t = this.Reveal.getConfig().autoPlayMedia;
      if ("boolean" != typeof t && (t = e.hasAttribute("data-autoplay") || !!l(e, ".slide-background")), t && "function" == typeof e.play) if (e.readyState > 1) this.startEmbeddedMedia({
        target: e
      });else if (p) {
        let t = e.play();
        t && "function" == typeof t.catch && !1 === e.controls && t.catch(() => {
          e.controls = !0, e.addEventListener("play", () => {
            e.controls = !1;
          });
        });
      } else e.removeEventListener("loadeddata", this.startEmbeddedMedia), e.addEventListener("loadeddata", this.startEmbeddedMedia);
    }), a(e, "iframe[src]").forEach(e => {
      l(e, ".fragment") && !l(e, ".fragment.visible") || this.startEmbeddedIframe({
        target: e
      });
    }), a(e, "iframe[data-src]").forEach(e => {
      l(e, ".fragment") && !l(e, ".fragment.visible") || e.getAttribute("src") !== e.getAttribute("data-src") && (e.removeEventListener("load", this.startEmbeddedIframe), e.addEventListener("load", this.startEmbeddedIframe), e.setAttribute("src", e.getAttribute("data-src")));
    }));
  }

  startEmbeddedMedia(e) {
    let t = !!l(e.target, "html"),
        i = !!l(e.target, ".present");
    t && i && (e.target.currentTime = 0, e.target.play()), e.target.removeEventListener("loadeddata", this.startEmbeddedMedia);
  }

  startEmbeddedIframe(e) {
    let t = e.target;

    if (t && t.contentWindow) {
      let i = !!l(e.target, "html"),
          a = !!l(e.target, ".present");

      if (i && a) {
        let e = this.Reveal.getConfig().autoPlayMedia;
        "boolean" != typeof e && (e = t.hasAttribute("data-autoplay") || !!l(t, ".slide-background")), /youtube\.com\/embed\//.test(t.getAttribute("src")) && e ? t.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', "*") : /player\.vimeo\.com\//.test(t.getAttribute("src")) && e ? t.contentWindow.postMessage('{"method":"play"}', "*") : t.contentWindow.postMessage("slide:start", "*");
      }
    }
  }

  stopEmbeddedContent(e, t = {}) {
    t = i({
      unloadIframes: !0
    }, t), e && e.parentNode && (a(e, "video, audio").forEach(e => {
      e.hasAttribute("data-ignore") || "function" != typeof e.pause || (e.setAttribute("data-paused-by-reveal", ""), e.pause());
    }), a(e, "iframe").forEach(e => {
      e.contentWindow && e.contentWindow.postMessage("slide:stop", "*"), e.removeEventListener("load", this.startEmbeddedIframe);
    }), a(e, 'iframe[src*="youtube.com/embed/"]').forEach(e => {
      !e.hasAttribute("data-ignore") && e.contentWindow && "function" == typeof e.contentWindow.postMessage && e.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', "*");
    }), a(e, 'iframe[src*="player.vimeo.com/"]').forEach(e => {
      !e.hasAttribute("data-ignore") && e.contentWindow && "function" == typeof e.contentWindow.postMessage && e.contentWindow.postMessage('{"method":"pause"}', "*");
    }), !0 === t.unloadIframes && a(e, "iframe[data-src]").forEach(e => {
      e.setAttribute("src", "about:blank"), e.removeAttribute("src");
    }));
  }

}

class E {
  constructor(e) {
    this.Reveal = e;
  }

  render() {
    this.element = document.createElement("div"), this.element.className = "slide-number", this.Reveal.getRevealElement().appendChild(this.element);
  }

  configure(e, t) {
    let i = "none";
    e.slideNumber && !this.Reveal.isPrintingPDF() && ("all" === e.showSlideNumber || "speaker" === e.showSlideNumber && this.Reveal.isSpeakerNotes()) && (i = "block"), this.element.style.display = i;
  }

  update() {
    this.Reveal.getConfig().slideNumber && this.element && (this.element.innerHTML = this.getSlideNumber());
  }

  getSlideNumber(e = this.Reveal.getCurrentSlide()) {
    let t,
        i = this.Reveal.getConfig(),
        a = "h.v";
    if ("function" == typeof i.slideNumber) t = i.slideNumber(e);else {
      "string" == typeof i.slideNumber && (a = i.slideNumber), /c/.test(a) || 1 !== this.Reveal.getHorizontalSlides().length || (a = "c");
      let n = e && "uncounted" === e.dataset.visibility ? 0 : 1;

      switch (t = [], a) {
        case "c":
          t.push(this.Reveal.getSlidePastCount(e) + n);
          break;

        case "c/t":
          t.push(this.Reveal.getSlidePastCount(e) + n, "/", this.Reveal.getTotalSlides());
          break;

        default:
          let i = this.Reveal.getIndices(e);
          t.push(i.h + n);
          let s = "h/v" === a ? "/" : ".";
          this.Reveal.isVerticalSlide(e) && t.push(s, i.v + 1);
      }
    }
    let n = "#" + this.Reveal.location.getHash(e);
    return this.formatNumber(t[0], t[1], t[2], n);
  }

  formatNumber(e, t, i, a = "#" + this.Reveal.location.getHash()) {
    return "number" != typeof i || isNaN(i) ? `<a href="${a}">\n\t\t\t\t\t<span class="slide-number-a">${e}</span>\n\t\t\t\t\t</a>` : `<a href="${a}">\n\t\t\t\t\t<span class="slide-number-a">${e}</span>\n\t\t\t\t\t<span class="slide-number-delimiter">${t}</span>\n\t\t\t\t\t<span class="slide-number-b">${i}</span>\n\t\t\t\t\t</a>`;
  }

}

const A = e => {
  let t = e.match(/^#([0-9a-f]{3})$/i);
  if (t && t[1]) return t = t[1], {
    r: 17 * parseInt(t.charAt(0), 16),
    g: 17 * parseInt(t.charAt(1), 16),
    b: 17 * parseInt(t.charAt(2), 16)
  };
  let i = e.match(/^#([0-9a-f]{6})$/i);
  if (i && i[1]) return i = i[1], {
    r: parseInt(i.substr(0, 2), 16),
    g: parseInt(i.substr(2, 2), 16),
    b: parseInt(i.substr(4, 2), 16)
  };
  let a = e.match(/^rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i);
  if (a) return {
    r: parseInt(a[1], 10),
    g: parseInt(a[2], 10),
    b: parseInt(a[3], 10)
  };
  let n = e.match(/^rgba\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\,\s*([\d]+|[\d]*.[\d]+)\s*\)$/i);
  return n ? {
    r: parseInt(n[1], 10),
    g: parseInt(n[2], 10),
    b: parseInt(n[3], 10),
    a: parseFloat(n[4])
  } : null;
};

class k {
  constructor(e) {
    this.Reveal = e;
  }

  render() {
    this.element = document.createElement("div"), this.element.className = "backgrounds", this.Reveal.getRevealElement().appendChild(this.element);
  }

  create() {
    this.element.innerHTML = "", this.element.classList.add("no-transition"), this.Reveal.getHorizontalSlides().forEach(e => {
      let t = this.createBackground(e, this.element);
      a(e, "section").forEach(e => {
        this.createBackground(e, t), t.classList.add("stack");
      });
    }), this.Reveal.getConfig().parallaxBackgroundImage ? (this.element.style.backgroundImage = 'url("' + this.Reveal.getConfig().parallaxBackgroundImage + '")', this.element.style.backgroundSize = this.Reveal.getConfig().parallaxBackgroundSize, this.element.style.backgroundRepeat = this.Reveal.getConfig().parallaxBackgroundRepeat, this.element.style.backgroundPosition = this.Reveal.getConfig().parallaxBackgroundPosition, setTimeout(() => {
      this.Reveal.getRevealElement().classList.add("has-parallax-background");
    }, 1)) : (this.element.style.backgroundImage = "", this.Reveal.getRevealElement().classList.remove("has-parallax-background"));
  }

  createBackground(e, t) {
    let i = document.createElement("div");
    i.className = "slide-background " + e.className.replace(/present|past|future/, "");
    let a = document.createElement("div");
    return a.className = "slide-background-content", i.appendChild(a), t.appendChild(i), e.slideBackgroundElement = i, e.slideBackgroundContentElement = a, this.sync(e), i;
  }

  sync(e) {
    const t = e.slideBackgroundElement,
          i = e.slideBackgroundContentElement,
          a = {
      background: e.getAttribute("data-background"),
      backgroundSize: e.getAttribute("data-background-size"),
      backgroundImage: e.getAttribute("data-background-image"),
      backgroundVideo: e.getAttribute("data-background-video"),
      backgroundIframe: e.getAttribute("data-background-iframe"),
      backgroundColor: e.getAttribute("data-background-color"),
      backgroundRepeat: e.getAttribute("data-background-repeat"),
      backgroundPosition: e.getAttribute("data-background-position"),
      backgroundTransition: e.getAttribute("data-background-transition"),
      backgroundOpacity: e.getAttribute("data-background-opacity")
    },
          n = e.hasAttribute("data-preload");
    e.classList.remove("has-dark-background"), e.classList.remove("has-light-background"), t.removeAttribute("data-loaded"), t.removeAttribute("data-background-hash"), t.removeAttribute("data-background-size"), t.removeAttribute("data-background-transition"), t.style.backgroundColor = "", i.style.backgroundSize = "", i.style.backgroundRepeat = "", i.style.backgroundPosition = "", i.style.backgroundImage = "", i.style.opacity = "", i.innerHTML = "", a.background && (/^(http|file|\/\/)/gi.test(a.background) || /\.(svg|png|jpg|jpeg|gif|bmp)([?#\s]|$)/gi.test(a.background) ? e.setAttribute("data-background-image", a.background) : t.style.background = a.background), (a.background || a.backgroundColor || a.backgroundImage || a.backgroundVideo || a.backgroundIframe) && t.setAttribute("data-background-hash", a.background + a.backgroundSize + a.backgroundImage + a.backgroundVideo + a.backgroundIframe + a.backgroundColor + a.backgroundRepeat + a.backgroundPosition + a.backgroundTransition + a.backgroundOpacity), a.backgroundSize && t.setAttribute("data-background-size", a.backgroundSize), a.backgroundColor && (t.style.backgroundColor = a.backgroundColor), a.backgroundTransition && t.setAttribute("data-background-transition", a.backgroundTransition), n && t.setAttribute("data-preload", ""), a.backgroundSize && (i.style.backgroundSize = a.backgroundSize), a.backgroundRepeat && (i.style.backgroundRepeat = a.backgroundRepeat), a.backgroundPosition && (i.style.backgroundPosition = a.backgroundPosition), a.backgroundOpacity && (i.style.opacity = a.backgroundOpacity);
    let s = a.backgroundColor;

    if (!s || !A(s)) {
      let e = window.getComputedStyle(t);
      e && e.backgroundColor && (s = e.backgroundColor);
    }

    if (s) {
      const t = A(s);
      t && 0 !== t.a && ("string" == typeof (o = s) && (o = A(o)), (o ? (299 * o.r + 587 * o.g + 114 * o.b) / 1e3 : null) < 128 ? e.classList.add("has-dark-background") : e.classList.add("has-light-background"));
    }

    var o;
  }

  update(e = !1) {
    let t = this.Reveal.getCurrentSlide(),
        i = this.Reveal.getIndices(),
        n = null,
        s = this.Reveal.getConfig().rtl ? "future" : "past",
        o = this.Reveal.getConfig().rtl ? "past" : "future";

    if (Array.from(this.element.childNodes).forEach((t, r) => {
      t.classList.remove("past", "present", "future"), r < i.h ? t.classList.add(s) : r > i.h ? t.classList.add(o) : (t.classList.add("present"), n = t), (e || r === i.h) && a(t, ".slide-background").forEach((e, t) => {
        e.classList.remove("past", "present", "future"), t < i.v ? e.classList.add("past") : t > i.v ? e.classList.add("future") : (e.classList.add("present"), r === i.h && (n = e));
      });
    }), this.previousBackground && this.Reveal.slideContent.stopEmbeddedContent(this.previousBackground, {
      unloadIframes: !this.Reveal.slideContent.shouldPreload(this.previousBackground)
    }), n) {
      this.Reveal.slideContent.startEmbeddedContent(n);
      let e = n.querySelector(".slide-background-content");

      if (e) {
        let t = e.style.backgroundImage || "";
        /\.gif/i.test(t) && (e.style.backgroundImage = "", window.getComputedStyle(e).opacity, e.style.backgroundImage = t);
      }

      let t = this.previousBackground ? this.previousBackground.getAttribute("data-background-hash") : null,
          i = n.getAttribute("data-background-hash");
      i && i === t && n !== this.previousBackground && this.element.classList.add("no-transition"), this.previousBackground = n;
    }

    t && ["has-light-background", "has-dark-background"].forEach(e => {
      t.classList.contains(e) ? this.Reveal.getRevealElement().classList.add(e) : this.Reveal.getRevealElement().classList.remove(e);
    }, this), setTimeout(() => {
      this.element.classList.remove("no-transition");
    }, 1);
  }

  updateParallax() {
    let e = this.Reveal.getIndices();

    if (this.Reveal.getConfig().parallaxBackgroundImage) {
      let t,
          i,
          a = this.Reveal.getHorizontalSlides(),
          n = this.Reveal.getVerticalSlides(),
          s = this.element.style.backgroundSize.split(" ");
      1 === s.length ? t = i = parseInt(s[0], 10) : (t = parseInt(s[0], 10), i = parseInt(s[1], 10));
      let o,
          r,
          l = this.element.offsetWidth,
          d = a.length;
      o = "number" == typeof this.Reveal.getConfig().parallaxBackgroundHorizontal ? this.Reveal.getConfig().parallaxBackgroundHorizontal : d > 1 ? (t - l) / (d - 1) : 0, r = o * e.h * -1;
      let c,
          h,
          u = this.element.offsetHeight,
          g = n.length;
      c = "number" == typeof this.Reveal.getConfig().parallaxBackgroundVertical ? this.Reveal.getConfig().parallaxBackgroundVertical : (i - u) / (g - 1), h = g > 0 ? c * e.v : 0, this.element.style.backgroundPosition = r + "px " + -h + "px";
    }
  }

}

let L = 0;

class x {
  constructor(e) {
    this.Reveal = e;
  }

  run(e, t) {
    if (this.reset(), e.hasAttribute("data-auto-animate") && t.hasAttribute("data-auto-animate")) {
      this.autoAnimateStyleSheet = this.autoAnimateStyleSheet || c();
      let i = this.getAutoAnimateOptions(t);
      e.dataset.autoAnimate = "pending", t.dataset.autoAnimate = "pending";
      let a = this.Reveal.getSlides();
      i.slideDirection = a.indexOf(t) > a.indexOf(e) ? "forward" : "backward";
      let n = this.getAutoAnimatableElements(e, t).map(e => this.autoAnimateElements(e.from, e.to, e.options || {}, i, L++));

      if ("false" !== t.dataset.autoAnimateUnmatched && !0 === this.Reveal.getConfig().autoAnimateUnmatched) {
        let e = .8 * i.duration,
            a = .2 * i.duration;
        this.getUnmatchedAutoAnimateElements(t).forEach(e => {
          let t = this.getAutoAnimateOptions(e, i),
              a = "unmatched";
          t.duration === i.duration && t.delay === i.delay || (a = "unmatched-" + L++, n.push(`[data-auto-animate="running"] [data-auto-animate-target="${a}"] { transition: opacity ${t.duration}s ease ${t.delay}s; }`)), e.dataset.autoAnimateTarget = a;
        }, this), n.push(`[data-auto-animate="running"] [data-auto-animate-target="unmatched"] { transition: opacity ${e}s ease ${a}s; }`);
      }

      this.autoAnimateStyleSheet.innerHTML = n.join(""), requestAnimationFrame(() => {
        this.autoAnimateStyleSheet && (getComputedStyle(this.autoAnimateStyleSheet).fontWeight, t.dataset.autoAnimate = "running");
      }), this.Reveal.dispatchEvent({
        type: "autoanimate",
        data: {
          fromSlide: e,
          toSlide: t,
          sheet: this.autoAnimateStyleSheet
        }
      });
    }
  }

  reset() {
    a(this.Reveal.getRevealElement(), '[data-auto-animate]:not([data-auto-animate=""])').forEach(e => {
      e.dataset.autoAnimate = "";
    }), a(this.Reveal.getRevealElement(), "[data-auto-animate-target]").forEach(e => {
      delete e.dataset.autoAnimateTarget;
    }), this.autoAnimateStyleSheet && this.autoAnimateStyleSheet.parentNode && (this.autoAnimateStyleSheet.parentNode.removeChild(this.autoAnimateStyleSheet), this.autoAnimateStyleSheet = null);
  }

  autoAnimateElements(e, i, a, n, s) {
    e.dataset.autoAnimateTarget = "", i.dataset.autoAnimateTarget = s;
    let o = this.getAutoAnimateOptions(i, n);
    void 0 !== a.delay && (o.delay = a.delay), void 0 !== a.duration && (o.duration = a.duration), void 0 !== a.easing && (o.easing = a.easing);
    let r = this.getAutoAnimatableProperties("from", e, a),
        l = this.getAutoAnimatableProperties("to", i, a);

    if (i.classList.contains("fragment") && (delete l.styles.opacity, e.classList.contains("fragment"))) {
      (e.className.match(t) || [""])[0] === (i.className.match(t) || [""])[0] && "forward" === n.slideDirection && i.classList.add("visible", "disabled");
    }

    if (!1 !== a.translate || !1 !== a.scale) {
      let e = this.Reveal.getScale(),
          t = {
        x: (r.x - l.x) / e,
        y: (r.y - l.y) / e,
        scaleX: r.width / l.width,
        scaleY: r.height / l.height
      };
      t.x = Math.round(1e3 * t.x) / 1e3, t.y = Math.round(1e3 * t.y) / 1e3, t.scaleX = Math.round(1e3 * t.scaleX) / 1e3, t.scaleX = Math.round(1e3 * t.scaleX) / 1e3;
      let i = !1 !== a.translate && (0 !== t.x || 0 !== t.y),
          n = !1 !== a.scale && (0 !== t.scaleX || 0 !== t.scaleY);

      if (i || n) {
        let e = [];
        i && e.push(`translate(${t.x}px, ${t.y}px)`), n && e.push(`scale(${t.scaleX}, ${t.scaleY})`), r.styles.transform = e.join(" "), r.styles["transform-origin"] = "top left", l.styles.transform = "none";
      }
    }

    for (let e in l.styles) {
      const t = l.styles[e],
            i = r.styles[e];
      t === i ? delete l.styles[e] : (!0 === t.explicitValue && (l.styles[e] = t.value), !0 === i.explicitValue && (r.styles[e] = i.value));
    }

    let d = "",
        c = Object.keys(l.styles);

    if (c.length > 0) {
      r.styles.transition = "none", l.styles.transition = `all ${o.duration}s ${o.easing} ${o.delay}s`, l.styles["transition-property"] = c.join(", "), l.styles["will-change"] = c.join(", "), d = '[data-auto-animate-target="' + s + '"] {' + Object.keys(r.styles).map(e => e + ": " + r.styles[e] + " !important;").join("") + '}[data-auto-animate="running"] [data-auto-animate-target="' + s + '"] {' + Object.keys(l.styles).map(e => e + ": " + l.styles[e] + " !important;").join("") + "}";
    }

    return d;
  }

  getAutoAnimateOptions(e, t) {
    let a = {
      easing: this.Reveal.getConfig().autoAnimateEasing,
      duration: this.Reveal.getConfig().autoAnimateDuration,
      delay: 0
    };

    if (a = i(a, t), e.parentNode) {
      let t = l(e.parentNode, "[data-auto-animate-target]");
      t && (a = this.getAutoAnimateOptions(t, a));
    }

    return e.dataset.autoAnimateEasing && (a.easing = e.dataset.autoAnimateEasing), e.dataset.autoAnimateDuration && (a.duration = parseFloat(e.dataset.autoAnimateDuration)), e.dataset.autoAnimateDelay && (a.delay = parseFloat(e.dataset.autoAnimateDelay)), a;
  }

  getAutoAnimatableProperties(e, t, i) {
    let a = this.Reveal.getConfig(),
        n = {
      styles: []
    };

    if (!1 !== i.translate || !1 !== i.scale) {
      let e;
      if ("function" == typeof i.measure) e = i.measure(t);else if (a.center) e = t.getBoundingClientRect();else {
        let i = this.Reveal.getScale();
        e = {
          x: t.offsetLeft * i,
          y: t.offsetTop * i,
          width: t.offsetWidth * i,
          height: t.offsetHeight * i
        };
      }
      n.x = e.x, n.y = e.y, n.width = e.width, n.height = e.height;
    }

    const s = getComputedStyle(t);
    return (i.styles || a.autoAnimateStyles).forEach(t => {
      let i;
      "string" == typeof t && (t = {
        property: t
      }), i = void 0 !== t.from && "from" === e ? {
        value: t.from,
        explicitValue: !0
      } : void 0 !== t.to && "to" === e ? {
        value: t.to,
        explicitValue: !0
      } : s[t.property], "" !== i && (n.styles[t.property] = i);
    }), n;
  }

  getAutoAnimatableElements(e, t) {
    let i = ("function" == typeof this.Reveal.getConfig().autoAnimateMatcher ? this.Reveal.getConfig().autoAnimateMatcher : this.getAutoAnimatePairs).call(this, e, t),
        a = [];
    return i.filter((e, t) => {
      if (-1 === a.indexOf(e.to)) return a.push(e.to), !0;
    });
  }

  getAutoAnimatePairs(e, t) {
    let i = [];
    const a = "h1, h2, h3, h4, h5, h6, p, li";
    return this.findAutoAnimateMatches(i, e, t, "[data-id]", e => e.nodeName + ":::" + e.getAttribute("data-id")), this.findAutoAnimateMatches(i, e, t, a, e => e.nodeName + ":::" + e.innerText), this.findAutoAnimateMatches(i, e, t, "img, video, iframe", e => e.nodeName + ":::" + (e.getAttribute("src") || e.getAttribute("data-src"))), this.findAutoAnimateMatches(i, e, t, "pre", e => e.nodeName + ":::" + e.innerText), i.forEach(e => {
      r(e.from, a) ? e.options = {
        scale: !1
      } : r(e.from, "pre") && (e.options = {
        scale: !1,
        styles: ["width", "height"]
      }, this.findAutoAnimateMatches(i, e.from, e.to, ".hljs .hljs-ln-code", e => e.textContent, {
        scale: !1,
        styles: [],
        measure: this.getLocalBoundingBox.bind(this)
      }), this.findAutoAnimateMatches(i, e.from, e.to, ".hljs .hljs-ln-line[data-line-number]", e => e.getAttribute("data-line-number"), {
        scale: !1,
        styles: ["width"],
        measure: this.getLocalBoundingBox.bind(this)
      }));
    }, this), i;
  }

  getLocalBoundingBox(e) {
    const t = this.Reveal.getScale();
    return {
      x: Math.round(e.offsetLeft * t * 100) / 100,
      y: Math.round(e.offsetTop * t * 100) / 100,
      width: Math.round(e.offsetWidth * t * 100) / 100,
      height: Math.round(e.offsetHeight * t * 100) / 100
    };
  }

  findAutoAnimateMatches(e, t, i, a, n, s) {
    let o = {},
        r = {};
    [].slice.call(t.querySelectorAll(a)).forEach((e, t) => {
      const i = n(e);
      "string" == typeof i && i.length && (o[i] = o[i] || [], o[i].push(e));
    }), [].slice.call(i.querySelectorAll(a)).forEach((t, i) => {
      const a = n(t);
      let l;

      if (r[a] = r[a] || [], r[a].push(t), o[a]) {
        const e = r[a].length - 1,
              t = o[a].length - 1;
        o[a][e] ? (l = o[a][e], o[a][e] = null) : o[a][t] && (l = o[a][t], o[a][t] = null);
      }

      l && e.push({
        from: l,
        to: t,
        options: s
      });
    });
  }

  getUnmatchedAutoAnimateElements(e) {
    return [].slice.call(e.children).reduce((e, t) => {
      const i = t.querySelector("[data-auto-animate-target]");
      return t.hasAttribute("data-auto-animate-target") || i || e.push(t), t.querySelector("[data-auto-animate-target]") && (e = e.concat(this.getUnmatchedAutoAnimateElements(t))), e;
    }, []);
  }

}

class C {
  constructor(e) {
    this.Reveal = e;
  }

  configure(e, t) {
    !1 === e.fragments ? this.disable() : !1 === t.fragments && this.enable();
  }

  disable() {
    a(this.Reveal.getSlidesElement(), ".fragment").forEach(e => {
      e.classList.add("visible"), e.classList.remove("current-fragment");
    });
  }

  enable() {
    a(this.Reveal.getSlidesElement(), ".fragment").forEach(e => {
      e.classList.remove("visible"), e.classList.remove("current-fragment");
    });
  }

  availableRoutes() {
    let e = this.Reveal.getCurrentSlide();

    if (e && this.Reveal.getConfig().fragments) {
      let t = e.querySelectorAll(".fragment:not(.disabled)"),
          i = e.querySelectorAll(".fragment:not(.disabled):not(.visible)");
      return {
        prev: t.length - i.length > 0,
        next: !!i.length
      };
    }

    return {
      prev: !1,
      next: !1
    };
  }

  sort(e, t = !1) {
    e = Array.from(e);
    let i = [],
        a = [],
        n = [];
    e.forEach(e => {
      if (e.hasAttribute("data-fragment-index")) {
        let t = parseInt(e.getAttribute("data-fragment-index"), 10);
        i[t] || (i[t] = []), i[t].push(e);
      } else a.push([e]);
    }), i = i.concat(a);
    let s = 0;
    return i.forEach(e => {
      e.forEach(e => {
        n.push(e), e.setAttribute("data-fragment-index", s);
      }), s++;
    }), !0 === t ? i : n;
  }

  sortAll() {
    this.Reveal.getHorizontalSlides().forEach(e => {
      let t = a(e, "section");
      t.forEach((e, t) => {
        this.sort(e.querySelectorAll(".fragment"));
      }, this), 0 === t.length && this.sort(e.querySelectorAll(".fragment"));
    });
  }

  update(e, t) {
    let i = {
      shown: [],
      hidden: []
    },
        a = this.Reveal.getCurrentSlide();

    if (a && this.Reveal.getConfig().fragments && (t = t || this.sort(a.querySelectorAll(".fragment"))).length) {
      let n = 0;

      if ("number" != typeof e) {
        let t = this.sort(a.querySelectorAll(".fragment.visible")).pop();
        t && (e = parseInt(t.getAttribute("data-fragment-index") || 0, 10));
      }

      Array.from(t).forEach((t, a) => {
        if (t.hasAttribute("data-fragment-index") && (a = parseInt(t.getAttribute("data-fragment-index"), 10)), n = Math.max(n, a), a <= e) {
          let n = t.classList.contains("visible");
          t.classList.add("visible"), t.classList.remove("current-fragment"), a === e && (this.Reveal.announceStatus(this.Reveal.getStatusText(t)), t.classList.add("current-fragment"), this.Reveal.slideContent.startEmbeddedContent(t)), n || (i.shown.push(t), this.Reveal.dispatchEvent({
            target: t,
            type: "visible",
            bubbles: !1
          }));
        } else {
          let e = t.classList.contains("visible");
          t.classList.remove("visible"), t.classList.remove("current-fragment"), e && (this.Reveal.slideContent.stopEmbeddedContent(t), i.hidden.push(t), this.Reveal.dispatchEvent({
            target: t,
            type: "hidden",
            bubbles: !1
          }));
        }
      }), e = "number" == typeof e ? e : -1, e = Math.max(Math.min(e, n), -1), a.setAttribute("data-fragment", e);
    }

    return i;
  }

  sync(e = this.Reveal.getCurrentSlide()) {
    return this.sort(e.querySelectorAll(".fragment"));
  }

  goto(e, t = 0) {
    let i = this.Reveal.getCurrentSlide();

    if (i && this.Reveal.getConfig().fragments) {
      let a = this.sort(i.querySelectorAll(".fragment:not(.disabled)"));

      if (a.length) {
        if ("number" != typeof e) {
          let t = this.sort(i.querySelectorAll(".fragment:not(.disabled).visible")).pop();
          e = t ? parseInt(t.getAttribute("data-fragment-index") || 0, 10) : -1;
        }

        e += t;
        let n = this.update(e, a);
        return n.hidden.length && this.Reveal.dispatchEvent({
          type: "fragmenthidden",
          data: {
            fragment: n.hidden[0],
            fragments: n.hidden
          }
        }), n.shown.length && this.Reveal.dispatchEvent({
          type: "fragmentshown",
          data: {
            fragment: n.shown[0],
            fragments: n.shown
          }
        }), this.Reveal.controls.update(), this.Reveal.progress.update(), this.Reveal.getConfig().fragmentInURL && this.Reveal.location.writeURL(), !(!n.shown.length && !n.hidden.length);
      }
    }

    return !1;
  }

  next() {
    return this.goto(null, 1);
  }

  prev() {
    return this.goto(null, -1);
  }

}

class P {
  constructor(e) {
    this.Reveal = e, this.active = !1, this.onSlideClicked = this.onSlideClicked.bind(this);
  }

  activate() {
    if (this.Reveal.getConfig().overview && !this.isActive()) {
      this.active = !0, this.Reveal.getRevealElement().classList.add("overview"), this.Reveal.cancelAutoSlide(), this.Reveal.getSlidesElement().appendChild(this.Reveal.getBackgroundsElement()), a(this.Reveal.getRevealElement(), ".slides section").forEach(e => {
        e.classList.contains("stack") || e.addEventListener("click", this.onSlideClicked, !0);
      });
      const e = 70,
            t = this.Reveal.getComputedSlideSize();
      this.overviewSlideWidth = t.width + e, this.overviewSlideHeight = t.height + e, this.Reveal.getConfig().rtl && (this.overviewSlideWidth = -this.overviewSlideWidth), this.Reveal.updateSlidesVisibility(), this.layout(), this.update(), this.Reveal.layout();
      const i = this.Reveal.getIndices();
      this.Reveal.dispatchEvent({
        type: "overviewshown",
        data: {
          indexh: i.h,
          indexv: i.v,
          currentSlide: this.Reveal.getCurrentSlide()
        }
      });
    }
  }

  layout() {
    this.Reveal.getHorizontalSlides().forEach((e, t) => {
      e.setAttribute("data-index-h", t), o(e, "translate3d(" + t * this.overviewSlideWidth + "px, 0, 0)"), e.classList.contains("stack") && a(e, "section").forEach((e, i) => {
        e.setAttribute("data-index-h", t), e.setAttribute("data-index-v", i), o(e, "translate3d(0, " + i * this.overviewSlideHeight + "px, 0)");
      });
    }), Array.from(this.Reveal.getBackgroundsElement().childNodes).forEach((e, t) => {
      o(e, "translate3d(" + t * this.overviewSlideWidth + "px, 0, 0)"), a(e, ".slide-background").forEach((e, t) => {
        o(e, "translate3d(0, " + t * this.overviewSlideHeight + "px, 0)");
      });
    });
  }

  update() {
    const e = Math.min(window.innerWidth, window.innerHeight),
          t = Math.max(e / 5, 150) / e,
          i = this.Reveal.getIndices();
    this.Reveal.transformSlides({
      overview: ["scale(" + t + ")", "translateX(" + -i.h * this.overviewSlideWidth + "px)", "translateY(" + -i.v * this.overviewSlideHeight + "px)"].join(" ")
    });
  }

  deactivate() {
    if (this.Reveal.getConfig().overview) {
      this.active = !1, this.Reveal.getRevealElement().classList.remove("overview"), this.Reveal.getRevealElement().classList.add("overview-deactivating"), setTimeout(() => {
        this.Reveal.getRevealElement().classList.remove("overview-deactivating");
      }, 1), this.Reveal.getRevealElement().appendChild(this.Reveal.getBackgroundsElement()), a(this.Reveal.getRevealElement(), ".slides section").forEach(e => {
        o(e, ""), e.removeEventListener("click", this.onSlideClicked, !0);
      }), a(this.Reveal.getBackgroundsElement(), ".slide-background").forEach(e => {
        o(e, "");
      }), this.Reveal.transformSlides({
        overview: ""
      });
      const e = this.Reveal.getIndices();
      this.Reveal.slide(e.h, e.v), this.Reveal.layout(), this.Reveal.cueAutoSlide(), this.Reveal.dispatchEvent({
        type: "overviewhidden",
        data: {
          indexh: e.h,
          indexv: e.v,
          currentSlide: this.Reveal.getCurrentSlide()
        }
      });
    }
  }

  toggle(e) {
    "boolean" == typeof e ? e ? this.activate() : this.deactivate() : this.isActive() ? this.deactivate() : this.activate();
  }

  isActive() {
    return this.active;
  }

  onSlideClicked(e) {
    if (this.isActive()) {
      e.preventDefault();
      let t = e.target;

      for (; t && !t.nodeName.match(/section/gi);) t = t.parentNode;

      if (t && !t.classList.contains("disabled") && (this.deactivate(), t.nodeName.match(/section/gi))) {
        let e = parseInt(t.getAttribute("data-index-h"), 10),
            i = parseInt(t.getAttribute("data-index-v"), 10);
        this.Reveal.slide(e, i);
      }
    }
  }

}

class N {
  constructor(e) {
    this.Reveal = e, this.shortcuts = {}, this.bindings = {}, this.onDocumentKeyDown = this.onDocumentKeyDown.bind(this), this.onDocumentKeyPress = this.onDocumentKeyPress.bind(this);
  }

  configure(e, t) {
    "linear" === e.navigationMode ? (this.shortcuts["&#8594;  ,  &#8595;  ,  SPACE  ,  N  ,  L  ,  J"] = "Next slide", this.shortcuts["&#8592;  ,  &#8593;  ,  P  ,  H  ,  K"] = "Previous slide") : (this.shortcuts["N  ,  SPACE"] = "Next slide", this.shortcuts.P = "Previous slide", this.shortcuts["&#8592;  ,  H"] = "Navigate left", this.shortcuts["&#8594;  ,  L"] = "Navigate right", this.shortcuts["&#8593;  ,  K"] = "Navigate up", this.shortcuts["&#8595;  ,  J"] = "Navigate down"), this.shortcuts["Home  ,  Shift &#8592;"] = "First slide", this.shortcuts["End  ,  Shift &#8594;"] = "Last slide", this.shortcuts["B  ,  ."] = "Pause", this.shortcuts.F = "Fullscreen", this.shortcuts["ESC, O"] = "Slide overview";
  }

  bind() {
    document.addEventListener("keydown", this.onDocumentKeyDown, !1), document.addEventListener("keypress", this.onDocumentKeyPress, !1);
  }

  unbind() {
    document.removeEventListener("keydown", this.onDocumentKeyDown, !1), document.removeEventListener("keypress", this.onDocumentKeyPress, !1);
  }

  addKeyBinding(e, t) {
    "object" == typeof e && e.keyCode ? this.bindings[e.keyCode] = {
      callback: t,
      key: e.key,
      description: e.description
    } : this.bindings[e] = {
      callback: t,
      key: null,
      description: null
    };
  }

  removeKeyBinding(e) {
    delete this.bindings[e];
  }

  triggerKey(e) {
    this.onDocumentKeyDown({
      keyCode: e
    });
  }

  registerKeyboardShortcut(e, t) {
    this.shortcuts[e] = t;
  }

  getShortcuts() {
    return this.shortcuts;
  }

  getBindings() {
    return this.bindings;
  }

  onDocumentKeyPress(e) {
    e.shiftKey && 63 === e.charCode && this.Reveal.toggleHelp();
  }

  onDocumentKeyDown(e) {
    let t = this.Reveal.getConfig();
    if ("function" == typeof t.keyboardCondition && !1 === t.keyboardCondition(e)) return !0;
    if ("focused" === t.keyboardCondition && !this.Reveal.isFocused()) return !0;
    let i = e.keyCode,
        a = !this.Reveal.isAutoSliding();
    this.Reveal.onUserInput(e);
    let n = document.activeElement && !0 === document.activeElement.isContentEditable,
        s = document.activeElement && document.activeElement.tagName && /input|textarea/i.test(document.activeElement.tagName),
        o = document.activeElement && document.activeElement.className && /speaker-notes/i.test(document.activeElement.className),
        r = e.shiftKey && 32 === e.keyCode,
        l = e.shiftKey && 37 === i,
        d = e.shiftKey && 39 === i,
        c = !r && !l && !d && (e.shiftKey || e.altKey || e.ctrlKey || e.metaKey);
    if (n || s || o || c) return;
    let h,
        u = [66, 86, 190, 191];
    if ("object" == typeof t.keyboard) for (h in t.keyboard) "togglePause" === t.keyboard[h] && u.push(parseInt(h, 10));
    if (this.Reveal.isPaused() && -1 === u.indexOf(i)) return !1;
    let g = "linear" === t.navigationMode || !this.Reveal.hasHorizontalSlides() || !this.Reveal.hasVerticalSlides(),
        v = !1;
    if ("object" == typeof t.keyboard) for (h in t.keyboard) if (parseInt(h, 10) === i) {
      let i = t.keyboard[h];
      "function" == typeof i ? i.apply(null, [e]) : "string" == typeof i && "function" == typeof this.Reveal[i] && this.Reveal[i].call(), v = !0;
    }
    if (!1 === v) for (h in this.bindings) if (parseInt(h, 10) === i) {
      let t = this.bindings[h].callback;
      "function" == typeof t ? t.apply(null, [e]) : "string" == typeof t && "function" == typeof this.Reveal[t] && this.Reveal[t].call(), v = !0;
    }
    !1 === v && (v = !0, 80 === i || 33 === i ? this.Reveal.prev() : 78 === i || 34 === i ? this.Reveal.next() : 72 === i || 37 === i ? l ? this.Reveal.slide(0) : !this.Reveal.overview.isActive() && g ? this.Reveal.prev() : this.Reveal.left() : 76 === i || 39 === i ? d ? this.Reveal.slide(Number.MAX_VALUE) : !this.Reveal.overview.isActive() && g ? this.Reveal.next() : this.Reveal.right() : 75 === i || 38 === i ? !this.Reveal.overview.isActive() && g ? this.Reveal.prev() : this.Reveal.up() : 74 === i || 40 === i ? !this.Reveal.overview.isActive() && g ? this.Reveal.next() : this.Reveal.down() : 36 === i ? this.Reveal.slide(0) : 35 === i ? this.Reveal.slide(Number.MAX_VALUE) : 32 === i ? (this.Reveal.overview.isActive() && this.Reveal.overview.deactivate(), e.shiftKey ? this.Reveal.prev() : this.Reveal.next()) : 58 === i || 59 === i || 66 === i || 86 === i || 190 === i || 191 === i ? this.Reveal.togglePause() : 70 === i ? (e => {
      let t = (e = e || document.documentElement).requestFullscreen || e.webkitRequestFullscreen || e.webkitRequestFullScreen || e.mozRequestFullScreen || e.msRequestFullscreen;
      t && t.apply(e);
    })(t.embedded ? this.Reveal.getViewportElement() : document.documentElement) : 65 === i ? t.autoSlideStoppable && this.Reveal.toggleAutoSlide(a) : v = !1), v ? e.preventDefault && e.preventDefault() : 27 !== i && 79 !== i || (!1 === this.Reveal.closeOverlay() && this.Reveal.overview.toggle(), e.preventDefault && e.preventDefault()), this.Reveal.cueAutoSlide();
  }

}

class M {
  constructor(e) {
    this.Reveal = e, this.writeURLTimeout = 0, this.onWindowHashChange = this.onWindowHashChange.bind(this);
  }

  bind() {
    window.addEventListener("hashchange", this.onWindowHashChange, !1);
  }

  unbind() {
    window.removeEventListener("hashchange", this.onWindowHashChange, !1);
  }

  readURL() {
    let e = this.Reveal.getConfig(),
        t = this.Reveal.getIndices(),
        i = this.Reveal.getCurrentSlide(),
        a = window.location.hash,
        n = a.slice(2).split("/"),
        s = a.replace(/#\/?/gi, "");

    if (!/^[0-9]*$/.test(n[0]) && s.length) {
      let e, a;
      /\/[-\d]+$/g.test(s) && (a = parseInt(s.split("/").pop(), 10), a = isNaN(a) ? void 0 : a, s = s.split("/").shift());

      try {
        e = document.getElementById(decodeURIComponent(s));
      } catch (e) {}

      let n = !!i && i.getAttribute("id") === s;

      if (e) {
        if (!n || void 0 !== a) {
          let t = this.Reveal.getIndices(e);
          this.Reveal.slide(t.h, t.v, a);
        }
      } else this.Reveal.slide(t.h || 0, t.v || 0);
    } else {
      let i,
          a = e.hashOneBasedIndex ? 1 : 0,
          s = parseInt(n[0], 10) - a || 0,
          o = parseInt(n[1], 10) - a || 0;
      e.fragmentInURL && (i = parseInt(n[2], 10), isNaN(i) && (i = void 0)), s === t.h && o === t.v && void 0 === i || this.Reveal.slide(s, o, i);
    }
  }

  writeURL(e) {
    let t = this.Reveal.getConfig(),
        i = this.Reveal.getCurrentSlide();
    if (clearTimeout(this.writeURLTimeout), "number" == typeof e) this.writeURLTimeout = setTimeout(this.writeURL, e);else if (i) {
      let e = this.getHash();
      t.history ? window.location.hash = e : t.hash && ("/" === e ? window.history.replaceState(null, null, window.location.pathname + window.location.search) : window.history.replaceState(null, null, "#" + e));
    }
  }

  getHash(e) {
    let t = "/",
        i = e || this.Reveal.getCurrentSlide(),
        a = i ? i.getAttribute("id") : null;
    a && (a = encodeURIComponent(a));
    let n = this.Reveal.getIndices(e);
    if (this.Reveal.getConfig().fragmentInURL || (n.f = void 0), "string" == typeof a && a.length) t = "/" + a, n.f >= 0 && (t += "/" + n.f);else {
      let e = this.Reveal.getConfig().hashOneBasedIndex ? 1 : 0;
      (n.h > 0 || n.v > 0 || n.f >= 0) && (t += n.h + e), (n.v > 0 || n.f >= 0) && (t += "/" + (n.v + e)), n.f >= 0 && (t += "/" + n.f);
    }
    return t;
  }

  onWindowHashChange(e) {
    this.readURL();
  }

}

class D {
  constructor(e) {
    this.Reveal = e, this.onNavigateLeftClicked = this.onNavigateLeftClicked.bind(this), this.onNavigateRightClicked = this.onNavigateRightClicked.bind(this), this.onNavigateUpClicked = this.onNavigateUpClicked.bind(this), this.onNavigateDownClicked = this.onNavigateDownClicked.bind(this), this.onNavigatePrevClicked = this.onNavigatePrevClicked.bind(this), this.onNavigateNextClicked = this.onNavigateNextClicked.bind(this);
  }

  render() {
    const e = this.Reveal.getConfig().rtl,
          t = this.Reveal.getRevealElement();
    this.element = document.createElement("aside"), this.element.className = "controls", this.element.innerHTML = `<button class="navigate-left" aria-label="${e ? "next slide" : "previous slide"}"><div class="controls-arrow"></div></button>\n\t\t\t<button class="navigate-right" aria-label="${e ? "previous slide" : "next slide"}"><div class="controls-arrow"></div></button>\n\t\t\t<button class="navigate-up" aria-label="above slide"><div class="controls-arrow"></div></button>\n\t\t\t<button class="navigate-down" aria-label="below slide"><div class="controls-arrow"></div></button>`, this.Reveal.getRevealElement().appendChild(this.element), this.controlsLeft = a(t, ".navigate-left"), this.controlsRight = a(t, ".navigate-right"), this.controlsUp = a(t, ".navigate-up"), this.controlsDown = a(t, ".navigate-down"), this.controlsPrev = a(t, ".navigate-prev"), this.controlsNext = a(t, ".navigate-next"), this.controlsRightArrow = this.element.querySelector(".navigate-right"), this.controlsLeftArrow = this.element.querySelector(".navigate-left"), this.controlsDownArrow = this.element.querySelector(".navigate-down");
  }

  configure(e, t) {
    this.element.style.display = e.controls ? "block" : "none", this.element.setAttribute("data-controls-layout", e.controlsLayout), this.element.setAttribute("data-controls-back-arrows", e.controlsBackArrows);
  }

  bind() {
    let e = ["touchstart", "click"];
    f && (e = ["touchstart"]), e.forEach(e => {
      this.controlsLeft.forEach(t => t.addEventListener(e, this.onNavigateLeftClicked, !1)), this.controlsRight.forEach(t => t.addEventListener(e, this.onNavigateRightClicked, !1)), this.controlsUp.forEach(t => t.addEventListener(e, this.onNavigateUpClicked, !1)), this.controlsDown.forEach(t => t.addEventListener(e, this.onNavigateDownClicked, !1)), this.controlsPrev.forEach(t => t.addEventListener(e, this.onNavigatePrevClicked, !1)), this.controlsNext.forEach(t => t.addEventListener(e, this.onNavigateNextClicked, !1));
    });
  }

  unbind() {
    ["touchstart", "click"].forEach(e => {
      this.controlsLeft.forEach(t => t.removeEventListener(e, this.onNavigateLeftClicked, !1)), this.controlsRight.forEach(t => t.removeEventListener(e, this.onNavigateRightClicked, !1)), this.controlsUp.forEach(t => t.removeEventListener(e, this.onNavigateUpClicked, !1)), this.controlsDown.forEach(t => t.removeEventListener(e, this.onNavigateDownClicked, !1)), this.controlsPrev.forEach(t => t.removeEventListener(e, this.onNavigatePrevClicked, !1)), this.controlsNext.forEach(t => t.removeEventListener(e, this.onNavigateNextClicked, !1));
    });
  }

  update() {
    let e = this.Reveal.availableRoutes();
    [...this.controlsLeft, ...this.controlsRight, ...this.controlsUp, ...this.controlsDown, ...this.controlsPrev, ...this.controlsNext].forEach(e => {
      e.classList.remove("enabled", "fragmented"), e.setAttribute("disabled", "disabled");
    }), e.left && this.controlsLeft.forEach(e => {
      e.classList.add("enabled"), e.removeAttribute("disabled");
    }), e.right && this.controlsRight.forEach(e => {
      e.classList.add("enabled"), e.removeAttribute("disabled");
    }), e.up && this.controlsUp.forEach(e => {
      e.classList.add("enabled"), e.removeAttribute("disabled");
    }), e.down && this.controlsDown.forEach(e => {
      e.classList.add("enabled"), e.removeAttribute("disabled");
    }), (e.left || e.up) && this.controlsPrev.forEach(e => {
      e.classList.add("enabled"), e.removeAttribute("disabled");
    }), (e.right || e.down) && this.controlsNext.forEach(e => {
      e.classList.add("enabled"), e.removeAttribute("disabled");
    });
    let t = this.Reveal.getCurrentSlide();

    if (t) {
      let e = this.Reveal.fragments.availableRoutes();
      e.prev && this.controlsPrev.forEach(e => {
        e.classList.add("fragmented", "enabled"), e.removeAttribute("disabled");
      }), e.next && this.controlsNext.forEach(e => {
        e.classList.add("fragmented", "enabled"), e.removeAttribute("disabled");
      }), this.Reveal.isVerticalSlide(t) ? (e.prev && this.controlsUp.forEach(e => {
        e.classList.add("fragmented", "enabled"), e.removeAttribute("disabled");
      }), e.next && this.controlsDown.forEach(e => {
        e.classList.add("fragmented", "enabled"), e.removeAttribute("disabled");
      })) : (e.prev && this.controlsLeft.forEach(e => {
        e.classList.add("fragmented", "enabled"), e.removeAttribute("disabled");
      }), e.next && this.controlsRight.forEach(e => {
        e.classList.add("fragmented", "enabled"), e.removeAttribute("disabled");
      }));
    }

    if (this.Reveal.getConfig().controlsTutorial) {
      let t = this.Reveal.getIndices();
      !this.Reveal.hasNavigatedVertically() && e.down ? this.controlsDownArrow.classList.add("highlight") : (this.controlsDownArrow.classList.remove("highlight"), this.Reveal.getConfig().rtl ? !this.Reveal.hasNavigatedHorizontally() && e.left && 0 === t.v ? this.controlsLeftArrow.classList.add("highlight") : this.controlsLeftArrow.classList.remove("highlight") : !this.Reveal.hasNavigatedHorizontally() && e.right && 0 === t.v ? this.controlsRightArrow.classList.add("highlight") : this.controlsRightArrow.classList.remove("highlight"));
    }
  }

  onNavigateLeftClicked(e) {
    e.preventDefault(), this.Reveal.onUserInput(), "linear" === this.Reveal.getConfig().navigationMode ? this.Reveal.prev() : this.Reveal.left();
  }

  onNavigateRightClicked(e) {
    e.preventDefault(), this.Reveal.onUserInput(), "linear" === this.Reveal.getConfig().navigationMode ? this.Reveal.next() : this.Reveal.right();
  }

  onNavigateUpClicked(e) {
    e.preventDefault(), this.Reveal.onUserInput(), this.Reveal.up();
  }

  onNavigateDownClicked(e) {
    e.preventDefault(), this.Reveal.onUserInput(), this.Reveal.down();
  }

  onNavigatePrevClicked(e) {
    e.preventDefault(), this.Reveal.onUserInput(), this.Reveal.prev();
  }

  onNavigateNextClicked(e) {
    e.preventDefault(), this.Reveal.onUserInput(), this.Reveal.next();
  }

}

class I {
  constructor(e) {
    this.Reveal = e, this.onProgressClicked = this.onProgressClicked.bind(this);
  }

  render() {
    this.element = document.createElement("div"), this.element.className = "progress", this.Reveal.getRevealElement().appendChild(this.element), this.bar = document.createElement("span"), this.element.appendChild(this.bar);
  }

  configure(e, t) {
    this.element.style.display = e.progress ? "block" : "none";
  }

  bind() {
    this.Reveal.getConfig().progress && this.element && this.element.addEventListener("click", this.onProgressClicked, !1);
  }

  unbind() {
    this.Reveal.getConfig().progress && this.element && this.element.removeEventListener("click", this.onProgressClicked, !1);
  }

  update() {
    if (this.Reveal.getConfig().progress && this.bar) {
      let e = this.Reveal.getProgress();
      this.Reveal.getTotalSlides() < 2 && (e = 0), this.bar.style.transform = "scaleX(" + e + ")";
    }
  }

  getMaxWidth() {
    return this.Reveal.getRevealElement().offsetWidth;
  }

  onProgressClicked(e) {
    this.Reveal.onUserInput(e), e.preventDefault();
    let t = this.Reveal.getSlides(),
        i = t.length,
        a = Math.floor(e.clientX / this.getMaxWidth() * i);
    this.Reveal.getConfig().rtl && (a = i - a);
    let n = this.Reveal.getIndices(t[a]);
    this.Reveal.slide(n.h, n.v);
  }

}

class T {
  constructor(e) {
    this.Reveal = e, this.lastMouseWheelStep = 0, this.cursorHidden = !1, this.cursorInactiveTimeout = 0, this.onDocumentCursorActive = this.onDocumentCursorActive.bind(this), this.onDocumentMouseScroll = this.onDocumentMouseScroll.bind(this);
  }

  configure(e, t) {
    e.mouseWheel ? (document.addEventListener("DOMMouseScroll", this.onDocumentMouseScroll, !1), document.addEventListener("mousewheel", this.onDocumentMouseScroll, !1)) : (document.removeEventListener("DOMMouseScroll", this.onDocumentMouseScroll, !1), document.removeEventListener("mousewheel", this.onDocumentMouseScroll, !1)), e.hideInactiveCursor ? (document.addEventListener("mousemove", this.onDocumentCursorActive, !1), document.addEventListener("mousedown", this.onDocumentCursorActive, !1)) : (this.showCursor(), document.removeEventListener("mousemove", this.onDocumentCursorActive, !1), document.removeEventListener("mousedown", this.onDocumentCursorActive, !1));
  }

  showCursor() {
    this.cursorHidden && (this.cursorHidden = !1, this.Reveal.getRevealElement().style.cursor = "");
  }

  hideCursor() {
    !1 === this.cursorHidden && (this.cursorHidden = !0, this.Reveal.getRevealElement().style.cursor = "none");
  }

  onDocumentCursorActive(e) {
    this.showCursor(), clearTimeout(this.cursorInactiveTimeout), this.cursorInactiveTimeout = setTimeout(this.hideCursor.bind(this), this.Reveal.getConfig().hideCursorTime);
  }

  onDocumentMouseScroll(e) {
    if (Date.now() - this.lastMouseWheelStep > 1e3) {
      this.lastMouseWheelStep = Date.now();
      let t = e.detail || -e.wheelDelta;
      t > 0 ? this.Reveal.next() : t < 0 && this.Reveal.prev();
    }
  }

}

const z = (e, t) => {
  const i = document.createElement("script");
  i.type = "text/javascript", i.async = !1, i.defer = !1, i.src = e, "function" == typeof t && (i.onload = i.onreadystatechange = e => {
    ("load" === e.type || /loaded|complete/.test(i.readyState)) && (i.onload = i.onreadystatechange = i.onerror = null, t());
  }, i.onerror = e => {
    i.onload = i.onreadystatechange = i.onerror = null, t(new Error("Failed loading script: " + i.src + "\n" + e));
  });
  const a = document.querySelector("head");
  a.insertBefore(i, a.lastChild);
};

class H {
  constructor(e) {
    this.Reveal = e, this.state = "idle", this.registeredPlugins = {}, this.asyncDependencies = [];
  }

  load(e, t) {
    return this.state = "loading", e.forEach(this.registerPlugin.bind(this)), new Promise(e => {
      let i = [],
          a = 0;

      if (t.forEach(e => {
        e.condition && !e.condition() || (e.async ? this.asyncDependencies.push(e) : i.push(e));
      }), i.length) {
        a = i.length;

        const t = t => {
          t && "function" == typeof t.callback && t.callback(), 0 == --a && this.initPlugins().then(e);
        };

        i.forEach(e => {
          "string" == typeof e.id ? (this.registerPlugin(e), t(e)) : "string" == typeof e.src ? z(e.src, () => t(e)) : (console.warn("Unrecognized plugin format", e), t());
        });
      } else this.initPlugins().then(e);
    });
  }

  initPlugins() {
    return new Promise(e => {
      let t = Object.values(this.registeredPlugins),
          i = t.length;
      if (0 === i) this.loadAsync().then(e);else {
        let a,
            n = () => {
          0 == --i ? this.loadAsync().then(e) : a();
        },
            s = 0;

        a = () => {
          let e = t[s++];

          if ("function" == typeof e.init) {
            let t = e.init(this.Reveal);
            t && "function" == typeof t.then ? t.then(n) : n();
          } else n();
        }, a();
      }
    });
  }

  loadAsync() {
    return this.state = "loaded", this.asyncDependencies.length && this.asyncDependencies.forEach(e => {
      z(e.src, e.callback);
    }), Promise.resolve();
  }

  registerPlugin(e) {
    2 === arguments.length && "string" == typeof arguments[0] ? (e = arguments[1]).id = arguments[0] : "function" == typeof e && (e = e());
    let t = e.id;
    "string" != typeof t ? console.warn("Unrecognized plugin format; can't find plugin.id", e) : void 0 === this.registeredPlugins[t] ? (this.registeredPlugins[t] = e, "loaded" === this.state && "function" == typeof e.init && e.init(this.Reveal)) : console.warn('reveal.js: "' + t + '" plugin has already been registered');
  }

  hasPlugin(e) {
    return !!this.registeredPlugins[e];
  }

  getPlugin(e) {
    return this.registeredPlugins[e];
  }

  getRegisteredPlugins() {
    return this.registeredPlugins;
  }

}

class B {
  constructor(e) {
    this.Reveal = e;
  }

  async setupPDF() {
    const e = this.Reveal.getConfig(),
          t = a(this.Reveal.getRevealElement(), ".slides section"),
          i = e.slideNumber && /all|print/i.test(e.showSlideNumber),
          n = this.Reveal.getComputedSlideSize(window.innerWidth, window.innerHeight),
          s = Math.floor(n.width * (1 + e.margin)),
          o = Math.floor(n.height * (1 + e.margin)),
          r = n.width,
          l = n.height;
    await new Promise(requestAnimationFrame), c("@page{size:" + s + "px " + o + "px; margin: 0px;}"), c(".reveal section>img, .reveal section>video, .reveal section>iframe{max-width: " + r + "px; max-height:" + l + "px}"), document.documentElement.classList.add("print-pdf"), document.body.style.width = s + "px", document.body.style.height = o + "px", await new Promise(requestAnimationFrame), this.Reveal.layoutSlideContents(r, l), t.forEach(e => this.Reveal.slideContent.layout(e)), await new Promise(requestAnimationFrame);
    const d = t.map(e => e.scrollHeight),
          h = [],
          u = t[0].parentNode;
    t.forEach(function (t, n) {
      if (!1 === t.classList.contains("stack")) {
        let c = (s - r) / 2,
            u = (o - l) / 2;
        const g = d[n];
        let v = Math.max(Math.ceil(g / o), 1);
        v = Math.min(v, e.pdfMaxPagesPerSlide), (1 === v && e.center || t.classList.contains("center")) && (u = Math.max((o - g) / 2, 0));
        const p = document.createElement("div");

        if (h.push(p), p.className = "pdf-page", p.style.height = (o + e.pdfPageHeightOffset) * v + "px", p.appendChild(t), t.style.left = c + "px", t.style.top = u + "px", t.style.width = r + "px", t.slideBackgroundElement && p.insertBefore(t.slideBackgroundElement, t), e.showNotes) {
          const i = this.Reveal.getSlideNotes(t);

          if (i) {
            const t = 8,
                  a = "string" == typeof e.showNotes ? e.showNotes : "inline",
                  n = document.createElement("div");
            n.classList.add("speaker-notes"), n.classList.add("speaker-notes-pdf"), n.setAttribute("data-layout", a), n.innerHTML = i, "separate-page" === a ? h.push(n) : (n.style.left = t + "px", n.style.bottom = t + "px", n.style.width = s - 2 * t + "px", p.appendChild(n));
          }
        }

        if (i) {
          const e = n + 1,
                t = document.createElement("div");
          t.classList.add("slide-number"), t.classList.add("slide-number-pdf"), t.innerHTML = e, p.appendChild(t);
        }

        if (e.pdfSeparateFragments) {
          const e = this.Reveal.fragments.sort(p.querySelectorAll(".fragment"), !0);
          let t;
          e.forEach(function (e) {
            t && t.forEach(function (e) {
              e.classList.remove("current-fragment");
            }), e.forEach(function (e) {
              e.classList.add("visible", "current-fragment");
            }, this);
            const i = p.cloneNode(!0);
            h.push(i), t = e;
          }, this), e.forEach(function (e) {
            e.forEach(function (e) {
              e.classList.remove("visible", "current-fragment");
            });
          });
        } else a(p, ".fragment:not(.fade-out)").forEach(function (e) {
          e.classList.add("visible");
        });
      }
    }, this), await new Promise(requestAnimationFrame), h.forEach(e => u.appendChild(e)), this.Reveal.dispatchEvent({
      type: "pdf-ready"
    });
  }

  isPrintingPDF() {
    return /print-pdf/gi.test(window.location.search);
  }

}

class q {
  constructor(e) {
    this.Reveal = e, this.touchStartX = 0, this.touchStartY = 0, this.touchStartCount = 0, this.touchCaptured = !1, this.onPointerDown = this.onPointerDown.bind(this), this.onPointerMove = this.onPointerMove.bind(this), this.onPointerUp = this.onPointerUp.bind(this), this.onTouchStart = this.onTouchStart.bind(this), this.onTouchMove = this.onTouchMove.bind(this), this.onTouchEnd = this.onTouchEnd.bind(this);
  }

  bind() {
    let e = this.Reveal.getRevealElement();
    "onpointerdown" in window ? (e.addEventListener("pointerdown", this.onPointerDown, !1), e.addEventListener("pointermove", this.onPointerMove, !1), e.addEventListener("pointerup", this.onPointerUp, !1)) : window.navigator.msPointerEnabled ? (e.addEventListener("MSPointerDown", this.onPointerDown, !1), e.addEventListener("MSPointerMove", this.onPointerMove, !1), e.addEventListener("MSPointerUp", this.onPointerUp, !1)) : (e.addEventListener("touchstart", this.onTouchStart, !1), e.addEventListener("touchmove", this.onTouchMove, !1), e.addEventListener("touchend", this.onTouchEnd, !1));
  }

  unbind() {
    let e = this.Reveal.getRevealElement();
    e.removeEventListener("pointerdown", this.onPointerDown, !1), e.removeEventListener("pointermove", this.onPointerMove, !1), e.removeEventListener("pointerup", this.onPointerUp, !1), e.removeEventListener("MSPointerDown", this.onPointerDown, !1), e.removeEventListener("MSPointerMove", this.onPointerMove, !1), e.removeEventListener("MSPointerUp", this.onPointerUp, !1), e.removeEventListener("touchstart", this.onTouchStart, !1), e.removeEventListener("touchmove", this.onTouchMove, !1), e.removeEventListener("touchend", this.onTouchEnd, !1);
  }

  isSwipePrevented(e) {
    if (r(e, "video, audio")) return !0;

    for (; e && "function" == typeof e.hasAttribute;) {
      if (e.hasAttribute("data-prevent-swipe")) return !0;
      e = e.parentNode;
    }

    return !1;
  }

  onTouchStart(e) {
    if (this.isSwipePrevented(e.target)) return !0;
    this.touchStartX = e.touches[0].clientX, this.touchStartY = e.touches[0].clientY, this.touchStartCount = e.touches.length;
  }

  onTouchMove(e) {
    if (this.isSwipePrevented(e.target)) return !0;
    let t = this.Reveal.getConfig();
    if (this.touchCaptured) f && e.preventDefault();else {
      this.Reveal.onUserInput(e);
      let i = e.touches[0].clientX,
          a = e.touches[0].clientY;

      if (1 === e.touches.length && 2 !== this.touchStartCount) {
        let n = this.Reveal.availableRoutes({
          includeFragments: !0
        }),
            s = i - this.touchStartX,
            o = a - this.touchStartY;
        s > 40 && Math.abs(s) > Math.abs(o) ? (this.touchCaptured = !0, "linear" === t.navigationMode ? t.rtl ? this.Reveal.next() : this.Reveal.prev() : this.Reveal.left()) : s < -40 && Math.abs(s) > Math.abs(o) ? (this.touchCaptured = !0, "linear" === t.navigationMode ? t.rtl ? this.Reveal.prev() : this.Reveal.next() : this.Reveal.right()) : o > 40 && n.up ? (this.touchCaptured = !0, "linear" === t.navigationMode ? this.Reveal.prev() : this.Reveal.up()) : o < -40 && n.down && (this.touchCaptured = !0, "linear" === t.navigationMode ? this.Reveal.next() : this.Reveal.down()), t.embedded ? (this.touchCaptured || this.Reveal.isVerticalSlide()) && e.preventDefault() : e.preventDefault();
      }
    }
  }

  onTouchEnd(e) {
    this.touchCaptured = !1;
  }

  onPointerDown(e) {
    e.pointerType !== e.MSPOINTER_TYPE_TOUCH && "touch" !== e.pointerType || (e.touches = [{
      clientX: e.clientX,
      clientY: e.clientY
    }], this.onTouchStart(e));
  }

  onPointerMove(e) {
    e.pointerType !== e.MSPOINTER_TYPE_TOUCH && "touch" !== e.pointerType || (e.touches = [{
      clientX: e.clientX,
      clientY: e.clientY
    }], this.onTouchMove(e));
  }

  onPointerUp(e) {
    e.pointerType !== e.MSPOINTER_TYPE_TOUCH && "touch" !== e.pointerType || (e.touches = [{
      clientX: e.clientX,
      clientY: e.clientY
    }], this.onTouchEnd(e));
  }

}

class F {
  constructor(e) {
    this.Reveal = e, this.onRevealPointerDown = this.onRevealPointerDown.bind(this), this.onDocumentPointerDown = this.onDocumentPointerDown.bind(this);
  }

  configure(e, t) {
    e.embedded ? this.blur() : (this.focus(), this.unbind());
  }

  bind() {
    this.Reveal.getConfig().embedded && this.Reveal.getRevealElement().addEventListener("pointerdown", this.onRevealPointerDown, !1);
  }

  unbind() {
    this.Reveal.getRevealElement().removeEventListener("pointerdown", this.onRevealPointerDown, !1), document.removeEventListener("pointerdown", this.onDocumentPointerDown, !1);
  }

  focus() {
    "focus" !== this.state && (this.Reveal.getRevealElement().classList.add("focused"), document.addEventListener("pointerdown", this.onDocumentPointerDown, !1)), this.state = "focus";
  }

  blur() {
    "blur" !== this.state && (this.Reveal.getRevealElement().classList.remove("focused"), document.removeEventListener("pointerdown", this.onDocumentPointerDown, !1)), this.state = "blur";
  }

  isFocused() {
    return "focus" === this.state;
  }

  onRevealPointerDown(e) {
    this.focus();
  }

  onDocumentPointerDown(e) {
    let t = l(e.target, ".reveal");
    t && t === this.Reveal.getRevealElement() || this.blur();
  }

}

class U {
  constructor(e) {
    this.Reveal = e;
  }

  render() {
    this.element = document.createElement("div"), this.element.className = "speaker-notes", this.element.setAttribute("data-prevent-swipe", ""), this.element.setAttribute("tabindex", "0"), this.Reveal.getRevealElement().appendChild(this.element);
  }

  configure(e, t) {
    e.showNotes && this.element.setAttribute("data-layout", "string" == typeof e.showNotes ? e.showNotes : "inline");
  }

  update() {
    this.Reveal.getConfig().showNotes && this.element && this.Reveal.getCurrentSlide() && !this.Reveal.print.isPrintingPDF() && (this.element.innerHTML = this.getSlideNotes() || '<span class="notes-placeholder">No notes on this slide.</span>');
  }

  updateVisibility() {
    this.Reveal.getConfig().showNotes && this.hasNotes() && !this.Reveal.print.isPrintingPDF() ? this.Reveal.getRevealElement().classList.add("show-notes") : this.Reveal.getRevealElement().classList.remove("show-notes");
  }

  hasNotes() {
    return this.Reveal.getSlidesElement().querySelectorAll("[data-notes], aside.notes").length > 0;
  }

  isSpeakerNotesWindow() {
    return !!window.location.search.match(/receiver/gi);
  }

  getSlideNotes(e = this.Reveal.getCurrentSlide()) {
    if (e.hasAttribute("data-notes")) return e.getAttribute("data-notes");
    let t = e.querySelector("aside.notes");
    return t ? t.innerHTML : null;
  }

}

class O {
  constructor(e, t) {
    this.diameter = 100, this.diameter2 = this.diameter / 2, this.thickness = 6, this.playing = !1, this.progress = 0, this.progressOffset = 1, this.container = e, this.progressCheck = t, this.canvas = document.createElement("canvas"), this.canvas.className = "playback", this.canvas.width = this.diameter, this.canvas.height = this.diameter, this.canvas.style.width = this.diameter2 + "px", this.canvas.style.height = this.diameter2 + "px", this.context = this.canvas.getContext("2d"), this.container.appendChild(this.canvas), this.render();
  }

  setPlaying(e) {
    const t = this.playing;
    this.playing = e, !t && this.playing ? this.animate() : this.render();
  }

  animate() {
    const e = this.progress;
    this.progress = this.progressCheck(), e > .8 && this.progress < .2 && (this.progressOffset = this.progress), this.render(), this.playing && requestAnimationFrame(this.animate.bind(this));
  }

  render() {
    let e = this.playing ? this.progress : 0,
        t = this.diameter2 - this.thickness,
        i = this.diameter2,
        a = this.diameter2,
        n = 28;
    this.progressOffset += .1 * (1 - this.progressOffset);
    const s = -Math.PI / 2 + e * (2 * Math.PI),
          o = -Math.PI / 2 + this.progressOffset * (2 * Math.PI);
    this.context.save(), this.context.clearRect(0, 0, this.diameter, this.diameter), this.context.beginPath(), this.context.arc(i, a, t + 4, 0, 2 * Math.PI, !1), this.context.fillStyle = "rgba( 0, 0, 0, 0.4 )", this.context.fill(), this.context.beginPath(), this.context.arc(i, a, t, 0, 2 * Math.PI, !1), this.context.lineWidth = this.thickness, this.context.strokeStyle = "rgba( 255, 255, 255, 0.2 )", this.context.stroke(), this.playing && (this.context.beginPath(), this.context.arc(i, a, t, o, s, !1), this.context.lineWidth = this.thickness, this.context.strokeStyle = "#fff", this.context.stroke()), this.context.translate(i - 14, a - 14), this.playing ? (this.context.fillStyle = "#fff", this.context.fillRect(0, 0, 10, n), this.context.fillRect(18, 0, 10, n)) : (this.context.beginPath(), this.context.translate(4, 0), this.context.moveTo(0, 0), this.context.lineTo(24, 14), this.context.lineTo(0, n), this.context.fillStyle = "#fff", this.context.fill()), this.context.restore();
  }

  on(e, t) {
    this.canvas.addEventListener(e, t, !1);
  }

  off(e, t) {
    this.canvas.removeEventListener(e, t, !1);
  }

  destroy() {
    this.playing = !1, this.canvas.parentNode && this.container.removeChild(this.canvas);
  }

}

var W = {
  width: 960,
  height: 700,
  margin: .04,
  minScale: .2,
  maxScale: 2,
  controls: !0,
  controlsTutorial: !0,
  controlsLayout: "bottom-right",
  controlsBackArrows: "faded",
  progress: !0,
  slideNumber: !1,
  showSlideNumber: "all",
  hashOneBasedIndex: !1,
  hash: !1,
  respondToHashChanges: !0,
  history: !1,
  keyboard: !0,
  keyboardCondition: null,
  disableLayout: !1,
  overview: !0,
  center: !0,
  touch: !0,
  loop: !1,
  rtl: !1,
  navigationMode: "default",
  shuffle: !1,
  fragments: !0,
  fragmentInURL: !0,
  embedded: !1,
  help: !0,
  pause: !0,
  showNotes: !1,
  showHiddenSlides: !1,
  autoPlayMedia: null,
  preloadIframes: null,
  autoAnimate: !0,
  autoAnimateMatcher: null,
  autoAnimateEasing: "ease",
  autoAnimateDuration: 1,
  autoAnimateUnmatched: !0,
  autoAnimateStyles: ["opacity", "color", "background-color", "padding", "font-size", "line-height", "letter-spacing", "border-width", "border-color", "border-radius", "outline", "outline-offset"],
  autoSlide: 0,
  autoSlideStoppable: !0,
  autoSlideMethod: null,
  defaultTiming: null,
  mouseWheel: !1,
  previewLinks: !1,
  postMessage: !0,
  postMessageEvents: !1,
  focusBodyOnPageVisibilityChange: !0,
  transition: "slide",
  transitionSpeed: "default",
  backgroundTransition: "fade",
  parallaxBackgroundImage: "",
  parallaxBackgroundSize: "",
  parallaxBackgroundRepeat: "",
  parallaxBackgroundPosition: "",
  parallaxBackgroundHorizontal: null,
  parallaxBackgroundVertical: null,
  pdfMaxPagesPerSlide: Number.POSITIVE_INFINITY,
  pdfSeparateFragments: !0,
  pdfPageHeightOffset: -1,
  viewDistance: 3,
  mobileViewDistance: 2,
  display: "block",
  hideInactiveCursor: !0,
  hideCursorTime: 5e3,
  dependencies: [],
  plugins: []
};

function V(t, r) {
  arguments.length < 2 && (r = arguments[0], t = document.querySelector(".reveal"));
  const c = {};

  let g,
      v,
      m,
      f,
      y,
      w = {},
      R = !1,
      A = {
    hasNavigatedHorizontally: !1,
    hasNavigatedVertically: !1
  },
      L = [],
      z = 1,
      V = {
    layout: "",
    overview: ""
  },
      $ = {},
      K = "idle",
      j = 0,
      X = 0,
      Y = -1,
      _ = !1,
      J = new S(c),
      Q = new E(c),
      Z = new x(c),
      G = new k(c),
      ee = new C(c),
      te = new P(c),
      ie = new N(c),
      ae = new M(c),
      ne = new D(c),
      se = new I(c),
      oe = new T(c),
      re = new H(c),
      le = new B(c),
      de = new F(c),
      ce = new q(c),
      he = new U(c);

  function ue(e) {
    return $.wrapper = t, $.slides = t.querySelector(".slides"), w = { ...W,
      ...w,
      ...r,
      ...e,
      ...h()
    }, ge(), window.addEventListener("load", He, !1), re.load(w.plugins, w.dependencies).then(ve), new Promise(e => c.on("ready", e));
  }

  function ge() {
    !0 === w.embedded ? $.viewport = l(t, ".reveal-viewport") || t : ($.viewport = document.body, document.documentElement.classList.add("reveal-full-page")), $.viewport.classList.add("reveal-viewport");
  }

  function ve() {
    R = !0, pe(), me(), Re(), we(), et(), Se(), ae.readURL(), G.update(!0), setTimeout(() => {
      $.slides.classList.remove("no-transition"), $.wrapper.classList.add("ready"), Ce({
        type: "ready",
        data: {
          indexh: g,
          indexv: v,
          currentSlide: f
        }
      });
    }, 1), le.isPrintingPDF() && (Ae(), "complete" === document.readyState ? le.setupPDF() : window.addEventListener("load", () => {
      le.setupPDF();
    }));
  }

  function pe() {
    w.showHiddenSlides || a($.wrapper, 'section[data-visibility="hidden"]').forEach(e => {
      e.parentNode.removeChild(e);
    });
  }

  function me() {
    $.slides.classList.add("no-transition"), p ? $.wrapper.classList.add("no-hover") : $.wrapper.classList.remove("no-hover"), G.render(), Q.render(), ne.render(), se.render(), he.render(), $.pauseOverlay = d($.wrapper, "div", "pause-overlay", w.controls ? '<button class="resume-button">Resume presentation</button>' : null), $.statusElement = fe(), $.wrapper.setAttribute("role", "application");
  }

  function fe() {
    let e = $.wrapper.querySelector(".aria-status");
    return e || (e = document.createElement("div"), e.style.position = "absolute", e.style.height = "1px", e.style.width = "1px", e.style.overflow = "hidden", e.style.clip = "rect( 1px, 1px, 1px, 1px )", e.classList.add("aria-status"), e.setAttribute("aria-live", "polite"), e.setAttribute("aria-atomic", "true"), $.wrapper.appendChild(e)), e;
  }

  function be(e) {
    $.statusElement.textContent = e;
  }

  function ye(e) {
    let t = "";
    if (3 === e.nodeType) t += e.textContent;else if (1 === e.nodeType) {
      let i = e.getAttribute("aria-hidden"),
          a = "none" === window.getComputedStyle(e).display;
      "true" === i || a || Array.from(e.childNodes).forEach(e => {
        t += ye(e);
      });
    }
    return t = t.trim(), "" === t ? "" : t + " ";
  }

  function we() {
    setInterval(() => {
      0 === $.wrapper.scrollTop && 0 === $.wrapper.scrollLeft || ($.wrapper.scrollTop = 0, $.wrapper.scrollLeft = 0);
    }, 1e3);
  }

  function Re() {
    w.postMessage && window.addEventListener("message", t => {
      let i = t.data;
      if ("string" == typeof i && "{" === i.charAt(0) && "}" === i.charAt(i.length - 1) && (i = JSON.parse(i), i.method && "function" == typeof c[i.method])) if (!1 === e.test(i.method)) {
        const e = c[i.method].apply(c, i.args);
        Pe("callback", {
          method: i.method,
          result: e
        });
      } else console.warn('reveal.js: "' + i.method + '" is is blacklisted from the postMessage API');
    }, !1);
  }

  function Se(e) {
    const t = { ...w
    };
    if ("object" == typeof e && i(w, e), !1 === c.isReady()) return;
    const a = $.wrapper.querySelectorAll(".slides section").length;
    $.wrapper.classList.remove(t.transition), $.wrapper.classList.add(w.transition), $.wrapper.setAttribute("data-transition-speed", w.transitionSpeed), $.wrapper.setAttribute("data-background-transition", w.backgroundTransition), $.viewport.style.setProperty("--slide-width", w.width + "px"), $.viewport.style.setProperty("--slide-height", w.height + "px"), w.shuffle && tt(), n($.wrapper, "embedded", w.embedded), n($.wrapper, "rtl", w.rtl), n($.wrapper, "center", w.center), !1 === w.pause && je(), w.previewLinks ? (Ne(), Me("[data-preview-link=false]")) : (Me(), Ne("[data-preview-link]:not([data-preview-link=false])")), Z.reset(), y && (y.destroy(), y = null), a > 1 && w.autoSlide && w.autoSlideStoppable && (y = new O($.wrapper, () => Math.min(Math.max((Date.now() - Y) / j, 0), 1)), y.on("click", zt), _ = !1), "default" !== w.navigationMode ? $.wrapper.setAttribute("data-navigation-mode", w.navigationMode) : $.wrapper.removeAttribute("data-navigation-mode"), he.configure(w, t), de.configure(w, t), oe.configure(w, t), ne.configure(w, t), se.configure(w, t), ie.configure(w, t), ee.configure(w, t), Q.configure(w, t), Ze();
  }

  function Ee() {
    window.addEventListener("resize", Dt, !1), w.touch && ce.bind(), w.keyboard && ie.bind(), w.progress && se.bind(), w.respondToHashChanges && ae.bind(), ne.bind(), de.bind(), $.slides.addEventListener("transitionend", Mt, !1), $.pauseOverlay.addEventListener("click", je, !1), w.focusBodyOnPageVisibilityChange && document.addEventListener("visibilitychange", It, !1);
  }

  function Ae() {
    ce.unbind(), de.unbind(), ie.unbind(), ne.unbind(), se.unbind(), ae.unbind(), window.removeEventListener("resize", Dt, !1), $.slides.removeEventListener("transitionend", Mt, !1), $.pauseOverlay.removeEventListener("click", je, !1);
  }

  function ke(e, i, a) {
    t.addEventListener(e, i, a);
  }

  function Le(e, i, a) {
    t.removeEventListener(e, i, a);
  }

  function xe(e) {
    "string" == typeof e.layout && (V.layout = e.layout), "string" == typeof e.overview && (V.overview = e.overview), V.layout ? o($.slides, V.layout + " " + V.overview) : o($.slides, V.overview);
  }

  function Ce({
    target: e = $.wrapper,
    type: t,
    data: a,
    bubbles: n = !0
  }) {
    let s = document.createEvent("HTMLEvents", 1, 2);
    s.initEvent(t, n, !0), i(s, a), e.dispatchEvent(s), e === $.wrapper && Pe(t);
  }

  function Pe(e, t) {
    if (w.postMessageEvents && window.parent !== window.self) {
      let a = {
        namespace: "reveal",
        eventName: e,
        state: bt()
      };
      i(a, t), window.parent.postMessage(JSON.stringify(a), "*");
    }
  }

  function Ne(e = "a") {
    Array.from($.wrapper.querySelectorAll(e)).forEach(e => {
      /^(http|www)/gi.test(e.getAttribute("href")) && e.addEventListener("click", Tt, !1);
    });
  }

  function Me(e = "a") {
    Array.from($.wrapper.querySelectorAll(e)).forEach(e => {
      /^(http|www)/gi.test(e.getAttribute("href")) && e.removeEventListener("click", Tt, !1);
    });
  }

  function De(e) {
    ze(), $.overlay = document.createElement("div"), $.overlay.classList.add("overlay"), $.overlay.classList.add("overlay-preview"), $.wrapper.appendChild($.overlay), $.overlay.innerHTML = `<header>\n\t\t\t\t<a class="close" href="#"><span class="icon"></span></a>\n\t\t\t\t<a class="external" href="${e}" target="_blank"><span class="icon"></span></a>\n\t\t\t</header>\n\t\t\t<div class="spinner"></div>\n\t\t\t<div class="viewport">\n\t\t\t\t<iframe src="${e}"></iframe>\n\t\t\t\t<small class="viewport-inner">\n\t\t\t\t\t<span class="x-frame-error">Unable to load iframe. This is likely due to the site's policy (x-frame-options).</span>\n\t\t\t\t</small>\n\t\t\t</div>`, $.overlay.querySelector("iframe").addEventListener("load", e => {
      $.overlay.classList.add("loaded");
    }, !1), $.overlay.querySelector(".close").addEventListener("click", e => {
      ze(), e.preventDefault();
    }, !1), $.overlay.querySelector(".external").addEventListener("click", e => {
      ze();
    }, !1);
  }

  function Ie(e) {
    "boolean" == typeof e ? e ? Te() : ze() : $.overlay ? ze() : Te();
  }

  function Te() {
    if (w.help) {
      ze(), $.overlay = document.createElement("div"), $.overlay.classList.add("overlay"), $.overlay.classList.add("overlay-help"), $.wrapper.appendChild($.overlay);
      let e = '<p class="title">Keyboard Shortcuts</p><br/>',
          t = ie.getShortcuts(),
          i = ie.getBindings();
      e += "<table><th>KEY</th><th>ACTION</th>";

      for (let i in t) e += `<tr><td>${i}</td><td>${t[i]}</td></tr>`;

      for (let t in i) i[t].key && i[t].description && (e += `<tr><td>${i[t].key}</td><td>${i[t].description}</td></tr>`);

      e += "</table>", $.overlay.innerHTML = `\n\t\t\t\t<header>\n\t\t\t\t\t<a class="close" href="#"><span class="icon"></span></a>\n\t\t\t\t</header>\n\t\t\t\t<div class="viewport">\n\t\t\t\t\t<div class="viewport-inner">${e}</div>\n\t\t\t\t</div>\n\t\t\t`, $.overlay.querySelector(".close").addEventListener("click", e => {
        ze(), e.preventDefault();
      }, !1);
    }
  }

  function ze() {
    return !!$.overlay && ($.overlay.parentNode.removeChild($.overlay), $.overlay = null, !0);
  }

  function He() {
    if ($.wrapper && !le.isPrintingPDF()) {
      if (!w.disableLayout) {
        p && !w.embedded && document.documentElement.style.setProperty("--vh", .01 * window.innerHeight + "px");
        const e = qe(),
              t = z;
        Be(w.width, w.height), $.slides.style.width = e.width + "px", $.slides.style.height = e.height + "px", z = Math.min(e.presentationWidth / e.width, e.presentationHeight / e.height), z = Math.max(z, w.minScale), z = Math.min(z, w.maxScale), 1 === z ? ($.slides.style.zoom = "", $.slides.style.left = "", $.slides.style.top = "", $.slides.style.bottom = "", $.slides.style.right = "", xe({
          layout: ""
        })) : z > 1 && b && window.devicePixelRatio < 2 ? ($.slides.style.zoom = z, $.slides.style.left = "", $.slides.style.top = "", $.slides.style.bottom = "", $.slides.style.right = "", xe({
          layout: ""
        })) : ($.slides.style.zoom = "", $.slides.style.left = "50%", $.slides.style.top = "50%", $.slides.style.bottom = "auto", $.slides.style.right = "auto", xe({
          layout: "translate(-50%, -50%) scale(" + z + ")"
        }));
        const i = Array.from($.wrapper.querySelectorAll(".slides section"));

        for (let t = 0, a = i.length; t < a; t++) {
          const a = i[t];
          "none" !== a.style.display && (w.center || a.classList.contains("center") ? a.classList.contains("stack") ? a.style.top = 0 : a.style.top = Math.max((e.height - a.scrollHeight) / 2, 0) + "px" : a.style.top = "");
        }

        t !== z && Ce({
          type: "resize",
          data: {
            oldScale: t,
            scale: z,
            size: e
          }
        });
      }

      se.update(), G.updateParallax(), te.isActive() && te.update();
    }
  }

  function Be(e, t) {
    a($.slides, "section > .stretch, section > .r-stretch").forEach(i => {
      let a = u(i, t);

      if (/(img|video)/gi.test(i.nodeName)) {
        const t = i.naturalWidth || i.videoWidth,
              n = i.naturalHeight || i.videoHeight,
              s = Math.min(e / t, a / n);
        i.style.width = t * s + "px", i.style.height = n * s + "px";
      } else i.style.width = e + "px", i.style.height = a + "px";
    });
  }

  function qe(e, t) {
    const i = {
      width: w.width,
      height: w.height,
      presentationWidth: e || $.wrapper.offsetWidth,
      presentationHeight: t || $.wrapper.offsetHeight
    };
    return i.presentationWidth -= i.presentationWidth * w.margin, i.presentationHeight -= i.presentationHeight * w.margin, "string" == typeof i.width && /%$/.test(i.width) && (i.width = parseInt(i.width, 10) / 100 * i.presentationWidth), "string" == typeof i.height && /%$/.test(i.height) && (i.height = parseInt(i.height, 10) / 100 * i.presentationHeight), i;
  }

  function Fe(e, t) {
    "object" == typeof e && "function" == typeof e.setAttribute && e.setAttribute("data-previous-indexv", t || 0);
  }

  function Ue(e) {
    if ("object" == typeof e && "function" == typeof e.setAttribute && e.classList.contains("stack")) {
      const t = e.hasAttribute("data-start-indexv") ? "data-start-indexv" : "data-previous-indexv";
      return parseInt(e.getAttribute(t) || 0, 10);
    }

    return 0;
  }

  function Oe(e = f) {
    return e && e.parentNode && !!e.parentNode.nodeName.match(/section/i);
  }

  function We() {
    return !(!f || !Oe(f)) && !f.nextElementSibling;
  }

  function Ve() {
    return 0 === g && 0 === v;
  }

  function $e() {
    return !!f && !f.nextElementSibling && (!Oe(f) || !f.parentNode.nextElementSibling);
  }

  function Ke() {
    if (w.pause) {
      const e = $.wrapper.classList.contains("paused");
      Rt(), $.wrapper.classList.add("paused"), !1 === e && Ce({
        type: "paused"
      });
    }
  }

  function je() {
    const e = $.wrapper.classList.contains("paused");
    $.wrapper.classList.remove("paused"), wt(), e && Ce({
      type: "resumed"
    });
  }

  function Xe(e) {
    "boolean" == typeof e ? e ? Ke() : je() : Ye() ? je() : Ke();
  }

  function Ye() {
    return $.wrapper.classList.contains("paused");
  }

  function _e(e) {
    "boolean" == typeof e ? e ? Et() : St() : _ ? Et() : St();
  }

  function Je() {
    return !(!j || _);
  }

  function Qe(e, t, i, a) {
    m = f;
    const n = $.wrapper.querySelectorAll(".slides>section");
    if (0 === n.length) return;
    void 0 !== t || te.isActive() || (t = Ue(n[e])), m && m.parentNode && m.parentNode.classList.contains("stack") && Fe(m.parentNode, v);
    const s = L.concat();
    L.length = 0;
    let o = g || 0,
        r = v || 0;
    g = it(".slides>section", void 0 === e ? g : e), v = it(".slides>section.present>section", void 0 === t ? v : t);
    let l = g !== o || v !== r;
    l || (m = null);
    let d = n[g],
        c = d.querySelectorAll("section");
    f = c[v] || d;
    let h = !1;
    l && m && f && !te.isActive() && (m.hasAttribute("data-auto-animate") && f.hasAttribute("data-auto-animate") && (h = !0, $.slides.classList.add("disable-slide-transitions")), K = "running"), at(), He(), te.isActive() && te.update(), void 0 !== i && ee.goto(i), m && m !== f && (m.classList.remove("present"), m.setAttribute("aria-hidden", "true"), Ve() && setTimeout(() => {
      ht().forEach(e => {
        Fe(e, 0);
      });
    }, 0));

    e: for (let e = 0, t = L.length; e < t; e++) {
      for (let t = 0; t < s.length; t++) if (s[t] === L[e]) {
        s.splice(t, 1);
        continue e;
      }

      $.viewport.classList.add(L[e]), Ce({
        type: L[e]
      });
    }

    for (; s.length;) $.viewport.classList.remove(s.pop());

    l && Ce({
      type: "slidechanged",
      data: {
        indexh: g,
        indexv: v,
        previousSlide: m,
        currentSlide: f,
        origin: a
      }
    }), !l && m || (J.stopEmbeddedContent(m), J.startEmbeddedContent(f)), requestAnimationFrame(() => {
      be(ye(f));
    }), se.update(), ne.update(), he.update(), G.update(), G.updateParallax(), Q.update(), ee.update(), ae.writeURL(), wt(), h && (setTimeout(() => {
      $.slides.classList.remove("disable-slide-transitions");
    }, 0), w.autoAnimate && Z.run(m, f));
  }

  function Ze() {
    Ae(), Ee(), He(), j = w.autoSlide, wt(), G.create(), ae.writeURL(), ee.sortAll(), ne.update(), se.update(), at(), he.update(), he.updateVisibility(), G.update(!0), Q.update(), J.formatEmbeddedContent(), !1 === w.autoPlayMedia ? J.stopEmbeddedContent(f, {
      unloadIframes: !1
    }) : J.startEmbeddedContent(f), te.isActive() && te.layout();
  }

  function Ge(e = f) {
    G.sync(e), ee.sync(e), J.load(e), G.update(), he.update();
  }

  function et() {
    dt().forEach(e => {
      a(e, "section").forEach((e, t) => {
        t > 0 && (e.classList.remove("present"), e.classList.remove("past"), e.classList.add("future"), e.setAttribute("aria-hidden", "true"));
      });
    });
  }

  function tt(e = dt()) {
    e.forEach((t, i) => {
      let a = e[Math.floor(Math.random() * e.length)];
      a.parentNode === t.parentNode && t.parentNode.insertBefore(t, a);
      let n = t.querySelectorAll("section");
      n.length && tt(n);
    });
  }

  function it(e, t) {
    let i = a($.wrapper, e),
        n = i.length,
        s = le.isPrintingPDF();

    if (n) {
      w.loop && (t %= n) < 0 && (t = n + t), t = Math.max(Math.min(t, n - 1), 0);

      for (let e = 0; e < n; e++) {
        let n = i[e],
            o = w.rtl && !Oe(n);
        n.classList.remove("past"), n.classList.remove("present"), n.classList.remove("future"), n.setAttribute("hidden", ""), n.setAttribute("aria-hidden", "true"), n.querySelector("section") && n.classList.add("stack"), s ? n.classList.add("present") : e < t ? (n.classList.add(o ? "future" : "past"), w.fragments && a(n, ".fragment").forEach(e => {
          e.classList.add("visible"), e.classList.remove("current-fragment");
        })) : e > t && (n.classList.add(o ? "past" : "future"), w.fragments && a(n, ".fragment.visible").forEach(e => {
          e.classList.remove("visible", "current-fragment");
        }));
      }

      let e = i[t],
          o = e.classList.contains("present");
      e.classList.add("present"), e.removeAttribute("hidden"), e.removeAttribute("aria-hidden"), o || Ce({
        target: e,
        type: "visible",
        bubbles: !1
      });
      let r = e.getAttribute("data-state");
      r && (L = L.concat(r.split(" ")));
    } else t = 0;

    return t;
  }

  function at() {
    let e,
        t,
        i = dt(),
        n = i.length;

    if (n && void 0 !== g) {
      let s = te.isActive() ? 10 : w.viewDistance;
      p && (s = te.isActive() ? 6 : w.mobileViewDistance), le.isPrintingPDF() && (s = Number.MAX_VALUE);

      for (let o = 0; o < n; o++) {
        let r = i[o],
            l = a(r, "section"),
            d = l.length;

        if (e = Math.abs((g || 0) - o) || 0, w.loop && (e = Math.abs(((g || 0) - o) % (n - s)) || 0), e < s ? J.load(r) : J.unload(r), d) {
          let i = Ue(r);

          for (let a = 0; a < d; a++) {
            let n = l[a];
            t = o === (g || 0) ? Math.abs((v || 0) - a) : Math.abs(a - i), e + t < s ? J.load(n) : J.unload(n);
          }
        }
      }

      gt() ? $.wrapper.classList.add("has-vertical-slides") : $.wrapper.classList.remove("has-vertical-slides"), ut() ? $.wrapper.classList.add("has-horizontal-slides") : $.wrapper.classList.remove("has-horizontal-slides");
    }
  }

  function nt({
    includeFragments: e = !1
  } = {}) {
    let t = $.wrapper.querySelectorAll(".slides>section"),
        i = $.wrapper.querySelectorAll(".slides>section.present>section"),
        a = {
      left: g > 0,
      right: g < t.length - 1,
      up: v > 0,
      down: v < i.length - 1
    };

    if (w.loop && (t.length > 1 && (a.left = !0, a.right = !0), i.length > 1 && (a.up = !0, a.down = !0)), t.length > 1 && "linear" === w.navigationMode && (a.right = a.right || a.down, a.left = a.left || a.up), !0 === e) {
      let e = ee.availableRoutes();
      a.left = a.left || e.prev, a.up = a.up || e.prev, a.down = a.down || e.next, a.right = a.right || e.next;
    }

    if (w.rtl) {
      let e = a.left;
      a.left = a.right, a.right = e;
    }

    return a;
  }

  function st(e = f) {
    let t = dt(),
        i = 0;

    e: for (let a = 0; a < t.length; a++) {
      let n = t[a],
          s = n.querySelectorAll("section");

      for (let t = 0; t < s.length; t++) {
        if (s[t] === e) break e;
        "uncounted" !== s[t].dataset.visibility && i++;
      }

      if (n === e) break;
      !1 === n.classList.contains("stack") && "uncounted" !== n.dataset.visibility && i++;
    }

    return i;
  }

  function ot() {
    let e = pt(),
        t = st();

    if (f) {
      let e = f.querySelectorAll(".fragment");

      if (e.length > 0) {
        let i = .9;
        t += f.querySelectorAll(".fragment.visible").length / e.length * i;
      }
    }

    return Math.min(t / (e - 1), 1);
  }

  function rt(e) {
    let t,
        i = g,
        n = v;

    if (e) {
      let t = Oe(e),
          s = t ? e.parentNode : e,
          o = dt();
      i = Math.max(o.indexOf(s), 0), n = void 0, t && (n = Math.max(a(e.parentNode, "section").indexOf(e), 0));
    }

    if (!e && f) {
      if (f.querySelectorAll(".fragment").length > 0) {
        let e = f.querySelector(".current-fragment");
        t = e && e.hasAttribute("data-fragment-index") ? parseInt(e.getAttribute("data-fragment-index"), 10) : f.querySelectorAll(".fragment.visible").length - 1;
      }
    }

    return {
      h: i,
      v: n,
      f: t
    };
  }

  function lt() {
    return a($.wrapper, '.slides section:not(.stack):not([data-visibility="uncounted"])');
  }

  function dt() {
    return a($.wrapper, ".slides>section");
  }

  function ct() {
    return a($.wrapper, ".slides>section>section");
  }

  function ht() {
    return a($.wrapper, ".slides>section.stack");
  }

  function ut() {
    return dt().length > 1;
  }

  function gt() {
    return ct().length > 1;
  }

  function vt() {
    return lt().map(e => {
      let t = {};

      for (let i = 0; i < e.attributes.length; i++) {
        let a = e.attributes[i];
        t[a.name] = a.value;
      }

      return t;
    });
  }

  function pt() {
    return lt().length;
  }

  function mt(e, t) {
    let i = dt()[e],
        a = i && i.querySelectorAll("section");
    return a && a.length && "number" == typeof t ? a ? a[t] : void 0 : i;
  }

  function ft(e, t) {
    let i = "number" == typeof e ? mt(e, t) : e;
    if (i) return i.slideBackgroundElement;
  }

  function bt() {
    let e = rt();
    return {
      indexh: e.h,
      indexv: e.v,
      indexf: e.f,
      paused: Ye(),
      overview: te.isActive()
    };
  }

  function yt(e) {
    if ("object" == typeof e) {
      Qe(s(e.indexh), s(e.indexv), s(e.indexf));
      let t = s(e.paused),
          i = s(e.overview);
      "boolean" == typeof t && t !== Ye() && Xe(t), "boolean" == typeof i && i !== te.isActive() && te.toggle(i);
    }
  }

  function wt() {
    if (Rt(), f && !1 !== w.autoSlide) {
      let e = f.querySelector(".current-fragment");
      e || (e = f.querySelector(".fragment"));
      let t = e ? e.getAttribute("data-autoslide") : null,
          i = f.parentNode ? f.parentNode.getAttribute("data-autoslide") : null,
          n = f.getAttribute("data-autoslide");
      t ? j = parseInt(t, 10) : n ? j = parseInt(n, 10) : i ? j = parseInt(i, 10) : (j = w.autoSlide, 0 === f.querySelectorAll(".fragment").length && a(f, "video, audio").forEach(e => {
        e.hasAttribute("data-autoplay") && j && 1e3 * e.duration / e.playbackRate > j && (j = 1e3 * e.duration / e.playbackRate + 1e3);
      })), !j || _ || Ye() || te.isActive() || $e() && !ee.availableRoutes().next && !0 !== w.loop || (X = setTimeout(() => {
        "function" == typeof w.autoSlideMethod ? w.autoSlideMethod() : Pt(), wt();
      }, j), Y = Date.now()), y && y.setPlaying(-1 !== X);
    }
  }

  function Rt() {
    clearTimeout(X), X = -1;
  }

  function St() {
    j && !_ && (_ = !0, Ce({
      type: "autoslidepaused"
    }), clearTimeout(X), y && y.setPlaying(!1));
  }

  function Et() {
    j && _ && (_ = !1, Ce({
      type: "autoslideresumed"
    }), wt());
  }

  function At() {
    A.hasNavigatedHorizontally = !0, w.rtl ? (te.isActive() || !1 === ee.next()) && nt().left && Qe(g + 1, "grid" === w.navigationMode ? v : void 0) : (te.isActive() || !1 === ee.prev()) && nt().left && Qe(g - 1, "grid" === w.navigationMode ? v : void 0);
  }

  function kt() {
    A.hasNavigatedHorizontally = !0, w.rtl ? (te.isActive() || !1 === ee.prev()) && nt().right && Qe(g - 1, "grid" === w.navigationMode ? v : void 0) : (te.isActive() || !1 === ee.next()) && nt().right && Qe(g + 1, "grid" === w.navigationMode ? v : void 0);
  }

  function Lt() {
    (te.isActive() || !1 === ee.prev()) && nt().up && Qe(g, v - 1);
  }

  function xt() {
    A.hasNavigatedVertically = !0, (te.isActive() || !1 === ee.next()) && nt().down && Qe(g, v + 1);
  }

  function Ct() {
    if (!1 === ee.prev()) if (nt().up) Lt();else {
      let e;

      if (e = w.rtl ? a($.wrapper, ".slides>section.future").pop() : a($.wrapper, ".slides>section.past").pop(), e) {
        let t = e.querySelectorAll("section").length - 1 || void 0;
        Qe(g - 1, t);
      }
    }
  }

  function Pt() {
    if (A.hasNavigatedHorizontally = !0, A.hasNavigatedVertically = !0, !1 === ee.next()) {
      let e = nt();
      e.down && e.right && w.loop && We() && (e.down = !1), e.down ? xt() : w.rtl ? At() : kt();
    }
  }

  function Nt(e) {
    w.autoSlideStoppable && St();
  }

  function Mt(e) {
    "running" === K && /section/gi.test(e.target.nodeName) && (K = "idle", Ce({
      type: "slidetransitionend",
      data: {
        indexh: g,
        indexv: v,
        previousSlide: m,
        currentSlide: f
      }
    }));
  }

  function Dt(e) {
    He();
  }

  function It(e) {
    !1 === document.hidden && document.activeElement !== document.body && ("function" == typeof document.activeElement.blur && document.activeElement.blur(), document.body.focus());
  }

  function Tt(e) {
    if (e.currentTarget && e.currentTarget.hasAttribute("href")) {
      let t = e.currentTarget.getAttribute("href");
      t && (De(t), e.preventDefault());
    }
  }

  function zt(e) {
    $e() && !1 === w.loop ? (Qe(0, 0), Et()) : _ ? Et() : St();
  }

  const Ht = {
    VERSION: "4.1.0",
    initialize: ue,
    configure: Se,
    sync: Ze,
    syncSlide: Ge,
    syncFragments: ee.sync.bind(ee),
    slide: Qe,
    left: At,
    right: kt,
    up: Lt,
    down: xt,
    prev: Ct,
    next: Pt,
    navigateLeft: At,
    navigateRight: kt,
    navigateUp: Lt,
    navigateDown: xt,
    navigatePrev: Ct,
    navigateNext: Pt,
    navigateFragment: ee.goto.bind(ee),
    prevFragment: ee.prev.bind(ee),
    nextFragment: ee.next.bind(ee),
    on: ke,
    off: Le,
    addEventListener: ke,
    removeEventListener: Le,
    layout: He,
    shuffle: tt,
    availableRoutes: nt,
    availableFragments: ee.availableRoutes.bind(ee),
    toggleHelp: Ie,
    toggleOverview: te.toggle.bind(te),
    togglePause: Xe,
    toggleAutoSlide: _e,
    isFirstSlide: Ve,
    isLastSlide: $e,
    isLastVerticalSlide: We,
    isVerticalSlide: Oe,
    isPaused: Ye,
    isAutoSliding: Je,
    isSpeakerNotes: he.isSpeakerNotesWindow.bind(he),
    isOverview: te.isActive.bind(te),
    isFocused: de.isFocused.bind(de),
    isPrintingPDF: le.isPrintingPDF.bind(le),
    isReady: () => R,
    loadSlide: J.load.bind(J),
    unloadSlide: J.unload.bind(J),
    showPreview: De,
    hidePreview: ze,
    addEventListeners: Ee,
    removeEventListeners: Ae,
    dispatchEvent: Ce,
    getState: bt,
    setState: yt,
    getProgress: ot,
    getIndices: rt,
    getSlidesAttributes: vt,
    getSlidePastCount: st,
    getTotalSlides: pt,
    getSlide: mt,
    getPreviousSlide: () => m,
    getCurrentSlide: () => f,
    getSlideBackground: ft,
    getSlideNotes: he.getSlideNotes.bind(he),
    getSlides: lt,
    getHorizontalSlides: dt,
    getVerticalSlides: ct,
    hasHorizontalSlides: ut,
    hasVerticalSlides: gt,
    hasNavigatedHorizontally: () => A.hasNavigatedHorizontally,
    hasNavigatedVertically: () => A.hasNavigatedVertically,
    addKeyBinding: ie.addKeyBinding.bind(ie),
    removeKeyBinding: ie.removeKeyBinding.bind(ie),
    triggerKey: ie.triggerKey.bind(ie),
    registerKeyboardShortcut: ie.registerKeyboardShortcut.bind(ie),
    getComputedSlideSize: qe,
    getScale: () => z,
    getConfig: () => w,
    getQueryHash: h,
    getRevealElement: () => t,
    getSlidesElement: () => $.slides,
    getViewportElement: () => $.viewport,
    getBackgroundsElement: () => G.element,
    registerPlugin: re.registerPlugin.bind(re),
    hasPlugin: re.hasPlugin.bind(re),
    getPlugin: re.getPlugin.bind(re),
    getPlugins: re.getRegisteredPlugins.bind(re)
  };
  return i(c, { ...Ht,
    announceStatus: be,
    getStatusText: ye,
    print: le,
    focus: de,
    progress: se,
    controls: ne,
    location: ae,
    overview: te,
    fragments: ee,
    slideContent: J,
    slideNumber: Q,
    onUserInput: Nt,
    closeOverlay: ze,
    updateSlidesVisibility: at,
    layoutSlideContents: Be,
    transformSlides: xe,
    cueAutoSlide: wt,
    cancelAutoSlide: Rt
  }), Ht;
}

let $ = V,
    K = [];
$.initialize = e => (Object.assign($, new V(document.querySelector(".reveal"), e)), K.map(e => e($)), $.initialize()), ["configure", "on", "off", "addEventListener", "removeEventListener", "registerPlugin"].forEach(e => {
  $[e] = (...t) => {
    K.push(i => i[e].call(null, ...t));
  };
}), $.isReady = () => !1, $.VERSION = "4.1.0";
var _default = $;
exports.default = _default;
},{}],"data/films.json":[function(require,module,exports) {
module.exports = {
  "2000": {
    "best": {
      "title": "Gladiator",
      "score": 0.85,
      "plot": "A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.",
      "budget": 103000000,
      "revenue": 465380802,
      "runTime": "2h 35m",
      "releaseDate": "May 12, 2000",
      "genre": ["Action", "Adventure", "Drama"],
      "rating": "15"
    },
    "worst": {
      "title": "Battlefield Earth",
      "score": 0.25,
      "plot": "It's the year 3000 A.D., and the Earth is lost to the alien race of Psychlos. Humanity is enslaved by these gold-thirsty tyrants, who are unaware that their 'man-animals' are about to ignite the rebellion of a lifetime.",
      "budget": 73000000,
      "revenue": 29725663,
      "runTime": "1h 58m",
      "releaseDate": "June 2, 2000",
      "genre": ["Action", "Adventure", "Sci-Fi"],
      "rating": "12"
    }
  },
  "2001": {
    "best": {
      "title": "The Lord of the Rings: The Fellowship of the Ring",
      "score": 0.88,
      "plot": "A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.",
      "budget": 93000000,
      "revenue": 897690072,
      "runTime": "2h 58m",
      "releaseDate": "December 19, 2001",
      "genre": ["Action", "Adventure", "Drama", "Fantasy"],
      "rating": "PG"
    },
    "worst": {
      "title": "Glitter",
      "score": 0.23,
      "plot": "A young singer dates a disc jockey who helps her get into the music business, but their relationship become complicated as she ascends to super stardom.",
      "budget": 22000000,
      "revenue": 5271666,
      "runTime": "1h 44m",
      "releaseDate": "November 23, 2001",
      "genre": ["Drama", "Music", "Romance"],
      "rating": "PG"
    }
  },
  "2002": {
    "best": {
      "title": "The Lord of the Rings: The Two Towers",
      "score": 0.87,
      "plot": "While Frodo and Sam edge closer to Mordor with the help of the shifty Gollum, the divided fellowship makes a stand against Sauron's new ally, Saruman, and his hordes of Isengard.",
      "budget": 94000000,
      "revenue": 947495095,
      "runTime": "2h 59m",
      "releaseDate": "December 18, 2002",
      "genre": ["Action", "Adventure", "Drama", "Fantasy"],
      "rating": "12A"
    },
    "worst": {
      "title": "Rollerball",
      "score": 0.31,
      "plot": "The big thing in 2005 is a violent sport which can have some pretty serious consequences... like dying.",
      "budget": 70000000,
      "revenue": 25852764,
      "runTime": "1h 38m",
      "releaseDate": "June 28, 2002",
      "genre": ["Action", "Sci-Fi", "Sport"],
      "rating": "15"
    }
  },
  "2003": {
    "best": {
      "title": "The Lord of the Rings: The Return of the King",
      "score": 0.89,
      "plot": "The final confrontation between the forces of good and evil fighting for control of the future of Middle-earth.",
      "budget": 94000000,
      "revenue": 1146030912,
      "runTime": "3h 21m",
      "releaseDate": "December 17, 2003",
      "genre": ["Action", "Adventure", "Drama", "Fantasy"],
      "rating": "12A"
    },
    "worst": {
      "title": "House of the Dead",
      "score": 0.21,
      "plot": "A group of college students travels to a mysterious island to attend a rave, which is soon taken over by bloodthirsty zombies.",
      "budget": 12000000,
      "revenue": 13818181,
      "runTime": "1h 30m",
      "releaseDate": "October 29, 2003",
      "genre": ["Action", "Adventure", "Horror"],
      "rating": "15"
    }
  },
  "2004": {
    "best": {
      "title": "Eternal Sunshine of the Spotless Mind",
      "score": 0.83,
      "plot": "When their relationship turns sour, a couple undergoes a medical procedure to have each other erased from their memories.",
      "budget": 20000000,
      "revenue": 74036715,
      "runTime": "1h 48m",
      "releaseDate": "April 30, 2004",
      "genre": ["Drama", "Romance", "Sci-Fi"],
      "rating": "15"
    },
    "worst": {
      "title": "Catwoman",
      "score": 0.34,
      "plot": "A shy woman, endowed with the speed, reflexes, and senses of a cat, walks a thin line between criminal and hero, even as a detective doggedly pursues her, fascinated by both of her personas.",
      "budget": 100000000,
      "revenue": 82102379,
      "runTime": "1h 44m",
      "releaseDate": "August 13, 2004",
      "genre": ["Action", "Crime", "Fantasy"],
      "rating": "12A"
    }
  },
  "2005": {
    "best": {
      "title": "Batman Begins",
      "score": 0.82,
      "plot": "After training with his mentor, Batman begins his fight to free crime-ridden Gotham City from corruption.",
      "budget": 150000000,
      "revenue": 373661946,
      "runTime": "2h 20m",
      "releaseDate": "June 16, 2005",
      "genre": ["Action", "Adventure"],
      "rating": "12A"
    },
    "worst": {
      "title": "Son of the Mask",
      "score": 0.22,
      "plot": "Tim Avery finds himself in a predicament when his dog stumbles upon the mask of Loki. Then after conceiving an infant son 'born of the mask', he discovers just how looney child raising can be.",
      "budget": 84000000,
      "revenue": 59981548,
      "runTime": "1h 34m",
      "releaseDate": "February 11, 2005",
      "genre": ["Comedy", "Family", "Fantasy"],
      "rating": "PG"
    }
  },
  "2006": {
    "best": {
      "title": "The Departed",
      "score": 0.85,
      "plot": "An undercover cop and a mole in the police attempt to identify each other while infiltrating an Irish gang in South Boston.",
      "budget": 90000000,
      "revenue": 291465373,
      "runTime": "2h 31m",
      "releaseDate": "October 6, 2006",
      "genre": ["Crime", "Drama", "Thriller"],
      "rating": "18"
    },
    "worst": {
      "title": "Date Movie",
      "score": 0.28,
      "plot": "Spoof of romantic comedies which focuses on a man, his crush, his parents, and her father.",
      "budget": 20000000,
      "revenue": 85749034,
      "runTime": "1h 23m",
      "releaseDate": "February 24, 2006",
      "genre": ["Comedy", "Romance"],
      "rating": "12A"
    }
  },
  "2007": {
    "best": {
      "title": "There Will Be Blood",
      "score": 0.82,
      "plot": "A story of family, religion, hatred, oil and madness, focusing on a turn-of-the-century prospector in the early days of the business.",
      "budget": 25000000,
      "revenue": 76182388,
      "runTime": "2h 38m",
      "releaseDate": "December 30, 2007",
      "genre": ["Drama"],
      "rating": "12A"
    },
    "worst": {
      "title": "Epic Movie",
      "score": 0.24,
      "plot": "A spoof on previous years' epic movies, 4 orphans are on an epic adventure",
      "budget": 20000000,
      "revenue": 87238158,
      "runTime": "1h 26m",
      "releaseDate": "February 9, 2007",
      "genre": ["Adventure", "Comedy", "Fantasy"],
      "rating": "12A"
    }
  },
  "2008": {
    "best": {
      "title": "The Dark Knight",
      "score": 0.9,
      "plot": "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest tests of his ability to fight injustice.",
      "budget": 185000000,
      "revenue": 1005973645,
      "runTime": "2h 32m",
      "releaseDate": "July 20, 2008",
      "genre": ["Action", "Crime", "Drama"],
      "rating": "12A"
    },
    "worst": {
      "title": "Disaster Movie",
      "score": 0.19,
      "plot": "Over the course of one evening, an unsuspecting group of twenty-somethings find themselves bombarded by a series of natural disasters and catastrophic events.",
      "budget": 20000000,
      "revenue": 34816824,
      "runTime": "1h 27m",
      "releaseDate": "September 5, 2008",
      "genre": ["Comedy", "Sci-Fi"],
      "rating": "12A"
    }
  },
  "2009": {
    "best": {
      "title": "Inglourious Basterds",
      "score": 0.83,
      "plot": "In Nazi-occupied France during World War II, a plan to assassinate Nazi leaders by a group of Jewish U.S. soldiers coincides with a theatre owner's vengeful plans for the same.",
      "budget": 70000000,
      "revenue": 321457747,
      "runTime": "2h 33m",
      "releaseDate": "August 19, 2009",
      "genre": ["Adventure", "Drama", "War"],
      "rating": "18"
    },
    "worst": {
      "title": "S. Darko",
      "score": 0.36,
      "plot": "Donnie Darko's little sister Samantha and her best friend Corey are on a cross-country road trip, but soon find themselves entangled in a dangerous glitch in the time-space continuum.",
      "budget": 4000000,
      "revenue": 1079949,
      "runTime": "1h 43m",
      "releaseDate": "August 21, 2009",
      "genre": ["Drama", "Mystery", "Sci-Fi"],
      "rating": "15"
    }
  },
  "2010": {
    "best": {
      "title": "Inception",
      "score": 0.88,
      "plot": "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
      "budget": 160000000,
      "revenue": 836836967,
      "runTime": "2h 28m",
      "releaseDate": "July 16, 2010",
      "genre": ["Action", "Adventure", "Sci-Fi"],
      "rating": "12A"
    },
    "worst": {
      "title": "Vampires Suck",
      "score": 0.34,
      "plot": "A spoof of vampire-themed movies. Becca finds herself torn between 2 boys. As she and her friends wrestle with a number of different dramas, everything comes to a head at their prom",
      "budget": 20000000,
      "revenue": 80547866,
      "runTime": "1h 22m",
      "releaseDate": "October 15, 2010",
      "genre": ["Comedy", "Family", "Horror"],
      "rating": "PG-13"
    }
  },
  "2011": {
    "best": {
      "title": "Warrior",
      "score": 0.81,
      "plot": "The youngest son of an alcoholic former boxer returns home, where he's trained by his father for competition in a mixed martial arts tournament",
      "budget": 25000000,
      "revenue": 23308615,
      "runTime": "2h 20m",
      "releaseDate": "September 23, 2011",
      "genre": ["Action", "Drama", "Sport"],
      "rating": "12A"
    },
    "worst": {
      "title": "Jack and Jill",
      "score": 0.33,
      "plot": "Family guy Jack Sadelstein prepares for the annual event he dreads: the Thanksgiving visit of his fraternal twin sister, the needy and passive-aggressive Jill, who then refuses to leave.",
      "budget": 79000000,
      "revenue": 149673788,
      "runTime": "1h 31m",
      "releaseDate": "February 3, 2012",
      "genre": ["Comedy"],
      "rating": "PG"
    }
  },
  "2012": {
    "best": {
      "title": "Django Unchained",
      "score": 0.84,
      "plot": "With the help of a German bounty-hunter, a freed slave sets out to rescue his wife from a brutal plantation-owner in Mississippi.",
      "budget": 100000000,
      "revenue": 426074373,
      "runTime": "2h 45m",
      "releaseDate": "December 30, 2012",
      "genre": ["Drama", "Western"],
      "rating": "18"
    },
    "worst": {
      "title": "Piranha 3DD",
      "score": 0.37,
      "plot": "After the events at Lake Victoria, the pre-historic school of blood-thirsty piranhas make their way into a newly opened waterpark.",
      "budget": 5000000,
      "revenue": 8518634,
      "runTime": "1h 23m",
      "releaseDate": "May 11, 2012",
      "genre": ["Comedy", "Horror"],
      "rating": "18"
    }
  },
  "2013": {
    "best": {
      "title": "The Wolf of Wall Street",
      "score": 0.82,
      "plot": "Based on the true story of Jordan Belfort, from his rise to a wealthy stock-broker living the high life to his fall involving crime, corruption and the federal government.",
      "budget": 100000000,
      "revenue": 392000694,
      "runTime": "3h",
      "releaseDate": "December 29, 2013",
      "genre": ["Biography", "Drama", "Crime"],
      "rating": "18"
    },
    "worst": {
      "title": "Scary Movie 5",
      "score": 0.35,
      "plot": "A couple begin to experience some unusual activity after bringing their lost nieces and nephew home. With the help of home cameras, they learn they're being stalked by a nefarious demon.",
      "budget": 20000000,
      "revenue": 78378744,
      "runTime": "1h 28m",
      "releaseDate": "April 12, 2013",
      "genre": ["Comedy"],
      "rating": "15"
    }
  },
  "2014": {
    "best": {
      "title": "Interstellar",
      "score": 0.86,
      "plot": "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
      "budget": 165000000,
      "revenue": 701729206,
      "runTime": "2h 49m",
      "releaseDate": "November 9, 2014",
      "genre": ["Adventure", "Drama", "Sci-Fi"],
      "rating": "12A"
    },
    "worst": {
      "title": "Kirk Cameron's Saving Christmas",
      "score": 0.14,
      "plot": "His annual Christmas party faltering thanks to his cynical brother-in-law, Kirk Cameron attempts to save the day by showing him that Jesus Christ remains a crucial component of the holiday.",
      "budget": 500000,
      "revenue": 2800000,
      "runTime": "1h 19m",
      "releaseDate": "14 November, 2014",
      "genre": ["Comedy", "Family"],
      "rating": "PG"
    }
  },
  "2015": {
    "best": {
      "title": "Mad Max: Fury Road",
      "score": 0.81,
      "plot": "In a post-apocalyptic wasteland, a woman rebels against a tyrannical ruler in search for her homeland with the aid of a group of female prisoners, a psychotic worshiper, and a drifter named Max.",
      "budget": 150000000,
      "revenue": 376097421,
      "runTime": "2h",
      "releaseDate": "May 14, 2015",
      "genre": ["Action", "Adventure", "Sci-Fi"],
      "rating": "15"
    },
    "worst": {
      "title": "The Human Centipede III",
      "score": 0.27,
      "plot": "Taking inspiration from The Human Centipede films, the warden of a notorious and troubled prison looks to create a 500-person human centipede as a solution to his problems.",
      "budget": 1824981,
      "revenue": 18976,
      "runTime": "1h 42m",
      "releaseDate": "July 10, 2015",
      "genre": ["Comedy", "Horror"],
      "rating": "18"
    }
  },
  "2016": {
    "best": {
      "title": "Hacksaw Ridge",
      "score": 0.81,
      "plot": "World War II American Army Medic Desmond T. Doss refuses to kill people and becomes the first man in American history to receive the Medal of Honor without firing a shot.",
      "budget": 40000000,
      "revenue": 180563636,
      "runTime": "2h 19m",
      "releaseDate": "November 6, 2016",
      "genre": ["Biography", "Drama", "History"],
      "rating": "15"
    },
    "worst": {
      "title": "Fifty Shades of Black",
      "score": 0.35,
      "plot": "An inexperienced college student meets a wealthy businessman whose sexual practices put a strain on their relationship.",
      "budget": 5000000,
      "revenue": 22227514,
      "runTime": "1h 32m",
      "releaseDate": "January 31, 2016",
      "genre": ["Comedy"],
      "rating": "18"
    }
  },
  "2017": {
    "best": {
      "title": "Coco",
      "score": 0.84,
      "plot": "Aspiring musician Miguel, confronted with his family's ancestral ban on music, enters the Land of the Dead to find his great-great-grandfather, a legendary singer.",
      "budget": 175000000,
      "revenue": 807817888,
      "runTime": "1h 45m",
      "releaseDate": "November 26, 2017",
      "genre": ["Animation", "Adventure", "Drama"],
      "rating": "PG"
    },
    "worst": {
      "title": "The Emoji Movie",
      "score": 0.33,
      "plot": "Gene, a multi-expressional emoji, sets out on a journey to become a normal emoji.",
      "budget": 50000000,
      "revenue": 217776646,
      "runTime": "1h 26m",
      "releaseDate": "August 4, 2017",
      "genre": ["Animation", "Adventure", "Comedy"],
      "rating": "U"
    }
  },
  "2018": {
    "best": {
      "title": "Avengers: Infinity War",
      "score": 0.84,
      "plot": "The Avengers and their allies must be willing to sacrifice all in an attempt to defeat the powerful Thanos before his blitz of devastation and ruin puts an end to the universe.",
      "budget": 321000000,
      "revenue": 2048359754,
      "runTime": "2h 29m",
      "releaseDate": "April 29, 2018",
      "genre": ["Action", "Adventure", "Sci-Fi"],
      "rating": "12A"
    },
    "worst": {
      "title": "Slender Man",
      "score": 0.32,
      "plot": "In a small town in Massachusetts, a group of friends, fascinated by the internet lore of the Slender Man, attempt to prove that he doesn't actually exist - until one goes missing.",
      "budget": 10000000,
      "revenue": 51738549,
      "runTime": "1h 33m",
      "releaseDate": "August 24, 2018",
      "genre": ["Horror", "Mystery", "Thriller"],
      "rating": "15"
    }
  },
  "2019": {
    "best": {
      "title": "Parasite",
      "score": 0.86,
      "plot": "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
      "budget": 11400000,
      "revenue": 258908069,
      "runTime": "2h 12m",
      "releaseDate": "October 13, 2019",
      "genre": ["Comedy", "Drama", "Thriller"],
      "rating": "15"
    },
    "worst": {
      "title": "Cats",
      "score": 0.28,
      "plot": "A tribe of cats called the Jellicles must decide yearly which one will ascend to the Heaviside Layer and come back to a new Jellicle life.",
      "budget": 95000000,
      "revenue": 73833531,
      "runTime": "1h 50m",
      "releaseDate": "December 20, 2019",
      "genre": ["Comedy", "Drama", "Family", "Musical"],
      "rating": "U"
    }
  },
  "2020": {
    "best": {
      "title": "Soul",
      "score": 0.81,
      "plot": "After landing the gig of a lifetime, a New York jazz pianist suddenly finds himself trapped in a strange land between Earth and the afterlife.",
      "budget": 150000000,
      "revenue": 118333781,
      "runTime": "1h 40m",
      "releaseDate": "December 25, 2020",
      "genre": ["Animation", "Comedy", "Music"],
      "rating": "PG"
    },
    "worst": {
      "title": "Hard Kill",
      "score": 0.33,
      "plot": "The work of billionaire tech CEO Donovan Chalmers is so valuable that he hires mercenaries to protect it, and a terrorist group kidnaps his daughter just to get it.",
      "budget": 7000000,
      "revenue": 111523,
      "runTime": "1h 38m",
      "releaseDate": "September 14, 2020",
      "genre": ["Action", "Thriller"],
      "rating": "15"
    }
  }
};
},{}],"index.js":[function(require,module,exports) {
"use strict";

var _reveal = _interopRequireDefault(require("reveal.js"));

var _films = _interopRequireDefault(require("./data/films.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const deck = new _reveal.default({
  plugins: []
});
deck.initialize(); // get elements

const filmsSection = document.querySelector('#films');
const megaMoneyEl = document.querySelector('#megaMoney');
/** Get JSON data */

for (const [key, val] of Object.entries(_films.default)) {
  createHTML(key, val);
}
/** */


const htmlArr = [];

async function createHTML(key, val) {
  const html = `
  <section>
  <div class="films">
    <div class="best">
      <div class="posterContainer">
        <img src="http://image.tmdb.org/t/p/w500/${await getPoster(val.best.title)}">
        <div class="overlay">
          <div class="text">${val.best.plot}</div>
        </div>
      </div>
    </div>
    <div class="worst">
      <div class="posterContainer">
        <img src="http://image.tmdb.org/t/p/w500/${await getPoster(val.worst.title)}">
        <div class="overlay">
          <div class="text">${val.worst.plot}</div>
        </div>
      </div>
    </div>
    <div class="versus">
      <div class="yearContainer">
        <div class="year">${key}</div>
      </div>
    </div>
    <div class="filmDetails">
      <table>
        <tr>
          <td class="info">${val.best.title}</td>
          <td class="label">Title</td>
          <td class="info">${val.worst.title}</td>
        </tr>
        <tr>
          <td class="info">${val.best.genre}</td>
          <td class="label">Genres</td>
          <td class="info">${val.worst.genre}</td>
        </tr>
        <tr>
          <td class="info">${val.best.rating}</td>
          <td class="label">Age Certificate</td>
          <td class="info">${val.worst.rating}</td>
        </tr>
        <tr>
          <td class="info ${val.best.runTime > val.worst.runTime ? 'winner' : 'loser'}">${val.best.runTime}</td>
          <td class="label">Run Time</td>
          <td class="info ${val.best.runTime < val.worst.runTime ? 'winner' : 'loser'}">${val.worst.runTime}</td>
        </tr>
        <tr>
          <td class="info ${val.best.budget > val.worst.budget ? 'winner' : 'loser'}">USD$${val.best.budget}</td>
          <td class="label">Budget</td>
          <td class="info ${val.best.budget < val.worst.budget ? 'winner' : 'loser'}">USD$${val.worst.budget}</budget>
        </tr>
        <tr>
          <td class="info ${val.best.revenue - val.best.budget > 0 ? 'winner' : 'loser'}">USD$${val.best.revenue}</td>
          <td class="label">Revenue</td>
          <td class="info ${val.worst.revenue - val.worst.budget > 0 ? 'winner' : 'loser'}">USD$${val.worst.revenue}</td>
        </tr>
        <tr>
          <td class="info score ${val.best.score > val.worst.score ? 'winner' : 'loser'}">${(val.best.score * 10).toFixed(1)}</td>
          <td class="label">Viewer Rating</td>
          <td class="info score ${val.best.score < val.worst.score ? 'winner' : 'loser'}">${(val.worst.score * 10).toFixed(1)}</td>
        </tr>
      </table>
    </div>
  </div>
  </section>
  `;
  filmsSection.insertAdjacentHTML('beforeend', html);
}

async function getPoster(name) {
  const endpoint = `https://api.themoviedb.org/3/search/movie?api_key=3353746b7b44a5d27c9c4ac3f27f3350&query=${name}`;
  const res = await fetch(endpoint);
  const data = await res.json();
  return data.results[0].poster_path;
}
},{"reveal.js":"node_modules/reveal.js/dist/reveal.esm.js","./data/films.json":"data/films.json"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "50789" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/filmboomorbust.e31bb0bc.js.map