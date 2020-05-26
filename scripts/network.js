if(networkEnabled){
  var checkPubKey = function(){
    // Create a request variable and assign a new XMLHttpRequest object to it.
    var request = new XMLHttpRequest()
    var url = 'https://' + explorer
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
}
