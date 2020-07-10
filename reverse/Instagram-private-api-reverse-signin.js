// After press Singin button
// user data:
// "this_is__user_name" username or email
// "this_is__user_pass"

// URL: https://www.instagram.com/accounts/login/
// Response headers:
//     ig-set-password-encryption-web-key-id: 203
//     ig-set-password-encryption-web-key-version: 10
//     ig-set-password-encryption-web-pub-key: ...



1. call e.login()
2. requestUUID = m.exports()
3. getEncryptedParam('password', n, c) call  e.getEncryptedParam = async function(n, c, o, u="enc_")

encrypt (4fdca6754e56.js:formatted:104)
e.encryptPassword (4fdca6754e56.js:formatted:23)
e.encryptAndFormat (4fdca6754e56.js:formatted:12)
t (2dcb314b3213.js:formatted:9644)
await in t (async)
e.getEncryptedParam (2dcb314b3213.js:formatted:9673)
e.login (2dcb314b3213.js:formatted:8907)

post()

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
https://www.instagram.com/static/bundles/es6/ConsumerLibCommons.js/2dcb314b3213.js:formatted

 e.login = async function(t, n, o, s) {
    const c = {
        requestUUID: i(d[4])()
    };
    return r(d[0]).post("/accounts/login/ajax/", {
        username: t,
        ...await r(d[5]).getEncryptedParam('password', n, c),
        queryParams: o,
        optIntoOneTap: s
    }, {
        loggingData: c,
        timeout: y
    })
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
__d(function(g, r, i, a, m, e, d) {
    "use strict";

    function t(t) {
        let n;
        try {
            t && (n = JSON.parse(t.responseText))
        } catch (t) {}
        if (n && 'object' == typeof n) {
            const {
                checkpoint_url: t,
                redirect_url: s
            } = n;
            let o;
            if ('string' == typeof t ? o = t : 'string' == typeof s && (o = s), o) return o
        }
        return null
    }

    function n(t) {
        return new Promise((n, s) => {
            t.then((t, s) => {
                n([t, s])
            }).catch((t, n, o) => {
                s([t, n, o])
            })
        })
    }

    function s() {
        const {
            search: t
        } = document.location;
        let n;
        return t && (n = t.match(/[?&]hl=([-\w]+)(&.+)?$/)) ? n[1] : ''
    }

    function o(t, n) {
        return t
    }

    function c(n, c, T, E, P) {
        const {
            alwaysPassCsrfTokenToSameOrigin: W = !1,
            headers: I = {},
            loggingData: H,
            omitLanguageParam: C = !1,
            omitAjaxHeader: R = !1,
            omitAppIDHeader: x = !1,
            omitWWWClaimHeader: G = !1,
            preloadable: S = !1,
            urlErrorFormatter: j = o,
            ...A
        } = E || {}, b = {
            cache: !0,
            timeout: h,
            ...A,
            headers: I
        };
        if (r(d[0]).needsToConfirmCookies()) {
            const t = r(d[1]).getMID();
            t && (b.headers['X-Mid'] = t)
        }
        i(d[2])(n, c, W) && (b.headers['X-CSRFToken'] = r(d[0]).getCSRFToken()), 'GET' === n || R || (b.headers['X-Instagram-AJAX'] = r(d[0]).getRolloutHash()), x || (b.headers['X-IG-App-ID'] = r(d[0]).getIGAppID());
        const k = i(d[3])(c),
            O = r(d[4]).isAPIUrl(c);
        if (G || !k && !O || (b.headers['X-IG-WWW-Claim'] = r(d[5]).getWWWClaim() || '0'), O && (b.withCredentials = !0), c = r(d[6]).zeroRewriteAjaxUrl(c, b), !C) {
            const t = s();
            if (t && 'POST' === n) {
                const n = -1 !== c.indexOf('?');
                c += (n ? '&' : '?') + 'hl=' + t
            }
        }
        null != H && l(c, T, H);
        const X = r(d[7]);
        return p(() => {
            S && 'GET' === n && (y = !0);
            const t = X.map(n, c, T, b, P);
            return S && 'GET' === n && (y = !1), t
        }, 'GET' === n || 'HEAD' === n ? f : 0).then(([t, n]) => {
            if (k) {
                const n = t.getResponseHeader('x-ig-set-www-claim');
                n && n !== r(d[5]).getWWWClaim() && r(d[5]).setWWWClaim(n), u(t)
            }
            return n
        }).catch(([s, o, l]) => {
            if ('GET' !== n.toUpperCase()) {
                const n = t(o);
                if (n) return window.top.location.href = n, new Promise(() => null)
            }
            return k && u(o), Promise.reject(new w(o && o.statusText, o && o.status, o && o.responseText, j(c, T)))
        })
    }

    function u(t) {
        const n = t.getResponseHeader('IG-Set-Password-Encryption-Web-Key-Id'),
            s = t.getResponseHeader('IG-Set-Password-Encryption-Web-Key-Version'),
            o = t.getResponseHeader('IG-Set-Password-Encryption-Web-Pub-Key');
        n && o && s && r(d[8]).setEncryptionKeys(n, o, s)
    }
    async function l(t, n, s) {            // <====================== l (2dcb314b3213.js:formatted:2512)
        if (null == s.requestUUID) return;
        let o = !1,
            c = !1;
        if (null != n) {
            const t = Object.keys(n);
            for (; t.length;) {
                const n = t.shift();
                if (n.includes('enc_', 0) ? o = !0 : n.includes('password') && (c = !0), o && c) break
            }
        }
        try {
            const {
                logEncryptionPayloadSent: n
            } = await r(d[10])(d[9], "PasswordEncryptionLogger");
            n(o, c, s.requestUUID, t)
        } catch (t) {}
    }

    function p(t, s) {
        let o;
        try {
            o = t()
        } catch (n) {
            return s-- > 0 ? p(t, s) : Promise.reject(['', {
                statusText: n.toString(),
                status: 0,
                responseText: ''
            }])
        }
        return n(o).catch(n => s-- > 0 ? p(t, s) : Promise.reject(n))
    }
    Object.defineProperty(e, '__esModule', {
        value: !0
    });
    const h = 1e4,
        f = 1;
    let y = !1;
    if ('XMLHttpRequest' in window) {
        const t = XMLHttpRequest.prototype.setRequestHeader;
        XMLHttpRequest.prototype.setRequestHeader = function() {
            y || t.apply(this, arguments)
        }
    }
    const w = function(t, n, s, o) {
        var c;
        this.name = 'AjaxError';
        let u;
        try {
            u = JSON.parse(s || '')
        } catch (t) {
            u = null
        }
        this.message = (null === (c = u) || void 0 === c ? void 0 : c.message) || '', this.stack = (new Error).stack, this.framesToPop = 1, this.networkError = t, this.statusCode = n, this.responseText = s, this.responseObject = u, this.url = o
    };
    w.prototype = new Error, e.AjaxError = w, e.map = c, e.get = function(t, n, s, o) {
        return c('GET', t, n, s, o)
    }, e.post = function(t, n, s, o) {          // <======================== e.post (2dcb314b3213.js:formatted:2573)
        return c('POST', t, n, s, o)
    }
}, 9961489, [9699341, 10223808, 16908340, 10027308, 10158107, 9961487, 10027058, 16908341, 9568261, 9568256, 68]);


__d(function(g, r, i, a, m, e, d) {
    "use strict";

    function t(t) {
        let n;
        try {
            t && (n = JSON.parse(t.responseText))
        } catch (t) {}
        if (n && 'object' == typeof n) {
            const {
                checkpoint_url: t,
                redirect_url: s
            } = n;
            let o;
            if ('string' == typeof t ? o = t : 'string' == typeof s && (o = s), o) return o
        }
        return null
    }

    function n(t) {
        return new Promise((n, s) => {
            t.then((t, s) => {
                n([t, s])
            }).catch((t, n, o) => {
                s([t, n, o])
            })
        })
    }

    function s() {
        const {
            search: t
        } = document.location;
        let n;
        return t && (n = t.match(/[?&]hl=([-\w]+)(&.+)?$/)) ? n[1] : ''
    }

    function o(t, n) {
        return t
    }

    function c(n, c, T, E, P) {
        const {
            alwaysPassCsrfTokenToSameOrigin: W = !1,
            headers: I = {},
            loggingData: H,
            omitLanguageParam: C = !1,
            omitAjaxHeader: R = !1,
            omitAppIDHeader: x = !1,
            omitWWWClaimHeader: G = !1,
            preloadable: S = !1,
            urlErrorFormatter: j = o,
            ...A
        } = E || {}, b = {
            cache: !0,
            timeout: h,
            ...A,
            headers: I
        };
        if (r(d[0]).needsToConfirmCookies()) {
            const t = r(d[1]).getMID();
            t && (b.headers['X-Mid'] = t)
        }
        i(d[2])(n, c, W) && (b.headers['X-CSRFToken'] = r(d[0]).getCSRFToken()), 'GET' === n || R || (b.headers['X-Instagram-AJAX'] = r(d[0]).getRolloutHash()), x || (b.headers['X-IG-App-ID'] = r(d[0]).getIGAppID());
        const k = i(d[3])(c),
            O = r(d[4]).isAPIUrl(c);
        if (G || !k && !O || (b.headers['X-IG-WWW-Claim'] = r(d[5]).getWWWClaim() || '0'), O && (b.withCredentials = !0), c = r(d[6]).zeroRewriteAjaxUrl(c, b), !C) {
            const t = s();
            if (t && 'POST' === n) {
                const n = -1 !== c.indexOf('?');
                c += (n ? '&' : '?') + 'hl=' + t
            }
        }
        null != H && l(c, T, H);
        const X = r(d[7]);
        return p(() => {
            S && 'GET' === n && (y = !0);
            const t = X.map(n, c, T, b, P);
            return S && 'GET' === n && (y = !1), t
        }, 'GET' === n || 'HEAD' === n ? f : 0).then(([t, n]) => {
            if (k) {
                const n = t.getResponseHeader('x-ig-set-www-claim');
                n && n !== r(d[5]).getWWWClaim() && r(d[5]).setWWWClaim(n), u(t)
            }
            return n
        }).catch(([s, o, l]) => {
            if ('GET' !== n.toUpperCase()) {
                const n = t(o);
                if (n) return window.top.location.href = n, new Promise(() => null)
            }
            return k && u(o), Promise.reject(new w(o && o.statusText, o && o.status, o && o.responseText, j(c, T)))
        })
    }

    function u(t) {
        const n = t.getResponseHeader('IG-Set-Password-Encryption-Web-Key-Id'),
            s = t.getResponseHeader('IG-Set-Password-Encryption-Web-Key-Version'),
            o = t.getResponseHeader('IG-Set-Password-Encryption-Web-Pub-Key');
        n && o && s && r(d[8]).setEncryptionKeys(n, o, s)
    }
    async function l(t, n, s) {             // <====================== l (2dcb314b3213.js:formatted:2512)
        if (null == s.requestUUID) return;
        let o = !1,
            c = !1;
        if (null != n) {
            const t = Object.keys(n);
            for (; t.length;) {
                const n = t.shift();
                if (n.includes('enc_', 0) ? o = !0 : n.includes('password') && (c = !0), o && c) break
            }
        }
        try {
            const {
                logEncryptionPayloadSent: n
            } = await r(d[10])(d[9], "PasswordEncryptionLogger");
            n(o, c, s.requestUUID, t)
        } catch (t) {}
    }

    function p(t, s) {
        let o;
        try {
            o = t()
        } catch (n) {
            return s-- > 0 ? p(t, s) : Promise.reject(['', {
                statusText: n.toString(),
                status: 0,
                responseText: ''
            }])
        }
        return n(o).catch(n => s-- > 0 ? p(t, s) : Promise.reject(n))
    }
    Object.defineProperty(e, '__esModule', {
        value: !0
    });
    const h = 1e4,
        f = 1;
    let y = !1;
    if ('XMLHttpRequest' in window) {
        const t = XMLHttpRequest.prototype.setRequestHeader;
        XMLHttpRequest.prototype.setRequestHeader = function() {
            y || t.apply(this, arguments)
        }
    }
    const w = function(t, n, s, o) {
        var c;
        this.name = 'AjaxError';
        let u;
        try {
            u = JSON.parse(s || '')
        } catch (t) {
            u = null
        }
        this.message = (null === (c = u) || void 0 === c ? void 0 : c.message) || '', this.stack = (new Error).stack, this.framesToPop = 1, this.networkError = t, this.statusCode = n, this.responseText = s, this.responseObject = u, this.url = o
    };
    w.prototype = new Error, e.AjaxError = w, e.map = c, e.get = function(t, n, s, o) {
        return c('GET', t, n, s, o)
    }, e.post = function(t, n, s, o) {
        return c('POST', t, n, s, o)
    }
}, 9961489, [9699341, 10223808, 16908340, 10027308, 10158107, 9961487, 10027058, 16908341, 9568261, 9568256, 68]);




////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
https://www.instagram.com/static/bundles/es6/ConsumerLibCommons.js/2dcb314b3213.js:formatted




__d(function(g, r, i, a, m, e, d) {
    'use strict';
    async function t(t, o) {
        if (!1 === i(d[0])._("67") || '' === t)
            return;
        const u = i(d[1])()
          , {requestUUID: l} = o;
        r(d[2]).logEncryptionAttempt(u, l);
        let s;
        try {
            const c = await r(d[4])(d[3], "EncryptionUtils")
              , o = n();
            s = await c.encryptAndFormat(t, o),
            r(d[2]).logEncryptionSuccess(u, l)
        } catch (t) {
            r(d[2]).logEncryptionFailure(t)
        }
        return null == s && i(d[0])._("104") && (s = c(t),
        r(d[2]).logEncryptionFallback(u, l)),
        s
    }
    function n() {
        return Math.floor(Date.now() / 1e3).toString()
    }
    function c(t) {
        const c = n();
        return i(d[5])(t, c, r(d[5]).formatType.PLAINTEXT)
    }
    Object.defineProperty(e, '__esModule', {
        value: !0
    }),
    e.encrypt = t,
    e.getTimestamp = n,
    e.formatPlaintextPassword = c,
    e.getEncryptedParam = async function(n, c, o, u="enc_") {
        /*
            c: "this_is__user_pass"
            n: "password"
            o:
            requestUUID: "c49bcfd5-28cb-46e9-a2d3-1bb25c3ffc7a"
            __proto__: Object
            this: Object
            u: "enc_"
        */

        let l = {}
          , s = {};
        if (!i(d[0])._("67"))
            return Object.freeze({
                [n]: c
            });
        /*
            Block
            c: {__esModule: true, encryptAndFormat: ƒ}
            o: "1594215104"
            Local
            l: "a1d1a3dd-a08d-468c-8386-3dca5c3b079a"
            o:
            requestUUID: "a1d1a3dd-a08d-468c-8386-3dca5c3b079a"
            __proto__: Object
            s: undefined
            t: "this_is__user_pass"
            this: undefined
            u: "504f683f-302a-4bb7-bbf1-4a266c59dd94"
        */
        const f = await t(c, o);
        null != f && (l = {
            [`${u}${n}`]: f
        });
        return i(d[0])._("106") || (s = {
            [n]: c
        }),
        Object.freeze({
            ...l,
            ...s
        })
    }
}, 16777223, [10027114, 10223654, 9568256, 9633792, 68, 9568262]);



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
https://www.instagram.com/static/bundles/es6/ConsumerUICommons.js/066705fc7b64.js:formatted





__d(function(g, r, i, a, m, e, d) {
    m.exports = function() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, x=>{
            const n = 16 * Math.random() | 0;
            return ('x' == x ? n : 3 & n | 8).toString(16)
        }
        )
    }
}, 10223654, []);

"9ed29ac5-2500-403f-a1a2-6e36fb676fbd"

"934faed7-8e5b-42ce-8f68-62703f4794ff"

"c49bcfd5-28cb-46e9-a2d3-1bb25c3ffc7a"
requestUUID: "c49bcfd5-28cb-46e9-a2d3-1bb25c3ffc7a"

"a1d1a3dd-a08d-468c-8386-3dca5c3b079a"

"504f683f-302a-4bb7-bbf1-4a266c59dd94"


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

__d(function(g, r, i, a, m, e, d) {
    'use strict';
    async function t(t, o) {                    // <=========================== t (2dcb314b3213.js:formatted:9644) in stack trace
        /*
        Block
        c: {__esModule: true, encryptAndFormat: ƒ}
        o: "1594215104"
        Local
        l: "a1d1a3dd-a08d-468c-8386-3dca5c3b079a"
        o:
            requestUUID: "a1d1a3dd-a08d-468c-8386-3dca5c3b079a"
            __proto__: Object
        s: undefined
        t: "this_is__user_pass"
        this: undefined
        u: "504f683f-302a-4bb7-bbf1-4a266c59dd94"
        */

        if (!1 === i(d[0])._("67") || '' === t)
            return;
        const u = i(d[1])()
          , {requestUUID: l} = o;
        r(d[2]).logEncryptionAttempt(u, l);
        let s;
        try {
            const c = await r(d[4])(d[3], "EncryptionUtils")
              , o = n();                        // <=========================== n()
            s = await c.encryptAndFormat(t, o),
            /*
                Block
                c: {__esModule: true, encryptAndFormat: ƒ}
                o: "1594215104"
                Local
                l: "a1d1a3dd-a08d-468c-8386-3dca5c3b079a"
                o:
                requestUUID: "a1d1a3dd-a08d-468c-8386-3dca5c3b079a"
                __proto__: Object
                s: "#PWD_INSTAGRAM_BROWSER:...:..."
                t: "this_is__user_pass"
                this: undefined
                u: "504f683f-302a-4bb7-bbf1-4a266c59dd94"
            */
            r(d[2]).logEncryptionSuccess(u, l)
        } catch (t) {
            r(d[2]).logEncryptionFailure(t)
        }
        return null == s && i(d[0])._("104") && (s = c(t),
        r(d[2]).logEncryptionFallback(u, l)),
        s
    }
    function n() {                              // <=========================== n()
        return Math.floor(Date.now() / 1e3).toString()
    }
    function c(t) {
        const c = n();
        return i(d[5])(t, c, r(d[5]).formatType.PLAINTEXT)
    }
    Object.defineProperty(e, '__esModule', {
        value: !0
    }),
    e.encrypt = t,
    e.getTimestamp = n,
    e.formatPlaintextPassword = c,
    e.getEncryptedParam = async function(n, c, o, u="enc_") {
        let l = {}
          , s = {};
        if (!i(d[0])._("67"))
            return Object.freeze({
                [n]: c
            });
        const f = await t(c, o);
        /*
            Block
            f: "#PWD_INSTAGRAM_BROWSER:...:...:..."
            l: {}
            s: {}
            Local
            c: "this_is__user_pass"
            n: "password"
            o:
            requestUUID: "a1d1a3dd-a08d-468c-8386-3dca5c3b079a"
            __proto__: Object
            this: Object
            u: "enc_"
        */
        null != f && (l = {
            [`${u}${n}`]: f
        });
        /*
            l:
                enc_password: "#PWD_INSTAGRAM_BROWSER:...:..."
                __proto__: Object
        */
        return i(d[0])._("106") || (s = {
            [n]: c
        }),
        Object.freeze({
            ...l,
            ...s
        })
    }
}, 16777223, [10027114, 10223654, 9568256, 9633792, 68, 9568262]);


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

e.logEncryptionAttempt = function(t, o) {
    i(d[0]).incr('web.password_encrypt.attempt'),
    i(d[3]).log(()=>({
        encrypt_instance_uuid: t,
        encrypt_request_uuid: o,
        key: r(d[4]).getPublicKey(),
        key_id: n(r(d[4]).getKeyId()),
        tag: r(d[5]).PWD_ENC_TAG_BROWSER,
        version: n(r(d[4]).getVersion())
    }))
}



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

https://www.instagram.com/static/bundles/es6/EncryptionUtils.js/4fdca6754e56.js:formatted

__d(function(g, r, i, a, m, e, d) {
    'use strict';
    Object.defineProperty(e, '__esModule', {
        value: !0
    }),
    e.encryptAndFormat = function(t, n) {
        const o = r(d[0]).getKeyId()
          , u = r(d[0]).getPublicKey()
          , c = r(d[0]).getVersion();
        if (null == o || null == u)
            throw new Error('Encryption Failure: failed to retrieve keyId and/or publicKey');

        /*
            c: "10"
            n: "1594215104"
            o: "203"
            t: "this_is__user_pass"
            this: Object
            u: "ig-set-password-encryption-web-pub-key"
        */
        return r(d[1]).encryptPassword(+o, u, c, t, n)
    }
}, 9633792, [9568261, 9633793]);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

https://www.instagram.com/static/bundles/es6/ConsumerLibCommons.js/2dcb314b3213.js:formatted



__d(function(g, r, i, a, m, e, d) {
    "use strict";
    function n() {
        /*
            URL: https://www.instagram.com/accounts/login/
            Response headers:
                ig-set-password-encryption-web-key-id: 203
                ig-set-password-encryption-web-key-version: 10
                ig-set-password-encryption-web-pub-key: ...

            keyId: "203"
            publicKey: "ig-set-password-encryption-web-pub-key"
            version: "10"
            __proto__: Object
        */
        if (null == t) {
            var n, u, o;
            t = {
                keyId: null !== (n = r(d[0]).getEncryptionKeyId()) && void 0 !== n ? n : '',
                publicKey: null !== (u = r(d[0]).getEncryptionPublicKey()) && void 0 !== u ? u : '',
                version: null !== (o = r(d[0]).getEncryptionVersion()) && void 0 !== o ? o : ''
            }
        }
        return t
    }
    Object.defineProperty(e, '__esModule', {
        value: !0
    });
    let t = null;
    e.getKeyId = function() {
        return n().keyId
    }
    ,
    e.getPublicKey = function() {
        return n().publicKey
    }
    ,
    e.getVersion = function() {
        return n().version
    }
    ,
    e.setEncryptionKeys = function(n, u, o) {
        t = {
            keyId: n,
            publicKey: u,
            version: o
        }
    }
}, 9568261, [9699341]);





////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

https://www.instagram.com/static/bundles/es6/ConsumerLibCommons.js/2dcb314b3213.js:formatted

/*
URL: https://www.instagram.com/accounts/login/
Response headers:
    ig-set-password-encryption-web-key-id: 203
    ig-set-password-encryption-web-key-version: 10
    ig-set-password-encryption-web-pub-key: ...
*/

function u(t) {
    const n = t.getResponseHeader('IG-Set-Password-Encryption-Web-Key-Id')
      , s = t.getResponseHeader('IG-Set-Password-Encryption-Web-Key-Version')
      , o = t.getResponseHeader('IG-Set-Password-Encryption-Web-Pub-Key');
    n && o && s && r(d[8]).setEncryptionKeys(n, o, s)
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

https://www.instagram.com/static/bundles/es6/EncryptionUtils.js/4fdca6754e56.js:formatted

__d(function(g, r, i, a, m, e, d) {
    'use strict';
    Object.defineProperty(e, '__esModule', {
        value: !0
    }),
    e.encryptPassword = async function(t, c, n, o, s) {
        /*
            c: "ig-set-password-encryption-web-pub-key"
            u: Uint8Array(34) [49, 50, 55, 56, 52, 121, 49, 50, 55, 52, 56, 49, 50, 52, 55, 49, 50, 52, 49, 48, 50, 52, 102, 49, 56, 55, 51, 110, 114, 56, 49, 100, 49, 110]
            f: Uint8Array(10) [49, 53, 57, 52, 50, 49, 53, 49, 48, 52]
            n: "10"
            o: "this_is__user_pass"
            s: "1594215104"
            t: 203
        */
        const u = r(d[0]).decodeUTF8(o)
          , f = r(d[0]).decodeUTF8(s)
          , y = await r(d[1]).encrypt(t, c, u, f);

          /*
            Local
            c: "ig-set-password-encryption-web-pub-key"
            f: Uint8Array(10) [49, 53, 57, 52, 50, 49, 53, 49, 48, 52]
            n: "10"
            o: "this_is__user_pass"
            s: "1594215104"
            t: 203
            this: Object
            u: Uint8Array(34) [49, 50, 55, 56, 52, 121, 49, 50, 55, 52, 56, 49, 50, 52, 55, 49, 50, 52, 49, 48, 50, 52, 102, 49, 56, 55, 51, 110, 114, 56, 49, 100, 49, 110]
            y: Uint8Array(116) [1, 203, 80, 0, 240, 20, 139, 235, 119, 35, 218, 250, 90, 82, 187, 203, 167, 198, 45, 187, 90, 92, 220, 103, 171, 152, 182, 241, 147, 27, 139, 16, 170, 1, 227, 41, 68, 206, 142, 92, 169, 254, 48, 128, 9, 210, 246, 105, 211, 110, 5, 174, 58, 1, 208, 55, 224, 54, 213, 129, 253, 126, 77, 101, 197, 246, 84, 130, 255, 56, 94, 165, 89, 102, 97, 38, 17, 107, 57, 115, 140, 107, 135, 233, 130, 64, 16, 115, 95, 198, 191, 189, 54, 144, 107, 89, 87, 1, 200, 209, …]
          */
        return r(d[2]).default(r(d[0]).encodeBase64(y), s, n) // <=========== .default()
    }
}, 9633793, [9633794, 9633795, 9568262]);



// https://www.instagram.com/static/bundles/es6/ConsumerLibCommons.js/fb45bc4b9ca6.js:formatted

__d(function(g, r, i, a, m, e, d) {
    'use strict';
    Object.defineProperty(e, '__esModule', {
        value: !0
    });
    const t = '#PWD_INSTAGRAM_BROWSER'
      , _ = Object.freeze({
        PLAINTEXT: '0',
        ROTATED_ENCRYPT: '6',
        FALLBACK_ENCRYPT: '9'
    });
    e.default = function(_, T, n) {    // <=========== .default()
        /*
        Local
        T: "1594228065"
        n: "10"
        this: Object
        _: "...crypted data..."
        Closure
        t: "#PWD_INSTAGRAM_BROWSER"

        
        return #PWD_INSTAGRAM_BROWSER:...:...:...
        */
        return [t, n, T, _].join(':')
    }
    ,
    e.PWD_ENC_TAG_BROWSER = t,
    e.formatType = _
}, 9568262, []);



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

https://www.instagram.com/static/bundles/es6/EncryptionUtils.js/4fdca6754e56.js:formatted

return t.decodeUTF8 = function(n) {
    if ('string' != typeof n)
        throw new TypeError('expected string');
    var t, o = unescape(encodeURIComponent(n)), c = new Uint8Array(o.length);
    for (t = 0; t < o.length; t++)
        c[t] = o.charCodeAt(t);
    return c
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

https://www.instagram.com/static/bundles/es6/EncryptionUtils.js/4fdca6754e56.js:formatted

__d(function(g, r, i, a, m, e, d) {
    'use strict';
    function t(t, n) {                              // <=========================== t()
        return r(d[0]).seal(t, n)       // <========= seal(t, n)
    }
    function n(t) {                                 // <=========================== n()
        const n = [];
        for (let o = 0; o < t.length; o += 2)
            n.push(parseInt(t.slice(o, o + 2), 16));
        return new Uint8Array(n)
    }
    const o = 36 + r(d[0]).overheadLength + 16
      , s = {
        encrypt: async function(s, c, h, l) {
            /*
                c: "ig-set-password-encryption-web-pub-key"
"this_is__user_pass"  <=>     h: Uint8Array(34) [49, 50, 55, 56, 52, 121, 49, 50, 55, 52, 56, 49, 50, 52, 55, 49, 50, 52, 49, 48, 50, 52, 102, 49, 56, 55, 51, 110, 114, 56, 49, 100, 49, 110]
"1594215104"        <=>     Uint8Array(10) [49, 53, 57, 52, 50, 49, 53, 49, 48, 52]
                s: 203
                this: Object
                u: undefined
            */

            const u = o + h.length;
            if (64 !== c.length)
                throw new Error('public key is not a valid hex sting');
            const w = n(c);                         // <=========================== n()
            if (!w)
                throw new Error('public key is not a valid hex string');
            const y = new Uint8Array(u);
            let f = 0;
            y[f] = 1,
            y[f += 1] = s,
            f += 1;
            const p = {
                name: 'AES-GCM',
                iv: new Uint8Array(12),
                additionalData: l,
                tagLen: 16
            }
              , A = window.crypto || window.msCrypto;
            return A.subtle.generateKey({
                name: 'AES-GCM',
                length: 256
            }, !0, ['encrypt', 'decrypt']).then(function(t) {
                const n = A.subtle.exportKey('raw', t)
                  , o = A.subtle.encrypt(p, t, h.buffer);
                return Promise.all([n, o])
            }).then(function(n) {
                // AES-GCM crypt AES (GCM public key)
                const o = t(new Uint8Array(n[0]), w);   // <=========================== t()
                if (y[f] = 255 & o.length,
                y[f + 1] = o.length >> 8 & 255,
                f += 2,
                y.set(o, f),
                f += 32,
                f += r(d[0]).overheadLength,
                o.length !== 32 + r(d[0]).overheadLength)
                    throw new Error('encrypted key is the wrong length');
                const s = new Uint8Array(n[1])
                  , c = s.slice(-16)
                  , h = s.slice(0, -16);
                return y.set(c, f),
                f += 16,
                y.set(h, f),
                y
            }).catch(function(t) {
                throw t
            })
        }
    };
    m.exports = s
}, 9633795, [9633796]);

// seal(t, n)
e.default = function(t, n) { // <========= seal(t, n)
    // Here somewhere.overheadLength = 80 - t.length(32) = 48
    var u = new Uint8Array(r(d[0]).overheadLength + t.length) // Array size should be 80
      , c = i(d[1]).box.keyPair();  // <============= box.keyPair();
/*
 Local
 c:
    publicKey: Uint8Array(32) [179, 213, 98, 197, 50, 161, 29, 82, 85, 236, 118, 224, 79, 20, 186, 71, 21, 202, 221, 69, 37, 145, 93, 47, 101, 78, 25, 42, 55, 255, 29, 0]
    secretKey: Uint8Array(32) [252, 18, 176, 32, 186, 20, 8, 66, 83, 182, 33, 27, 200, 77, 248, 64, 251, 78, 67, 192, 2, 122, 248, 88, 73, 135, 111, 101, 236, 148, 5, 150]
    __proto__: Object
 l: undefined
 n: Uint8Array(32) [30, 176, 98, 132, 232, 37, 110, 90, 14, 93, 44, 96, 245, 164, 119, 211, 25, 121, 186, 148, 232, 66, 226, 55, 253, 12, 247, 101, 22, 129, 215, 89]
 o: undefined
 t: Uint8Array(32) [52, 223, 127, 70, 73, 253, 192, 202, 93, 17, 37, 130, 192, 38, 254, 228, 102, 74, 51, 97, 232, 118, 149, 173, 112, 95, 108, 182, 191, 25, 167, 102]
 this: Object
 u: Uint8Array(80) [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
*/
    u.set(c.publicKey);
    var l = i(d[2])(c.publicKey, n)
      , o = i(d[1]).box(t, l, n, c.secretKey);
    return u.set(o, c.publicKey.length),
    r(d[3]).zero(c.secretKey),
    u
}

// https://www.instagram.com/static/bundles/es6/EncryptionUtils.js/4fdca6754e56.js:formatted
/*
, xr = 32
, Mr = 32
*/

t.box.keyPair = function() { // <============= box.keyPair();
    var t = new Uint8Array(xr)
      , n = new Uint8Array(Mr);
    return C(t, n), // more inside lib
    {
        publicKey: t,
        secretKey: n
    }
}


/*
============================================================================================
Stack trace:
============================================================================================
encrypt (4fdca6754e56.js:formatted:104)
e.encryptPassword (4fdca6754e56.js:formatted:23)
e.encryptAndFormat (4fdca6754e56.js:formatted:12)
t (2dcb314b3213.js:formatted:9644)
await in t (async)
e.getEncryptedParam (2dcb314b3213.js:formatted:9673)
e.login (2dcb314b3213.js:formatted:8907)
(anonymous) (2dcb314b3213.js:formatted:20410)
(anonymous) (c911f5848b78.js:67)
(anonymous) (f3f3c189dae5.js:23)
(anonymous) (2dcb314b3213.js:formatted:25327)
dispatch (c911f5848b78.js:36)
(anonymous) (2dcb314b3213.js:formatted:20748)
(anonymous) (c911f5848b78.js:67)
(anonymous) (f3f3c189dae5.js:23)
(anonymous) (2dcb314b3213.js:formatted:25327)
onLogin (f3f3c189dae5.js:452)
$SlimLoginForm6 (f3f3c189dae5.js:502)
o (c911f5848b78.js:11)
u (c911f5848b78.js:11)
c (c911f5848b78.js:11)
s (c911f5848b78.js:11)
h (c911f5848b78.js:11)
p (c911f5848b78.js:11)
v (c911f5848b78.js:11)
Me (c911f5848b78.js:11)
mi (c911f5848b78.js:11)
We (c911f5848b78.js:11)
Ve (c911f5848b78.js:11)
Be (c911f5848b78.js:11)
e.unstable_runWithPriority (c911f5848b78.js:13)
Vt (c911f5848b78.js:11)
Fr (c911f5848b78.js:11)
Le (c911f5848b78.js:11)
*/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

__d(function(g, r, i, a, m, e, d) {
    !(function(n, t) {
        'use strict';
        void 0 !== m && m.exports ? m.exports = t() : n.nacl ? n.nacl.util = t() : (n.nacl = {},
        n.nacl.util = t())
    }
    )(this, function() {
        'use strict';
        function n(n) {
            if (!/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(n))
                throw new TypeError('invalid encoding')
        }
        var t = {};
        return t.decodeUTF8 = function(n) {
            if ('string' != typeof n)
                throw new TypeError('expected string');
            var t, o = unescape(encodeURIComponent(n)), c = new Uint8Array(o.length);
            for (t = 0; t < o.length; t++)
                c[t] = o.charCodeAt(t);
            return c
        }
        ,
        t.encodeUTF8 = function(n) {
            var t, o = [];
            for (t = 0; t < n.length; t++)
                o.push(String.fromCharCode(n[t]));
            return decodeURIComponent(escape(o.join('')))
        }
        ,
        'undefined' == typeof atob ? void 0 !== Buffer.from ? (t.encodeBase64 = function(n) {
            return Buffer.from(n).toString('base64')
        }
        ,
        t.decodeBase64 = function(t) {
            return n(t),
            new Uint8Array(Array.prototype.slice.call(Buffer.from(t, 'base64'), 0))
        }
        ) : (t.encodeBase64 = function(n) {
            return new Buffer(n).toString('base64')
        }
        ,
        t.decodeBase64 = function(t) {
            return n(t),
            new Uint8Array(Array.prototype.slice.call(new Buffer(t,'base64'), 0))
        }
        ) : (t.encodeBase64 = function(n) {
            /*
            Local
            c: undefined
            n: Uint8Array(116)
            [0 … 99]
            [100 … 115]
            __proto__: TypedArray
            o: undefined
            t: undefined
            this: Object
            */
            var t, o = [], c = n.length;
            for (t = 0; t < c; t++)
                o.push(String.fromCharCode(n[t]));
            return btoa(o.join(''))
        }
        ,
        t.decodeBase64 = function(t) {
            n(t);
            var o, c = atob(t), f = new Uint8Array(c.length);
            for (o = 0; o < c.length; o++)
                f[o] = c.charCodeAt(o);
            return f
        }
        ),
        t
    })
}, 9633794, []);


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

https://www.instagram.com/static/bundles/es6/ConsumerLibCommons.js/2dcb314b3213.js:formatted


e.post = function(t, n, s, o) {
    /*
    Local
    n:
        enc_password: "#PWD_INSTAGRAM_BROWSER:...:...:..."
        optIntoOneTap: false
        queryParams: "{}"
        username: "this_is__user_name"
        __proto__: Object
    o: undefined
    s:
        loggingData:
        requestUUID: "a1d1a3dd-a08d-468c-8386-3dca5c3b079a"
        __proto__: Object
        timeout: 10000
        __proto__: Object
    t: "/accounts/login/ajax/"
    this: Object
    */
    return c('POST', t, n, s, o)
}

/*
e.post (2dcb314b3213.js:formatted:2573)
e.login (2dcb314b3213.js:formatted:8905)
await in e.login (async)
(anonymous) (2dcb314b3213.js:formatted:20410)
(anonymous) (c911f5848b78.js:67)
(anonymous) (f3f3c189dae5.js:23)
(anonymous) (2dcb314b3213.js:formatted:25327)
dispatch (c911f5848b78.js:36)
(anonymous) (2dcb314b3213.js:formatted:20748)
(anonymous) (c911f5848b78.js:67)
(anonymous) (f3f3c189dae5.js:23)
(anonymous) (2dcb314b3213.js:formatted:25327)
onLogin (f3f3c189dae5.js:452)
$SlimLoginForm6 (f3f3c189dae5.js:502)
o (c911f5848b78.js:11)
u (c911f5848b78.js:11)
c (c911f5848b78.js:11)
s (c911f5848b78.js:11)
h (c911f5848b78.js:11)
p (c911f5848b78.js:11)
v (c911f5848b78.js:11)
Me (c911f5848b78.js:11)
mi (c911f5848b78.js:11)
We (c911f5848b78.js:11)
Ve (c911f5848b78.js:11)
Be (c911f5848b78.js:11)
e.unstable_runWithPriority (c911f5848b78.js:13)
Vt (c911f5848b78.js:11)
Fr (c911f5848b78.js:11)
Le (c911f5848b78.js:11)
*/




////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

https://www.instagram.com/static/bundles/es6/ConsumerLibCommons.js/2dcb314b3213.js:formatted

function c(n, c, T, E, P) {           // <================== c (2dcb314b3213.js:formatted:2469)
    const {alwaysPassCsrfTokenToSameOrigin: W=!1, headers: I={}, loggingData: H, omitLanguageParam: C=!1, omitAjaxHeader: R=!1, omitAppIDHeader: x=!1, omitWWWClaimHeader: G=!1, preloadable: S=!1, urlErrorFormatter: j=o, ...A} = E || {}
      , b = {
        cache: !0,
        timeout: h,
        ...A,
        headers: I
    };
    if (r(d[0]).needsToConfirmCookies()) {
        const t = r(d[1]).getMID();
        t && (b.headers['X-Mid'] = t)
    }
    i(d[2])(n, c, W) && (b.headers['X-CSRFToken'] = r(d[0]).getCSRFToken()),
    'GET' === n || R || (b.headers['X-Instagram-AJAX'] = r(d[0]).getRolloutHash()),
    x || (b.headers['X-IG-App-ID'] = r(d[0]).getIGAppID());
    const k = i(d[3])(c)
      , O = r(d[4]).isAPIUrl(c);
    if (G || !k && !O || (b.headers['X-IG-WWW-Claim'] = r(d[5]).getWWWClaim() || '0'),
    O && (b.withCredentials = !0),
    c = r(d[6]).zeroRewriteAjaxUrl(c, b),
    !C) {
        const t = s();
        if (t && 'POST' === n) {
            const n = -1 !== c.indexOf('?');
            c += (n ? '&' : '?') + 'hl=' + t
        }
    }
    null != H && l(c, T, H);                        // <=============== call l (2dcb314b3213.js:formatted:2512)
    const X = r(d[7]);
    return p(()=>{
        S && 'GET' === n && (y = !0);
        const t = X.map(n, c, T, b, P);
        return S && 'GET' === n && (y = !1),
        t
    }
    , 'GET' === n || 'HEAD' === n ? f : 0).then(([t,n])=>{
        if (k) {
            const n = t.getResponseHeader('x-ig-set-www-claim');
            n && n !== r(d[5]).getWWWClaim() && r(d[5]).setWWWClaim(n),
            u(t)
        }
        return n
    }
    ).catch(([s,o,l])=>{
        if ('GET' !== n.toUpperCase()) {
            const n = t(o);
            if (n)
                return window.top.location.href = n,
                new Promise(()=>null)
        }
        return k && u(o),
        Promise.reject(new w(o && o.statusText,o && o.status,o && o.responseText,j(c, T)))
    }
    )
}

/*
l (2dcb314b3213.js:formatted:2512)
c (2dcb314b3213.js:formatted:2469)
e.post (2dcb314b3213.js:formatted:2573)
e.login (2dcb314b3213.js:formatted:8905)
await in e.login (async)
(anonymous) (2dcb314b3213.js:formatted:20410)
(anonymous) (c911f5848b78.js:67)
(anonymous) (f3f3c189dae5.js:23)
(anonymous) (2dcb314b3213.js:formatted:25327)
dispatch (c911f5848b78.js:36)
(anonymous) (2dcb314b3213.js:formatted:20748)
(anonymous) (c911f5848b78.js:67)
(anonymous) (f3f3c189dae5.js:23)
(anonymous) (2dcb314b3213.js:formatted:25327)
onLogin (f3f3c189dae5.js:452)
$SlimLoginForm6 (f3f3c189dae5.js:502)
o (c911f5848b78.js:11)
u (c911f5848b78.js:11)
c (c911f5848b78.js:11)
s (c911f5848b78.js:11)
h (c911f5848b78.js:11)
p (c911f5848b78.js:11)
v (c911f5848b78.js:11)
Me (c911f5848b78.js:11)
mi (c911f5848b78.js:11)
We (c911f5848b78.js:11)
Ve (c911f5848b78.js:11)
Be (c911f5848b78.js:11)
e.unstable_runWithPriority (c911f5848b78.js:13)
Vt (c911f5848b78.js:11)
Fr (c911f5848b78.js:11)
Le (c911f5848b78.js:11)
*/