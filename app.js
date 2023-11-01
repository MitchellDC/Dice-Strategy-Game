const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');

db = []

function contains(s){
	a = [];
	for(let i = 0; i<phoneBook.length; i++){
		if (phoneBook[i].name.toLowerCase().startsWith(s.toLowerCase()))
		{
			a.push(phoneBook[i]);
		}
	}
	return a;
}

function processQuery(query, res){
	if(query.uname && query.pword){
		db.push(query);
		console.log(db[0].uname);

		res.writeHead(200,{'Content-Type': 'text/plain'});
		res.write("Success");
		res.end();
	}
	else if(query.pword==undefined)
	{
		res.writeHead(200,{'Content-Type':'text/plain'});
		res.write("Type Password");
		res.end();
	}
	else{
		res.writeHead(404,{'Content-Type': 'text/plain'});
		res.write('Error 404: resource not found.');
		res.end();
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
	
	if (parsedURL.pathname=="/search"){
		return processQuery(parsedURL.query,res);
		}
	else{
		return sendFile(req,res);
	}
}

const myserver = http.createServer(main);
myserver.listen(80, function() {console.log("Listening on port 80" )});
