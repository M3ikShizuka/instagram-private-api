document.addEventListener("DOMContentLoaded", () => {
    ( async () => {
        // PASSWORD CRYPTO: AES-GCM-256, NaCL crypto_box seal (Curve25519, Salsa20, Poly1305).
        // crypto_box is curve25519xsalsa20poly1305, a particular combination of Curve25519, Salsa20, and Poly1305 specified in "Cryptography in NaCl".
        // sealedBox
        //// WEB
        const Crypto = window.crypto || window.msCrypto;
        //// Another
        // Crypto = crypto;

        ///// NaCL sealedbox
        // WEB use libs:
        // • https://tweetnacl.js.org/#/
        // • tweetnacl-sealedbox
        // Another devices:
        // NaCL same lib.

        // !!! WARNING! !!!
        //// if you are using fetch or something that hasn't access to HttpOnly cookie,
        //// then you need enable use cookie and session.
        // fetch(url, {
        //     credentials: "same-origin" // <=== enable use cookie.
        // }).then(...).catch(...);

        const generatePostDataForSignIn = async (
            user_name,          // user name or email
            user_pass,          // user pass
            passEncKeyId,       // ig-set-password-encryption-web-key-id
            passEncPublicKey,   // ig-set-password-encryption-web-pub-key
            passEncVersion      // ig-set-password-encryption-web-key-version
        ) => {
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
                        n: undefined
                        constSize: undefined
                        t: CryptoKey
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
                        c: undefined
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
                    }).catch(function (t) {
                        throw t
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
            
            // Prepare signin data.
            const prepareData = async (user_name, user_pass, encryptData) => {
                // Prepare data for sign request
                // Get date.
                const date = getHandlerDate();

                const userpassDataDecoded = decodeUTF8(user_pass),
                    dateDataDecoded = decodeUTF8(date),
                    cryptedData = await encrypt(encryptData.passEncKeyId, encryptData.passEncPublicKey, userpassDataDecoded, dateDataDecoded);

                // Request post data field.
                const enc_password = formatData(encodeBase64(cryptedData), date, encryptData.passEncVersion);
                //              username=user_name
                // encoded  ->  enc_password=enc_password // #PWD_INSTAGRAM_BROWSER...
                // encoded  ->  queryParams={}
                //              optIntoOneTap=false

                return `username=${user_name}&enc_password=${encodeURIComponent(enc_password)}&queryParams=${encodeURIComponent("{}")}&optIntoOneTap=${false}`;
            }

            /*
                Do request to any instagram.com page (ex: https://www.instagram.com/accounts/login/):
                Get params from response header:
                    ig-set-password-encryption-web-key-id: ...
                    ig-set-password-encryption-web-pub-key: ...
                    ig-set-password-encryption-web-key-version: ...
                
                OR
                from html (GET request to any page ex: https://www.instagram.com/accounts/login/):
                HTML response ex: 
                ... <script type="text/javascript">window._sharedData = {
                        "config": {
                            "csrf_token":"..." ... // <=== this is csrftoken
                ...            
                "encryption": {
                    "key_id":"...", // <=== ig-set-password-encryption-web-key-id
                    "public_key":"...", // <=== ig-set-password-encryption-web-pub-key
                    "version":"..." // <=== ig-set-password-encryption-web-key-version
                }...
                </script>
                ...
            */
            // csrftoken(in cookie)/csrf_token(in html)/X-CSRFToken(in header)

            const encryptData = {
                passEncKeyId: passEncKeyId, // ig-set-password-encryption-web-key-id: 203
                passEncPublicKey: passEncPublicKey, // ig-set-password-encryption-web-pub-key: ...
                passEncVersion: passEncVersion // ig-set-password-encryption-web-key-version: 10
            }

            return await prepareData(user_name, user_pass, encryptData);

            // Sing in post request with postData
            // Minimal expected headers for success authorization request.
            // url: "https://www.instagram.com/accounts/login/ajax/",
            // headers: {
            //     "Host": "www.instagram.com",
            //     "Content-Type": "application/x-www-form-urlencoded",
            //     "X-CSRFToken": csrftoken,
            //     "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36"
            // },
            // body: postData

            //// Get sessionid from response Set-Cookie sessionid in header.
            //// it's your authorized session.
            //// WARNING Set-Cookie: sessionid is HttpOnly.
            // Success response:
            //// Header: 
            // Set-Cookie: sessionid=...; Domain=.instagram.com; expires=Sat, 10-Jul-2021 13:51:39 GMT; HttpOnly; Max-Age=31536000; Path=/; Secure
            //// Body:
            // {
            //     "user": true,
            //     "userId": ...,
            //     "authenticated": true,
            //     "oneTapPrompt": true,
            //     "status": "ok"
            // }
        }

        // const postData = await generatePostDataForSignIn(
        //     "User name",
        //     "User pass",
        //     ＊＊＊web-key-id here＊＊＊, // ig-set-password-encryption-web-key-id
        //     ＊＊＊web-pub-key＊＊＊, // ig-set-password-encryption-web-pub-key
        //     ＊＊＊web-key-version＊＊＊ // ig-set-password-encryption-web-key-version
        // );

        document.getElementById("postData").innerText = postData;
    })();
});