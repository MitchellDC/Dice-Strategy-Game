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
				window.open("http://35.231.124.196/home","_self");
			}
			else{
				document.getElementById("loginstatus").innerHTML="Incorrect Password!";
			}
		}
	}
}

document.getElementById("loginstatus").innerHTML="Type your username and password!";
document.getElementById("cbutton").addEventListener("click",function() {
                                window.open("http://35.231.124.196/signup.html","_self");
                                        });
document.getElementById("sbutton").addEventListener("click",checkQuery);

