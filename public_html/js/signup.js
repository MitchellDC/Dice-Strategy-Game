// Sign-Up Page
function queryObjectToString(query) {
    let properties = Object.keys(query);
    let arrOfQuesryStrings = properties.map(prop => prop+"="+query[prop]);
    return(arrOfQuesryStrings.join('&'));
 }

function validPassword(pass){
	if(pass.length<8)
	{
		alert("Password must contain at least 8 characters!")
		return false;
	}
	else
	{
		return true;
	}

}
function validUname(uname){
	let specialChars =/[`!@#$%^&*()\-+=\[\]{};':"\\|,<>\/?~ ]/;
	if(specialChars.test(uname) || uname.length<3)
	{
		alert("Invalid username!")
		return false;
	}
	else
	{
		return true;
	}

}
function validEmail(email){
	var mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	if(email.match(mailFormat)){
		return true;
	}
	else{
		alert("Invalid Email!");
		return false;
	}


}

function clearFields(){
	document.getElementById("email").value = "";
	document.getElementById("uname").value = "";
	document.getElementById("pword").value = "";
	document.getElementById("vpass").value = "";
}

function clearPasswords(){
	document.getElementById("pword").value = "";
        document.getElementById("vpass").value = "";
	}


function extra(obj){
	if(vpass.value != obj.pword){
		document.getElementById("result").innerHTML = "Passwords do not match!";
		clearPasswords();
        }
	else{
		console.log(obj.email)
		if(obj.email=="found")
		{
			document.getElementById("result").innerHTML = "Account with your email already exists!";
			clearFields();
		}
		else if(obj.uname=="found")
		{
			document.getElementById("result").innerHTML = "Account with your username already exists!";
			clearFields();
		}
		else{
			alert("Account Successfully Created!");
			window.open("http://35.231.124.196/login.html","_self");
		}
	}
}

const sendAJAX = function(){
	let checkEmail = validEmail(email.value);
	let checkUname = validUname(uname.value);
	let xmlhttp = new XMLHttpRequest();
	xmlhttp.onerror = function(){ alert("Error") };
	xmlhttp.onload = function() {
		if (this.status == 200){
			alert("it's working");
			let resultObject = JSON.parse(this.responseText);

			// ALL BLANKS WERE FILLED IN
			if(resultObject.email && resultObject.uname && resultObject.pword)
			{	
				if(checkEmail && checkUname){
					if(vpass.value ) //validPassword(pword.value))
					{
						if(validPassword(pword.value))
                                        	{
                                                	extra(resultObject);
                                        	}
                                       		else
                                        	{
                                                	document.getElementById("result").innerHTML = "Password must contain at least 8 characters!";
							clearPasswords();
                                        	}
					}
					else
					{
						document.getElementById("result").innerHTML = "Verify your Password!";
						clearPasswords();
					}
				}
				else{
					document.getElementById("result").innerHTML = "Type Valid Username and Email Address!";
                                        clearFields();
				}
			}
			// AT LEAST ONE BLANK WAS NOT FILLED IN
			else{
				document.getElementById("result").innerHTML = "Fill in everything!";
				clearFields();
			}
		}
		else{ //NOTHING WAS FILLED IN
			alert("Fill in the blanks to create account!");
			}
		}
	xmlhttp.open("GET","http://35.231.124.196/signup?"+queryObjectToString({email:email.value.toLowerCase(),uname:uname.value.toLowerCase(),pword:pword.value}));
	xmlhttp.send();
}
alert("keep going");
document.getElementById("button").addEventListener("click",sendAJAX); // CREATE ACCOUNT BUTTON
document.getElementById("lbutton").addEventListener("click",function() { //MOVING TO LOGIN PAGE WITHOUT NEEDING TO SIGN IN
				window.open("http://35.231.124.196/login.html","_self");
					});
document.getElementById("result").innerHTML = "Create your account!";


