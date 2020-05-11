var randArr = new Uint8Array(32) //create a typed array of 32 bytes (256 bits)
window.crypto.getRandomValues(randArr) //populate array with cryptographically secure random numbers

//some Bitcoin and Crypto methods don't like Uint8Array for input. They expect regular JS arrays.
var privateKeyBytes = []
for (var i = 0; i < randArr.length; ++i)
  privateKeyBytes[i] = randArr[i]

//if you want to follow the step-by-step results in this article, comment the 
//previous code and uncomment the following
//var privateKeyBytes = Crypto.util.hexToBytes("1184CD2CDD640CA42CFC3A091C51D549B2F016D454B2774019C2B2D2E08529FD")

//hex string of our private key
var privateKeyHex = Crypto.util.bytesToHex(privateKeyBytes).toUpperCase()
console.log(privateKeyHex) //1184CD2CDD640CA42CFC3A091C51D549B2F016D454B2774019C2B2D2E08529FD
