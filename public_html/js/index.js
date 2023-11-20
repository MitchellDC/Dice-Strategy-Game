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
    document.getElementById("list").onclick = function() { location.href = "battleground.html"}
}

function toNewGame(){
    document.getElementById("newGame").onclick = function() { location.href = "battleground.html"}
}