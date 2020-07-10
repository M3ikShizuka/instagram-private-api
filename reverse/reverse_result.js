const getHandlerDate = () => {
    return Math.floor(Date.now() / 1e3).toString();
}

const decodeUTF8 = (date) => {
    if ('string' != typeof date)
        throw new TypeError('expected string');

    let dateEncodeUnescape = unescape(encodeURIComponent(date)),
        dateArray = new Uint8Array(dateEncodeUnescape.length);

    for (let index = 0; index < dateEncodeUnescape.length; index++)
        dateArray[index] = dateEncodeUnescape.charCodeAt(index);

    return dateArray;
}

const decodeStr = (string) => {
    const arrayNew = [];

    for (let constSize = 0; constSize < string.length; constSize += 2)
        arrayNew.push(parseInt(string.slice(constSize, constSize + 2), 16));

    return new Uint8Array(arrayNew);
}

const encrypt = async (passEncKeyId, passEncPublicKey, userpassDataDecoded, dateDataDecoded) => {
    const constSize = 100;
    const arraySize = constSize + userpassDataDecoded.length;

    if (64 !== passEncPublicKey.length)
        throw new Error('public key is not a valid hex sting');

    const decodedPublicKey = decodeStr(passEncPublicKey);
    if (!decodedPublicKey)
        throw new Error('public key is not a valid hex string');

    const cryptedData = new Uint8Array(arraySize);
    let counter = 0;

    cryptedData[counter] = 1,
        cryptedData[counter += 1] = passEncKeyId,
        counter += 1;

    const cryptoConfig = {
        name: 'AES-GCM',
        iv: new Uint8Array(12),
        additionalData: dateDataDecoded,
        tagLen: 16
    };

    return Crypto.subtle.generateKey({
        name: 'AES-GCM',
        length: 256
    },
        true,
        ['encrypt', 'decrypt']
    )
        .then(function (cryptoKey) { // key
            /*
            passEncVersion: undefined
            constSize: undefined
            passEncKeyId: CryptoKey
                algorithm: {name: "AES-GCM", length: 256}
                extractable: true
                type: "secret"
                usages: (2) ["encrypt", "decrypt"]
                __proto__: CryptoKey
            this: undefined

            Crypto.subtle.exportKey: https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/exportKey
            */
            const promiseExportKey = Crypto.subtle.exportKey('raw', cryptoKey),
                promiseCiphertext = Crypto.subtle.encrypt(cryptoConfig, cryptoKey, userpassDataDecoded.buffer);
            return Promise.all([promiseExportKey, promiseCiphertext]);
        }).then(function (keyArrays) { // [exportKey, ciphertext]
            /*
            Local
            passEncPublicKey: undefined
            h: undefined
            keyArrays: Array(2)
            0: ArrayBuffer(32) {}
            1: ArrayBuffer(32) {}
            length: 2
            __proto__: Array(0)
            cryptedAESKey: undefined
            s: undefined
            this: undefined
            */
            
            // Seal box encrypt.
            const cryptedAESKey = sealedBox.seal(new Uint8Array(keyArrays[0]), decodedPublicKey);
            const overheadLength = 48;

            if (cryptedData[counter] = 255 & cryptedAESKey.length,
                cryptedData[counter + 1] = cryptedAESKey.length >> 8 & 255,
                counter += 2,
                cryptedData.set(cryptedAESKey, counter),
                counter += 32,

                //// f = 36
                // f += r(d[0]).overheadLength, // overheadLength = 84 - 36 = 48
                //// f = 84
                // constSize.length !== 32 + r(d[0]).overheadLength  // constSize.length !== 32 + 48 = 80

                // counter += r(d[0]).overheadLength,
                // cryptedAESKey.length !== 32 + r(d[0]).overheadLength

                counter += overheadLength,
                cryptedAESKey.length !== 32 + overheadLength
            ) {
                throw new Error('encrypted key is the wrong length');
            }

            const passEncKeyId = new Uint8Array(keyArrays[1]),
                passEncPublicKey = passEncKeyId.slice(-16),
                userpassDataDecoded = passEncKeyId.slice(0, -16);

            cryptedData.set(passEncPublicKey, counter);
            counter += 16;
            cryptedData.set(userpassDataDecoded, counter);

            return cryptedData;
        }).catch(function (passEncKeyId) {
            throw passEncKeyId
        })
}

const encodeBase64 = (arrayData) => {
    /*
    Local
    arraySize: undefined
    arrayData: Uint8Array(116)
    [0 … 99]
    [100 … 115]
    __proto__: TypedArray
    arrayChars: undefined
    index: undefined
    this: Object
    */
    let arrayChars = [], 
        arraySize = arrayData.length;

    for (let index = 0; index < arraySize; index++)
        arrayChars.push(String.fromCharCode(arrayData[index]));

    return btoa(arrayChars.join(''))
}

const formatData = (cryptedData, date, version) => {
    // .default()
    // return #PWD_INSTAGRAM_BROWSER:...:...:...
    const prefix = "#PWD_INSTAGRAM_BROWSER";
    return [prefix, version, date, cryptedData].join(':');
}

const encryptPassword = async function(passEncKeyId, passEncPublicKey, passEncVersion, userPass, date) {
    /*
        e.encryptPassword = async function(t, c, n, o, s) {
            const u = r(d[0]).decodeUTF8(o)
            , f = r(d[0]).decodeUTF8(s)
            , y = await r(d[1]).encrypt(t, c, u, f);
            return r(d[2]).default(r(d[0]).encodeBase64(y), s, n)
        }
    */

    const userPassDecoded = decodeUTF8(userPass),
        dateDecoded = decodeUTF8(date),
        cryptedData = await encrypt(passEncKeyId, passEncPublicKey, userPassDecoded, dateDecoded);

    return formatData(encodeBase64(y), date, passEncVersion)
}