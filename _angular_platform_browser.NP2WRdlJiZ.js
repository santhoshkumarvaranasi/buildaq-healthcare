import { a as b, b as Q } from "@nf-internal/chunk-4CLCTAJ7";
import { ɵDomAdapter as je, ɵsetRootDomAdapter as xe, ɵparseCookieValue as Be, ɵgetDOM as fe, DOCUMENT as j, ɵPLATFORM_BROWSER_ID as Fe, XhrFactory as Ve, CommonModule as ze } from "@angular/common";
import * as p from "@angular/core";
import { ɵglobal as y, ɵRuntimeError as Ge, ɵinternalCreateApplication as pe, PLATFORM_ID as $e, PLATFORM_INITIALIZER as Ze, createPlatformFactory as Ye, platformCore as Ke, InjectionToken as Kt, ɵTESTABILITY_GETTER as Y, ɵTESTABILITY as Xe, Testability as K, NgZone as le, TestabilityRegistry as de, ɵINJECTOR_SCOPE as We, ErrorHandler as he, RendererFactory2 as Je, ApplicationModule as qe, ɵsetDocument as Qe } from "@angular/core";
import { DOCUMENT as $, ɵgetDOM as Ae } from "@angular/common";
import * as c from "@angular/core";
import { InjectionToken as re, ɵRuntimeError as V, APP_ID as oe, CSP_NONCE as se, PLATFORM_ID as Ie, ViewEncapsulation as O, ɵTracingService as be, RendererStyleFlags2 as N, ɵallLeavingAnimations as Oe } from "@angular/core";
var v = class {
    _doc;
    constructor(r) { this._doc = r; }
    manager;
}, w = (() => { class n extends v {
    constructor(e) { super(e); }
    supports(e) { return !0; }
    addEventListener(e, t, o, s) { return e.addEventListener(t, o, s), () => this.removeEventListener(e, t, o, s); }
    removeEventListener(e, t, o, s) { return e.removeEventListener(t, o, s); }
    static ɵfac = function (t) { return new (t || n)(c.ɵɵinject($)); };
    static ɵprov = c.ɵɵdefineInjectable({ token: n, factory: n.ɵfac });
} return n; })(), S = new re(""), H = (() => { class n {
    _zone;
    _plugins;
    _eventNameToPlugin = new Map;
    constructor(e, t) { this._zone = t, e.forEach(i => { i.manager = this; }); let o = e.filter(i => !(i instanceof w)); this._plugins = o.slice().reverse(); let s = e.find(i => i instanceof w); s && this._plugins.push(s); }
    addEventListener(e, t, o, s) { return this._findPluginFor(t).addEventListener(e, t, o, s); }
    getZone() { return this._zone; }
    _findPluginFor(e) { let t = this._eventNameToPlugin.get(e); if (t)
        return t; if (t = this._plugins.find(s => s.supports(e)), !t)
        throw new V(5101, !1); return this._eventNameToPlugin.set(e, t), t; }
    static ɵfac = function (t) { return new (t || n)(c.ɵɵinject(S), c.ɵɵinject(c.NgZone)); };
    static ɵprov = c.ɵɵdefineInjectable({ token: n, factory: n.ɵfac });
} return n; })(), L = "ng-app-id";
function ee(n) { for (let r of n)
    r.remove(); }
function te(n, r) { let e = r.createElement("style"); return e.textContent = n, e; }
function Ne(n, r, e, t) { let o = n.head?.querySelectorAll(`style[${L}="${r}"],link[${L}="${r}"]`); if (o)
    for (let s of o)
        s.removeAttribute(L), s instanceof HTMLLinkElement ? t.set(s.href.slice(s.href.lastIndexOf("/") + 1), { usage: 0, elements: [s] }) : s.textContent && e.set(s.textContent, { usage: 0, elements: [s] }); }
function z(n, r) { let e = r.createElement("link"); return e.setAttribute("rel", "stylesheet"), e.setAttribute("href", n), e; }
var k = (() => { class n {
    doc;
    appId;
    nonce;
    inline = new Map;
    external = new Map;
    hosts = new Set;
    constructor(e, t, o, s = {}) { this.doc = e, this.appId = t, this.nonce = o, Ne(e, t, this.inline, this.external), this.hosts.add(e.head); }
    addStyles(e, t) { for (let o of e)
        this.addUsage(o, this.inline, te); t?.forEach(o => this.addUsage(o, this.external, z)); }
    removeStyles(e, t) { for (let o of e)
        this.removeUsage(o, this.inline); t?.forEach(o => this.removeUsage(o, this.external)); }
    addUsage(e, t, o) { let s = t.get(e); s ? s.usage++ : t.set(e, { usage: 1, elements: [...this.hosts].map(i => this.addElement(i, o(e, this.doc))) }); }
    removeUsage(e, t) { let o = t.get(e); o && (o.usage--, o.usage <= 0 && (ee(o.elements), t.delete(e))); }
    ngOnDestroy() { for (let [, { elements: e }] of [...this.inline, ...this.external])
        ee(e); this.hosts.clear(); }
    addHost(e) { this.hosts.add(e); for (let [t, { elements: o }] of this.inline)
        o.push(this.addElement(e, te(t, this.doc))); for (let [t, { elements: o }] of this.external)
        o.push(this.addElement(e, z(t, this.doc))); }
    removeHost(e) { this.hosts.delete(e); }
    addElement(e, t) { return this.nonce && t.setAttribute("nonce", this.nonce), typeof ngServerMode < "u" && ngServerMode && t.setAttribute(L, this.appId), e.appendChild(t); }
    static ɵfac = function (t) { return new (t || n)(c.ɵɵinject($), c.ɵɵinject(oe), c.ɵɵinject(se, 8), c.ɵɵinject(Ie)); };
    static ɵprov = c.ɵɵdefineInjectable({ token: n, factory: n.ɵfac });
} return n; })(), F = { svg: "http://www.w3.org/2000/svg", xhtml: "http://www.w3.org/1999/xhtml", xlink: "http://www.w3.org/1999/xlink", xml: "http://www.w3.org/XML/1998/namespace", xmlns: "http://www.w3.org/2000/xmlns/", math: "http://www.w3.org/1998/Math/MathML" }, Z = /%COMP%/g;
var ie = "%COMP%", Le = `_nghost-${ie}`, Pe = `_ngcontent-${ie}`, He = !0, ae = new re("", { providedIn: "root", factory: () => He });
function ke(n) { return Pe.replace(Z, n); }
function Ue(n) { return Le.replace(Z, n); }
function ce(n, r) { return r.map(e => e.replace(Z, n)); }
var U = (() => { class n {
    eventManager;
    sharedStylesHost;
    appId;
    removeStylesOnCompDestroy;
    doc;
    ngZone;
    nonce;
    tracingService;
    rendererByCompId = new Map;
    defaultRenderer;
    platformIsServer;
    constructor(e, t, o, s, i, a, d = null, u = null) { this.eventManager = e, this.sharedStylesHost = t, this.appId = o, this.removeStylesOnCompDestroy = s, this.doc = i, this.ngZone = a, this.nonce = d, this.tracingService = u, this.platformIsServer = typeof ngServerMode < "u" && ngServerMode, this.defaultRenderer = new _(e, i, a, this.platformIsServer, this.tracingService); }
    createRenderer(e, t) { if (!e || !t)
        return this.defaultRenderer; typeof ngServerMode < "u" && ngServerMode && t.encapsulation === O.ShadowDom && (t = Q(b({}, t), { encapsulation: O.Emulated })); let o = this.getOrCreateRenderer(e, t); return o instanceof P ? o.applyToHost(e) : o instanceof T && o.applyStyles(), o; }
    getOrCreateRenderer(e, t) { let o = this.rendererByCompId, s = o.get(t.id); if (!s) {
        let i = this.doc, a = this.ngZone, d = this.eventManager, u = this.sharedStylesHost, f = this.removeStylesOnCompDestroy, g = this.platformIsServer, h = this.tracingService;
        switch (t.encapsulation) {
            case O.Emulated:
                s = new P(d, u, t, this.appId, f, i, a, g, h);
                break;
            case O.ShadowDom: return new G(d, u, e, t, i, a, this.nonce, g, h);
            default:
                s = new T(d, u, t, f, i, a, g, h);
                break;
        }
        o.set(t.id, s);
    } return s; }
    ngOnDestroy() { this.rendererByCompId.clear(); }
    componentReplaced(e) { this.rendererByCompId.delete(e); }
    static ɵfac = function (t) { return new (t || n)(c.ɵɵinject(H), c.ɵɵinject(k), c.ɵɵinject(oe), c.ɵɵinject(ae), c.ɵɵinject($), c.ɵɵinject(c.NgZone), c.ɵɵinject(se), c.ɵɵinject(be, 8)); };
    static ɵprov = c.ɵɵdefineInjectable({ token: n, factory: n.ɵfac });
} return n; })(), _ = class {
    eventManager;
    doc;
    ngZone;
    platformIsServer;
    tracingService;
    data = Object.create(null);
    throwOnSyntheticProps = !0;
    constructor(r, e, t, o, s) { this.eventManager = r, this.doc = e, this.ngZone = t, this.platformIsServer = o, this.tracingService = s; }
    destroy() { }
    destroyNode = null;
    createElement(r, e) { return e ? this.doc.createElementNS(F[e] || e, r) : this.doc.createElement(r); }
    createComment(r) { return this.doc.createComment(r); }
    createText(r) { return this.doc.createTextNode(r); }
    appendChild(r, e) { (ne(r) ? r.content : r).appendChild(e); }
    insertBefore(r, e, t) { r && (ne(r) ? r.content : r).insertBefore(e, t); }
    removeChild(r, e) { e.remove(); }
    selectRootElement(r, e) { let t = typeof r == "string" ? this.doc.querySelector(r) : r; if (!t)
        throw new V(-5104, !1); return e || (t.textContent = ""), t; }
    parentNode(r) { return r.parentNode; }
    nextSibling(r) { return r.nextSibling; }
    setAttribute(r, e, t, o) { if (o) {
        e = o + ":" + e;
        let s = F[o];
        s ? r.setAttributeNS(s, e, t) : r.setAttribute(e, t);
    }
    else
        r.setAttribute(e, t); }
    removeAttribute(r, e, t) { if (t) {
        let o = F[t];
        o ? r.removeAttributeNS(o, e) : r.removeAttribute(`${t}:${e}`);
    }
    else
        r.removeAttribute(e); }
    addClass(r, e) { r.classList.add(e); }
    removeClass(r, e) { r.classList.remove(e); }
    setStyle(r, e, t, o) { o & (N.DashCase | N.Important) ? r.style.setProperty(e, t, o & N.Important ? "important" : "") : r.style[e] = t; }
    removeStyle(r, e, t) { t & N.DashCase ? r.style.removeProperty(e) : r.style[e] = ""; }
    setProperty(r, e, t) { r != null && (r[e] = t); }
    setValue(r, e) { r.nodeValue = e; }
    listen(r, e, t, o) { if (typeof r == "string" && (r = Ae().getGlobalEventTarget(this.doc, r), !r))
        throw new V(5102, !1); let s = this.decoratePreventDefault(t); return this.tracingService?.wrapEventListener && (s = this.tracingService.wrapEventListener(r, e, s)), this.eventManager.addEventListener(r, e, s, o); }
    decoratePreventDefault(r) { return e => { if (e === "__ngUnwrap__")
        return r; (typeof ngServerMode < "u" && ngServerMode ? this.ngZone.runGuarded(() => r(e)) : r(e)) === !1 && e.preventDefault(); }; }
};
function ne(n) { return n.tagName === "TEMPLATE" && n.content !== void 0; }
var G = class extends _ {
    sharedStylesHost;
    hostEl;
    shadowRoot;
    constructor(r, e, t, o, s, i, a, d, u) { super(r, s, i, d, u), this.sharedStylesHost = e, this.hostEl = t, this.shadowRoot = t.attachShadow({ mode: "open" }), this.sharedStylesHost.addHost(this.shadowRoot); let f = o.styles; f = ce(o.id, f); for (let h of f) {
        let E = document.createElement("style");
        a && E.setAttribute("nonce", a), E.textContent = h, this.shadowRoot.appendChild(E);
    } let g = o.getExternalStyles?.(); if (g)
        for (let h of g) {
            let E = z(h, s);
            a && E.setAttribute("nonce", a), this.shadowRoot.appendChild(E);
        } }
    nodeOrShadowRoot(r) { return r === this.hostEl ? this.shadowRoot : r; }
    appendChild(r, e) { return super.appendChild(this.nodeOrShadowRoot(r), e); }
    insertBefore(r, e, t) { return super.insertBefore(this.nodeOrShadowRoot(r), e, t); }
    removeChild(r, e) { return super.removeChild(null, e); }
    parentNode(r) { return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(r))); }
    destroy() { this.sharedStylesHost.removeHost(this.shadowRoot); }
}, T = class extends _ {
    sharedStylesHost;
    removeStylesOnCompDestroy;
    styles;
    styleUrls;
    constructor(r, e, t, o, s, i, a, d, u) { super(r, s, i, a, d), this.sharedStylesHost = e, this.removeStylesOnCompDestroy = o; let f = t.styles; this.styles = u ? ce(u, f) : f, this.styleUrls = t.getExternalStyles?.(u); }
    applyStyles() { this.sharedStylesHost.addStyles(this.styles, this.styleUrls); }
    destroy() { this.removeStylesOnCompDestroy && Oe.size === 0 && this.sharedStylesHost.removeStyles(this.styles, this.styleUrls); }
}, P = class extends T {
    contentAttr;
    hostAttr;
    constructor(r, e, t, o, s, i, a, d, u) { let f = o + "-" + t.id; super(r, e, t, s, i, a, d, u, f), this.contentAttr = ke(f), this.hostAttr = Ue(f); }
    applyToHost(r) { this.applyStyles(), this.setAttribute(r, this.hostAttr, ""); }
    createElement(r, e) { let t = super.createElement(r, e); return super.setAttribute(t, this.contentAttr, ""), t; }
};
var x = class n extends je {
    supportsDOMEvents = !0;
    static makeCurrent() { xe(new n); }
    onAndCancel(r, e, t, o) { return r.addEventListener(e, t, o), () => { r.removeEventListener(e, t, o); }; }
    dispatchEvent(r, e) { r.dispatchEvent(e); }
    remove(r) { r.remove(); }
    createElement(r, e) { return e = e || this.getDefaultDocument(), e.createElement(r); }
    createHtmlDocument() { return document.implementation.createHTMLDocument("fakeTitle"); }
    getDefaultDocument() { return document; }
    isElementNode(r) { return r.nodeType === Node.ELEMENT_NODE; }
    isShadowRoot(r) { return r instanceof DocumentFragment; }
    getGlobalEventTarget(r, e) { return e === "window" ? window : e === "document" ? r : e === "body" ? r.body : null; }
    getBaseHref(r) { let e = et(); return e == null ? null : tt(e); }
    resetBaseElement() { D = null; }
    getUserAgent() { return window.navigator.userAgent; }
    getCookie(r) { return Be(document.cookie, r); }
}, D = null;
function et() { return D = D || document.head.querySelector("base"), D ? D.getAttribute("href") : null; }
function tt(n) { return new URL(n, document.baseURI).pathname; }
var B = class {
    addToWindow(r) { y.getAngularTestability = (t, o = !0) => { let s = r.findTestabilityInTree(t, o); if (s == null)
        throw new Ge(5103, !1); return s; }, y.getAllAngularTestabilities = () => r.getAllTestabilities(), y.getAllAngularRootElements = () => r.getAllRootElements(); let e = t => { let o = y.getAllAngularTestabilities(), s = o.length, i = function () { s--, s == 0 && t(); }; o.forEach(a => { a.whenStable(i); }); }; y.frameworkStabilizers || (y.frameworkStabilizers = []), y.frameworkStabilizers.push(e); }
    findTestabilityInTree(r, e, t) { if (e == null)
        return null; let o = r.getTestability(e); return o ?? (t ? fe().isShadowRoot(e) ? this.findTestabilityInTree(r, e.host, !0) : this.findTestabilityInTree(r, e.parentElement, !0) : null); }
}, nt = (() => { class n {
    build() { return new XMLHttpRequest; }
    static ɵfac = function (t) { return new (t || n); };
    static ɵprov = p.ɵɵdefineInjectable({ token: n, factory: n.ɵfac });
} return n; })(), ue = ["alt", "control", "meta", "shift"], rt = { "\b": "Backspace", "\t": "Tab", "\x7F": "Delete", "\x1B": "Escape", Del: "Delete", Esc: "Escape", Left: "ArrowLeft", Right: "ArrowRight", Up: "ArrowUp", Down: "ArrowDown", Menu: "ContextMenu", Scroll: "ScrollLock", Win: "OS" }, ot = { alt: n => n.altKey, control: n => n.ctrlKey, meta: n => n.metaKey, shift: n => n.shiftKey }, me = (() => { class n extends v {
    constructor(e) { super(e); }
    supports(e) { return n.parseEventName(e) != null; }
    addEventListener(e, t, o, s) { let i = n.parseEventName(t), a = n.eventCallback(i.fullKey, o, this.manager.getZone()); return this.manager.getZone().runOutsideAngular(() => fe().onAndCancel(e, i.domEventName, a, s)); }
    static parseEventName(e) { let t = e.toLowerCase().split("."), o = t.shift(); if (t.length === 0 || !(o === "keydown" || o === "keyup"))
        return null; let s = n._normalizeKey(t.pop()), i = "", a = t.indexOf("code"); if (a > -1 && (t.splice(a, 1), i = "code."), ue.forEach(u => { let f = t.indexOf(u); f > -1 && (t.splice(f, 1), i += u + "."); }), i += s, t.length != 0 || s.length === 0)
        return null; let d = {}; return d.domEventName = o, d.fullKey = i, d; }
    static matchEventFullKeyCode(e, t) { let o = rt[e.key] || e.key, s = ""; return t.indexOf("code.") > -1 && (o = e.code, s = "code."), o == null || !o ? !1 : (o = o.toLowerCase(), o === " " ? o = "space" : o === "." && (o = "dot"), ue.forEach(i => { if (i !== o) {
        let a = ot[i];
        a(e) && (s += i + ".");
    } }), s += o, s === t); }
    static eventCallback(e, t, o) { return s => { n.matchEventFullKeyCode(s, e) && o.runGuarded(() => t(s)); }; }
    static _normalizeKey(e) { return e === "esc" ? "escape" : e; }
    static ɵfac = function (t) { return new (t || n)(p.ɵɵinject(j)); };
    static ɵprov = p.ɵɵdefineInjectable({ token: n, factory: n.ɵfac });
} return n; })();
function st(n, r, e) { let t = b({ rootComponent: n, platformRef: e?.platformRef }, ge(r)); return pe(t); }
function it(n) { return pe(ge(n)); }
function ge(n) { return { appProviders: [...Ee, ...(n?.providers ?? [])], platformProviders: ve }; }
function at() { return [...ye]; }
function ct() { x.makeCurrent(); }
function lt() { return new he; }
function dt() { return Qe(document), document; }
var ve = [{ provide: $e, useValue: Fe }, { provide: Ze, useValue: ct, multi: !0 }, { provide: j, useFactory: dt }], ut = Ye(Ke, "browser", ve);
var ye = [{ provide: Y, useClass: B }, { provide: Xe, useClass: K, deps: [le, de, Y] }, { provide: K, useClass: K, deps: [le, de, Y] }], Ee = [{ provide: We, useValue: "root" }, { provide: he, useFactory: lt }, { provide: S, useClass: w, multi: !0, deps: [j] }, { provide: S, useClass: me, multi: !0, deps: [j] }, U, k, H, { provide: Je, useExisting: U }, { provide: Ve, useClass: nt }, []], ft = (() => { class n {
    constructor() { }
    static ɵfac = function (t) { return new (t || n); };
    static ɵmod = p.ɵɵdefineNgModule({ type: n });
    static ɵinj = p.ɵɵdefineInjector({ providers: [...Ee, ...ye], imports: [ze, qe] });
} return n; })();
import { ɵgetDOM as we, DOCUMENT as A } from "@angular/common";
import { ɵgetDOM as Nn } from "@angular/common";
import * as l from "@angular/core";
import { ɵglobal as Se, ApplicationRef as pt, InjectionToken as _e, ɵConsole as on, Optional as ht, Injector as mt, ɵRuntimeError as X, SecurityContext as M, ɵallowSanitizationBypassAndThrow as R, ɵunwrapSafeValue as C, ɵ_sanitizeUrl as gt, ɵ_sanitizeHtml as vt, ɵbypassSanitizationTrustHtml as yt, ɵbypassSanitizationTrustStyle as Et, ɵbypassSanitizationTrustScript as St, ɵbypassSanitizationTrustUrl as Mt, ɵbypassSanitizationTrustResourceUrl as wt, ɵwithI18nSupport as _t, ɵwithEventReplay as Tt, ɵwithIncrementalHydration as Dt, makeEnvironmentProviders as Rt, ɵwithDomHydration as Ct, ENVIRONMENT_INITIALIZER as ln, inject as dn, NgZone as un, ɵZONELESS_ENABLED as fn, ɵformatRuntimeError as pn, ɵIS_ENABLED_BLOCKING_INITIAL_NAVIGATION as hn, Version as At } from "@angular/core";
import { ɵwithHttpTransferCache as Te } from "@angular/common/http";
var vn = (() => { class n {
    _doc;
    _dom;
    constructor(e) { this._doc = e, this._dom = we(); }
    addTag(e, t = !1) { return e ? this._getOrCreateElement(e, t) : null; }
    addTags(e, t = !1) { return e ? e.reduce((o, s) => (s && o.push(this._getOrCreateElement(s, t)), o), []) : []; }
    getTag(e) { return e && this._doc.querySelector(`meta[${e}]`) || null; }
    getTags(e) { if (!e)
        return []; let t = this._doc.querySelectorAll(`meta[${e}]`); return t ? [].slice.call(t) : []; }
    updateTag(e, t) { if (!e)
        return null; t = t || this._parseSelector(e); let o = this.getTag(t); return o ? this._setMetaElementAttributes(e, o) : this._getOrCreateElement(e, !0); }
    removeTag(e) { this.removeTagElement(this.getTag(e)); }
    removeTagElement(e) { e && this._dom.remove(e); }
    _getOrCreateElement(e, t = !1) { if (!t) {
        let i = this._parseSelector(e), a = this.getTags(i).filter(d => this._containsAttributes(e, d))[0];
        if (a !== void 0)
            return a;
    } let o = this._dom.createElement("meta"); return this._setMetaElementAttributes(e, o), this._doc.getElementsByTagName("head")[0].appendChild(o), o; }
    _setMetaElementAttributes(e, t) { return Object.keys(e).forEach(o => t.setAttribute(this._getMetaKeyMap(o), e[o])), t; }
    _parseSelector(e) { let t = e.name ? "name" : "property"; return `${t}="${e[t]}"`; }
    _containsAttributes(e, t) { return Object.keys(e).every(o => t.getAttribute(this._getMetaKeyMap(o)) === e[o]); }
    _getMetaKeyMap(e) { return It[e] || e; }
    static ɵfac = function (t) { return new (t || n)(l.ɵɵinject(A)); };
    static ɵprov = l.ɵɵdefineInjectable({ token: n, factory: n.ɵfac, providedIn: "root" });
} return n; })(), It = { httpEquiv: "http-equiv" }, yn = (() => { class n {
    _doc;
    constructor(e) { this._doc = e; }
    getTitle() { return this._doc.title; }
    setTitle(e) { this._doc.title = e || ""; }
    static ɵfac = function (t) { return new (t || n)(l.ɵɵinject(A)); };
    static ɵprov = l.ɵɵdefineInjectable({ token: n, factory: n.ɵfac, providedIn: "root" });
} return n; })();
function De(n, r) { if (typeof COMPILED > "u" || !COMPILED) {
    let e = Se.ng = Se.ng || {};
    e[n] = r;
} }
var W = class {
    msPerTick;
    numTicks;
    constructor(r, e) { this.msPerTick = r, this.numTicks = e; }
}, J = class {
    appRef;
    constructor(r) { this.appRef = r.injector.get(pt); }
    timeChangeDetection(r) { let e = r && r.record, t = "Change Detection"; e && "profile" in console && typeof console.profile == "function" && console.profile(t); let o = performance.now(), s = 0; for (; s < 5 || performance.now() - o < 500;)
        this.appRef.tick(), s++; let i = performance.now(); e && "profileEnd" in console && typeof console.profileEnd == "function" && console.profileEnd(t); let a = (i - o) / s; return console.log(`ran ${s} change detection cycles`), console.log(`${a.toFixed(2)} ms per check`), new W(a, s); }
}, Re = "profiler";
function En(n) { return De(Re, new J(n)), n; }
function Sn() { De(Re, null); }
var Me = class {
    static all() { return () => !0; }
    static css(r) { return e => e.nativeElement != null ? bt(e.nativeElement, r) : !1; }
    static directive(r) { return e => e.providerTokens.indexOf(r) !== -1; }
};
function bt(n, r) { return we().isElementNode(n) ? n.matches && n.matches(r) || n.msMatchesSelector && n.msMatchesSelector(r) || n.webkitMatchesSelector && n.webkitMatchesSelector(r) : !1; }
var Ot = { pan: !0, panstart: !0, panmove: !0, panend: !0, pancancel: !0, panleft: !0, panright: !0, panup: !0, pandown: !0, pinch: !0, pinchstart: !0, pinchmove: !0, pinchend: !0, pinchcancel: !0, pinchin: !0, pinchout: !0, press: !0, pressup: !0, rotate: !0, rotatestart: !0, rotatemove: !0, rotateend: !0, rotatecancel: !0, swipe: !0, swipeleft: !0, swiperight: !0, swipeup: !0, swipedown: !0, tap: !0, doubletap: !0 }, q = new _e(""), Ce = new _e(""), Nt = (() => { class n {
    events = [];
    overrides = {};
    options;
    buildHammer(e) { let t = new Hammer(e, this.options); t.get("pinch").set({ enable: !0 }), t.get("rotate").set({ enable: !0 }); for (let o in this.overrides)
        t.get(o).set(this.overrides[o]); return t; }
    static ɵfac = function (t) { return new (t || n); };
    static ɵprov = l.ɵɵdefineInjectable({ token: n, factory: n.ɵfac });
} return n; })(), Lt = (() => { class n extends v {
    _config;
    _injector;
    loader;
    _loaderPromise = null;
    constructor(e, t, o, s) { super(e), this._config = t, this._injector = o, this.loader = s; }
    supports(e) { return !(!Ot.hasOwnProperty(e.toLowerCase()) && !this.isCustomEvent(e) || !window.Hammer && !this.loader); }
    addEventListener(e, t, o) { let s = this.manager.getZone(); if (t = t.toLowerCase(), !window.Hammer && this.loader) {
        this._loaderPromise = this._loaderPromise || s.runOutsideAngular(() => this.loader());
        let i = !1, a = () => { i = !0; };
        return s.runOutsideAngular(() => this._loaderPromise.then(() => { if (!window.Hammer) {
            a = () => { };
            return;
        } i || (a = this.addEventListener(e, t, o)); }).catch(() => { a = () => { }; })), () => { a(); };
    } return s.runOutsideAngular(() => { let i = this._config.buildHammer(e), a = function (d) { s.runGuarded(function () { o(d); }); }; return i.on(t, a), () => { i.off(t, a), typeof i.destroy == "function" && i.destroy(); }; }); }
    isCustomEvent(e) { return this._config.events.indexOf(e) > -1; }
    static ɵfac = function (t) { return new (t || n)(l.ɵɵinject(A), l.ɵɵinject(q), l.ɵɵinject(l.Injector), l.ɵɵinject(Ce, 8)); };
    static ɵprov = l.ɵɵdefineInjectable({ token: n, factory: n.ɵfac });
} return n; })(), Mn = (() => { class n {
    static ɵfac = function (t) { return new (t || n); };
    static ɵmod = l.ɵɵdefineNgModule({ type: n });
    static ɵinj = l.ɵɵdefineInjector({ providers: [{ provide: S, useClass: Lt, multi: !0, deps: [A, q, mt, [new ht, Ce]] }, { provide: q, useClass: Nt }] });
} return n; })(), Pt = (() => { class n {
    static ɵfac = function (t) { return new (t || n); };
    static ɵprov = l.ɵɵdefineInjectable({ token: n, factory: function (t) { let o = null; return t ? o = new (t || n) : o = l.ɵɵinject(Ht), o; }, providedIn: "root" });
} return n; })(), Ht = (() => { class n extends Pt {
    _doc;
    constructor(e) { super(), this._doc = e; }
    sanitize(e, t) { if (t == null)
        return null; switch (e) {
        case M.NONE: return t;
        case M.HTML: return R(t, "HTML") ? C(t) : vt(this._doc, String(t)).toString();
        case M.STYLE: return R(t, "Style") ? C(t) : t;
        case M.SCRIPT:
            if (R(t, "Script"))
                return C(t);
            throw new X(5200, !1);
        case M.URL: return R(t, "URL") ? C(t) : gt(String(t));
        case M.RESOURCE_URL:
            if (R(t, "ResourceURL"))
                return C(t);
            throw new X(5201, !1);
        default: throw new X(5202, !1);
    } }
    bypassSecurityTrustHtml(e) { return yt(e); }
    bypassSecurityTrustStyle(e) { return Et(e); }
    bypassSecurityTrustScript(e) { return St(e); }
    bypassSecurityTrustUrl(e) { return Mt(e); }
    bypassSecurityTrustResourceUrl(e) { return wt(e); }
    static ɵfac = function (t) { return new (t || n)(l.ɵɵinject(A)); };
    static ɵprov = l.ɵɵdefineInjectable({ token: n, factory: n.ɵfac, providedIn: "root" });
} return n; })(), m = function (n) { return n[n.NoHttpTransferCache = 0] = "NoHttpTransferCache", n[n.HttpTransferCacheOptions = 1] = "HttpTransferCacheOptions", n[n.I18nSupport = 2] = "I18nSupport", n[n.EventReplay = 3] = "EventReplay", n[n.IncrementalHydration = 4] = "IncrementalHydration", n; }(m || {});
function I(n, r = [], e = {}) { return { ɵkind: n, ɵproviders: r }; }
function wn() { return I(m.NoHttpTransferCache); }
function _n(n) { return I(m.HttpTransferCacheOptions, Te(n)); }
function Tn() { return I(m.I18nSupport, _t()); }
function Dn() { return I(m.EventReplay, Tt()); }
function Rn() { return I(m.IncrementalHydration, Dt()); }
function Cn(...n) { let r = [], e = new Set; for (let { ɵproviders: o, ɵkind: s } of n)
    e.add(s), o.length && r.push(o); let t = e.has(m.HttpTransferCacheOptions); return Rt([[], [], Ct(), e.has(m.NoHttpTransferCache) || t ? [] : Te({}), r]); }
var An = new At("20.3.14");
export { ft as BrowserModule, Me as By, Pt as DomSanitizer, S as EVENT_MANAGER_PLUGINS, H as EventManager, v as EventManagerPlugin, q as HAMMER_GESTURE_CONFIG, Ce as HAMMER_LOADER, Nt as HammerGestureConfig, Mn as HammerModule, m as HydrationFeatureKind, vn as Meta, ae as REMOVE_STYLES_ON_COMPONENT_DESTROY, yn as Title, An as VERSION, st as bootstrapApplication, it as createApplication, Sn as disableDebugTools, En as enableDebugTools, ut as platformBrowser, Cn as provideClientHydration, at as provideProtractorTestingSupport, Dn as withEventReplay, _n as withHttpTransferCacheOptions, Tn as withI18nSupport, Rn as withIncrementalHydration, wn as withNoHttpTransferCache, x as ɵBrowserDomAdapter, B as ɵBrowserGetTestability, w as ɵDomEventsPlugin, U as ɵDomRendererFactory2, Ht as ɵDomSanitizerImpl, Lt as ɵHammerGesturesPlugin, me as ɵKeyEventsPlugin, k as ɵSharedStylesHost, Nn as ɵgetDOM }; /*! Bundled license information:

@angular/platform-browser/fesm2022/dom_renderer.mjs:
@angular/platform-browser/fesm2022/browser.mjs:
@angular/platform-browser/fesm2022/platform-browser.mjs:
  (**
   * @license Angular v20.3.14
   * (c) 2010-2025 Google LLC. https://angular.dev/
   * License: MIT
   *)
*/
