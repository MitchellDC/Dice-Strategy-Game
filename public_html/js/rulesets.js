function showPowers() {
    document.getElementById("powers").classList.toggle("active")
}

function showDis() {
    document.getElementById("disadvantage").classList.toggle("active")
}

function toHome() {
    document.getElementById("home").onclick = function () { location.href = "home.html"}
}

function toLogin(){
    document.getElementById("signout").onclick = function() { location.href = "login.html"}
}

function toRules() {
    document.getElementById("rules").onclick = function () { location.href = "rulesets.html"}
}
