const crypto = require("crypto")
const fs = require("fs")
const { CLIENT_RENEG_LIMIT } = require("tls")

/**
 * Code de génération des clés publique et privée de chiffrement RSA
 */


/*
const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: {
        type: 'spki', format: 'pem'
    },
    privateKeyEncoding: {
        type: 'pkcs8', format: 'pem'
    }
})

console.log('Private : ' + privateKey)
console.log('\nPublic : ' + publicKey)


fs.writeFile("privateKey.perm", privateKey, function (err) {
    if(err) throw err
})

fs.writeFile("publicKey.perm", publicKey, function(err) {
    if (err) throw err
})

*/


var privateKey = fs.readFileSync('privateKey.perm')
var publicKey = fs.readFileSync('publicKey.perm')

const sign = crypto.createSign("SHA256")
sign.update("MESSAGE TO SIGN")
sign.end()

const signature = sign.sign(privateKey)

console.log('Digitalnature : ' + Buffer.from(signature).toString('base64') );


const verify = crypto.createVerify("SHA256")
verify.update("MESSAGE TO SIGN")
verify.end()

const status = verify.verify(publicKey, signature)
console.log('Digitalnature status: ' + status);
