    var _rollbarConfig = {
        accessToken: "33e74f0e182042b0a77e26d7476d19fd",
        captureUncaught: true,
        captureUnhandledRejections: true,
        payload: {
            environment: "production"
        }
    };
    // Rollbar Snippet
    ! function(r) {
        function o(e) {
            if (n[e]) return n[e].exports;
            var t = n[e] = {
                exports: {},
                id: e,
                loaded: !1
            };
            return r[e].call(t.exports, t, t.exports, o), t.loaded = !0, t.exports
        }
        var n = {};
        return o.m = r, o.c = n, o.p = "", o(0)
    }([function(r, o, n) {
        "use strict";
        var e = n(1),
            t = n(4);
        _rollbarConfig = _rollbarConfig || {}, _rollbarConfig.rollbarJsUrl = _rollbarConfig.rollbarJsUrl || "https://cdnjs.cloudflare.com/ajax/libs/rollbar.js/2.0.1/rollbar.min.js", _rollbarConfig.async = void 0 === _rollbarConfig.async || _rollbarConfig.async;
        var a = e.setupShim(window, _rollbarConfig),
            l = t(_rollbarConfig);
        window.rollbar = e.Rollbar, a.loadFull(window, document, !_rollbarConfig.async, _rollbarConfig, l)
    }, function(r, o, n) {
        "use strict";

        function e(r) {
            return function() {
                try {
                    return r.apply(this, arguments)
                }
                catch (o) {
                    try {
                        console.error("[Rollbar]: Internal error", o)
                    }
                    catch (n) {}
                }
            }
        }

        function t(r, o) {
            this.options = r, this._rollbarOldOnError = null;
            var n = s++;
            this.shimId = function() {
                return n
            }, window && window._rollbarShims && (window._rollbarShims[n] = {
                handler: o,
                messages: []
            })
        }

        function a(r, o) {
            var n = o.globalAlias || "Rollbar";
            if ("object" == typeof r[n]) return r[n];
            r._rollbarShims = {}, r._rollbarWrappedError = null;
            var t = new p(o);
            return e(function() {
                return o.captureUncaught && (t._rollbarOldOnError = r.onerror, i.captureUncaughtExceptions(r, t), i.wrapGlobals(r, t)), o.captureUnhandledRejections && i.captureUnhandledRejections(r, t), r[n] = t, t
            })()
        }

        function l(r) {
            return e(function() {
                var o = this,
                    n = Array.prototype.slice.call(arguments, 0),
                    e = {
                        shim: o,
                        method: r,
                        args: n,
                        ts: new Date
                    };
                window._rollbarShims[this.shimId()].messages.push(e)
            })
        }
        var i = n(2),
            s = 0,
            c = n(3),
            d = function(r, o) {
                return new t(r, o)
            },
            p = c.bind(null, d);
        t.prototype.loadFull = function(r, o, n, t, a) {
            var l = function() {
                    var o;
                    if (void 0 === r._rollbarDidLoad) {
                        o = new Error("rollbar.js did not load");
                        for (var n, e, t, l, i = 0; n = r._rollbarShims[i++];)
                            for (n = n.messages || []; e = n.shift();)
                                for (t = e.args || [], i = 0; i < t.length; ++i)
                                    if (l = t[i], "function" == typeof l) {
                                        l(o);
                                        break
                                    }
                    }
                    "function" == typeof a && a(o)
                },
                i = !1,
                s = o.createElement("script"),
                c = o.getElementsByTagName("script")[0],
                d = c.parentNode;
            s.crossOrigin = "", s.src = t.rollbarJsUrl, n || (s.async = !0), s.onload = s.onreadystatechange = e(function() {
                if (!(i || this.readyState && "loaded" !== this.readyState && "complete" !== this.readyState)) {
                    s.onload = s.onreadystatechange = null;
                    try {
                        d.removeChild(s)
                    }
                    catch (r) {}
                    i = !0, l()
                }
            }), d.insertBefore(s, c)
        }, t.prototype.wrap = function(r, o) {
            try {
                var n;
                if (n = "function" == typeof o ? o : function() {
                        return o || {}
                    }, "function" != typeof r) return r;
                if (r._isWrap) return r;
                if (!r._wrapped) {
                    r._wrapped = function() {
                        try {
                            return r.apply(this, arguments)
                        }
                        catch (o) {
                            var e = o;
                            throw "string" == typeof e && (e = new String(e)), e._rollbarContext = n() || {}, e._rollbarContext._wrappedSource = r.toString(), window._rollbarWrappedError = e, e
                        }
                    }, r._wrapped._isWrap = !0;
                    for (var e in r) r.hasOwnProperty(e) && (r._wrapped[e] = r[e])
                }
                return r._wrapped
            }
            catch (t) {
                return r
            }
        };
        for (var u = "log,debug,info,warn,warning,error,critical,global,configure,handleUncaughtException,handleUnhandledRejection".split(","), f = 0; f < u.length; ++f) t.prototype[u[f]] = l(u[f]);
        r.exports = {
            setupShim: a,
            Rollbar: p
        }
    }, function(r, o) {
        "use strict";

        function n(r, o) {
            if (r) {
                var n;
                "function" == typeof o._rollbarOldOnError ? n = o._rollbarOldOnError : r.onerror && !r.onerror.belongsToRollbar && (n = r.onerror, o._rollbarOldOnError = n);
                var t = function() {
                    var t = Array.prototype.slice.call(arguments, 0);
                    e(r, o, n, t)
                };
                t.belongsToRollbar = !0, r.onerror = t
            }
        }

        function e(r, o, n, e) {
            r._rollbarWrappedError && (e[4] || (e[4] = r._rollbarWrappedError), e[5] || (e[5] = r._rollbarWrappedError._rollbarContext), r._rollbarWrappedError = null), o.handleUncaughtException.apply(o, e), n && n.apply(r, e)
        }

        function t(r, o) {
            if (r) {
                "function" == typeof r._rollbarURH && r.removeEventListener("unhandledrejection", r._rollbarURH);
                var n = function(r) {
                    var n = r.reason,
                        e = r.promise,
                        t = r.detail;
                    !n && t && (n = t.reason, e = t.promise), o && o.handleUnhandledRejection && o.handleUnhandledRejection(n, e)
                };
                r._rollbarURH = n, r.addEventListener("unhandledrejection", n)
            }
        }

        function a(r, o) {
            if (r) {
                var n, e, t = "EventTarget,Window,Node,ApplicationCache,AudioTrackList,ChannelMergerNode,CryptoOperation,EventSource,FileReader,HTMLUnknownElement,IDBDatabase,IDBRequest,IDBTransaction,KeyOperation,MediaController,MessagePort,ModalWindow,Notification,SVGElementInstance,Screen,TextTrack,TextTrackCue,TextTrackList,WebSocket,WebSocketWorker,Worker,XMLHttpRequest,XMLHttpRequestEventTarget,XMLHttpRequestUpload".split(",");
                for (n = 0; n < t.length; ++n) e = t[n], r[e] && r[e].prototype && l(o, r[e].prototype)
            }
        }

        function l(r, o) {
            if (o.hasOwnProperty && o.hasOwnProperty("addEventListener")) {
                var n = o.addEventListener;
                n._rollbarOldAdd && (n = n._rollbarOldAdd);
                var e = function(o, e, t) {
                    n.call(this, o, r.wrap(e), t)
                };
                e._rollbarOldAdd = n, o.addEventListener = e;
                var t = o.removeEventListener;
                t._rollbarOldRemove && (t = t._rollbarOldRemove);
                var a = function(r, o, n) {
                    t.call(this, r, o && o._wrapped || o, n)
                };
                a._rollbarOldRemove = t, o.removeEventListener = a
            }
        }
        r.exports = {
            captureUncaughtExceptions: n,
            captureUnhandledRejections: t,
            wrapGlobals: a
        }
    }, function(r, o) {
        "use strict";

        function n(r, o) {
            this.impl = r(o, this), this.options = o, e(n.prototype)
        }

        function e(r) {
            for (var o = function(r) {
                    return function() {
                        var o = Array.prototype.slice.call(arguments, 0);
                        if (this.impl[r]) return this.impl[r].apply(this.impl, o)
                    }
                }, n = "log,debug,info,warn,warning,error,critical,global,configure,handleUncaughtException,handleUnhandledRejection,_createItem,wrap,loadFull,shimId".split(","), e = 0; e < n.length; e++) r[n[e]] = o(n[e])
        }
        n.prototype._swapAndProcessMessages = function(r, o) {
            this.impl = r(this.options);
            for (var n, e, t; n = o.shift();) e = n.method, t = n.args, this[e] && "function" == typeof this[e] && this[e].apply(this, t);
            return this
        }, r.exports = n
    }, function(r, o) {
        "use strict";
        r.exports = function(r) {
            return function(o) {
                if (!o && !window._rollbarInitialized) {
                    r = r || {};
                    for (var n, e, t = r.globalAlias || "Rollbar", a = window.rollbar, l = function(r) {
                            return new a(r)
                        }, i = 0; n = window._rollbarShims[i++];) e || (e = n.handler), n.handler._swapAndProcessMessages(l, n.messages);
                    window[t] = e, window._rollbarInitialized = !0
                }
            }
        }
    }]);
    // End Rollbar Snippet
