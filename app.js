const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');
<<<<<<< HEAD
const express = require('express'); 
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3000;
=======
const mysql = require('mysql');

const conn = mysql.createConnection({
        host: '34.73.177.149',
        user: 'mitchelldc22',
        password: 'teaminfinitetime330',
        database: 'Project',
});
/*
conn.connect(function(err) {
        if (err) {
                console.log("Error");
        }

        else {
                console.log("Connected to the database");
                conn.query("INSERT INTO Player(Username, Email, Password, Games_Played, Games_Won, Ongoing_Games) VALUES ('Username', 'Email', 'Password', NULL, NULL, NULL);", function(err, result) {
                if(err) {
                        console.log("problem" + err.message);
                }
                else {
                        console.log("data is in");
                }
             });
        }
});
*/
function addPlayer(query){
	conn.connect(function(err){
	if(err){
		console.log("Errorr");
	}
	else{
		conn.query("INSERT INTO Player(Username, Email, Password, Games_Played, Games_Won, Ongoing_Games)"+
			"VALUES ('Username', 'Email', 'Password', NULL, NULL, NULL);", function(err, result) {
                if(err) {
                        console.log("problem" + err.message);
                }
                else {
                        console.log("new account created");
                }
                conn.end();
             });

	}


	})

}

function home(req,res)
{
        console.log("yes");
        let fileName = "html/home_page/html/home.html";
        fs.readFile(fileName, function(err,data){
>>>>>>> bb03f9e8ae29874652413e0b51de0add185b82e4



app.use(express.json()); 

<<<<<<< HEAD
app.get('/', (req, res) => {
	res.sendFile(__dirname + '/signup.html');
});
=======



function signIn(query,res){
        //signIn code goes here
>>>>>>> bb03f9e8ae29874652413e0b51de0add185b82e4

app.post('/', (req, res) => {
	const {uname, email, pword} = req.body; 
	const {authorization} = req.headers; 
	res.send({
		uname, 
		email, 
		pword, 
		authorization,
	}); 
}); 

<<<<<<< HEAD
app.listen(3000, () => {
	console.log("port 3000"); 
});
=======
function insertD(qu,res){

}

function signUp(qu, res){
        if(!qu.email|| !qu.uname || !qu.pword){
                res.writeHead(404,{'Content-Type': 'text/plain'});
                res.write('Error 404: resource not found.');
                }
        else {
		//make if else statements here to check if the email and  username are already in the database

		//if email  already exists goes here
		let efound = false;
		let ufound = false;

		res.writeHead(200,{'Content-Type':'application/json'});

		conn.query("SELECT * FROM Player WHERE Email='"+qu.email+"';",function(err,result)
		{
			if(err)
			{
				console.log(err);
			}
			else{
				console.log("email working");
				console.log(result.length);
				if(result.length!=0) {
					efound=true;
					console.log(efound);
					res.write(JSON.stringify({email:"found",uname:qu.uname,pword:qu.pword}));
					res.end();
				}
				else{
					 conn.query("SELECT * FROM Player WHERE Username='"+qu.uname+"';",function(err,result)
                			{
                        			if(err)
                        			{
                       			         console.log(err);
                       				 }
                        			else{
                                			console.log("username working");
                               				console.log(result);
                                			if(result.length!=0) {
                                        			ufound=true;
                                        			res.write(JSON.stringify({email:qu.email,uname:"found",pword:qu.pword}));
                                        			res.end();
			                                }
							else{
								conn.query("INSERT INTO Player(Username, Email, Password, Games_Played, Games_Won, Ongoing_Games)"+
                   						     "VALUES ('"+qu.uname+"', '"+qu.email+"', '"+qu.pword+"', NULL, NULL, NULL);", function(err, result)
                						{
                						        if(err)
                        						{
                                						console.log(err);
                        						}
                       							else{
                                						console.log("account created");
										res.write(JSON.stringify({email:qu.email,uname:qu.uname,pword:qu.pword}));
                                        					res.end();
										conn.end();
                          						}
               	 						});

							}
                        			 }
                 			});

				}
			}
		}
				);
		/*
		conn.query("SELECT * FROM Player WHERE Username='"+qu.uname+"';",function(err,result)
               	{
			if(err)
                       	{
				console.log(err);
                        }
                        else{
                 		console.log("username working");
                                console.log(result);
                                if(result.length!=0) {
                              		ufound=true;
					res.write(JSON.stringify({email:qu.email,uname:"found",pword:qu.pword}));
					res.end();
					conn.end();
                                }
                         }
                 });
		conn.query("INSERT INTO Player(Username, Email, Password, Games_Played, Games_Won, Ongoing_Games)"+
			"VALUES ('"+qu.uname+"', '"+qu.email+"', '"+qu.pword+"', NULL, NULL, NULL);", function(err, result)
                {
			if(err)
			{
				console.log(err);
			}
			else{
				console.log("account created");
	        	  }
	      	});*/


			//conn.end();
		//ufound = conn.query("SELECT Username FROM Player WHERE EXISTS (SELECT Username FROM Player WHERE qu.uname = Player.Username)");
		//if(efound)


		//else if(){} if username already exists goes here
		//else if(ufound)
                /*
		if(efound){
			res.write(JSON.stringify({email:"found",uname:qu.uname,pword:qu.pword}));
		}
		else if(ufound){
			res.write(JSON.stringify({email:qu.email,uname:"found",pword:qu.pword}));
		}
		else{
			res.write(JSON.stringify({email:qu.email,uname:qu.uname,pword:qu.pword}));
        		}
	        }*/
		}
        }
function responses(ext,res){
         switch(ext){
                case '.jpg':
                        res.writeHead(200, {'Content-Type': 'image/jpg'});
                        break;
                case '.gif':
                        res.writeHead(200, {'Content-Type': 'image/gif'});
                        break;
                case '.png':
                        res.writeHead(200, {'Content-Type': 'image/png'});
                        break;
                case '.js':
                        res.writeHead(200, {'Content-Type': 'text/javascript'});
                        break;
                case '.html':
                        res.writeHead(200, {'Content-Type': 'text/html'});
                        break;
                case '.css':
                        res.writeHead(200, {'Content-Type': 'text/css'});
                        break;
                default:
                        res.writeHead(200, {'Content-Type': 'text/plain'});
                        break;

        }
}

function write(data,res){
        res.write(data);
        res.end();
}

const sendFile = function(req,res){
        let fileName = "login-signup"+url.parse(req.url).pathname;
        fs.readFile(fileName, function(err,data){

        if(err){
                res.writeHead(404,{'Content-Type': 'text/plain'});
                res.write('Error 404: resource not found.');
                res.end();
                }
        else {
                responses(path.extname(fileName),res);
                write(data,res);
                }

        });
}

const main = function(req, res){

        let parsedURL = url.parse(req.url,true);
        if (parsedURL.pathname=="/signup"){
                return signUp(parsedURL.query,res);
                }
        else if(parsedURL.pathname=="/signin"){
                return signIn(parsedURL.query,res);
                }
        else if(parsedURL.pathname=="/home"){
                return home(req,res);
                }
	 else
        {
                return sendFile(req,res);
        }
}

const myserver = http.createServer(main);
myserver.listen(80, function() {console.log("Listening on port 80")});
>>>>>>> bb03f9e8ae29874652413e0b51de0add185b82e4
