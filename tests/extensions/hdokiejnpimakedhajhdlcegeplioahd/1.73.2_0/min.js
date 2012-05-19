(function() {
    function Y(a, b) {
        b.src ? c.ajax({
            url: b.src,
            async: false,
            dataType: "script"
        }) : c.globalEval(b.text || b.textContent || b.innerHTML || "");
        b.parentNode && b.parentNode.removeChild(b)
    }
    function G(a, b) {
        return a[0] && parseInt(c.curCSS(a[0], b, true), 10) || 0
    }
    function L() {
        return false
    }
    function M() {
        return true
    }
    function O(a) {
        var b = RegExp("(^|\\.)" + a.type + "(\\.|$)"),
            d = true,
            f = [];
        c.each(c.data(this, "events").live || [], function(h, i) {
            if (b.test(i.type)) {
                var n = c(a.target).closest(i.data)[0];
                n && f.push({
                    elem: n,
                    fn: i
                })
            }
        });
        f.sort(function(h, i) {
            return c.data(h.elem, "closest") - c.data(i.elem, "closest")
        });
        c.each(f, function() {
            if (this.fn.call(this.elem, a, this.fn.data) === false) return d = false
        });
        return d
    }
    function P(a, b) {
        return ["live", a, b.replace(/\./g, "`").replace(/ /g, "|")].join(".")
    }
    function Q() {
        if (!R) {
            R = true;
            if (document.addEventListener) document.addEventListener("DOMContentLoaded", function() {
                document.removeEventListener("DOMContentLoaded", arguments.callee, false);
                c.ready()
            }, false);
            else if (document.attachEvent) {
                document.attachEvent("onreadystatechange", function() {
                    if (document.readyState === "complete") {
                        document.detachEvent("onreadystatechange", arguments.callee);
                        c.ready()
                    }
                });
                document.documentElement.doScroll && u == u.top &&
                function() {
                    if (!c.isReady) {
                        try {
                            document.documentElement.doScroll("left")
                        } catch (a) {
                            setTimeout(arguments.callee, 0);
                            return
                        }
                        c.ready()
                    }
                }()
            }
            c.event.add(u, "load", c.ready)
        }
    }
    function E(a, b) {
        var d = {};
        c.each(S.concat.apply([], S.slice(0, b)), function() {
            d[this] = a
        });
        return d
    }
    var u = this,
        Z = u.jQuery,
        $ = u.$,
        c = u.jQuery = u.$ = function(a, b) {
            return new c.fn.init(a, b)
        },
        aa = /^[^<]*(<(.|\s)+>)[^>]*$|^#([\w-]+)$/,
        ba = /^.[^:#\[\.,]*$/;
    c.fn = c.prototype = {
        init: function(a, b) {
            a = a || document;
            if (a.nodeType) {
                this[0] = a;
                this.length = 1;
                this.context = a;
                return this
            }
            if (typeof a === "string") {
                var d = aa.exec(a);
                if (d && (d[1] || !b)) if (d[1]) a = c.clean([d[1]], b);
                else {
                    var f = document.getElementById(d[3]);
                    if (f && f.id != d[3]) return c().find(a);
                    d = c(f || []);
                    d.context = document;
                    d.selector = a;
                    return d
                } else return c(b).find(a)
            } else if (c.isFunction(a)) return c(document).ready(a);
            if (a.selector && a.context) {
                this.selector = a.selector;
                this.context = a.context
            }
            return this.setArray(c.isArray(a) ? a : c.makeArray(a))
        },
        selector: "",
        jquery: "1.3.2",
        size: function() {
            return this.length
        },
        get: function(a) {
            return a === void 0 ? Array.prototype.slice.call(this) : this[a]
        },
        pushStack: function(a, b, d) {
            a = c(a);
            a.prevObject = this;
            a.context = this.context;
            if (b === "find") a.selector = this.selector + (this.selector ? " " : "") + d;
            else if (b) a.selector = this.selector + "." + b + "(" + d + ")";
            return a
        },
        setArray: function(a) {
            this.length = 0;
            Array.prototype.push.apply(this, a);
            return this
        },
        each: function(a, b) {
            return c.each(this, a, b)
        },
        index: function(a) {
            return c.inArray(a && a.jquery ? a[0] : a, this)
        },
        attr: function(a, b, d) {
            var f = a;
            if (typeof a === "string") if (b === void 0) return this[0] && c[d || "attr"](this[0], a);
            else {
                f = {};
                f[a] = b
            }
            return this.each(function(h) {
                for (a in f) c.attr(d ? this.style : this, a, c.prop(this, f[a], d, h, a))
            })
        },
        css: function(a, b) {
            if ((a == "width" || a == "height") && parseFloat(b) < 0) b = void 0;
            return this.attr(a, b, "curCSS")
        },
        text: function(a) {
            if (typeof a !== "object" && a != null) return this.empty().append((this[0] && this[0].ownerDocument || document).createTextNode(a));
            var b = "";
            c.each(a || this, function() {
                c.each(this.childNodes, function() {
                    if (this.nodeType != 8) b += this.nodeType != 1 ? this.nodeValue : c.fn.text([this])
                })
            });
            return b
        },
        wrapAll: function(a) {
            if (this[0]) {
                a = c(a, this[0].ownerDocument).clone();
                this[0].parentNode && a.insertBefore(this[0]);
                a.map(function() {
                    for (var b = this; b.firstChild;) b = b.firstChild;
                    return b
                }).append(this)
            }
            return this
        },
        wrapInner: function(a) {
            return this.each(function() {
                c(this).contents().wrapAll(a)
            })
        },
        wrap: function(a) {
            return this.each(function() {
                c(this).wrapAll(a)
            })
        },
        append: function() {
            return this.domManip(arguments, true, function(a) {
                this.nodeType == 1 && this.appendChild(a)
            })
        },
        prepend: function() {
            return this.domManip(arguments, true, function(a) {
                this.nodeType == 1 && this.insertBefore(a, this.firstChild)
            })
        },
        before: function() {
            return this.domManip(arguments, false, function(a) {
                this.parentNode.insertBefore(a, this)
            })
        },
        after: function() {
            return this.domManip(arguments, false, function(a) {
                this.parentNode.insertBefore(a, this.nextSibling)
            })
        },
        end: function() {
            return this.prevObject || c([])
        },
        push: [].push,
        sort: [].sort,
        splice: [].splice,
        find: function(a) {
            if (this.length === 1) {
                var b = this.pushStack([], "find", a);
                b.length = 0;
                c.find(a, this[0], b);
                return b
            } else return this.pushStack(c.unique(c.map(this, function(d) {
                return c.find(a, d)
            })), "find", a)
        },
        clone: function(a) {
            var b = this.map(function() {
                if (!c.support.noCloneEvent && !c.isXMLDoc(this)) {
                    var h = this.outerHTML;
                    if (!h) {
                        h = this.ownerDocument.createElement("div");
                        h.appendChild(this.cloneNode(true));
                        h = h.innerHTML
                    }
                    return c.clean([h.replace(/ jQuery\d+="(?:\d+|null)"/g, "").replace(/^\s*/, "")])[0]
                } else return this.cloneNode(true)
            });
            if (a === true) {
                var d = this.find("*").andSelf(),
                    f = 0;
                b.find("*").andSelf().each(function() {
                    if (this.nodeName === d[f].nodeName) {
                        var h = c.data(d[f], "events"),
                            i;
                        for (i in h) for (var n in h[i]) c.event.add(this, i, h[i][n], h[i][n].data);
                        f++
                    }
                })
            }
            return b
        },
        filter: function(a) {
            return this.pushStack(c.isFunction(a) && c.grep(this, function(b, d) {
                return a.call(b, d)
            }) || c.multiFilter(a, c.grep(this, function(b) {
                return b.nodeType === 1
            })), "filter", a)
        },
        closest: function(a) {
            var b = c.expr.match.POS.test(a) ? c(a) : null,
                d = 0;
            return this.map(function() {
                for (var f = this; f && f.ownerDocument;) {
                    if (b ? b.index(f) > -1 : c(f).is(a)) {
                        c.data(f, "closest", d);
                        return f
                    }
                    f = f.parentNode;
                    d++
                }
            })
        },
        not: function(a) {
            if (typeof a === "string") if (ba.test(a)) return this.pushStack(c.multiFilter(a, this, true), "not", a);
            else a = c.multiFilter(a, this);
            var b = a.length && a[a.length - 1] !== void 0 && !a.nodeType;
            return this.filter(function() {
                return b ? c.inArray(this, a) < 0 : this != a
            })
        },
        add: function(a) {
            return this.pushStack(c.unique(c.merge(this.get(), typeof a === "string" ? c(a) : c.makeArray(a))))
        },
        is: function(a) {
            return !!a && c.multiFilter(a, this).length > 0
        },
        hasClass: function(a) {
            return !!a && this.is("." + a)
        },
        val: function(a) {
            if (a === void 0) {
                var b = this[0];
                if (b) {
                    if (c.nodeName(b, "option")) return (b.attributes.value || {}).specified ? b.value : b.text;
                    if (c.nodeName(b, "select")) {
                        var d = b.selectedIndex,
                            f = [],
                            h = b.options;
                        b = b.type == "select-one";
                        if (d < 0) return null;
                        var i = b ? d : 0;
                        for (d = b ? d + 1 : h.length; i < d; i++) {
                            var n = h[i];
                            if (n.selected) {
                                a = c(n).val();
                                if (b) return a;
                                f.push(a)
                            }
                        }
                        return f
                    }
                    return (b.value || "").replace(/\r/g, "")
                }
            } else {
                if (typeof a === "number") a += "";
                return this.each(function() {
                    if (this.nodeType == 1) if (c.isArray(a) && /radio|checkbox/.test(this.type)) this.checked = c.inArray(this.value, a) >= 0 || c.inArray(this.name, a) >= 0;
                    else if (c.nodeName(this, "select")) {
                        var o = c.makeArray(a);
                        c("option", this).each(function() {
                            this.selected = c.inArray(this.value, o) >= 0 || c.inArray(this.text, o) >= 0
                        });
                        if (!o.length) this.selectedIndex = -1
                    } else this.value = a
                })
            }
        },
        html: function(a) {
            return a === void 0 ? this[0] ? this[0].innerHTML.replace(/ jQuery\d+="(?:\d+|null)"/g, "") : null : this.empty().append(a)
        },
        replaceWith: function(a) {
            return this.after(a).remove()
        },
        eq: function(a) {
            return this.slice(a, +a + 1)
        },
        slice: function() {
            return this.pushStack(Array.prototype.slice.apply(this, arguments), "slice", Array.prototype.slice.call(arguments).join(","))
        },
        map: function(a) {
            return this.pushStack(c.map(this, function(b, d) {
                return a.call(b, d, b)
            }))
        },
        andSelf: function() {
            return this.add(this.prevObject)
        },
        domManip: function(a, b, d) {
            if (this[0]) {
                var f = (this[0].ownerDocument || this[0]).createDocumentFragment();
                a = c.clean(a, this[0].ownerDocument || this[0], f);
                var h = f.firstChild;
                if (h) for (var i = 0, n = this.length; i < n; i++) d.call(b && c.nodeName(this[i], "table") && c.nodeName(h, "tr") ? this[i].getElementsByTagName("tbody")[0] || this[i].appendChild(this[i].ownerDocument.createElement("tbody")) : this[i], this.length > 1 || i > 0 ? f.cloneNode(true) : f);
                a && c.each(a, Y)
            }
            return this
        }
    };
    c.fn.init.prototype = c.fn;
    c.extend = c.fn.extend = function() {
        var a = arguments[0] || {},
            b = 1,
            d = arguments.length,
            f = false,
            h;
        if (typeof a === "boolean") {
            f = a;
            a = arguments[1] || {};
            b = 2
        }
        if (typeof a !== "object" && !c.isFunction(a)) a = {};
        if (d == b) {
            a = this;
            --b
        }
        for (; b < d; b++) if ((h = arguments[b]) != null) for (var i in h) {
            var n = a[i],
                o = h[i];
            if (a !== o) if (f && o && typeof o === "object" && !o.nodeType) a[i] = c.extend(f, n || (o.length != null ? [] : {}), o);
            else if (o !== void 0) a[i] = o
        }
        return a
    };
    var ca = /z-?index|font-?weight|opacity|zoom|line-?height/i,
        T = document.defaultView || {},
        U = Object.prototype.toString;
    c.extend({
        noConflict: function(a) {
            u.$ = $;
            if (a) u.jQuery = Z;
            return c
        },
        isFunction: function(a) {
            return U.call(a) === "[object Function]"
        },
        isArray: function(a) {
            return U.call(a) === "[object Array]"
        },
        isXMLDoc: function(a) {
            return a.nodeType === 9 && a.documentElement.nodeName !== "HTML" || !! a.ownerDocument && c.isXMLDoc(a.ownerDocument)
        },
        globalEval: function(a) {
            if (a && /\S/.test(a)) {
                var b = document.getElementsByTagName("head")[0] || document.documentElement,
                    d = document.createElement("script");
                d.type = "text/javascript";
                if (c.support.scriptEval) d.appendChild(document.createTextNode(a));
                else d.text = a;
                b.insertBefore(d, b.firstChild);
                b.removeChild(d)
            }
        },
        nodeName: function(a, b) {
            return a.nodeName && a.nodeName.toUpperCase() == b.toUpperCase()
        },
        each: function(a, b, d) {
            var f, h = 0,
                i = a.length;
            if (d) if (i === void 0) for (f in a) {
                if (b.apply(a[f], d) === false) break
            } else for (; h < i;) {
                if (b.apply(a[h++], d) === false) break
            } else if (i === void 0) for (f in a) {
                if (b.call(a[f], f, a[f]) === false) break
            } else for (d = a[0]; h < i && b.call(d, h, d) !== false; d = a[++h]);
            return a
        },
        prop: function(a, b, d, f, h) {
            if (c.isFunction(b)) b = b.call(a, f);
            return typeof b === "number" && d == "curCSS" && !ca.test(h) ? b + "px" : b
        },
        className: {
            add: function(a, b) {
                c.each((b || "").split(/\s+/), function(d, f) {
                    if (a.nodeType == 1 && !c.className.has(a.className, f)) a.className += (a.className ? " " : "") + f
                })
            },
            remove: function(a, b) {
                if (a.nodeType == 1) a.className = b !== void 0 ? c.grep(a.className.split(/\s+/), function(d) {
                    return !c.className.has(b, d)
                }).join(" ") : ""
            },
            has: function(a, b) {
                return a && c.inArray(b, (a.className || a).toString().split(/\s+/)) > -1
            }
        },
        swap: function(a, b, d) {
            var f = {},
                h;
            for (h in b) {
                f[h] = a.style[h];
                a.style[h] = b[h]
            }
            d.call(a);
            for (h in b) a.style[h] = f[h]
        },
        css: function(a, b, d, f) {
            if (b == "width" || b == "height") {
                var h;
                d = {
                    position: "absolute",
                    visibility: "hidden",
                    display: "block"
                };
                var i = b == "width" ? ["Left", "Right"] : ["Top", "Bottom"],
                    n = function() {
                        h = b == "width" ? a.offsetWidth : a.offsetHeight;
                        f !== "border" && c.each(i, function() {
                            f || (h -= parseFloat(c.curCSS(a, "padding" + this, true)) || 0);
                            if (f === "margin") h += parseFloat(c.curCSS(a, "margin" + this, true)) || 0;
                            else h -= parseFloat(c.curCSS(a, "border" + this + "Width", true)) || 0
                        })
                    };
                a.offsetWidth !== 0 ? n() : c.swap(a, d, n);
                return Math.max(0, Math.round(h))
            }
            return c.curCSS(a, b, d)
        },
        curCSS: function(a, b, d) {
            var f, h = a.style;
            if (b == "opacity" && !c.support.opacity) {
                f = c.attr(h, "opacity");
                return f == "" ? "1" : f
            }
            if (b.match(/float/i)) b = H;
            if (!d && h && h[b]) f = h[b];
            else if (T.getComputedStyle) {
                if (b.match(/float/i)) b = "float";
                b = b.replace(/([A-Z])/g, "-$1").toLowerCase();
                if (a = T.getComputedStyle(a, null)) f = a.getPropertyValue(b);
                if (b == "opacity" && f == "") f = "1"
            } else if (a.currentStyle) {
                f = b.replace(/\-(\w)/g, function(i, n) {
                    return n.toUpperCase()
                });
                f = a.currentStyle[b] || a.currentStyle[f];
                if (!/^\d+(px)?$/i.test(f) && /^\d/.test(f)) {
                    b = h.left;
                    d = a.runtimeStyle.left;
                    a.runtimeStyle.left = a.currentStyle.left;
                    h.left = f || 0;
                    f = h.pixelLeft + "px";
                    h.left = b;
                    a.runtimeStyle.left = d
                }
            }
            return f
        },
        clean: function(a, b, d) {
            b = b || document;
            if (typeof b.createElement === "undefined") b = b.ownerDocument || b[0] && b[0].ownerDocument || document;
            if (!d && a.length === 1 && typeof a[0] === "string") {
                var f = /^<(\w+)\s*\/?>$/.exec(a[0]);
                if (f) return [b.createElement(f[1])]
            }
            var h = [];
            f = [];
            var i = b.createElement("div");
            c.each(a, function(n, o) {
                if (typeof o === "number") o += "";
                if (o) {
                    if (typeof o === "string") {
                        o = o.replace(/(<(\w+)[^>]*?)\/>/g, function(x, z, r) {
                            return r.match(/^(abbr|br|col|img|input|link|meta|param|hr|area|embed)$/i) ? x : z + "></" + r + ">"
                        });
                        var s = o.replace(/^\s+/, "").substring(0, 10).toLowerCase(),
                            t = !s.indexOf("<opt") && [1, "<select multiple='multiple'>", "</select>"] || !s.indexOf("<leg") && [1, "<fieldset>", "</fieldset>"] || s.match(/^<(thead|tbody|tfoot|colg|cap)/) && [1, "<table>", "</table>"] || !s.indexOf("<tr") && [2, "<table><tbody>", "</tbody></table>"] || (!s.indexOf("<td") || !s.indexOf("<th")) && [3, "<table><tbody><tr>", "</tr></tbody></table>"] || !s.indexOf("<col") && [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"] || !c.support.htmlSerialize && [1, "div<div>", "</div>"] || [0, "", ""];
                        for (i.innerHTML = t[1] + o + t[2]; t[0]--;) i = i.lastChild;
                        if (!c.support.tbody) {
                            var v = /<tbody/i.test(o);
                            s = !s.indexOf("<table") && !v ? i.firstChild && i.firstChild.childNodes : t[1] == "<table>" && !v ? i.childNodes : [];
                            for (t = s.length - 1; t >= 0; --t) c.nodeName(s[t], "tbody") && !s[t].childNodes.length && s[t].parentNode.removeChild(s[t])
                        }!c.support.leadingWhitespace && /^\s/.test(o) && i.insertBefore(b.createTextNode(o.match(/^\s*/)[0]), i.firstChild);
                        o = c.makeArray(i.childNodes)
                    }
                    if (o.nodeType) h.push(o);
                    else h = c.merge(h, o)
                }
            });
            if (d) {
                for (a = 0; h[a]; a++) if (c.nodeName(h[a], "script") && (!h[a].type || h[a].type.toLowerCase() === "text/javascript")) f.push(h[a].parentNode ? h[a].parentNode.removeChild(h[a]) : h[a]);
                else {
                    h[a].nodeType === 1 && h.splice.apply(h, [a + 1, 0].concat(c.makeArray(h[a].getElementsByTagName("script"))));
                    d.appendChild(h[a])
                }
                return f
            }
            return h
        },
        attr: function(a, b, d) {
            if (!(!a || a.nodeType == 3 || a.nodeType == 8)) {
                var f = !c.isXMLDoc(a),
                    h = d !== void 0;
                b = f && c.props[b] || b;
                if (a.tagName) {
                    var i = /href|src|style/.test(b);
                    if (b in a && f && !i) {
                        if (h) {
                            if (b == "type" && c.nodeName(a, "input") && a.parentNode) throw "type property can't be changed";
                            a[b] = d
                        }
                        if (c.nodeName(a, "form") && a.getAttributeNode(b)) return a.getAttributeNode(b).nodeValue;
                        if (b == "tabIndex") return (b = a.getAttributeNode("tabIndex")) && b.specified ? b.value : a.nodeName.match(/(button|input|object|select|textarea)/i) ? 0 : a.nodeName.match(/^(a|area)$/i) && a.href ? 0 : void 0;
                        return a[b]
                    }
                    if (!c.support.style && f && b == "style") return c.attr(a.style, "cssText", d);
                    h && a.setAttribute(b, "" + d);
                    a = !c.support.hrefNormalized && f && i ? a.getAttribute(b, 2) : a.getAttribute(b);
                    return a === null ? void 0 : a
                }
                if (!c.support.opacity && b == "opacity") {
                    if (h) {
                        a.zoom = 1;
                        a.filter = (a.filter || "").replace(/alpha\([^)]*\)/, "") + (parseInt(d) + "" == "NaN" ? "" : "alpha(opacity=" + d * 100 + ")")
                    }
                    return a.filter && a.filter.indexOf("opacity=") >= 0 ? parseFloat(a.filter.match(/opacity=([^)]*)/)[1]) / 100 + "" : ""
                }
                b = b.replace(/-([a-z])/ig, function(n, o) {
                    return o.toUpperCase()
                });
                if (h) a[b] = d;
                return a[b]
            }
        },
        trim: function(a) {
            return (a || "").replace(/^\s+|\s+$/g, "")
        },
        makeArray: function(a) {
            var b = [];
            if (a != null) {
                var d = a.length;
                if (d == null || typeof a === "string" || c.isFunction(a) || a.setInterval) b[0] = a;
                else for (; d;) b[--d] = a[d]
            }
            return b
        },
        inArray: function(a, b) {
            for (var d = 0, f = b.length; d < f; d++) if (b[d] === a) return d;
            return -1
        },
        merge: function(a, b) {
            var d = 0,
                f, h = a.length;
            if (c.support.getAll) for (;
            (f = b[d++]) != null;) a[h++] = f;
            else for (;
            (f = b[d++]) != null;) if (f.nodeType != 8) a[h++] = f;
            return a
        },
        unique: function(a) {
            var b = [],
                d = {};
            try {
                for (var f = 0, h = a.length; f < h; f++) {
                    var i = c.data(a[f]);
                    if (!d[i]) {
                        d[i] = true;
                        b.push(a[f])
                    }
                }
            } catch (n) {
                b = a
            }
            return b
        },
        grep: function(a, b, d) {
            for (var f = [], h = 0, i = a.length; h < i; h++)!d != !b(a[h], h) && f.push(a[h]);
            return f
        },
        map: function(a, b) {
            for (var d = [], f = 0, h = a.length; f < h; f++) {
                var i = b(a[f], f);
                if (i != null) d[d.length] = i
            }
            return d.concat.apply([], d)
        }
    });
    var D = navigator.userAgent.toLowerCase();
    c.browser = {
        version: (D.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [0, "0"])[1],
        safari: /webkit/.test(D),
        opera: /opera/.test(D),
        msie: /msie/.test(D) && !/opera/.test(D),
        mozilla: /mozilla/.test(D) && !/(compatible|webkit)/.test(D)
    };
    c.each({
        parent: function(a) {
            return a.parentNode
        },
        parents: function(a) {
            return c.dir(a, "parentNode")
        },
        next: function(a) {
            return c.nth(a, 2, "nextSibling")
        },
        prev: function(a) {
            return c.nth(a, 2, "previousSibling")
        },
        nextAll: function(a) {
            return c.dir(a, "nextSibling")
        },
        prevAll: function(a) {
            return c.dir(a, "previousSibling")
        },
        siblings: function(a) {
            return c.sibling(a.parentNode.firstChild, a)
        },
        children: function(a) {
            return c.sibling(a.firstChild)
        },
        contents: function(a) {
            return c.nodeName(a, "iframe") ? a.contentDocument || a.contentWindow.document : c.makeArray(a.childNodes)
        }
    }, function(a, b) {
        c.fn[a] = function(d) {
            var f = c.map(this, b);
            if (d && typeof d == "string") f = c.multiFilter(d, f);
            return this.pushStack(c.unique(f), a, d)
        }
    });
    c.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(a, b) {
        c.fn[a] = function(d) {
            for (var f = [], h = c(d), i = 0, n = h.length; i < n; i++) {
                var o = (i > 0 ? this.clone(true) : this).get();
                c.fn[b].apply(c(h[i]), o);
                f = f.concat(o)
            }
            return this.pushStack(f, a, d)
        }
    });
    c.each({
        removeAttr: function(a) {
            c.attr(this, a, "");
            this.nodeType == 1 && this.removeAttribute(a)
        },
        addClass: function(a) {
            c.className.add(this, a)
        },
        removeClass: function(a) {
            c.className.remove(this, a)
        },
        toggleClass: function(a, b) {
            if (typeof b !== "boolean") b = !c.className.has(this, a);
            c.className[b ? "add" : "remove"](this, a)
        },
        remove: function(a) {
            if (!a || c.filter(a, [this]).length) {
                c("*", this).add([this]).each(function() {
                    c.event.remove(this);
                    c.removeData(this)
                });
                this.parentNode && this.parentNode.removeChild(this)
            }
        },
        empty: function() {
            for (c(this).children().remove(); this.firstChild;) this.removeChild(this.firstChild)
        }
    }, function(a, b) {
        c.fn[a] = function() {
            return this.each(b, arguments)
        }
    });
    var C = "jQuery" + +new Date,
        da = 0,
        V = {};
    c.extend({
        cache: {},
        data: function(a, b, d) {
            a = a == u ? V : a;
            var f = a[C];
            f || (f = a[C] = ++da);
            if (b && !c.cache[f]) c.cache[f] = {};
            if (d !== void 0) c.cache[f][b] = d;
            return b ? c.cache[f][b] : f
        },
        removeData: function(a, b) {
            a = a == u ? V : a;
            var d = a[C];
            if (b) {
                if (c.cache[d]) {
                    delete c.cache[d][b];
                    b = "";
                    for (b in c.cache[d]) break;
                    b || c.removeData(a)
                }
            } else {
                try {
                    delete a[C]
                } catch (f) {
                    a.removeAttribute && a.removeAttribute(C)
                }
                delete c.cache[d]
            }
        },
        queue: function(a, b, d) {
            if (a) {
                b = (b || "fx") + "queue";
                var f = c.data(a, b);
                if (!f || c.isArray(d)) f = c.data(a, b, c.makeArray(d));
                else d && f.push(d)
            }
            return f
        },
        dequeue: function(a, b) {
            var d = c.queue(a, b),
                f = d.shift();
            if (!b || b === "fx") f = d[0];
            f !== void 0 && f.call(a)
        }
    });
    c.fn.extend({
        data: function(a, b) {
            var d = a.split(".");
            d[1] = d[1] ? "." + d[1] : "";
            if (b === void 0) {
                var f = this.triggerHandler("getData" + d[1] + "!", [d[0]]);
                if (f === void 0 && this.length) f = c.data(this[0], a);
                return f === void 0 && d[1] ? this.data(d[0]) : f
            } else return this.trigger("setData" + d[1] + "!", [d[0], b]).each(function() {
                c.data(this, a, b)
            })
        },
        removeData: function(a) {
            return this.each(function() {
                c.removeData(this, a)
            })
        },
        queue: function(a, b) {
            if (typeof a !== "string") {
                b = a;
                a = "fx"
            }
            if (b === void 0) return c.queue(this[0], a);
            return this.each(function() {
                var d = c.queue(this, a, b);
                a == "fx" && d.length == 1 && d[0].call(this)
            })
        },
        dequeue: function(a) {
            return this.each(function() {
                c.dequeue(this, a)
            })
        }
    });
    (function() {
        function a(e, g, j, k, l, m) {
            l = e == "previousSibling" && !m;
            for (var p = 0, w = k.length; p < w; p++) {
                var q = k[p];
                if (q) {
                    if (l && q.nodeType === 1) {
                        q.sizcache = j;
                        q.sizset = p
                    }
                    q = q[e];
                    for (var y = false; q;) {
                        if (q.sizcache === j) {
                            y = k[q.sizset];
                            break
                        }
                        if (q.nodeType === 1 && !m) {
                            q.sizcache = j;
                            q.sizset = p
                        }
                        if (q.nodeName === g) {
                            y = q;
                            break
                        }
                        q = q[e]
                    }
                    k[p] = y
                }
            }
        }
        function b(e, g, j, k, l, m) {
            l = e == "previousSibling" && !m;
            for (var p = 0, w = k.length; p < w; p++) {
                var q = k[p];
                if (q) {
                    if (l && q.nodeType === 1) {
                        q.sizcache = j;
                        q.sizset = p
                    }
                    q = q[e];
                    for (var y = false; q;) {
                        if (q.sizcache === j) {
                            y = k[q.sizset];
                            break
                        }
                        if (q.nodeType === 1) {
                            if (!m) {
                                q.sizcache = j;
                                q.sizset = p
                            }
                            if (typeof g !== "string") {
                                if (q === g) {
                                    y = true;
                                    break
                                }
                            } else if (i.filter(g, [q]).length > 0) {
                                y = q;
                                break
                            }
                        }
                        q = q[e]
                    }
                    k[p] = y
                }
            }
        }
        var d = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^[\]]*\]|['"][^'"]*['"]|[^[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?/g,
            f = 0,
            h = Object.prototype.toString,
            i = function(e, g, j, k) {
                j = j || [];
                g = g || document;
                if (g.nodeType !== 1 && g.nodeType !== 9) return [];
                if (!e || typeof e !== "string") return j;
                var l = [],
                    m, p, w, q = true;
                for (d.lastIndex = 0;
                (m = d.exec(e)) !== null;) {
                    l.push(m[1]);
                    if (m[2]) {
                        w = RegExp.rightContext;
                        break
                    }
                }
                if (l.length > 1 && o.exec(e)) if (l.length === 2 && n.relative[l[0]]) m = B(l[0] + l[1], g);
                else for (m = n.relative[l[0]] ? [g] : i(l.shift(), g); l.length;) {
                    e = l.shift();
                    if (n.relative[e]) e += l.shift();
                    m = B(e, m)
                } else {
                    m = k ? {
                        expr: l.pop(),
                        set: t(k)
                    } : i.find(l.pop(), l.length === 1 && g.parentNode ? g.parentNode : g, r(g));
                    m = i.filter(m.expr, m.set);
                    if (l.length > 0) p = t(m);
                    else q = false;
                    for (; l.length;) {
                        var y = l.pop(),
                            A = y;
                        if (n.relative[y]) A = l.pop();
                        else y = "";
                        if (A == null) A = g;
                        n.relative[y](p, A, r(g))
                    }
                }
                p || (p = m);
                if (!p) throw "Syntax error, unrecognized expression: " + (y || e);
                if (h.call(p) === "[object Array]") if (q) if (g.nodeType === 1) for (e = 0; p[e] != null; e++) {
                    if (p[e] && (p[e] === true || p[e].nodeType === 1 && z(g, p[e]))) j.push(m[e])
                } else for (e = 0; p[e] != null; e++) p[e] && p[e].nodeType === 1 && j.push(m[e]);
                else j.push.apply(j, p);
                else t(p, j);
                if (w) {
                    i(w, g, j, k);
                    if (x) {
                        hasDuplicate = false;
                        j.sort(x);
                        if (hasDuplicate) for (e = 1; e < j.length; e++) j[e] === j[e - 1] && j.splice(e--, 1)
                    }
                }
                return j
            };
        i.matches = function(e, g) {
            return i(e, null, null, g)
        };
        i.find = function(e, g, j) {
            var k, l;
            if (!e) return [];
            for (var m = 0, p = n.order.length; m < p; m++) {
                var w = n.order[m];
                if (l = n.match[w].exec(e)) {
                    var q = RegExp.leftContext;
                    if (q.substr(q.length - 1) !== "\\") {
                        l[1] = (l[1] || "").replace(/\\/g, "");
                        k = n.find[w](l, g, j);
                        if (k != null) {
                            e = e.replace(n.match[w], "");
                            break
                        }
                    }
                }
            }
            k || (k = g.getElementsByTagName("*"));
            return {
                set: k,
                expr: e
            }
        };
        i.filter = function(e, g, j, k) {
            for (var l = e, m = [], p = g, w, q, y = g && g[0] && r(g[0]); e && g.length;) {
                for (var A in n.filter) if ((w = n.match[A].exec(e)) != null) {
                    var ea = n.filter[A],
                        F, I;
                    q = false;
                    if (p == m) m = [];
                    if (n.preFilter[A]) if (w = n.preFilter[A](w, p, j, m, k, y)) {
                        if (w === true) continue
                    } else q = F = true;
                    if (w) for (var J = 0;
                    (I = p[J]) != null; J++) if (I) {
                        F = ea(I, w, J, p);
                        var W = k ^ !! F;
                        if (j && F != null) if (W) q = true;
                        else p[J] = false;
                        else if (W) {
                            m.push(I);
                            q = true
                        }
                    }
                    if (F !== void 0) {
                        j || (p = m);
                        e = e.replace(n.match[A], "");
                        if (!q) return [];
                        break
                    }
                }
                if (e == l) if (q == null) throw "Syntax error, unrecognized expression: " + e;
                else break;
                l = e
            }
            return p
        };
        var n = i.selectors = {
            order: ["ID", "NAME", "TAG"],
            match: {
                ID: /#((?:[\w\u00c0-\uFFFF_-]|\\.)+)/,
                CLASS: /\.((?:[\w\u00c0-\uFFFF_-]|\\.)+)/,
                NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF_-]|\\.)+)['"]*\]/,
                ATTR: /\[\s*((?:[\w\u00c0-\uFFFF_-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,
                TAG: /^((?:[\w\u00c0-\uFFFF\*_-]|\\.)+)/,
                CHILD: /:(only|nth|last|first)-child(?:\((even|odd|[\dn+-]*)\))?/,
                POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^-]|$)/,
                PSEUDO: /:((?:[\w\u00c0-\uFFFF_-]|\\.)+)(?:\((['"]*)((?:\([^\)]+\)|[^\2\(\)]*)+)\2\))?/
            },
            attrMap: {
                "class": "className",
                "for": "htmlFor"
            },
            attrHandle: {
                href: function(e) {
                    return e.getAttribute("href")
                }
            },
            relative: {
                "+": function(e, g, j) {
                    var k = typeof g === "string",
                        l = k && !/\W/.test(g);
                    k = k && !l;
                    if (l && !j) g = g.toUpperCase();
                    j = 0;
                    l = e.length;
                    for (var m; j < l; j++) if (m = e[j]) {
                        for (;
                        (m = m.previousSibling) && m.nodeType !== 1;);
                        e[j] = k || m && m.nodeName === g ? m || false : m === g
                    }
                    k && i.filter(g, e, true)
                },
                ">": function(e, g, j) {
                    var k = typeof g === "string";
                    if (k && !/\W/.test(g)) {
                        g = j ? g : g.toUpperCase();
                        j = 0;
                        for (var l = e.length; j < l; j++) {
                            var m = e[j];
                            if (m) {
                                k = m.parentNode;
                                e[j] = k.nodeName === g ? k : false
                            }
                        }
                    } else {
                        j = 0;
                        for (l = e.length; j < l; j++) if (m = e[j]) e[j] = k ? m.parentNode : m.parentNode === g;
                        k && i.filter(g, e, true)
                    }
                },
                "": function(e, g, j) {
                    var k = f++,
                        l = b;
                    if (!g.match(/\W/)) {
                        var m = g = j ? g : g.toUpperCase();
                        l = a
                    }
                    l("parentNode", g, k, e, m, j)
                },
                "~": function(e, g, j) {
                    var k = f++,
                        l = b;
                    if (typeof g === "string" && !g.match(/\W/)) {
                        var m = g = j ? g : g.toUpperCase();
                        l = a
                    }
                    l("previousSibling", g, k, e, m, j)
                }
            },
            find: {
                ID: function(e, g, j) {
                    if (typeof g.getElementById !== "undefined" && !j) return (e = g.getElementById(e[1])) ? [e] : []
                },
                NAME: function(e, g) {
                    if (typeof g.getElementsByName !== "undefined") {
                        for (var j = [], k = g.getElementsByName(e[1]), l = 0, m = k.length; l < m; l++) k[l].getAttribute("name") === e[1] && j.push(k[l]);
                        return j.length === 0 ? null : j
                    }
                },
                TAG: function(e, g) {
                    return g.getElementsByTagName(e[1])
                }
            },
            preFilter: {
                CLASS: function(e, g, j, k, l, m) {
                    e = " " + e[1].replace(/\\/g, "") + " ";
                    if (m) return e;
                    m = 0;
                    for (var p;
                    (p = g[m]) != null; m++) if (p) if (l ^ (p.className && (" " + p.className + " ").indexOf(e) >= 0)) j || k.push(p);
                    else if (j) g[m] = false;
                    return false
                },
                ID: function(e) {
                    return e[1].replace(/\\/g, "")
                },
                TAG: function(e, g) {
                    for (var j = 0; g[j] === false; j++);
                    return g[j] && r(g[j]) ? e[1] : e[1].toUpperCase()
                },
                CHILD: function(e) {
                    if (e[1] == "nth") {
                        var g = /(-?)(\d*)n((?:\+|-)?\d*)/.exec(e[2] == "even" && "2n" || e[2] == "odd" && "2n+1" || !/\D/.test(e[2]) && "0n+" + e[2] || e[2]);
                        e[2] = g[1] + (g[2] || 1) - 0;
                        e[3] = g[3] - 0
                    }
                    e[0] = f++;
                    return e
                },
                ATTR: function(e, g, j, k, l, m) {
                    g = e[1].replace(/\\/g, "");
                    if (!m && n.attrMap[g]) e[1] = n.attrMap[g];
                    if (e[2] === "~=") e[4] = " " + e[4] + " ";
                    return e
                },
                PSEUDO: function(e, g, j, k, l) {
                    if (e[1] === "not") if (e[3].match(d).length > 1 || /^\w/.test(e[3])) e[3] = i(e[3], null, null, g);
                    else {
                        e = i.filter(e[3], g, j, true ^ l);
                        j || k.push.apply(k, e);
                        return false
                    } else if (n.match.POS.test(e[0]) || n.match.CHILD.test(e[0])) return true;
                    return e
                },
                POS: function(e) {
                    e.unshift(true);
                    return e
                }
            },
            filters: {
                enabled: function(e) {
                    return e.disabled === false && e.type !== "hidden"
                },
                disabled: function(e) {
                    return e.disabled === true
                },
                checked: function(e) {
                    return e.checked === true
                },
                selected: function(e) {
                    return e.selected === true
                },
                parent: function(e) {
                    return !!e.firstChild
                },
                empty: function(e) {
                    return !e.firstChild
                },
                has: function(e, g, j) {
                    return !!i(j[3], e).length
                },
                header: function(e) {
                    return /h\d/i.test(e.nodeName)
                },
                text: function(e) {
                    return "text" === e.type
                },
                radio: function(e) {
                    return "radio" === e.type
                },
                checkbox: function(e) {
                    return "checkbox" === e.type
                },
                file: function(e) {
                    return "file" === e.type
                },
                password: function(e) {
                    return "password" === e.type
                },
                submit: function(e) {
                    return "submit" === e.type
                },
                image: function(e) {
                    return "image" === e.type
                },
                reset: function(e) {
                    return "reset" === e.type
                },
                button: function(e) {
                    return "button" === e.type || e.nodeName.toUpperCase() === "BUTTON"
                },
                input: function(e) {
                    return /input|select|textarea|button/i.test(e.nodeName)
                }
            },
            setFilters: {
                first: function(e, g) {
                    return g === 0
                },
                last: function(e, g, j, k) {
                    return g === k.length - 1
                },
                even: function(e, g) {
                    return g % 2 === 0
                },
                odd: function(e, g) {
                    return g % 2 === 1
                },
                lt: function(e, g, j) {
                    return g < j[3] - 0
                },
                gt: function(e, g, j) {
                    return g > j[3] - 0
                },
                nth: function(e, g, j) {
                    return j[3] - 0 == g
                },
                eq: function(e, g, j) {
                    return j[3] - 0 == g
                }
            },
            filter: {
                PSEUDO: function(e, g, j, k) {
                    var l = g[1],
                        m = n.filters[l];
                    if (m) return m(e, j, g, k);
                    else if (l === "contains") return (e.textContent || e.innerText || "").indexOf(g[3]) >= 0;
                    else if (l === "not") {
                        g = g[3];
                        j = 0;
                        for (k = g.length; j < k; j++) if (g[j] === e) return false;
                        return true
                    }
                },
                CHILD: function(e, g) {
                    var j = g[1],
                        k = e;
                    switch (j) {
                    case "only":
                    case "first":
                        for (; k = k.previousSibling;) if (k.nodeType === 1) return false;
                        if (j == "first") return true;
                        k = e;
                    case "last":
                        for (; k = k.nextSibling;) if (k.nodeType === 1) return false;
                        return true;
                    case "nth":
                        j = g[2];
                        var l = g[3];
                        if (j == 1 && l == 0) return true;
                        var m = g[0],
                            p = e.parentNode;
                        if (p && (p.sizcache !== m || !e.nodeIndex)) {
                            var w = 0;
                            for (k = p.firstChild; k; k = k.nextSibling) if (k.nodeType === 1) k.nodeIndex = ++w;
                            p.sizcache = m
                        }
                        k = e.nodeIndex - l;
                        return j == 0 ? k == 0 : k % j == 0 && k / j >= 0
                    }
                },
                ID: function(e, g) {
                    return e.nodeType === 1 && e.getAttribute("id") === g
                },
                TAG: function(e, g) {
                    return g === "*" && e.nodeType === 1 || e.nodeName === g
                },
                CLASS: function(e, g) {
                    return (" " + (e.className || e.getAttribute("class")) + " ").indexOf(g) > -1
                },
                ATTR: function(e, g) {
                    var j = g[1];
                    j = n.attrHandle[j] ? n.attrHandle[j](e) : e[j] != null ? e[j] : e.getAttribute(j);
                    var k = j + "",
                        l = g[2],
                        m = g[4];
                    return j == null ? l === "!=" : l === "=" ? k === m : l === "*=" ? k.indexOf(m) >= 0 : l === "~=" ? (" " + k + " ").indexOf(m) >= 0 : !m ? k && j !== false : l === "!=" ? k != m : l === "^=" ? k.indexOf(m) === 0 : l === "$=" ? k.substr(k.length - m.length) === m : l === "|=" ? k === m || k.substr(0, m.length + 1) === m + "-" : false
                },
                POS: function(e, g, j, k) {
                    var l = n.setFilters[g[2]];
                    if (l) return l(e, j, g, k)
                }
            }
        },
            o = n.match.POS,
            s;
        for (s in n.match) n.match[s] = RegExp(n.match[s].source + /(?![^\[]*\])(?![^\(]*\))/.source);
        var t = function(e, g) {
                e = Array.prototype.slice.call(e);
                if (g) {
                    g.push.apply(g, e);
                    return g
                }
                return e
            };
        try {
            Array.prototype.slice.call(document.documentElement.childNodes)
        } catch (v) {
            t = function(e, g) {
                var j = g || [];
                if (h.call(e) === "[object Array]") Array.prototype.push.apply(j, e);
                else if (typeof e.length === "number") for (var k = 0, l = e.length; k < l; k++) j.push(e[k]);
                else for (k = 0; e[k]; k++) j.push(e[k]);
                return j
            }
        }
        var x;
        if (document.documentElement.compareDocumentPosition) x = function(e, g) {
            var j = e.compareDocumentPosition(g) & 4 ? -1 : e === g ? 0 : 1;
            if (j === 0) hasDuplicate = true;
            return j
        };
        else if ("sourceIndex" in document.documentElement) x = function(e, g) {
            var j = e.sourceIndex - g.sourceIndex;
            if (j === 0) hasDuplicate = true;
            return j
        };
        else if (document.createRange) x = function(e, g) {
            var j = e.ownerDocument.createRange(),
                k = g.ownerDocument.createRange();
            j.selectNode(e);
            j.collapse(true);
            k.selectNode(g);
            k.collapse(true);
            j = j.compareBoundaryPoints(Range.START_TO_END, k);
            if (j === 0) hasDuplicate = true;
            return j
        };
        (function() {
            var e = document.createElement("form"),
                g = "script" + (new Date).getTime();
            e.innerHTML = "<input name='" + g + "'/>";
            var j = document.documentElement;
            j.insertBefore(e, j.firstChild);
            if (document.getElementById(g)) {
                n.find.ID = function(k, l, m) {
                    if (typeof l.getElementById !== "undefined" && !m) return (l = l.getElementById(k[1])) ? l.id === k[1] || typeof l.getAttributeNode !== "undefined" && l.getAttributeNode("id").nodeValue === k[1] ? [l] : void 0 : []
                };
                n.filter.ID = function(k, l) {
                    var m = typeof k.getAttributeNode !== "undefined" && k.getAttributeNode("id");
                    return k.nodeType === 1 && m && m.nodeValue === l
                }
            }
            j.removeChild(e)
        })();
        (function() {
            var e = document.createElement("div");
            e.appendChild(document.createComment(""));
            if (e.getElementsByTagName("*").length > 0) n.find.TAG = function(g, j) {
                var k = j.getElementsByTagName(g[1]);
                if (g[1] === "*") {
                    for (var l = [], m = 0; k[m]; m++) k[m].nodeType === 1 && l.push(k[m]);
                    k = l
                }
                return k
            };
            e.innerHTML = "<a href='#'></a>";
            if (e.firstChild && typeof e.firstChild.getAttribute !== "undefined" && e.firstChild.getAttribute("href") !== "#") n.attrHandle.href = function(g) {
                return g.getAttribute("href", 2)
            }
        })();
        document.querySelectorAll &&
        function() {
            var e = i,
                g = document.createElement("div");
            g.innerHTML = "<p class='TEST'></p>";
            if (!(g.querySelectorAll && g.querySelectorAll(".TEST").length === 0)) {
                i = function(j, k, l, m) {
                    k = k || document;
                    if (!m && k.nodeType === 9 && !r(k)) try {
                        return t(k.querySelectorAll(j), l)
                    } catch (p) {}
                    return e(j, k, l, m)
                };
                i.find = e.find;
                i.filter = e.filter;
                i.selectors = e.selectors;
                i.matches = e.matches
            }
        }();
        document.getElementsByClassName && document.documentElement.getElementsByClassName &&
        function() {
            var e = document.createElement("div");
            e.innerHTML = "<div class='test e'></div><div class='test'></div>";
            if (e.getElementsByClassName("e").length !== 0) {
                e.lastChild.className = "e";
                if (e.getElementsByClassName("e").length !== 1) {
                    n.order.splice(1, 0, "CLASS");
                    n.find.CLASS = function(g, j, k) {
                        if (typeof j.getElementsByClassName !== "undefined" && !k) return j.getElementsByClassName(g[1])
                    }
                }
            }
        }();
        var z = document.compareDocumentPosition ?
        function(e, g) {
            return e.compareDocumentPosition(g) & 16
        } : function(e, g) {
            return e !== g && (e.contains ? e.contains(g) : true)
        }, r = function(e) {
            return e.nodeType === 9 && e.documentElement.nodeName !== "HTML" || !! e.ownerDocument && r(e.ownerDocument)
        }, B = function(e, g) {
            for (var j = [], k = "", l, m = g.nodeType ? [g] : g; l = n.match.PSEUDO.exec(e);) {
                k += l[0];
                e = e.replace(n.match.PSEUDO, "")
            }
            e = n.relative[e] ? e + "*" : e;
            l = 0;
            for (var p = m.length; l < p; l++) i(e, m[l], j);
            return i.filter(k, j)
        };
        c.find = i;
        c.filter = i.filter;
        c.expr = i.selectors;
        c.expr[":"] = c.expr.filters;
        i.selectors.filters.hidden = function(e) {
            return e.offsetWidth === 0 || e.offsetHeight === 0
        };
        i.selectors.filters.visible = function(e) {
            return e.offsetWidth > 0 || e.offsetHeight > 0
        };
        i.selectors.filters.animated = function(e) {
            return c.grep(c.timers, function(g) {
                return e === g.elem
            }).length
        };
        c.multiFilter = function(e, g, j) {
            if (j) e = ":not(" + e + ")";
            return i.matches(e, g)
        };
        c.dir = function(e, g) {
            for (var j = [], k = e[g]; k && k != document;) {
                k.nodeType == 1 && j.push(k);
                k = k[g]
            }
            return j
        };
        c.nth = function(e, g, j) {
            g = g || 1;
            for (var k = 0; e; e = e[j]) if (e.nodeType == 1 && ++k == g) break;
            return e
        };
        c.sibling = function(e, g) {
            for (var j = []; e; e = e.nextSibling) e.nodeType == 1 && e != g && j.push(e);
            return j
        }
    })();
    c.event = {
        add: function(a, b, d, f) {
            if (!(a.nodeType == 3 || a.nodeType == 8)) {
                if (a.setInterval && a != u) a = u;
                if (!d.guid) d.guid = this.guid++;
                if (f !== void 0) {
                    d = this.proxy(d);
                    d.data = f
                }
                var h = c.data(a, "events") || c.data(a, "events", {}),
                    i = c.data(a, "handle") || c.data(a, "handle", function() {
                        return typeof c !== "undefined" && !c.event.triggered ? c.event.handle.apply(arguments.callee.elem, arguments) : void 0
                    });
                i.elem = a;
                c.each(b.split(/\s+/), function(n, o) {
                    var s = o.split(".");
                    o = s.shift();
                    d.type = s.slice().sort().join(".");
                    var t = h[o];
                    c.event.specialAll[o] && c.event.specialAll[o].setup.call(a, f, s);
                    if (!t) {
                        t = h[o] = {};
                        if (!c.event.special[o] || c.event.special[o].setup.call(a, f, s) === false) if (a.addEventListener) a.addEventListener(o, i, false);
                        else a.attachEvent && a.attachEvent("on" + o, i)
                    }
                    t[d.guid] = d;
                    c.event.global[o] = true
                });
                a = null
            }
        },
        guid: 1,
        global: {},
        remove: function(a, b, d) {
            if (!(a.nodeType == 3 || a.nodeType == 8)) {
                var f = c.data(a, "events"),
                    h;
                if (f) {
                    if (b === void 0 || typeof b === "string" && b.charAt(0) == ".") for (var i in f) this.remove(a, i + (b || ""));
                    else {
                        if (b.type) {
                            d = b.handler;
                            b = b.type
                        }
                        c.each(b.split(/\s+/), function(n, o) {
                            var s = o.split(".");
                            o = s.shift();
                            var t = RegExp("(^|\\.)" + s.slice().sort().join(".*\\.") + "(\\.|$)");
                            if (f[o]) {
                                if (d) delete f[o][d.guid];
                                else for (var v in f[o]) t.test(f[o][v].type) && delete f[o][v];
                                c.event.specialAll[o] && c.event.specialAll[o].teardown.call(a, s);
                                for (h in f[o]) break;
                                if (!h) {
                                    if (!c.event.special[o] || c.event.special[o].teardown.call(a, s) === false) if (a.removeEventListener) a.removeEventListener(o, c.data(a, "handle"), false);
                                    else a.detachEvent && a.detachEvent("on" + o, c.data(a, "handle"));
                                    h = null;
                                    delete f[o]
                                }
                            }
                        })
                    }
                    for (h in f) break;
                    if (!h) {
                        if (b = c.data(a, "handle")) b.elem = null;
                        c.removeData(a, "events");
                        c.removeData(a, "handle")
                    }
                }
            }
        },
        trigger: function(a, b, d, f) {
            var h = a.type || a;
            if (!f) {
                a = typeof a === "object" ? a[C] ? a : c.extend(c.Event(h), a) : c.Event(h);
                if (h.indexOf("!") >= 0) {
                    a.type = h = h.slice(0, -1);
                    a.exclusive = true
                }
                if (!d) {
                    a.stopPropagation();
                    this.global[h] && c.each(c.cache, function() {
                        this.events && this.events[h] && c.event.trigger(a, b, this.handle.elem)
                    })
                }
                if (!d || d.nodeType == 3 || d.nodeType == 8) return;
                a.result = void 0;
                a.target = d;
                b = c.makeArray(b);
                b.unshift(a)
            }
            a.currentTarget = d;
            var i = c.data(d, "handle");
            i && i.apply(d, b);
            if ((!d[h] || c.nodeName(d, "a") && h == "click") && d["on" + h] && d["on" + h].apply(d, b) === false) a.result = false;
            if (!f && d[h] && !a.isDefaultPrevented() && !(c.nodeName(d, "a") && h == "click")) {
                this.triggered = true;
                try {
                    d[h]()
                } catch (n) {}
            }
            this.triggered = false;
            if (!a.isPropagationStopped())(d = d.parentNode || d.ownerDocument) && c.event.trigger(a, b, d, true)
        },
        handle: function(a) {
            var b, d;
            a = arguments[0] = c.event.fix(a || u.event);
            a.currentTarget = this;
            d = a.type.split(".");
            a.type = d.shift();
            b = !d.length && !a.exclusive;
            var f = RegExp("(^|\\.)" + d.slice().sort().join(".*\\.") + "(\\.|$)");
            d = (c.data(this, "events") || {})[a.type];
            for (var h in d) {
                var i = d[h];
                if (b || f.test(i.type)) {
                    a.handler = i;
                    a.data = i.data;
                    i = i.apply(this, arguments);
                    if (i !== void 0) {
                        a.result = i;
                        if (i === false) {
                            a.preventDefault();
                            a.stopPropagation()
                        }
                    }
                    if (a.isImmediatePropagationStopped()) break
                }
            }
        },
        props: "altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode metaKey newValue originalTarget pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" "),
        fix: function(a) {
            if (a[C]) return a;
            var b = a;
            a = c.Event(b);
            for (var d = this.props.length, f; d;) {
                f = this.props[--d];
                a[f] = b[f]
            }
            if (!a.target) a.target = a.srcElement || document;
            if (a.target.nodeType == 3) a.target = a.target.parentNode;
            if (!a.relatedTarget && a.fromElement) a.relatedTarget = a.fromElement == a.target ? a.toElement : a.fromElement;
            if (a.pageX == null && a.clientX != null) {
                b = document.documentElement;
                d = document.body;
                a.pageX = a.clientX + (b && b.scrollLeft || d && d.scrollLeft || 0) - (b.clientLeft || 0);
                a.pageY = a.clientY + (b && b.scrollTop || d && d.scrollTop || 0) - (b.clientTop || 0)
            }
            if (!a.which && (a.charCode || a.charCode === 0 ? a.charCode : a.keyCode)) a.which = a.charCode || a.keyCode;
            if (!a.metaKey && a.ctrlKey) a.metaKey = a.ctrlKey;
            if (!a.which && a.button) a.which = a.button & 1 ? 1 : a.button & 2 ? 3 : a.button & 4 ? 2 : 0;
            return a
        },
        proxy: function(a, b) {
            b = b ||
            function() {
                return a.apply(this, arguments)
            };
            b.guid = a.guid = a.guid || b.guid || this.guid++;
            return b
        },
        special: {
            ready: {
                setup: Q,
                teardown: function() {}
            }
        },
        specialAll: {
            live: {
                setup: function(a, b) {
                    c.event.add(this, b[0], O)
                },
                teardown: function(a) {
                    if (a.length) {
                        var b = 0,
                            d = RegExp("(^|\\.)" + a[0] + "(\\.|$)");
                        c.each(c.data(this, "events").live || {}, function() {
                            d.test(this.type) && b++
                        });
                        b < 1 && c.event.remove(this, a[0], O)
                    }
                }
            }
        }
    };
    c.Event = function(a) {
        if (!this.preventDefault) return new c.Event(a);
        if (a && a.type) {
            this.originalEvent = a;
            this.type = a.type
        } else this.type = a;
        this.timeStamp = +new Date;
        this[C] = true
    };
    c.Event.prototype = {
        preventDefault: function() {
            this.isDefaultPrevented = M;
            var a = this.originalEvent;
            if (a) {
                a.preventDefault && a.preventDefault();
                a.returnValue = false
            }
        },
        stopPropagation: function() {
            this.isPropagationStopped = M;
            var a = this.originalEvent;
            if (a) {
                a.stopPropagation && a.stopPropagation();
                a.cancelBubble = true
            }
        },
        stopImmediatePropagation: function() {
            this.isImmediatePropagationStopped = M;
            this.stopPropagation()
        },
        isDefaultPrevented: L,
        isPropagationStopped: L,
        isImmediatePropagationStopped: L
    };
    var X = function(a) {
            for (var b = a.relatedTarget; b && b != this;) try {
                b = b.parentNode
            } catch (d) {
                b = this
            }
            if (b != this) {
                a.type = a.data;
                c.event.handle.apply(this, arguments)
            }
        };
    c.each({
        mouseover: "mouseenter",
        mouseout: "mouseleave"
    }, function(a, b) {
        c.event.special[b] = {
            setup: function() {
                c.event.add(this, a, X, b)
            },
            teardown: function() {
                c.event.remove(this, a, X)
            }
        }
    });
    c.fn.extend({
        bind: function(a, b, d) {
            return a == "unload" ? this.one(a, b, d) : this.each(function() {
                c.event.add(this, a, d || b, d && b)
            })
        },
        one: function(a, b, d) {
            var f = c.event.proxy(d || b, function(h) {
                c(this).unbind(h, f);
                return (d || b).apply(this, arguments)
            });
            return this.each(function() {
                c.event.add(this, a, f, d && b)
            })
        },
        unbind: function(a, b) {
            return this.each(function() {
                c.event.remove(this, a, b)
            })
        },
        trigger: function(a, b) {
            return this.each(function() {
                c.event.trigger(a, b, this)
            })
        },
        triggerHandler: function(a, b) {
            if (this[0]) {
                var d = c.Event(a);
                d.preventDefault();
                d.stopPropagation();
                c.event.trigger(d, b, this[0]);
                return d.result
            }
        },
        toggle: function(a) {
            for (var b = arguments, d = 1; d < b.length;) c.event.proxy(a, b[d++]);
            return this.click(c.event.proxy(a, function(f) {
                this.lastToggle = (this.lastToggle || 0) % d;
                f.preventDefault();
                return b[this.lastToggle++].apply(this, arguments) || false
            }))
        },
        hover: function(a, b) {
            return this.mouseenter(a).mouseleave(b)
        },
        ready: function(a) {
            Q();
            c.isReady ? a.call(document, c) : c.readyList.push(a);
            return this
        },
        live: function(a, b) {
            var d = c.event.proxy(b);
            d.guid += this.selector + a;
            c(document).bind(P(a, this.selector), this.selector, d);
            return this
        },
        die: function(a, b) {
            c(document).unbind(P(a, this.selector), b ? {
                guid: b.guid + this.selector + a
            } : null);
            return this
        }
    });
    c.extend({
        isReady: false,
        readyList: [],
        ready: function() {
            if (!c.isReady) {
                c.isReady = true;
                if (c.readyList) {
                    c.each(c.readyList, function() {
                        this.call(document, c)
                    });
                    c.readyList = null
                }
                c(document).triggerHandler("ready")
            }
        }
    });
    var R = false;
    c.each("blur,focus,load,resize,scroll,unload,click,dblclick,mousedown,mouseup,mousemove,mouseover,mouseout,mouseenter,mouseleave,change,select,submit,keydown,keypress,keyup,error".split(","), function(a, b) {
        c.fn[b] = function(d) {
            return d ? this.bind(b, d) : this.trigger(b)
        }
    });
    c(u).bind("unload", function() {
        for (var a in c.cache) a != 1 && c.cache[a].handle && c.event.remove(c.cache[a].handle.elem)
    });
    (function() {
        c.support = {};
        var a = document.documentElement,
            b = document.createElement("script"),
            d = document.createElement("div"),
            f = "script" + (new Date).getTime();
        d.style.display = "none";
        d.innerHTML = '   <link/><table></table><a href="/a" style="color:red;float:left;opacity:.5;">a</a><select><option>text</option></select><object><param/></object>';
        var h = d.getElementsByTagName("*"),
            i = d.getElementsByTagName("a")[0];
        if (!(!h || !h.length || !i)) {
            c.support = {
                leadingWhitespace: d.firstChild.nodeType == 3,
                tbody: !d.getElementsByTagName("tbody").length,
                objectAll: !! d.getElementsByTagName("object")[0].getElementsByTagName("*").length,
                htmlSerialize: !! d.getElementsByTagName("link").length,
                style: /red/.test(i.getAttribute("style")),
                hrefNormalized: i.getAttribute("href") === "/a",
                opacity: i.style.opacity === "0.5",
                cssFloat: !! i.style.cssFloat,
                scriptEval: false,
                noCloneEvent: true,
                boxModel: null
            };
            b.type = "text/javascript";
            try {
                b.appendChild(document.createTextNode("window." + f + "=1;"))
            } catch (n) {}
            a.insertBefore(b, a.firstChild);
            if (u[f]) {
                c.support.scriptEval = true;
                delete u[f]
            }
            a.removeChild(b);
            if (d.attachEvent && d.fireEvent) {
                d.attachEvent("onclick", function() {
                    c.support.noCloneEvent = false;
                    d.detachEvent("onclick", arguments.callee)
                });
                d.cloneNode(true).fireEvent("onclick")
            }
            c(function() {
                var o = document.createElement("div");
                o.style.width = o.style.paddingLeft = "1px";
                document.body.appendChild(o);
                c.boxModel = c.support.boxModel = o.offsetWidth === 2;
                document.body.removeChild(o).style.display = "none"
            })
        }
    })();
    var H = c.support.cssFloat ? "cssFloat" : "styleFloat";
    c.props = {
        "for": "htmlFor",
        "class": "className",
        "float": H,
        cssFloat: H,
        styleFloat: H,
        readonly: "readOnly",
        maxlength: "maxLength",
        cellspacing: "cellSpacing",
        rowspan: "rowSpan",
        tabindex: "tabIndex"
    };
    c.fn.extend({
        _load: c.fn.load,
        load: function(a, b, d) {
            if (typeof a !== "string") return this._load(a);
            var f = a.indexOf(" ");
            if (f >= 0) {
                var h = a.slice(f, a.length);
                a = a.slice(0, f)
            }
            f = "GET";
            if (b) if (c.isFunction(b)) {
                d = b;
                b = null
            } else if (typeof b === "object") {
                b = c.param(b);
                f = "POST"
            }
            var i = this;
            c.ajax({
                url: a,
                type: f,
                dataType: "html",
                data: b,
                complete: function(n, o) {
                    if (o == "success" || o == "notmodified") i.html(h ? c("<div/>").append(n.responseText.replace(/<script(.|\s)*?\/script>/g, "")).find(h) : n.responseText);
                    d && i.each(d, [n.responseText, o, n])
                }
            });
            return this
        },
        serialize: function() {
            return c.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                return this.elements ? c.makeArray(this.elements) : this
            }).filter(function() {
                return this.name && !this.disabled && (this.checked || /select|textarea/i.test(this.nodeName) || /text|hidden|password|search/i.test(this.type))
            }).map(function(a, b) {
                var d = c(this).val();
                return d == null ? null : c.isArray(d) ? c.map(d, function(f) {
                    return {
                        name: b.name,
                        value: f
                    }
                }) : {
                    name: b.name,
                    value: d
                }
            }).get()
        }
    });
    c.each("ajaxStart,ajaxStop,ajaxComplete,ajaxError,ajaxSuccess,ajaxSend".split(","), function(a, b) {
        c.fn[b] = function(d) {
            return this.bind(b, d)
        }
    });
    var fa = +new Date;
    c.extend({
        get: function(a, b, d, f) {
            if (c.isFunction(b)) {
                d = b;
                b = null
            }
            return c.ajax({
                type: "GET",
                url: a,
                data: b,
                success: d,
                dataType: f
            })
        },
        getScript: function(a, b) {
            return c.get(a, null, b, "script")
        },
        getJSON: function(a, b, d) {
            return c.get(a, b, d, "json")
        },
        post: function(a, b, d, f) {
            if (c.isFunction(b)) {
                d = b;
                b = {}
            }
            return c.ajax({
                type: "POST",
                url: a,
                data: b,
                success: d,
                dataType: f
            })
        },
        ajaxSetup: function(a) {
            c.extend(c.ajaxSettings, a)
        },
        ajaxSettings: {
            url: location.href,
            global: true,
            type: "GET",
            contentType: "application/x-www-form-urlencoded",
            processData: true,
            async: true,
            xhr: function() {
                return u.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest
            },
            accepts: {
                xml: "application/xml, text/xml",
                html: "text/html",
                script: "text/javascript, application/javascript",
                json: "application/json, text/javascript",
                text: "text/plain",
                _default: "*/*"
            }
        },
        lastModified: {},
        ajax: function(a) {
            function b() {
                a.success && a.success(n, i);
                a.global && c.event.trigger("ajaxSuccess", [r, a])
            }
            function d() {
                a.complete && a.complete(r, i);
                a.global && c.event.trigger("ajaxComplete", [r, a]);
                a.global && !--c.active && c.event.trigger("ajaxStop")
            }
            a = c.extend(true, a, c.extend(true, {}, c.ajaxSettings, a));
            var f, h = /=\?(&|$)/g,
                i, n, o = a.type.toUpperCase();
            if (a.data && a.processData && typeof a.data !== "string") a.data = c.param(a.data);
            if (a.dataType == "jsonp") {
                if (o == "GET") a.url.match(h) || (a.url += (a.url.match(/\?/) ? "&" : "?") + (a.jsonp || "callback") + "=?");
                else if (!a.data || !a.data.match(h)) a.data = (a.data ? a.data + "&" : "") + (a.jsonp || "callback") + "=?";
                a.dataType = "json"
            }
            if (a.dataType == "json" && (a.data && a.data.match(h) || a.url.match(h))) {
                f = "jsonp" + fa++;
                if (a.data) a.data = (a.data + "").replace(h, "=" + f + "$1");
                a.url = a.url.replace(h, "=" + f + "$1");
                a.dataType = "script";
                u[f] = function(k) {
                    n = k;
                    b();
                    d();
                    u[f] = void 0;
                    try {
                        delete u[f]
                    } catch (l) {}
                    t && t.removeChild(v)
                }
            }
            if (a.dataType == "script" && a.cache == null) a.cache = false;
            if (a.cache === false && o == "GET") {
                h = +new Date;
                var s = a.url.replace(/(\?|&)_=.*?(&|$)/, "$1_=" + h + "$2");
                a.url = s + (s == a.url ? (a.url.match(/\?/) ? "&" : "?") + "_=" + h : "")
            }
            if (a.data && o == "GET") {
                a.url += (a.url.match(/\?/) ? "&" : "?") + a.data;
                a.data = null
            }
            a.global && !c.active++ && c.event.trigger("ajaxStart");
            h = /^(\w+:)?\/\/([^\/?#]+)/.exec(a.url);
            if (a.dataType == "script" && o == "GET" && h && (h[1] && h[1] != location.protocol || h[2] != location.host)) {
                var t = document.getElementsByTagName("head")[0],
                    v = document.createElement("script");
                v.src = a.url;
                if (a.scriptCharset) v.charset = a.scriptCharset;
                if (!f) {
                    var x = false;
                    v.onload = v.onreadystatechange = function() {
                        if (!x && (!this.readyState || this.readyState == "loaded" || this.readyState == "complete")) {
                            x = true;
                            b();
                            d();
                            v.onload = v.onreadystatechange = null;
                            t.removeChild(v)
                        }
                    }
                }
                t.appendChild(v)
            } else {
                var z = false,
                    r = a.xhr();
                a.username ? r.open(o, a.url, a.async, a.username, a.password) : r.open(o, a.url, a.async);
                try {
                    a.data && r.setRequestHeader("Content-Type", a.contentType);
                    if (a.ifModified) r.setRequestHeader("If-Modified-Since", c.lastModified[a.url] || "Thu, 01 Jan 1970 00:00:00 GMT");
                    r.setRequestHeader("X-Requested-With", "XMLHttpRequest");
                    r.setRequestHeader("Accept", a.dataType && a.accepts[a.dataType] ? a.accepts[a.dataType] + ", */*" : a.accepts._default)
                } catch (B) {}
                if (a.beforeSend && a.beforeSend(r, a) === false) {
                    a.global && !--c.active && c.event.trigger("ajaxStop");
                    r.abort();
                    return false
                }
                a.global && c.event.trigger("ajaxSend", [r, a]);
                var e = function(k) {
                        if (r.readyState == 0) {
                            if (g) {
                                clearInterval(g);
                                g = null;
                                a.global && !--c.active && c.event.trigger("ajaxStop")
                            }
                        } else if (!z && r && (r.readyState == 4 || k == "timeout")) {
                            z = true;
                            if (g) {
                                clearInterval(g);
                                g = null
                            }
                            i = k == "timeout" ? "timeout" : !c.httpSuccess(r) ? "error" : a.ifModified && c.httpNotModified(r, a.url) ? "notmodified" : "success";
                            if (i == "success") try {
                                n = c.httpData(r, a.dataType, a)
                            } catch (l) {
                                i = "parsererror"
                            }
                            if (i == "success") {
                                var m;
                                try {
                                    m = r.getResponseHeader("Last-Modified")
                                } catch (p) {}
                                if (a.ifModified && m) c.lastModified[a.url] = m;
                                f || b()
                            } else c.handleError(a, r, i);
                            d();
                            k && r.abort();
                            if (a.async) r = null
                        }
                    };
                if (a.async) {
                    var g = setInterval(e, 13);
                    a.timeout > 0 && setTimeout(function() {
                        r && !z && e("timeout")
                    }, a.timeout)
                }
                try {
                    r.send(a.data)
                } catch (j) {
                    c.handleError(a, r, null, j)
                }
                a.async || e();
                return r
            }
        },
        handleError: function(a, b, d, f) {
            a.error && a.error(b, d, f);
            a.global && c.event.trigger("ajaxError", [b, a, f])
        },
        active: 0,
        httpSuccess: function(a) {
            try {
                return !a.status && location.protocol == "file:" || a.status >= 200 && a.status < 300 || a.status == 304 || a.status == 1223
            } catch (b) {}
            return false
        },
        httpNotModified: function(a, b) {
            try {
                var d = a.getResponseHeader("Last-Modified");
                return a.status == 304 || d == c.lastModified[b]
            } catch (f) {}
            return false
        },
        httpData: function(a, b, d) {
            var f = a.getResponseHeader("content-type");
            a = (f = b == "xml" || !b && f && f.indexOf("xml") >= 0) ? a.responseXML : a.responseText;
            if (f && a.documentElement.tagName == "parsererror") throw "parsererror";
            if (d && d.dataFilter) a = d.dataFilter(a, b);
            if (typeof a === "string") {
                b == "script" && c.globalEval(a);
                if (b == "json") a = u.eval("(" + a + ")")
            }
            return a
        },
        param: function(a) {
            function b(h, i) {
                d[d.length] = encodeURIComponent(h) + "=" + encodeURIComponent(i)
            }
            var d = [];
            if (c.isArray(a) || a.jquery) c.each(a, function() {
                b(this.name, this.value)
            });
            else for (var f in a) c.isArray(a[f]) ? c.each(a[f], function() {
                b(f, this)
            }) : b(f, c.isFunction(a[f]) ? a[f]() : a[f]);
            return d.join("&").replace(/%20/g, "+")
        }
    });
    var N = {},
        K, S = [
            ["height", "marginTop", "marginBottom", "paddingTop", "paddingBottom"],
            ["width", "marginLeft", "marginRight", "paddingLeft", "paddingRight"],
            ["opacity"]
        ];
    c.fn.extend({
        show: function(a, b) {
            if (a) return this.animate(E("show", 3), a, b);
            else {
                for (var d = 0, f = this.length; d < f; d++) {
                    var h = c.data(this[d], "olddisplay");
                    this[d].style.display = h || "";
                    if (c.css(this[d], "display") === "none") {
                        h = this[d].tagName;
                        var i;
                        if (N[h]) i = N[h];
                        else {
                            var n = c("<" + h + " />").appendTo("body");
                            i = n.css("display");
                            if (i === "none") i = "block";
                            n.remove();
                            N[h] = i
                        }
                        c.data(this[d], "olddisplay", i)
                    }
                }
                d = 0;
                for (f = this.length; d < f; d++) this[d].style.display = c.data(this[d], "olddisplay") || "";
                return this
            }
        },
        hide: function(a, b) {
            if (a) return this.animate(E("hide", 3), a, b);
            else {
                for (var d = 0, f = this.length; d < f; d++) {
                    var h = c.data(this[d], "olddisplay");
                    !h && h !== "none" && c.data(this[d], "olddisplay", c.css(this[d], "display"))
                }
                d = 0;
                for (f = this.length; d < f; d++) this[d].style.display = "none";
                return this
            }
        },
        _toggle: c.fn.toggle,
        toggle: function(a, b) {
            var d = typeof a === "boolean";
            return c.isFunction(a) && c.isFunction(b) ? this._toggle.apply(this, arguments) : a == null || d ? this.each(function() {
                var f = d ? a : c(this).is(":hidden");
                c(this)[f ? "show" : "hide"]()
            }) : this.animate(E("toggle", 3), a, b)
        },
        fadeTo: function(a, b, d) {
            return this.animate({
                opacity: b
            }, a, d)
        },
        animate: function(a, b, d, f) {
            var h = c.speed(b, d, f);
            return this[h.queue === false ? "each" : "queue"](function() {
                var i = c.extend({}, h),
                    n, o = this.nodeType == 1 && c(this).is(":hidden"),
                    s = this;
                for (n in a) {
                    if (a[n] == "hide" && o || a[n] == "show" && !o) return i.complete.call(this);
                    if ((n == "height" || n == "width") && this.style) {
                        i.display = c.css(this, "display");
                        i.overflow = this.style.overflow
                    }
                }
                if (i.overflow != null) this.style.overflow = "hidden";
                i.curAnim = c.extend({}, a);
                c.each(a, function(t, v) {
                    var x = new c.fx(s, i, t);
                    if (/toggle|show|hide/.test(v)) x[v == "toggle" ? o ? "show" : "hide" : v](a);
                    else {
                        var z = v.toString().match(/^([+-]=)?([\d+-.]+)(.*)$/),
                            r = x.cur(true) || 0;
                        if (z) {
                            var B = parseFloat(z[2]),
                                e = z[3] || "px";
                            if (e != "px") {
                                s.style[t] = (B || 1) + e;
                                r = (B || 1) / x.cur(true) * r;
                                s.style[t] = r + e
                            }
                            if (z[1]) B = (z[1] == "-=" ? -1 : 1) * B + r;
                            x.custom(r, B, e)
                        } else x.custom(r, v, "")
                    }
                });
                return true
            })
        },
        stop: function(a, b) {
            var d = c.timers;
            a && this.queue([]);
            this.each(function() {
                for (var f = d.length - 1; f >= 0; f--) if (d[f].elem == this) {
                    b && d[f](true);
                    d.splice(f, 1)
                }
            });
            b || this.dequeue();
            return this
        }
    });
    c.each({
        slideDown: E("show", 1),
        slideUp: E("hide", 1),
        slideToggle: E("toggle", 1),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        }
    }, function(a, b) {
        c.fn[a] = function(d, f) {
            return this.animate(b, d, f)
        }
    });
    c.extend({
        speed: function(a, b, d) {
            var f = typeof a === "object" ? a : {
                complete: d || !d && b || c.isFunction(a) && a,
                duration: a,
                easing: d && b || b && !c.isFunction(b) && b
            };
            f.duration = c.fx.off ? 0 : typeof f.duration === "number" ? f.duration : c.fx.speeds[f.duration] || c.fx.speeds._default;
            f.old = f.complete;
            f.complete = function() {
                f.queue !== false && c(this).dequeue();
                c.isFunction(f.old) && f.old.call(this)
            };
            return f
        },
        easing: {
            linear: function(a, b, d, f) {
                return d + f * a
            },
            swing: function(a, b, d, f) {
                return (-Math.cos(a * Math.PI) / 2 + 0.5) * f + d
            }
        },
        timers: [],
        fx: function(a, b, d) {
            this.options = b;
            this.elem = a;
            this.prop = d;
            if (!b.orig) b.orig = {}
        }
    });
    c.fx.prototype = {
        update: function() {
            this.options.step && this.options.step.call(this.elem, this.now, this);
            (c.fx.step[this.prop] || c.fx.step._default)(this);
            if ((this.prop == "height" || this.prop == "width") && this.elem.style) this.elem.style.display = "block"
        },
        cur: function(a) {
            if (this.elem[this.prop] != null && (!this.elem.style || this.elem.style[this.prop] == null)) return this.elem[this.prop];
            return (a = parseFloat(c.css(this.elem, this.prop, a))) && a > -1E4 ? a : parseFloat(c.curCSS(this.elem, this.prop)) || 0
        },
        custom: function(a, b, d) {
            function f(i) {
                return h.step(i)
            }
            this.startTime = +new Date;
            this.start = a;
            this.end = b;
            this.unit = d || this.unit || "px";
            this.now = this.start;
            this.pos = this.state = 0;
            var h = this;
            f.elem = this.elem;
            if (f() && c.timers.push(f) && !K) K = setInterval(function() {
                for (var i = c.timers, n = 0; n < i.length; n++) i[n]() || i.splice(n--, 1);
                if (!i.length) {
                    clearInterval(K);
                    K = void 0
                }
            }, 13)
        },
        show: function() {
            this.options.orig[this.prop] = c.attr(this.elem.style, this.prop);
            this.options.show = true;
            this.custom(this.prop == "width" || this.prop == "height" ? 1 : 0, this.cur());
            c(this.elem).show()
        },
        hide: function() {
            this.options.orig[this.prop] = c.attr(this.elem.style, this.prop);
            this.options.hide = true;
            this.custom(this.cur(), 0)
        },
        step: function(a) {
            var b = +new Date;
            if (a || b >= this.options.duration + this.startTime) {
                this.now = this.end;
                this.pos = this.state = 1;
                this.update();
                a = this.options.curAnim[this.prop] = true;
                for (var d in this.options.curAnim) if (this.options.curAnim[d] !== true) a = false;
                if (a) {
                    if (this.options.display != null) {
                        this.elem.style.overflow = this.options.overflow;
                        this.elem.style.display = this.options.display;
                        if (c.css(this.elem, "display") == "none") this.elem.style.display = "block"
                    }
                    this.options.hide && c(this.elem).hide();
                    if (this.options.hide || this.options.show) for (var f in this.options.curAnim) c.attr(this.elem.style, f, this.options.orig[f]);
                    this.options.complete.call(this.elem)
                }
                return false
            } else {
                d = b - this.startTime;
                this.state = d / this.options.duration;
                this.pos = c.easing[this.options.easing || (c.easing.swing ? "swing" : "linear")](this.state, d, 0, 1, this.options.duration);
                this.now = this.start + (this.end - this.start) * this.pos;
                this.update()
            }
            return true
        }
    };
    c.extend(c.fx, {
        speeds: {
            slow: 600,
            fast: 200,
            _default: 400
        },
        step: {
            opacity: function(a) {
                c.attr(a.elem.style, "opacity", a.now)
            },
            _default: function(a) {
                if (a.elem.style && a.elem.style[a.prop] != null) a.elem.style[a.prop] = a.now + a.unit;
                else a.elem[a.prop] = a.now
            }
        }
    });
    c.fn.offset = document.documentElement.getBoundingClientRect ?
    function() {
        if (!this[0]) return {
            top: 0,
            left: 0
        };
        if (this[0] === this[0].ownerDocument.body) return c.offset.bodyOffset(this[0]);
        var a = this[0].getBoundingClientRect(),
            b = this[0].ownerDocument,
            d = b.body;
        b = b.documentElement;
        return {
            top: a.top + (self.pageYOffset || c.boxModel && b.scrollTop || d.scrollTop) - (b.clientTop || d.clientTop || 0),
            left: a.left + (self.pageXOffset || c.boxModel && b.scrollLeft || d.scrollLeft) - (b.clientLeft || d.clientLeft || 0)
        }
    } : function() {
        if (!this[0]) return {
            top: 0,
            left: 0
        };
        if (this[0] === this[0].ownerDocument.body) return c.offset.bodyOffset(this[0]);
        c.offset.initialized || c.offset.initialize();
        var a = this[0],
            b = a.offsetParent,
            d = a.ownerDocument,
            f, h = d.documentElement,
            i = d.body;
        d = d.defaultView;
        f = d.getComputedStyle(a, null);
        for (var n = a.offsetTop, o = a.offsetLeft;
        (a = a.parentNode) && a !== i && a !== h;) {
            f = d.getComputedStyle(a, null);
            n -= a.scrollTop;
            o -= a.scrollLeft;
            if (a === b) {
                n += a.offsetTop;
                o += a.offsetLeft;
                if (c.offset.doesNotAddBorder && !(c.offset.doesAddBorderForTableAndCells && /^t(able|d|h)$/i.test(a.tagName))) {
                    n += parseInt(f.borderTopWidth, 10) || 0;
                    o += parseInt(f.borderLeftWidth, 10) || 0
                }
                b = a.offsetParent
            }
            if (c.offset.subtractsBorderForOverflowNotVisible && f.overflow !== "visible") {
                n += parseInt(f.borderTopWidth, 10) || 0;
                o += parseInt(f.borderLeftWidth, 10) || 0
            }
            f = f
        }
        if (f.position === "relative" || f.position === "static") {
            n += i.offsetTop;
            o += i.offsetLeft
        }
        if (f.position === "fixed") {
            n += Math.max(h.scrollTop, i.scrollTop);
            o += Math.max(h.scrollLeft, i.scrollLeft)
        }
        return {
            top: n,
            left: o
        }
    };
    c.offset = {
        initialize: function() {
            if (!this.initialized) {
                var a = document.body,
                    b = document.createElement("div"),
                    d, f, h, i = a.style.marginTop;
                d = {
                    position: "absolute",
                    top: 0,
                    left: 0,
                    margin: 0,
                    border: 0,
                    width: "1px",
                    height: "1px",
                    visibility: "hidden"
                };
                for (f in d) b.style[f] = d[f];
                b.innerHTML = '<div style="position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;"><div></div></div><table style="position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;" cellpadding="0" cellspacing="0"><tr><td></td></tr></table>';
                a.insertBefore(b, a.firstChild);
                d = b.firstChild;
                f = d.firstChild;
                h = d.nextSibling.firstChild.firstChild;
                this.doesNotAddBorder = f.offsetTop !== 5;
                this.doesAddBorderForTableAndCells = h.offsetTop === 5;
                d.style.overflow = "hidden";
                d.style.position = "relative";
                this.subtractsBorderForOverflowNotVisible = f.offsetTop === -5;
                a.style.marginTop = "1px";
                this.doesNotIncludeMarginInBodyOffset = a.offsetTop === 0;
                a.style.marginTop = i;
                a.removeChild(b);
                this.initialized = true
            }
        },
        bodyOffset: function(a) {
            c.offset.initialized || c.offset.initialize();
            var b = a.offsetTop,
                d = a.offsetLeft;
            if (c.offset.doesNotIncludeMarginInBodyOffset) {
                b += parseInt(c.curCSS(a, "marginTop", true), 10) || 0;
                d += parseInt(c.curCSS(a, "marginLeft", true), 10) || 0
            }
            return {
                top: b,
                left: d
            }
        }
    };
    c.fn.extend({
        position: function() {
            var a;
            if (this[0]) {
                a = this.offsetParent();
                var b = this.offset(),
                    d = /^body|html$/i.test(a[0].tagName) ? {
                        top: 0,
                        left: 0
                    } : a.offset();
                b.top -= G(this, "marginTop");
                b.left -= G(this, "marginLeft");
                d.top += G(a, "borderTopWidth");
                d.left += G(a, "borderLeftWidth");
                a = {
                    top: b.top - d.top,
                    left: b.left - d.left
                }
            }
            return a
        },
        offsetParent: function() {
            for (var a = this[0].offsetParent || document.body; a && !/^body|html$/i.test(a.tagName) && c.css(a, "position") == "static";) a = a.offsetParent;
            return c(a)
        }
    });
    c.each(["Left", "Top"], function(a, b) {
        var d = "scroll" + b;
        c.fn[d] = function(f) {
            if (!this[0]) return null;
            return f !== void 0 ? this.each(function() {
                this == u || this == document ? u.scrollTo(!a ? f : c(u).scrollLeft(), a ? f : c(u).scrollTop()) : this[d] = f
            }) : this[0] == u || this[0] == document ? self[a ? "pageYOffset" : "pageXOffset"] || c.boxModel && document.documentElement[d] || document.body[d] : this[0][d]
        }
    });
    c.each(["Height", "Width"], function(a, b) {
        var d = b.toLowerCase();
        c.fn["inner" + b] = function() {
            return this[0] ? c.css(this[0], d, false, "padding") : null
        };
        c.fn["outer" + b] = function(h) {
            return this[0] ? c.css(this[0], d, false, h ? "margin" : "border") : null
        };
        var f = b.toLowerCase();
        c.fn[f] = function(h) {
            return this[0] == u ? document.compatMode == "CSS1Compat" && document.documentElement["client" + b] || document.body["client" + b] : this[0] == document ? Math.max(document.documentElement["client" + b], document.body["scroll" + b], document.documentElement["scroll" + b], document.body["offset" + b], document.documentElement["offset" + b]) : h === void 0 ? this.length ? c.css(this[0], f) : null : this.css(f, typeof h === "string" ? h : h + "px")
        }
    })
})();
