const username = localStorage.getItem('username'); //takes the username from the login page

if(username == null){ //goes back to the login page if user did not log in
	alert("you are being redirected to the login page");
	document.getElementById('homepage').style.display='none';
	window.open("http://35.231.124.196/login.html","_self");
}
else{ //displays username on the heading if the user logged in
	document.getElementById('homepage').style.display='block';
	document.getElementById("heading").innerHTML="Welcome "+username+"!";
}

function toHome() {
    document.getElementById("home").onclick = function () { location.href = "home.html"}
}

function toRules() {
    document.getElementById("rules").onclick = function () { location.href = "rulesets.html"}
}

function createGame() {
    document.getElementById("popup1").classList.toggle("active")
}

function toGame(){
    document.getElementById("list").onclick = function() { location.href = "game.html"}
}

function toNewGame(){
    document.getElementById("newGame").onclick = function() { location.href = "game.html"}
}

function toLogin(){
	localStorage.removeItem('username');
	document.getElementById("signout").onclick = function() { location.href = "login.html"}
}

