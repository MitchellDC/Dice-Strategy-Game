// Sign-Up Page
function queryObjectToString(query) {
    let properties = Object.keys(query);
    let arrOfQuesryStrings = properties.map(prop => prop+"="+query[prop]);
    return(arrOfQuesryStrings.join('&'));
 }

function hashFunction(pw){
	let total = 0;
	for(let i=0;i<pw.length;i++){
		total +=(i+1)*pw.charCodeAt(i);
	}
	return total*1984%1955673

}


function validPassword(pass){
	if(pass.length<8) //makes sure password has at least 8 characters
	{
		alert("Password must contain at least 8 characters!");
		document.getElementById("result").innerHTML = "Password must contain at least 8 characters!";

		return false;
	}
	else
	{
		if(vpass.value==pass) //checks if the password in the verify textbox is the same
		{
			return true;
		}
		else{
			alert("Passwords do not match!");
			document.getElementById("result").innerHTML = "Make sure the passwords match!";
                	clearPasswords();

			return false;
		}
	}

}
function validUname(uname){
	let specialChars =/[`!@#$%^&*()\-+=\[\]{};':"\\|,<>\/?~ ]/;
	if(specialChars.test(uname) || uname.length<3)
	{
		if(specialChars.test(uname)){
			alert("Username must not contain any special characters!");
		}
		else{
			alert("Username must contain at least 3 digits!")
		}
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
		document.getElementById("result").innerHTML = "Enter valid email!";
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



const sendAJAX = function(){
	let xmlhttp = new XMLHttpRequest();
	xmlhttp.onerror = function(){ alert("Error") };
	xmlhttp.onload = function() {
		if (this.status == 200){
			let resObj = JSON.parse(this.responseText);
			if(resObj.email=="found")
        		{
               			alert("Account with your email already exists!");
                		clearFields();
        		}
        		else if(resObj.uname=="found")
        		{
                		alert("Account with your username already exists!");
                		clearFields();
        		}
        		else{
                		alert("Account Successfully Created!");
                		window.open("http://104.196.1.169/login.html","_self");
        		}
		}
		else{ //NOTHING WAS FILLED IN
			alert("Fill in the blanks to create account!");
			}
		}
	let hashValue = hashFunction(pword.value)
	xmlhttp.open("GET","http://104.196.1.169/signup?"+queryObjectToString({email:email.value.toLowerCase(),uname:uname.value.toLowerCase(),pword:hashValue}));
	xmlhttp.send();
}

function checkInputs(){ //making sure every input is valid before sending data to the server
    let checkEmail = validEmail(email.value);
	if(checkEmail) //checks if email is valid
	{
		let checkUname = validUname(uname.value);
		if(checkUname){ //checks if username is valid
			if(vpass.value) //checks if second password is entered
                        {
				let checkPassword = validPassword(pword.value);
				if(checkPassword){ //calls the AJAX function if password is valid
	                                sendAJAX();
                        	}
                        	else{
                                	clearPasswords();
                        	}

                        }
                        else
                        {
                        	alert("Verify your password!");
                                document.getElementById("result").innerHTML = "Verify your password!";
                                clearPasswords();
                        }
		}
		else{
			document.getElementById("result").innerHTML = "Enter valid username!";
                        clearFields();
		}
	}
	else
	{
                clearFields();
	}
}

const allFilled = function(){ //function that checks if every textbox was filled in
	if(email.value && uname.value && pword.value){
		checkInputs(); //calls the checkInputs function if everything was filled in
	}
	else{
		alert("Fill in all the textboxes!");
		document.getElementById("result").innerHTML = "Fill in everything!";
                clearFields();
	}
}


document.getElementById("button").addEventListener("click",allFilled); // CREATE ACCOUNT BUTTON
document.getElementById("lbutton").addEventListener("click",function() { //MOVING TO LOGIN PAGE WITHOUT NEEDING TO SIGN IN
				window.open("http://104.196.1.169/login.html","_self");
					});
document.getElementById("result").innerHTML = "Create your account!";
