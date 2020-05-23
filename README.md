# DogeCashWebWallet
## Js based wallet for DogeCoin
#### BETA **_PROCEED WITH CAUTION, DO STORE LARGE AMOUNTS OF FUNDS_**
Live version at https://wallet.dogec.io
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
It takes a little knowledge of how transactions work in bitcoin to understand how to use the create transaction page. I will briefly go over what needs to be done, if you are unsure I recommend doing more research and testing with small amounts in order to not lose funds. How this works is it takes the inputs from the previous transaction (the one that funded the wallet.) and it make a new transaction that funds other wallets instead. Here is how you do this. We are going to be using one of my transaction in order to understand how this works. You can follow along here: https://explorer.dogec.io/tx/f52fad9c89a5a71532632679dc6cef84e6f7be949925d9190d054457052a61ef Under the raw transactions section you to put the top Transaction ID (txid) where it says Trx Hash, In our example it would be "f52fad9c89a5a71532632679dc6cef84e6f7be949925d9190d054457052a61ef". The next step would be to figure out which part of the transaction funded your public key, this is put into the index field. you can find this based on the vout under the vin section. In this example it would be 1. For the script field you need to put in the hex scriptPubKey of that VOUT with the same value under the VOUT section in Raw Transaction. In our example that would be 76a9142a8248f72e7ca9250f837b6cec46aedd6cf1edb288ac . Now the easy part under outputs you need to put in the address you want to send coins to and a change address. The change address is used for any extra coins currently associated with the account that you don't want to go to fees in most cases this would be your public key. In our example I have 1 DOGEC in my public address I wish to send 0.99 DOGEC to my friend at the address of DQJ24v6oFsobif8MQ6JFuFk6vefGAUQ6f2 . Then I set the change address( which is just my public address) D91rzgEmTyUcPEMPBLLPHVoKjSzwUreeoy with the amount 0.009 (Any money in this transaction not allocated will be used as fees and lost!) which means that the fee for this transaction is 0.001 . Under WIF key you put you private key in WIF (Wallet Import Format)  which if you used the keypair generator it already is. You can see the end result of my transaction here https://explorer.dogec.io/tx/c445a56c5236a6665f88d3fda012e84778588b9a923f3e13d77927313070b14e

#### BETA **_PROCEED WITH CAUTION, DO STORE LARGE AMOUNTS OF FUNDS_**
