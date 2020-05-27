if(networkEnabled){
  var url = 'https://' + explorer
  var githubRepo = 'https://api.github.com/repos/Luke-Larsen/DogeCashWebWallet/releases';
  var checkPubKey = function(){
    // Create a request variable and assign a new XMLHttpRequest object to it.
    var request = new XMLHttpRequest()
    // Open a new connection, using the GET request on the URL endpoint
    request.open('GET', url + '/api/v1/address/' + publicKeyForNetwork, true)
    request.onload = function() {
      var data = JSON.parse(this.response)
      document.getElementById("balance").innerHTML = data['balance'];
      document.getElementById("totalReceived").innerHTML = data['totalReceived'];
      document.getElementById("totalSent").innerHTML = data['totalSent'];
      var typeNumber = 4;
      var errorCorrectionLevel = 'L';
      var qr = qrcode(typeNumber, errorCorrectionLevel);
      qr.addData('dogecash:'+ data['addrStr']);
      qr.make();
      document.getElementById("addrStrQR").innerHTML = qr.createImgTag();
      document.getElementById("addrStr").innerHTML = data['addrStr'];
      //Transactions
      document.getElementById("TransactionNumber").innerHTML = data['txApperances'];
      if(data['txApperances'] > 0){
        var dataTransactions = JSON.stringify(data['transactions']).replace("[","").replace("]","").replace(/"/g,"");
        const splits = dataTransactions.split(',')
        var transactionLinks;
        for (i = 0; i < splits.length; i++) {
          if(i == 0){
            transactionLinks = '<a href="' + url + '/api/v1/tx/' + splits[i] + '">'+ splits[i] + '</a><br>';
          }else{
            transactionLinks += '<a href="' + url + '/api/v1/tx/' + splits[i] + '">'+ splits[i] + '</a><br>';
          }
        }
        document.getElementById("Transactions").innerHTML = transactionLinks;
      }
      document.getElementById("NetworkingJson").innerHTML = this.response;
      console.log(data)
      console.log()
    }
    // Send request
    request.send()

  }
  var getUnspentTransactions = function(trxp){
    var request = new XMLHttpRequest()
    // Open a new connection, using the GET request on the URL endpoint
    request.open('GET', url + '/api/v2/utxo/' + publicKeyForNetwork +'?confirmed=true', true)
    request.onload = function() {
      data = JSON.parse(this.response)
      if(JSON.stringify(data) === '[]'){
        console.log('No unspent Transactions');
      }else{
        var amountOfTransactions = JSON.stringify(data['length'])
        var dataTransactions = JSON.stringify(data['0']['txid']);
        for(i = 0; i < amountOfTransactions; i++) {
          //Runs for each unspent transaction
          if(i == 0){
            balance = parseFloat(Number(data[i]['value'])/100000000);
          }else{
            balance = parseFloat(balance) + parseFloat(Number(data[i]['value'])/100000000);
          }
          var txid = JSON.stringify(data[i]['txid']).replace(/"/g,"");
          var index = JSON.stringify(data[i]['vout']);
          //var script = JSON.stringify(data[i]['txid']);
          //Hash(script) for some reason isn't shown in this so we have to
          //call to the server to get it
          //trxp.addinput(txid,index,script)
          if(debug){
            console.log(txid)
            console.log(index)
          }
        }
        console.log('Total Balance:' + balance);
      }
    }
    // Send request
    request.send()
  }
  var versionCheck = function(){
    var request = new XMLHttpRequest()
    // Open a new connection, using the GET request on the URL endpoint
    request.open('GET', githubRepo, true)
    request.onload = function() {
      data = JSON.parse(this.response)
      console.log(data[0]['tag_name'])
      var currentReleaseVersion = (data[0]['tag_name']).replace("v","")
      if(parseFloat(currentReleaseVersion) > parseFloat(dogecashversion)){
        console.log("out of date");
        document.getElementById("outdated").style.display='block';
      }else{
        if(debug){
          console.log(parseFloat(currentReleaseVersion))
          console.log(parseFloat(dogecashversion))
        }
      }
    }
    // Send request
    request.send()
  }


  //Call a version check if network is enabled:
  versionCheck();
}
