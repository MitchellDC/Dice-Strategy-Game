let db = [{email:"carrillod5@southernct.edu",uname:"mongabcarrillo",pword:"password"}];

const checkQuery = function(){
	// AT LEAST ONE BLANK WAS NOT FILLED IN
	if(!uname.value||!pword.value)
	{
		document.getElementById("loginstatus").innerHTML="Fill in everything!";
		alert("Fill in all the blanks!");
	}
	// ALL BLANKS WERE FILLED IN
	else
	{
		// FINDING INDEX OF ARRAY OBJECT IF USERNAME IS IN THE ARRAY
		// COMMENT OUT WHEN DATABASE IS USED
		const index = db.findIndex(i =>{
			return i.uname === uname.value});
		// USERNAME IS NOT IN ARRAY OR DATABASE
		if(index<0){
		
			document.getElementById("loginstatus").innerHTML="Type Valid Username!";
		}
		// USERNAME IS IN ARRAY
		else{
			// TYPES IN PASSWORD  MATCHES THE USER'S PASSWORD IN THE DATABASE
			// SUCCESSFUL LOGIN
			if(pword.value==db[index].pword){
				document.getElementById("loginstatus").innerHTML="Successful Login!";
				window.open("http://35.231.124.196/home","_self");
			}
			// PASSWORD IS NOT TYPED IN
			else{
				document.getElementById("loginstatus").innerHTML="Incorrect Password!";
			}
		}
	}
}

document.getElementById("loginstatus").innerHTML="Type your username and password!";
document.getElementById("cbutton").addEventListener("click",function() { //MOVING TO SIGN UP PAGE IF BUTTON IS CLICKED
                                window.open("http://35.231.124.196/signup.html","_self");
                                        });
document.getElementById("sbutton").addEventListener("click",checkQuery); //SIGN IN PAGE

