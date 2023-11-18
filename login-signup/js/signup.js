// Sign-Up Page
const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');
const express = require('express'); 
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3000;

const conn = mysql.createConnection({
    host: '34.73.177.149',
    user: 'mitchelldc22',
    password: 'teaminfinitetime330',
    database: 'Project',
});


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
			// console.log("new account created");
			// db.push(obj);
			// console.log(db);
			// document.getElementById("result").innerHTML = "Account Created!";
			conn.connect(function(err) {
				if (err) {
					console.log("Error connecting to the database: " + err.message);
				} else {
					console.log("Connected to the database");
			
					app.use(bodyParser.json());
			
					app.post("/submit", (req, res) => {
						const { username, email, password } = req.body;
			
						const sql = "INSERT INTO Player (Player_ID, Username, Email, Password, Games_Played, Games_Won, Ongoing_Games, Is_Admin) VALUES ("+uname.value+","+email.value+","+pword.value+", NULL, NULL, NULL, NULL)";
			
						conn.query(sql, [username, email, password], (err, result) => {
							if (err) {
								console.log("Error executing query: " + err.message);
								res.status(500).json({ error: "Internal Server Error" });
							} else {
								console.log("Data is inserted successfully");
								res.status(200).json({ success: "Data inserted successfully" });
							}
						});
					});
			
					app.listen(port, () => {
						console.log(`Server listening on port ${port}`);
					});
				}
			});
			// app.use(express.json()); 

			// app.get('/', (req, res) => {
			// 	res.sendFile(__dirname + '/signup.html');
			// });
			
			// app.post('/', (req, res) => {
			// 	const {uname, email, pword} = req.body; 
			// 	const {authorization} = req.headers; 
			// 	res.send({
			// 		uname, 
			// 		email, 
			// 		pword, 
			// 		authorization,
			// 	}); 
			// }); 
			
			// app.listen(3000, () => {
			// 	console.log("port 3000"); 
			// });
			
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
