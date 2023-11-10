const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');

function home(req,res)
{
	console.log("yes");
	let fileName = "html/home_page/html/home.html";
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


function signIn(query,res){
	//signIn code goes here

}

function signUp(query, res){
	if(!query.email|| !query.uname || !query.pword){
		res.writeHead(404,{'Content-Type': 'text/plain'});
		res.write('Error 404: resource not found.');
		}
	else {
		res.writeHead(200,{'Content-Type':'application/json'});
		res.write(JSON.stringify({email:query.email,uname:query.uname,pword:query.pword}));
		}
	res.end();
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
	let fileName = "html"+url.parse(req.url).pathname;
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
