// Sign-Up Page
function queryObjectToString(query) {
    let properties = Object.keys(query);
    let arrOfQuesryStrings = properties.map(prop => prop+"="+query[prop]);
    return(arrOfQuesryStrings.join('&'));
 }

let db = [{fname:"Dom",lname:"Carrillo",uname:"mongabcarrillo",pword:"password"}];
console.log(db);
const sendAJAX = function(){
	let xmlhttp = new XMLHttpRequest();
	xmlhttp.onerror = function(){ alert("Error") };

	xmlhttp.onload = function() {
		if (this.status == 200){
			alert("it's working");
			resultObject = JSON.parse(this.responseText);

			if(resultObject.fname && resultObject.lname && resultObject.uname && resultObject.pword)
			{	console.log(vpass.value);
				if(vpass.value)
				{
					if(vpass.value != resultObject.pword)
					{
						 document.getElementById("result").innerHTML = "Passwords do not match!";
					}
					else{
						let found = false;
						for(const i in db){
							if(resultObject.uname==db[i].uname){
								found = true;
								console.log("username already exists");
								}
							}
						if(found==true)
						{
							console.log("account exists");
							document.getElementById("result").innerHTML = "Username Already Taken! Choose another one.";
						}
						else
						{
							console.log("new account created");
							db.push(resultObject);
							console.log(db);
							document.getElementById("result").innerHTML = "Account Created!";
						}
					    }
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
			alert("Error Code:"+this.status);
			}
		}
	xmlhttp.open("GET","http://35.231.124.196/signup?"+queryObjectToString({fname:fname.value,lname:lname.value,uname:uname.value,pword:pword.value}));
	xmlhttp.send();
}
document.getElementById("button").addEventListener("click",sendAJAX);
document.getElementById("result").innerHTML = "";
