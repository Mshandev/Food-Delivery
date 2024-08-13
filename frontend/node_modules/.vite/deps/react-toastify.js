"use client";
import {
  require_react
} from "./chunk-DRWLMN53.js";
import {
  __toESM
} from "./chunk-G3PMV62Z.js";

// node_modules/react-toastify/dist/react-toastify.esm.mjs
var import_react = __toESM(require_react(), 1);

// node_modules/clsx/dist/clsx.mjs
function r(e2) {
  var t2, f2, n2 = "";
  if ("string" == typeof e2 || "number" == typeof e2) n2 += e2;
  else if ("object" == typeof e2) if (Array.isArray(e2)) {
    var o2 = e2.length;
    for (t2 = 0; t2 < o2; t2++) e2[t2] && (f2 = r(e2[t2])) && (n2 && (n2 += " "), n2 += f2);
  } else for (f2 in e2) e2[f2] && (n2 && (n2 += " "), n2 += f2);
  return n2;
}
function clsx() {
  for (var e2, t2, f2 = 0, n2 = "", o2 = arguments.length; f2 < o2; f2++) (e2 = arguments[f2]) && (t2 = r(e2)) && (n2 && (n2 += " "), n2 += t2);
  return n2;
}
var clsx_default = clsx;

// node_modules/react-toastify/dist/react-toastify.esm.mjs
var c = (e2) => "number" == typeof e2 && !isNaN(e2);
var d = (e2) => "string" == typeof e2;
var u = (e2) => "function" == typeof e2;
var p = (e2) => d(e2) || u(e2) ? e2 : null;
var m = (e2) => (0, import_react.isValidElement)(e2) || d(e2) || u(e2) || c(e2);
function f(e2, t2, n2) {
  void 0 === n2 && (n2 = 300);
  const { scrollHeight: o2, style: s2 } = e2;
  requestAnimationFrame(() => {
    s2.minHeight = "initial", s2.height = o2 + "px", s2.transition = `all ${n2}ms`, requestAnimationFrame(() => {
      s2.height = "0", s2.padding = "0", s2.margin = "0", setTimeout(t2, n2);
    });
  });
}
function g(t2) {
  let { enter: a2, exit: r3, appendPosition: i2 = false, collapse: l = true, collapseDuration: c2 = 300 } = t2;
  return function(t3) {
    let { children: d2, position: u2, preventExitTransition: p2, done: m2, nodeRef: g2, isIn: y2, playToast: v2 } = t3;
    const h2 = i2 ? `${a2}--${u2}` : a2, T2 = i2 ? `${r3}--${u2}` : r3, E2 = (0, import_react.useRef)(0);
    return (0, import_react.useLayoutEffect)(() => {
      const e2 = g2.current, t4 = h2.split(" "), n2 = (o2) => {
        o2.target === g2.current && (v2(), e2.removeEventListener("animationend", n2), e2.removeEventListener("animationcancel", n2), 0 === E2.current && "animationcancel" !== o2.type && e2.classList.remove(...t4));
      };
      e2.classList.add(...t4), e2.addEventListener("animationend", n2), e2.addEventListener("animationcancel", n2);
    }, []), (0, import_react.useEffect)(() => {
      const e2 = g2.current, t4 = () => {
        e2.removeEventListener("animationend", t4), l ? f(e2, m2, c2) : m2();
      };
      y2 || (p2 ? t4() : (E2.current = 1, e2.className += ` ${T2}`, e2.addEventListener("animationend", t4)));
    }, [y2]), import_react.default.createElement(import_react.default.Fragment, null, d2);
  };
}
function y(e2, t2) {
  return null != e2 ? { content: e2.content, containerId: e2.props.containerId, id: e2.props.toastId, theme: e2.props.theme, type: e2.props.type, data: e2.props.data || {}, isLoading: e2.props.isLoading, icon: e2.props.icon, status: t2 } : {};
}
var v = /* @__PURE__ */ new Map();
var h = [];
var T = /* @__PURE__ */ new Set();
var E = (e2) => T.forEach((t2) => t2(e2));
var b = () => v.size > 0;
function I(e2, t2) {
  var n2;
  if (t2) return !(null == (n2 = v.get(t2)) || !n2.isToastActive(e2));
  let o2 = false;
  return v.forEach((t3) => {
    t3.isToastActive(e2) && (o2 = true);
  }), o2;
}
function _(e2, t2) {
  m(e2) && (b() || h.push({ content: e2, options: t2 }), v.forEach((n2) => {
    n2.buildToast(e2, t2);
  }));
}
function C(e2, t2) {
  v.forEach((n2) => {
    null != t2 && null != t2 && t2.containerId ? (null == t2 ? void 0 : t2.containerId) === n2.id && n2.toggle(e2, null == t2 ? void 0 : t2.id) : n2.toggle(e2, null == t2 ? void 0 : t2.id);
  });
}
function L(e2) {
  const { subscribe: o2, getSnapshot: s2, setProps: i2 } = (0, import_react.useRef)(function(e3) {
    const n2 = e3.containerId || 1;
    return { subscribe(o3) {
      const s3 = /* @__PURE__ */ function(e4, n3, o4) {
        let s4 = 1, r4 = 0, i3 = [], l2 = [], f2 = [], g2 = n3;
        const v2 = /* @__PURE__ */ new Map(), h2 = /* @__PURE__ */ new Set(), T2 = () => {
          f2 = Array.from(v2.values()), h2.forEach((e5) => e5());
        }, E2 = (e5) => {
          l2 = null == e5 ? [] : l2.filter((t2) => t2 !== e5), T2();
        }, b2 = (e5) => {
          const { toastId: n4, onOpen: s5, updateId: a2, children: r5 } = e5.props, i4 = null == a2;
          e5.staleId && v2.delete(e5.staleId), v2.set(n4, e5), l2 = [...l2, e5.props.toastId].filter((t2) => t2 !== e5.staleId), T2(), o4(y(e5, i4 ? "added" : "updated")), i4 && u(s5) && s5((0, import_react.isValidElement)(r5) && r5.props);
        };
        return { id: e4, props: g2, observe: (e5) => (h2.add(e5), () => h2.delete(e5)), toggle: (e5, t2) => {
          v2.forEach((n4) => {
            null != t2 && t2 !== n4.props.toastId || u(n4.toggle) && n4.toggle(e5);
          });
        }, removeToast: E2, toasts: v2, clearQueue: () => {
          r4 -= i3.length, i3 = [];
        }, buildToast: (n4, l3) => {
          if (((t2) => {
            let { containerId: n5, toastId: o5, updateId: s5 } = t2;
            const a2 = n5 ? n5 !== e4 : 1 !== e4, r5 = v2.has(o5) && null == s5;
            return a2 || r5;
          })(l3)) return;
          const { toastId: f3, updateId: h3, data: I2, staleId: _2, delay: C2 } = l3, L2 = () => {
            E2(f3);
          }, N2 = null == h3;
          N2 && r4++;
          const $2 = { ...g2, style: g2.toastStyle, key: s4++, ...Object.fromEntries(Object.entries(l3).filter((e5) => {
            let [t2, n5] = e5;
            return null != n5;
          })), toastId: f3, updateId: h3, data: I2, closeToast: L2, isIn: false, className: p(l3.className || g2.toastClassName), bodyClassName: p(l3.bodyClassName || g2.bodyClassName), progressClassName: p(l3.progressClassName || g2.progressClassName), autoClose: !l3.isLoading && (w2 = l3.autoClose, k2 = g2.autoClose, false === w2 || c(w2) && w2 > 0 ? w2 : k2), deleteToast() {
            const e5 = v2.get(f3), { onClose: n5, children: s5 } = e5.props;
            u(n5) && n5((0, import_react.isValidElement)(s5) && s5.props), o4(y(e5, "removed")), v2.delete(f3), r4--, r4 < 0 && (r4 = 0), i3.length > 0 ? b2(i3.shift()) : T2();
          } };
          var w2, k2;
          $2.closeButton = g2.closeButton, false === l3.closeButton || m(l3.closeButton) ? $2.closeButton = l3.closeButton : true === l3.closeButton && ($2.closeButton = !m(g2.closeButton) || g2.closeButton);
          let P2 = n4;
          (0, import_react.isValidElement)(n4) && !d(n4.type) ? P2 = (0, import_react.cloneElement)(n4, { closeToast: L2, toastProps: $2, data: I2 }) : u(n4) && (P2 = n4({ closeToast: L2, toastProps: $2, data: I2 }));
          const M2 = { content: P2, props: $2, staleId: _2 };
          g2.limit && g2.limit > 0 && r4 > g2.limit && N2 ? i3.push(M2) : c(C2) ? setTimeout(() => {
            b2(M2);
          }, C2) : b2(M2);
        }, setProps(e5) {
          g2 = e5;
        }, setToggle: (e5, t2) => {
          v2.get(e5).toggle = t2;
        }, isToastActive: (e5) => l2.some((t2) => t2 === e5), getSnapshot: () => g2.newestOnTop ? f2.reverse() : f2 };
      }(n2, e3, E);
      v.set(n2, s3);
      const r3 = s3.observe(o3);
      return h.forEach((e4) => _(e4.content, e4.options)), h = [], () => {
        r3(), v.delete(n2);
      };
    }, setProps(e4) {
      var t2;
      null == (t2 = v.get(n2)) || t2.setProps(e4);
    }, getSnapshot() {
      var e4;
      return null == (e4 = v.get(n2)) ? void 0 : e4.getSnapshot();
    } };
  }(e2)).current;
  i2(e2);
  const l = (0, import_react.useSyncExternalStore)(o2, s2, s2);
  return { getToastToRender: function(e3) {
    if (!l) return [];
    const t2 = /* @__PURE__ */ new Map();
    return l.forEach((e4) => {
      const { position: n2 } = e4.props;
      t2.has(n2) || t2.set(n2, []), t2.get(n2).push(e4);
    }), Array.from(t2, (t3) => e3(t3[0], t3[1]));
  }, isToastActive: I, count: null == l ? void 0 : l.length };
}
function N(e2) {
  const [t2, o2] = (0, import_react.useState)(false), [a2, r3] = (0, import_react.useState)(false), l = (0, import_react.useRef)(null), c2 = (0, import_react.useRef)({ start: 0, delta: 0, removalDistance: 0, canCloseOnClick: true, canDrag: false, didMove: false }).current, { autoClose: d2, pauseOnHover: u2, closeToast: p2, onClick: m2, closeOnClick: f2 } = e2;
  var g2, y2;
  function h2() {
    o2(true);
  }
  function T2() {
    o2(false);
  }
  function E2(n2) {
    const o3 = l.current;
    c2.canDrag && o3 && (c2.didMove = true, t2 && T2(), c2.delta = "x" === e2.draggableDirection ? n2.clientX - c2.start : n2.clientY - c2.start, c2.start !== n2.clientX && (c2.canCloseOnClick = false), o3.style.transform = `translate3d(${"x" === e2.draggableDirection ? `${c2.delta}px, var(--y)` : `0, calc(${c2.delta}px + var(--y))`},0)`, o3.style.opacity = "" + (1 - Math.abs(c2.delta / c2.removalDistance)));
  }
  function b2() {
    document.removeEventListener("pointermove", E2), document.removeEventListener("pointerup", b2);
    const t3 = l.current;
    if (c2.canDrag && c2.didMove && t3) {
      if (c2.canDrag = false, Math.abs(c2.delta) > c2.removalDistance) return r3(true), e2.closeToast(), void e2.collapseAll();
      t3.style.transition = "transform 0.2s, opacity 0.2s", t3.style.removeProperty("transform"), t3.style.removeProperty("opacity");
    }
  }
  null == (y2 = v.get((g2 = { id: e2.toastId, containerId: e2.containerId, fn: o2 }).containerId || 1)) || y2.setToggle(g2.id, g2.fn), (0, import_react.useEffect)(() => {
    if (e2.pauseOnFocusLoss) return document.hasFocus() || T2(), window.addEventListener("focus", h2), window.addEventListener("blur", T2), () => {
      window.removeEventListener("focus", h2), window.removeEventListener("blur", T2);
    };
  }, [e2.pauseOnFocusLoss]);
  const I2 = { onPointerDown: function(t3) {
    if (true === e2.draggable || e2.draggable === t3.pointerType) {
      c2.didMove = false, document.addEventListener("pointermove", E2), document.addEventListener("pointerup", b2);
      const n2 = l.current;
      c2.canCloseOnClick = true, c2.canDrag = true, n2.style.transition = "none", "x" === e2.draggableDirection ? (c2.start = t3.clientX, c2.removalDistance = n2.offsetWidth * (e2.draggablePercent / 100)) : (c2.start = t3.clientY, c2.removalDistance = n2.offsetHeight * (80 === e2.draggablePercent ? 1.5 * e2.draggablePercent : e2.draggablePercent) / 100);
    }
  }, onPointerUp: function(t3) {
    const { top: n2, bottom: o3, left: s2, right: a3 } = l.current.getBoundingClientRect();
    "touchend" !== t3.nativeEvent.type && e2.pauseOnHover && t3.clientX >= s2 && t3.clientX <= a3 && t3.clientY >= n2 && t3.clientY <= o3 ? T2() : h2();
  } };
  return d2 && u2 && (I2.onMouseEnter = T2, e2.stacked || (I2.onMouseLeave = h2)), f2 && (I2.onClick = (e3) => {
    m2 && m2(e3), c2.canCloseOnClick && p2();
  }), { playToast: h2, pauseToast: T2, isRunning: t2, preventExitTransition: a2, toastRef: l, eventHandlers: I2 };
}
function $(t2) {
  let { delay: n2, isRunning: o2, closeToast: s2, type: a2 = "default", hide: r3, className: i2, style: c2, controlledProgress: d2, progress: p2, rtl: m2, isIn: f2, theme: g2 } = t2;
  const y2 = r3 || d2 && 0 === p2, v2 = { ...c2, animationDuration: `${n2}ms`, animationPlayState: o2 ? "running" : "paused" };
  d2 && (v2.transform = `scaleX(${p2})`);
  const h2 = clsx_default("Toastify__progress-bar", d2 ? "Toastify__progress-bar--controlled" : "Toastify__progress-bar--animated", `Toastify__progress-bar-theme--${g2}`, `Toastify__progress-bar--${a2}`, { "Toastify__progress-bar--rtl": m2 }), T2 = u(i2) ? i2({ rtl: m2, type: a2, defaultClassName: h2 }) : clsx_default(h2, i2), E2 = { [d2 && p2 >= 1 ? "onTransitionEnd" : "onAnimationEnd"]: d2 && p2 < 1 ? null : () => {
    f2 && s2();
  } };
  return import_react.default.createElement("div", { className: "Toastify__progress-bar--wrp", "data-hidden": y2 }, import_react.default.createElement("div", { className: `Toastify__progress-bar--bg Toastify__progress-bar-theme--${g2} Toastify__progress-bar--${a2}` }), import_react.default.createElement("div", { role: "progressbar", "aria-hidden": y2 ? "true" : "false", "aria-label": "notification timer", className: T2, style: v2, ...E2 }));
}
var w = 1;
var k = () => "" + w++;
function P(e2) {
  return e2 && (d(e2.toastId) || c(e2.toastId)) ? e2.toastId : k();
}
function M(e2, t2) {
  return _(e2, t2), t2.toastId;
}
function x(e2, t2) {
  return { ...t2, type: t2 && t2.type || e2, toastId: P(t2) };
}
function A(e2) {
  return (t2, n2) => M(t2, x(e2, n2));
}
function B(e2, t2) {
  return M(e2, x("default", t2));
}
B.loading = (e2, t2) => M(e2, x("default", { isLoading: true, autoClose: false, closeOnClick: false, closeButton: false, draggable: false, ...t2 })), B.promise = function(e2, t2, n2) {
  let o2, { pending: s2, error: a2, success: r3 } = t2;
  s2 && (o2 = d(s2) ? B.loading(s2, n2) : B.loading(s2.render, { ...n2, ...s2 }));
  const i2 = { isLoading: null, autoClose: null, closeOnClick: null, closeButton: null, draggable: null }, l = (e3, t3, s3) => {
    if (null == t3) return void B.dismiss(o2);
    const a3 = { type: e3, ...i2, ...n2, data: s3 }, r4 = d(t3) ? { render: t3 } : t3;
    return o2 ? B.update(o2, { ...a3, ...r4 }) : B(r4.render, { ...a3, ...r4 }), s3;
  }, c2 = u(e2) ? e2() : e2;
  return c2.then((e3) => l("success", r3, e3)).catch((e3) => l("error", a2, e3)), c2;
}, B.success = A("success"), B.info = A("info"), B.error = A("error"), B.warning = A("warning"), B.warn = B.warning, B.dark = (e2, t2) => M(e2, x("default", { theme: "dark", ...t2 })), B.dismiss = function(e2) {
  !function(e3) {
    var t2;
    if (b()) {
      if (null == e3 || d(t2 = e3) || c(t2)) v.forEach((t3) => {
        t3.removeToast(e3);
      });
      else if (e3 && ("containerId" in e3 || "id" in e3)) {
        const t3 = v.get(e3.containerId);
        t3 ? t3.removeToast(e3.id) : v.forEach((t4) => {
          t4.removeToast(e3.id);
        });
      }
    } else h = h.filter((t3) => null != e3 && t3.options.toastId !== e3);
  }(e2);
}, B.clearWaitingQueue = function(e2) {
  void 0 === e2 && (e2 = {}), v.forEach((t2) => {
    !t2.props.limit || e2.containerId && t2.id !== e2.containerId || t2.clearQueue();
  });
}, B.isActive = I, B.update = function(e2, t2) {
  void 0 === t2 && (t2 = {});
  const n2 = ((e3, t3) => {
    var n3;
    let { containerId: o2 } = t3;
    return null == (n3 = v.get(o2 || 1)) ? void 0 : n3.toasts.get(e3);
  })(e2, t2);
  if (n2) {
    const { props: o2, content: s2 } = n2, a2 = { delay: 100, ...o2, ...t2, toastId: t2.toastId || e2, updateId: k() };
    a2.toastId !== e2 && (a2.staleId = e2);
    const r3 = a2.render || s2;
    delete a2.render, M(r3, a2);
  }
}, B.done = (e2) => {
  B.update(e2, { progress: 1 });
}, B.onChange = function(e2) {
  return T.add(e2), () => {
    T.delete(e2);
  };
}, B.play = (e2) => C(true, e2), B.pause = (e2) => C(false, e2);
var O = "undefined" != typeof window ? import_react.useLayoutEffect : import_react.useEffect;
var D = (t2) => {
  let { theme: n2, type: o2, isLoading: s2, ...a2 } = t2;
  return import_react.default.createElement("svg", { viewBox: "0 0 24 24", width: "100%", height: "100%", fill: "colored" === n2 ? "currentColor" : `var(--toastify-icon-color-${o2})`, ...a2 });
};
var z = { info: function(t2) {
  return import_react.default.createElement(D, { ...t2 }, import_react.default.createElement("path", { d: "M12 0a12 12 0 1012 12A12.013 12.013 0 0012 0zm.25 5a1.5 1.5 0 11-1.5 1.5 1.5 1.5 0 011.5-1.5zm2.25 13.5h-4a1 1 0 010-2h.75a.25.25 0 00.25-.25v-4.5a.25.25 0 00-.25-.25h-.75a1 1 0 010-2h1a2 2 0 012 2v4.75a.25.25 0 00.25.25h.75a1 1 0 110 2z" }));
}, warning: function(t2) {
  return import_react.default.createElement(D, { ...t2 }, import_react.default.createElement("path", { d: "M23.32 17.191L15.438 2.184C14.728.833 13.416 0 11.996 0c-1.42 0-2.733.833-3.443 2.184L.533 17.448a4.744 4.744 0 000 4.368C1.243 23.167 2.555 24 3.975 24h16.05C22.22 24 24 22.044 24 19.632c0-.904-.251-1.746-.68-2.44zm-9.622 1.46c0 1.033-.724 1.823-1.698 1.823s-1.698-.79-1.698-1.822v-.043c0-1.028.724-1.822 1.698-1.822s1.698.79 1.698 1.822v.043zm.039-12.285l-.84 8.06c-.057.581-.408.943-.897.943-.49 0-.84-.367-.896-.942l-.84-8.065c-.057-.624.25-1.095.779-1.095h1.91c.528.005.84.476.784 1.1z" }));
}, success: function(t2) {
  return import_react.default.createElement(D, { ...t2 }, import_react.default.createElement("path", { d: "M12 0a12 12 0 1012 12A12.014 12.014 0 0012 0zm6.927 8.2l-6.845 9.289a1.011 1.011 0 01-1.43.188l-4.888-3.908a1 1 0 111.25-1.562l4.076 3.261 6.227-8.451a1 1 0 111.61 1.183z" }));
}, error: function(t2) {
  return import_react.default.createElement(D, { ...t2 }, import_react.default.createElement("path", { d: "M11.983 0a12.206 12.206 0 00-8.51 3.653A11.8 11.8 0 000 12.207 11.779 11.779 0 0011.8 24h.214A12.111 12.111 0 0024 11.791 11.766 11.766 0 0011.983 0zM10.5 16.542a1.476 1.476 0 011.449-1.53h.027a1.527 1.527 0 011.523 1.47 1.475 1.475 0 01-1.449 1.53h-.027a1.529 1.529 0 01-1.523-1.47zM11 12.5v-6a1 1 0 012 0v6a1 1 0 11-2 0z" }));
}, spinner: function() {
  return import_react.default.createElement("div", { className: "Toastify__spinner" });
} };
var R = (n2) => {
  const { isRunning: o2, preventExitTransition: s2, toastRef: r3, eventHandlers: i2, playToast: c2 } = N(n2), { closeButton: d2, children: p2, autoClose: m2, onClick: f2, type: g2, hideProgressBar: y2, closeToast: v2, transition: h2, position: T2, className: E2, style: b2, bodyClassName: I2, bodyStyle: _2, progressClassName: C2, progressStyle: L2, updateId: w2, role: k2, progress: P2, rtl: M2, toastId: x2, deleteToast: A2, isIn: B2, isLoading: O2, closeOnClick: D2, theme: R2 } = n2, S2 = clsx_default("Toastify__toast", `Toastify__toast-theme--${R2}`, `Toastify__toast--${g2}`, { "Toastify__toast--rtl": M2 }, { "Toastify__toast--close-on-click": D2 }), H2 = u(E2) ? E2({ rtl: M2, position: T2, type: g2, defaultClassName: S2 }) : clsx_default(S2, E2), F2 = function(e2) {
    let { theme: n3, type: o3, isLoading: s3, icon: r4 } = e2, i3 = null;
    const l = { theme: n3, type: o3 };
    return false === r4 || (u(r4) ? i3 = r4({ ...l, isLoading: s3 }) : (0, import_react.isValidElement)(r4) ? i3 = (0, import_react.cloneElement)(r4, l) : s3 ? i3 = z.spinner() : ((e3) => e3 in z)(o3) && (i3 = z[o3](l))), i3;
  }(n2), X2 = !!P2 || !m2, Y2 = { closeToast: v2, type: g2, theme: R2 };
  let q2 = null;
  return false === d2 || (q2 = u(d2) ? d2(Y2) : (0, import_react.isValidElement)(d2) ? (0, import_react.cloneElement)(d2, Y2) : function(t2) {
    let { closeToast: n3, theme: o3, ariaLabel: s3 = "close" } = t2;
    return import_react.default.createElement("button", { className: `Toastify__close-button Toastify__close-button--${o3}`, type: "button", onClick: (e2) => {
      e2.stopPropagation(), n3(e2);
    }, "aria-label": s3 }, import_react.default.createElement("svg", { "aria-hidden": "true", viewBox: "0 0 14 16" }, import_react.default.createElement("path", { fillRule: "evenodd", d: "M7.71 8.23l3.75 3.75-1.48 1.48-3.75-3.75-3.75 3.75L1 11.98l3.75-3.75L1 4.48 2.48 3l3.75 3.75L9.98 3l1.48 1.48-3.75 3.75z" })));
  }(Y2)), import_react.default.createElement(h2, { isIn: B2, done: A2, position: T2, preventExitTransition: s2, nodeRef: r3, playToast: c2 }, import_react.default.createElement("div", { id: x2, onClick: f2, "data-in": B2, className: H2, ...i2, style: b2, ref: r3 }, import_react.default.createElement("div", { ...B2 && { role: k2 }, className: u(I2) ? I2({ type: g2 }) : clsx_default("Toastify__toast-body", I2), style: _2 }, null != F2 && import_react.default.createElement("div", { className: clsx_default("Toastify__toast-icon", { "Toastify--animate-icon Toastify__zoom-enter": !O2 }) }, F2), import_react.default.createElement("div", null, p2)), q2, import_react.default.createElement($, { ...w2 && !X2 ? { key: `pb-${w2}` } : {}, rtl: M2, theme: R2, delay: m2, isRunning: o2, isIn: B2, closeToast: v2, hide: y2, type: g2, style: L2, className: C2, controlledProgress: X2, progress: P2 || 0 })));
};
var S = function(e2, t2) {
  return void 0 === t2 && (t2 = false), { enter: `Toastify--animate Toastify__${e2}-enter`, exit: `Toastify--animate Toastify__${e2}-exit`, appendPosition: t2 };
};
var H = g(S("bounce", true));
var F = g(S("slide", true));
var X = g(S("zoom"));
var Y = g(S("flip"));
var q = { position: "top-right", transition: H, autoClose: 5e3, closeButton: true, pauseOnHover: true, pauseOnFocusLoss: true, draggable: "touch", draggablePercent: 80, draggableDirection: "x", role: "alert", theme: "light" };
function Q(t2) {
  let o2 = { ...q, ...t2 };
  const s2 = t2.stacked, [a2, r3] = (0, import_react.useState)(true), c2 = (0, import_react.useRef)(null), { getToastToRender: d2, isToastActive: m2, count: f2 } = L(o2), { className: g2, style: y2, rtl: v2, containerId: h2 } = o2;
  function T2(e2) {
    const t3 = clsx_default("Toastify__toast-container", `Toastify__toast-container--${e2}`, { "Toastify__toast-container--rtl": v2 });
    return u(g2) ? g2({ position: e2, rtl: v2, defaultClassName: t3 }) : clsx_default(t3, p(g2));
  }
  function E2() {
    s2 && (r3(true), B.play());
  }
  return O(() => {
    if (s2) {
      var e2;
      const t3 = c2.current.querySelectorAll('[data-in="true"]'), n2 = 12, s3 = null == (e2 = o2.position) ? void 0 : e2.includes("top");
      let r4 = 0, i2 = 0;
      Array.from(t3).reverse().forEach((e3, t4) => {
        const o3 = e3;
        o3.classList.add("Toastify__toast--stacked"), t4 > 0 && (o3.dataset.collapsed = `${a2}`), o3.dataset.pos || (o3.dataset.pos = s3 ? "top" : "bot");
        const l = r4 * (a2 ? 0.2 : 1) + (a2 ? 0 : n2 * t4);
        o3.style.setProperty("--y", `${s3 ? l : -1 * l}px`), o3.style.setProperty("--g", `${n2}`), o3.style.setProperty("--s", "" + (1 - (a2 ? i2 : 0))), r4 += o3.offsetHeight, i2 += 0.025;
      });
    }
  }, [a2, f2, s2]), import_react.default.createElement("div", { ref: c2, className: "Toastify", id: h2, onMouseEnter: () => {
    s2 && (r3(false), B.pause());
  }, onMouseLeave: E2 }, d2((t3, n2) => {
    const o3 = n2.length ? { ...y2 } : { ...y2, pointerEvents: "none" };
    return import_react.default.createElement("div", { className: T2(t3), style: o3, key: `container-${t3}` }, n2.map((t4) => {
      let { content: n3, props: o4 } = t4;
      return import_react.default.createElement(R, { ...o4, stacked: s2, collapseAll: E2, isIn: m2(o4.toastId, o4.containerId), style: o4.style, key: `toast-${o4.key}` }, n3);
    }));
  }));
}
export {
  H as Bounce,
  Y as Flip,
  z as Icons,
  F as Slide,
  Q as ToastContainer,
  X as Zoom,
  f as collapseToast,
  g as cssTransition,
  B as toast,
  N as useToast,
  L as useToastContainer
};
//# sourceMappingURL=react-toastify.js.map
