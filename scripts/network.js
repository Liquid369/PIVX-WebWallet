if(networkEnabled){
  var checkPubKey = function(){
    // Create a request variable and assign a new XMLHttpRequest object to it.
    var request = new XMLHttpRequest()
    var url = 'https://' + explorer
    // Open a new connection, using the GET request on the URL endpoint
    request.open('GET', url + '/api/v1/' + publicKeyForNetwork, true)
    request.onload = function() {
      var data = JSON.parse(this.response)
      document.getElementById("NetworkingJson").innerHTML = this.response;
      console.log(data)
    }
    // Send request
    request.send()

  }
}
