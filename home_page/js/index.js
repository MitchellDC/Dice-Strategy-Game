function toDark() {
    let element = document.body
    element.classList.toggle("dark")
}

function toHome() {
    document.getElementById("home").onclick = function () { location.href = "/home_page/html/home.html"}
}

function toRules() {
    document.getElementById("rules").onclick = function () { location.href = "/home_page/html/rulesets.html"}
}

function createGame() {
    document.getElementById("popup1").classList.toggle("active")
}