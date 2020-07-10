const encrypt = async (passEncKeyId, passEncPublicKey, userpassDataDecoded, dateDataDecoded) => {
    const overheadLength = 100;
    const o = 36 + overheadLength + 16

    const arraySize = o + userpassDataDecoded.length;
    if (64 !== passEncPublicKey.length)
        throw new Error('public key is not a valid hex sting');
    const decodedPublicKey = decodeStr(passEncPublicKey);
    if (!decodedPublicKey)
        throw new Error('public key is not a valid hex string');
    const y = new Uint8Array(arraySize);
    let counter = 0;
    y[counter] = 1,
        y[counter += 1] = passEncKeyId,
        counter += 1;
    const p = {
        name: 'AES-GCM',
        iv: new Uint8Array(12),
        additionalData: dateDataDecoded,
        tagLen: 16
    },
        Crypto = window.crypto || window.msCrypto;
    return Crypto.subtle.generateKey({
        name: 'AES-GCM',
        length: 256
    }, !0, ['encrypt', 'decrypt']).then(function (t) {
        const n = Crypto.subtle.exportKey('raw', t)
            , o = Crypto.subtle.encrypt(p, t, userpassDataDecoded.buffer);
        return Promise.all([n, o])
    }).then(function (n) {
        const o = t(new Uint8Array(n[0]), decodedPublicKey);
        if (y[counter] = 255 & o.length,
            y[counter + 1] = o.length >> 8 & 255,
            counter += 2,
            y.set(o, counter),
            counter += 32,
            counter += r(d[0]).overheadLength,
            o.length !== 32 + r(d[0]).overheadLength)
            throw new Error('encrypted key is the wrong length');
        const passEncKeyId = new Uint8Array(n[1])
            , passEncPublicKey = passEncKeyId.slice(-16)
            , userpassDataDecoded = passEncKeyId.slice(0, -16);
        return y.set(passEncPublicKey, counter),
            counter += 16,
            y.set(userpassDataDecoded, counter),
            y
    }).catch(function (t) {
        throw t
    })
}