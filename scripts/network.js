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
  var getScriptData = function(txid,index){
    var request = new XMLHttpRequest()
    if(amountOfTransactions <= 1000){
      request.open('GET', url + '/api/v2/tx/' + txid, true)//Simple queing fix
    }else{
      request.open('GET', url + '/api/v2/tx/' + txid, false)
    }
    request.onload = function(e) {
      if(request.readyState === 4){
        if(request.status === 200){
          datar = JSON.parse(this.response)
          var script = datar['vout'][index]['hex']
          trx.addinput(txid,index,script)
          console.log(trx);
        }
      }
    }
    request.send()
  }
  var getUnspentTransactions = function(){
    var request = new XMLHttpRequest()
    request.open('GET', url + '/api/v2/utxo/' + publicKeyForNetwork +'?confirmed=true', true)
    request.onload = function() {
      data = JSON.parse(this.response)
      if(JSON.stringify(data) === '[]'){
        console.log('No unspent Transactions');
      }else{
        amountOfTransactions = JSON.stringify(data['length'])
        var dataTransactions = JSON.stringify(data['0']['txid']);
        // for(i = 0; i < amountOfTransactions; i++) {
        //   if(i == 0){
        //     balance = parseFloat(Number(data[i]['value'])/100000000);
        //   }else{
        //     balance = parseFloat(balance) + parseFloat(Number(data[i]['value'])/100000000);
        //   }
        //   var txid = JSON.stringify(data[i]['txid']).replace(/"/g,"");
        //   var index = JSON.stringify(data[i]['vout']);
        //   //Need to create some sort of queing because calling to many ajax
        //   //aka 5000 will result in it not working.
        //   getScriptData(txid,index)
        //   }
          //Testing Purposes
          var testingTransactions = 5000;
          for(i=0;i<testingTransactions; i++){
            var randomtx = Math.floor(Math.random() * 11);
            var randomindex = Math.floor(Math.random() * 2); 
            var txid = JSON.stringify(data[randomtx]['txid']).replace(/"/g,"");
            var index = JSON.stringify(data[randomindex]['vout']);
            getScriptData(txid,index)
          }

        }
        console.log('Total Balance:' + balance);
      }
    request.send()
  }
  var versionCheck = function(){
    var request = new XMLHttpRequest()
    request.open('GET', githubRepo, true)
    request.onload = function() {
      data = JSON.parse(this.response)
      var currentReleaseVersion = (data[0]['tag_name']).replace("v","")
      if(parseFloat(currentReleaseVersion) > parseFloat(dogecashversion)){
        console.log("out of date");
        document.getElementById("outdated").style.display='block';
      }
    }
    request.send()
  }
  //Call a version check if network is enabled:
  versionCheck();
  document.getElementById('Network').innerHTML = "<b> Network Enabled </b>";
}
