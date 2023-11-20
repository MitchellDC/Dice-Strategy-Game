function toDark() {
    let element = document.body
    element.classList.toggle("dark")
}

function toHome() {
    document.getElementById("home").onclick = function () { location.href = "/collaboration-infinite-time/home_page/html/home.html"}
}

function toRules() {
    document.getElementById("rules").onclick = function () { location.href = "/collaboration-infinite-time/home_page/html/rulesets.html"}
}

function createGame() {
    document.getElementById("popup1").classList.toggle("active")
}

function toGame(){
    document.getElementById("list").onclick = function() { location.href = "/collaboration-infinite-time/game_page/html/battleground.html"}
}

function toNewGame(){
    document.getElementById("newGame").onclick = function() { location.href = "/collaboration-infinite-time/game_page/html/battleground.html"}
}