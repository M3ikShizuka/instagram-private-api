// https://www.instagram.com/static/bundles/es6/EncryptionUtils.js/4fdca6754e56.js
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
//  function seal () {  // <============ seal ();

__d(function(g, r, i, a, m, e, d) {
    "use strict";
    Object.defineProperty(e, '__esModule', {
        value: !0
    }),
    e.default = function(t, n) {          // <============ seal ();
        var u = new Uint8Array(r(d[0]).overheadLength + t.length)
          , c = i(d[1]).box.keyPair();
        u.set(c.publicKey);
        var l = i(d[2])(c.publicKey, n)
          , o = i(d[1]).box(t, l, n, c.secretKey);
        return u.set(o, c.publicKey.length),
        r(d[3]).zero(c.secretKey),
        u
    }
}, 9633797, [9633799, 9633800, 9633801, 9633802]);


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
//  function seal () {  // <============ seal ();
//      ...
//      , c = i(d[1]).box.keyPair(); <===== this call:
//      ...
//  }

t.box.keyPair = function() {    // <===== this call .box.keyPair();:
    var t = new Uint8Array(xr)
        , n = new Uint8Array(Mr);
    return C(t, n),
    {
        publicKey: t,
        secretKey: n
    }
}

function C(t, n) {
    return ir(n, 32),           // <=============== ir(n, 32)
    O(t, n)
}

// myExtract
function ir(t, o) {  // <=============== ir(n, 32)
    var h, f = new Uint8Array(o); 
    for (h = 0; h < o; h += 65536)
        n.getRandomValues(f.subarray(h, h + Math.min(o - h, 65536)));
    for (h = 0; h < o; h++)
        t[h] = f[h];
    er(f)
}

function() {
    var n = 'undefined' != typeof self ? self.crypto || self.msCrypto : null;
    if (n && n.getRandomValues) {
        t.setPRNG(function(t, o) {  // <=============== ir(n, 32)
            var h, f = new Uint8Array(o); 
            for (h = 0; h < o; h += 65536)
                n.getRandomValues(f.subarray(h, h + Math.min(o - h, 65536)));
            for (h = 0; h < o; h++)
                t[h] = f[h];
            er(f)
        })
    } else
        void 0 !== r && (n = r(d[0])) && n.randomBytes && t.setPRNG(function(t, o) {
            var h, f = n.randomBytes(o);
            for (h = 0; h < o; h++)
                t[h] = f[h];
            er(f)
        })
}

function er(t) {
    for (var n = 0; n < t.length; n++)
        t[n] = 0
}

function O(t, n) {
    return N(t, n, ar)
}

function N(t, n, o) {
            var h, f, s = new Uint8Array(32), c = new Float64Array(80), u = or(), y = or(), l = or(), w = or(), v = or(), b = or();
            for (f = 0; f < 31; f++)
                s[f] = n[f];
            for (s[31] = 127 & n[31] | 64,
            s[0] &= 248,
            Y(c, o),
            f = 0; f < 16; f++)
                y[f] = c[f],
                w[f] = u[f] = l[f] = 0;
            for (u[0] = w[0] = 1,
            f = 254; f >= 0; --f)
                M(u, y, h = s[f >>> 3] >>> (7 & f) & 1),
                M(l, w, h),
                k(v, u, l),
                T(u, u, l),
                k(l, y, w),
                T(y, y, w),
                z(w, v),
                z(b, u),
                L(u, l, u),
                L(l, y, v),
                k(v, u, l),
                T(u, u, l),
                z(y, u),
                T(l, w, b),
                L(u, l, cr),
                k(u, u, w),
                L(l, l, u),
                L(u, w, b),
                L(w, y, c),
                z(y, v),
                M(u, y, h),
                M(l, w, h);
            for (f = 0; f < 16; f++)
                c[f + 16] = u[f],
                c[f + 32] = l[f],
                c[f + 48] = y[f],
                c[f + 64] = w[f];
            var p = c.subarray(32)
              , _ = c.subarray(16);
            return R(p, p),
            L(_, _, p),
            B(t, _),
            0
        }

         var or = function(t) {
            var n, o = new Float64Array(16);
            if (t)
                for (n = 0; n < t.length; n++)
                    o[n] = t[n];
            return o
        }

         function M(t, n, o) {
            for (var h, f = ~(o - 1), s = 0; s < 16; s++)
                h = f & (t[s] ^ n[s]),
                t[s] ^= h,
                n[s] ^= h
        }

            function k(t, n, o) {
            for (var h = 0; h < 16; h++)
                t[h] = n[h] + o[h]
        }

        function T(t, n, o) {
            for (var h = 0; h < 16; h++)
                t[h] = n[h] - o[h]
        }

         function z(t, n) {
            L(t, n, n)
        }

        function L(t, n, o) {
            var h, f, s = 0, c = 0, u = 0, y = 0, l = 0, w = 0, v = 0, b = 0, p = 0, _ = 0, A = 0, U = 0, E = 0, x = 0, M = 0, B = 0, S = 0, K = 0, Y = 0, k = 0, T = 0, L = 0, z = 0, R = 0, P = 0, N = 0, O = 0, C = 0, F = 0, I = 0, G = 0, Z = o[0], V = o[1], X = o[2], D = o[3], j = o[4], q = o[5], H = o[6], J = o[7], Q = o[8], W = o[9], $ = o[10], rr = o[11], tr = o[12], nr = o[13], er = o[14], or = o[15];
            s += (h = n[0]) * Z,
            c += h * V,
            u += h * X,
            y += h * D,
            l += h * j,
            w += h * q,
            v += h * H,
            b += h * J,
            p += h * Q,
            _ += h * W,
            A += h * $,
            U += h * rr,
            E += h * tr,
            x += h * nr,
            M += h * er,
            B += h * or,
            c += (h = n[1]) * Z,
            u += h * V,
            y += h * X,
            l += h * D,
            w += h * j,
            v += h * q,
            b += h * H,
            p += h * J,
            _ += h * Q,
            A += h * W,
            U += h * $,
            E += h * rr,
            x += h * tr,
            M += h * nr,
            B += h * er,
            S += h * or,
            u += (h = n[2]) * Z,
            y += h * V,
            l += h * X,
            w += h * D,
            v += h * j,
            b += h * q,
            p += h * H,
            _ += h * J,
            A += h * Q,
            U += h * W,
            E += h * $,
            x += h * rr,
            M += h * tr,
            B += h * nr,
            S += h * er,
            K += h * or,
            y += (h = n[3]) * Z,
            l += h * V,
            w += h * X,
            v += h * D,
            b += h * j,
            p += h * q,
            _ += h * H,
            A += h * J,
            U += h * Q,
            E += h * W,
            x += h * $,
            M += h * rr,
            B += h * tr,
            S += h * nr,
            K += h * er,
            Y += h * or,
            l += (h = n[4]) * Z,
            w += h * V,
            v += h * X,
            b += h * D,
            p += h * j,
            _ += h * q,
            A += h * H,
            U += h * J,
            E += h * Q,
            x += h * W,
            M += h * $,
            B += h * rr,
            S += h * tr,
            K += h * nr,
            Y += h * er,
            k += h * or,
            w += (h = n[5]) * Z,
            v += h * V,
            b += h * X,
            p += h * D,
            _ += h * j,
            A += h * q,
            U += h * H,
            E += h * J,
            x += h * Q,
            M += h * W,
            B += h * $,
            S += h * rr,
            K += h * tr,
            Y += h * nr,
            k += h * er,
            T += h * or,
            v += (h = n[6]) * Z,
            b += h * V,
            p += h * X,
            _ += h * D,
            A += h * j,
            U += h * q,
            E += h * H,
            x += h * J,
            M += h * Q,
            B += h * W,
            S += h * $,
            K += h * rr,
            Y += h * tr,
            k += h * nr,
            T += h * er,
            L += h * or,
            b += (h = n[7]) * Z,
            p += h * V,
            _ += h * X,
            A += h * D,
            U += h * j,
            E += h * q,
            x += h * H,
            M += h * J,
            B += h * Q,
            S += h * W,
            K += h * $,
            Y += h * rr,
            k += h * tr,
            T += h * nr,
            L += h * er,
            z += h * or,
            p += (h = n[8]) * Z,
            _ += h * V,
            A += h * X,
            U += h * D,
            E += h * j,
            x += h * q,
            M += h * H,
            B += h * J,
            S += h * Q,
            K += h * W,
            Y += h * $,
            k += h * rr,
            T += h * tr,
            L += h * nr,
            z += h * er,
            R += h * or,
            _ += (h = n[9]) * Z,
            A += h * V,
            U += h * X,
            E += h * D,
            x += h * j,
            M += h * q,
            B += h * H,
            S += h * J,
            K += h * Q,
            Y += h * W,
            k += h * $,
            T += h * rr,
            L += h * tr,
            z += h * nr,
            R += h * er,
            P += h * or,
            A += (h = n[10]) * Z,
            U += h * V,
            E += h * X,
            x += h * D,
            M += h * j,
            B += h * q,
            S += h * H,
            K += h * J,
            Y += h * Q,
            k += h * W,
            T += h * $,
            L += h * rr,
            z += h * tr,
            R += h * nr,
            P += h * er,
            N += h * or,
            U += (h = n[11]) * Z,
            E += h * V,
            x += h * X,
            M += h * D,
            B += h * j,
            S += h * q,
            K += h * H,
            Y += h * J,
            k += h * Q,
            T += h * W,
            L += h * $,
            z += h * rr,
            R += h * tr,
            P += h * nr,
            N += h * er,
            O += h * or,
            E += (h = n[12]) * Z,
            x += h * V,
            M += h * X,
            B += h * D,
            S += h * j,
            K += h * q,
            Y += h * H,
            k += h * J,
            T += h * Q,
            L += h * W,
            z += h * $,
            R += h * rr,
            P += h * tr,
            N += h * nr,
            O += h * er,
            C += h * or,
            x += (h = n[13]) * Z,
            M += h * V,
            B += h * X,
            S += h * D,
            K += h * j,
            Y += h * q,
            k += h * H,
            T += h * J,
            L += h * Q,
            z += h * W,
            R += h * $,
            P += h * rr,
            N += h * tr,
            O += h * nr,
            C += h * er,
            F += h * or,
            M += (h = n[14]) * Z,
            B += h * V,
            S += h * X,
            K += h * D,
            Y += h * j,
            k += h * q,
            T += h * H,
            L += h * J,
            z += h * Q,
            R += h * W,
            P += h * $,
            N += h * rr,
            O += h * tr,
            C += h * nr,
            F += h * er,
            I += h * or,
            B += (h = n[15]) * Z,
            c += 38 * (K += h * X),
            u += 38 * (Y += h * D),
            y += 38 * (k += h * j),
            l += 38 * (T += h * q),
            w += 38 * (L += h * H),
            v += 38 * (z += h * J),
            b += 38 * (R += h * Q),
            p += 38 * (P += h * W),
            _ += 38 * (N += h * $),
            A += 38 * (O += h * rr),
            U += 38 * (C += h * tr),
            E += 38 * (F += h * nr),
            x += 38 * (I += h * er),
            M += 38 * (G += h * or),
            s = (h = (s += 38 * (S += h * V)) + (f = 1) + 65535) - 65536 * (f = Math.floor(h / 65536)),
            c = (h = c + f + 65535) - 65536 * (f = Math.floor(h / 65536)),
            u = (h = u + f + 65535) - 65536 * (f = Math.floor(h / 65536)),
            y = (h = y + f + 65535) - 65536 * (f = Math.floor(h / 65536)),
            l = (h = l + f + 65535) - 65536 * (f = Math.floor(h / 65536)),
            w = (h = w + f + 65535) - 65536 * (f = Math.floor(h / 65536)),
            v = (h = v + f + 65535) - 65536 * (f = Math.floor(h / 65536)),
            b = (h = b + f + 65535) - 65536 * (f = Math.floor(h / 65536)),
            p = (h = p + f + 65535) - 65536 * (f = Math.floor(h / 65536)),
            _ = (h = _ + f + 65535) - 65536 * (f = Math.floor(h / 65536)),
            A = (h = A + f + 65535) - 65536 * (f = Math.floor(h / 65536)),
            U = (h = U + f + 65535) - 65536 * (f = Math.floor(h / 65536)),
            E = (h = E + f + 65535) - 65536 * (f = Math.floor(h / 65536)),
            x = (h = x + f + 65535) - 65536 * (f = Math.floor(h / 65536)),
            M = (h = M + f + 65535) - 65536 * (f = Math.floor(h / 65536)),
            B = (h = B + f + 65535) - 65536 * (f = Math.floor(h / 65536)),
            s = (h = (s += f - 1 + 37 * (f - 1)) + (f = 1) + 65535) - 65536 * (f = Math.floor(h / 65536)),
            c = (h = c + f + 65535) - 65536 * (f = Math.floor(h / 65536)),
            u = (h = u + f + 65535) - 65536 * (f = Math.floor(h / 65536)),
            y = (h = y + f + 65535) - 65536 * (f = Math.floor(h / 65536)),
            l = (h = l + f + 65535) - 65536 * (f = Math.floor(h / 65536)),
            w = (h = w + f + 65535) - 65536 * (f = Math.floor(h / 65536)),
            v = (h = v + f + 65535) - 65536 * (f = Math.floor(h / 65536)),
            b = (h = b + f + 65535) - 65536 * (f = Math.floor(h / 65536)),
            p = (h = p + f + 65535) - 65536 * (f = Math.floor(h / 65536)),
            _ = (h = _ + f + 65535) - 65536 * (f = Math.floor(h / 65536)),
            A = (h = A + f + 65535) - 65536 * (f = Math.floor(h / 65536)),
            U = (h = U + f + 65535) - 65536 * (f = Math.floor(h / 65536)),
            E = (h = E + f + 65535) - 65536 * (f = Math.floor(h / 65536)),
            x = (h = x + f + 65535) - 65536 * (f = Math.floor(h / 65536)),
            M = (h = M + f + 65535) - 65536 * (f = Math.floor(h / 65536)),
            B = (h = B + f + 65535) - 65536 * (f = Math.floor(h / 65536)),
            s += f - 1 + 37 * (f - 1),
            t[0] = s,
            t[1] = c,
            t[2] = u,
            t[3] = y,
            t[4] = l,
            t[5] = w,
            t[6] = v,
            t[7] = b,
            t[8] = p,
            t[9] = _,
            t[10] = A,
            t[11] = U,
            t[12] = E,
            t[13] = x,
            t[14] = M,
            t[15] = B
        }

        function R(t, n) {
            var o, h = or();
            for (o = 0; o < 16; o++)
                h[o] = n[o];
            for (o = 253; o >= 0; o--)
                z(h, h),
                2 !== o && 4 !== o && L(h, h, n);
            for (o = 0; o < 16; o++)
                t[o] = h[o]
        }

        function B(t, n) {
            var o, h, f, s = or(), c = or();
            for (o = 0; o < 16; o++)
                c[o] = n[o];
            for (x(c),
            x(c),
            x(c),
            h = 0; h < 2; h++) {
                for (s[0] = c[0] - 65517,
                o = 1; o < 15; o++)
                    s[o] = c[o] - 65535 - (s[o - 1] >> 16 & 1),
                    s[o - 1] &= 65535;
                s[15] = c[15] - 32767 - (s[14] >> 16 & 1),
                f = s[15] >> 16 & 1,
                s[14] &= 65535,
                M(c, s, 1 - f)
            }
            for (o = 0; o < 16; o++)
                t[2 * o] = 255 & c[o],
                t[2 * o + 1] = c[o] >> 8
        }

        function x(t) {
            var n, o, h = 1;
            for (n = 0; n < 16; n++)
                o = t[n] + h + 65535,
                h = Math.floor(o / 65536),
                t[n] = o - 65536 * h;
            t[0] += h - 1 + 37 * (h - 1)
        }


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
//  function seal () {
//      ...
//      var l = i(d[2])(c.publicKey, n) <===== this call:
//      ...
//  }


__d(function(g, r, i, a, m, e, d) {
    "use strict";
    Object.defineProperty(e, '__esModule', {
        value: !0
    }),
    e.default = function(n, t) {            // <===== this call:
        var b = i(d[0]).blake2bInit(i(d[1]).box.nonceLength, null);// <============= blake2bInit(
        return i(d[0]).blake2bUpdate(b, n), // <=============== blake2bUpdate(b, n),
        i(d[0]).blake2bUpdate(b, t),
        i(d[0]).blake2bFinal(b)     // <============== blake2bFinal(b)
    }
}, 9633801, [9633804, 9633800]);


function f(n, t) {                  // <============= blake2bInit(
    if (0 === n || n > 64)
        throw new Error('Illegal output length, expected 0 < length <= 64');
    if (t && t.length > 64)
        throw new Error('Illegal key, expected Uint8Array with 0 < length <= 64');
    for (var o = {
        b: new Uint8Array(128),
        h: new Uint32Array(16),
        t: 0,
        c: 0,
        outlen: n
    }, u = 0; u < 16; u++)
        o.h[u] = v[u];
    var c = t ? t.length : 0;
    return o.h[0] ^= 16842752 ^ c << 8 ^ n,
    t && (l(o, t),  // <=============== call two! blake2bUpdate(b, n),
    o.c = 128),
    o
}

function l(n, t) {            // <=============== blake2bUpdate(b, n),
    for (var o = 0; o < t.length; o++)
        128 === n.c && (n.t += n.c,
        c(n, !1),
        n.c = 0),
        n.b[n.c++] = t[o]
}

function h(n) {             // <============== blake2bFinal(b)
    for (n.t += n.c; n.c < 128; )
        n.b[n.c++] = 0;
    c(n, !0);   
    for (var t = new Uint8Array(n.outlen), o = 0; o < n.outlen; o++)
        t[o] = n.h[o >> 2] >> 8 * (3 & o);
    return t
}

function c(n, t) {      
    var c = 0;
    for (c = 0; c < 16; c++)
        y[c] = n.h[c],
        y[c + 16] = v[c];
    for (y[24] = y[24] ^ n.t,
    y[25] = y[25] ^ n.t / 4294967296,
    t && (y[28] = ~y[28],
    y[29] = ~y[29]),
    c = 0; c < 32; c++)
        U[c] = o(n.b, 4 * c);
    for (c = 0; c < 12; c++)
        u(0, 8, 16, 24, w[16 * c + 0], w[16 * c + 1]),
        u(2, 10, 18, 26, w[16 * c + 2], w[16 * c + 3]),
        u(4, 12, 20, 28, w[16 * c + 4], w[16 * c + 5]),
        u(6, 14, 22, 30, w[16 * c + 6], w[16 * c + 7]),
        u(0, 10, 20, 30, w[16 * c + 8], w[16 * c + 9]),
        u(2, 12, 22, 24, w[16 * c + 10], w[16 * c + 11]),
        u(4, 14, 16, 26, w[16 * c + 12], w[16 * c + 13]),
        u(6, 8, 18, 28, w[16 * c + 14], w[16 * c + 15]);
    for (c = 0; c < 16; c++)
        n.h[c] = n.h[c] ^ y[c] ^ y[c + 16]
}



///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
//  function seal () {
//      ...
//      , o = i(d[1]).box(t, l, n, c.secretKey); <===== this call t.box:
//      ...
//  }


t.box = function(n, o, h, f) {   //   <===== this call t.box:
    var s = t.box.before(h, f);
    return t.secretbox(n, o, s)
}

t.box.before = function(t, n) {
    nr(t, n),
    tr(t, n);
    var o = new Uint8Array(32);
    return F(o, t, n),
    o
}


function nr() {
    for (var t = 0; t < arguments.length; t++)
        if (!(arguments[t]instanceof Uint8Array))
            throw new TypeError('unexpected type, use Uint8Array')
}

function tr(t, n) {
    if (t.length !== xr)
        throw new Error('bad public key size');
    if (n.length !== Mr)
        throw new Error('bad secret key size')
}

function F(t, n, o) {
    var h = new Uint8Array(32);
    return N(h, o, n),
    y(t, hr, h, br)
}

function y(t, n, o, h) {
    c(t, n, o, h)
}

function c(t, n, o, h) {
    for (var f, s = 255 & h[0] | (255 & h[1]) << 8 | (255 & h[2]) << 16 | (255 & h[3]) << 24, c = 255 & o[0] | (255 & o[1]) << 8 | (255 & o[2]) << 16 | (255 & o[3]) << 24, u = 255 & o[4] | (255 & o[5]) << 8 | (255 & o[6]) << 16 | (255 & o[7]) << 24, y = 255 & o[8] | (255 & o[9]) << 8 | (255 & o[10]) << 16 | (255 & o[11]) << 24, l = 255 & o[12] | (255 & o[13]) << 8 | (255 & o[14]) << 16 | (255 & o[15]) << 24, w = 255 & h[4] | (255 & h[5]) << 8 | (255 & h[6]) << 16 | (255 & h[7]) << 24, v = 255 & n[0] | (255 & n[1]) << 8 | (255 & n[2]) << 16 | (255 & n[3]) << 24, b = 255 & n[4] | (255 & n[5]) << 8 | (255 & n[6]) << 16 | (255 & n[7]) << 24, p = 255 & n[8] | (255 & n[9]) << 8 | (255 & n[10]) << 16 | (255 & n[11]) << 24, _ = 255 & n[12] | (255 & n[13]) << 8 | (255 & n[14]) << 16 | (255 & n[15]) << 24, A = 255 & h[8] | (255 & h[9]) << 8 | (255 & h[10]) << 16 | (255 & h[11]) << 24, U = 255 & o[16] | (255 & o[17]) << 8 | (255 & o[18]) << 16 | (255 & o[19]) << 24, E = 255 & o[20] | (255 & o[21]) << 8 | (255 & o[22]) << 16 | (255 & o[23]) << 24, x = 255 & o[24] | (255 & o[25]) << 8 | (255 & o[26]) << 16 | (255 & o[27]) << 24, M = 255 & o[28] | (255 & o[29]) << 8 | (255 & o[30]) << 16 | (255 & o[31]) << 24, B = 255 & h[12] | (255 & h[13]) << 8 | (255 & h[14]) << 16 | (255 & h[15]) << 24, S = 0; S < 20; S += 2)
        s ^= (f = (E ^= (f = (p ^= (f = (l ^= (f = s + E | 0) << 7 | f >>> 25) + s | 0) << 9 | f >>> 23) + l | 0) << 13 | f >>> 19) + p | 0) << 18 | f >>> 14,
        w ^= (f = (c ^= (f = (x ^= (f = (_ ^= (f = w + c | 0) << 7 | f >>> 25) + w | 0) << 9 | f >>> 23) + _ | 0) << 13 | f >>> 19) + x | 0) << 18 | f >>> 14,
        A ^= (f = (v ^= (f = (u ^= (f = (M ^= (f = A + v | 0) << 7 | f >>> 25) + A | 0) << 9 | f >>> 23) + M | 0) << 13 | f >>> 19) + u | 0) << 18 | f >>> 14,
        B ^= (f = (U ^= (f = (b ^= (f = (y ^= (f = B + U | 0) << 7 | f >>> 25) + B | 0) << 9 | f >>> 23) + y | 0) << 13 | f >>> 19) + b | 0) << 18 | f >>> 14,
        s ^= (f = (y ^= (f = (u ^= (f = (c ^= (f = s + y | 0) << 7 | f >>> 25) + s | 0) << 9 | f >>> 23) + c | 0) << 13 | f >>> 19) + u | 0) << 18 | f >>> 14,
        w ^= (f = (l ^= (f = (b ^= (f = (v ^= (f = w + l | 0) << 7 | f >>> 25) + w | 0) << 9 | f >>> 23) + v | 0) << 13 | f >>> 19) + b | 0) << 18 | f >>> 14,
        A ^= (f = (_ ^= (f = (p ^= (f = (U ^= (f = A + _ | 0) << 7 | f >>> 25) + A | 0) << 9 | f >>> 23) + U | 0) << 13 | f >>> 19) + p | 0) << 18 | f >>> 14,
        B ^= (f = (M ^= (f = (x ^= (f = (E ^= (f = B + M | 0) << 7 | f >>> 25) + B | 0) << 9 | f >>> 23) + E | 0) << 13 | f >>> 19) + x | 0) << 18 | f >>> 14;
    t[0] = s >>> 0 & 255,
    t[1] = s >>> 8 & 255,
    t[2] = s >>> 16 & 255,
    t[3] = s >>> 24 & 255,
    t[4] = w >>> 0 & 255,
    t[5] = w >>> 8 & 255,
    t[6] = w >>> 16 & 255,
    t[7] = w >>> 24 & 255,
    t[8] = A >>> 0 & 255,
    t[9] = A >>> 8 & 255,
    t[10] = A >>> 16 & 255,
    t[11] = A >>> 24 & 255,
    t[12] = B >>> 0 & 255,
    t[13] = B >>> 8 & 255,
    t[14] = B >>> 16 & 255,
    t[15] = B >>> 24 & 255,
    t[16] = v >>> 0 & 255,
    t[17] = v >>> 8 & 255,
    t[18] = v >>> 16 & 255,
    t[19] = v >>> 24 & 255,
    t[20] = b >>> 0 & 255,
    t[21] = b >>> 8 & 255,
    t[22] = b >>> 16 & 255,
    t[23] = b >>> 24 & 255,
    t[24] = p >>> 0 & 255,
    t[25] = p >>> 8 & 255,
    t[26] = p >>> 16 & 255,
    t[27] = p >>> 24 & 255,
    t[28] = _ >>> 0 & 255,
    t[29] = _ >>> 8 & 255,
    t[30] = _ >>> 16 & 255,
    t[31] = _ >>> 24 & 255
}


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
// t.box = function(n, o, h, f) {   
//     var s = t.box.before(h, f);
//     return t.secretbox(n, o, s)      //   <===== this call t.secretbox:
// }


t.secretbox = function(t, n, o) {       //   <===== this call t.secretbox:
    nr(t, n, o),
    rr(o, n);
    for (var h = new Uint8Array(32 + t.length), f = new Uint8Array(h.length), s = 0; s < t.length; s++)
        h[s + 32] = t[s];
    return A(f, h, h.length, n, o),
    f.subarray(16)
}

function rr(t, n) {
    if (t.length !== Er)
        throw new Error('bad key size');
    if (n.length !== dr)
        throw new Error('bad nonce size')
}

function A(t, n, o, h, f) {
    var s;
    if (o < 32)
        return -1;
    for (b(t, 0, n, 0, o, h, f),
    p(t, 16, t, 32, o - 32, t),
    s = 0; s < 16; s++)
        t[s] = 0;
    return 0
}

function b(t, n, o, h, f, s, c) {
    var u = new Uint8Array(32);
    y(u, s, c, br);
    for (var w = new Uint8Array(8), v = 0; v < 8; v++)
        w[v] = s[v + 16];
    return l(t, n, o, h, f, w, u)
}

function l(t, n, o, h, f, s, c) {
    var y, l, w = new Uint8Array(16), v = new Uint8Array(64);
    for (l = 0; l < 16; l++)
        w[l] = 0;
    for (l = 0; l < 8; l++)
        w[l] = s[l];
    for (; f >= 64; ) {
        for (u(v, w, c, br),
        l = 0; l < 64; l++)
            t[n + l] = o[h + l] ^ v[l];
        for (y = 1,
        l = 8; l < 16; l++)
            y = y + (255 & w[l]) | 0,
            w[l] = 255 & y,
            y >>>= 8;
        f -= 64,
        n += 64,
        h += 64
    }
    if (f > 0)
        for (u(v, w, c, br),
        l = 0; l < f; l++)
            t[n + l] = o[h + l] ^ v[l];
    return 0
}

function p(t, n, o, h, f, s) {
    var c = new pr(s);
    return c.update(o, h, f),
    c.finish(t, n),
    0
}

pr = function(t) {
    this.buffer = new Uint8Array(16),
    this.r = new Uint16Array(10),
    this.h = new Uint16Array(10),
    this.pad = new Uint16Array(8),
    this.leftover = 0,
    this.fin = 0;
    var n, o, h, f, s, c, u, y;
    n = 255 & t[0] | (255 & t[1]) << 8,
    this.r[0] = 8191 & n,
    o = 255 & t[2] | (255 & t[3]) << 8,
    this.r[1] = 8191 & (n >>> 13 | o << 3),
    h = 255 & t[4] | (255 & t[5]) << 8,
    this.r[2] = 7939 & (o >>> 10 | h << 6),
    f = 255 & t[6] | (255 & t[7]) << 8,
    this.r[3] = 8191 & (h >>> 7 | f << 9),
    s = 255 & t[8] | (255 & t[9]) << 8,
    this.r[4] = 255 & (f >>> 4 | s << 12),
    this.r[5] = s >>> 1 & 8190,
    c = 255 & t[10] | (255 & t[11]) << 8,
    this.r[6] = 8191 & (s >>> 14 | c << 2),
    u = 255 & t[12] | (255 & t[13]) << 8,
    this.r[7] = 8065 & (c >>> 11 | u << 5),
    y = 255 & t[14] | (255 & t[15]) << 8,
    this.r[8] = 8191 & (u >>> 8 | y << 8),
    this.r[9] = y >>> 5 & 127,
    this.pad[0] = 255 & t[16] | (255 & t[17]) << 8,
    this.pad[1] = 255 & t[18] | (255 & t[19]) << 8,
    this.pad[2] = 255 & t[20] | (255 & t[21]) << 8,
    this.pad[3] = 255 & t[22] | (255 & t[23]) << 8,
    this.pad[4] = 255 & t[24] | (255 & t[25]) << 8,
    this.pad[5] = 255 & t[26] | (255 & t[27]) << 8,
    this.pad[6] = 255 & t[28] | (255 & t[29]) << 8,
    this.pad[7] = 255 & t[30] | (255 & t[31]) << 8
};