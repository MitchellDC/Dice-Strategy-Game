function toHome() {
    document.getElementById("home").onclick = function () { location.href = "home.html"}
}

function toLogin(){
    document.getElementById("signout").onclick = function() { location.href = "login.html"}
}

function toRules() {
    document.getElementById("rules").onclick = function () { location.href = "rulesets.html"}
}

function createGame() {
    document.getElementById("popup1").classList.toggle("active")
}

function toNewGame(){
    let username = document.getElementById("newGame").value
    let ruleset = document.getElementById("ruleset").value

    if(!username.trim()) alert("Error. No name specified")
    if(ruleset.value == "0") alert("No ruleset selected!")

    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onerror = function() { alert("Error")};

    xmlhttp.onload = function() { // successful load
        if(this.status == 200){
            console.log(this.responseText)
            let resObj = JSON.parse(this.responseText)
            
            if(resObj.uname){
                if(resObj.uname=="none"){ // check if username exists
                    alert("Username not found!")
                    clearFields();
                } else if(resObj.uname == resObj.uname){ // if user enters their own username
                    alert("Error. Opponent name same as player name")
                    clearFields();
                } else { // if username exists
                    alert("Creating game...")
                    window.location.href("http://35.231.124.196/game.html","_self");
                }
            }
        } else {
            alert("server responded with status: ", this.status)
        }
    }
}
xmlhttp.open("GET","http://35.231.124.196/home?"+queryObjectToString({uname:uname.value}));
xmlhttp.send();

function toGame(){
    document.getElementById("list").onclick = function() { location.href = "game.html"}
}

