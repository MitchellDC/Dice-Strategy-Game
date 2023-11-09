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
		let founduname = false;
		let foundemail = false;
		for(const i in db){
			if(obj.uname==db[i].uname){
				founduname = true;
				console.log("username already exists");
			}
			if(obj.email==db[i].email){
				foundemail = true;
				console.log("email already exists");
                         }
		}
		if(founduname || foundemail){
			console.log("account exists");
			if(foundemail){
				document.getElementById("result").innerHTML = "Account with your email already exists!";
				}
			else{
				document.getElementById("result").innerHTML = "Username already taken! Choose another one.";
				}
			}
		else{
			console.log("new account created");
			db.push(obj);
			console.log(db);
			document.getElementById("result").innerHTML = "Account Created!";
			}
	}
}


let db = [{email:"carrillod5@southernct.edu",uname:"mongabcarrillo",pword:"password"}];
console.log(db);
const sendAJAX = function(){
	let xmlhttp = new XMLHttpRequest();
	xmlhttp.onerror = function(){ alert("Error") };
	xmlhttp.onload = function() {
		if (this.status == 200){
			alert("it's working");
			resultObject = JSON.parse(this.responseText);

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
			else{
				document.getElementById("result").innerHTML = "Fill in everything!";
			}
		}
		else{
			alert("Fill in the blanks to create account!");
			}
		}
	xmlhttp.open("GET","http://35.231.124.196/signup?"+queryObjectToString({email:email.value,uname:uname.value,pword:pword.value}));
	xmlhttp.send();
}
document.getElementById("button").addEventListener("click",sendAJAX);
document.getElementById("result").innerHTML = "Create your account!";
