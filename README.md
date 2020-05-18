# DogeCashWebWallet
## Js based wallet for DogeCoin
#### Not production. **_Use at your own risk_**
### Installation
To use this web wallet locally click the clone or download button, then chose download as a zip. Unzip the file. Once it is unzipped, open the index.html  
file in your favorite **_MODERN_** browser.
In order to generate new address **_Only For Testing_** you must change the debug setting to
false in /scripts/wallet.js This will generate secure keys by way of window.crypto. There are
some cases where this may not work properly make sure you are using a modern browser and that
window.crypto works with your browser. Otherwise the generation will not be secure.
### USE

#### Key Generation
The current setup allows for users to generate one private key and one public key. This is not a HD Wallet (Hierarchical deterministic Wallet) and because of that you must remember to back up every private key you generate. There is no one master. Losing any of the private keys you generate could result in the loss of funds.

#### Transaction
The transaction system is currently in development, and has not been tested to make sure it works.
Tests will commence shortly but its safe to say that this is something that shouldn't be used
at the current moment.

#### Not production. **_Use at your own risk_**
