let db = [{email:"carrillod5@southernct.edu",uname:"mongabcarrillo",pword:"password"}];

function queryObjectToString(query) {
    let properties = Object.keys(query);
    let arrOfQuesryStrings = properties.map(prop => prop+"="+query[prop]);
    return(arrOfQuesryStrings.join('&'));
 }

function clearFields(){
	document.getElementById("uname").value = "";
	document.getElementById("pword").value = "";
}

const checkQuery = function(){
	// AT LEAST ONE BLANK WAS NOT FILLED IN
	alert("function is working");
	if(!uname.value||!pword.value)
	{
		document.getElementById("loginstatus").innerHTML="Fill in everything!";
		alert("Fill in all the blanks!");
	}
	// ALL BLANKS WERE FILLED IN
	else
	{
		let xmlhttp = new XMLHttpRequest();
		xmlhttp.onerror = function(){ alert("Error") };

		xmlhttp.onload = function(){
			if (this.status = 200){
				alert("it's working");
				console.log(this.responseText)
				let resObj = JSON.parse(this.responseText);

				if(resObj.uname && resObj.pword)
				{
					if(resObj.uname=="none")
					{
						//Username not found
						alert("Username Not Found!");
                                                clearFields();
					}
					else
					{
						console.log(resObj.pword)
						if(resObj.pword!=pword.value)
                                        	{
                                                	alert("Incorrect Password!")
                                                	clearFields();
                                        	}
						else
						{
							//Successful Login
							alert("Successful!");
						}
					}
				}
				else
				{
					alert("Fill in everything!");
				}
			}
			else
			{
				alert("Fill in everything!");
			}
		}
		xmlhttp.open("GET","http://35.231.124.196/login?"+queryObjectToString({uname:uname.value,pword:pword.value}));
		xmlhttp.send();



		/*
		// FINDING INDEX OF ARRAY OBJECT IF USERNAME IS IN THE ARRAY
		// COMMENT OUT WHEN DATABASE IS USED
		//const index = db.findIndex(i =>{
		//	return i.uname === uname.value});
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
		}*/
	}
}
alert("keep on going");
document.getElementById("loginstatus").innerHTML="Type your username and password!";
document.getElementById("cbutton").addEventListener("click",function() { //MOVING TO SIGN UP PAGE IF BUTTON IS CLICKED
                                window.open("http://35.231.124.196/signup.html","_self");
                                        });
document.getElementById("sbutton").addEventListener("click",checkQuery); //SIGN IN PAGE

