<h1>Instagram private API</h1>
<h2>Descripion</h2>
This is algorithm for encrypting data before sending login request.
<h2>Usage</h2>
<h3>Sign in (instagram private web API version)</h3>
Script signinEncryptData.js contain code, which generate post data for sign in request.<br/>
You can input you data in call of function generatePostDataForSignIn() run index.html <b>(on web server, for prevent block by CORS policy)</b> and you will get post data for your sign in request.<br/>
You must extract the sessionid from the response header (field " Set-Cookie: sessionid=...") this will be your authorized session. You must insert a sessionid in field cookie for every http request that needs to be authorized.<br/>
<b>WARNING</b><br/>
if you're using fetch or something else that doesn't have access to HttpOnly cookie fileds, then you need enable use cookie and session. Read more <a href="https://developer.mozilla.org/ru/docs/Web/HTTP/%D0%97%D0%B0%D0%B3%D0%BE%D0%BB%D0%BE%D0%B2%D0%BA%D0%B8/Set-Cookie">here</a>
<ol>
<li>
Do request to any instagram.com page(ex: https://www.instagram.com/accounts/login/).<br/>
Get params from response header:
    
```
ig-set-password-encryption-web-key-id: ...
ig-set-password-encryption-web-pub-key: ...
ig-set-password-encryption-web-key-version: ...
```
OR<br/>
from html (GET request to any page ex: https://www.instagram.com/accounts/login/):<br/>
HTML response ex:
```html
...
<script type="text/javascript">window._sharedData = {
    "config": {
        "csrf_token":"..." ... // <=== this is csrftoken
...            
    "encryption": {
        "key_id":"...", // <=== ig-set-password-encryption-web-key-id
        "public_key":"...", // <=== ig-set-password-encryption-web-pub-key
        "version":"..." // <=== ig-set-password-encryption-web-key-version
    }
...
</script>
...
```
</li>
<li>
Process the data using the algorithm described in signinEncryptData.js.<br/>
The following cryptographic algorithms and libraries are used:
<ul>
<li>
AES-GCM-256
</li>
<li>
NaCL crypto_box seal (Curve25519, Salsa20, Poly1305).
crypto_box is curve25519xsalsa20poly1305, a particular combination of Curve25519, Salsa20, and Poly1305 specified in "Cryptography in NaCl".
</li>
</ul>
</li>
<li>
Sing in post request with postData
Minimal expected headers for success authorization request.

```json
url: "https://www.instagram.com/accounts/login/ajax/", // <=== Sign in API url
headers: {
    "Host": "www.instagram.com",
    "Content-Type": "application/x-www-form-urlencoded",
    "X-CSRFToken": csrftoken, // <=== csrftoken
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36"
},
body: postData // <=== Data obtained at the second stage. 
```

Get sessionid from response Set-Cookie sessionid in header. It's your authorized session.

<b>WARNING</b> Set-Cookie: sessionid is <b>HttpOnly</b>. Read more <a href="https://developer.mozilla.org/ru/docs/Web/HTTP/%D0%97%D0%B0%D0%B3%D0%BE%D0%BB%D0%BE%D0%B2%D0%BA%D0%B8/Set-Cookie">here</a>.
```json
Success response:
// Header: 
Set-Cookie: sessionid=...; Domain=.instagram.com; expires=Sat, 10-Jul-2021 13:51:39 GMT; HttpOnly; Max-Age=31536000; Path=/; Secure
// Body:
{
    "user": true,
    "userId": ...,
    "authenticated": true,
    "oneTapPrompt": true,
    "status": "ok"
}
```
</li>
</ol>