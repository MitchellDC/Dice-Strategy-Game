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
						conn.query("INSERT INTO Game (Player1_ID,Player2_ID,Rule_ID) VALUES ("+player1Id+","+player2Id+","+qu.ruleid+");",function(err,result){
						if(err){
							console.log(err);
						}
						else{
							conn.query("UPDATE Game SET Player1_uname = (SELECT Username FROM Player WHERE Player_ID = Game.Player1_ID),"+
							" Player2_uname = (SELECT Username FROM Player WHERE Player_ID = Game.Player2_ID),"+
							" turn = (SELECT Username FROM Player WHERE Player_ID = Game.Player1_ID), "+
							" Rule_Name = (SELECT Ruleset_name FROM Rule WHERE Rule_ID=Game.Rule_ID), "+
							" Player1_Health = (SELECT InitialHealth FROM Rule WHERE Rule_ID=Game.Rule_ID), "+
							" Player2_Health = (SELECT InitialHealth FROM Rule WHERE Rule_ID=Game.Rule_ID) "+
							" WHERE Game_ID = (SELECT LAST_INSERT_ID());", function(err,result){
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
			" antiMalware1="+qu.antiMalware1+" " +
			" antiMalware2="+qu.antiMalware2+" " +
			" binarySearch1="+qu.binarySearch1+" " +
			" binarySearch2="+qu.binarySearch2+" " + 
			" ciphertext1="+qu.ciphertext1+" " +
			" ciphertext2="+qu.ciphertext2+" " +
			" cyberSecurity1= "+qu.cyberSecurity1+" " +
			" cyberSecurity2= "+qu.cyberSecurity2+" "+
			" firewall1='"+qu.turn+"' " +
			" firewall2='"+qu.turn+"' " +
			" fullStack1='"+qu.turn+"' " +
			" fullStack2='"+qu.turn+"' " +
			" hack1='"+qu.turn+"' " +
			" hack2='"+qu.turn+"' " +
			" powerOutlet1='"+qu.turn+"' " +
			" powerOutlet2='"+qu.turn+"' " +
			" reboot1='"+qu.turn+"' " +
			" reboot2='"+qu.turn+"' " +
			" recursion1='"+qu.turn+"' " +
			" recursion2='"+qu.turn+"' " +
			" tryCatch1='"+qu.turn+"' " +
			" tryCatch2='"+qu.turn+"' " +
			" typeCast1='"+qu.turn+"' " + 
			" typeCast2='"+qu.turn+"' " + 
			" windowsUpdate1='"+qu.turn+"' " + 
			" windowsUpdate2='"+qu.turn+"' " + 
			" blueScreen1='"+qu.turn+"' " + 
			" blueScreen2='"+qu.turn+"' " + 
			" bug1='"+qu.turn+"' " + 
			" bug2='"+qu.turn+"' " + 
			" computerVirus1='"+qu.turn+"' " + 
			" computerVirus2='"+qu.turn+"' " + 
			" infiniteLoop1='"+qu.turn+"' " + 
			" infiniteLoop2='"+qu.turn+"' " + 
			" lowBattery1='"+qu.turn+"' " + 
			" lowBattery2='"+qu.turn+"' " + 
			" ransomware1='"+qu.turn+"' " + 
			" ransomware2='"+qu.turn+"' " + 
			" slowComputer1='"+qu.turn+"' " + 
			" slowComputer2='"+qu.turn+"' " +
			" syntaxError1='"+qu.turn+"' " +
			" syntaxError2='"+qu.turn+"' " +
			   " WHERE Game_ID="+qu.gameId+";",function(err,result){
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
        if(!qu){
                res.writeHead(404,{'Content-Type': 'text/plain'});
                res.write('Error 404: resource not found.');
                res.end();
        }
        else{

		res.writeHead(200,{'Content-Type': 'text/plain'});
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
                                res.write("updated second");
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

function createRule(qu,res){	
	console.log(qu)
	if(!qu){
		res.writeHead(404,{'Content-Type':'text/plain'});
		res.write("Error!")
		res.end();
	}
	else{
		conn.query("SELECT Ruleset_name FROM Rule WHERE Ruleset_name='"+qu.ruleName+"';",function(err,result){
			if(err) // checks if Ruleset name already exists in the rule table
		  	{
			  console.log(err);
			}
			else{
				res.writeHead(200,{'Content-Type':'text/plain'});
				if(result.length!=0){ //ruleset name already exists
					res.write("found")
					res.end();
				}
				else{ // if username is not found ruleset is created 
					conn.query("INSERT INTO Rule (Ruleset_name, InitialHealth, firewall, ciphertext, "+
						   "fullStack, reboot, recharge, recursion, nonEthicalHacking, tryCatch, "+
						   "antiMalware, securitySpecialist, windowsUpdate, syntaxError, "+
						   "ransomware, lowBattery, blueScreen, slowComputer, computerVirus, "+
						   "infiniteLoop, bug, typeCast, binarySearch) "+
						   "VALUES ('"+qu.ruleName+"', "+qu.health+", "+qu.firewall+", "+qu.ciphertext+", "+
						   qu.fullStack+", "+qu.reboot+", "+qu.powerOutlet+", "+qu.recursion+", "+ 
						   qu.nonEthicalHacking+", "+qu.tryCatch+", "+qu.antiMalware+", "+
						   qu.securitySpecialist+", "+qu.windowsUpdate+", "+qu.syntaxError+", "+
						   qu.ransomware+", "+qu.lowBattery+", "+qu.blueScreen+", "+
						   qu.slowComputer+", "+qu.computerVirus+", "+qu.infiniteLoop+", "+
						   qu.bug+", "+qu.typeCast+", "+qu.binarySearch+");",function(err,result){
						if(err){
							console.log(err)
						}
						else{
							console.log("ruleset created")
							res.write("created")
							res.end();
						}
						
					}
					);
				}
			}
		});
	}

}


function getRule(qu,res){
    res.writeHead(200,{'Content-Type':'application/json'});
    conn.query("SELECT * FROM Rule WHERE Rule_ID="+qu.ruleID+";",function(err,result){
        if(err){
            console.log(err);
        }
        else{
            res.write(JSON.stringify(result))
            res.end();
        }
    });	
}

function deleteRule(qu,res){
	if(!qu){
		res.writeHead(404,{'Content-Type':'text/plain'});
		res.write("Error!")
		res.end();
	}
	else{
		res.writeHead(200,{'Content-Type':'text/plain'});
		conn.query("DELETE FROM Rule WHERE Rule_ID="+qu.ruleid+";",function(err,result){
			if(err)
			{
				console.log(err);
			}
			else{
				res.write("deleted");
				res.end();
			}
		})
	}
	
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
	else if(parsedURL.pathname=="/createrule"){
		return createRule(parsedURL.query,res);
	}
	else if(parsedURL.pathname=="/deleterule"){
		return deleteRule(parsedURL.query,res);
	}
	else
        {
                return sendFile(req,res);
        }
}

const myserver = http.createServer(main);
myserver.listen(80, function() {console.log("Listening on port 80")});
