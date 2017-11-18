/*
 * jQuery Tools 1.2.3 - The missing UI library for the Web
 * 
 * [tabs, tabs.slideshow, tooltip, tooltip.slide, tooltip.dynamic, scrollable, scrollable.autoscroll, scrollable.navigator, overlay, overlay.apple]
 * 
 * NO COPYRIGHTS OR LICENSES. DO WHAT YOU LIKE.
 * 
 * http://flowplayer.org/tools/
 * 
 * File generated: Tue Jul 27 12:02:30 GMT 2010
 */
(function (c) {
    function p(e, b, a) {
        var d = this, l = e.add(this), h = e.find(a.tabs), i = b.jquery ? b : e.children(b), j;
        h.length || (h = e.children());
        i.length || (i = e.parent().find(b));
        i.length || (i = c(b));
        c.extend(this, {
            click: function (f, g) {
                var k = h.eq(f);
                if (typeof f == "string" && f.replace("#", "")) {
                    k = h.filter("[href*=" + f.replace("#", "") + "]");
                    f = Math.max(h.index(k), 0)
                }
                if (a.rotate) {
                    var n = h.length - 1;
                    if (f < 0) return d.click(n, g);
                    if (f > n) return d.click(0, g)
                }
                if (!k.length) {
                    if (j >= 0) return d;
                    f = a.initialIndex;
                    k = h.eq(f)
                }
                if (f === j) return d;
                g = g || c.Event();
                g.type = "onBeforeClick";
                l.trigger(g, [f]);
                if (!g.isDefaultPrevented()) {
                    o[a.effect].call(d, f, function () {
                        g.type = "onClick";
                        l.trigger(g, [f])
                    });
                    j = f;
                    h.removeClass(a.current);
                    k.addClass(a.current);
                    return d
                }
            }, getConf: function () {
                return a
            }, getTabs: function () {
                return h
            }, getPanes: function () {
                return i
            }, getCurrentPane: function () {
                return i.eq(j)
            }, getCurrentTab: function () {
                return h.eq(j)
            }, getIndex: function () {
                return j
            }, next: function () {
                return d.click(j + 1)
            }, prev: function () {
                return d.click(j - 1)
            }, destroy: function () {
                h.unbind(a.event).removeClass(a.current);
                i.find("a[href^=#]").unbind("click.T");
                return d
            }
        });
        c.each("onBeforeClick,onClick".split(","), function (f, g) {
            c.isFunction(a[g]) && c(d).bind(g, a[g]);
            d[g] = function (k) {
                c(d).bind(g, k);
                return d
            }
        });
        if (a.history && c.fn.history) {
            c.tools.history.init(h);
            a.event = "history"
        }
        h.each(function (f) {
            c(this).bind(a.event, function (g) {
                d.click(f, g);
                return g.preventDefault()
            })
        });
        i.find("a[href^=#]").bind("click.T", function (f) {
            d.click(c(this).attr("href"), f)
        });
        if (location.hash) d.click(location.hash); else if (a.initialIndex ===
            0 || a.initialIndex > 0) d.click(a.initialIndex)
    }

    c.tools = c.tools || {version: "1.2.3"};
    c.tools.tabs = {
        conf: {
            tabs: "a",
            current: "current",
            onBeforeClick: null,
            onClick: null,
            effect: "default",
            initialIndex: 0,
            event: "click",
            rotate: false,
            history: false
        }, addEffect: function (e, b) {
            o[e] = b
        }
    };
    var o = {
        "default": function (e, b) {
            this.getPanes().hide().eq(e).show();
            b.call()
        }, fade: function (e, b) {
            var a = this.getConf(), d = a.fadeOutSpeed, l = this.getPanes();
            d ? l.fadeOut(d) : l.hide();
            l.eq(e).fadeIn(a.fadeInSpeed, b)
        }, slide: function (e, b) {
            this.getPanes().slideUp(200);
            this.getPanes().eq(e).slideDown(400, b)
        }, ajax: function (e, b) {
            this.getPanes().eq(0).load(this.getTabs().eq(e).attr("href"), b)
        }
    }, m;
    c.tools.tabs.addEffect("horizontal", function (e, b) {
        m || (m = this.getPanes().eq(0).width());
        this.getCurrentPane().animate({width: 0}, function () {
            c(this).hide()
        });
        this.getPanes().eq(e).animate({width: m}, function () {
            c(this).show();
            b.call()
        })
    });
    c.fn.tabs = function (e, b) {
        var a = this.data("tabs");
        if (a) {
            a.destroy();
            this.removeData("tabs")
        }
        if (c.isFunction(b)) b = {onBeforeClick: b};
        b = c.extend({},
            c.tools.tabs.conf, b);
        this.each(function () {
            a = new p(c(this), e, b);
            c(this).data("tabs", a)
        });
        return b.api ? a : this
    }
})(jQuery);
(function (d) {
    function r(g, a) {
        function p(f) {
            var e = d(f);
            return e.length < 2 ? e : g.parent().find(f)
        }

        var c = this, j = g.add(this), b = g.data("tabs"), h, l, m, n = false, o = p(a.next).click(function () {
            b.next()
        }), k = p(a.prev).click(function () {
            b.prev()
        });
        d.extend(c, {
            getTabs: function () {
                return b
            }, getConf: function () {
                return a
            }, play: function () {
                if (!h) {
                    var f = d.Event("onBeforePlay");
                    j.trigger(f);
                    if (f.isDefaultPrevented()) return c;
                    n = false;
                    h = setInterval(b.next, a.interval);
                    j.trigger("onPlay");
                    b.next()
                }
            }, pause: function () {
                if (!h) return c;
                var f = d.Event("onBeforePause");
                j.trigger(f);
                if (f.isDefaultPrevented()) return c;
                h = clearInterval(h);
                m = clearInterval(m);
                j.trigger("onPause")
            }, stop: function () {
                c.pause();
                n = true
            }
        });
        d.each("onBeforePlay,onPlay,onBeforePause,onPause".split(","), function (f, e) {
            d.isFunction(a[e]) && c.bind(e, a[e]);
            c[e] = function (s) {
                return c.bind(e, s)
            }
        });
        if (a.autopause) {
            var t = b.getTabs().add(o).add(k).add(b.getPanes());
            t.hover(function () {
                c.pause();
                l = clearInterval(l)
            }, function () {
                n || (l = setTimeout(c.play, a.interval))
            })
        }
        if (a.autoplay) m =
            setTimeout(c.play, a.interval); else c.stop();
        a.clickable && b.getPanes().click(function () {
            b.next()
        });
        if (!b.getConf().rotate) {
            var i = a.disabledClass;
            b.getIndex() || k.addClass(i);
            b.onBeforeClick(function (f, e) {
                if (e) {
                    k.removeClass(i);
                    e == b.getTabs().length - 1 ? o.addClass(i) : o.removeClass(i)
                } else k.addClass(i)
            })
        }
    }

    var q;
    q = d.tools.tabs.slideshow = {
        conf: {
            next: ".forward",
            prev: ".backward",
            disabledClass: "disabled",
            autoplay: false,
            autopause: true,
            interval: 3E3,
            clickable: true,
            api: false
        }
    };
    d.fn.slideshow = function (g) {
        var a =
            this.data("slideshow");
        if (a) return a;
        g = d.extend({}, q.conf, g);
        this.each(function () {
            a = new r(d(this), g);
            d(this).data("slideshow", a)
        });
        return g.api ? a : this
    }
})(jQuery);
(function (f) {
    function p(a, b, c) {
        var h = c.relative ? a.position().top : a.offset().top, e = c.relative ? a.position().left : a.offset().left,
            i = c.position[0];
        h -= b.outerHeight() - c.offset[0];
        e += a.outerWidth() + c.offset[1];
        var j = b.outerHeight() + a.outerHeight();
        if (i == "center") h += j / 2;
        if (i == "bottom") h += j;
        i = c.position[1];
        a = b.outerWidth() + a.outerWidth();
        if (i == "center") e -= a / 2;
        if (i == "left") e -= a;
        return {top: h, left: e}
    }

    function t(a, b) {
        var c = this, h = a.add(c), e, i = 0, j = 0, m = a.attr("title"), q = n[b.effect], k, r = a.is(":input"),
            u = r && a.is(":checkbox, :radio, select, :button, :submit"),
            s = a.attr("type"), l = b.events[s] || b.events[r ? u ? "widget" : "input" : "def"];
        if (!q) throw'Nonexistent effect "' + b.effect + '"';
        l = l.split(/,\s*/);
        if (l.length != 2) throw"Tooltip: bad events configuration for " + s;
        a.bind(l[0], function (d) {
            clearTimeout(i);
            if (b.predelay) j = setTimeout(function () {
                c.show(d)
            }, b.predelay); else c.show(d)
        }).bind(l[1], function (d) {
            clearTimeout(j);
            if (b.delay) i = setTimeout(function () {
                c.hide(d)
            }, b.delay); else c.hide(d)
        });
        if (m && b.cancelDefault) {
            a.removeAttr("title");
            a.data("title", m)
        }
        f.extend(c, {
            show: function (d) {
                if (!e) {
                    if (m) e =
                        f(b.layout).addClass(b.tipClass).appendTo(document.body).hide().append(m); else if (b.tip) e = f(b.tip).eq(0); else {
                        e = a.next();
                        e.length || (e = a.parent().next())
                    }
                    if (!e.length) throw"Cannot find tooltip for " + a;
                }
                if (c.isShown()) return c;
                e.stop(true, true);
                var g = p(a, e, b);
                d = d || f.Event();
                d.type = "onBeforeShow";
                h.trigger(d, [g]);
                if (d.isDefaultPrevented()) return c;
                g = p(a, e, b);
                e.css({position: "absolute", top: g.top, left: g.left});
                k = true;
                q[0].call(c, function () {
                    d.type = "onShow";
                    k = "full";
                    h.trigger(d)
                });
                g = b.events.tooltip.split(/,\s*/);
                e.bind(g[0], function () {
                    clearTimeout(i);
                    clearTimeout(j)
                });
                g[1] && !a.is("input:not(:checkbox, :radio), textarea") && e.bind(g[1], function (o) {
                    o.relatedTarget != a[0] && a.trigger(l[1].split(" ")[0])
                });
                return c
            }, hide: function (d) {
                if (!e || !c.isShown()) return c;
                d = d || f.Event();
                d.type = "onBeforeHide";
                h.trigger(d);
                if (!d.isDefaultPrevented()) {
                    k = false;
                    n[b.effect][1].call(c, function () {
                        d.type = "onHide";
                        k = false;
                        h.trigger(d)
                    });
                    return c
                }
            }, isShown: function (d) {
                return d ? k == "full" : k
            }, getConf: function () {
                return b
            }, getTip: function () {
                return e
            },
            getTrigger: function () {
                return a
            }
        });
        f.each("onHide,onBeforeShow,onShow,onBeforeHide".split(","), function (d, g) {
            f.isFunction(b[g]) && f(c).bind(g, b[g]);
            c[g] = function (o) {
                f(c).bind(g, o);
                return c
            }
        })
    }

    f.tools = f.tools || {version: "1.2.3"};
    f.tools.tooltip = {
        conf: {
            effect: "toggle",
            fadeOutSpeed: "fast",
            predelay: 0,
            delay: 30,
            opacity: 1,
            tip: 0,
            position: ["top", "center"],
            offset: [0, 0],
            relative: false,
            cancelDefault: true,
            events: {
                def: "mouseenter,mouseleave",
                input: "focus,blur",
                widget: "focus mouseenter,blur mouseleave",
                tooltip: "mouseenter,mouseleave"
            },
            layout: "<div/>",
            tipClass: "tooltip"
        }, addEffect: function (a, b, c) {
            n[a] = [b, c]
        }
    };
    var n = {
        toggle: [function (a) {
            var b = this.getConf(), c = this.getTip();
            b = b.opacity;
            b < 1 && c.css({opacity: b});
            c.show();
            a.call()
        }, function (a) {
            this.getTip().hide();
            a.call()
        }], fade: [function (a) {
            var b = this.getConf();
            this.getTip().fadeTo(b.fadeInSpeed, b.opacity, a)
        }, function (a) {
            this.getTip().fadeOut(this.getConf().fadeOutSpeed, a)
        }]
    };
    f.fn.tooltip = function (a) {
        var b = this.data("tooltip");
        if (b) return b;
        a = f.extend(true, {}, f.tools.tooltip.conf, a);
        if (typeof a.position == "string") a.position = a.position.split(/,?\s/);
        this.each(function () {
            b = new t(f(this), a);
            f(this).data("tooltip", b)
        });
        return a.api ? b : this
    }
})(jQuery);
(function (d) {
    var i = d.tools.tooltip;
    d.extend(i.conf, {
        direction: "up",
        bounce: false,
        slideOffset: 10,
        slideInSpeed: 200,
        slideOutSpeed: 200,
        slideFade: !d.browser.msie
    });
    var e = {up: ["-", "top"], down: ["+", "top"], left: ["-", "left"], right: ["+", "left"]};
    i.addEffect("slide", function (g) {
        var a = this.getConf(), f = this.getTip(), b = a.slideFade ? {opacity: a.opacity} : {},
            c = e[a.direction] || e.up;
        b[c[1]] = c[0] + "=" + a.slideOffset;
        a.slideFade && f.css({opacity: 0});
        f.show().animate(b, a.slideInSpeed, g)
    }, function (g) {
        var a = this.getConf(), f = a.slideOffset,
            b = a.slideFade ? {opacity: 0} : {}, c = e[a.direction] || e.up, h = "" + c[0];
        if (a.bounce) h = h == "+" ? "-" : "+";
        b[c[1]] = h + "=" + f;
        this.getTip().animate(b, a.slideOutSpeed, function () {
            d(this).hide();
            g.call()
        })
    })
})(jQuery);
(function (g) {
    function j(a) {
        var c = g(window), d = c.width() + c.scrollLeft(), h = c.height() + c.scrollTop();
        return [a.offset().top <= c.scrollTop(), d <= a.offset().left + a.width(), h <= a.offset().top + a.height(), c.scrollLeft() >= a.offset().left]
    }

    function k(a) {
        for (var c = a.length; c--;) if (a[c]) return false;
        return true
    }

    var i = g.tools.tooltip;
    i.dynamic = {conf: {classNames: "top right bottom left"}};
    g.fn.dynamic = function (a) {
        if (typeof a == "number") a = {speed: a};
        a = g.extend({}, i.dynamic.conf, a);
        var c = a.classNames.split(/\s/), d;
        this.each(function () {
            var h =
                g(this).tooltip().onBeforeShow(function (e, f) {
                    e = this.getTip();
                    var b = this.getConf();
                    d || (d = [b.position[0], b.position[1], b.offset[0], b.offset[1], g.extend({}, b)]);
                    g.extend(b, d[4]);
                    b.position = [d[0], d[1]];
                    b.offset = [d[2], d[3]];
                    e.css({visibility: "hidden", position: "absolute", top: f.top, left: f.left}).show();
                    f = j(e);
                    if (!k(f)) {
                        if (f[2]) {
                            g.extend(b, a.top);
                            b.position[0] = "top";
                            e.addClass(c[0])
                        }
                        if (f[3]) {
                            g.extend(b, a.right);
                            b.position[1] = "right";
                            e.addClass(c[1])
                        }
                        if (f[0]) {
                            g.extend(b, a.bottom);
                            b.position[0] = "bottom";
                            e.addClass(c[2])
                        }
                        if (f[1]) {
                            g.extend(b,
                                a.left);
                            b.position[1] = "left";
                            e.addClass(c[3])
                        }
                        if (f[0] || f[2]) b.offset[0] *= -1;
                        if (f[1] || f[3]) b.offset[1] *= -1
                    }
                    e.css({visibility: "visible"}).hide()
                });
            h.onBeforeShow(function () {
                var e = this.getConf();
                this.getTip();
                setTimeout(function () {
                    e.position = [d[0], d[1]];
                    e.offset = [d[2], d[3]]
                }, 0)
            });
            h.onHide(function () {
                var e = this.getTip();
                e.removeClass(a.classNames)
            });
            ret = h
        });
        return a.api ? ret : this
    }
})(jQuery);
(function (e) {
    function n(f, c) {
        var a = e(c);
        return a.length < 2 ? a : f.parent().find(c)
    }

    function t(f, c) {
        var a = this, l = f.add(a), g = f.children(), k = 0, m = c.vertical;
        j || (j = a);
        if (g.length > 1) g = e(c.items, f);
        e.extend(a, {
            getConf: function () {
                return c
            }, getIndex: function () {
                return k
            }, getSize: function () {
                return a.getItems().size()
            }, getNaviButtons: function () {
                return o.add(p)
            }, getRoot: function () {
                return f
            }, getItemWrap: function () {
                return g
            }, getItems: function () {
                return g.children(c.item).not("." + c.clonedClass)
            }, move: function (b, d) {
                return a.seekTo(k +
                    b, d)
            }, next: function (b) {
                return a.move(1, b)
            }, prev: function (b) {
                return a.move(-1, b)
            }, begin: function (b) {
                return a.seekTo(0, b)
            }, end: function (b) {
                return a.seekTo(a.getSize() - 1, b)
            }, focus: function () {
                return j = a
            }, addItem: function (b) {
                b = e(b);
                if (c.circular) {
                    e(".cloned:last").before(b);
                    e(".cloned:first").replaceWith(b.clone().addClass(c.clonedClass))
                } else g.append(b);
                l.trigger("onAddItem", [b]);
                return a
            }, seekTo: function (b, d, h) {
                if (c.circular && b === 0 && k == -1 && d !== 0) return a;
                if (!c.circular && b < 0 || b > a.getSize() || b < -1) return a;
                var i = b;
                if (b.jquery) b = a.getItems().index(b); else i = a.getItems().eq(b);
                var q = e.Event("onBeforeSeek");
                if (!h) {
                    l.trigger(q, [b, d]);
                    if (q.isDefaultPrevented() || !i.length) return a
                }
                i = m ? {top: -i.position().top} : {left: -i.position().left};
                k = b;
                j = a;
                if (d === undefined) d = c.speed;
                g.animate(i, d, c.easing, h || function () {
                    l.trigger("onSeek", [b])
                });
                return a
            }
        });
        e.each(["onBeforeSeek", "onSeek", "onAddItem"], function (b, d) {
            e.isFunction(c[d]) && e(a).bind(d, c[d]);
            a[d] = function (h) {
                e(a).bind(d, h);
                return a
            }
        });
        if (c.circular) {
            var r = a.getItems().slice(-1).clone().prependTo(g),
                s = a.getItems().eq(1).clone().appendTo(g);
            r.add(s).addClass(c.clonedClass);
            a.onBeforeSeek(function (b, d, h) {
                if (!b.isDefaultPrevented()) if (d == -1) {
                    a.seekTo(r, h, function () {
                        a.end(0)
                    });
                    return b.preventDefault()
                } else d == a.getSize() && a.seekTo(s, h, function () {
                    a.begin(0)
                })
            });
            a.seekTo(0, 0)
        }
        var o = n(f, c.prev).click(function () {
            a.prev()
        }), p = n(f, c.next).click(function () {
            a.next()
        });
        !c.circular && a.getSize() > 1 && a.onBeforeSeek(function (b, d) {
            setTimeout(function () {
                if (!b.isDefaultPrevented()) {
                    o.toggleClass(c.disabledClass,
                        d <= 0);
                    p.toggleClass(c.disabledClass, d >= a.getSize() - 1)
                }
            }, 1)
        });
        c.mousewheel && e.fn.mousewheel && f.mousewheel(function (b, d) {
            if (c.mousewheel) {
                a.move(d < 0 ? 1 : -1, c.wheelSpeed || 50);
                return false
            }
        });
        c.keyboard && e(document).bind("keydown.scrollable", function (b) {
            if (!(!c.keyboard || b.altKey || b.ctrlKey || e(b.target).is(":input"))) if (!(c.keyboard != "static" && j != a)) {
                var d = b.keyCode;
                if (m && (d == 38 || d == 40)) {
                    a.move(d == 38 ? -1 : 1);
                    return b.preventDefault()
                }
                if (!m && (d == 37 || d == 39)) {
                    a.move(d == 37 ? -1 : 1);
                    return b.preventDefault()
                }
            }
        });
        e(a).trigger("onBeforeSeek", [c.initialIndex])
    }

    e.tools = e.tools || {version: "1.2.3"};
    e.tools.scrollable = {
        conf: {
            activeClass: "active",
            circular: false,
            clonedClass: "cloned",
            disabledClass: "disabled",
            easing: "swing",
            initialIndex: 0,
            item: null,
            items: ".items",
            keyboard: true,
            mousewheel: false,
            next: ".next",
            prev: ".prev",
            speed: 400,
            vertical: false,
            wheelSpeed: 0
        }
    };
    var j;
    e.fn.scrollable = function (f) {
        var c = this.data("scrollable");
        if (c) return c;
        f = e.extend({}, e.tools.scrollable.conf, f);
        this.each(function () {
            c = new t(e(this), f);
            e(this).data("scrollable",
                c)
        });
        return f.api ? c : this
    }
})(jQuery);
(function (c) {
    var g = c.tools.scrollable;
    g.autoscroll = {conf: {autoplay: true, interval: 3E3, autopause: true}};
    c.fn.autoscroll = function (d) {
        if (typeof d == "number") d = {interval: d};
        var b = c.extend({}, g.autoscroll.conf, d), h;
        this.each(function () {
            var a = c(this).data("scrollable");
            if (a) h = a;
            var e, i, f = true;
            a.play = function () {
                if (!e) {
                    f = false;
                    e = setInterval(function () {
                        a.next()
                    }, b.interval);
                    a.next()
                }
            };
            a.pause = function () {
                e = clearInterval(e)
            };
            a.stop = function () {
                a.pause();
                f = true
            };
            b.autopause && a.getRoot().add(a.getNaviButtons()).hover(function () {
                a.pause();
                clearInterval(i)
            }, function () {
                f || (i = setTimeout(a.play, b.interval))
            });
            b.autoplay && setTimeout(a.play, b.interval)
        });
        return b.api ? h : this
    }
})(jQuery);
(function (d) {
    function p(c, g) {
        var h = d(g);
        return h.length < 2 ? h : c.parent().find(g)
    }

    var m = d.tools.scrollable;
    m.navigator = {
        conf: {
            navi: ".navi",
            naviItem: null,
            activeClass: "active",
            indexed: false,
            idPrefix: null,
            history: false
        }
    };
    d.fn.navigator = function (c) {
        if (typeof c == "string") c = {navi: c};
        c = d.extend({}, m.navigator.conf, c);
        var g;
        this.each(function () {
            function h(a, b, i) {
                e.seekTo(b);
                if (j) {
                    if (location.hash) location.hash = a.attr("href").replace("#", "")
                } else return i.preventDefault()
            }

            function f() {
                return k.find(c.naviItem ||
                    "> *")
            }

            function n(a) {
                var b = d("<" + (c.naviItem || "a") + "/>").click(function (i) {
                    h(d(this), a, i)
                }).attr("href", "#" + a);
                a === 0 && b.addClass(l);
                c.indexed && b.text(a + 1);
                c.idPrefix && b.attr("id", c.idPrefix + a);
                return b.appendTo(k)
            }

            function o(a, b) {
                a = f().eq(b.replace("#", ""));
                a.length || (a = f().filter("[href=" + b + "]"));
                a.click()
            }

            var e = d(this).data("scrollable"), k = p(e.getRoot(), c.navi), q = e.getNaviButtons(), l = c.activeClass,
                j = c.history && d.fn.history;
            if (e) g = e;
            e.getNaviButtons = function () {
                return q.add(k)
            };
            f().length ? f().each(function (a) {
                d(this).click(function (b) {
                    h(d(this),
                        a, b)
                })
            }) : d.each(e.getItems(), function (a) {
                n(a)
            });
            e.onBeforeSeek(function (a, b) {
                setTimeout(function () {
                    if (!a.isDefaultPrevented()) {
                        var i = f().eq(b);
                        !a.isDefaultPrevented() && i.length && f().removeClass(l).eq(b).addClass(l)
                    }
                }, 1)
            });
            e.onAddItem(function (a, b) {
                b = n(e.getItems().index(b));
                j && b.history(o)
            });
            j && f().history(o)
        });
        return c.api ? g : this
    }
})(jQuery);
(function (a) {
    function t(d, b) {
        var c = this, i = d.add(c), o = a(window), k, f, m, g = a.tools.expose && (b.mask || b.expose),
            n = Math.random().toString().slice(10);
        if (g) {
            if (typeof g == "string") g = {color: g};
            g.closeOnClick = g.closeOnEsc = false
        }
        var p = b.target || d.attr("rel");
        f = p ? a(p) : d;
        if (!f.length) throw"Could not find Overlay: " + p;
        d && d.index(f) == -1 && d.click(function (e) {
            c.load(e);
            return e.preventDefault()
        });
        a.extend(c, {
            load: function (e) {
                if (c.isOpened()) return c;
                var h = q[b.effect];
                if (!h) throw'Overlay: cannot find effect : "' + b.effect +
                '"';
                b.oneInstance && a.each(s, function () {
                    this.close(e)
                });
                e = e || a.Event();
                e.type = "onBeforeLoad";
                i.trigger(e);
                if (e.isDefaultPrevented()) return c;
                m = true;
                g && a(f).expose(g);
                var j = b.top, r = b.left, u = f.outerWidth({margin: true}), v = f.outerHeight({margin: true});
                if (typeof j == "string") j = j == "center" ? Math.max((o.height() - v) / 2, 0) : parseInt(j, 10) / 100 * o.height();
                if (r == "center") r = Math.max((o.width() - u) / 2, 0);
                h[0].call(c, {top: j, left: r}, function () {
                    if (m) {
                        e.type = "onLoad";
                        i.trigger(e)
                    }
                });
                g && b.closeOnClick && a.mask.getMask().one("click",
                    c.close);
                b.closeOnClick && a(document).bind("click." + n, function (l) {
                    a(l.target).parents(f).length || c.close(l)
                });
                b.closeOnEsc && a(document).bind("keydown." + n, function (l) {
                    l.keyCode == 27 && c.close(l)
                });
                return c
            }, close: function (e) {
                if (!c.isOpened()) return c;
                e = e || a.Event();
                e.type = "onBeforeClose";
                i.trigger(e);
                if (!e.isDefaultPrevented()) {
                    m = false;
                    q[b.effect][1].call(c, function () {
                        e.type = "onClose";
                        i.trigger(e)
                    });
                    a(document).unbind("click." + n).unbind("keydown." + n);
                    g && a.mask.close();
                    return c
                }
            }, getOverlay: function () {
                return f
            },
            getTrigger: function () {
                return d
            }, getClosers: function () {
                return k
            }, isOpened: function () {
                return m
            }, getConf: function () {
                return b
            }
        });
        a.each("onBeforeLoad,onStart,onLoad,onBeforeClose,onClose".split(","), function (e, h) {
            a.isFunction(b[h]) && a(c).bind(h, b[h]);
            c[h] = function (j) {
                a(c).bind(h, j);
                return c
            }
        });
        k = f.find(b.close || ".close");
        if (!k.length && !b.close) {
            k = a('<a class="close"></a>');
            f.prepend(k)
        }
        k.click(function (e) {
            c.close(e)
        });
        b.load && c.load()
    }

    a.tools = a.tools || {version: "1.2.3"};
    a.tools.overlay = {
        addEffect: function (d,
                             b, c) {
            q[d] = [b, c]
        },
        conf: {
            close: null,
            closeOnClick: true,
            closeOnEsc: true,
            closeSpeed: "fast",
            effect: "default",
            fixed: !a.browser.msie || a.browser.version > 6,
            left: "center",
            load: false,
            mask: null,
            oneInstance: true,
            speed: "normal",
            target: null,
            top: "10%"
        }
    };
    var s = [], q = {};
    a.tools.overlay.addEffect("default", function (d, b) {
        var c = this.getConf(), i = a(window);
        if (!c.fixed) {
            d.top += i.scrollTop();
            d.left += i.scrollLeft()
        }
        d.position = c.fixed ? "fixed" : "absolute";
        this.getOverlay().css(d).fadeIn(c.speed, b)
    }, function (d) {
        this.getOverlay().fadeOut(this.getConf().closeSpeed,
            d)
    });
    a.fn.overlay = function (d) {
        var b = this.data("overlay");
        if (b) return b;
        if (a.isFunction(d)) d = {onBeforeLoad: d};
        d = a.extend(true, {}, a.tools.overlay.conf, d);
        this.each(function () {
            b = new t(a(this), d);
            s.push(b);
            a(this).data("overlay", b)
        });
        return d.api ? b : this
    }
})(jQuery);
(function (i) {
    function j(b) {
        var d = b.offset();
        return {top: d.top + b.height() / 2, left: d.left + b.width() / 2}
    }

    var k = i.tools.overlay, f = i(window);
    i.extend(k.conf, {start: {top: null, left: null}, fadeInSpeed: "fast", zIndex: 9999});

    function n(b, d) {
        var a = this.getOverlay(), c = this.getConf(), g = this.getTrigger(), o = this,
            l = a.outerWidth({margin: true}), h = a.data("img");
        if (!h) {
            var e = a.css("backgroundImage");
            if (!e) throw"background-image CSS property not set for overlay";
            e = e.slice(e.indexOf("(") + 1, e.indexOf(")")).replace(/\"/g, "");
            a.css("backgroundImage", "none");
            h = i('<img src="' + e + '"/>');
            h.css({border: 0, display: "none"}).width(l);
            i("body").append(h);
            a.data("img", h)
        }
        e = c.start.top || Math.round(f.height() / 2);
        var m = c.start.left || Math.round(f.width() / 2);
        if (g) {
            g = j(g);
            e = g.top;
            m = g.left
        }
        h.css({position: "absolute", top: e, left: m, width: 0, zIndex: c.zIndex}).show();
        b.top += f.scrollTop();
        b.left += f.scrollLeft();
        b.position = "absolute";
        a.css(b);
        h.animate({top: a.css("top"), left: a.css("left"), width: l}, c.speed, function () {
            if (c.fixed) {
                b.top -= f.scrollTop();
                b.left -= f.scrollLeft();
                b.position = "fixed";
                h.add(a).css(b)
            }
            a.css("zIndex", c.zIndex + 1).fadeIn(c.fadeInSpeed, function () {
                o.isOpened() && !i(this).index(a) ? d.call() : a.hide()
            })
        })
    }

    function p(b) {
        var d = this.getOverlay().hide(), a = this.getConf(), c = this.getTrigger();
        d = d.data("img");
        var g = {top: a.start.top, left: a.start.left, width: 0};
        c && i.extend(g, j(c));
        a.fixed && d.css({position: "absolute"}).animate({top: "+=" + f.scrollTop(), left: "+=" + f.scrollLeft()}, 0);
        d.animate(g, a.closeSpeed, b)
    }

    k.addEffect("apple", n, p)
})(jQuery);
