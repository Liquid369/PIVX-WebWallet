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