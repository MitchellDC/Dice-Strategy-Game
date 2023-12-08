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



function createGame(qu,res){
	if(!qu)
	{
		res.writeHead(404,{'Content-Type': 'text/plain'});
                res.write('Error 404: resource not found.');
                res.end();
	}
	else{
		res.writeHead(200, {'Content-Type': 'application/json'});
		conn.query("SELECT Player_ID from Player WHERE username='"+qu.uname+"';",function(err,result)
		{
			if(err){
				console.log(err)
			}
			else{
				if(result.length!=0){
					console.log("user found")
					let player1Id = result[0].Player_ID;
					conn.query("SELECT Player_ID from Player WHERE username='"+qu.opp+"';",function(err,result){
					if(result.length!=0){
						let player2Id = result[0].Player_ID
						console.log("opponent found")
						conn.query("INSERT INTO Game (Player1_ID,Player2_ID) VALUES ("+player1Id+","+player2Id+");",function(err,result){
						if(err){
							console.log(err);
						}
						else{
							conn.query("UPDATE Game SET Player1_uname = (SELECT Username FROM Player WHERE Player_ID = Game.Player1_ID),"+
							" Player2_uname = (SELECT Username FROM Player WHERE Player_ID = Game.Player2_ID),"+
							" turn = (SELECT Username FROM Player WHERE Player_ID = Game.Player1_ID)"+
							"WHERE Game_ID = (SELECT LAST_INSERT_ID());", function(err,result){
							if(err){console.log(err)}
							else{
								console.log("game created");
								res.write(JSON.stringify({player1ID:player1Id,player2ID:player2Id}));
								res.end();
							}
							});
						}
					});
					}
					else{
						console.log("opponent not found");
						res.write(JSON.stringify({player1ID:player1Id,player2ID:0}));
                                       		res.end();
					}
					});
				}
				else{
					console.log("user not found");
					res.write(JSON.stringify({player1ID:0,player2ID:0}));
					res.end();
				}
			}
		}
		)
		console.log(qu.uname)
		console.log(qu.opp)
	}
}

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
		conn.query("SELECT * FROM Game WHERE Player1_ID="+qu.id+" OR Player2_ID="+qu.id+";",function(err,result){
			if(err){
				console.log(err);
			}
			else{
				res.write(JSON.stringify(result))
				res.end();
			}
		});
	}

}

function logIn(qu,res){
	if(!qu.uname || !qu.pword){
		res.writeHead(404,{'Content-Type': 'text/plain'});
		res.write('Error 404: resource not found.');
		res.end();
		console.log("not working");
	}
	else
	{
		res.writeHead(200,{'Content-Type':'application/json'});

		conn.query("SELECT *, Is_Admin FROM Player WHERE Username='"+qu.uname.toLowerCase()+"';",function(err,result)
                {
			if(err)
			{
				console.log(err);
                       	}
                        else{
				if(result.length!=0)
				{
					console.log("username found");
					res.write(JSON.stringify({uname:qu.uname,pword:result[0].Password,is_admin:result[0].Is_Admin,id:result[0].Player_ID}));
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
        else{
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
				if(result.length!=0) {
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
                                        			res.write(JSON.stringify({email:qu.email,uname:"found",pword:qu.pword}));
                                        			res.end();
			                                }
							else{
								conn.query("INSERT INTO Player(Username, Email, Password)"+
                   						"VALUES ('"+qu.uname.toLowerCase()+"', '"+qu.email.toLowerCase()+"', '"+qu.pword+"');", function(err, result){
                						if(err){
                                					console.log(err);
                        					}
                       						else{
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

function rules(res){

    res.writeHead(200,{'Content-Type':'application/json'});
    conn.query("SELECT * FROM Rule;",function(err,result){
        if(err){
            console.log(err);
        }
        else{
            res.write(JSON.stringify(result))
            res.end();
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
	else if(parsedURL.pathname=="/creategame"){
		return createGame(parsedURL.query,res);
	}
	else if(parsedURL.pathname=="/getuser"){
                return getUser(parsedURL.query,res);
        }
	else if(parsedURL.pathname=="/rules"){
                return rules(res);
        }	
	else if(parsedURL.pathname=="/rule"){
		return getRule(parsedURL.query,res);
	}	
	else
        {
                return sendFile(req,res);
        }
}

const myserver = http.createServer(main);
myserver.listen(80, function() {console.log("Listening on port 80")});
