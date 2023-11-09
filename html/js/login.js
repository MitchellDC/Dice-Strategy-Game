let db = [{email:"carrillod5@southernct.edu",uname:"mongabcarrillo",pword:"password"}];

const checkQuery = function(){
	if(!uname.value||!pword.value)
	{
		document.getElementById("loginstatus").innerHTML="Fill in everything!";
		alert("Fill in all the blanks!");
	}
	else
	{
		const index = db.findIndex(i =>{
			return i.uname === uname.value});
		if(index<0){
			document.getElementById("loginstatus").innerHTML="Type Valid Username!";
		}
		else{
			if(pword.value==db[index].pword){
				document.getElementById("loginstatus").innerHTML="Successful Login!";
			}
			else{
				document.getElementById("loginstatus").innerHTML="Incorrect Password!";
			}
		}
	}
}

document.getElementById("loginstatus").innerHTML="Type your username and password!";
document.getElementById("sbutton").addEventListener("click",checkQuery);

