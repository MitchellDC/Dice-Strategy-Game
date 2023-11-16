// Sign-Up Page
function queryObjectToString(query) {
    let properties = Object.keys(query);
    let arrOfQuesryStrings = properties.map(prop => prop+"="+query[prop]);
    return(arrOfQuesryStrings.join('&'));
 }

function extra(obj){
	if(vpass.value != obj.pword){
		document.getElementById("result").innerHTML = "Passwords do not match!";
        }
	else{
		// LOOPING THROUGH THE OBJECT TO SEE IF THE TYPED IN EMAIL AND USERNAME ARE ALREADY IN THE DATABASE 
		let founduname = false;
		let foundemail = false;
		for(const i in db){
			// USERNAME IS ALREADY IN THE DATABASE
			if(obj.uname==db[i].uname){
				founduname = true;
				console.log("username already exists");
			}
			//EMAIL IS ALREADY IN THE DATABASE
			if(obj.email==db[i].email){
				foundemail = true;
				console.log("email already exists");
                         }
		}
		if(founduname || foundemail){
			// ACCOUNT ALREADY EXITS
			console.log("account exists");
			if(foundemail){
				// TYPED IN EMAIL IS ALREADY IN THE DATABASE
				document.getElementById("result").innerHTML = "Account with your email already exists!";
				}
			else{
				// TYPED IN  USERNAME IS ALREADY IN THE DATABASE
				document.getElementById("result").innerHTML = "Username already taken! Choose another one.";
				}
			}
		else{
			// SUCCESSFULLY CREATED
			console.log("new account created");
			db.push(obj);
			console.log(db);
			document.getElementById("result").innerHTML = "Account Created!";

			}
	}
}

// MADE THIS OBJECT BEFORE THE DATABASE
let db = [{email:"carrillod5@southernct.edu",uname:"mongabcarrillo",pword:"password"}];
console.log(db);


const sendAJAX = function(){
	let xmlhttp = new XMLHttpRequest();
	xmlhttp.onerror = function(){ alert("Error") };
	xmlhttp.onload = function() {
		if (this.status == 200){
			alert("it's working");
			resultObject = JSON.parse(this.responseText);
				
			// ALL BLANKS WERE FILLED IN
			if(resultObject.email && resultObject.uname && resultObject.pword)
			{	console.log(vpass.value);
				if(vpass.value)
				{
					extra(resultObject);
				}
				else{
					 document.getElementById("result").innerHTML = "Verify your password!";
				}
			}
			// AT LEAST ONE BLANK WAS NOT FILLED IN
			else{
				document.getElementById("result").innerHTML = "Fill in everything!";
			}
		}
		else{ //NOTHING WAS FILLED IN
			alert("Fill in the blanks to create account!");
			}
		}
	xmlhttp.open("GET","http://35.231.124.196/signup?"+queryObjectToString({email:email.value,uname:uname.value,pword:pword.value}));
	xmlhttp.send();
}
document.getElementById("button").addEventListener("click",sendAJAX); // CREATE ACCOUNT BUTTON
document.getElementById("lbutton").addEventListener("click",function() { //MOVING TO LOGIN PAGE WITHOUT NEEDING TO SIGN IN
				window.open("http://35.231.124.196/login.html","_self");
					});
document.getElementById("result").innerHTML = "Create your account!";
