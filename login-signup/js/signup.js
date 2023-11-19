// Sign-Up Page
const express = require('express'); 
const app = express(); 

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
