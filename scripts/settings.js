//Settings Defaults
var debug = true;
var explorer = 'explorer.dogec.io';
var networkEnabled = true;
//Users need not look below here.
//------------------------------
var publicKeyForNetwork;
var trx;
var amountOfTransactions;
var balance;
var fee;
var privateKeyForTransactions;
var walletAlreadyMade = 0;
var dogecashversion = '1.00';
function setExplorer(){
  explorer = document.getElementById("explorer").value
  alert(`${explorer} has been set succesfully`);
}
function toggleDebug(){
  if(debug){
    debug = false;
    document.getElementById('Debug').innerHTML = "";
  }else{
    debug = true;
    document.getElementById('Debug').innerHTML = "<b> DEBUG MODE </b>";
  }
  alert(`Debug set to ${debug}`);
}
function toggleNetwork(){
  if(networkEnabled){
    networkEnabled = false;
    document.getElementById('Network').innerHTML = "";
  }else{
    networkEnabled = true;
    document.getElementById('Network').innerHTML = "<b> Network Enabled </b>";
  }
  alert(`Network set to ${networkEnabled}`);
}
