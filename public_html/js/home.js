const urlParams = new URLSearchParams(window.location.search);
const uname = urlParams.get("uname");
console.log(uname);


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
    document.getElementById("signout").onclick = function() { location.href = "login.html"}
}

document.getElementById("heading").innerHTML="Welcome "+uname+"!";
