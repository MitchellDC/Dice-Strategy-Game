// Sign-Up Page
function queryObjectToString(query) {
    let properties = Object.keys(query);
    let arrOfQuesryStrings = properties.map(prop => prop+"="+query[prop]);
    return(arrOfQuesryStrings.join('&'));
 }

const db = [{uname:"mongabcarrillo",pword:"password"}];
console.log(db);
const sendAJAX = function(){
	let xmlhttp = new XMLHttpRequest();
	//console.log(uname.value);
	//console.log(pword.value);
	//console.log(queryObjectToString({uname:uname.value,pword:pword.value}));
	xmlhttp.onerror = function(){ alert("Error") };

	xmlhttp.onload = function() {
		if (this.status == 200){
			alert("it's working");
			//console.log(this.responseText);
			resultObject = JSON.parse(this.responseText);
			//console.log(resultObject.uname);

			if(resultObject.uname && resultObject.pword)
			{
				console.log("with username and password");
				let found = false;
				for(const i in db){
					if(resultObject.uname==db[i].uname){
						found = true;
						console.log("username alredy exists");
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
		else
		{
			document.getElementById("result").innerHTML = "Incorrect Username/Password. Try again";
			//alert("Error Code:"+this.status);
			}
	}
	xmlhttp.open("GET","http://35.231.124.196/signup?"+queryObjectToString({uname:uname.value,pword:pword.value}));
	xmlhttp.send();
}
document.getElementById("button").addEventListener("click",sendAJAX);
document.getElementById("result").innerHTML = "Type username and password to create account!";
