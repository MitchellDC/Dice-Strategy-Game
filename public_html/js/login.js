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
							document.getElementById("pword").value = "";
                                        	}
						else
						{
							//Successful Login
							alert("Successful Login!");
							localStorage.setItem('username', uname.value); //made username in localstorage for access 
												       //of the variable in the homepage
							if(resObj.is_admin==1)
							{
								alert("user is an admin");
								window.open("http://35.231.124.196/admin.html","_self");
							}
							else{
								window.open("http://35.231.124.196/home.html","_self");
							}


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
		xmlhttp.open("GET","http://35.231.124.196/login?"+queryObjectToString({uname:uname.value.toLowerCase(),pword:pword.value}));
		xmlhttp.send();

	}
}
document.getElementById("loginstatus").innerHTML="Type your username and password!";
document.getElementById("cbutton").addEventListener("click",function() { //MOVING TO SIGN UP PAGE IF BUTTON IS CLICKED
                                window.open("http://35.231.124.196/signup.html","_self");
                                        });
document.getElementById("sbutton").addEventListener("click",checkQuery); //SIGN IN PAGE

