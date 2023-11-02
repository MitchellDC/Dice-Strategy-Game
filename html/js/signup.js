// Sign-Up Page
function queryObjectToString(query) {
    let properties = Object.keys(query);
    let arrOfQuesryStrings = properties.map(prop => prop+"="+query[prop]);
    return(arrOfQuesryStrings.join('&'));
 }

const sendAJAX = function(){
	alert(uname.value);

	let xmlhttp = new XMLHttpRequest();
	xmlhttp.onerror = function(){ alert("Error") };

	xmlhttp.onload = function() {
		if (this.status == 200){
			alert("it's working");
			console.log(this.responseText);
			/*
			let resultsPObject = JSON.parse(this.responseText);

			document.getElementById("resultsP").innerHTML="";
			for(const i in resultsPObject){

				document.getElementById("resultsP").innerHTML+=resultsPObject[i].name +": "+resultsPObject[i].phone+"<br>";
			}*/
			
			
		}
		else
		{
			document.getElementById("result").innerHTML = "Incorrect Username/Password. Try again"
			//alert("Error Code:"+this.status);
		}
	}

}
document.getElementById("button").addEventListener("click",sendAJAX);
