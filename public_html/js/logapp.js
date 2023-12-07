const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');
const express = require('express'); 
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3000;



app.use(express.json()); 

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/signup.html');
});

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

app.listen(3000, () => {
	console.log("port 3000"); 
});
