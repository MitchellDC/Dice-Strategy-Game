const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');
const mysql = require('mysql');
const querystring = require('querystring');

const conn = mysql.createConnection({
        host: '34.73.177.149',
        user: 'mitchelldc22',
        password: 'teaminfinitetime330',
        database: 'Project',
});

function updateGame1(qu,res){

	/*
	const path = url.parse(req.url).pathname;
	let body = '';

	req.on('data', data =>{body+=data});

	req.on('end', () => {
		const quObj = querystring.parse(body);
		console.log(quObj);
		//console.log(queryObj.player1Health);
	res.writeHead(200, {'Content-Type': 'text/plain'});
        conn.query("UPDATE Game SET Player1_Health="+quObj.player1Health+","+
                        " Player2_Health="+quObj.player2Health+","+
                        " Player1_attack="+quObj.player1Attack+","+
                        " Player1_defense="+quObj.player1Defense+","+
                        " totalturns="+quObj.totalturns+","+
                        " turn='"+quObj.turn+"' WHERE Game_ID="+quObj.gameId+";",function(err,result){
                        if(err){
                                console.log(err);
                        }
                        else{
                                console.log(quObj);
                                res.write("updated");
                                res.end();
                        }
                });
	});*/

	if(!qu){
		res.writeHead(404,{'Content-Type': 'text/plain'});
                res.write('Error 404: resource not found.');
                res.end();
	}
	else{
		res.writeHead(200, {'Content-Type': 'text/plain'});
		conn.query("UPDATE Game SET Player1_Health="+qu.player1Health+","+
			" Player2_Health="+qu.player2Health+","+
			" Player2_attack="+qu.player2Attack+", "+
			" Player2_defense="+qu.player2Defense+", "+
			" Player1_attack="+qu.player1Attack+","+
			" Player1_defense="+qu.player1Defense+","+
			" totalturns="+qu.totalturns+","+
			" turn='"+qu.turn+"' WHERE Game_ID="+qu.gameId+";",function(err,result){
			if(err){
				console.log("error");
			}
			else{
				console.log(qu);
				res.write("updated");
				res.end();
			}
		});
	}
}

function updateGame2(qu,res){
	console.log(qu)
        if(!qu){
                res.writeHead(404,{'Content-Type': 'text/plain'});
                res.write('Error 404: resource not found.');
                res.end();
        }
        else{
                res.writeHead(200, {'Content-Type': 'text/plain'});
                conn.query("UPDATE Game SET Player1_Health="+qu.player1Health+","+
                        " Player2_Health="+qu.player2Health+","+
			" Player1_attack="+qu.player1Attack+", "+
			" Player1_defense="+qu.player1Defense+", "+
                        " Player2_attack="+qu.player2Attack+","+
                        " Player2_defense="+qu.player2Defense+","+
			" totalturns="+qu.totalturns+","+
                        " turn='"+qu.turn+"' WHERE Game_ID="+qu.gameId+";",function(err,result){
                        if(err){
                                console.log("error");
                        }
                        else{
				console.log(qu);
                                res.write("updated");
                                res.end();
                        }
                });
        }
}

function game(qu,res){
	if(!qu){
		res.writeHead(404,{'Content-Type': 'text/plain'});
		res.write('Error 404: resource not found.')
		res.end();
	}
	else{
		res.writeHead(200,{'Content-Type':'application/json'});
                conn.query("SELECT * FROM Game WHERE Game_ID='"+qu.gameId+"'", function(err,result){
                if(err){
                        console.log("err");

                }
                else{
                        res.write(JSON.stringify(result));
                        res.end();
                }


                })
	}
}

function games(qu,res){
	if(!qu){
                res.writeHead(404,{'Content-Type': 'text/plain'});
                res.write('Error 404: resource not found.');
                res.end();
	}
	else{
		res.writeHead(200,{'Content-Type':'application/json'});
		conn.query("SELECT * FROM Game WHERE Player1_uname='"+qu.uname.toLowerCase()+"' OR Player2_uname='"+qu.uname.toLowerCase()+"'", function(err,result){
		if(err){
			console.log("err");

		}
		else{
			res.write(JSON.stringify(result));
			res.end();
		}


		})
	}

}


function admin(req,res)
{
        console.log("yes");
        //let fileName = "html/home_page/html/home.html";
        let fileName = "home_page/html/admin.html"
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
function home(qu,res)
{
        console.log(qu.uname);
	let fileName = "public_html/home.html"
        fs.readFile(fileName, function(err,data){

        if(err){
                res.writeHead(404,{'Content-Type': 'text/plain'});
                res.write('Error 404: resource not found.');
                res.end();
                }
        else{  //home page is only displayed if the uname in the query is in the player
		console.log(qu.uname.toLowerCase());
		conn.query("SELECT * FROM Player WHERE Username='"+qu.uname.toLowerCase()+"';",function(err,result)
                {
                        if(err)
                        {
                                console.log(err);
                        }
                        else{
                                if(result.length!=0)
                                {
					responses(path.extname(fileName),res);
                			write(data,res);
                                }
                                else{ // shows an error if username is not in the database
					res.writeHead(404,{'Content-Type': 'text/plain'});
                			res.write('Error 404: resource not found.');
                                }
                                res.end();
                        }

                });
	}

        });
}

function logIn(qu,res){
        //signIn code goes here
	if(!qu.uname || !qu.pword){
		res.writeHead(404,{'Content-Type': 'text/plain'});
		res.write('Error 404: resource not found.');
		res.end();
		console.log("not working");
	}
	else
	{
		res.writeHead(200,{'Content-Type':'application/json'});

		conn.query("SELECT Password, Is_Admin FROM Player WHERE Username='"+qu.uname.toLowerCase()+"';",function(err,result)
                {
			if(err)
			{
				console.log(err);
                       	}
                        else{
				//console.log(result[0].Is_Admin);
				if(result.length!=0)
				{
					console.log("username found");
					//console.log(result[0].Is_Admin[0]);
					res.write(JSON.stringify({uname:qu.uname,pword:result[0].Password,is_admin:result[0].Is_Admin}));
			        }
				else{
					console.log("username not found");
					res.write(JSON.stringify({uname:"none",pword:qu.pword}));
				}
				res.end();
			}

		});
	}
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

		conn.query("SELECT * FROM Player WHERE Email='"+qu.email.toLowerCase()+"';",function(err,result)
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
                   						     	"VALUES ('"+qu.uname.toLowerCase()+"', '"+qu.email.toLowerCase()+"', '"+qu.pword+"', NULL, NULL, NULL);", function(err, result)
                							{
                						        	if(err)
                        							{
                                							console.log(err);
                        							}
                       								else{
                                							console.log("account created");
											res.write(JSON.stringify({email:qu.email,uname:qu.uname,pword:qu.pword}));
                                        						res.end();
                          							}
               	 							});

							}
                        			 }
                 			});

				}
			}
		}
				);
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
        let fileName = "public_html"+url.parse(req.url).pathname;
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
        else if(parsedURL.pathname=="/login"){
                return logIn(parsedURL.query,res);
                }
	else if(parsedURL.pathname=="/games"){
                return games(parsedURL.query,res);
        }
	else if(parsedURL.pathname=="/game"){
		return game(parsedURL.query,res);
	}
	else if(parsedURL.pathname=="/updategame1"){
		return updateGame1(parsedURL.query,res);
	}
	else if(parsedURL.pathname=="/updategame2"){
                return updateGame2(parsedURL.query,res);
        }
	else
        {
                return sendFile(req,res);
        }
}

const myserver = http.createServer(main);
myserver.listen(80, function() {console.log("Listening on port 80")});
