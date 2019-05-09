!(function() {
  return function e(t, n, r) {
    function i(o, s) {
      if (!n[o]) {
        if (!t[o]) {
          var f = "function" == typeof require && require;
          if (!s && f) return f(o, !0);
          if (a) return a(o, !0);
          var u = new Error("Cannot find module '" + o + "'");
          throw ((u.code = "MODULE_NOT_FOUND"), u);
        }
        var c = (n[o] = { exports: {} });
        t[o][0].call(
          c.exports,
          function(e) {
            return i(t[o][1][e] || e);
          },
          c,
          c.exports,
          e,
          t,
          n,
          r
        );
      }
      return n[o].exports;
    }
    for (
      var a = "function" == typeof require && require, o = 0;
      o < r.length;
      o++
    )
      i(r[o]);
    return i;
  };
})()(
  {
    1: [
      function(e, t, n) {
        t.exports = function(e) {
          "string" == typeof e && (e = [e]);
          for (
            var t = [].slice.call(arguments, 1), n = [], r = 0;
            r < e.length - 1;
            r++
          )
            n.push(e[r], t[r] || "");
          return n.push(e[r]), n.join("");
        };
      },
      {}
    ],
    2: [
      function(e, t, n) {
        var r = e("regl"),
          i = e("primitive-quad"),
          a = e("parse-color"),
          o = e("defined");
        function s(e) {
          return e && !Array.isArray(e) && "object" == typeof e;
        }
        t.exports = function(e) {
          if (!(e = e || {}).gl)
            throw new Error(
              'Must specify { context: "webgl" } in sketch settings, or a WebGL-enabled canvas'
            );
          var t = e.gl,
            n = { gl: t };
          void 0 !== e.extensions && (n.extensions = e.extensions);
          void 0 !== e.optionalExtensions &&
            (n.optionalExtensions = e.optionalExtensions);
          void 0 !== e.profile && (n.profile = e.profile);
          void 0 !== e.onDone && (n.onDone = e.onDone);
          var f,
            u = r(n),
            c = i(),
            l = new Map(),
            p = e.uniforms || {},
            h = Object.assign({}, p);
          Object.keys(p).forEach(function(e) {
            var t = p[e];
            h[e] =
              "function" == typeof t
                ? function(e, n, r) {
                    var i = t.call(p, n, r);
                    if (s(i))
                      if (l.has(t)) {
                        var a = l.get(t);
                        a(i), (i = a);
                      } else {
                        var o = u.texture(i);
                        l.set(t, o), (i = o);
                      }
                    return i;
                  }
                : s(t)
                ? u.texture(t)
                : t;
          });
          try {
            f = u({
              scissor: !!e.scissor && {
                enable: !0,
                box: {
                  x: u.prop("scissorX"),
                  y: u.prop("scissorY"),
                  width: u.prop("scissorWidth"),
                  height: u.prop("scissorHeight")
                }
              },
              uniforms: h,
              frag:
                e.frag ||
                [
                  "precision highp float;",
                  "",
                  "void main () {",
                  "  gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);",
                  "}"
                ].join("\n"),
              vert:
                e.vert ||
                [
                  "precision highp float;",
                  "attribute vec3 position;",
                  "varying vec2 vUv;",
                  "",
                  "void main () {",
                  "  gl_Position = vec4(position.xyz, 1.0);",
                  "  vUv = gl_Position.xy * 0.5 + 0.5;",
                  "}"
                ].join("\n"),
              blend:
                !1 !== e.blend
                  ? {
                      enable: !0,
                      func: {
                        srcRGB: "src alpha",
                        srcAlpha: 1,
                        dstRGB: "one minus src alpha",
                        dstAlpha: 1
                      }
                    }
                  : void 0,
              attributes: { position: c.positions },
              elements: c.cells
            });
          } catch (e) {
            b(e);
          }
          var d = o(e.clearColor, "black");
          if ("string" == typeof d) {
            var m = a(d);
            if (!m.rgb)
              throw new Error(
                'Error parsing { clearColor } color string "' + d + '"'
              );
            d = m.rgb.slice(0, 3).map(function(e) {
              return e / 255;
            });
          } else if (d && (!Array.isArray(d) || d.length < 3))
            throw new Error(
              "Error with { clearColor } option, must be a string or [ r, g, b ] float array"
            );
          var g = o(e.clearAlpha, 1),
            y = !!d && d.concat([g || 0]);
          return {
            render: function(e) {
              u.poll(),
                y && u.clear({ color: y, depth: 1, stencil: 0 }),
                v(e),
                t.flush();
            },
            regl: u,
            drawQuad: v,
            unload: function() {
              l.clear(), u.destroy();
            }
          };
          function v(e) {
            if (((e = e || {}), f))
              try {
                f(e);
              } catch (t) {
                b(t) &&
                  null == e &&
                  console.warn(
                    'Warning: shader.render() is not called with any "props" parameter'
                  );
              }
          }
          function b(e) {
            if (/^\(regl\)/.test(e.message)) return !0;
            throw e;
          }
        };
      },
      { defined: 7, "parse-color": 8, "primitive-quad": 9, regl: 10 }
    ],
    3: [
      function(e, t, n) {
        (function(r) {
          !(function(r, i) {
            "object" == typeof n && void 0 !== t
              ? (t.exports = i(e("convert-length")))
              : "function" == typeof define && define.amd
              ? define(["convert-length"], i)
              : (r.canvasSketch = i(null));
          })(this, function(e) {
            e = e && e.hasOwnProperty("default") ? e.default : e;
            var t = Object.getOwnPropertySymbols,
              n = Object.prototype.hasOwnProperty,
              i = Object.prototype.propertyIsEnumerable;
            var a = (function() {
                try {
                  if (!Object.assign) return !1;
                  var e = new String("abc");
                  if (((e[5] = "de"), "5" === Object.getOwnPropertyNames(e)[0]))
                    return !1;
                  for (var t = {}, n = 0; n < 10; n++)
                    t["_" + String.fromCharCode(n)] = n;
                  if (
                    "0123456789" !==
                    Object.getOwnPropertyNames(t)
                      .map(function(e) {
                        return t[e];
                      })
                      .join("")
                  )
                    return !1;
                  var r = {};
                  return (
                    "abcdefghijklmnopqrst".split("").forEach(function(e) {
                      r[e] = e;
                    }),
                    "abcdefghijklmnopqrst" ===
                      Object.keys(Object.assign({}, r)).join("")
                  );
                } catch (e) {
                  return !1;
                }
              })()
                ? Object.assign
                : function(e, r) {
                    for (
                      var a,
                        o,
                        s = (function(e) {
                          if (null == e)
                            throw new TypeError(
                              "Object.assign cannot be called with null or undefined"
                            );
                          return Object(e);
                        })(e),
                        f = 1;
                      f < arguments.length;
                      f++
                    ) {
                      for (var u in (a = Object(arguments[f])))
                        n.call(a, u) && (s[u] = a[u]);
                      if (t) {
                        o = t(a);
                        for (var c = 0; c < o.length; c++)
                          i.call(a, o[c]) && (s[o[c]] = a[o[c]]);
                      }
                    }
                    return s;
                  },
              o =
                "undefined" != typeof window
                  ? window
                  : void 0 !== r
                  ? r
                  : "undefined" != typeof self
                  ? self
                  : {};
            function s(e, t) {
              return e((t = { exports: {} }), t.exports), t.exports;
            }
            var f =
                o.performance && o.performance.now
                  ? function() {
                      return performance.now();
                    }
                  : Date.now ||
                    function() {
                      return +new Date();
                    },
              u = function(e) {
                return (
                  !!e &&
                  ("object" == typeof e || "function" == typeof e) &&
                  "function" == typeof e.then
                );
              };
            var c = function(e) {
              return (
                !(!e || "object" != typeof e) &&
                ("object" == typeof window && "object" == typeof window.Node
                  ? e instanceof window.Node
                  : "number" == typeof e.nodeType &&
                    "string" == typeof e.nodeName)
              );
            };
            function l() {
              return (
                "undefined" != typeof window && window["canvas-sketch-cli"]
              );
            }
            function p() {
              for (var e = arguments, t = 0; t < arguments.length; t++)
                if (null != e[t]) return e[t];
            }
            function h() {
              return "undefined" != typeof document;
            }
            var d,
              m = s(function(e, t) {
                function n(e) {
                  var t = [];
                  for (var n in e) t.push(n);
                  return t;
                }
                (e.exports =
                  "function" == typeof Object.keys ? Object.keys : n).shim = n;
              }),
              g = s(function(e, t) {
                var n =
                  "[object Arguments]" ==
                  (function() {
                    return Object.prototype.toString.call(arguments);
                  })();
                function r(e) {
                  return (
                    "[object Arguments]" == Object.prototype.toString.call(e)
                  );
                }
                function i(e) {
                  return (
                    (e &&
                      "object" == typeof e &&
                      "number" == typeof e.length &&
                      Object.prototype.hasOwnProperty.call(e, "callee") &&
                      !Object.prototype.propertyIsEnumerable.call(
                        e,
                        "callee"
                      )) ||
                    !1
                  );
                }
                ((t = e.exports = n ? r : i).supported = r),
                  (t.unsupported = i);
              }),
              y = s(function(e) {
                var t = Array.prototype.slice,
                  n = (e.exports = function(e, a, o) {
                    return (
                      o || (o = {}),
                      e === a ||
                        (e instanceof Date && a instanceof Date
                          ? e.getTime() === a.getTime()
                          : !e ||
                            !a ||
                            ("object" != typeof e && "object" != typeof a)
                          ? o.strict
                            ? e === a
                            : e == a
                          : (function(e, a, o) {
                              var s, f;
                              if (r(e) || r(a)) return !1;
                              if (e.prototype !== a.prototype) return !1;
                              if (g(e))
                                return (
                                  !!g(a) &&
                                  ((e = t.call(e)), (a = t.call(a)), n(e, a, o))
                                );
                              if (i(e)) {
                                if (!i(a)) return !1;
                                if (e.length !== a.length) return !1;
                                for (s = 0; s < e.length; s++)
                                  if (e[s] !== a[s]) return !1;
                                return !0;
                              }
                              try {
                                var u = m(e),
                                  c = m(a);
                              } catch (e) {
                                return !1;
                              }
                              if (u.length != c.length) return !1;
                              for (
                                u.sort(), c.sort(), s = u.length - 1;
                                s >= 0;
                                s--
                              )
                                if (u[s] != c[s]) return !1;
                              for (s = u.length - 1; s >= 0; s--)
                                if (!n(e[(f = u[s])], a[f], o)) return !1;
                              return typeof e == typeof a;
                            })(e, a, o))
                    );
                  });
                function r(e) {
                  return null == e;
                }
                function i(e) {
                  return (
                    !(
                      !e ||
                      "object" != typeof e ||
                      "number" != typeof e.length
                    ) &&
                    ("function" == typeof e.copy &&
                      "function" == typeof e.slice &&
                      !(e.length > 0 && "number" != typeof e[0]))
                  );
                }
              }),
              v = s(function(e, t) {
                !(function(t) {
                  var n,
                    r,
                    i,
                    a = ((n = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZWN]|"[^"]*"|'[^']*'/g),
                    (r = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g),
                    (i = /[^-+\dA-Z]/g),
                    function(e, t, s, f) {
                      if (
                        (1 !== arguments.length ||
                          "string" !==
                            (null === (u = e)
                              ? "null"
                              : void 0 === u
                              ? "undefined"
                              : "object" != typeof u
                              ? typeof u
                              : Array.isArray(u)
                              ? "array"
                              : {}.toString
                                  .call(u)
                                  .slice(8, -1)
                                  .toLowerCase()) ||
                          /\d/.test(e) ||
                          ((t = e), (e = void 0)),
                        (e = e || new Date()) instanceof Date ||
                          (e = new Date(e)),
                        isNaN(e))
                      )
                        throw TypeError("Invalid date");
                      var u,
                        c = (t = String(
                          a.masks[t] || t || a.masks.default
                        )).slice(0, 4);
                      ("UTC:" !== c && "GMT:" !== c) ||
                        ((t = t.slice(4)), (s = !0), "GMT:" === c && (f = !0));
                      var l = s ? "getUTC" : "get",
                        p = e[l + "Date"](),
                        h = e[l + "Day"](),
                        d = e[l + "Month"](),
                        m = e[l + "FullYear"](),
                        g = e[l + "Hours"](),
                        y = e[l + "Minutes"](),
                        v = e[l + "Seconds"](),
                        b = e[l + "Milliseconds"](),
                        x = s ? 0 : e.getTimezoneOffset(),
                        w = (function(e) {
                          var t = new Date(
                            e.getFullYear(),
                            e.getMonth(),
                            e.getDate()
                          );
                          t.setDate(t.getDate() - ((t.getDay() + 6) % 7) + 3);
                          var n = new Date(t.getFullYear(), 0, 4);
                          n.setDate(n.getDate() - ((n.getDay() + 6) % 7) + 3);
                          var r = t.getTimezoneOffset() - n.getTimezoneOffset();
                          return (
                            t.setHours(t.getHours() - r),
                            1 + Math.floor((t - n) / 6048e5)
                          );
                        })(e),
                        k = (function(e) {
                          var t = e.getDay();
                          return 0 === t && (t = 7), t;
                        })(e),
                        _ = {
                          d: p,
                          dd: o(p),
                          ddd: a.i18n.dayNames[h],
                          dddd: a.i18n.dayNames[h + 7],
                          m: d + 1,
                          mm: o(d + 1),
                          mmm: a.i18n.monthNames[d],
                          mmmm: a.i18n.monthNames[d + 12],
                          yy: String(m).slice(2),
                          yyyy: m,
                          h: g % 12 || 12,
                          hh: o(g % 12 || 12),
                          H: g,
                          HH: o(g),
                          M: y,
                          MM: o(y),
                          s: v,
                          ss: o(v),
                          l: o(b, 3),
                          L: o(Math.round(b / 10)),
                          t: g < 12 ? a.i18n.timeNames[0] : a.i18n.timeNames[1],
                          tt:
                            g < 12 ? a.i18n.timeNames[2] : a.i18n.timeNames[3],
                          T: g < 12 ? a.i18n.timeNames[4] : a.i18n.timeNames[5],
                          TT:
                            g < 12 ? a.i18n.timeNames[6] : a.i18n.timeNames[7],
                          Z: f
                            ? "GMT"
                            : s
                            ? "UTC"
                            : (String(e).match(r) || [""]).pop().replace(i, ""),
                          o:
                            (x > 0 ? "-" : "+") +
                            o(
                              100 * Math.floor(Math.abs(x) / 60) +
                                (Math.abs(x) % 60),
                              4
                            ),
                          S: ["th", "st", "nd", "rd"][
                            p % 10 > 3
                              ? 0
                              : (((p % 100) - (p % 10) != 10) * p) % 10
                          ],
                          W: w,
                          N: k
                        };
                      return t.replace(n, function(e) {
                        return e in _ ? _[e] : e.slice(1, e.length - 1);
                      });
                    });
                  function o(e, t) {
                    for (e = String(e), t = t || 2; e.length < t; ) e = "0" + e;
                    return e;
                  }
                  (a.masks = {
                    default: "ddd mmm dd yyyy HH:MM:ss",
                    shortDate: "m/d/yy",
                    mediumDate: "mmm d, yyyy",
                    longDate: "mmmm d, yyyy",
                    fullDate: "dddd, mmmm d, yyyy",
                    shortTime: "h:MM TT",
                    mediumTime: "h:MM:ss TT",
                    longTime: "h:MM:ss TT Z",
                    isoDate: "yyyy-mm-dd",
                    isoTime: "HH:MM:ss",
                    isoDateTime: "yyyy-mm-dd'T'HH:MM:sso",
                    isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'",
                    expiresHeaderFormat: "ddd, dd mmm yyyy HH:MM:ss Z"
                  }),
                    (a.i18n = {
                      dayNames: [
                        "Sun",
                        "Mon",
                        "Tue",
                        "Wed",
                        "Thu",
                        "Fri",
                        "Sat",
                        "Sunday",
                        "Monday",
                        "Tuesday",
                        "Wednesday",
                        "Thursday",
                        "Friday",
                        "Saturday"
                      ],
                      monthNames: [
                        "Jan",
                        "Feb",
                        "Mar",
                        "Apr",
                        "May",
                        "Jun",
                        "Jul",
                        "Aug",
                        "Sep",
                        "Oct",
                        "Nov",
                        "Dec",
                        "January",
                        "February",
                        "March",
                        "April",
                        "May",
                        "June",
                        "July",
                        "August",
                        "September",
                        "October",
                        "November",
                        "December"
                      ],
                      timeNames: ["a", "p", "am", "pm", "A", "P", "AM", "PM"]
                    }),
                    (e.exports = a);
                })();
              }),
              b = "",
              x = function(e, t) {
                if ("string" != typeof e)
                  throw new TypeError("expected a string");
                if (1 === t) return e;
                if (2 === t) return e + e;
                var n = e.length * t;
                if (d !== e || void 0 === d) (d = e), (b = "");
                else if (b.length >= n) return b.substr(0, n);
                for (; n > b.length && t > 1; )
                  1 & t && (b += e), (t >>= 1), (e += e);
                return (b = (b += e).substr(0, n));
              };
            var w,
              k = function(e, t, n) {
                return (
                  (e = e.toString()),
                  void 0 === t
                    ? e
                    : ((n = 0 === n ? "0" : n ? n.toString() : " "),
                      x(n, t - e.length) + e)
                );
              },
              _ = function() {},
              A = ["image/png", "image/jpeg", "image/webp"];
            function T(e, t) {
              return (
                void 0 === t && (t = {}),
                (function(e) {
                  return new Promise(function(t) {
                    var n = e.indexOf(",");
                    if (-1 !== n) {
                      for (
                        var r = e.slice(n + 1),
                          i = window.atob(r),
                          a = /data:([^;+]);/.exec(e),
                          o = (a ? a[1] : "") || void 0,
                          s = new ArrayBuffer(i.length),
                          f = new Uint8Array(s),
                          u = 0;
                        u < i.length;
                        u++
                      )
                        f[u] = i.charCodeAt(u);
                      t(new window.Blob([s], { type: o }));
                    } else t(new window.Blob());
                  });
                })(e).then(function(e) {
                  return E(e, t);
                })
              );
            }
            function E(e, t) {
              return (
                void 0 === t && (t = {}),
                new Promise(function(n) {
                  var r = (t = a({ extension: "", prefix: "", suffix: "" }, t))
                      .filename,
                    i = l();
                  if (i && "function" == typeof i.saveBlob && i.output)
                    return i
                      .saveBlob(e, a({}, t, { filename: r }))
                      .then(function(e) {
                        return n(e);
                      });
                  w ||
                    (((w = document.createElement("a")).style.visibility =
                      "hidden"),
                    (w.target = "_blank")),
                    (w.download = r),
                    (w.href = window.URL.createObjectURL(e)),
                    document.body.appendChild(w),
                    (w.onclick = function() {
                      (w.onclick = _),
                        setTimeout(function() {
                          window.URL.revokeObjectURL(e),
                            w.parentElement && w.parentElement.removeChild(w),
                            w.removeAttribute("href"),
                            n({ filename: r, client: !1 });
                        });
                    }),
                    w.click();
                })
              );
            }
            var D = {
                dimension: "dimensions",
                animated: "animate",
                animating: "animate",
                unit: "units",
                P5: "p5",
                pixellated: "pixelated",
                looping: "loop",
                pixelPerInch: "pixels"
              },
              C = [
                "dimensions",
                "units",
                "pixelsPerInch",
                "orientation",
                "scaleToFit",
                "scaleToView",
                "bleed",
                "pixelRatio",
                "exportPixelRatio",
                "maxPixelRatio",
                "scaleContext",
                "resizeCanvas",
                "styleCanvas",
                "canvas",
                "context",
                "attributes",
                "parent",
                "file",
                "name",
                "prefix",
                "suffix",
                "animate",
                "playing",
                "loop",
                "duration",
                "totalFrames",
                "fps",
                "playbackRate",
                "timeScale",
                "frame",
                "time",
                "flush",
                "pixelated",
                "hotkeys",
                "p5",
                "id",
                "scaleToFitPadding",
                "data",
                "params",
                "encoding",
                "encodingQuality"
              ],
              S = function(e) {
                Object.keys(e).forEach(function(e) {
                  e in D
                    ? console.warn(
                        '[canvas-sketch] Could not recognize the setting "' +
                          e +
                          '", did you mean "' +
                          D[e] +
                          '"?'
                      )
                    : C.includes(e) ||
                      console.warn(
                        '[canvas-sketch] Could not recognize the setting "' +
                          e +
                          '"'
                      );
                });
              };
            var j = [
              ["postcard", 101.6, 152.4],
              ["poster-small", 280, 430],
              ["poster", 460, 610],
              ["poster-large", 610, 910],
              ["business-card", 50.8, 88.9],
              ["2r", 64, 89],
              ["3r", 89, 127],
              ["4r", 102, 152],
              ["5r", 127, 178],
              ["6r", 152, 203],
              ["8r", 203, 254],
              ["10r", 254, 305],
              ["11r", 279, 356],
              ["12r", 305, 381],
              ["a0", 841, 1189],
              ["a1", 594, 841],
              ["a2", 420, 594],
              ["a3", 297, 420],
              ["a4", 210, 297],
              ["a5", 148, 210],
              ["a6", 105, 148],
              ["a7", 74, 105],
              ["a8", 52, 74],
              ["a9", 37, 52],
              ["a10", 26, 37],
              ["2a0", 1189, 1682],
              ["4a0", 1682, 2378],
              ["b0", 1e3, 1414],
              ["b1", 707, 1e3],
              ["b1+", 720, 1020],
              ["b2", 500, 707],
              ["b2+", 520, 720],
              ["b3", 353, 500],
              ["b4", 250, 353],
              ["b5", 176, 250],
              ["b6", 125, 176],
              ["b7", 88, 125],
              ["b8", 62, 88],
              ["b9", 44, 62],
              ["b10", 31, 44],
              ["b11", 22, 32],
              ["b12", 16, 22],
              ["c0", 917, 1297],
              ["c1", 648, 917],
              ["c2", 458, 648],
              ["c3", 324, 458],
              ["c4", 229, 324],
              ["c5", 162, 229],
              ["c6", 114, 162],
              ["c7", 81, 114],
              ["c8", 57, 81],
              ["c9", 40, 57],
              ["c10", 28, 40],
              ["c11", 22, 32],
              ["c12", 16, 22],
              ["half-letter", 5.5, 8.5, "in"],
              ["letter", 8.5, 11, "in"],
              ["legal", 8.5, 14, "in"],
              ["junior-legal", 5, 8, "in"],
              ["ledger", 11, 17, "in"],
              ["tabloid", 11, 17, "in"],
              ["ansi-a", 8.5, 11, "in"],
              ["ansi-b", 11, 17, "in"],
              ["ansi-c", 17, 22, "in"],
              ["ansi-d", 22, 34, "in"],
              ["ansi-e", 34, 44, "in"],
              ["arch-a", 9, 12, "in"],
              ["arch-b", 12, 18, "in"],
              ["arch-c", 18, 24, "in"],
              ["arch-d", 24, 36, "in"],
              ["arch-e", 36, 48, "in"],
              ["arch-e1", 30, 42, "in"],
              ["arch-e2", 26, 38, "in"],
              ["arch-e3", 27, 39, "in"]
            ].reduce(function(e, t) {
              var n = { units: t[3] || "mm", dimensions: [t[1], t[2]] };
              return (e[t[0]] = n), (e[t[0].replace(/-/g, " ")] = n), e;
            }, {});
            function M(t, n, r, i) {
              return (
                void 0 === n && (n = "px"),
                void 0 === r && (r = "px"),
                void 0 === i && (i = 72),
                e(t, n, r, { pixelsPerInch: i, precision: 4, roundPixel: !0 })
              );
            }
            function F(e, t) {
              var n,
                r,
                i,
                a,
                o,
                s,
                f = h(),
                u = t.dimensions,
                c = (function(e) {
                  return !(
                    !e.dimensions ||
                    ("string" != typeof e.dimensions &&
                      !(
                        Array.isArray(e.dimensions) && e.dimensions.length >= 2
                      ))
                  );
                })(t),
                l = e.exporting,
                d = !!c && !1 !== t.scaleToFit,
                m = !(!l && c) || t.scaleToView;
              f || (d = m = !1);
              var g,
                y,
                v = t.units,
                b =
                  "number" == typeof t.pixelsPerInch &&
                  isFinite(t.pixelsPerInch)
                    ? t.pixelsPerInch
                    : 72,
                x = p(t.bleed, 0),
                w = f ? window.devicePixelRatio : 1,
                k = m ? w : 1;
              "number" == typeof t.pixelRatio && isFinite(t.pixelRatio)
                ? (y = p(t.exportPixelRatio, (g = t.pixelRatio)))
                : c
                ? ((g = k), (y = p(t.exportPixelRatio, 1)))
                : (y = p(t.exportPixelRatio, (g = w))),
                "number" == typeof t.maxPixelRatio &&
                  isFinite(t.maxPixelRatio) &&
                  (g = Math.min(t.maxPixelRatio, g)),
                l && (g = y);
              var _,
                A,
                T = (function(e, t) {
                  if (!h()) return [300, 150];
                  var n = t.parent || window;
                  if (n === window || n === document || n === document.body)
                    return [window.innerWidth, window.innerHeight];
                  var r = n.getBoundingClientRect();
                  return [r.width, r.height];
                })(0, t),
                E = T[0],
                D = T[1];
              if (c) {
                var C = (function(e, t, n) {
                    if (
                      (void 0 === t && (t = "px"),
                      void 0 === n && (n = 72),
                      "string" == typeof e)
                    ) {
                      var r = e.toLowerCase();
                      if (!(r in j))
                        throw new Error(
                          'The dimension preset "' +
                            e +
                            '" is not supported or could not be found; try using a4, a3, postcard, letter, etc.'
                        );
                      var i = j[r];
                      return i.dimensions.map(function(e) {
                        return M(e, i.units, t, n);
                      });
                    }
                    return e;
                  })(u, v, b),
                  S = Math.max(C[0], C[1]),
                  F = Math.min(C[0], C[1]);
                if (t.orientation) {
                  var O = "landscape" === t.orientation;
                  (n = O ? S : F), (r = O ? F : S);
                } else (n = C[0]), (r = C[1]);
                (_ = n), (A = r), (n += 2 * x), (r += 2 * x);
              } else (_ = n = E), (A = r = D);
              var z = n,
                P = r;
              if (
                (c && v && ((z = M(n, v, "px", b)), (P = M(r, v, "px", b))),
                (i = Math.round(z)),
                (a = Math.round(P)),
                d && !l && c)
              ) {
                var R = n / r,
                  I = E / D,
                  B = p(t.scaleToFitPadding, 40),
                  L = Math.round(E - 2 * B),
                  H = Math.round(D - 2 * B);
                (i > L || a > H) &&
                  (I > R
                    ? ((a = H), (i = Math.round(a * R)))
                    : ((i = L), (a = Math.round(i / R))));
              }
              return {
                bleed: x,
                pixelRatio: g,
                width: n,
                height: r,
                dimensions: [n, r],
                units: v || "px",
                scaleX: (o = m ? Math.round(g * i) : Math.round(g * z)) / n,
                scaleY: (s = m ? Math.round(g * a) : Math.round(g * P)) / r,
                viewportWidth: m ? Math.round(i) : Math.round(z),
                viewportHeight: m ? Math.round(a) : Math.round(P),
                canvasWidth: o,
                canvasHeight: s,
                trimWidth: _,
                trimHeight: A,
                styleWidth: i,
                styleHeight: a
              };
            }
            var O = function(e, t) {
              if ("string" != typeof e)
                throw new TypeError("must specify type string");
              if (((t = t || {}), "undefined" == typeof document && !t.canvas))
                return null;
              var n = t.canvas || document.createElement("canvas");
              "number" == typeof t.width && (n.width = t.width);
              "number" == typeof t.height && (n.height = t.height);
              var r,
                i = t;
              try {
                var a = [e];
                0 === e.indexOf("webgl") && a.push("experimental-" + e);
                for (var o = 0; o < a.length; o++)
                  if ((r = n.getContext(a[o], i))) return r;
              } catch (e) {
                r = null;
              }
              return r || null;
            };
            function z(e) {
              var t, n;
              void 0 === e && (e = {});
              var r = !1;
              if (!1 !== e.canvas) {
                if (!(t = e.context) || "string" == typeof t) {
                  var i = e.canvas;
                  i ||
                    ((i = (function() {
                      if (!h())
                        throw new Error(
                          "It appears you are runing from Node.js or a non-browser environment. Try passing in an existing { canvas } interface instead."
                        );
                      return document.createElement("canvas");
                    })()),
                    (r = !0));
                  var o = t || "2d";
                  if ("function" != typeof i.getContext)
                    throw new Error(
                      "The specified { canvas } element does not have a getContext() function, maybe it is not a <canvas> tag?"
                    );
                  if (!(t = O(o, a({}, e.attributes, { canvas: i }))))
                    throw new Error(
                      "Failed at canvas.getContext('" +
                        o +
                        "') - the browser may not support this context, or a different context may already be in use with this canvas."
                    );
                }
                if (((n = t.canvas), e.canvas && n !== e.canvas))
                  throw new Error(
                    "The { canvas } and { context } settings must point to the same underlying canvas element"
                  );
                e.pixelated &&
                  ((t.imageSmoothingEnabled = !1),
                  (t.mozImageSmoothingEnabled = !1),
                  (t.oImageSmoothingEnabled = !1),
                  (t.webkitImageSmoothingEnabled = !1),
                  (t.msImageSmoothingEnabled = !1),
                  (n.style["image-rendering"] = "pixelated"));
              }
              return { canvas: n, context: t, ownsCanvas: r };
            }
            var P = function() {
                var e = this;
                (this._settings = {}),
                  (this._props = {}),
                  (this._sketch = void 0),
                  (this._raf = null),
                  (this._lastRedrawResult = void 0),
                  (this._isP5Resizing = !1),
                  (this._keyboardShortcuts = (function(e) {
                    void 0 === e && (e = {});
                    var t = function(t) {
                      if (e.enabled()) {
                        var n = l();
                        83 !== t.keyCode ||
                        t.altKey ||
                        (!t.metaKey && !t.ctrlKey)
                          ? 32 === t.keyCode
                            ? e.togglePlay(t)
                            : n &&
                              !t.altKey &&
                              75 === t.keyCode &&
                              (t.metaKey || t.ctrlKey) &&
                              (t.preventDefault(), e.commit(t))
                          : (t.preventDefault(), e.save(t));
                      }
                    };
                    return {
                      attach: function() {
                        window.addEventListener("keydown", t);
                      },
                      detach: function() {
                        window.removeEventListener("keydown", t);
                      }
                    };
                  })({
                    enabled: function() {
                      return !1 !== e.settings.hotkeys;
                    },
                    save: function(t) {
                      t.shiftKey
                        ? e.props.recording
                          ? (e.endRecord(), e.run())
                          : e.record()
                        : e.exportFrame();
                    },
                    togglePlay: function() {
                      e.props.playing ? e.pause() : e.play();
                    },
                    commit: function(t) {
                      e.exportFrame({ commit: !0 });
                    }
                  })),
                  (this._animateHandler = function() {
                    return e.animate();
                  }),
                  (this._resizeHandler = function() {
                    e.resize() && e.render();
                  });
              },
              R = {
                sketch: { configurable: !0 },
                settings: { configurable: !0 },
                props: { configurable: !0 }
              };
            (R.sketch.get = function() {
              return this._sketch;
            }),
              (R.settings.get = function() {
                return this._settings;
              }),
              (R.props.get = function() {
                return this._props;
              }),
              (P.prototype._computePlayhead = function(e, t) {
                return "number" == typeof t && isFinite(t) ? e / t : 0;
              }),
              (P.prototype._computeFrame = function(e, t, n, r) {
                return isFinite(n) && n > 1
                  ? Math.floor(e * (n - 1))
                  : Math.floor(r * t);
              }),
              (P.prototype._computeCurrentFrame = function() {
                return this._computeFrame(
                  this.props.playhead,
                  this.props.time,
                  this.props.totalFrames,
                  this.props.fps
                );
              }),
              (P.prototype._getSizeProps = function() {
                var e = this.props;
                return {
                  width: e.width,
                  height: e.height,
                  pixelRatio: e.pixelRatio,
                  canvasWidth: e.canvasWidth,
                  canvasHeight: e.canvasHeight,
                  viewportWidth: e.viewportWidth,
                  viewportHeight: e.viewportHeight
                };
              }),
              (P.prototype.run = function() {
                if (!this.sketch)
                  throw new Error(
                    "should wait until sketch is loaded before trying to play()"
                  );
                return (
                  !1 !== this.settings.playing && this.play(),
                  "function" == typeof this.sketch.dispose &&
                    console.warn(
                      "In canvas-sketch@0.0.23 the dispose() event has been renamed to unload()"
                    ),
                  this.props.started ||
                    (this._signalBegin(), (this.props.started = !0)),
                  this.tick(),
                  this.render(),
                  this
                );
              }),
              (P.prototype.play = function() {
                var e = this.settings.animate;
                "animation" in this.settings &&
                  ((e = !0),
                  console.warn(
                    "[canvas-sketch] { animation } has been renamed to { animate }"
                  )),
                  e &&
                    (h()
                      ? this.props.playing ||
                        (this.props.started ||
                          (this._signalBegin(), (this.props.started = !0)),
                        (this.props.playing = !0),
                        null != this._raf &&
                          window.cancelAnimationFrame(this._raf),
                        (this._lastTime = f()),
                        (this._raf = window.requestAnimationFrame(
                          this._animateHandler
                        )))
                      : console.error(
                          "[canvas-sketch] WARN: Using { animate } in Node.js is not yet supported"
                        ));
              }),
              (P.prototype.pause = function() {
                this.props.recording && this.endRecord(),
                  (this.props.playing = !1),
                  null != this._raf &&
                    h() &&
                    window.cancelAnimationFrame(this._raf);
              }),
              (P.prototype.togglePlay = function() {
                this.props.playing ? this.pause() : this.play();
              }),
              (P.prototype.stop = function() {
                this.pause(),
                  (this.props.frame = 0),
                  (this.props.playhead = 0),
                  (this.props.time = 0),
                  (this.props.deltaTime = 0),
                  (this.props.started = !1),
                  this.render();
              }),
              (P.prototype.record = function() {
                var e = this;
                if (!this.props.recording)
                  if (h()) {
                    this.stop(),
                      (this.props.playing = !0),
                      (this.props.recording = !0);
                    var t = 1 / this.props.fps;
                    null != this._raf && window.cancelAnimationFrame(this._raf);
                    var n = function() {
                      return e.props.recording
                        ? ((e.props.deltaTime = t),
                          e.tick(),
                          e.exportFrame({ sequence: !0 }).then(function() {
                            e.props.recording &&
                              ((e.props.deltaTime = 0),
                              e.props.frame++,
                              e.props.frame < e.props.totalFrames
                                ? ((e.props.time += t),
                                  (e.props.playhead = e._computePlayhead(
                                    e.props.time,
                                    e.props.duration
                                  )),
                                  (e._raf = window.requestAnimationFrame(n)))
                                : (console.log("Finished recording"),
                                  e._signalEnd(),
                                  e.endRecord(),
                                  e.stop(),
                                  e.run()));
                          }))
                        : Promise.resolve();
                    };
                    this.props.started ||
                      (this._signalBegin(), (this.props.started = !0)),
                      (this._raf = window.requestAnimationFrame(n));
                  } else
                    console.error(
                      "[canvas-sketch] WARN: Recording from Node.js is not yet supported"
                    );
              }),
              (P.prototype._signalBegin = function() {
                var e = this;
                this.sketch &&
                  "function" == typeof this.sketch.begin &&
                  this._wrapContextScale(function(t) {
                    return e.sketch.begin(t);
                  });
              }),
              (P.prototype._signalEnd = function() {
                var e = this;
                this.sketch &&
                  "function" == typeof this.sketch.end &&
                  this._wrapContextScale(function(t) {
                    return e.sketch.end(t);
                  });
              }),
              (P.prototype.endRecord = function() {
                null != this._raf &&
                  h() &&
                  window.cancelAnimationFrame(this._raf),
                  (this.props.recording = !1),
                  (this.props.deltaTime = 0),
                  (this.props.playing = !1);
              }),
              (P.prototype.exportFrame = function(e) {
                var t = this;
                if ((void 0 === e && (e = {}), !this.sketch))
                  return Promise.all([]);
                "function" == typeof this.sketch.preExport &&
                  this.sketch.preExport();
                var n = a({
                    sequence: e.sequence,
                    save: e.save,
                    frame: e.sequence ? this.props.frame : void 0,
                    file: this.settings.file,
                    name: this.settings.name,
                    prefix: this.settings.prefix,
                    suffix: this.settings.suffix,
                    encoding: this.settings.encoding,
                    encodingQuality: this.settings.encodingQuality,
                    timeStamp: v(new Date(), "yyyy.mm.dd-HH.MM.ss"),
                    totalFrames: isFinite(this.props.totalFrames)
                      ? Math.max(100, this.props.totalFrames)
                      : 1e3
                  }),
                  r = l(),
                  i = Promise.resolve();
                if (r && e.commit && "function" == typeof r.commit) {
                  var o = a({}, n),
                    s = r.commit(o);
                  i = u(s) ? s : Promise.resolve(s);
                }
                return i
                  .then(function(e) {
                    return t._doExportFrame(a({}, n, { hash: e || "" }));
                  })
                  .then(function(e) {
                    return 1 === e.length ? e[0] : e;
                  });
              }),
              (P.prototype._doExportFrame = function(e) {
                var t = this;
                void 0 === e && (e = {}),
                  (this._props.exporting = !0),
                  this.resize();
                var n = this.render();
                return (
                  void 0 === n && (n = [this.props.canvas]),
                  (n = (n = [].concat(n).filter(Boolean)).map(function(t) {
                    var n,
                      r =
                        "object" == typeof t &&
                        t &&
                        ("data" in t || "dataURL" in t),
                      i = r ? t.data : t,
                      o = r ? a({}, t, { data: i }) : { data: i };
                    if (
                      c((n = i)) &&
                      /canvas/i.test(n.nodeName) &&
                      "function" == typeof n.getContext
                    ) {
                      var s = (function(e, t) {
                        void 0 === t && (t = {});
                        var n = t.encoding || "image/png";
                        if (!A.includes(n))
                          throw new Error("Invalid canvas encoding " + n);
                        var r = (n.split("/")[1] || "").replace(/jpeg/i, "jpg");
                        return (
                          r && (r = ("." + r).toLowerCase()),
                          {
                            extension: r,
                            type: n,
                            dataURL: e.toDataURL(n, t.encodingQuality)
                          }
                        );
                      })(i, {
                        encoding: o.encoding || e.encoding,
                        encodingQuality: p(
                          o.encodingQuality,
                          e.encodingQuality,
                          0.95
                        )
                      });
                      return Object.assign(o, {
                        dataURL: s.dataURL,
                        extension: s.extension,
                        type: s.type
                      });
                    }
                    return o;
                  })),
                  (this._props.exporting = !1),
                  this.resize(),
                  this.render(),
                  Promise.all(
                    n.map(function(t, n, r) {
                      var i = a(
                          { extension: "", prefix: "", suffix: "" },
                          e,
                          t,
                          { layer: n, totalLayers: r.length }
                        ),
                        o = !1 !== e.save && t.save;
                      for (var s in ((i.save = !1 !== o),
                      (i.filename = (function(e) {
                        if (
                          (void 0 === e && (e = {}),
                          "function" == typeof (e = a({}, e)).file)
                        )
                          return e.file(e);
                        if (e.file) return e.file;
                        var t,
                          n = null,
                          r = "";
                        "string" == typeof e.extension && (r = e.extension),
                          "number" == typeof e.frame &&
                            ((t =
                              "number" == typeof e.totalFrames
                                ? e.totalFrames
                                : Math.max(1e3, e.frame)),
                            (n = k(String(e.frame), String(t).length, "0")));
                        var i =
                          isFinite(e.totalLayers) &&
                          isFinite(e.layer) &&
                          e.totalLayers > 1
                            ? "" + e.layer
                            : "";
                        return null != n
                          ? [i, n].filter(Boolean).join("-") + r
                          : [
                              e.prefix,
                              e.name || e.timeStamp,
                              i,
                              e.hash,
                              e.suffix
                            ]
                              .filter(Boolean)
                              .join("-") + r;
                      })(i)),
                      delete i.encoding,
                      delete i.encodingQuality,
                      i))
                        void 0 === i[s] && delete i[s];
                      var f = Promise.resolve({});
                      if (i.save) {
                        var u = i.data;
                        if (i.dataURL) f = T(i.dataURL, i);
                        else
                          f = (function(e, t) {
                            void 0 === t && (t = {});
                            var n = Array.isArray(e) ? e : [e];
                            return E(
                              new window.Blob(n, { type: t.type || "" }),
                              t
                            );
                          })(u, i);
                      }
                      return f.then(function(e) {
                        return Object.assign({}, i, e);
                      });
                    })
                  ).then(function(n) {
                    var r = n.filter(function(e) {
                      return e.save;
                    });
                    if (r.length > 0) {
                      var i,
                        a = r.find(function(e) {
                          return e.outputName;
                        }),
                        o = r.some(function(e) {
                          return e.client;
                        });
                      i =
                        r.length > 1
                          ? r.length
                          : a
                          ? a.outputName + "/" + r[0].filename
                          : "" + r[0].filename;
                      var s = "";
                      if (e.sequence)
                        s = isFinite(t.props.totalFrames)
                          ? " (frame " +
                            (e.frame + 1) +
                            " / " +
                            t.props.totalFrames +
                            ")"
                          : " (frame " + e.frame + ")";
                      else r.length > 1 && (s = " files");
                      console.log(
                        "%c[" +
                          (o ? "canvas-sketch-cli" : "canvas-sketch") +
                          "]%c Exported %c" +
                          i +
                          "%c" +
                          s,
                        "color: #8e8e8e;",
                        "color: initial;",
                        "font-weight: bold;",
                        "font-weight: initial;"
                      );
                    }
                    return (
                      "function" == typeof t.sketch.postExport &&
                        t.sketch.postExport(),
                      n
                    );
                  })
                );
              }),
              (P.prototype._wrapContextScale = function(e) {
                this._preRender(), e(this.props), this._postRender();
              }),
              (P.prototype._preRender = function() {
                var e = this.props;
                this.props.gl || !e.context || e.p5
                  ? e.p5 &&
                    e.p5.scale(e.scaleX / e.pixelRatio, e.scaleY / e.pixelRatio)
                  : (e.context.save(),
                    !1 !== this.settings.scaleContext &&
                      e.context.scale(e.scaleX, e.scaleY));
              }),
              (P.prototype._postRender = function() {
                var e = this.props;
                this.props.gl || !e.context || e.p5 || e.context.restore(),
                  e.gl && !1 !== this.settings.flush && !e.p5 && e.gl.flush();
              }),
              (P.prototype.tick = function() {
                this.sketch &&
                  "function" == typeof this.sketch.tick &&
                  (this._preRender(),
                  this.sketch.tick(this.props),
                  this._postRender());
              }),
              (P.prototype.render = function() {
                return this.props.p5
                  ? ((this._lastRedrawResult = void 0),
                    this.props.p5.redraw(),
                    this._lastRedrawResult)
                  : this.submitDrawCall();
              }),
              (P.prototype.submitDrawCall = function() {
                if (this.sketch) {
                  var e,
                    t = this.props;
                  return (
                    this._preRender(),
                    "function" == typeof this.sketch
                      ? (e = this.sketch(t))
                      : "function" == typeof this.sketch.render &&
                        (e = this.sketch.render(t)),
                    this._postRender(),
                    e
                  );
                }
              }),
              (P.prototype.update = function(e) {
                var t = this;
                void 0 === e && (e = {});
                var n = ["animate"];
                Object.keys(e).forEach(function(e) {
                  if (n.indexOf(e) >= 0)
                    throw new Error(
                      "Sorry, the { " +
                        e +
                        " } option is not yet supported with update()."
                    );
                });
                var r = this._settings.canvas,
                  i = this._settings.context;
                for (var a in e) {
                  var o = e[a];
                  void 0 !== o && (t._settings[a] = o);
                }
                var s = Object.assign({}, this._settings, e);
                if ("time" in e && "frame" in e)
                  throw new Error(
                    "You should specify { time } or { frame } but not both"
                  );
                if (
                  ("time" in e ? delete s.frame : "frame" in e && delete s.time,
                  "duration" in e && "totalFrames" in e)
                )
                  throw new Error(
                    "You should specify { duration } or { totalFrames } but not both"
                  );
                "duration" in e
                  ? delete s.totalFrames
                  : "totalFrames" in e && delete s.duration,
                  "data" in e && (this._props.data = e.data);
                var f = this.getTimeProps(s);
                if (
                  (Object.assign(this._props, f),
                  r !== this._settings.canvas || i !== this._settings.context)
                ) {
                  var u = z(this._settings),
                    c = u.context;
                  (this.props.canvas = u.canvas),
                    (this.props.context = c),
                    this._setupGLKey(),
                    this._appendCanvasIfNeeded();
                }
                return (
                  e.p5 &&
                    "function" != typeof e.p5 &&
                    ((this.props.p5 = e.p5),
                    (this.props.p5.draw = function() {
                      t._isP5Resizing ||
                        (t._lastRedrawResult = t.submitDrawCall());
                    })),
                  "playing" in e && (e.playing ? this.play() : this.pause()),
                  S(this._settings),
                  this.resize(),
                  this.render(),
                  this.props
                );
              }),
              (P.prototype.resize = function() {
                var e = this._getSizeProps(),
                  t = this.settings,
                  n = this.props,
                  r = F(n, t);
                Object.assign(this._props, r);
                var i = this.props,
                  a = i.pixelRatio,
                  o = i.canvasWidth,
                  s = i.canvasHeight,
                  f = i.styleWidth,
                  u = i.styleHeight,
                  c = this.props.canvas;
                c &&
                  !1 !== t.resizeCanvas &&
                  (n.p5
                    ? (c.width === o && c.height === s) ||
                      ((this._isP5Resizing = !0),
                      n.p5.pixelDensity(a),
                      n.p5.resizeCanvas(o / a, s / a, !1),
                      (this._isP5Resizing = !1))
                    : (c.width !== o && (c.width = o),
                      c.height !== s && (c.height = s)),
                  h() &&
                    !1 !== t.styleCanvas &&
                    ((c.style.width = f + "px"), (c.style.height = u + "px")));
                var l = this._getSizeProps(),
                  p = !y(e, l);
                return p && this._sizeChanged(), p;
              }),
              (P.prototype._sizeChanged = function() {
                this.sketch &&
                  "function" == typeof this.sketch.resize &&
                  this.sketch.resize(this.props);
              }),
              (P.prototype.animate = function() {
                if (this.props.playing)
                  if (h()) {
                    this._raf = window.requestAnimationFrame(
                      this._animateHandler
                    );
                    var e = f(),
                      t = 1e3 / this.props.fps,
                      n = e - this._lastTime,
                      r = this.props.duration,
                      i = "number" == typeof r && isFinite(r),
                      a = !0,
                      o = this.settings.playbackRate;
                    "fixed" === o
                      ? (n = t)
                      : "throttle" === o
                      ? n > t
                        ? (this._lastTime = e -= n % t)
                        : (a = !1)
                      : (this._lastTime = e);
                    var s = n / 1e3,
                      u = this.props.time + s * this.props.timeScale;
                    u < 0 && i && (u = r + u);
                    var c = !1,
                      l = !1;
                    if (
                      (i &&
                        u >= r &&
                        (!1 !== this.settings.loop
                          ? ((a = !0), (u %= r), (l = !0))
                          : ((a = !1), (u = r), (c = !0)),
                        this._signalEnd()),
                      a)
                    ) {
                      (this.props.deltaTime = s),
                        (this.props.time = u),
                        (this.props.playhead = this._computePlayhead(u, r));
                      var p = this.props.frame;
                      (this.props.frame = this._computeCurrentFrame()),
                        l && this._signalBegin(),
                        p !== this.props.frame && this.tick(),
                        this.render(),
                        (this.props.deltaTime = 0);
                    }
                    c && this.pause();
                  } else
                    console.error(
                      "[canvas-sketch] WARN: Animation in Node.js is not yet supported"
                    );
              }),
              (P.prototype.dispatch = function(e) {
                if ("function" != typeof e)
                  throw new Error("must pass function into dispatch()");
                e(this.props), this.render();
              }),
              (P.prototype.mount = function() {
                this._appendCanvasIfNeeded();
              }),
              (P.prototype.unmount = function() {
                h() &&
                  (window.removeEventListener("resize", this._resizeHandler),
                  this._keyboardShortcuts.detach()),
                  this.props.canvas.parentElement &&
                    this.props.canvas.parentElement.removeChild(
                      this.props.canvas
                    );
              }),
              (P.prototype._appendCanvasIfNeeded = function() {
                h() &&
                  (!1 !== this.settings.parent &&
                    this.props.canvas &&
                    !this.props.canvas.parentElement &&
                    (this.settings.parent || document.body).appendChild(
                      this.props.canvas
                    ));
              }),
              (P.prototype._setupGLKey = function() {
                var e;
                this.props.context &&
                  ("function" == typeof (e = this.props.context).clear &&
                  "function" == typeof e.clearColor &&
                  "function" == typeof e.bufferData
                    ? (this._props.gl = this.props.context)
                    : delete this._props.gl);
              }),
              (P.prototype.getTimeProps = function(e) {
                void 0 === e && (e = {});
                var t = e.duration,
                  n = e.totalFrames,
                  r = p(e.timeScale, 1),
                  i = p(e.fps, 24),
                  a = "number" == typeof t && isFinite(t),
                  o = "number" == typeof n && isFinite(n),
                  s = a ? Math.floor(i * t) : void 0,
                  f = o ? n / i : void 0;
                if (a && o && s !== n)
                  throw new Error(
                    "You should specify either duration or totalFrames, but not both. Or, they must match exactly."
                  );
                void 0 === e.dimensions &&
                  void 0 !== e.units &&
                  console.warn(
                    "You've specified a { units } setting but no { dimension }, so the units will be ignored."
                  ),
                  (n = p(n, s, Infinity)),
                  (t = p(t, f, Infinity));
                var u = e.time,
                  c = e.frame,
                  l = "number" == typeof u && isFinite(u),
                  h = "number" == typeof c && isFinite(c),
                  d = 0,
                  m = 0,
                  g = 0;
                if (l && h)
                  throw new Error(
                    "You should specify either start frame or time, but not both."
                  );
                return (
                  l
                    ? ((g = this._computePlayhead((d = u), t)),
                      (m = this._computeFrame(g, d, n, i)))
                    : h && (g = this._computePlayhead((d = (m = c) / i), t)),
                  {
                    playhead: g,
                    time: d,
                    frame: m,
                    duration: t,
                    totalFrames: n,
                    fps: i,
                    timeScale: r
                  }
                );
              }),
              (P.prototype.setup = function(e) {
                var t = this;
                if ((void 0 === e && (e = {}), this.sketch))
                  throw new Error("Multiple setup() calls not yet supported.");
                (this._settings = Object.assign({}, e, this._settings)),
                  S(this._settings);
                var n = z(this._settings),
                  r = n.context,
                  i = n.canvas,
                  a = this.getTimeProps(this._settings);
                (this._props = Object.assign({}, a, {
                  canvas: i,
                  context: r,
                  deltaTime: 0,
                  started: !1,
                  exporting: !1,
                  playing: !1,
                  recording: !1,
                  settings: this.settings,
                  data: this.settings.data,
                  render: function() {
                    return t.render();
                  },
                  togglePlay: function() {
                    return t.togglePlay();
                  },
                  dispatch: function(e) {
                    return t.dispatch(e);
                  },
                  tick: function() {
                    return t.tick();
                  },
                  resize: function() {
                    return t.resize();
                  },
                  update: function(e) {
                    return t.update(e);
                  },
                  exportFrame: function(e) {
                    return t.exportFrame(e);
                  },
                  record: function() {
                    return t.record();
                  },
                  play: function() {
                    return t.play();
                  },
                  pause: function() {
                    return t.pause();
                  },
                  stop: function() {
                    return t.stop();
                  }
                })),
                  this._setupGLKey(),
                  this.resize();
              }),
              (P.prototype.loadAndRun = function(e, t) {
                var n = this;
                return this.load(e, t).then(function() {
                  return n.run(), n;
                });
              }),
              (P.prototype.unload = function() {
                var e = this;
                this.pause(),
                  this.sketch &&
                    ("function" == typeof this.sketch.unload &&
                      this._wrapContextScale(function(t) {
                        return e.sketch.unload(t);
                      }),
                    (this._sketch = null));
              }),
              (P.prototype.destroy = function() {
                this.unload(), this.unmount();
              }),
              (P.prototype.load = function(e, t) {
                var n = this;
                if ("function" != typeof e)
                  throw new Error(
                    "The function must take in a function as the first parameter. Example:\n  canvasSketcher(() => { ... }, settings)"
                  );
                this.sketch && this.unload(),
                  void 0 !== t && this.update(t),
                  this._preRender();
                var r = Promise.resolve();
                if (this.settings.p5) {
                  if (!h())
                    throw new Error(
                      "[canvas-sketch] ERROR: Using p5.js in Node.js is not supported"
                    );
                  r = new Promise(function(e) {
                    var t,
                      r = n.settings.p5;
                    r.p5 && ((t = r.preload), (r = r.p5));
                    var i = function(r) {
                      t &&
                        (r.preload = function() {
                          return t(r);
                        }),
                        (r.setup = function() {
                          var t = n.props,
                            i = "webgl" === n.settings.context,
                            a = i ? r.WEBGL : r.P2D;
                          r.noLoop(),
                            r.pixelDensity(t.pixelRatio),
                            r.createCanvas(
                              t.viewportWidth,
                              t.viewportHeight,
                              a
                            ),
                            i &&
                              n.settings.attributes &&
                              r.setAttributes(n.settings.attributes),
                            n.update({
                              p5: r,
                              canvas: r.canvas,
                              context: r._renderer.drawingContext
                            }),
                            e();
                        });
                    };
                    if ("function" == typeof r) new r(i);
                    else {
                      if ("function" != typeof window.createCanvas)
                        throw new Error(
                          "{ p5 } setting is passed but can't find p5.js in global (window) scope. Maybe you did not create it globally?\nnew p5(); // <-- attaches to global scope"
                        );
                      i(window);
                    }
                  });
                }
                return r
                  .then(function() {
                    var t = e(n.props);
                    return u(t) || (t = Promise.resolve(t)), t;
                  })
                  .then(function(e) {
                    return (
                      e || (e = {}),
                      (n._sketch = e),
                      h() &&
                        (n._keyboardShortcuts.attach(),
                        window.addEventListener("resize", n._resizeHandler)),
                      n._postRender(),
                      n._sizeChanged(),
                      n
                    );
                  })
                  .catch(function(e) {
                    throw (console.warn(
                      "Could not start sketch, the async loading function rejected with an error:\n    Error: " +
                        e.message
                    ),
                    e);
                  });
              }),
              Object.defineProperties(P.prototype, R);
            var I = "hot-id-cache",
              B = [];
            function L(e, t) {
              if ((void 0 === t && (t = {}), t.p5)) {
                if (t.canvas || (t.context && "string" != typeof t.context))
                  throw new Error(
                    'In { p5 } mode, you can\'t pass your own canvas or context, unless the context is a "webgl" or "2d" string'
                  );
                t = Object.assign({}, t, {
                  canvas: !1,
                  context: "string" == typeof t.context && t.context
                });
              }
              var n,
                r,
                i = (n = l()) && n.hot;
              i && (r = p(t.id, "$__DEFAULT_CANVAS_SKETCH_ID__$"));
              var a = i && "string" == typeof r;
              a &&
                B.includes(r) &&
                (console.warn(
                  "Warning: You have multiple calls to canvasSketch() in --hot mode. You must pass unique { id } strings in settings to enable hot reload across multiple sketches. ",
                  r
                ),
                (a = !1));
              var o = Promise.resolve();
              if (a) {
                B.push(r);
                var s = (function(e) {
                  var t = l();
                  if (t) return (t[I] = t[I] || {}), t[I][e];
                })(r);
                if (s) {
                  var f = function() {
                    var e,
                      n = ((e = s.manager),
                      t.animate ? { time: e.props.time } : void 0);
                    return s.manager.destroy(), n;
                  };
                  o = s.load.then(f).catch(f);
                }
              }
              return o.then(function(n) {
                var i,
                  o,
                  s,
                  f,
                  u = new P();
                return (
                  e
                    ? ((t = Object.assign({}, t, n)),
                      u.setup(t),
                      u.mount(),
                      (i = u.loadAndRun(e)))
                    : (i = Promise.resolve(u)),
                  a &&
                    ((o = r),
                    (s = { load: i, manager: u }),
                    (f = l()) && ((f[I] = f[I] || {}), (f[I][o] = s))),
                  i
                );
              });
            }
            return (L.canvasSketch = L), (L.PaperSizes = j), L;
          });
        }.call(
          this,
          "undefined" != typeof global
            ? global
            : "undefined" != typeof self
            ? self
            : "undefined" != typeof window
            ? window
            : {}
        ));
      },
      { "convert-length": 6 }
    ],
    4: [
      function(e, t, n) {
        function i(e) {
          var t,
            n,
            r = e[0] / 255,
            i = e[1] / 255,
            a = e[2] / 255,
            o = Math.min(r, i, a),
            s = Math.max(r, i, a),
            f = s - o;
          return (
            s == o
              ? (t = 0)
              : r == s
              ? (t = (i - a) / f)
              : i == s
              ? (t = 2 + (a - r) / f)
              : a == s && (t = 4 + (r - i) / f),
            (t = Math.min(60 * t, 360)) < 0 && (t += 360),
            (n = (o + s) / 2),
            [
              t,
              100 * (s == o ? 0 : n <= 0.5 ? f / (s + o) : f / (2 - s - o)),
              100 * n
            ]
          );
        }
        function a(e) {
          var t,
            n,
            r = e[0],
            i = e[1],
            a = e[2],
            o = Math.min(r, i, a),
            s = Math.max(r, i, a),
            f = s - o;
          return (
            (n = 0 == s ? 0 : ((f / s) * 1e3) / 10),
            s == o
              ? (t = 0)
              : r == s
              ? (t = (i - a) / f)
              : i == s
              ? (t = 2 + (a - r) / f)
              : a == s && (t = 4 + (r - i) / f),
            (t = Math.min(60 * t, 360)) < 0 && (t += 360),
            [t, n, ((s / 255) * 1e3) / 10]
          );
        }
        function o(e) {
          var t = e[0],
            n = e[1],
            r = e[2];
          return [
            i(e)[0],
            100 * ((1 / 255) * Math.min(t, Math.min(n, r))),
            100 * (r = 1 - (1 / 255) * Math.max(t, Math.max(n, r)))
          ];
        }
        function s(e) {
          var t,
            n = e[0] / 255,
            r = e[1] / 255,
            i = e[2] / 255;
          return [
            100 *
              ((1 - n - (t = Math.min(1 - n, 1 - r, 1 - i))) / (1 - t) || 0),
            100 * ((1 - r - t) / (1 - t) || 0),
            100 * ((1 - i - t) / (1 - t) || 0),
            100 * t
          ];
        }
        function f(e) {
          return T[JSON.stringify(e)];
        }
        function u(e) {
          var t = e[0] / 255,
            n = e[1] / 255,
            r = e[2] / 255;
          return [
            100 *
              (0.4124 *
                (t =
                  t > 0.04045
                    ? Math.pow((t + 0.055) / 1.055, 2.4)
                    : t / 12.92) +
                0.3576 *
                  (n =
                    n > 0.04045
                      ? Math.pow((n + 0.055) / 1.055, 2.4)
                      : n / 12.92) +
                0.1805 *
                  (r =
                    r > 0.04045
                      ? Math.pow((r + 0.055) / 1.055, 2.4)
                      : r / 12.92)),
            100 * (0.2126 * t + 0.7152 * n + 0.0722 * r),
            100 * (0.0193 * t + 0.1192 * n + 0.9505 * r)
          ];
        }
        function c(e) {
          var t = u(e),
            n = t[0],
            r = t[1],
            i = t[2];
          return (
            (r /= 100),
            (i /= 108.883),
            (n =
              (n /= 95.047) > 0.008856
                ? Math.pow(n, 1 / 3)
                : 7.787 * n + 16 / 116),
            [
              116 *
                (r = r > 0.008856 ? Math.pow(r, 1 / 3) : 7.787 * r + 16 / 116) -
                16,
              500 * (n - r),
              200 *
                (r -
                  (i =
                    i > 0.008856 ? Math.pow(i, 1 / 3) : 7.787 * i + 16 / 116))
            ]
          );
        }
        function l(e) {
          var t,
            n,
            r,
            i,
            a,
            o = e[0] / 360,
            s = e[1] / 100,
            f = e[2] / 100;
          if (0 == s) return [(a = 255 * f), a, a];
          (t = 2 * f - (n = f < 0.5 ? f * (1 + s) : f + s - f * s)),
            (i = [0, 0, 0]);
          for (var u = 0; u < 3; u++)
            (r = o + (1 / 3) * -(u - 1)) < 0 && r++,
              r > 1 && r--,
              (i[u] =
                255 *
                (a =
                  6 * r < 1
                    ? t + 6 * (n - t) * r
                    : 2 * r < 1
                    ? n
                    : 3 * r < 2
                    ? t + (n - t) * (2 / 3 - r) * 6
                    : t));
          return i;
        }
        function p(e) {
          var t = e[0] / 60,
            n = e[1] / 100,
            r = e[2] / 100,
            i = Math.floor(t) % 6,
            a = t - Math.floor(t),
            o = 255 * r * (1 - n),
            s = 255 * r * (1 - n * a),
            f = 255 * r * (1 - n * (1 - a));
          r *= 255;
          switch (i) {
            case 0:
              return [r, f, o];
            case 1:
              return [s, r, o];
            case 2:
              return [o, r, f];
            case 3:
              return [o, s, r];
            case 4:
              return [f, o, r];
            case 5:
              return [r, o, s];
          }
        }
        function h(e) {
          var t,
            n,
            i,
            a,
            o = e[0] / 360,
            s = e[1] / 100,
            f = e[2] / 100,
            u = s + f;
          switch (
            (u > 1 && ((s /= u), (f /= u)),
            (i = 6 * o - (t = Math.floor(6 * o))),
            0 != (1 & t) && (i = 1 - i),
            (a = s + i * ((n = 1 - f) - s)),
            t)
          ) {
            default:
            case 6:
            case 0:
              (r = n), (g = a), (b = s);
              break;
            case 1:
              (r = a), (g = n), (b = s);
              break;
            case 2:
              (r = s), (g = n), (b = a);
              break;
            case 3:
              (r = s), (g = a), (b = n);
              break;
            case 4:
              (r = a), (g = s), (b = n);
              break;
            case 5:
              (r = n), (g = s), (b = a);
          }
          return [255 * r, 255 * g, 255 * b];
        }
        function d(e) {
          var t = e[1] / 100,
            n = e[2] / 100,
            r = e[3] / 100;
          return [
            255 * (1 - Math.min(1, (e[0] / 100) * (1 - r) + r)),
            255 * (1 - Math.min(1, t * (1 - r) + r)),
            255 * (1 - Math.min(1, n * (1 - r) + r))
          ];
        }
        function m(e) {
          var t,
            n,
            r,
            i = e[0] / 100,
            a = e[1] / 100,
            o = e[2] / 100;
          return (
            (n = -0.9689 * i + 1.8758 * a + 0.0415 * o),
            (r = 0.0557 * i + -0.204 * a + 1.057 * o),
            (t =
              (t = 3.2406 * i + -1.5372 * a + -0.4986 * o) > 0.0031308
                ? 1.055 * Math.pow(t, 1 / 2.4) - 0.055
                : (t *= 12.92)),
            (n =
              n > 0.0031308
                ? 1.055 * Math.pow(n, 1 / 2.4) - 0.055
                : (n *= 12.92)),
            (r =
              r > 0.0031308
                ? 1.055 * Math.pow(r, 1 / 2.4) - 0.055
                : (r *= 12.92)),
            [
              255 * (t = Math.min(Math.max(0, t), 1)),
              255 * (n = Math.min(Math.max(0, n), 1)),
              255 * (r = Math.min(Math.max(0, r), 1))
            ]
          );
        }
        function y(e) {
          var t = e[0],
            n = e[1],
            r = e[2];
          return (
            (n /= 100),
            (r /= 108.883),
            (t =
              (t /= 95.047) > 0.008856
                ? Math.pow(t, 1 / 3)
                : 7.787 * t + 16 / 116),
            [
              116 *
                (n = n > 0.008856 ? Math.pow(n, 1 / 3) : 7.787 * n + 16 / 116) -
                16,
              500 * (t - n),
              200 *
                (n -
                  (r =
                    r > 0.008856 ? Math.pow(r, 1 / 3) : 7.787 * r + 16 / 116))
            ]
          );
        }
        function v(e) {
          var t,
            n,
            r,
            i,
            a = e[0],
            o = e[1],
            s = e[2];
          return (
            a <= 8
              ? (i = ((n = (100 * a) / 903.3) / 100) * 7.787 + 16 / 116)
              : ((n = 100 * Math.pow((a + 16) / 116, 3)),
                (i = Math.pow(n / 100, 1 / 3))),
            [
              (t =
                t / 95.047 <= 0.008856
                  ? (t = (95.047 * (o / 500 + i - 16 / 116)) / 7.787)
                  : 95.047 * Math.pow(o / 500 + i, 3)),
              n,
              (r =
                r / 108.883 <= 0.008859
                  ? (r = (108.883 * (i - s / 200 - 16 / 116)) / 7.787)
                  : 108.883 * Math.pow(i - s / 200, 3))
            ]
          );
        }
        function x(e) {
          var t,
            n = e[0],
            r = e[1],
            i = e[2];
          return (
            (t = (360 * Math.atan2(i, r)) / 2 / Math.PI) < 0 && (t += 360),
            [n, Math.sqrt(r * r + i * i), t]
          );
        }
        function w(e) {
          return m(v(e));
        }
        function k(e) {
          var t,
            n = e[1];
          return (
            (t = (e[2] / 360) * 2 * Math.PI),
            [e[0], n * Math.cos(t), n * Math.sin(t)]
          );
        }
        function _(e) {
          return A[e];
        }
        t.exports = {
          rgb2hsl: i,
          rgb2hsv: a,
          rgb2hwb: o,
          rgb2cmyk: s,
          rgb2keyword: f,
          rgb2xyz: u,
          rgb2lab: c,
          rgb2lch: function(e) {
            return x(c(e));
          },
          hsl2rgb: l,
          hsl2hsv: function(e) {
            var t = e[0],
              n = e[1] / 100,
              r = e[2] / 100;
            if (0 === r) return [0, 0, 0];
            return [
              t,
              100 * ((2 * (n *= (r *= 2) <= 1 ? r : 2 - r)) / (r + n)),
              100 * ((r + n) / 2)
            ];
          },
          hsl2hwb: function(e) {
            return o(l(e));
          },
          hsl2cmyk: function(e) {
            return s(l(e));
          },
          hsl2keyword: function(e) {
            return f(l(e));
          },
          hsv2rgb: p,
          hsv2hsl: function(e) {
            var t,
              n,
              r = e[1] / 100,
              i = e[2] / 100;
            return (
              (t = r * i),
              [
                e[0],
                100 * (t = (t /= (n = (2 - r) * i) <= 1 ? n : 2 - n) || 0),
                100 * (n /= 2)
              ]
            );
          },
          hsv2hwb: function(e) {
            return o(p(e));
          },
          hsv2cmyk: function(e) {
            return s(p(e));
          },
          hsv2keyword: function(e) {
            return f(p(e));
          },
          hwb2rgb: h,
          hwb2hsl: function(e) {
            return i(h(e));
          },
          hwb2hsv: function(e) {
            return a(h(e));
          },
          hwb2cmyk: function(e) {
            return s(h(e));
          },
          hwb2keyword: function(e) {
            return f(h(e));
          },
          cmyk2rgb: d,
          cmyk2hsl: function(e) {
            return i(d(e));
          },
          cmyk2hsv: function(e) {
            return a(d(e));
          },
          cmyk2hwb: function(e) {
            return o(d(e));
          },
          cmyk2keyword: function(e) {
            return f(d(e));
          },
          keyword2rgb: _,
          keyword2hsl: function(e) {
            return i(_(e));
          },
          keyword2hsv: function(e) {
            return a(_(e));
          },
          keyword2hwb: function(e) {
            return o(_(e));
          },
          keyword2cmyk: function(e) {
            return s(_(e));
          },
          keyword2lab: function(e) {
            return c(_(e));
          },
          keyword2xyz: function(e) {
            return u(_(e));
          },
          xyz2rgb: m,
          xyz2lab: y,
          xyz2lch: function(e) {
            return x(y(e));
          },
          lab2xyz: v,
          lab2rgb: w,
          lab2lch: x,
          lch2lab: k,
          lch2xyz: function(e) {
            return v(k(e));
          },
          lch2rgb: function(e) {
            return w(k(e));
          }
        };
        var A = {
            aliceblue: [240, 248, 255],
            antiquewhite: [250, 235, 215],
            aqua: [0, 255, 255],
            aquamarine: [127, 255, 212],
            azure: [240, 255, 255],
            beige: [245, 245, 220],
            bisque: [255, 228, 196],
            black: [0, 0, 0],
            blanchedalmond: [255, 235, 205],
            blue: [0, 0, 255],
            blueviolet: [138, 43, 226],
            brown: [165, 42, 42],
            burlywood: [222, 184, 135],
            cadetblue: [95, 158, 160],
            chartreuse: [127, 255, 0],
            chocolate: [210, 105, 30],
            coral: [255, 127, 80],
            cornflowerblue: [100, 149, 237],
            cornsilk: [255, 248, 220],
            crimson: [220, 20, 60],
            cyan: [0, 255, 255],
            darkblue: [0, 0, 139],
            darkcyan: [0, 139, 139],
            darkgoldenrod: [184, 134, 11],
            darkgray: [169, 169, 169],
            darkgreen: [0, 100, 0],
            darkgrey: [169, 169, 169],
            darkkhaki: [189, 183, 107],
            darkmagenta: [139, 0, 139],
            darkolivegreen: [85, 107, 47],
            darkorange: [255, 140, 0],
            darkorchid: [153, 50, 204],
            darkred: [139, 0, 0],
            darksalmon: [233, 150, 122],
            darkseagreen: [143, 188, 143],
            darkslateblue: [72, 61, 139],
            darkslategray: [47, 79, 79],
            darkslategrey: [47, 79, 79],
            darkturquoise: [0, 206, 209],
            darkviolet: [148, 0, 211],
            deeppink: [255, 20, 147],
            deepskyblue: [0, 191, 255],
            dimgray: [105, 105, 105],
            dimgrey: [105, 105, 105],
            dodgerblue: [30, 144, 255],
            firebrick: [178, 34, 34],
            floralwhite: [255, 250, 240],
            forestgreen: [34, 139, 34],
            fuchsia: [255, 0, 255],
            gainsboro: [220, 220, 220],
            ghostwhite: [248, 248, 255],
            gold: [255, 215, 0],
            goldenrod: [218, 165, 32],
            gray: [128, 128, 128],
            green: [0, 128, 0],
            greenyellow: [173, 255, 47],
            grey: [128, 128, 128],
            honeydew: [240, 255, 240],
            hotpink: [255, 105, 180],
            indianred: [205, 92, 92],
            indigo: [75, 0, 130],
            ivory: [255, 255, 240],
            khaki: [240, 230, 140],
            lavender: [230, 230, 250],
            lavenderblush: [255, 240, 245],
            lawngreen: [124, 252, 0],
            lemonchiffon: [255, 250, 205],
            lightblue: [173, 216, 230],
            lightcoral: [240, 128, 128],
            lightcyan: [224, 255, 255],
            lightgoldenrodyellow: [250, 250, 210],
            lightgray: [211, 211, 211],
            lightgreen: [144, 238, 144],
            lightgrey: [211, 211, 211],
            lightpink: [255, 182, 193],
            lightsalmon: [255, 160, 122],
            lightseagreen: [32, 178, 170],
            lightskyblue: [135, 206, 250],
            lightslategray: [119, 136, 153],
            lightslategrey: [119, 136, 153],
            lightsteelblue: [176, 196, 222],
            lightyellow: [255, 255, 224],
            lime: [0, 255, 0],
            limegreen: [50, 205, 50],
            linen: [250, 240, 230],
            magenta: [255, 0, 255],
            maroon: [128, 0, 0],
            mediumaquamarine: [102, 205, 170],
            mediumblue: [0, 0, 205],
            mediumorchid: [186, 85, 211],
            mediumpurple: [147, 112, 219],
            mediumseagreen: [60, 179, 113],
            mediumslateblue: [123, 104, 238],
            mediumspringgreen: [0, 250, 154],
            mediumturquoise: [72, 209, 204],
            mediumvioletred: [199, 21, 133],
            midnightblue: [25, 25, 112],
            mintcream: [245, 255, 250],
            mistyrose: [255, 228, 225],
            moccasin: [255, 228, 181],
            navajowhite: [255, 222, 173],
            navy: [0, 0, 128],
            oldlace: [253, 245, 230],
            olive: [128, 128, 0],
            olivedrab: [107, 142, 35],
            orange: [255, 165, 0],
            orangered: [255, 69, 0],
            orchid: [218, 112, 214],
            palegoldenrod: [238, 232, 170],
            palegreen: [152, 251, 152],
            paleturquoise: [175, 238, 238],
            palevioletred: [219, 112, 147],
            papayawhip: [255, 239, 213],
            peachpuff: [255, 218, 185],
            peru: [205, 133, 63],
            pink: [255, 192, 203],
            plum: [221, 160, 221],
            powderblue: [176, 224, 230],
            purple: [128, 0, 128],
            rebeccapurple: [102, 51, 153],
            red: [255, 0, 0],
            rosybrown: [188, 143, 143],
            royalblue: [65, 105, 225],
            saddlebrown: [139, 69, 19],
            salmon: [250, 128, 114],
            sandybrown: [244, 164, 96],
            seagreen: [46, 139, 87],
            seashell: [255, 245, 238],
            sienna: [160, 82, 45],
            silver: [192, 192, 192],
            skyblue: [135, 206, 235],
            slateblue: [106, 90, 205],
            slategray: [112, 128, 144],
            slategrey: [112, 128, 144],
            snow: [255, 250, 250],
            springgreen: [0, 255, 127],
            steelblue: [70, 130, 180],
            tan: [210, 180, 140],
            teal: [0, 128, 128],
            thistle: [216, 191, 216],
            tomato: [255, 99, 71],
            turquoise: [64, 224, 208],
            violet: [238, 130, 238],
            wheat: [245, 222, 179],
            white: [255, 255, 255],
            whitesmoke: [245, 245, 245],
            yellow: [255, 255, 0],
            yellowgreen: [154, 205, 50]
          },
          T = {};
        for (var E in A) T[JSON.stringify(A[E])] = E;
      },
      {}
    ],
    5: [
      function(e, t, n) {
        var r = e("./conversions"),
          i = function() {
            return new u();
          };
        for (var a in r) {
          i[a + "Raw"] = (function(e) {
            return function(t) {
              return (
                "number" == typeof t &&
                  (t = Array.prototype.slice.call(arguments)),
                r[e](t)
              );
            };
          })(a);
          var o = /(\w+)2(\w+)/.exec(a),
            s = o[1],
            f = o[2];
          (i[s] = i[s] || {})[f] = i[a] = (function(e) {
            return function(t) {
              "number" == typeof t &&
                (t = Array.prototype.slice.call(arguments));
              var n = r[e](t);
              if ("string" == typeof n || void 0 === n) return n;
              for (var i = 0; i < n.length; i++) n[i] = Math.round(n[i]);
              return n;
            };
          })(a);
        }
        var u = function() {
          this.convs = {};
        };
        (u.prototype.routeSpace = function(e, t) {
          var n = t[0];
          return void 0 === n
            ? this.getValues(e)
            : ("number" == typeof n && (n = Array.prototype.slice.call(t)),
              this.setValues(e, n));
        }),
          (u.prototype.setValues = function(e, t) {
            return (
              (this.space = e), (this.convs = {}), (this.convs[e] = t), this
            );
          }),
          (u.prototype.getValues = function(e) {
            var t = this.convs[e];
            if (!t) {
              var n = this.space;
              (t = i[n][e](this.convs[n])), (this.convs[e] = t);
            }
            return t;
          }),
          ["rgb", "hsl", "hsv", "cmyk", "keyword"].forEach(function(e) {
            u.prototype[e] = function(t) {
              return this.routeSpace(e, arguments);
            };
          }),
          (t.exports = i);
      },
      { "./conversions": 4 }
    ],
    6: [
      function(e, t, n) {
        var r = e("defined"),
          i = ["mm", "cm", "m", "pc", "pt", "in", "ft", "px"],
          a = {
            m: { system: "metric", factor: 1 },
            cm: { system: "metric", factor: 0.01 },
            mm: { system: "metric", factor: 0.001 },
            pt: { system: "imperial", factor: 1 / 72 },
            pc: { system: "imperial", factor: 1 / 6 },
            in: { system: "imperial", factor: 1 },
            ft: { system: "imperial", factor: 12 }
          };
        const o = {
          metric: { unit: "m", ratio: 1 / 0.0254 },
          imperial: { unit: "in", ratio: 0.0254 }
        };
        (t.exports = function(e, t, n, s) {
          if ("number" != typeof e || !isFinite(e))
            throw new Error("Value must be a finite number");
          if (!t || !n) throw new Error("Must specify from and to units");
          var f = r((s = s || {}).pixelsPerInch, 96),
            u = s.precision,
            c = !1 !== s.roundPixel;
          if (
            ((t = t.toLowerCase()), (n = n.toLowerCase()), -1 === i.indexOf(t))
          )
            throw new Error(
              'Invalid from unit "' + t + '", must be one of: ' + i.join(", ")
            );
          if (-1 === i.indexOf(n))
            throw new Error(
              'Invalid from unit "' + n + '", must be one of: ' + i.join(", ")
            );
          if (t === n) return e;
          var l = 1,
            p = 1,
            h = !1;
          "px" === t && ((p = 1 / f), (t = "in")),
            "px" === n && ((h = !0), (l = f), (n = "in"));
          var d = a[t],
            m = a[n],
            g = e * d.factor * p;
          d.system !== m.system && (g *= o[d.system].ratio);
          var y = (g / m.factor) * l;
          return (
            h && c
              ? (y = Math.round(y))
              : "number" == typeof u &&
                isFinite(u) &&
                (y = (function(e, t) {
                  return Number(Math.round(e + "e" + t) + "e-" + t);
                })(y, u)),
            y
          );
        }),
          (t.exports.units = i);
      },
      { defined: 7 }
    ],
    7: [
      function(e, t, n) {
        t.exports = function() {
          for (var e = 0; e < arguments.length; e++)
            if (void 0 !== arguments[e]) return arguments[e];
        };
      },
      {}
    ],
    8: [
      function(e, t, n) {
        var r = e("color-convert");
        t.exports = function(e) {
          var t, n, i, a;
          if ((t = /^((?:rgb|hs[lv]|cmyk|xyz|lab)a?)\s*\(([^\)]*)\)/.exec(e))) {
            var o = t[1],
              s = "cmyk" === (f = o.replace(/a$/, "")) ? 4 : 3;
            (n = r[f]),
              (i = t[2]
                .replace(/^\s+|\s+$/g, "")
                .split(/\s*,\s*/)
                .map(function(e, t) {
                  return /%$/.test(e) && t === s
                    ? parseFloat(e) / 100
                    : (/%$/.test(e), parseFloat(e));
                })),
              o === f && i.push(1),
              (a = void 0 === i[s] ? 1 : i[s]),
              (i = i.slice(0, s)),
              (n[f] = function() {
                return i;
              });
          } else if (/^#[A-Fa-f0-9]+$/.test(e)) {
            var f = e.replace(/^#/, "");
            (n = r.rgb),
              (i = (i = f.split(3 === (s = f.length) ? /(.)/ : /(..)/))
                .filter(Boolean)
                .map(function(e) {
                  return 3 === s ? parseInt(e + e, 16) : parseInt(e, 16);
                })),
              (a = 1),
              (n.rgb = function() {
                return i;
              }),
              i[0] || (i[0] = 0),
              i[1] || (i[1] = 0),
              i[2] || (i[2] = 0);
          } else
            ((n = r.keyword).keyword = function() {
              return e;
            }),
              (i = e),
              (a = 1);
          var u = {
            rgb: void 0,
            hsl: void 0,
            hsv: void 0,
            cmyk: void 0,
            keyword: void 0,
            hex: void 0
          };
          try {
            u.rgb = n.rgb(i);
          } catch (e) {}
          try {
            u.hsl = n.hsl(i);
          } catch (e) {}
          try {
            u.hsv = n.hsv(i);
          } catch (e) {}
          try {
            u.cmyk = n.cmyk(i);
          } catch (e) {}
          try {
            u.keyword = n.keyword(i);
          } catch (e) {}
          return (
            u.rgb &&
              (u.hex =
                "#" +
                u.rgb
                  .map(function(e) {
                    var t = e.toString(16);
                    return 1 === t.length ? "0" + t : t;
                  })
                  .join("")),
            u.rgb && (u.rgba = u.rgb.concat(a)),
            u.hsl && (u.hsla = u.hsl.concat(a)),
            u.hsv && (u.hsva = u.hsv.concat(a)),
            u.cmyk && (u.cmyka = u.cmyk.concat(a)),
            u
          );
        };
      },
      { "color-convert": 5 }
    ],
    9: [
      function(e, t, n) {
        t.exports = function(e) {
          (e = void 0 !== e ? e : 1), Array.isArray(e) || (e = [e, e]);
          var t = [
              [-e[0], -e[1], 0],
              [e[0], -e[1], 0],
              [e[0], e[1], 0],
              [-e[0], e[1], 0]
            ],
            n = [0, 0, -1],
            r = [n.slice(), n.slice(), n.slice(), n.slice()];
          return {
            positions: t,
            cells: [[0, 1, 2], [2, 3, 0]],
            uvs: [[0, 0], [1, 0], [1, 1], [0, 1]],
            normals: r
          };
        };
      },
      {}
    ],
    10: [
      function(e, t, n) {
        var r, i;
        (r = this),
          (i = function() {
            function e(e, t) {
              (this.id = N++), (this.type = e), (this.data = t);
            }
            function t(e) {
              return (
                "[" +
                (function e(t) {
                  if (0 === t.length) return [];
                  var n = t.charAt(0),
                    r = t.charAt(t.length - 1);
                  if (1 < t.length && n === r && ('"' === n || "'" === n))
                    return [
                      '"' +
                        t
                          .substr(1, t.length - 2)
                          .replace(/\\/g, "\\\\")
                          .replace(/"/g, '\\"') +
                        '"'
                    ];
                  if ((n = /\[(false|true|null|\d+|'[^']*'|"[^"]*")\]/.exec(t)))
                    return e(t.substr(0, n.index))
                      .concat(e(n[1]))
                      .concat(e(t.substr(n.index + n[0].length)));
                  if (1 === (n = t.split(".")).length)
                    return [
                      '"' + t.replace(/\\/g, "\\\\").replace(/"/g, '\\"') + '"'
                    ];
                  for (t = [], r = 0; r < n.length; ++r) t = t.concat(e(n[r]));
                  return t;
                })(e).join("][") +
                "]"
              );
            }
            function n(e) {
              return "string" == typeof e ? e.split() : e;
            }
            function r(e) {
              return "string" == typeof e ? document.querySelector(e) : e;
            }
            function i(e) {
              var t,
                i,
                a,
                o,
                s = e || {};
              e = {};
              var f = [],
                u = [],
                c = "undefined" == typeof window ? 1 : window.devicePixelRatio,
                l = !1,
                p = function(e) {},
                h = function() {};
              if (
                ("string" == typeof s
                  ? (t = document.querySelector(s))
                  : "object" == typeof s &&
                    ("string" == typeof s.nodeName &&
                    "function" == typeof s.appendChild &&
                    "function" == typeof s.getBoundingClientRect
                      ? (t = s)
                      : "function" == typeof s.drawArrays ||
                        "function" == typeof s.drawElements
                      ? (a = (o = s).canvas)
                      : ("gl" in s
                          ? (o = s.gl)
                          : "canvas" in s
                          ? (a = r(s.canvas))
                          : "container" in s && (i = r(s.container)),
                        "attributes" in s && (e = s.attributes),
                        "extensions" in s && (f = n(s.extensions)),
                        "optionalExtensions" in s &&
                          (u = n(s.optionalExtensions)),
                        "onDone" in s && (p = s.onDone),
                        "profile" in s && (l = !!s.profile),
                        "pixelRatio" in s && (c = +s.pixelRatio))),
                t &&
                  ("canvas" === t.nodeName.toLowerCase() ? (a = t) : (i = t)),
                !o)
              ) {
                if (!a) {
                  if (
                    !(t = (function(e, t, n) {
                      function r() {
                        var t = window.innerWidth,
                          r = window.innerHeight;
                        e !== document.body &&
                          ((t = (r = e.getBoundingClientRect()).right - r.left),
                          (r = r.bottom - r.top)),
                          (i.width = n * t),
                          (i.height = n * r),
                          H(i.style, { width: t + "px", height: r + "px" });
                      }
                      var i = document.createElement("canvas");
                      return (
                        H(i.style, {
                          border: 0,
                          margin: 0,
                          padding: 0,
                          top: 0,
                          left: 0
                        }),
                        e.appendChild(i),
                        e === document.body &&
                          ((i.style.position = "absolute"),
                          H(e.style, { margin: 0, padding: 0 })),
                        window.addEventListener("resize", r, !1),
                        r(),
                        {
                          canvas: i,
                          onDestroy: function() {
                            window.removeEventListener("resize", r),
                              e.removeChild(i);
                          }
                        }
                      );
                    })(i || document.body, 0, c))
                  )
                    return null;
                  (a = t.canvas), (h = t.onDestroy);
                }
                o = (function(e, t) {
                  function n(n) {
                    try {
                      return e.getContext(n, t);
                    } catch (e) {
                      return null;
                    }
                  }
                  return (
                    n("webgl") ||
                    n("experimental-webgl") ||
                    n("webgl-experimental")
                  );
                })(a, e);
              }
              return o
                ? {
                    gl: o,
                    canvas: a,
                    container: i,
                    extensions: f,
                    optionalExtensions: u,
                    pixelRatio: c,
                    profile: l,
                    onDone: p,
                    onDestroy: h
                  }
                : (h(),
                  p(
                    "webgl not supported, try upgrading your browser or graphics drivers http://get.webgl.org"
                  ),
                  null);
            }
            function a(e, t) {
              for (var n = Array(e), r = 0; r < e; ++r) n[r] = t(r);
              return n;
            }
            function o(e) {
              var t, n;
              return (
                (t = (65535 < e) << 4),
                (t |= n = (255 < (e >>>= t)) << 3),
                (t |= n = (15 < (e >>>= n)) << 2) |
                  (n = (3 < (e >>>= n)) << 1) |
                  ((e >>> n) >> 1)
              );
            }
            function s() {
              function e(e) {
                e: {
                  for (var t = 16; 268435456 >= t; t *= 16)
                    if (e <= t) {
                      e = t;
                      break e;
                    }
                  e = 0;
                }
                return 0 < (t = n[o(e) >> 2]).length
                  ? t.pop()
                  : new ArrayBuffer(e);
              }
              function t(e) {
                n[o(e.byteLength) >> 2].push(e);
              }
              var n = a(8, function() {
                return [];
              });
              return {
                alloc: e,
                free: t,
                allocType: function(t, n) {
                  var r = null;
                  switch (t) {
                    case 5120:
                      r = new Int8Array(e(n), 0, n);
                      break;
                    case 5121:
                      r = new Uint8Array(e(n), 0, n);
                      break;
                    case 5122:
                      r = new Int16Array(e(2 * n), 0, n);
                      break;
                    case 5123:
                      r = new Uint16Array(e(2 * n), 0, n);
                      break;
                    case 5124:
                      r = new Int32Array(e(4 * n), 0, n);
                      break;
                    case 5125:
                      r = new Uint32Array(e(4 * n), 0, n);
                      break;
                    case 5126:
                      r = new Float32Array(e(4 * n), 0, n);
                      break;
                    default:
                      return null;
                  }
                  return r.length !== n ? r.subarray(0, n) : r;
                },
                freeType: function(e) {
                  t(e.buffer);
                }
              };
            }
            function f(e) {
              return (
                !!e &&
                "object" == typeof e &&
                Array.isArray(e.shape) &&
                Array.isArray(e.stride) &&
                "number" == typeof e.offset &&
                e.shape.length === e.stride.length &&
                (Array.isArray(e.data) || V(e.data))
              );
            }
            function u(e, t, n, r, i, a) {
              for (var o = 0; o < t; ++o)
                for (var s = e[o], f = 0; f < n; ++f)
                  for (var u = s[f], c = 0; c < r; ++c) i[a++] = u[c];
            }
            function c(e) {
              return 0 | X[Object.prototype.toString.call(e)];
            }
            function l(e, t) {
              for (var n = 0; n < t.length; ++n) e[n] = t[n];
            }
            function p(e, t, n, r, i, a, o) {
              for (var s = 0, f = 0; f < n; ++f)
                for (var u = 0; u < r; ++u) e[s++] = t[i * f + a * u + o];
            }
            function h(e, t, n, r) {
              function i(t) {
                (this.id = u++),
                  (this.buffer = e.createBuffer()),
                  (this.type = t),
                  (this.usage = 35044),
                  (this.byteLength = 0),
                  (this.dimension = 1),
                  (this.dtype = 5121),
                  (this.persistentData = null),
                  n.profile && (this.stats = { size: 0 });
              }
              function a(t, n, r) {
                (t.byteLength = n.byteLength), e.bufferData(t.type, n, r);
              }
              function o(e, t, n, r, i, o) {
                if (((e.usage = n), Array.isArray(t))) {
                  if (((e.dtype = r || 5126), 0 < t.length))
                    if (Array.isArray(t[0])) {
                      i = ee(t);
                      for (var s = (r = 1); s < i.length; ++s) r *= i[s];
                      (e.dimension = r),
                        a(e, (t = Z(t, i, e.dtype)), n),
                        o ? (e.persistentData = t) : Q.freeType(t);
                    } else
                      "number" == typeof t[0]
                        ? ((e.dimension = i),
                          l((i = Q.allocType(e.dtype, t.length)), t),
                          a(e, i, n),
                          o ? (e.persistentData = i) : Q.freeType(i))
                        : V(t[0]) &&
                          ((e.dimension = t[0].length),
                          (e.dtype = r || c(t[0]) || 5126),
                          a(e, (t = Z(t, [t.length, t[0].length], e.dtype)), n),
                          o ? (e.persistentData = t) : Q.freeType(t));
                } else if (V(t))
                  (e.dtype = r || c(t)),
                    (e.dimension = i),
                    a(e, t, n),
                    o &&
                      (e.persistentData = new Uint8Array(
                        new Uint8Array(t.buffer)
                      ));
                else if (f(t)) {
                  var u = t.stride,
                    h = ((s = t.offset), 0),
                    d = 0,
                    m = 0,
                    g = 0;
                  1 === (i = t.shape).length
                    ? ((h = i[0]), (d = 1), (m = u[0]), (g = 0))
                    : 2 === i.length &&
                      ((h = i[0]), (d = i[1]), (m = u[0]), (g = u[1])),
                    (e.dtype = r || c(t.data) || 5126),
                    (e.dimension = d),
                    p((i = Q.allocType(e.dtype, h * d)), t.data, h, d, m, g, s),
                    a(e, i, n),
                    o ? (e.persistentData = i) : Q.freeType(i);
                }
              }
              function s(n) {
                t.bufferCount--;
                for (var i = 0; i < r.state.length; ++i) {
                  var a = r.state[i];
                  a.buffer === n &&
                    (e.disableVertexAttribArray(i), (a.buffer = null));
                }
                e.deleteBuffer(n.buffer), (n.buffer = null), delete h[n.id];
              }
              var u = 0,
                h = {};
              (i.prototype.bind = function() {
                e.bindBuffer(this.type, this.buffer);
              }),
                (i.prototype.destroy = function() {
                  s(this);
                });
              var d = [];
              return (
                n.profile &&
                  (t.getTotalBufferSize = function() {
                    var e = 0;
                    return (
                      Object.keys(h).forEach(function(t) {
                        e += h[t].stats.size;
                      }),
                      e
                    );
                  }),
                {
                  create: function(r, a, u, d) {
                    function m(t) {
                      var r = 35044,
                        i = null,
                        a = 0,
                        s = 0,
                        u = 1;
                      return (
                        Array.isArray(t) || V(t) || f(t)
                          ? (i = t)
                          : "number" == typeof t
                          ? (a = 0 | t)
                          : t &&
                            ("data" in t && (i = t.data),
                            "usage" in t && (r = $[t.usage]),
                            "type" in t && (s = J[t.type]),
                            "dimension" in t && (u = 0 | t.dimension),
                            "length" in t && (a = 0 | t.length)),
                        g.bind(),
                        i
                          ? o(g, i, r, s, u, d)
                          : (a && e.bufferData(g.type, a, r),
                            (g.dtype = s || 5121),
                            (g.usage = r),
                            (g.dimension = u),
                            (g.byteLength = a)),
                        n.profile &&
                          (g.stats.size = g.byteLength * te[g.dtype]),
                        m
                      );
                    }
                    t.bufferCount++;
                    var g = new i(a);
                    return (
                      (h[g.id] = g),
                      u || m(r),
                      (m._reglType = "buffer"),
                      (m._buffer = g),
                      (m.subdata = function(t, n) {
                        var r,
                          i = 0 | (n || 0);
                        if ((g.bind(), V(t))) e.bufferSubData(g.type, i, t);
                        else if (Array.isArray(t)) {
                          if (0 < t.length)
                            if ("number" == typeof t[0]) {
                              var a = Q.allocType(g.dtype, t.length);
                              l(a, t),
                                e.bufferSubData(g.type, i, a),
                                Q.freeType(a);
                            } else
                              (Array.isArray(t[0]) || V(t[0])) &&
                                ((r = ee(t)),
                                (a = Z(t, r, g.dtype)),
                                e.bufferSubData(g.type, i, a),
                                Q.freeType(a));
                        } else if (f(t)) {
                          var o = t.stride,
                            s = (a = 0),
                            u = 0,
                            h = 0;
                          1 === (r = t.shape).length
                            ? ((a = r[0]), (s = 1), (u = o[0]), (h = 0))
                            : 2 === r.length &&
                              ((a = r[0]), (s = r[1]), (u = o[0]), (h = o[1])),
                            (r = Array.isArray(t.data) ? g.dtype : c(t.data)),
                            p(
                              (r = Q.allocType(r, a * s)),
                              t.data,
                              a,
                              s,
                              u,
                              h,
                              t.offset
                            ),
                            e.bufferSubData(g.type, i, r),
                            Q.freeType(r);
                        }
                        return m;
                      }),
                      n.profile && (m.stats = g.stats),
                      (m.destroy = function() {
                        s(g);
                      }),
                      m
                    );
                  },
                  createStream: function(e, t) {
                    var n = d.pop();
                    return (
                      n || (n = new i(e)), n.bind(), o(n, t, 35040, 0, 1, !1), n
                    );
                  },
                  destroyStream: function(e) {
                    d.push(e);
                  },
                  clear: function() {
                    Y(h).forEach(s), d.forEach(s);
                  },
                  getBuffer: function(e) {
                    return e && e._buffer instanceof i ? e._buffer : null;
                  },
                  restore: function() {
                    Y(h).forEach(function(t) {
                      (t.buffer = e.createBuffer()),
                        e.bindBuffer(t.type, t.buffer),
                        e.bufferData(
                          t.type,
                          t.persistentData || t.byteLength,
                          t.usage
                        );
                    });
                  },
                  _initBuffer: o
                }
              );
            }
            function d(e, t, n, r) {
              function i(e) {
                (this.id = u++),
                  (s[this.id] = this),
                  (this.buffer = e),
                  (this.primType = 4),
                  (this.type = this.vertCount = 0);
              }
              function a(r, i, a, o, s, u, c) {
                if ((r.buffer.bind(), i)) {
                  var l = c;
                  c ||
                    (V(i) && (!f(i) || V(i.data))) ||
                    (l = t.oes_element_index_uint ? 5125 : 5123),
                    n._initBuffer(r.buffer, i, a, l, 3);
                } else
                  e.bufferData(34963, u, a),
                    (r.buffer.dtype = l || 5121),
                    (r.buffer.usage = a),
                    (r.buffer.dimension = 3),
                    (r.buffer.byteLength = u);
                if (((l = c), !c)) {
                  switch (r.buffer.dtype) {
                    case 5121:
                    case 5120:
                      l = 5121;
                      break;
                    case 5123:
                    case 5122:
                      l = 5123;
                      break;
                    case 5125:
                    case 5124:
                      l = 5125;
                  }
                  r.buffer.dtype = l;
                }
                (r.type = l),
                  0 > (i = s) &&
                    ((i = r.buffer.byteLength),
                    5123 === l ? (i >>= 1) : 5125 === l && (i >>= 2)),
                  (r.vertCount = i),
                  (i = o),
                  0 > o &&
                    ((i = 4),
                    1 === (o = r.buffer.dimension) && (i = 0),
                    2 === o && (i = 1),
                    3 === o && (i = 4)),
                  (r.primType = i);
              }
              function o(e) {
                r.elementsCount--,
                  delete s[e.id],
                  e.buffer.destroy(),
                  (e.buffer = null);
              }
              var s = {},
                u = 0,
                c = { uint8: 5121, uint16: 5123 };
              t.oes_element_index_uint && (c.uint32 = 5125),
                (i.prototype.bind = function() {
                  this.buffer.bind();
                });
              var l = [];
              return {
                create: function(e, t) {
                  function s(e) {
                    if (e)
                      if ("number" == typeof e)
                        u(e),
                          (l.primType = 4),
                          (l.vertCount = 0 | e),
                          (l.type = 5121);
                      else {
                        var t = null,
                          n = 35044,
                          r = -1,
                          i = -1,
                          o = 0,
                          p = 0;
                        Array.isArray(e) || V(e) || f(e)
                          ? (t = e)
                          : ("data" in e && (t = e.data),
                            "usage" in e && (n = $[e.usage]),
                            "primitive" in e && (r = ne[e.primitive]),
                            "count" in e && (i = 0 | e.count),
                            "type" in e && (p = c[e.type]),
                            "length" in e
                              ? (o = 0 | e.length)
                              : ((o = i),
                                5123 === p || 5122 === p
                                  ? (o *= 2)
                                  : (5125 !== p && 5124 !== p) || (o *= 4))),
                          a(l, t, n, r, i, o, p);
                      }
                    else
                      u(), (l.primType = 4), (l.vertCount = 0), (l.type = 5121);
                    return s;
                  }
                  var u = n.create(null, 34963, !0),
                    l = new i(u._buffer);
                  return (
                    r.elementsCount++,
                    s(e),
                    (s._reglType = "elements"),
                    (s._elements = l),
                    (s.subdata = function(e, t) {
                      return u.subdata(e, t), s;
                    }),
                    (s.destroy = function() {
                      o(l);
                    }),
                    s
                  );
                },
                createStream: function(e) {
                  var t = l.pop();
                  return (
                    t || (t = new i(n.create(null, 34963, !0, !1)._buffer)),
                    a(t, e, 35040, -1, -1, 0, 0),
                    t
                  );
                },
                destroyStream: function(e) {
                  l.push(e);
                },
                getElements: function(e) {
                  return "function" == typeof e && e._elements instanceof i
                    ? e._elements
                    : null;
                },
                clear: function() {
                  Y(s).forEach(o);
                }
              };
            }
            function m(e) {
              for (
                var t = Q.allocType(5123, e.length), n = 0;
                n < e.length;
                ++n
              )
                if (isNaN(e[n])) t[n] = 65535;
                else if (Infinity === e[n]) t[n] = 31744;
                else if (-Infinity === e[n]) t[n] = 64512;
                else {
                  re[0] = e[n];
                  var r = ((a = ie[0]) >>> 31) << 15,
                    i = ((a << 1) >>> 24) - 127,
                    a = (a >> 13) & 1023;
                  t[n] =
                    -24 > i
                      ? r
                      : -14 > i
                      ? r + ((a + 1024) >> (-14 - i))
                      : 15 < i
                      ? r + 31744
                      : r + ((i + 15) << 10) + a;
                }
              return t;
            }
            function g(e) {
              return Array.isArray(e) || V(e);
            }
            function y(e) {
              return "[object " + e + "]";
            }
            function v(e) {
              return (
                Array.isArray(e) && (0 === e.length || "number" == typeof e[0])
              );
            }
            function b(e) {
              return !(!Array.isArray(e) || 0 === e.length || !g(e[0]));
            }
            function x(e) {
              return Object.prototype.toString.call(e);
            }
            function w(e) {
              if (!e) return !1;
              var t = x(e);
              return 0 <= he.indexOf(t) || (v(e) || b(e) || f(e));
            }
            function k(e, t) {
              36193 === e.type
                ? ((e.data = m(t)), Q.freeType(t))
                : (e.data = t);
            }
            function _(e, t, n, r, i, a) {
              if (
                ((e = void 0 !== me[e] ? me[e] : se[e] * de[t]),
                a && (e *= 6),
                i)
              ) {
                for (r = 0; 1 <= n; ) (r += e * n * n), (n /= 2);
                return r;
              }
              return e * n * r;
            }
            function A(e, t, n, r, i, a, o) {
              function s() {
                (this.format = this.internalformat = 6408),
                  (this.type = 5121),
                  (this.flipY = this.premultiplyAlpha = this.compressed = !1),
                  (this.unpackAlignment = 1),
                  (this.colorSpace = 37444),
                  (this.channels = this.height = this.width = 0);
              }
              function u(e, t) {
                (e.internalformat = t.internalformat),
                  (e.format = t.format),
                  (e.type = t.type),
                  (e.compressed = t.compressed),
                  (e.premultiplyAlpha = t.premultiplyAlpha),
                  (e.flipY = t.flipY),
                  (e.unpackAlignment = t.unpackAlignment),
                  (e.colorSpace = t.colorSpace),
                  (e.width = t.width),
                  (e.height = t.height),
                  (e.channels = t.channels);
              }
              function c(e, t) {
                if ("object" == typeof t && t) {
                  "premultiplyAlpha" in t &&
                    (e.premultiplyAlpha = t.premultiplyAlpha),
                    "flipY" in t && (e.flipY = t.flipY),
                    "alignment" in t && (e.unpackAlignment = t.alignment),
                    "colorSpace" in t && (e.colorSpace = W[t.colorSpace]),
                    "type" in t && (e.type = q[t.type]);
                  var n = e.width,
                    r = e.height,
                    i = e.channels,
                    a = !1;
                  "shape" in t
                    ? ((n = t.shape[0]),
                      (r = t.shape[1]),
                      3 === t.shape.length && ((i = t.shape[2]), (a = !0)))
                    : ("radius" in t && (n = r = t.radius),
                      "width" in t && (n = t.width),
                      "height" in t && (r = t.height),
                      "channels" in t && ((i = t.channels), (a = !0))),
                    (e.width = 0 | n),
                    (e.height = 0 | r),
                    (e.channels = 0 | i),
                    (n = !1),
                    "format" in t &&
                      ((r = e.internalformat = G[(n = t.format)]),
                      (e.format = he[r]),
                      n in q && !("type" in t) && (e.type = q[n]),
                      n in J && (e.compressed = !0),
                      (n = !0)),
                    !a && n
                      ? (e.channels = se[e.format])
                      : a &&
                        !n &&
                        e.channels !== oe[e.format] &&
                        (e.format = e.internalformat = oe[e.channels]);
                }
              }
              function l(t) {
                e.pixelStorei(37440, t.flipY),
                  e.pixelStorei(37441, t.premultiplyAlpha),
                  e.pixelStorei(37443, t.colorSpace),
                  e.pixelStorei(3317, t.unpackAlignment);
              }
              function p() {
                s.call(this),
                  (this.yOffset = this.xOffset = 0),
                  (this.data = null),
                  (this.needsFree = !1),
                  (this.element = null),
                  (this.needsCopy = !1);
              }
              function h(e, t) {
                var n = null;
                if (
                  (w(t)
                    ? (n = t)
                    : t &&
                      (c(e, t),
                      "x" in t && (e.xOffset = 0 | t.x),
                      "y" in t && (e.yOffset = 0 | t.y),
                      w(t.data) && (n = t.data)),
                  t.copy)
                ) {
                  var r = i.viewportWidth,
                    a = i.viewportHeight;
                  (e.width = e.width || r - e.xOffset),
                    (e.height = e.height || a - e.yOffset),
                    (e.needsCopy = !0);
                } else if (n) {
                  if (V(n))
                    (e.channels = e.channels || 4),
                      (e.data = n),
                      "type" in t ||
                        5121 !== e.type ||
                        (e.type = 0 | X[Object.prototype.toString.call(n)]);
                  else if (v(n)) {
                    switch (
                      ((e.channels = e.channels || 4),
                      (a = (r = n).length),
                      e.type)
                    ) {
                      case 5121:
                      case 5123:
                      case 5125:
                      case 5126:
                        (a = Q.allocType(e.type, a)).set(r), (e.data = a);
                        break;
                      case 36193:
                        e.data = m(r);
                    }
                    (e.alignment = 1), (e.needsFree = !0);
                  } else if (f(n)) {
                    (r = n.data),
                      Array.isArray(r) ||
                        5121 !== e.type ||
                        (e.type = 0 | X[Object.prototype.toString.call(r)]);
                    var o,
                      s,
                      u,
                      l,
                      p = n.stride;
                    3 === (a = n.shape).length
                      ? ((u = a[2]), (l = p[2]))
                      : (l = u = 1),
                      (o = a[0]),
                      (s = a[1]),
                      (a = p[0]),
                      (p = p[1]),
                      (e.alignment = 1),
                      (e.width = o),
                      (e.height = s),
                      (e.channels = u),
                      (e.format = e.internalformat = oe[u]),
                      (e.needsFree = !0),
                      (o = l),
                      (n = n.offset);
                    for (
                      var h = Q.allocType(
                          36193 === e.type ? 5126 : e.type,
                          (u = e.width) * (l = e.height) * (s = e.channels)
                        ),
                        d = 0,
                        y = 0;
                      y < l;
                      ++y
                    )
                      for (var _ = 0; _ < u; ++_)
                        for (var A = 0; A < s; ++A)
                          h[d++] = r[a * _ + p * y + o * A + n];
                    k(e, h);
                  } else if (x(n) === fe || x(n) === ue)
                    (e.element = x(n) === fe ? n : n.canvas),
                      (e.width = e.element.width),
                      (e.height = e.element.height),
                      (e.channels = 4);
                  else if (x(n) === ce)
                    (e.element = n),
                      (e.width = n.width),
                      (e.height = n.height),
                      (e.channels = 4);
                  else if (x(n) === le)
                    (e.element = n),
                      (e.width = n.naturalWidth),
                      (e.height = n.naturalHeight),
                      (e.channels = 4);
                  else if (x(n) === pe)
                    (e.element = n),
                      (e.width = n.videoWidth),
                      (e.height = n.videoHeight),
                      (e.channels = 4);
                  else if (b(n)) {
                    for (
                      r = e.width || n[0].length,
                        a = e.height || n.length,
                        p = e.channels,
                        p = g(n[0][0]) ? p || n[0][0].length : p || 1,
                        o = K.shape(n),
                        u = 1,
                        l = 0;
                      l < o.length;
                      ++l
                    )
                      u *= o[l];
                    (u = Q.allocType(36193 === e.type ? 5126 : e.type, u)),
                      K.flatten(n, o, "", u),
                      k(e, u),
                      (e.alignment = 1),
                      (e.width = r),
                      (e.height = a),
                      (e.channels = p),
                      (e.format = e.internalformat = oe[p]),
                      (e.needsFree = !0);
                  }
                } else
                  (e.width = e.width || 1),
                    (e.height = e.height || 1),
                    (e.channels = e.channels || 4);
              }
              function d(t, n, i, a, o) {
                var s = t.element,
                  f = t.data,
                  u = t.internalformat,
                  c = t.format,
                  p = t.type,
                  h = t.width,
                  d = t.height;
                l(t),
                  s
                    ? e.texSubImage2D(n, o, i, a, c, p, s)
                    : t.compressed
                    ? e.compressedTexSubImage2D(n, o, i, a, u, h, d, f)
                    : t.needsCopy
                    ? (r(),
                      e.copyTexSubImage2D(
                        n,
                        o,
                        i,
                        a,
                        t.xOffset,
                        t.yOffset,
                        h,
                        d
                      ))
                    : e.texSubImage2D(n, o, i, a, h, d, c, p, f);
              }
              function y() {
                return de.pop() || new p();
              }
              function A(e) {
                e.needsFree && Q.freeType(e.data), p.call(e), de.push(e);
              }
              function T() {
                s.call(this),
                  (this.genMipmaps = !1),
                  (this.mipmapHint = 4352),
                  (this.mipmask = 0),
                  (this.images = Array(16));
              }
              function E(e, t, n) {
                var r = (e.images[0] = y());
                (e.mipmask = 1),
                  (r.width = e.width = t),
                  (r.height = e.height = n),
                  (r.channels = e.channels = 4);
              }
              function D(e, t) {
                var n = null;
                if (w(t))
                  u((n = e.images[0] = y()), e), h(n, t), (e.mipmask = 1);
                else if ((c(e, t), Array.isArray(t.mipmap)))
                  for (var r = t.mipmap, i = 0; i < r.length; ++i)
                    u((n = e.images[i] = y()), e),
                      (n.width >>= i),
                      (n.height >>= i),
                      h(n, r[i]),
                      (e.mipmask |= 1 << i);
                else u((n = e.images[0] = y()), e), h(n, t), (e.mipmask = 1);
                u(e, e.images[0]);
              }
              function C(t, n) {
                for (var i = t.images, a = 0; a < i.length && i[a]; ++a) {
                  var o = i[a],
                    s = n,
                    f = a,
                    u = o.element,
                    c = o.data,
                    p = o.internalformat,
                    h = o.format,
                    d = o.type,
                    m = o.width,
                    g = o.height,
                    y = o.channels;
                  l(o),
                    u
                      ? e.texImage2D(s, f, h, h, d, u)
                      : o.compressed
                      ? e.compressedTexImage2D(s, f, p, m, g, 0, c)
                      : o.needsCopy
                      ? (r(),
                        e.copyTexImage2D(
                          s,
                          f,
                          h,
                          o.xOffset,
                          o.yOffset,
                          m,
                          g,
                          0
                        ))
                      : ((o = !c) && (c = Q.zero.allocType(d, m * g * y)),
                        e.texImage2D(s, f, h, m, g, 0, h, d, c),
                        o && c && Q.zero.freeType(c));
                }
              }
              function S() {
                var e = me.pop() || new T();
                s.call(e);
                for (var t = (e.mipmask = 0); 16 > t; ++t) e.images[t] = null;
                return e;
              }
              function j(e) {
                for (var t = e.images, n = 0; n < t.length; ++n)
                  t[n] && A(t[n]), (t[n] = null);
                me.push(e);
              }
              function M() {
                (this.magFilter = this.minFilter = 9728),
                  (this.wrapT = this.wrapS = 33071),
                  (this.anisotropic = 1),
                  (this.genMipmaps = !1),
                  (this.mipmapHint = 4352);
              }
              function F(e, t) {
                "min" in t &&
                  ((e.minFilter = U[t.min]),
                  0 <= ae.indexOf(e.minFilter) &&
                    !("faces" in t) &&
                    (e.genMipmaps = !0)),
                  "mag" in t && (e.magFilter = N[t.mag]);
                var n = e.wrapS,
                  r = e.wrapT;
                if ("wrap" in t) {
                  var i = t.wrap;
                  "string" == typeof i
                    ? (n = r = L[i])
                    : Array.isArray(i) && ((n = L[i[0]]), (r = L[i[1]]));
                } else
                  "wrapS" in t && (n = L[t.wrapS]),
                    "wrapT" in t && (r = L[t.wrapT]);
                if (
                  ((e.wrapS = n),
                  (e.wrapT = r),
                  "anisotropic" in t && (e.anisotropic = t.anisotropic),
                  "mipmap" in t)
                ) {
                  switch (((n = !1), typeof t.mipmap)) {
                    case "string":
                      (e.mipmapHint = B[t.mipmap]), (n = e.genMipmaps = !0);
                      break;
                    case "boolean":
                      n = e.genMipmaps = t.mipmap;
                      break;
                    case "object":
                      (e.genMipmaps = !1), (n = !0);
                  }
                  !n || "min" in t || (e.minFilter = 9984);
                }
              }
              function O(n, r) {
                e.texParameteri(r, 10241, n.minFilter),
                  e.texParameteri(r, 10240, n.magFilter),
                  e.texParameteri(r, 10242, n.wrapS),
                  e.texParameteri(r, 10243, n.wrapT),
                  t.ext_texture_filter_anisotropic &&
                    e.texParameteri(r, 34046, n.anisotropic),
                  n.genMipmaps &&
                    (e.hint(33170, n.mipmapHint), e.generateMipmap(r));
              }
              function z(t) {
                s.call(this),
                  (this.mipmask = 0),
                  (this.internalformat = 6408),
                  (this.id = ge++),
                  (this.refCount = 1),
                  (this.target = t),
                  (this.texture = e.createTexture()),
                  (this.unit = -1),
                  (this.bindCount = 0),
                  (this.texInfo = new M()),
                  o.profile && (this.stats = { size: 0 });
              }
              function P(t) {
                e.activeTexture(33984), e.bindTexture(t.target, t.texture);
              }
              function R() {
                var t = be[0];
                t
                  ? e.bindTexture(t.target, t.texture)
                  : e.bindTexture(3553, null);
              }
              function I(t) {
                var n = t.texture,
                  r = t.unit,
                  i = t.target;
                0 <= r &&
                  (e.activeTexture(33984 + r),
                  e.bindTexture(i, null),
                  (be[r] = null)),
                  e.deleteTexture(n),
                  (t.texture = null),
                  (t.params = null),
                  (t.pixels = null),
                  (t.refCount = 0),
                  delete ye[t.id],
                  a.textureCount--;
              }
              var B = {
                  "don't care": 4352,
                  "dont care": 4352,
                  nice: 4354,
                  fast: 4353
                },
                L = { repeat: 10497, clamp: 33071, mirror: 33648 },
                N = { nearest: 9728, linear: 9729 },
                U = H(
                  {
                    mipmap: 9987,
                    "nearest mipmap nearest": 9984,
                    "linear mipmap nearest": 9985,
                    "nearest mipmap linear": 9986,
                    "linear mipmap linear": 9987
                  },
                  N
                ),
                W = { none: 0, browser: 37444 },
                q = {
                  uint8: 5121,
                  rgba4: 32819,
                  rgb565: 33635,
                  "rgb5 a1": 32820
                },
                G = {
                  alpha: 6406,
                  luminance: 6409,
                  "luminance alpha": 6410,
                  rgb: 6407,
                  rgba: 6408,
                  rgba4: 32854,
                  "rgb5 a1": 32855,
                  rgb565: 36194
                },
                J = {};
              t.ext_srgb && ((G.srgb = 35904), (G.srgba = 35906)),
                t.oes_texture_float && (q.float32 = q.float = 5126),
                t.oes_texture_half_float &&
                  (q.float16 = q["half float"] = 36193),
                t.webgl_depth_texture &&
                  (H(G, { depth: 6402, "depth stencil": 34041 }),
                  H(q, { uint16: 5123, uint32: 5125, "depth stencil": 34042 })),
                t.webgl_compressed_texture_s3tc &&
                  H(J, {
                    "rgb s3tc dxt1": 33776,
                    "rgba s3tc dxt1": 33777,
                    "rgba s3tc dxt3": 33778,
                    "rgba s3tc dxt5": 33779
                  }),
                t.webgl_compressed_texture_atc &&
                  H(J, {
                    "rgb atc": 35986,
                    "rgba atc explicit alpha": 35987,
                    "rgba atc interpolated alpha": 34798
                  }),
                t.webgl_compressed_texture_pvrtc &&
                  H(J, {
                    "rgb pvrtc 4bppv1": 35840,
                    "rgb pvrtc 2bppv1": 35841,
                    "rgba pvrtc 4bppv1": 35842,
                    "rgba pvrtc 2bppv1": 35843
                  }),
                t.webgl_compressed_texture_etc1 && (J["rgb etc1"] = 36196);
              var $ = Array.prototype.slice.call(e.getParameter(34467));
              Object.keys(J).forEach(function(e) {
                var t = J[e];
                0 <= $.indexOf(t) && (G[e] = t);
              });
              var Z = Object.keys(G);
              n.textureFormats = Z;
              var ee = [];
              Object.keys(G).forEach(function(e) {
                ee[G[e]] = e;
              });
              var te = [];
              Object.keys(q).forEach(function(e) {
                te[q[e]] = e;
              });
              var ne = [];
              Object.keys(N).forEach(function(e) {
                ne[N[e]] = e;
              });
              var re = [];
              Object.keys(U).forEach(function(e) {
                re[U[e]] = e;
              });
              var ie = [];
              Object.keys(L).forEach(function(e) {
                ie[L[e]] = e;
              });
              var he = Z.reduce(function(e, t) {
                  var n = G[t];
                  return (
                    (e[n] =
                      6409 === n ||
                      6406 === n ||
                      6409 === n ||
                      6410 === n ||
                      6402 === n ||
                      34041 === n
                        ? n
                        : 32855 === n || 0 <= t.indexOf("rgba")
                        ? 6408
                        : 6407),
                    e
                  );
                }, {}),
                de = [],
                me = [],
                ge = 0,
                ye = {},
                ve = n.maxTextureUnits,
                be = Array(ve).map(function() {
                  return null;
                });
              return (
                H(z.prototype, {
                  bind: function() {
                    this.bindCount += 1;
                    var t = this.unit;
                    if (0 > t) {
                      for (var n = 0; n < ve; ++n) {
                        var r = be[n];
                        if (r) {
                          if (0 < r.bindCount) continue;
                          r.unit = -1;
                        }
                        (be[n] = this), (t = n);
                        break;
                      }
                      o.profile &&
                        a.maxTextureUnits < t + 1 &&
                        (a.maxTextureUnits = t + 1),
                        (this.unit = t),
                        e.activeTexture(33984 + t),
                        e.bindTexture(this.target, this.texture);
                    }
                    return t;
                  },
                  unbind: function() {
                    --this.bindCount;
                  },
                  decRef: function() {
                    0 >= --this.refCount && I(this);
                  }
                }),
                o.profile &&
                  (a.getTotalTextureSize = function() {
                    var e = 0;
                    return (
                      Object.keys(ye).forEach(function(t) {
                        e += ye[t].stats.size;
                      }),
                      e
                    );
                  }),
                {
                  create2D: function(t, n) {
                    function r(e, t) {
                      var n = i.texInfo;
                      M.call(n);
                      var a = S();
                      return (
                        "number" == typeof e
                          ? E(a, 0 | e, "number" == typeof t ? 0 | t : 0 | e)
                          : e
                          ? (F(n, e), D(a, e))
                          : E(a, 1, 1),
                        n.genMipmaps && (a.mipmask = (a.width << 1) - 1),
                        (i.mipmask = a.mipmask),
                        u(i, a),
                        (i.internalformat = a.internalformat),
                        (r.width = a.width),
                        (r.height = a.height),
                        P(i),
                        C(a, 3553),
                        O(n, 3553),
                        R(),
                        j(a),
                        o.profile &&
                          (i.stats.size = _(
                            i.internalformat,
                            i.type,
                            a.width,
                            a.height,
                            n.genMipmaps,
                            !1
                          )),
                        (r.format = ee[i.internalformat]),
                        (r.type = te[i.type]),
                        (r.mag = ne[n.magFilter]),
                        (r.min = re[n.minFilter]),
                        (r.wrapS = ie[n.wrapS]),
                        (r.wrapT = ie[n.wrapT]),
                        r
                      );
                    }
                    var i = new z(3553);
                    return (
                      (ye[i.id] = i),
                      a.textureCount++,
                      r(t, n),
                      (r.subimage = function(e, t, n, a) {
                        (t |= 0), (n |= 0), (a |= 0);
                        var o = y();
                        return (
                          u(o, i),
                          (o.width = 0),
                          (o.height = 0),
                          h(o, e),
                          (o.width = o.width || (i.width >> a) - t),
                          (o.height = o.height || (i.height >> a) - n),
                          P(i),
                          d(o, 3553, t, n, a),
                          R(),
                          A(o),
                          r
                        );
                      }),
                      (r.resize = function(t, n) {
                        var a = 0 | t,
                          s = 0 | n || a;
                        if (a === i.width && s === i.height) return r;
                        (r.width = i.width = a),
                          (r.height = i.height = s),
                          P(i);
                        for (
                          var f, u = i.channels, c = i.type, l = 0;
                          i.mipmask >> l;
                          ++l
                        ) {
                          var p = a >> l,
                            h = s >> l;
                          if (!p || !h) break;
                          (f = Q.zero.allocType(c, p * h * u)),
                            e.texImage2D(
                              3553,
                              l,
                              i.format,
                              p,
                              h,
                              0,
                              i.format,
                              i.type,
                              f
                            ),
                            f && Q.zero.freeType(f);
                        }
                        return (
                          R(),
                          o.profile &&
                            (i.stats.size = _(
                              i.internalformat,
                              i.type,
                              a,
                              s,
                              !1,
                              !1
                            )),
                          r
                        );
                      }),
                      (r._reglType = "texture2d"),
                      (r._texture = i),
                      o.profile && (r.stats = i.stats),
                      (r.destroy = function() {
                        i.decRef();
                      }),
                      r
                    );
                  },
                  createCube: function(t, n, r, i, s, f) {
                    function l(e, t, n, r, i, a) {
                      var s,
                        f = p.texInfo;
                      for (M.call(f), s = 0; 6 > s; ++s) m[s] = S();
                      if ("number" != typeof e && e) {
                        if ("object" == typeof e)
                          if (t)
                            D(m[0], e),
                              D(m[1], t),
                              D(m[2], n),
                              D(m[3], r),
                              D(m[4], i),
                              D(m[5], a);
                          else if ((F(f, e), c(p, e), "faces" in e))
                            for (e = e.faces, s = 0; 6 > s; ++s)
                              u(m[s], p), D(m[s], e[s]);
                          else for (s = 0; 6 > s; ++s) D(m[s], e);
                      } else
                        for (e = 0 | e || 1, s = 0; 6 > s; ++s) E(m[s], e, e);
                      for (
                        u(p, m[0]),
                          p.mipmask = f.genMipmaps
                            ? (m[0].width << 1) - 1
                            : m[0].mipmask,
                          p.internalformat = m[0].internalformat,
                          l.width = m[0].width,
                          l.height = m[0].height,
                          P(p),
                          s = 0;
                        6 > s;
                        ++s
                      )
                        C(m[s], 34069 + s);
                      for (
                        O(f, 34067),
                          R(),
                          o.profile &&
                            (p.stats.size = _(
                              p.internalformat,
                              p.type,
                              l.width,
                              l.height,
                              f.genMipmaps,
                              !0
                            )),
                          l.format = ee[p.internalformat],
                          l.type = te[p.type],
                          l.mag = ne[f.magFilter],
                          l.min = re[f.minFilter],
                          l.wrapS = ie[f.wrapS],
                          l.wrapT = ie[f.wrapT],
                          s = 0;
                        6 > s;
                        ++s
                      )
                        j(m[s]);
                      return l;
                    }
                    var p = new z(34067);
                    (ye[p.id] = p), a.cubeCount++;
                    var m = Array(6);
                    return (
                      l(t, n, r, i, s, f),
                      (l.subimage = function(e, t, n, r, i) {
                        (n |= 0), (r |= 0), (i |= 0);
                        var a = y();
                        return (
                          u(a, p),
                          (a.width = 0),
                          (a.height = 0),
                          h(a, t),
                          (a.width = a.width || (p.width >> i) - n),
                          (a.height = a.height || (p.height >> i) - r),
                          P(p),
                          d(a, 34069 + e, n, r, i),
                          R(),
                          A(a),
                          l
                        );
                      }),
                      (l.resize = function(t) {
                        if ((t |= 0) !== p.width) {
                          (l.width = p.width = t),
                            (l.height = p.height = t),
                            P(p);
                          for (var n = 0; 6 > n; ++n)
                            for (var r = 0; p.mipmask >> r; ++r)
                              e.texImage2D(
                                34069 + n,
                                r,
                                p.format,
                                t >> r,
                                t >> r,
                                0,
                                p.format,
                                p.type,
                                null
                              );
                          return (
                            R(),
                            o.profile &&
                              (p.stats.size = _(
                                p.internalformat,
                                p.type,
                                l.width,
                                l.height,
                                !1,
                                !0
                              )),
                            l
                          );
                        }
                      }),
                      (l._reglType = "textureCube"),
                      (l._texture = p),
                      o.profile && (l.stats = p.stats),
                      (l.destroy = function() {
                        p.decRef();
                      }),
                      l
                    );
                  },
                  clear: function() {
                    for (var t = 0; t < ve; ++t)
                      e.activeTexture(33984 + t),
                        e.bindTexture(3553, null),
                        (be[t] = null);
                    Y(ye).forEach(I), (a.cubeCount = 0), (a.textureCount = 0);
                  },
                  getTexture: function(e) {
                    return null;
                  },
                  restore: function() {
                    for (var t = 0; t < ve; ++t) {
                      var n = be[t];
                      n && ((n.bindCount = 0), (n.unit = -1), (be[t] = null));
                    }
                    Y(ye).forEach(function(t) {
                      (t.texture = e.createTexture()),
                        e.bindTexture(t.target, t.texture);
                      for (var n = 0; 32 > n; ++n)
                        if (0 != (t.mipmask & (1 << n)))
                          if (3553 === t.target)
                            e.texImage2D(
                              3553,
                              n,
                              t.internalformat,
                              t.width >> n,
                              t.height >> n,
                              0,
                              t.internalformat,
                              t.type,
                              null
                            );
                          else
                            for (var r = 0; 6 > r; ++r)
                              e.texImage2D(
                                34069 + r,
                                n,
                                t.internalformat,
                                t.width >> n,
                                t.height >> n,
                                0,
                                t.internalformat,
                                t.type,
                                null
                              );
                      O(t.texInfo, t.target);
                    });
                  }
                }
              );
            }
            function T(e, t, n, r, i, a) {
              function o(e, t, n) {
                (this.target = e), (this.texture = t), (this.renderbuffer = n);
                var r = (e = 0);
                t
                  ? ((e = t.width), (r = t.height))
                  : n && ((e = n.width), (r = n.height)),
                  (this.width = e),
                  (this.height = r);
              }
              function s(e) {
                e &&
                  (e.texture && e.texture._texture.decRef(),
                  e.renderbuffer && e.renderbuffer._renderbuffer.decRef());
              }
              function f(e, t, n) {
                e &&
                  (e.texture
                    ? (e.texture._texture.refCount += 1)
                    : (e.renderbuffer._renderbuffer.refCount += 1));
              }
              function u(t, n) {
                n &&
                  (n.texture
                    ? e.framebufferTexture2D(
                        36160,
                        t,
                        n.target,
                        n.texture._texture.texture,
                        0
                      )
                    : e.framebufferRenderbuffer(
                        36160,
                        t,
                        36161,
                        n.renderbuffer._renderbuffer.renderbuffer
                      ));
              }
              function c(e) {
                var t = 3553,
                  n = null,
                  r = null,
                  i = e;
                return (
                  "object" == typeof e &&
                    ((i = e.data), "target" in e && (t = 0 | e.target)),
                  "texture2d" === (e = i._reglType)
                    ? (n = i)
                    : "textureCube" === e
                    ? (n = i)
                    : "renderbuffer" === e && ((r = i), (t = 36161)),
                  new o(t, n, r)
                );
              }
              function l(e, t, n, a, s) {
                return n
                  ? (((e = r.create2D({
                      width: e,
                      height: t,
                      format: a,
                      type: s
                    }))._texture.refCount = 0),
                    new o(3553, e, null))
                  : (((e = i.create({
                      width: e,
                      height: t,
                      format: a
                    }))._renderbuffer.refCount = 0),
                    new o(36161, null, e));
              }
              function p(e) {
                return e && (e.texture || e.renderbuffer);
              }
              function h(e, t, n) {
                e &&
                  (e.texture
                    ? e.texture.resize(t, n)
                    : e.renderbuffer && e.renderbuffer.resize(t, n),
                  (e.width = t),
                  (e.height = n));
              }
              function d() {
                (this.id = _++),
                  (A[this.id] = this),
                  (this.framebuffer = e.createFramebuffer()),
                  (this.height = this.width = 0),
                  (this.colorAttachments = []),
                  (this.depthStencilAttachment = this.stencilAttachment = this.depthAttachment = null);
              }
              function m(e) {
                e.colorAttachments.forEach(s),
                  s(e.depthAttachment),
                  s(e.stencilAttachment),
                  s(e.depthStencilAttachment);
              }
              function g(t) {
                e.deleteFramebuffer(t.framebuffer),
                  (t.framebuffer = null),
                  a.framebufferCount--,
                  delete A[t.id];
              }
              function y(t) {
                var r;
                e.bindFramebuffer(36160, t.framebuffer);
                var i = t.colorAttachments;
                for (r = 0; r < i.length; ++r) u(36064 + r, i[r]);
                for (r = i.length; r < n.maxColorAttachments; ++r)
                  e.framebufferTexture2D(36160, 36064 + r, 3553, null, 0);
                e.framebufferTexture2D(36160, 33306, 3553, null, 0),
                  e.framebufferTexture2D(36160, 36096, 3553, null, 0),
                  e.framebufferTexture2D(36160, 36128, 3553, null, 0),
                  u(36096, t.depthAttachment),
                  u(36128, t.stencilAttachment),
                  u(33306, t.depthStencilAttachment),
                  e.checkFramebufferStatus(36160),
                  e.isContextLost(),
                  e.bindFramebuffer(36160, b.next ? b.next.framebuffer : null),
                  (b.cur = b.next),
                  e.getError();
              }
              function v(e, t) {
                function n(e, t) {
                  var i,
                    a = 0,
                    o = 0,
                    s = !0,
                    u = !0;
                  i = null;
                  var h = !0,
                    d = "rgba",
                    g = "uint8",
                    v = 1,
                    b = null,
                    k = null,
                    _ = null,
                    A = !1;
                  "number" == typeof e
                    ? ((a = 0 | e), (o = 0 | t || a))
                    : e
                    ? ("shape" in e
                        ? ((a = (o = e.shape)[0]), (o = o[1]))
                        : ("radius" in e && (a = o = e.radius),
                          "width" in e && (a = e.width),
                          "height" in e && (o = e.height)),
                      ("color" in e || "colors" in e) &&
                        ((i = e.color || e.colors), Array.isArray(i)),
                      i ||
                        ("colorCount" in e && (v = 0 | e.colorCount),
                        "colorTexture" in e &&
                          ((h = !!e.colorTexture), (d = "rgba4")),
                        "colorType" in e &&
                          ((g = e.colorType), !h) &&
                          ("half float" === g || "float16" === g
                            ? (d = "rgba16f")
                            : ("float" !== g && "float32" !== g) ||
                              (d = "rgba32f")),
                        "colorFormat" in e &&
                          (0 <= x.indexOf((d = e.colorFormat))
                            ? (h = !0)
                            : 0 <= w.indexOf(d) && (h = !1))),
                      ("depthTexture" in e || "depthStencilTexture" in e) &&
                        (A = !(!e.depthTexture && !e.depthStencilTexture)),
                      "depth" in e &&
                        ("boolean" == typeof e.depth
                          ? (s = e.depth)
                          : ((b = e.depth), (u = !1))),
                      "stencil" in e &&
                        ("boolean" == typeof e.stencil
                          ? (u = e.stencil)
                          : ((k = e.stencil), (s = !1))),
                      "depthStencil" in e &&
                        ("boolean" == typeof e.depthStencil
                          ? (s = u = e.depthStencil)
                          : ((_ = e.depthStencil), (u = s = !1))))
                    : (a = o = 1);
                  var T = null,
                    E = null,
                    D = null,
                    C = null;
                  if (Array.isArray(i)) T = i.map(c);
                  else if (i) T = [c(i)];
                  else
                    for (T = Array(v), i = 0; i < v; ++i)
                      T[i] = l(a, o, h, d, g);
                  for (
                    a = a || T[0].width,
                      o = o || T[0].height,
                      b
                        ? (E = c(b))
                        : s && !u && (E = l(a, o, A, "depth", "uint32")),
                      k
                        ? (D = c(k))
                        : u && !s && (D = l(a, o, !1, "stencil", "uint8")),
                      _
                        ? (C = c(_))
                        : !b &&
                          !k &&
                          u &&
                          s &&
                          (C = l(a, o, A, "depth stencil", "depth stencil")),
                      s = null,
                      i = 0;
                    i < T.length;
                    ++i
                  )
                    f(T[i]),
                      T[i] &&
                        T[i].texture &&
                        ((u =
                          ve[T[i].texture._texture.format] *
                          be[T[i].texture._texture.type]),
                        null === s && (s = u));
                  return (
                    f(E),
                    f(D),
                    f(C),
                    m(r),
                    (r.width = a),
                    (r.height = o),
                    (r.colorAttachments = T),
                    (r.depthAttachment = E),
                    (r.stencilAttachment = D),
                    (r.depthStencilAttachment = C),
                    (n.color = T.map(p)),
                    (n.depth = p(E)),
                    (n.stencil = p(D)),
                    (n.depthStencil = p(C)),
                    (n.width = r.width),
                    (n.height = r.height),
                    y(r),
                    n
                  );
                }
                var r = new d();
                return (
                  a.framebufferCount++,
                  n(e, t),
                  H(n, {
                    resize: function(e, t) {
                      var i = Math.max(0 | e, 1),
                        a = Math.max(0 | t || i, 1);
                      if (i === r.width && a === r.height) return n;
                      for (var o = r.colorAttachments, s = 0; s < o.length; ++s)
                        h(o[s], i, a);
                      return (
                        h(r.depthAttachment, i, a),
                        h(r.stencilAttachment, i, a),
                        h(r.depthStencilAttachment, i, a),
                        (r.width = n.width = i),
                        (r.height = n.height = a),
                        y(r),
                        n
                      );
                    },
                    _reglType: "framebuffer",
                    _framebuffer: r,
                    destroy: function() {
                      g(r), m(r);
                    },
                    use: function(e) {
                      b.setFBO({ framebuffer: n }, e);
                    }
                  })
                );
              }
              var b = { cur: null, next: null, dirty: !1, setFBO: null },
                x = ["rgba"],
                w = ["rgba4", "rgb565", "rgb5 a1"];
              t.ext_srgb && w.push("srgba"),
                t.ext_color_buffer_half_float && w.push("rgba16f", "rgb16f"),
                t.webgl_color_buffer_float && w.push("rgba32f");
              var k = ["uint8"];
              t.oes_texture_half_float && k.push("half float", "float16"),
                t.oes_texture_float && k.push("float", "float32");
              var _ = 0,
                A = {};
              return H(b, {
                getFramebuffer: function(e) {
                  return "function" == typeof e &&
                    "framebuffer" === e._reglType &&
                    (e = e._framebuffer) instanceof d
                    ? e
                    : null;
                },
                create: v,
                createCube: function(e) {
                  function t(e) {
                    var i,
                      a = { color: null },
                      o = 0,
                      s = null;
                    i = "rgba";
                    var f = "uint8",
                      u = 1;
                    if (
                      ("number" == typeof e
                        ? (o = 0 | e)
                        : e
                        ? ("shape" in e
                            ? (o = e.shape[0])
                            : ("radius" in e && (o = 0 | e.radius),
                              "width" in e
                                ? (o = 0 | e.width)
                                : "height" in e && (o = 0 | e.height)),
                          ("color" in e || "colors" in e) &&
                            ((s = e.color || e.colors), Array.isArray(s)),
                          s ||
                            ("colorCount" in e && (u = 0 | e.colorCount),
                            "colorType" in e && (f = e.colorType),
                            "colorFormat" in e && (i = e.colorFormat)),
                          "depth" in e && (a.depth = e.depth),
                          "stencil" in e && (a.stencil = e.stencil),
                          "depthStencil" in e &&
                            (a.depthStencil = e.depthStencil))
                        : (o = 1),
                      s)
                    )
                      if (Array.isArray(s))
                        for (e = [], i = 0; i < s.length; ++i) e[i] = s[i];
                      else e = [s];
                    else
                      for (
                        e = Array(u),
                          s = { radius: o, format: i, type: f },
                          i = 0;
                        i < u;
                        ++i
                      )
                        e[i] = r.createCube(s);
                    for (a.color = Array(e.length), i = 0; i < e.length; ++i)
                      (u = e[i]),
                        (o = o || u.width),
                        (a.color[i] = { target: 34069, data: e[i] });
                    for (i = 0; 6 > i; ++i) {
                      for (u = 0; u < e.length; ++u)
                        a.color[u].target = 34069 + i;
                      0 < i &&
                        ((a.depth = n[0].depth),
                        (a.stencil = n[0].stencil),
                        (a.depthStencil = n[0].depthStencil)),
                        n[i] ? n[i](a) : (n[i] = v(a));
                    }
                    return H(t, { width: o, height: o, color: e });
                  }
                  var n = Array(6);
                  return (
                    t(e),
                    H(t, {
                      faces: n,
                      resize: function(e) {
                        var r = 0 | e;
                        if (r === t.width) return t;
                        var i = t.color;
                        for (e = 0; e < i.length; ++e) i[e].resize(r);
                        for (e = 0; 6 > e; ++e) n[e].resize(r);
                        return (t.width = t.height = r), t;
                      },
                      _reglType: "framebufferCube",
                      destroy: function() {
                        n.forEach(function(e) {
                          e.destroy();
                        });
                      }
                    })
                  );
                },
                clear: function() {
                  Y(A).forEach(g);
                },
                restore: function() {
                  (b.cur = null),
                    (b.next = null),
                    (b.dirty = !0),
                    Y(A).forEach(function(t) {
                      (t.framebuffer = e.createFramebuffer()), y(t);
                    });
                }
              });
            }
            function E() {
              (this.w = this.z = this.y = this.x = this.state = 0),
                (this.buffer = null),
                (this.size = 0),
                (this.normalized = !1),
                (this.type = 5126),
                (this.divisor = this.stride = this.offset = 0);
            }
            function D(e, t, n, r) {
              function i(e, t, n, r) {
                (this.name = e),
                  (this.id = t),
                  (this.location = n),
                  (this.info = r);
              }
              function a(e, t) {
                for (var n = 0; n < e.length; ++n)
                  if (e[n].id === t.id)
                    return void (e[n].location = t.location);
                e.push(t);
              }
              function o(n, r, i) {
                if (!(o = (i = 35632 === n ? u : c)[r])) {
                  var a = t.str(r),
                    o = e.createShader(n);
                  e.shaderSource(o, a), e.compileShader(o), (i[r] = o);
                }
                return o;
              }
              function s(e, t) {
                (this.id = h++),
                  (this.fragId = e),
                  (this.vertId = t),
                  (this.program = null),
                  (this.uniforms = []),
                  (this.attributes = []),
                  r.profile &&
                    (this.stats = { uniformsCount: 0, attributesCount: 0 });
              }
              function f(n, s) {
                var f, u;
                (f = o(35632, n.fragId)), (u = o(35633, n.vertId));
                var c = (n.program = e.createProgram());
                e.attachShader(c, f), e.attachShader(c, u), e.linkProgram(c);
                var l = e.getProgramParameter(c, 35718);
                r.profile && (n.stats.uniformsCount = l);
                var p = n.uniforms;
                for (f = 0; f < l; ++f)
                  if ((u = e.getActiveUniform(c, f)))
                    if (1 < u.size)
                      for (var h = 0; h < u.size; ++h) {
                        var d = u.name.replace("[0]", "[" + h + "]");
                        a(p, new i(d, t.id(d), e.getUniformLocation(c, d), u));
                      }
                    else
                      a(
                        p,
                        new i(
                          u.name,
                          t.id(u.name),
                          e.getUniformLocation(c, u.name),
                          u
                        )
                      );
                for (
                  l = e.getProgramParameter(c, 35721),
                    r.profile && (n.stats.attributesCount = l),
                    p = n.attributes,
                    f = 0;
                  f < l;
                  ++f
                )
                  (u = e.getActiveAttrib(c, f)) &&
                    a(
                      p,
                      new i(
                        u.name,
                        t.id(u.name),
                        e.getAttribLocation(c, u.name),
                        u
                      )
                    );
              }
              var u = {},
                c = {},
                l = {},
                p = [],
                h = 0;
              return (
                r.profile &&
                  ((n.getMaxUniformsCount = function() {
                    var e = 0;
                    return (
                      p.forEach(function(t) {
                        t.stats.uniformsCount > e &&
                          (e = t.stats.uniformsCount);
                      }),
                      e
                    );
                  }),
                  (n.getMaxAttributesCount = function() {
                    var e = 0;
                    return (
                      p.forEach(function(t) {
                        t.stats.attributesCount > e &&
                          (e = t.stats.attributesCount);
                      }),
                      e
                    );
                  })),
                {
                  clear: function() {
                    var t = e.deleteShader.bind(e);
                    Y(u).forEach(t),
                      (u = {}),
                      Y(c).forEach(t),
                      (c = {}),
                      p.forEach(function(t) {
                        e.deleteProgram(t.program);
                      }),
                      (p.length = 0),
                      (l = {}),
                      (n.shaderCount = 0);
                  },
                  program: function(e, t, r) {
                    var i = l[t];
                    i || (i = l[t] = {});
                    var a = i[e];
                    return (
                      a ||
                        ((a = new s(t, e)),
                        n.shaderCount++,
                        f(a),
                        (i[e] = a),
                        p.push(a)),
                      a
                    );
                  },
                  restore: function() {
                    (u = {}), (c = {});
                    for (var e = 0; e < p.length; ++e) f(p[e]);
                  },
                  shader: o,
                  frag: -1,
                  vert: -1
                }
              );
            }
            function C(e, t, n, r, i, a, o) {
              function s(i) {
                var a;
                a =
                  null === t.next
                    ? 5121
                    : t.next.colorAttachments[0].texture._texture.type;
                var o = 0,
                  s = 0,
                  f = r.framebufferWidth,
                  u = r.framebufferHeight,
                  c = null;
                return (
                  V(i)
                    ? (c = i)
                    : i &&
                      ((o = 0 | i.x),
                      (s = 0 | i.y),
                      (f = 0 | (i.width || r.framebufferWidth - o)),
                      (u = 0 | (i.height || r.framebufferHeight - s)),
                      (c = i.data || null)),
                  n(),
                  (i = f * u * 4),
                  c ||
                    (5121 === a
                      ? (c = new Uint8Array(i))
                      : 5126 === a && (c = c || new Float32Array(i))),
                  e.pixelStorei(3333, 4),
                  e.readPixels(o, s, f, u, 6408, a, c),
                  c
                );
              }
              return function(e) {
                return e && "framebuffer" in e
                  ? (function(e) {
                      var n;
                      return (
                        t.setFBO({ framebuffer: e.framebuffer }, function() {
                          n = s(e);
                        }),
                        n
                      );
                    })(e)
                  : s(e);
              };
            }
            function S(e) {
              return Array.prototype.slice.call(e);
            }
            function j(e) {
              return S(e).join("");
            }
            function M() {
              function e() {
                var e = [],
                  t = [];
                return H(
                  function() {
                    e.push.apply(e, S(arguments));
                  },
                  {
                    def: function() {
                      var r = "v" + n++;
                      return (
                        t.push(r),
                        0 < arguments.length &&
                          (e.push(r, "="),
                          e.push.apply(e, S(arguments)),
                          e.push(";")),
                        r
                      );
                    },
                    toString: function() {
                      return j([0 < t.length ? "var " + t + ";" : "", j(e)]);
                    }
                  }
                );
              }
              function t() {
                function t(e, t) {
                  r(e, t, "=", n.def(e, t), ";");
                }
                var n = e(),
                  r = e(),
                  i = n.toString,
                  a = r.toString;
                return H(
                  function() {
                    n.apply(n, S(arguments));
                  },
                  {
                    def: n.def,
                    entry: n,
                    exit: r,
                    save: t,
                    set: function(e, r, i) {
                      t(e, r), n(e, r, "=", i, ";");
                    },
                    toString: function() {
                      return i() + a();
                    }
                  }
                );
              }
              var n = 0,
                r = [],
                i = [],
                a = e(),
                o = {};
              return {
                global: a,
                link: function(e) {
                  for (var t = 0; t < i.length; ++t)
                    if (i[t] === e) return r[t];
                  return (t = "g" + n++), r.push(t), i.push(e), t;
                },
                block: e,
                proc: function(e, n) {
                  function r() {
                    var e = "a" + i.length;
                    return i.push(e), e;
                  }
                  var i = [];
                  n = n || 0;
                  for (var a = 0; a < n; ++a) r();
                  var s = (a = t()).toString;
                  return (o[e] = H(a, {
                    arg: r,
                    toString: function() {
                      return j(["function(", i.join(), "){", s(), "}"]);
                    }
                  }));
                },
                scope: t,
                cond: function() {
                  var e = j(arguments),
                    n = t(),
                    r = t(),
                    i = n.toString,
                    a = r.toString;
                  return H(n, {
                    then: function() {
                      return n.apply(n, S(arguments)), this;
                    },
                    else: function() {
                      return r.apply(r, S(arguments)), this;
                    },
                    toString: function() {
                      var t = a();
                      return (
                        t && (t = "else{" + t + "}"),
                        j(["if(", e, "){", i(), "}", t])
                      );
                    }
                  });
                },
                compile: function() {
                  var e = ['"use strict";', a, "return {"];
                  Object.keys(o).forEach(function(t) {
                    e.push('"', t, '":', o[t].toString(), ",");
                  }),
                    e.push("}");
                  var t = j(e)
                    .replace(/;/g, ";\n")
                    .replace(/}/g, "}\n")
                    .replace(/{/g, "{\n");
                  return Function.apply(null, r.concat(t)).apply(null, i);
                }
              };
            }
            function F(e) {
              return Array.isArray(e) || V(e) || f(e);
            }
            function O(e) {
              return e.sort(function(e, t) {
                return "viewport" === e
                  ? -1
                  : "viewport" === t
                  ? 1
                  : e < t
                  ? -1
                  : 1;
              });
            }
            function z(e, t, n, r) {
              (this.thisDep = e),
                (this.contextDep = t),
                (this.propDep = n),
                (this.append = r);
            }
            function P(e) {
              return e && !(e.thisDep || e.contextDep || e.propDep);
            }
            function R(e) {
              return new z(!1, !1, !1, e);
            }
            function I(e, t) {
              var n = e.type;
              return 0 === n
                ? new z(!0, 1 <= (n = e.data.length), 2 <= n, t)
                : 4 === n
                ? new z((n = e.data).thisDep, n.contextDep, n.propDep, t)
                : new z(3 === n, 2 === n, 1 === n, t);
            }
            function B(e, t, n, r, i, o, s, f, u, c, l, p, h, d, m) {
              function y(e) {
                return e.replace(".", "_");
              }
              function v(e, t, n) {
                var r = y(e);
                re.push(e), (te[r] = ee[r] = !!n), (ie[r] = t);
              }
              function b(e, t, n) {
                var r = y(e);
                re.push(e),
                  Array.isArray(n)
                    ? ((ee[r] = n.slice()), (te[r] = n.slice()))
                    : (ee[r] = te[r] = n),
                  (ae[r] = t);
              }
              function x() {
                var e = M(),
                  n = e.link,
                  r = e.global;
                (e.id = fe++), (e.batchId = "0");
                var i = n(oe),
                  a = (e.shared = { props: "a0" });
                Object.keys(oe).forEach(function(e) {
                  a[e] = r.def(i, ".", e);
                });
                var o = (e.next = {}),
                  s = (e.current = {});
                Object.keys(ae).forEach(function(e) {
                  Array.isArray(ee[e]) &&
                    ((o[e] = r.def(a.next, ".", e)),
                    (s[e] = r.def(a.current, ".", e)));
                });
                var f = (e.constants = {});
                Object.keys(se).forEach(function(e) {
                  f[e] = r.def(JSON.stringify(se[e]));
                }),
                  (e.invoke = function(t, r) {
                    switch (r.type) {
                      case 0:
                        var i = ["this", a.context, a.props, e.batchId];
                        return t.def(
                          n(r.data),
                          ".call(",
                          i.slice(0, Math.max(r.data.length + 1, 4)),
                          ")"
                        );
                      case 1:
                        return t.def(a.props, r.data);
                      case 2:
                        return t.def(a.context, r.data);
                      case 3:
                        return t.def("this", r.data);
                      case 4:
                        return r.data.append(e, t), r.data.ref;
                    }
                  }),
                  (e.attribCache = {});
                var u = {};
                return (
                  (e.scopeAttrib = function(e) {
                    if ((e = t.id(e)) in u) return u[e];
                    var r = c.scope[e];
                    return r || (r = c.scope[e] = new K()), (u[e] = n(r));
                  }),
                  e
                );
              }
              function w(e, t) {
                var n = e.static,
                  r = e.dynamic;
                if ("framebuffer" in n) {
                  var i = n.framebuffer;
                  return i
                    ? ((i = f.getFramebuffer(i)),
                      R(function(e, t) {
                        var n = e.link(i),
                          r = e.shared;
                        return (
                          t.set(r.framebuffer, ".next", n),
                          t.set(
                            (r = r.context),
                            ".framebufferWidth",
                            n + ".width"
                          ),
                          t.set(r, ".framebufferHeight", n + ".height"),
                          n
                        );
                      }))
                    : R(function(e, t) {
                        var n = e.shared;
                        return (
                          t.set(n.framebuffer, ".next", "null"),
                          t.set(
                            (n = n.context),
                            ".framebufferWidth",
                            n + ".drawingBufferWidth"
                          ),
                          t.set(
                            n,
                            ".framebufferHeight",
                            n + ".drawingBufferHeight"
                          ),
                          "null"
                        );
                      });
                }
                if ("framebuffer" in r) {
                  var a = r.framebuffer;
                  return I(a, function(e, t) {
                    var n = e.invoke(t, a),
                      r = e.shared,
                      i = r.framebuffer;
                    n = t.def(i, ".getFramebuffer(", n, ")");
                    return (
                      t.set(i, ".next", n),
                      t.set(
                        (r = r.context),
                        ".framebufferWidth",
                        n + "?" + n + ".width:" + r + ".drawingBufferWidth"
                      ),
                      t.set(
                        r,
                        ".framebufferHeight",
                        n + "?" + n + ".height:" + r + ".drawingBufferHeight"
                      ),
                      n
                    );
                  });
                }
                return null;
              }
              function k(e) {
                function n(e) {
                  if (e in r) {
                    var n = t.id(r[e]);
                    return (
                      ((e = R(function() {
                        return n;
                      })).id = n),
                      e
                    );
                  }
                  if (e in i) {
                    var a = i[e];
                    return I(a, function(e, t) {
                      var n = e.invoke(t, a);
                      return t.def(e.shared.strings, ".id(", n, ")");
                    });
                  }
                  return null;
                }
                var r = e.static,
                  i = e.dynamic,
                  a = n("frag"),
                  o = n("vert"),
                  s = null;
                return (
                  P(a) && P(o)
                    ? ((s = l.program(o.id, a.id)),
                      (e = R(function(e, t) {
                        return e.link(s);
                      })))
                    : (e = new z(
                        (a && a.thisDep) || (o && o.thisDep),
                        (a && a.contextDep) || (o && o.contextDep),
                        (a && a.propDep) || (o && o.propDep),
                        function(e, t) {
                          var n,
                            r,
                            i = e.shared.shader;
                          return (
                            (n = a ? a.append(e, t) : t.def(i, ".", "frag")),
                            (r = o ? o.append(e, t) : t.def(i, ".", "vert")),
                            t.def(i + ".program(" + r + "," + n + ")")
                          );
                        }
                      )),
                  { frag: a, vert: o, progVar: e, program: s }
                );
              }
              function _(e, t) {
                function n(e, t) {
                  if (e in r) {
                    var n = 0 | r[e];
                    return R(function(e, r) {
                      return t && (e.OFFSET = n), n;
                    });
                  }
                  if (e in i) {
                    var o = i[e];
                    return I(o, function(e, n) {
                      var r = e.invoke(n, o);
                      return t && (e.OFFSET = r), r;
                    });
                  }
                  return t && a
                    ? R(function(e, t) {
                        return (e.OFFSET = "0"), 0;
                      })
                    : null;
                }
                var r = e.static,
                  i = e.dynamic,
                  a = (function() {
                    if ("elements" in r) {
                      var e = r.elements;
                      F(e)
                        ? (e = o.getElements(o.create(e, !0)))
                        : e && (e = o.getElements(e));
                      var t = R(function(t, n) {
                        if (e) {
                          var r = t.link(e);
                          return (t.ELEMENTS = r);
                        }
                        return (t.ELEMENTS = null);
                      });
                      return (t.value = e), t;
                    }
                    if ("elements" in i) {
                      var n = i.elements;
                      return I(n, function(e, t) {
                        var r = (i = e.shared).isBufferArgs,
                          i = i.elements,
                          a = e.invoke(t, n),
                          o = t.def("null");
                        (r = t.def(r, "(", a, ")")),
                          (a = e
                            .cond(r)
                            .then(o, "=", i, ".createStream(", a, ");")
                            .else(o, "=", i, ".getElements(", a, ");"));
                        return (
                          t.entry(a),
                          t.exit(e.cond(r).then(i, ".destroyStream(", o, ");")),
                          (e.ELEMENTS = o)
                        );
                      });
                    }
                    return null;
                  })(),
                  s = n("offset", !0);
                return {
                  elements: a,
                  primitive: (function() {
                    if ("primitive" in r) {
                      var e = r.primitive;
                      return R(function(t, n) {
                        return ne[e];
                      });
                    }
                    if ("primitive" in i) {
                      var t = i.primitive;
                      return I(t, function(e, n) {
                        var r = e.constants.primTypes,
                          i = e.invoke(n, t);
                        return n.def(r, "[", i, "]");
                      });
                    }
                    return a
                      ? P(a)
                        ? R(
                            a.value
                              ? function(e, t) {
                                  return t.def(e.ELEMENTS, ".primType");
                                }
                              : function() {
                                  return 4;
                                }
                          )
                        : new z(a.thisDep, a.contextDep, a.propDep, function(
                            e,
                            t
                          ) {
                            var n = e.ELEMENTS;
                            return t.def(n, "?", n, ".primType:", 4);
                          })
                      : null;
                  })(),
                  count: (function() {
                    if ("count" in r) {
                      var e = 0 | r.count;
                      return R(function() {
                        return e;
                      });
                    }
                    if ("count" in i) {
                      var t = i.count;
                      return I(t, function(e, n) {
                        return e.invoke(n, t);
                      });
                    }
                    return a
                      ? P(a)
                        ? a
                          ? s
                            ? new z(
                                s.thisDep,
                                s.contextDep,
                                s.propDep,
                                function(e, t) {
                                  return t.def(
                                    e.ELEMENTS,
                                    ".vertCount-",
                                    e.OFFSET
                                  );
                                }
                              )
                            : R(function(e, t) {
                                return t.def(e.ELEMENTS, ".vertCount");
                              })
                          : R(function() {
                              return -1;
                            })
                        : new z(
                            a.thisDep || s.thisDep,
                            a.contextDep || s.contextDep,
                            a.propDep || s.propDep,
                            function(e, t) {
                              var n = e.ELEMENTS;
                              return e.OFFSET
                                ? t.def(
                                    n,
                                    "?",
                                    n,
                                    ".vertCount-",
                                    e.OFFSET,
                                    ":-1"
                                  )
                                : t.def(n, "?", n, ".vertCount:-1");
                            }
                          )
                      : null;
                  })(),
                  instances: n("instances", !1),
                  offset: s
                };
              }
              function A(e, n) {
                var r = e.static,
                  a = e.dynamic,
                  o = {};
                return (
                  Object.keys(r).forEach(function(e) {
                    var n = r[e],
                      a = t.id(e),
                      s = new K();
                    if (F(n))
                      (s.state = 1),
                        (s.buffer = i.getBuffer(i.create(n, 34962, !1, !0))),
                        (s.type = 0);
                    else if ((u = i.getBuffer(n)))
                      (s.state = 1), (s.buffer = u), (s.type = 0);
                    else if ("constant" in n) {
                      var f = n.constant;
                      (s.buffer = "null"),
                        (s.state = 2),
                        "number" == typeof f
                          ? (s.x = f)
                          : xe.forEach(function(e, t) {
                              t < f.length && (s[e] = f[t]);
                            });
                    } else {
                      var u = F(n.buffer)
                          ? i.getBuffer(i.create(n.buffer, 34962, !1, !0))
                          : i.getBuffer(n.buffer),
                        c = 0 | n.offset,
                        l = 0 | n.stride,
                        p = 0 | n.size,
                        h = !!n.normalized,
                        d = 0;
                      "type" in n && (d = J[n.type]),
                        (n = 0 | n.divisor),
                        (s.buffer = u),
                        (s.state = 1),
                        (s.size = p),
                        (s.normalized = h),
                        (s.type = d || u.dtype),
                        (s.offset = c),
                        (s.stride = l),
                        (s.divisor = n);
                    }
                    o[e] = R(function(e, t) {
                      var n = e.attribCache;
                      if (a in n) return n[a];
                      var r = { isStream: !1 };
                      return (
                        Object.keys(s).forEach(function(e) {
                          r[e] = s[e];
                        }),
                        s.buffer &&
                          ((r.buffer = e.link(s.buffer)),
                          (r.type = r.type || r.buffer + ".dtype")),
                        (n[a] = r)
                      );
                    });
                  }),
                  Object.keys(a).forEach(function(e) {
                    var t = a[e];
                    o[e] = I(t, function(e, n) {
                      function r(e) {
                        n(f[e], "=", i, ".", e, "|0;");
                      }
                      var i = e.invoke(n, t),
                        a = e.shared,
                        o = a.isBufferArgs,
                        s = a.buffer,
                        f = { isStream: n.def(!1) },
                        u = new K();
                      (u.state = 1),
                        Object.keys(u).forEach(function(e) {
                          f[e] = n.def("" + u[e]);
                        });
                      var c = f.buffer,
                        l = f.type;
                      return (
                        n(
                          "if(",
                          o,
                          "(",
                          i,
                          ")){",
                          f.isStream,
                          "=true;",
                          c,
                          "=",
                          s,
                          ".createStream(",
                          34962,
                          ",",
                          i,
                          ");",
                          l,
                          "=",
                          c,
                          ".dtype;",
                          "}else{",
                          c,
                          "=",
                          s,
                          ".getBuffer(",
                          i,
                          ");",
                          "if(",
                          c,
                          "){",
                          l,
                          "=",
                          c,
                          ".dtype;",
                          '}else if("constant" in ',
                          i,
                          "){",
                          f.state,
                          "=",
                          2,
                          ";",
                          "if(typeof " + i + '.constant === "number"){',
                          f[xe[0]],
                          "=",
                          i,
                          ".constant;",
                          xe
                            .slice(1)
                            .map(function(e) {
                              return f[e];
                            })
                            .join("="),
                          "=0;",
                          "}else{",
                          xe
                            .map(function(e, t) {
                              return (
                                f[e] +
                                "=" +
                                i +
                                ".constant.length>" +
                                t +
                                "?" +
                                i +
                                ".constant[" +
                                t +
                                "]:0;"
                              );
                            })
                            .join(""),
                          "}}else{",
                          "if(",
                          o,
                          "(",
                          i,
                          ".buffer)){",
                          c,
                          "=",
                          s,
                          ".createStream(",
                          34962,
                          ",",
                          i,
                          ".buffer);",
                          "}else{",
                          c,
                          "=",
                          s,
                          ".getBuffer(",
                          i,
                          ".buffer);",
                          "}",
                          l,
                          '="type" in ',
                          i,
                          "?",
                          a.glTypes,
                          "[",
                          i,
                          ".type]:",
                          c,
                          ".dtype;",
                          f.normalized,
                          "=!!",
                          i,
                          ".normalized;"
                        ),
                        r("size"),
                        r("offset"),
                        r("stride"),
                        r("divisor"),
                        n("}}"),
                        n.exit(
                          "if(",
                          f.isStream,
                          "){",
                          s,
                          ".destroyStream(",
                          c,
                          ");",
                          "}"
                        ),
                        f
                      );
                    });
                  }),
                  o
                );
              }
              function T(e, t, n, r, i) {
                var o = w(e),
                  s = (function(e, t, n) {
                    function r(e) {
                      if (e in i) {
                        var n = i[e];
                        e = !0;
                        var r,
                          o,
                          s = 0 | n.x,
                          f = 0 | n.y;
                        return (
                          "width" in n ? (r = 0 | n.width) : (e = !1),
                          "height" in n ? (o = 0 | n.height) : (e = !1),
                          new z(
                            !e && t && t.thisDep,
                            !e && t && t.contextDep,
                            !e && t && t.propDep,
                            function(e, t) {
                              var i = e.shared.context,
                                a = r;
                              "width" in n ||
                                (a = t.def(i, ".", "framebufferWidth", "-", s));
                              var u = o;
                              return (
                                "height" in n ||
                                  (u = t.def(
                                    i,
                                    ".",
                                    "framebufferHeight",
                                    "-",
                                    f
                                  )),
                                [s, f, a, u]
                              );
                            }
                          )
                        );
                      }
                      if (e in a) {
                        var u = a[e];
                        return (
                          (e = I(u, function(e, t) {
                            var n = e.invoke(t, u),
                              r = e.shared.context,
                              i = t.def(n, ".x|0"),
                              a = t.def(n, ".y|0");
                            return [
                              i,
                              a,
                              t.def(
                                '"width" in ',
                                n,
                                "?",
                                n,
                                ".width|0:",
                                "(",
                                r,
                                ".",
                                "framebufferWidth",
                                "-",
                                i,
                                ")"
                              ),
                              (n = t.def(
                                '"height" in ',
                                n,
                                "?",
                                n,
                                ".height|0:",
                                "(",
                                r,
                                ".",
                                "framebufferHeight",
                                "-",
                                a,
                                ")"
                              ))
                            ];
                          })),
                          t &&
                            ((e.thisDep = e.thisDep || t.thisDep),
                            (e.contextDep = e.contextDep || t.contextDep),
                            (e.propDep = e.propDep || t.propDep)),
                          e
                        );
                      }
                      return t
                        ? new z(t.thisDep, t.contextDep, t.propDep, function(
                            e,
                            t
                          ) {
                            var n = e.shared.context;
                            return [
                              0,
                              0,
                              t.def(n, ".", "framebufferWidth"),
                              t.def(n, ".", "framebufferHeight")
                            ];
                          })
                        : null;
                    }
                    var i = e.static,
                      a = e.dynamic;
                    if ((e = r("viewport"))) {
                      var o = e;
                      e = new z(e.thisDep, e.contextDep, e.propDep, function(
                        e,
                        t
                      ) {
                        var n = o.append(e, t),
                          r = e.shared.context;
                        return (
                          t.set(r, ".viewportWidth", n[2]),
                          t.set(r, ".viewportHeight", n[3]),
                          n
                        );
                      });
                    }
                    return { viewport: e, scissor_box: r("scissor.box") };
                  })(e, o),
                  f = _(e),
                  u = (function(e, t) {
                    var n = e.static,
                      r = e.dynamic,
                      i = {};
                    return (
                      re.forEach(function(e) {
                        function t(t, a) {
                          if (e in n) {
                            var s = t(n[e]);
                            i[o] = R(function() {
                              return s;
                            });
                          } else if (e in r) {
                            var f = r[e];
                            i[o] = I(f, function(e, t) {
                              return a(e, t, e.invoke(t, f));
                            });
                          }
                        }
                        var o = y(e);
                        switch (e) {
                          case "cull.enable":
                          case "blend.enable":
                          case "dither":
                          case "stencil.enable":
                          case "depth.enable":
                          case "scissor.enable":
                          case "polygonOffset.enable":
                          case "sample.alpha":
                          case "sample.enable":
                          case "depth.mask":
                            return t(
                              function(e) {
                                return e;
                              },
                              function(e, t, n) {
                                return n;
                              }
                            );
                          case "depth.func":
                            return t(
                              function(e) {
                                return _e[e];
                              },
                              function(e, t, n) {
                                return t.def(
                                  e.constants.compareFuncs,
                                  "[",
                                  n,
                                  "]"
                                );
                              }
                            );
                          case "depth.range":
                            return t(
                              function(e) {
                                return e;
                              },
                              function(e, t, n) {
                                return [
                                  t.def("+", n, "[0]"),
                                  (t = t.def("+", n, "[1]"))
                                ];
                              }
                            );
                          case "blend.func":
                            return t(
                              function(e) {
                                return [
                                  ke["srcRGB" in e ? e.srcRGB : e.src],
                                  ke["dstRGB" in e ? e.dstRGB : e.dst],
                                  ke["srcAlpha" in e ? e.srcAlpha : e.src],
                                  ke["dstAlpha" in e ? e.dstAlpha : e.dst]
                                ];
                              },
                              function(e, t, n) {
                                function r(e, r) {
                                  return t.def(
                                    '"',
                                    e,
                                    r,
                                    '" in ',
                                    n,
                                    "?",
                                    n,
                                    ".",
                                    e,
                                    r,
                                    ":",
                                    n,
                                    ".",
                                    e
                                  );
                                }
                                e = e.constants.blendFuncs;
                                var i = r("src", "RGB"),
                                  a = r("dst", "RGB"),
                                  o = ((i = t.def(e, "[", i, "]")),
                                  t.def(e, "[", r("src", "Alpha"), "]"));
                                return [
                                  i,
                                  (a = t.def(e, "[", a, "]")),
                                  o,
                                  (e = t.def(e, "[", r("dst", "Alpha"), "]"))
                                ];
                              }
                            );
                          case "blend.equation":
                            return t(
                              function(e) {
                                return "string" == typeof e
                                  ? [X[e], X[e]]
                                  : "object" == typeof e
                                  ? [X[e.rgb], X[e.alpha]]
                                  : void 0;
                              },
                              function(e, t, n) {
                                var r = e.constants.blendEquations,
                                  i = t.def(),
                                  a = t.def();
                                return (
                                  (e = e.cond(
                                    "typeof ",
                                    n,
                                    '==="string"'
                                  )).then(i, "=", a, "=", r, "[", n, "];"),
                                  e.else(
                                    i,
                                    "=",
                                    r,
                                    "[",
                                    n,
                                    ".rgb];",
                                    a,
                                    "=",
                                    r,
                                    "[",
                                    n,
                                    ".alpha];"
                                  ),
                                  t(e),
                                  [i, a]
                                );
                              }
                            );
                          case "blend.color":
                            return t(
                              function(e) {
                                return a(4, function(t) {
                                  return +e[t];
                                });
                              },
                              function(e, t, n) {
                                return a(4, function(e) {
                                  return t.def("+", n, "[", e, "]");
                                });
                              }
                            );
                          case "stencil.mask":
                            return t(
                              function(e) {
                                return 0 | e;
                              },
                              function(e, t, n) {
                                return t.def(n, "|0");
                              }
                            );
                          case "stencil.func":
                            return t(
                              function(e) {
                                return [
                                  _e[e.cmp || "keep"],
                                  e.ref || 0,
                                  "mask" in e ? e.mask : -1
                                ];
                              },
                              function(e, t, n) {
                                return [
                                  (e = t.def(
                                    '"cmp" in ',
                                    n,
                                    "?",
                                    e.constants.compareFuncs,
                                    "[",
                                    n,
                                    ".cmp]",
                                    ":",
                                    7680
                                  )),
                                  t.def(n, ".ref|0"),
                                  (t = t.def(
                                    '"mask" in ',
                                    n,
                                    "?",
                                    n,
                                    ".mask|0:-1"
                                  ))
                                ];
                              }
                            );
                          case "stencil.opFront":
                          case "stencil.opBack":
                            return t(
                              function(t) {
                                return [
                                  "stencil.opBack" === e ? 1029 : 1028,
                                  Ae[t.fail || "keep"],
                                  Ae[t.zfail || "keep"],
                                  Ae[t.zpass || "keep"]
                                ];
                              },
                              function(t, n, r) {
                                function i(e) {
                                  return n.def(
                                    '"',
                                    e,
                                    '" in ',
                                    r,
                                    "?",
                                    a,
                                    "[",
                                    r,
                                    ".",
                                    e,
                                    "]:",
                                    7680
                                  );
                                }
                                var a = t.constants.stencilOps;
                                return [
                                  "stencil.opBack" === e ? 1029 : 1028,
                                  i("fail"),
                                  i("zfail"),
                                  i("zpass")
                                ];
                              }
                            );
                          case "polygonOffset.offset":
                            return t(
                              function(e) {
                                return [0 | e.factor, 0 | e.units];
                              },
                              function(e, t, n) {
                                return [
                                  t.def(n, ".factor|0"),
                                  (t = t.def(n, ".units|0"))
                                ];
                              }
                            );
                          case "cull.face":
                            return t(
                              function(e) {
                                var t = 0;
                                return (
                                  "front" === e
                                    ? (t = 1028)
                                    : "back" === e && (t = 1029),
                                  t
                                );
                              },
                              function(e, t, n) {
                                return t.def(n, '==="front"?', 1028, ":", 1029);
                              }
                            );
                          case "lineWidth":
                            return t(
                              function(e) {
                                return e;
                              },
                              function(e, t, n) {
                                return n;
                              }
                            );
                          case "frontFace":
                            return t(
                              function(e) {
                                return Te[e];
                              },
                              function(e, t, n) {
                                return t.def(n + '==="cw"?2304:2305');
                              }
                            );
                          case "colorMask":
                            return t(
                              function(e) {
                                return e.map(function(e) {
                                  return !!e;
                                });
                              },
                              function(e, t, n) {
                                return a(4, function(e) {
                                  return "!!" + n + "[" + e + "]";
                                });
                              }
                            );
                          case "sample.coverage":
                            return t(
                              function(e) {
                                return ["value" in e ? e.value : 1, !!e.invert];
                              },
                              function(e, t, n) {
                                return [
                                  t.def('"value" in ', n, "?+", n, ".value:1"),
                                  (t = t.def("!!", n, ".invert"))
                                ];
                              }
                            );
                        }
                      }),
                      i
                    );
                  })(e),
                  c = k(e),
                  l = s.viewport;
                return (
                  l && (u.viewport = l),
                  (s = s[(l = y("scissor.box"))]) && (u[l] = s),
                  ((o = {
                    framebuffer: o,
                    draw: f,
                    shader: c,
                    state: u,
                    dirty: (s = 0 < Object.keys(u).length)
                  }).profile = (function(e) {
                    var t,
                      n = e.static;
                    if (((e = e.dynamic), "profile" in n)) {
                      var r = !!n.profile;
                      (t = R(function(e, t) {
                        return r;
                      })).enable = r;
                    } else if ("profile" in e) {
                      var i = e.profile;
                      t = I(i, function(e, t) {
                        return e.invoke(t, i);
                      });
                    }
                    return t;
                  })(e)),
                  (o.uniforms = (function(e, t) {
                    var n = e.static,
                      r = e.dynamic,
                      i = {};
                    return (
                      Object.keys(n).forEach(function(e) {
                        var t,
                          r = n[e];
                        if ("number" == typeof r || "boolean" == typeof r)
                          t = R(function() {
                            return r;
                          });
                        else if ("function" == typeof r) {
                          var o = r._reglType;
                          "texture2d" === o || "textureCube" === o
                            ? (t = R(function(e) {
                                return e.link(r);
                              }))
                            : ("framebuffer" !== o &&
                                "framebufferCube" !== o) ||
                              (t = R(function(e) {
                                return e.link(r.color[0]);
                              }));
                        } else
                          g(r) &&
                            (t = R(function(e) {
                              return e.global.def(
                                "[",
                                a(r.length, function(e) {
                                  return r[e];
                                }),
                                "]"
                              );
                            }));
                        (t.value = r), (i[e] = t);
                      }),
                      Object.keys(r).forEach(function(e) {
                        var t = r[e];
                        i[e] = I(t, function(e, n) {
                          return e.invoke(n, t);
                        });
                      }),
                      i
                    );
                  })(n)),
                  (o.attributes = A(t)),
                  (o.context = (function(e) {
                    var t = e.static,
                      n = e.dynamic,
                      r = {};
                    return (
                      Object.keys(t).forEach(function(e) {
                        var n = t[e];
                        r[e] = R(function(e, t) {
                          return "number" == typeof n || "boolean" == typeof n
                            ? "" + n
                            : e.link(n);
                        });
                      }),
                      Object.keys(n).forEach(function(e) {
                        var t = n[e];
                        r[e] = I(t, function(e, n) {
                          return e.invoke(n, t);
                        });
                      }),
                      r
                    );
                  })(r)),
                  o
                );
              }
              function E(e, t, n) {
                var r = e.shared.context,
                  i = e.scope();
                Object.keys(n).forEach(function(a) {
                  t.save(r, "." + a), i(r, ".", a, "=", n[a].append(e, t), ";");
                }),
                  t(i);
              }
              function D(e, t, n, r) {
                var i,
                  a = (s = e.shared).gl,
                  o = s.framebuffer;
                Z && (i = t.def(s.extensions, ".webgl_draw_buffers"));
                var s = (f = e.constants).drawBuffer,
                  f = f.backBuffer;
                (e = n ? n.append(e, t) : t.def(o, ".next")),
                  r || t("if(", e, "!==", o, ".cur){"),
                  t(
                    "if(",
                    e,
                    "){",
                    a,
                    ".bindFramebuffer(",
                    36160,
                    ",",
                    e,
                    ".framebuffer);"
                  ),
                  Z &&
                    t(
                      i,
                      ".drawBuffersWEBGL(",
                      s,
                      "[",
                      e,
                      ".colorAttachments.length]);"
                    ),
                  t("}else{", a, ".bindFramebuffer(", 36160, ",null);"),
                  Z && t(i, ".drawBuffersWEBGL(", f, ");"),
                  t("}", o, ".cur=", e, ";"),
                  r || t("}");
              }
              function C(e, t, n) {
                var r = e.shared,
                  i = r.gl,
                  o = e.current,
                  s = e.next,
                  f = r.current,
                  u = r.next,
                  c = e.cond(f, ".dirty");
                re.forEach(function(t) {
                  var r, l;
                  if (!((t = y(t)) in n.state))
                    if (t in s) {
                      (r = s[t]), (l = o[t]);
                      var p = a(ee[t].length, function(e) {
                        return c.def(r, "[", e, "]");
                      });
                      c(
                        e
                          .cond(
                            p
                              .map(function(e, t) {
                                return e + "!==" + l + "[" + t + "]";
                              })
                              .join("||")
                          )
                          .then(
                            i,
                            ".",
                            ae[t],
                            "(",
                            p,
                            ");",
                            p
                              .map(function(e, t) {
                                return l + "[" + t + "]=" + e;
                              })
                              .join(";"),
                            ";"
                          )
                      );
                    } else
                      (r = c.def(u, ".", t)),
                        (p = e.cond(r, "!==", f, ".", t)),
                        c(p),
                        t in ie
                          ? p(
                              e
                                .cond(r)
                                .then(i, ".enable(", ie[t], ");")
                                .else(i, ".disable(", ie[t], ");"),
                              f,
                              ".",
                              t,
                              "=",
                              r,
                              ";"
                            )
                          : p(
                              i,
                              ".",
                              ae[t],
                              "(",
                              r,
                              ");",
                              f,
                              ".",
                              t,
                              "=",
                              r,
                              ";"
                            );
                }),
                  0 === Object.keys(n.state).length && c(f, ".dirty=false;"),
                  t(c);
              }
              function S(e, t, n, r) {
                var i = e.shared,
                  a = e.current,
                  o = i.current,
                  s = i.gl;
                O(Object.keys(n)).forEach(function(i) {
                  var f = n[i];
                  if (!r || r(f)) {
                    var u = f.append(e, t);
                    if (ie[i]) {
                      var c = ie[i];
                      P(f)
                        ? t(s, u ? ".enable(" : ".disable(", c, ");")
                        : t(
                            e
                              .cond(u)
                              .then(s, ".enable(", c, ");")
                              .else(s, ".disable(", c, ");")
                          ),
                        t(o, ".", i, "=", u, ";");
                    } else if (g(u)) {
                      var l = a[i];
                      t(
                        s,
                        ".",
                        ae[i],
                        "(",
                        u,
                        ");",
                        u
                          .map(function(e, t) {
                            return l + "[" + t + "]=" + e;
                          })
                          .join(";"),
                        ";"
                      );
                    } else
                      t(s, ".", ae[i], "(", u, ");", o, ".", i, "=", u, ";");
                  }
                });
              }
              function j(e, t) {
                $ &&
                  (e.instancing = t.def(
                    e.shared.extensions,
                    ".angle_instanced_arrays"
                  ));
              }
              function B(e, t, n, r, i) {
                function a() {
                  return "undefined" == typeof performance
                    ? "Date.now()"
                    : "performance.now()";
                }
                function o(e) {
                  e((u = t.def()), "=", a(), ";"),
                    "string" == typeof i
                      ? e(p, ".count+=", i, ";")
                      : e(p, ".count++;"),
                    d &&
                      (r
                        ? e((c = t.def()), "=", m, ".getNumPendingQueries();")
                        : e(m, ".beginQuery(", p, ");"));
                }
                function s(e) {
                  e(p, ".cpuTime+=", a(), "-", u, ";"),
                    d &&
                      (r
                        ? e(
                            m,
                            ".pushScopeStats(",
                            c,
                            ",",
                            m,
                            ".getNumPendingQueries(),",
                            p,
                            ");"
                          )
                        : e(m, ".endQuery();"));
                }
                function f(e) {
                  var n = t.def(h, ".profile");
                  t(h, ".profile=", e, ";"), t.exit(h, ".profile=", n, ";");
                }
                var u,
                  c,
                  l = e.shared,
                  p = e.stats,
                  h = l.current,
                  m = l.timer;
                if ((n = n.profile)) {
                  if (P(n))
                    return void (n.enable
                      ? (o(t), s(t.exit), f("true"))
                      : f("false"));
                  f((n = n.append(e, t)));
                } else n = t.def(h, ".profile");
                o((l = e.block())),
                  t("if(", n, "){", l, "}"),
                  s((e = e.block())),
                  t.exit("if(", n, "){", e, "}");
              }
              function L(e, t, n, r, i) {
                function a(n, r, i) {
                  function a() {
                    t(
                      "if(!",
                      c,
                      ".buffer){",
                      f,
                      ".enableVertexAttribArray(",
                      u,
                      ");}"
                    );
                    var n,
                      a = i.type;
                    (n = i.size ? t.def(i.size, "||", r) : r),
                      t(
                        "if(",
                        c,
                        ".type!==",
                        a,
                        "||",
                        c,
                        ".size!==",
                        n,
                        "||",
                        h
                          .map(function(e) {
                            return c + "." + e + "!==" + i[e];
                          })
                          .join("||"),
                        "){",
                        f,
                        ".bindBuffer(",
                        34962,
                        ",",
                        l,
                        ".buffer);",
                        f,
                        ".vertexAttribPointer(",
                        [u, n, a, i.normalized, i.stride, i.offset],
                        ");",
                        c,
                        ".type=",
                        a,
                        ";",
                        c,
                        ".size=",
                        n,
                        ";",
                        h
                          .map(function(e) {
                            return c + "." + e + "=" + i[e] + ";";
                          })
                          .join(""),
                        "}"
                      ),
                      $ &&
                        t(
                          "if(",
                          c,
                          ".divisor!==",
                          (a = i.divisor),
                          "){",
                          e.instancing,
                          ".vertexAttribDivisorANGLE(",
                          [u, a],
                          ");",
                          c,
                          ".divisor=",
                          a,
                          ";}"
                        );
                  }
                  function s() {
                    t(
                      "if(",
                      c,
                      ".buffer){",
                      f,
                      ".disableVertexAttribArray(",
                      u,
                      ");",
                      "}if(",
                      xe
                        .map(function(e, t) {
                          return c + "." + e + "!==" + p[t];
                        })
                        .join("||"),
                      "){",
                      f,
                      ".vertexAttrib4f(",
                      u,
                      ",",
                      p,
                      ");",
                      xe
                        .map(function(e, t) {
                          return c + "." + e + "=" + p[t] + ";";
                        })
                        .join(""),
                      "}"
                    );
                  }
                  var f = o.gl,
                    u = t.def(n, ".location"),
                    c = t.def(o.attributes, "[", u, "]"),
                    l = i.buffer,
                    p = [i.x, i.y, i.z, i.w],
                    h = ["buffer", "normalized", "offset", "stride"];
                  1 === (n = i.state)
                    ? a()
                    : 2 === n
                    ? s()
                    : (t("if(", n, "===", 1, "){"),
                      a(),
                      t("}else{"),
                      s(),
                      t("}"));
                }
                var o = e.shared;
                r.forEach(function(r) {
                  var o,
                    s = r.name,
                    f = n.attributes[s];
                  if (f) {
                    if (!i(f)) return;
                    o = f.append(e, t);
                  } else {
                    if (!i(Ee)) return;
                    var u = e.scopeAttrib(s);
                    (o = {}),
                      Object.keys(new K()).forEach(function(e) {
                        o[e] = t.def(u, ".", e);
                      });
                  }
                  a(
                    e.link(r),
                    (function(e) {
                      switch (e) {
                        case 35664:
                        case 35667:
                        case 35671:
                          return 2;
                        case 35665:
                        case 35668:
                        case 35672:
                          return 3;
                        case 35666:
                        case 35669:
                        case 35673:
                          return 4;
                        default:
                          return 1;
                      }
                    })(r.info.type),
                    o
                  );
                });
              }
              function H(e, n, r, i, o) {
                for (var s, f = e.shared, u = f.gl, c = 0; c < i.length; ++c) {
                  var l,
                    p = (m = i[c]).name,
                    h = m.info.type,
                    d = r.uniforms[p],
                    m = e.link(m) + ".location";
                  if (d) {
                    if (!o(d)) continue;
                    if (P(d)) {
                      if (((p = d.value), 35678 === h || 35680 === h))
                        n(
                          u,
                          ".uniform1i(",
                          m,
                          ",",
                          (h = e.link(p._texture || p.color[0]._texture)) +
                            ".bind());"
                        ),
                          n.exit(h, ".unbind();");
                      else if (35674 === h || 35675 === h || 35676 === h)
                        (d = 2),
                          35675 === h ? (d = 3) : 35676 === h && (d = 4),
                          n(
                            u,
                            ".uniformMatrix",
                            d,
                            "fv(",
                            m,
                            ",false,",
                            (p = e.global.def(
                              "new Float32Array([" +
                                Array.prototype.slice.call(p) +
                                "])"
                            )),
                            ");"
                          );
                      else {
                        switch (h) {
                          case 5126:
                            s = "1f";
                            break;
                          case 35664:
                            s = "2f";
                            break;
                          case 35665:
                            s = "3f";
                            break;
                          case 35666:
                            s = "4f";
                            break;
                          case 35670:
                          case 5124:
                            s = "1i";
                            break;
                          case 35671:
                          case 35667:
                            s = "2i";
                            break;
                          case 35672:
                          case 35668:
                            s = "3i";
                            break;
                          case 35673:
                            s = "4i";
                            break;
                          case 35669:
                            s = "4i";
                        }
                        n(
                          u,
                          ".uniform",
                          s,
                          "(",
                          m,
                          ",",
                          g(p) ? Array.prototype.slice.call(p) : p,
                          ");"
                        );
                      }
                      continue;
                    }
                    l = d.append(e, n);
                  } else {
                    if (!o(Ee)) continue;
                    l = n.def(f.uniforms, "[", t.id(p), "]");
                  }
                  switch (
                    (35678 === h
                      ? n(
                          "if(",
                          l,
                          "&&",
                          l,
                          '._reglType==="framebuffer"){',
                          l,
                          "=",
                          l,
                          ".color[0];",
                          "}"
                        )
                      : 35680 === h &&
                        n(
                          "if(",
                          l,
                          "&&",
                          l,
                          '._reglType==="framebufferCube"){',
                          l,
                          "=",
                          l,
                          ".color[0];",
                          "}"
                        ),
                    (p = 1),
                    h)
                  ) {
                    case 35678:
                    case 35680:
                      (h = n.def(l, "._texture")),
                        n(u, ".uniform1i(", m, ",", h, ".bind());"),
                        n.exit(h, ".unbind();");
                      continue;
                    case 5124:
                    case 35670:
                      s = "1i";
                      break;
                    case 35667:
                    case 35671:
                      (s = "2i"), (p = 2);
                      break;
                    case 35668:
                    case 35672:
                      (s = "3i"), (p = 3);
                      break;
                    case 35669:
                    case 35673:
                      (s = "4i"), (p = 4);
                      break;
                    case 5126:
                      s = "1f";
                      break;
                    case 35664:
                      (s = "2f"), (p = 2);
                      break;
                    case 35665:
                      (s = "3f"), (p = 3);
                      break;
                    case 35666:
                      (s = "4f"), (p = 4);
                      break;
                    case 35674:
                      s = "Matrix2fv";
                      break;
                    case 35675:
                      s = "Matrix3fv";
                      break;
                    case 35676:
                      s = "Matrix4fv";
                  }
                  if ((n(u, ".uniform", s, "(", m, ","), "M" === s.charAt(0))) {
                    m = Math.pow(h - 35674 + 2, 2);
                    var y = e.global.def("new Float32Array(", m, ")");
                    n(
                      "false,(Array.isArray(",
                      l,
                      ")||",
                      l,
                      " instanceof Float32Array)?",
                      l,
                      ":(",
                      a(m, function(e) {
                        return y + "[" + e + "]=" + l + "[" + e + "]";
                      }),
                      ",",
                      y,
                      ")"
                    );
                  } else
                    n(
                      1 < p
                        ? a(p, function(e) {
                            return l + "[" + e + "]";
                          })
                        : l
                    );
                  n(");");
                }
              }
              function N(e, t, n, r) {
                function i(i) {
                  var a = p[i];
                  return a
                    ? a.append(
                        e,
                        (a.contextDep && r.contextDynamic) || a.propDep ? n : t
                      )
                    : t.def(l, ".", i);
                }
                function a() {
                  function e() {
                    n(
                      f,
                      ".drawElementsInstancedANGLE(",
                      [d, g, y, m + "<<((" + y + "-5121)>>1)", s],
                      ");"
                    );
                  }
                  function t() {
                    n(f, ".drawArraysInstancedANGLE(", [d, m, g, s], ");");
                  }
                  h
                    ? v
                      ? e()
                      : (n("if(", h, "){"), e(), n("}else{"), t(), n("}"))
                    : t();
                }
                function o() {
                  function e() {
                    n(
                      c +
                        ".drawElements(" +
                        [d, g, y, m + "<<((" + y + "-5121)>>1)"] +
                        ");"
                    );
                  }
                  function t() {
                    n(c + ".drawArrays(" + [d, m, g] + ");");
                  }
                  h
                    ? v
                      ? e()
                      : (n("if(", h, "){"), e(), n("}else{"), t(), n("}"))
                    : t();
                }
                var s,
                  f,
                  u = e.shared,
                  c = u.gl,
                  l = u.draw,
                  p = r.draw,
                  h = (function() {
                    var i = p.elements,
                      a = t;
                    return (
                      i
                        ? (((i.contextDep && r.contextDynamic) || i.propDep) &&
                            (a = n),
                          (i = i.append(e, a)))
                        : (i = a.def(l, ".", "elements")),
                      i &&
                        a(
                          "if(" +
                            i +
                            ")" +
                            c +
                            ".bindBuffer(34963," +
                            i +
                            ".buffer.buffer);"
                        ),
                      i
                    );
                  })(),
                  d = i("primitive"),
                  m = i("offset"),
                  g = (function() {
                    var i = p.count,
                      a = t;
                    return (
                      i
                        ? (((i.contextDep && r.contextDynamic) || i.propDep) &&
                            (a = n),
                          (i = i.append(e, a)))
                        : (i = a.def(l, ".", "count")),
                      i
                    );
                  })();
                if ("number" == typeof g) {
                  if (0 === g) return;
                } else n("if(", g, "){"), n.exit("}");
                $ && ((s = i("instances")), (f = e.instancing));
                var y = h + ".type",
                  v = p.elements && P(p.elements);
                $ && ("number" != typeof s || 0 <= s)
                  ? "string" == typeof s
                    ? (n("if(", s, ">0){"),
                      a(),
                      n("}else if(", s, "<0){"),
                      o(),
                      n("}"))
                    : a()
                  : o();
              }
              function W(e, t, n, r, i) {
                return (
                  (i = (t = x()).proc("body", i)),
                  $ &&
                    (t.instancing = i.def(
                      t.shared.extensions,
                      ".angle_instanced_arrays"
                    )),
                  e(t, i, n, r),
                  t.compile().body
                );
              }
              function q(e, t, n, r) {
                j(e, t),
                  L(e, t, n, r.attributes, function() {
                    return !0;
                  }),
                  H(e, t, n, r.uniforms, function() {
                    return !0;
                  }),
                  N(e, t, t, n);
              }
              function Q(e, t, n, r) {
                function i() {
                  return !0;
                }
                (e.batchId = "a1"),
                  j(e, t),
                  L(e, t, n, r.attributes, i),
                  H(e, t, n, r.uniforms, i),
                  N(e, t, t, n);
              }
              function G(e, t, n, r) {
                function i(e) {
                  return (e.contextDep && o) || e.propDep;
                }
                function a(e) {
                  return !i(e);
                }
                j(e, t);
                var o = n.contextDep,
                  s = t.def(),
                  f = t.def();
                (e.shared.props = f), (e.batchId = s);
                var u = e.scope(),
                  c = e.scope();
                t(
                  u.entry,
                  "for(",
                  s,
                  "=0;",
                  s,
                  "<",
                  "a1",
                  ";++",
                  s,
                  "){",
                  f,
                  "=",
                  "a0",
                  "[",
                  s,
                  "];",
                  c,
                  "}",
                  u.exit
                ),
                  n.needsContext && E(e, c, n.context),
                  n.needsFramebuffer && D(e, c, n.framebuffer),
                  S(e, c, n.state, i),
                  n.profile && i(n.profile) && B(e, c, n, !1, !0),
                  r
                    ? (L(e, u, n, r.attributes, a),
                      L(e, c, n, r.attributes, i),
                      H(e, u, n, r.uniforms, a),
                      H(e, c, n, r.uniforms, i),
                      N(e, u, c, n))
                    : ((t = e.global.def("{}")),
                      (r = n.shader.progVar.append(e, c)),
                      (f = c.def(r, ".id")),
                      (u = c.def(t, "[", f, "]")),
                      c(
                        e.shared.gl,
                        ".useProgram(",
                        r,
                        ".program);",
                        "if(!",
                        u,
                        "){",
                        u,
                        "=",
                        t,
                        "[",
                        f,
                        "]=",
                        e.link(function(t) {
                          return W(Q, e, n, t, 2);
                        }),
                        "(",
                        r,
                        ");}",
                        u,
                        ".call(this,a0[",
                        s,
                        "],",
                        s,
                        ");"
                      ));
              }
              function V(e, n) {
                function r(t) {
                  var r = n.shader[t];
                  r && i.set(a.shader, "." + t, r.append(e, i));
                }
                var i = e.proc("scope", 3);
                e.batchId = "a2";
                var a = e.shared,
                  o = a.current;
                E(e, i, n.context),
                  n.framebuffer && n.framebuffer.append(e, i),
                  O(Object.keys(n.state)).forEach(function(t) {
                    var r = n.state[t].append(e, i);
                    g(r)
                      ? r.forEach(function(n, r) {
                          i.set(e.next[t], "[" + r + "]", n);
                        })
                      : i.set(a.next, "." + t, r);
                  }),
                  B(e, i, n, !0, !0),
                  [
                    "elements",
                    "offset",
                    "count",
                    "instances",
                    "primitive"
                  ].forEach(function(t) {
                    var r = n.draw[t];
                    r && i.set(a.draw, "." + t, "" + r.append(e, i));
                  }),
                  Object.keys(n.uniforms).forEach(function(r) {
                    i.set(
                      a.uniforms,
                      "[" + t.id(r) + "]",
                      n.uniforms[r].append(e, i)
                    );
                  }),
                  Object.keys(n.attributes).forEach(function(t) {
                    var r = n.attributes[t].append(e, i),
                      a = e.scopeAttrib(t);
                    Object.keys(new K()).forEach(function(e) {
                      i.set(a, "." + e, r[e]);
                    });
                  }),
                  r("vert"),
                  r("frag"),
                  0 < Object.keys(n.state).length &&
                    (i(o, ".dirty=true;"), i.exit(o, ".dirty=true;")),
                  i("a1(", e.shared.context, ",a0,", e.batchId, ");");
              }
              function Y(e, t, n) {
                var r = t.static[n];
                if (
                  r &&
                  (function(e) {
                    if ("object" == typeof e && !g(e)) {
                      for (var t = Object.keys(e), n = 0; n < t.length; ++n)
                        if (U.isDynamic(e[t[n]])) return !0;
                      return !1;
                    }
                  })(r)
                ) {
                  var i = e.global,
                    a = Object.keys(r),
                    o = !1,
                    s = !1,
                    f = !1,
                    u = e.global.def("{}");
                  a.forEach(function(t) {
                    var n = r[t];
                    if (U.isDynamic(n))
                      "function" == typeof n && (n = r[t] = U.unbox(n)),
                        (t = I(n, null)),
                        (o = o || t.thisDep),
                        (f = f || t.propDep),
                        (s = s || t.contextDep);
                    else {
                      switch ((i(u, ".", t, "="), typeof n)) {
                        case "number":
                          i(n);
                          break;
                        case "string":
                          i('"', n, '"');
                          break;
                        case "object":
                          Array.isArray(n) && i("[", n.join(), "]");
                          break;
                        default:
                          i(e.link(n));
                      }
                      i(";");
                    }
                  }),
                    (t.dynamic[n] = new U.DynamicVariable(4, {
                      thisDep: o,
                      contextDep: s,
                      propDep: f,
                      ref: u,
                      append: function(e, t) {
                        a.forEach(function(n) {
                          var i = r[n];
                          U.isDynamic(i) &&
                            ((i = e.invoke(t, i)), t(u, ".", n, "=", i, ";"));
                        });
                      }
                    })),
                    delete t.static[n];
                }
              }
              var K = c.Record,
                X = { add: 32774, subtract: 32778, "reverse subtract": 32779 };
              n.ext_blend_minmax && ((X.min = 32775), (X.max = 32776));
              var $ = n.angle_instanced_arrays,
                Z = n.webgl_draw_buffers,
                ee = { dirty: !0, profile: m.profile },
                te = {},
                re = [],
                ie = {},
                ae = {};
              v("dither", 3024),
                v("blend.enable", 3042),
                b("blend.color", "blendColor", [0, 0, 0, 0]),
                b("blend.equation", "blendEquationSeparate", [32774, 32774]),
                b("blend.func", "blendFuncSeparate", [1, 0, 1, 0]),
                v("depth.enable", 2929, !0),
                b("depth.func", "depthFunc", 513),
                b("depth.range", "depthRange", [0, 1]),
                b("depth.mask", "depthMask", !0),
                b("colorMask", "colorMask", [!0, !0, !0, !0]),
                v("cull.enable", 2884),
                b("cull.face", "cullFace", 1029),
                b("frontFace", "frontFace", 2305),
                b("lineWidth", "lineWidth", 1),
                v("polygonOffset.enable", 32823),
                b("polygonOffset.offset", "polygonOffset", [0, 0]),
                v("sample.alpha", 32926),
                v("sample.enable", 32928),
                b("sample.coverage", "sampleCoverage", [1, !1]),
                v("stencil.enable", 2960),
                b("stencil.mask", "stencilMask", -1),
                b("stencil.func", "stencilFunc", [519, 0, -1]),
                b("stencil.opFront", "stencilOpSeparate", [
                  1028,
                  7680,
                  7680,
                  7680
                ]),
                b("stencil.opBack", "stencilOpSeparate", [
                  1029,
                  7680,
                  7680,
                  7680
                ]),
                v("scissor.enable", 3089),
                b("scissor.box", "scissor", [
                  0,
                  0,
                  e.drawingBufferWidth,
                  e.drawingBufferHeight
                ]),
                b("viewport", "viewport", [
                  0,
                  0,
                  e.drawingBufferWidth,
                  e.drawingBufferHeight
                ]);
              var oe = {
                  gl: e,
                  context: h,
                  strings: t,
                  next: te,
                  current: ee,
                  draw: p,
                  elements: o,
                  buffer: i,
                  shader: l,
                  attributes: c.state,
                  uniforms: u,
                  framebuffer: f,
                  extensions: n,
                  timer: d,
                  isBufferArgs: F
                },
                se = {
                  primTypes: ne,
                  compareFuncs: _e,
                  blendFuncs: ke,
                  blendEquations: X,
                  stencilOps: Ae,
                  glTypes: J,
                  orientationType: Te
                };
              Z &&
                ((se.backBuffer = [1029]),
                (se.drawBuffer = a(r.maxDrawbuffers, function(e) {
                  return 0 === e
                    ? [0]
                    : a(e, function(e) {
                        return 36064 + e;
                      });
                })));
              var fe = 0;
              return {
                next: te,
                current: ee,
                procs: (function() {
                  var e = x(),
                    t = e.proc("poll"),
                    n = e.proc("refresh"),
                    i = e.block();
                  t(i), n(i);
                  var o,
                    s = e.shared,
                    f = s.gl,
                    u = s.next,
                    c = s.current;
                  i(c, ".dirty=false;"),
                    D(e, t),
                    D(e, n, null, !0),
                    $ && (o = e.link($));
                  for (var l = 0; l < r.maxAttributes; ++l) {
                    var p = n.def(s.attributes, "[", l, "]"),
                      h = e.cond(p, ".buffer");
                    h
                      .then(
                        f,
                        ".enableVertexAttribArray(",
                        l,
                        ");",
                        f,
                        ".bindBuffer(",
                        34962,
                        ",",
                        p,
                        ".buffer.buffer);",
                        f,
                        ".vertexAttribPointer(",
                        l,
                        ",",
                        p,
                        ".size,",
                        p,
                        ".type,",
                        p,
                        ".normalized,",
                        p,
                        ".stride,",
                        p,
                        ".offset);"
                      )
                      .else(
                        f,
                        ".disableVertexAttribArray(",
                        l,
                        ");",
                        f,
                        ".vertexAttrib4f(",
                        l,
                        ",",
                        p,
                        ".x,",
                        p,
                        ".y,",
                        p,
                        ".z,",
                        p,
                        ".w);",
                        p,
                        ".buffer=null;"
                      ),
                      n(h),
                      $ &&
                        n(
                          o,
                          ".vertexAttribDivisorANGLE(",
                          l,
                          ",",
                          p,
                          ".divisor);"
                        );
                  }
                  return (
                    Object.keys(ie).forEach(function(r) {
                      var a = ie[r],
                        o = i.def(u, ".", r),
                        s = e.block();
                      s(
                        "if(",
                        o,
                        "){",
                        f,
                        ".enable(",
                        a,
                        ")}else{",
                        f,
                        ".disable(",
                        a,
                        ")}",
                        c,
                        ".",
                        r,
                        "=",
                        o,
                        ";"
                      ),
                        n(s),
                        t("if(", o, "!==", c, ".", r, "){", s, "}");
                    }),
                    Object.keys(ae).forEach(function(r) {
                      var o,
                        s,
                        l = ae[r],
                        p = ee[r],
                        h = e.block();
                      h(f, ".", l, "("),
                        g(p)
                          ? ((l = p.length),
                            (o = e.global.def(u, ".", r)),
                            (s = e.global.def(c, ".", r)),
                            h(
                              a(l, function(e) {
                                return o + "[" + e + "]";
                              }),
                              ");",
                              a(l, function(e) {
                                return s + "[" + e + "]=" + o + "[" + e + "];";
                              }).join("")
                            ),
                            t(
                              "if(",
                              a(l, function(e) {
                                return o + "[" + e + "]!==" + s + "[" + e + "]";
                              }).join("||"),
                              "){",
                              h,
                              "}"
                            ))
                          : ((o = i.def(u, ".", r)),
                            (s = i.def(c, ".", r)),
                            h(o, ");", c, ".", r, "=", o, ";"),
                            t("if(", o, "!==", s, "){", h, "}")),
                        n(h);
                    }),
                    e.compile()
                  );
                })(),
                compile: function(e, t, n, r, i) {
                  var a = x();
                  return (
                    (a.stats = a.link(i)),
                    Object.keys(t.static).forEach(function(e) {
                      Y(a, t, e);
                    }),
                    we.forEach(function(t) {
                      Y(a, e, t);
                    }),
                    (n = T(e, t, n, r)),
                    (function(e, t) {
                      var n = e.proc("draw", 1);
                      j(e, n),
                        E(e, n, t.context),
                        D(e, n, t.framebuffer),
                        C(e, n, t),
                        S(e, n, t.state),
                        B(e, n, t, !1, !0);
                      var r = t.shader.progVar.append(e, n);
                      if (
                        (n(e.shared.gl, ".useProgram(", r, ".program);"),
                        t.shader.program)
                      )
                        q(e, n, t, t.shader.program);
                      else {
                        var i = e.global.def("{}"),
                          a = n.def(r, ".id"),
                          o = n.def(i, "[", a, "]");
                        n(
                          e
                            .cond(o)
                            .then(o, ".call(this,a0);")
                            .else(
                              o,
                              "=",
                              i,
                              "[",
                              a,
                              "]=",
                              e.link(function(n) {
                                return W(q, e, t, n, 1);
                              }),
                              "(",
                              r,
                              ");",
                              o,
                              ".call(this,a0);"
                            )
                        );
                      }
                      0 < Object.keys(t.state).length &&
                        n(e.shared.current, ".dirty=true;");
                    })(a, n),
                    V(a, n),
                    (function(e, t) {
                      function n(e) {
                        return (e.contextDep && i) || e.propDep;
                      }
                      var r = e.proc("batch", 2);
                      (e.batchId = "0"), j(e, r);
                      var i = !1,
                        a = !0;
                      Object.keys(t.context).forEach(function(e) {
                        i = i || t.context[e].propDep;
                      }),
                        i || (E(e, r, t.context), (a = !1));
                      var o = !1;
                      if (
                        ((s = t.framebuffer)
                          ? (s.propDep
                              ? (i = o = !0)
                              : s.contextDep && i && (o = !0),
                            o || D(e, r, s))
                          : D(e, r, null),
                        t.state.viewport &&
                          t.state.viewport.propDep &&
                          (i = !0),
                        C(e, r, t),
                        S(e, r, t.state, function(e) {
                          return !n(e);
                        }),
                        (t.profile && n(t.profile)) || B(e, r, t, !1, "a1"),
                        (t.contextDep = i),
                        (t.needsContext = a),
                        (t.needsFramebuffer = o),
                        ((a = t.shader.progVar).contextDep && i) || a.propDep)
                      )
                        G(e, r, t, null);
                      else if (
                        ((a = a.append(e, r)),
                        r(e.shared.gl, ".useProgram(", a, ".program);"),
                        t.shader.program)
                      )
                        G(e, r, t, t.shader.program);
                      else {
                        var s = e.global.def("{}"),
                          f = ((o = r.def(a, ".id")), r.def(s, "[", o, "]"));
                        r(
                          e
                            .cond(f)
                            .then(f, ".call(this,a0,a1);")
                            .else(
                              f,
                              "=",
                              s,
                              "[",
                              o,
                              "]=",
                              e.link(function(n) {
                                return W(G, e, t, n, 2);
                              }),
                              "(",
                              a,
                              ");",
                              f,
                              ".call(this,a0,a1);"
                            )
                        );
                      }
                      0 < Object.keys(t.state).length &&
                        r(e.shared.current, ".dirty=true;");
                    })(a, n),
                    a.compile()
                  );
                }
              };
            }
            function L(e, t) {
              for (var n = 0; n < e.length; ++n) if (e[n] === t) return n;
              return -1;
            }
            var H = function(e, t) {
                for (var n = Object.keys(t), r = 0; r < n.length; ++r)
                  e[n[r]] = t[n[r]];
                return e;
              },
              N = 0,
              U = {
                DynamicVariable: e,
                define: function(n, r) {
                  return new e(n, t(r + ""));
                },
                isDynamic: function(t) {
                  return (
                    ("function" == typeof t && !t._reglType) || t instanceof e
                  );
                },
                unbox: function(t, n) {
                  return "function" == typeof t ? new e(0, t) : t;
                },
                accessor: t
              },
              W = {
                next:
                  "function" == typeof requestAnimationFrame
                    ? function(e) {
                        return requestAnimationFrame(e);
                      }
                    : function(e) {
                        return setTimeout(e, 16);
                      },
                cancel:
                  "function" == typeof cancelAnimationFrame
                    ? function(e) {
                        return cancelAnimationFrame(e);
                      }
                    : clearTimeout
              },
              q =
                "undefined" != typeof performance && performance.now
                  ? function() {
                      return performance.now();
                    }
                  : function() {
                      return +new Date();
                    },
              Q = s();
            Q.zero = s();
            var G = function(e, t) {
                var n = 1;
                t.ext_texture_filter_anisotropic && (n = e.getParameter(34047));
                var r = 1,
                  i = 1;
                t.webgl_draw_buffers &&
                  ((r = e.getParameter(34852)), (i = e.getParameter(36063)));
                var a = !!t.oes_texture_float;
                if (a) {
                  (a = e.createTexture()),
                    e.bindTexture(3553, a),
                    e.texImage2D(3553, 0, 6408, 1, 1, 0, 6408, 5126, null);
                  var o = e.createFramebuffer();
                  if (
                    (e.bindFramebuffer(36160, o),
                    e.framebufferTexture2D(36160, 36064, 3553, a, 0),
                    e.bindTexture(3553, null),
                    36053 !== e.checkFramebufferStatus(36160))
                  )
                    a = !1;
                  else {
                    e.viewport(0, 0, 1, 1),
                      e.clearColor(1, 0, 0, 1),
                      e.clear(16384);
                    var s = Q.allocType(5126, 4);
                    e.readPixels(0, 0, 1, 1, 6408, 5126, s),
                      e.getError()
                        ? (a = !1)
                        : (e.deleteFramebuffer(o),
                          e.deleteTexture(a),
                          (a = 1 === s[0])),
                      Q.freeType(s);
                  }
                }
                return (
                  (s = !0),
                  ("undefined" != typeof navigator &&
                    (/MSIE/.test(navigator.userAgent) ||
                      /Trident\//.test(navigator.appVersion) ||
                      /Edge/.test(navigator.userAgent))) ||
                    ((s = e.createTexture()),
                    (o = Q.allocType(5121, 36)),
                    e.activeTexture(33984),
                    e.bindTexture(34067, s),
                    e.texImage2D(34069, 0, 6408, 3, 3, 0, 6408, 5121, o),
                    Q.freeType(o),
                    e.bindTexture(34067, null),
                    e.deleteTexture(s),
                    (s = !e.getError())),
                  {
                    colorBits: [
                      e.getParameter(3410),
                      e.getParameter(3411),
                      e.getParameter(3412),
                      e.getParameter(3413)
                    ],
                    depthBits: e.getParameter(3414),
                    stencilBits: e.getParameter(3415),
                    subpixelBits: e.getParameter(3408),
                    extensions: Object.keys(t).filter(function(e) {
                      return !!t[e];
                    }),
                    maxAnisotropic: n,
                    maxDrawbuffers: r,
                    maxColorAttachments: i,
                    pointSizeDims: e.getParameter(33901),
                    lineWidthDims: e.getParameter(33902),
                    maxViewportDims: e.getParameter(3386),
                    maxCombinedTextureUnits: e.getParameter(35661),
                    maxCubeMapSize: e.getParameter(34076),
                    maxRenderbufferSize: e.getParameter(34024),
                    maxTextureUnits: e.getParameter(34930),
                    maxTextureSize: e.getParameter(3379),
                    maxAttributes: e.getParameter(34921),
                    maxVertexUniforms: e.getParameter(36347),
                    maxVertexTextureUnits: e.getParameter(35660),
                    maxVaryingVectors: e.getParameter(36348),
                    maxFragmentUniforms: e.getParameter(36349),
                    glsl: e.getParameter(35724),
                    renderer: e.getParameter(7937),
                    vendor: e.getParameter(7936),
                    version: e.getParameter(7938),
                    readFloat: a,
                    npotTextureCube: s
                  }
                );
              },
              V = function(e) {
                return (
                  e instanceof Uint8Array ||
                  e instanceof Uint16Array ||
                  e instanceof Uint32Array ||
                  e instanceof Int8Array ||
                  e instanceof Int16Array ||
                  e instanceof Int32Array ||
                  e instanceof Float32Array ||
                  e instanceof Float64Array ||
                  e instanceof Uint8ClampedArray
                );
              },
              Y = function(e) {
                return Object.keys(e).map(function(t) {
                  return e[t];
                });
              },
              K = {
                shape: function(e) {
                  for (var t = []; e.length; e = e[0]) t.push(e.length);
                  return t;
                },
                flatten: function(e, t, n, r) {
                  var i = 1;
                  if (t.length) for (var a = 0; a < t.length; ++a) i *= t[a];
                  else i = 0;
                  switch (((n = r || Q.allocType(n, i)), t.length)) {
                    case 0:
                      break;
                    case 1:
                      for (r = t[0], t = 0; t < r; ++t) n[t] = e[t];
                      break;
                    case 2:
                      for (r = t[0], t = t[1], a = i = 0; a < r; ++a)
                        for (var o = e[a], s = 0; s < t; ++s) n[i++] = o[s];
                      break;
                    case 3:
                      u(e, t[0], t[1], t[2], n, 0);
                      break;
                    default:
                      !(function e(t, n, r, i, a) {
                        for (var o = 1, s = r + 1; s < n.length; ++s) o *= n[s];
                        var f = n[r];
                        if (4 == n.length - r) {
                          var c = n[r + 1],
                            l = n[r + 2];
                          for (n = n[r + 3], s = 0; s < f; ++s)
                            u(t[s], c, l, n, i, a), (a += o);
                        } else
                          for (s = 0; s < f; ++s)
                            e(t[s], n, r + 1, i, a), (a += o);
                      })(e, t, 0, n, 0);
                  }
                  return n;
                }
              },
              X = {
                "[object Int8Array]": 5120,
                "[object Int16Array]": 5122,
                "[object Int32Array]": 5124,
                "[object Uint8Array]": 5121,
                "[object Uint8ClampedArray]": 5121,
                "[object Uint16Array]": 5123,
                "[object Uint32Array]": 5125,
                "[object Float32Array]": 5126,
                "[object Float64Array]": 5121,
                "[object ArrayBuffer]": 5121
              },
              J = {
                int8: 5120,
                int16: 5122,
                int32: 5124,
                uint8: 5121,
                uint16: 5123,
                uint32: 5125,
                float: 5126,
                float32: 5126
              },
              $ = { dynamic: 35048, stream: 35040, static: 35044 },
              Z = K.flatten,
              ee = K.shape,
              te = [];
            (te[5120] = 1),
              (te[5122] = 2),
              (te[5124] = 4),
              (te[5121] = 1),
              (te[5123] = 2),
              (te[5125] = 4),
              (te[5126] = 4);
            var ne = {
                points: 0,
                point: 0,
                lines: 1,
                line: 1,
                triangles: 4,
                triangle: 4,
                "line loop": 2,
                "line strip": 3,
                "triangle strip": 5,
                "triangle fan": 6
              },
              re = new Float32Array(1),
              ie = new Uint32Array(re.buffer),
              ae = [9984, 9986, 9985, 9987],
              oe = [0, 6409, 6410, 6407, 6408],
              se = {};
            (se[6409] = se[6406] = se[6402] = 1),
              (se[34041] = se[6410] = 2),
              (se[6407] = se[35904] = 3),
              (se[6408] = se[35906] = 4);
            var fe = y("HTMLCanvasElement"),
              ue = y("CanvasRenderingContext2D"),
              ce = y("ImageBitmap"),
              le = y("HTMLImageElement"),
              pe = y("HTMLVideoElement"),
              he = Object.keys(X).concat([fe, ue, ce, le, pe]),
              de = [];
            (de[5121] = 1),
              (de[5126] = 4),
              (de[36193] = 2),
              (de[5123] = 2),
              (de[5125] = 4);
            var me = [];
            (me[32854] = 2),
              (me[32855] = 2),
              (me[36194] = 2),
              (me[34041] = 4),
              (me[33776] = 0.5),
              (me[33777] = 0.5),
              (me[33778] = 1),
              (me[33779] = 1),
              (me[35986] = 0.5),
              (me[35987] = 1),
              (me[34798] = 1),
              (me[35840] = 0.5),
              (me[35841] = 0.25),
              (me[35842] = 0.5),
              (me[35843] = 0.25),
              (me[36196] = 0.5);
            var ge = [];
            (ge[32854] = 2),
              (ge[32855] = 2),
              (ge[36194] = 2),
              (ge[33189] = 2),
              (ge[36168] = 1),
              (ge[34041] = 4),
              (ge[35907] = 4),
              (ge[34836] = 16),
              (ge[34842] = 8),
              (ge[34843] = 6);
            var ye = function(e, t, n, r, i) {
                function a(e) {
                  (this.id = u++),
                    (this.refCount = 1),
                    (this.renderbuffer = e),
                    (this.format = 32854),
                    (this.height = this.width = 0),
                    i.profile && (this.stats = { size: 0 });
                }
                function o(t) {
                  var n = t.renderbuffer;
                  e.bindRenderbuffer(36161, null),
                    e.deleteRenderbuffer(n),
                    (t.renderbuffer = null),
                    (t.refCount = 0),
                    delete c[t.id],
                    r.renderbufferCount--;
                }
                var s = {
                  rgba4: 32854,
                  rgb565: 36194,
                  "rgb5 a1": 32855,
                  depth: 33189,
                  stencil: 36168,
                  "depth stencil": 34041
                };
                t.ext_srgb && (s.srgba = 35907),
                  t.ext_color_buffer_half_float &&
                    ((s.rgba16f = 34842), (s.rgb16f = 34843)),
                  t.webgl_color_buffer_float && (s.rgba32f = 34836);
                var f = [];
                Object.keys(s).forEach(function(e) {
                  f[s[e]] = e;
                });
                var u = 0,
                  c = {};
                return (
                  (a.prototype.decRef = function() {
                    0 >= --this.refCount && o(this);
                  }),
                  i.profile &&
                    (r.getTotalRenderbufferSize = function() {
                      var e = 0;
                      return (
                        Object.keys(c).forEach(function(t) {
                          e += c[t].stats.size;
                        }),
                        e
                      );
                    }),
                  {
                    create: function(t, n) {
                      function o(t, n) {
                        var r = 0,
                          a = 0,
                          c = 32854;
                        if (
                          ("object" == typeof t && t
                            ? ("shape" in t
                                ? ((r = 0 | (a = t.shape)[0]), (a = 0 | a[1]))
                                : ("radius" in t && (r = a = 0 | t.radius),
                                  "width" in t && (r = 0 | t.width),
                                  "height" in t && (a = 0 | t.height)),
                              "format" in t && (c = s[t.format]))
                            : "number" == typeof t
                            ? ((r = 0 | t),
                              (a = "number" == typeof n ? 0 | n : r))
                            : t || (r = a = 1),
                          r !== u.width || a !== u.height || c !== u.format)
                        )
                          return (
                            (o.width = u.width = r),
                            (o.height = u.height = a),
                            (u.format = c),
                            e.bindRenderbuffer(36161, u.renderbuffer),
                            e.renderbufferStorage(36161, c, r, a),
                            i.profile &&
                              (u.stats.size =
                                ge[u.format] * u.width * u.height),
                            (o.format = f[u.format]),
                            o
                          );
                      }
                      var u = new a(e.createRenderbuffer());
                      return (
                        (c[u.id] = u),
                        r.renderbufferCount++,
                        o(t, n),
                        (o.resize = function(t, n) {
                          var r = 0 | t,
                            a = 0 | n || r;
                          return r === u.width && a === u.height
                            ? o
                            : ((o.width = u.width = r),
                              (o.height = u.height = a),
                              e.bindRenderbuffer(36161, u.renderbuffer),
                              e.renderbufferStorage(36161, u.format, r, a),
                              i.profile &&
                                (u.stats.size =
                                  ge[u.format] * u.width * u.height),
                              o);
                        }),
                        (o._reglType = "renderbuffer"),
                        (o._renderbuffer = u),
                        i.profile && (o.stats = u.stats),
                        (o.destroy = function() {
                          u.decRef();
                        }),
                        o
                      );
                    },
                    clear: function() {
                      Y(c).forEach(o);
                    },
                    restore: function() {
                      Y(c).forEach(function(t) {
                        (t.renderbuffer = e.createRenderbuffer()),
                          e.bindRenderbuffer(36161, t.renderbuffer),
                          e.renderbufferStorage(
                            36161,
                            t.format,
                            t.width,
                            t.height
                          );
                      }),
                        e.bindRenderbuffer(36161, null);
                    }
                  }
                );
              },
              ve = [];
            (ve[6408] = 4), (ve[6407] = 3);
            var be = [];
            (be[5121] = 1), (be[5126] = 4), (be[36193] = 2);
            var xe = ["x", "y", "z", "w"],
              we = "blend.func blend.equation stencil.func stencil.opFront stencil.opBack sample.coverage viewport scissor.box polygonOffset.offset".split(
                " "
              ),
              ke = {
                0: 0,
                1: 1,
                zero: 0,
                one: 1,
                "src color": 768,
                "one minus src color": 769,
                "src alpha": 770,
                "one minus src alpha": 771,
                "dst color": 774,
                "one minus dst color": 775,
                "dst alpha": 772,
                "one minus dst alpha": 773,
                "constant color": 32769,
                "one minus constant color": 32770,
                "constant alpha": 32771,
                "one minus constant alpha": 32772,
                "src alpha saturate": 776
              },
              _e = {
                never: 512,
                less: 513,
                "<": 513,
                equal: 514,
                "=": 514,
                "==": 514,
                "===": 514,
                lequal: 515,
                "<=": 515,
                greater: 516,
                ">": 516,
                notequal: 517,
                "!=": 517,
                "!==": 517,
                gequal: 518,
                ">=": 518,
                always: 519
              },
              Ae = {
                0: 0,
                zero: 0,
                keep: 7680,
                replace: 7681,
                increment: 7682,
                decrement: 7683,
                "increment wrap": 34055,
                "decrement wrap": 34056,
                invert: 5386
              },
              Te = { cw: 2304, ccw: 2305 },
              Ee = new z(!1, !1, !1, function() {});
            return function(e) {
              function t() {
                if (0 === K.length) k && k.update(), (Z = null);
                else {
                  (Z = W.next(t)), l();
                  for (var e = K.length - 1; 0 <= e; --e) {
                    var n = K[e];
                    n && n(j, null, 0);
                  }
                  g.flush(), k && k.update();
                }
              }
              function n() {
                !Z && 0 < K.length && (Z = W.next(t));
              }
              function r() {
                Z && (W.cancel(t), (Z = null));
              }
              function a(e) {
                e.preventDefault(),
                  r(),
                  X.forEach(function(e) {
                    e();
                  });
              }
              function o(e) {
                g.getError(),
                  v.restore(),
                  P.restore(),
                  O.restore(),
                  R.restore(),
                  I.restore(),
                  N.restore(),
                  k && k.restore(),
                  Q.procs.refresh(),
                  n(),
                  J.forEach(function(e) {
                    e();
                  });
              }
              function s(e) {
                function t(e) {
                  var t = {},
                    n = {};
                  return (
                    Object.keys(e).forEach(function(r) {
                      var i = e[r];
                      U.isDynamic(i) ? (n[r] = U.unbox(i, r)) : (t[r] = i);
                    }),
                    { dynamic: n, static: t }
                  );
                }
                var n = t(e.context || {}),
                  r = t(e.uniforms || {}),
                  i = t(e.attributes || {}),
                  a = t(
                    (function(e) {
                      function t(e) {
                        if (e in n) {
                          var t = n[e];
                          delete n[e],
                            Object.keys(t).forEach(function(r) {
                              n[e + "." + r] = t[r];
                            });
                        }
                      }
                      var n = H({}, e);
                      return (
                        delete n.uniforms,
                        delete n.attributes,
                        delete n.context,
                        "stencil" in n &&
                          n.stencil.op &&
                          ((n.stencil.opBack = n.stencil.opFront =
                            n.stencil.op),
                          delete n.stencil.op),
                        t("blend"),
                        t("depth"),
                        t("cull"),
                        t("stencil"),
                        t("polygonOffset"),
                        t("scissor"),
                        t("sample"),
                        n
                      );
                    })(e)
                  ),
                  o = (n = Q.compile(
                    a,
                    i,
                    r,
                    n,
                    (e = { gpuTime: 0, cpuTime: 0, count: 0 })
                  )).draw,
                  s = n.batch,
                  f = n.scope,
                  u = [];
                return H(
                  function(e, t) {
                    var n;
                    if ("function" == typeof e) return f.call(this, null, e, 0);
                    if ("function" == typeof t)
                      if ("number" == typeof e)
                        for (n = 0; n < e; ++n) f.call(this, null, t, n);
                      else {
                        if (!Array.isArray(e)) return f.call(this, e, t, 0);
                        for (n = 0; n < e.length; ++n) f.call(this, e[n], t, n);
                      }
                    else if ("number" == typeof e) {
                      if (0 < e)
                        return s.call(
                          this,
                          (function(e) {
                            for (; u.length < e; ) u.push(null);
                            return u;
                          })(0 | e),
                          0 | e
                        );
                    } else {
                      if (!Array.isArray(e)) return o.call(this, e);
                      if (e.length) return s.call(this, e, e.length);
                    }
                  },
                  { stats: e }
                );
              }
              function f(e, t) {
                var n = 0;
                Q.procs.poll();
                var r = t.color;
                r &&
                  (g.clearColor(+r[0] || 0, +r[1] || 0, +r[2] || 0, +r[3] || 0),
                  (n |= 16384)),
                  "depth" in t && (g.clearDepth(+t.depth), (n |= 256)),
                  "stencil" in t &&
                    (g.clearStencil(0 | t.stencil), (n |= 1024)),
                  g.clear(n);
              }
              function u(e) {
                return (
                  K.push(e),
                  n(),
                  {
                    cancel: function() {
                      var t = L(K, e);
                      K[t] = function e() {
                        var t = L(K, e);
                        (K[t] = K[K.length - 1]),
                          --K.length,
                          0 >= K.length && r();
                      };
                    }
                  }
                );
              }
              function c() {
                var e = V.viewport,
                  t = V.scissor_box;
                (e[0] = e[1] = t[0] = t[1] = 0),
                  (j.viewportWidth = j.framebufferWidth = j.drawingBufferWidth = e[2] = t[2] =
                    g.drawingBufferWidth),
                  (j.viewportHeight = j.framebufferHeight = j.drawingBufferHeight = e[3] = t[3] =
                    g.drawingBufferHeight);
              }
              function l() {
                (j.tick += 1), (j.time = m()), c(), Q.procs.poll();
              }
              function p() {
                c(), Q.procs.refresh(), k && k.update();
              }
              function m() {
                return (q() - _) / 1e3;
              }
              if (!(e = i(e))) return null;
              var g = e.gl,
                y = g.getContextAttributes();
              g.isContextLost();
              var v = (function(e, t) {
                function n(t) {
                  var n;
                  t = t.toLowerCase();
                  try {
                    n = r[t] = e.getExtension(t);
                  } catch (e) {}
                  return !!n;
                }
                for (var r = {}, i = 0; i < t.extensions.length; ++i) {
                  var a = t.extensions[i];
                  if (!n(a))
                    return (
                      t.onDestroy(),
                      t.onDone(
                        '"' +
                          a +
                          '" extension is not supported by the current WebGL context, try upgrading your system or a different browser'
                      ),
                      null
                    );
                }
                return (
                  t.optionalExtensions.forEach(n),
                  {
                    extensions: r,
                    restore: function() {
                      Object.keys(r).forEach(function(e) {
                        if (r[e] && !n(e))
                          throw Error("(regl): error restoring extension " + e);
                      });
                    }
                  }
                );
              })(g, e);
              if (!v) return null;
              var b = (function() {
                  var e = { "": 0 },
                    t = [""];
                  return {
                    id: function(n) {
                      var r = e[n];
                      return r || ((r = e[n] = t.length), t.push(n), r);
                    },
                    str: function(e) {
                      return t[e];
                    }
                  };
                })(),
                x = {
                  bufferCount: 0,
                  elementsCount: 0,
                  framebufferCount: 0,
                  shaderCount: 0,
                  textureCount: 0,
                  cubeCount: 0,
                  renderbufferCount: 0,
                  maxTextureUnits: 0
                },
                w = v.extensions,
                k = (function(e, t) {
                  function n() {
                    (this.endQueryIndex = this.startQueryIndex = -1),
                      (this.sum = 0),
                      (this.stats = null);
                  }
                  function r(e, t, r) {
                    var i = o.pop() || new n();
                    (i.startQueryIndex = e),
                      (i.endQueryIndex = t),
                      (i.sum = 0),
                      (i.stats = r),
                      s.push(i);
                  }
                  if (!t.ext_disjoint_timer_query) return null;
                  var i = [],
                    a = [],
                    o = [],
                    s = [],
                    f = [],
                    u = [];
                  return {
                    beginQuery: function(e) {
                      var n =
                        i.pop() || t.ext_disjoint_timer_query.createQueryEXT();
                      t.ext_disjoint_timer_query.beginQueryEXT(35007, n),
                        a.push(n),
                        r(a.length - 1, a.length, e);
                    },
                    endQuery: function() {
                      t.ext_disjoint_timer_query.endQueryEXT(35007);
                    },
                    pushScopeStats: r,
                    update: function() {
                      var e, n;
                      if (0 !== (e = a.length)) {
                        (u.length = Math.max(u.length, e + 1)),
                          (f.length = Math.max(f.length, e + 1)),
                          (f[0] = 0);
                        var r = (u[0] = 0);
                        for (n = e = 0; n < a.length; ++n)
                          t.ext_disjoint_timer_query.getQueryObjectEXT(
                            (c = a[n]),
                            34919
                          )
                            ? ((r += t.ext_disjoint_timer_query.getQueryObjectEXT(
                                c,
                                34918
                              )),
                              i.push(c))
                            : (a[e++] = c),
                            (f[n + 1] = r),
                            (u[n + 1] = e);
                        for (a.length = e, n = e = 0; n < s.length; ++n) {
                          var c,
                            l = (r = s[n]).startQueryIndex;
                          (r.sum += f[(c = r.endQueryIndex)] - f[l]),
                            (c = u[c]) === (l = u[l])
                              ? ((r.stats.gpuTime += r.sum / 1e6), o.push(r))
                              : ((r.startQueryIndex = l),
                                (r.endQueryIndex = c),
                                (s[e++] = r));
                        }
                        s.length = e;
                      }
                    },
                    getNumPendingQueries: function() {
                      return a.length;
                    },
                    clear: function() {
                      i.push.apply(i, a);
                      for (var e = 0; e < i.length; e++)
                        t.ext_disjoint_timer_query.deleteQueryEXT(i[e]);
                      (a.length = 0), (i.length = 0);
                    },
                    restore: function() {
                      (a.length = 0), (i.length = 0);
                    }
                  };
                })(0, w),
                _ = q(),
                S = g.drawingBufferHeight,
                j = {
                  tick: 0,
                  time: 0,
                  viewportWidth: (F = g.drawingBufferWidth),
                  viewportHeight: S,
                  framebufferWidth: F,
                  framebufferHeight: S,
                  drawingBufferWidth: F,
                  drawingBufferHeight: S,
                  pixelRatio: e.pixelRatio
                },
                M = G(g, w),
                F = (function(e, t, n, r) {
                  for (e = n.maxAttributes, t = Array(e), n = 0; n < e; ++n)
                    t[n] = new E();
                  return { Record: E, scope: {}, state: t };
                })(g, w, M),
                O = h(g, x, e, F),
                z = d(g, w, O, x),
                P = D(g, b, x, e),
                R = A(
                  g,
                  w,
                  M,
                  function() {
                    Q.procs.poll();
                  },
                  j,
                  x,
                  e
                ),
                I = ye(g, w, 0, x, e),
                N = T(g, w, M, R, I, x),
                Q = B(
                  g,
                  b,
                  w,
                  M,
                  O,
                  z,
                  0,
                  N,
                  {},
                  F,
                  P,
                  {
                    elements: null,
                    primitive: 4,
                    count: -1,
                    offset: 0,
                    instances: -1
                  },
                  j,
                  k,
                  e
                ),
                V = ((b = C(g, N, Q.procs.poll, j)), Q.next),
                Y = g.canvas,
                K = [],
                X = [],
                J = [],
                $ = [e.onDestroy],
                Z = null;
              Y &&
                (Y.addEventListener("webglcontextlost", a, !1),
                Y.addEventListener("webglcontextrestored", o, !1));
              var ee = (N.setFBO = s({
                framebuffer: U.define.call(null, 1, "framebuffer")
              }));
              return (
                p(),
                (y = H(s, {
                  clear: function(e) {
                    if ("framebuffer" in e)
                      if (
                        e.framebuffer &&
                        "framebufferCube" === e.framebuffer_reglType
                      )
                        for (var t = 0; 6 > t; ++t)
                          ee(H({ framebuffer: e.framebuffer.faces[t] }, e), f);
                      else ee(e, f);
                    else f(0, e);
                  },
                  prop: U.define.bind(null, 1),
                  context: U.define.bind(null, 2),
                  this: U.define.bind(null, 3),
                  draw: s({}),
                  buffer: function(e) {
                    return O.create(e, 34962, !1, !1);
                  },
                  elements: function(e) {
                    return z.create(e, !1);
                  },
                  texture: R.create2D,
                  cube: R.createCube,
                  renderbuffer: I.create,
                  framebuffer: N.create,
                  framebufferCube: N.createCube,
                  attributes: y,
                  frame: u,
                  on: function(e, t) {
                    var n;
                    switch (e) {
                      case "frame":
                        return u(t);
                      case "lost":
                        n = X;
                        break;
                      case "restore":
                        n = J;
                        break;
                      case "destroy":
                        n = $;
                    }
                    return (
                      n.push(t),
                      {
                        cancel: function() {
                          for (var e = 0; e < n.length; ++e)
                            if (n[e] === t) {
                              (n[e] = n[n.length - 1]), n.pop();
                              break;
                            }
                        }
                      }
                    );
                  },
                  limits: M,
                  hasExtension: function(e) {
                    return 0 <= M.extensions.indexOf(e.toLowerCase());
                  },
                  read: b,
                  destroy: function() {
                    (K.length = 0),
                      r(),
                      Y &&
                        (Y.removeEventListener("webglcontextlost", a),
                        Y.removeEventListener("webglcontextrestored", o)),
                      P.clear(),
                      N.clear(),
                      I.clear(),
                      R.clear(),
                      z.clear(),
                      O.clear(),
                      k && k.clear(),
                      $.forEach(function(e) {
                        e();
                      });
                  },
                  _gl: g,
                  _refresh: p,
                  poll: function() {
                    l(), k && k.update();
                  },
                  now: m,
                  stats: x
                })),
                e.onDone(null, y),
                y
              );
            };
          }),
          "object" == typeof n && void 0 !== t
            ? (t.exports = i())
            : "function" == typeof define && define.amd
            ? define(i)
            : (r.createREGL = i());
      },
      {}
    ],
    11: [
      function(e, t, n) {
        const r = e("canvas-sketch"),
          i = e("canvas-sketch-util/shader"),
          a = e("glslify")([
            "\n  precision mediump float;\n#define GLSLIFY 1\n\n  \n  uniform float time;\n  uniform float aspect;\n\n  varying vec2 vUv;\n\n  #define PI 3.14159265359\n\n  //\n// Description : Array and textureless GLSL 2D/3D/4D simplex\n//               noise functions.\n//      Author : Ian McEwan, Ashima Arts.\n//  Maintainer : ijm\n//     Lastmod : 20110822 (ijm)\n//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.\n//               Distributed under the MIT License. See LICENSE file.\n//               https://github.com/ashima/webgl-noise\n//\n\nvec3 mod289(vec3 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 mod289(vec4 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 permute(vec4 x) {\n     return mod289(((x*34.0)+1.0)*x);\n}\n\nvec4 taylorInvSqrt(vec4 r)\n{\n  return 1.79284291400159 - 0.85373472095314 * r;\n}\n\nfloat snoise(vec3 v)\n  {\n  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;\n  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);\n\n// First corner\n  vec3 i  = floor(v + dot(v, C.yyy) );\n  vec3 x0 =   v - i + dot(i, C.xxx) ;\n\n// Other corners\n  vec3 g_0 = step(x0.yzx, x0.xyz);\n  vec3 l = 1.0 - g_0;\n  vec3 i1 = min( g_0.xyz, l.zxy );\n  vec3 i2 = max( g_0.xyz, l.zxy );\n\n  //   x0 = x0 - 0.0 + 0.0 * C.xxx;\n  //   x1 = x0 - i1  + 1.0 * C.xxx;\n  //   x2 = x0 - i2  + 2.0 * C.xxx;\n  //   x3 = x0 - 1.0 + 3.0 * C.xxx;\n  vec3 x1 = x0 - i1 + C.xxx;\n  vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y\n  vec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y\n\n// Permutations\n  i = mod289(i);\n  vec4 p = permute( permute( permute(\n             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))\n           + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))\n           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));\n\n// Gradients: 7x7 points over a square, mapped onto an octahedron.\n// The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)\n  float n_ = 0.142857142857; // 1.0/7.0\n  vec3  ns = n_ * D.wyz - D.xzx;\n\n  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)\n\n  vec4 x_ = floor(j * ns.z);\n  vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)\n\n  vec4 x = x_ *ns.x + ns.yyyy;\n  vec4 y = y_ *ns.x + ns.yyyy;\n  vec4 h = 1.0 - abs(x) - abs(y);\n\n  vec4 b0 = vec4( x.xy, y.xy );\n  vec4 b1 = vec4( x.zw, y.zw );\n\n  //vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;\n  //vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;\n  vec4 s0 = floor(b0)*2.0 + 1.0;\n  vec4 s1 = floor(b1)*2.0 + 1.0;\n  vec4 sh = -step(h, vec4(0.0));\n\n  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;\n  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;\n\n  vec3 p0 = vec3(a0.xy,h.x);\n  vec3 p1 = vec3(a0.zw,h.y);\n  vec3 p2 = vec3(a1.xy,h.z);\n  vec3 p3 = vec3(a1.zw,h.w);\n\n//Normalise gradients\n  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));\n  p0 *= norm.x;\n  p1 *= norm.y;\n  p2 *= norm.z;\n  p3 *= norm.w;\n\n// Mix final noise value\n  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);\n  m = m * m;\n  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),\n                                dot(p2,x2), dot(p3,x3) ) );\n  }\n\n  float hue2rgb(float f1, float f2, float hue) {\n    if (hue < 0.0)\n        hue += 1.0;\n    else if (hue > 1.0)\n        hue -= 1.0;\n    float res;\n    if ((6.0 * hue) < 1.0)\n        res = f1 + (f2 - f1) * 6.0 * hue;\n    else if ((2.0 * hue) < 1.0)\n        res = f2;\n    else if ((3.0 * hue) < 2.0)\n        res = f1 + (f2 - f1) * ((2.0 / 3.0) - hue) * 6.0;\n    else\n        res = f1;\n    return res;\n}\n\nvec3 hsl2rgb(vec3 hsl) {\n    vec3 rgb;\n    \n    if (hsl.y == 0.0) {\n        rgb = vec3(hsl.z); // Luminance\n    } else {\n        float f2;\n        \n        if (hsl.z < 0.5)\n            f2 = hsl.z * (1.0 + hsl.y);\n        else\n            f2 = hsl.z + hsl.y - hsl.y * hsl.z;\n            \n        float f1 = 2.0 * hsl.z - f2;\n        \n        rgb.r = hue2rgb(f1, f2, hsl.x + (1.0/3.0));\n        rgb.g = hue2rgb(f1, f2, hsl.x);\n        rgb.b = hue2rgb(f1, f2, hsl.x - (1.0/3.0));\n    }   \n    return rgb;\n}\n\nvec3 hsl2rgb(float h, float s, float l) {\n    return hsl2rgb(vec3(h, s, l));\n}\n\n  void main() {\n    vec2 center = vUv - 0.5;\n    center.x *= aspect; // resize circle based on viewport height\n\n    float dist = length(center);\n    \n    float n = snoise(vec3(center * 1.5, time * 0.05)); // floating point nr between -1 and 1\n    // noise valuse goes from -1 to 1, you can turn it to 0 to 1 space\n    float normalizedNoise = n * 0.5 + 0.5;\n\n    float radius = max(.38, sin(time * PI * .001));\n    float radius2 = .28;\n    float alpha = smoothstep(radius, radius2, dist) - smoothstep(.45, 0.099, dist);\n\n    // 50% for s + l delivers pastel colors\n    vec3 color = hsl2rgb(\n      sin(time * PI * .05) + n * 0.2,\n      0.6,\n      0.5\n    );\n    \n    gl_FragColor = vec4(color, alpha *.4);\n  }\n"
          ]);
        r(
          ({ gl: e, time: t, width: n, height: r }) => (
            console.log({ time: t, width: n, height: r }),
            i({
              clearColor: "#fcfbf8",
              gl: e,
              frag: a,
              uniforms: {
                time: ({ time: e }) => e,
                resolution: ({ width: e, height: t }) => [e, t],
                aspect: ({ width: e, height: t }) => e / t
              }
            })
          ),
          { context: "webgl", animate: !0 }
        );
      },
      { "canvas-sketch": 3, "canvas-sketch-util/shader": 2, glslify: 1 }
    ],
    12: [
      function(e, t, n) {
        (function(e) {
          e.CANVAS_SKETCH_DEFAULT_STORAGE_KEY = window.location.href;
        }.call(
          this,
          "undefined" != typeof global
            ? global
            : "undefined" != typeof self
            ? self
            : "undefined" != typeof window
            ? window
            : {}
        ));
      },
      {}
    ]
  },
  {},
  [11, 12]
);
