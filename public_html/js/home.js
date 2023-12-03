const username = localStorage.getItem('username'); //takes the username from the login page

if(username == null){ //goes back to the login page if user did not log in
	// alert("you are being redirected to the login page");
	document.getElementById('homepage').style.display='none';
	window.open("http://35.231.124.196/login.html","_self");
}
else{ //displays username on the heading if the user logged in
	document.getElementById('homepage').style.display='block';
	document.getElementById("player").innerHTML="Welcome "+username+"!";
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

function showGames(){


	// takes the game table from the html
	let gameTable = document.getElementById("gameTable");

	let xmlhttp = new XMLHttpRequest();
	xmlhttp.onerror = function(){alert("Error!")};
	xmlhttp.onload = function(){
		if(this.status!=200){alert("Error!")}
		else{

			let resp = JSON.parse(this.responseText); // takes the response from the server in variable resp
			if(resp.length>0){
				document.getElementById("noGames").style.display="none"; //hides the table that says no games if user has ongoing games
				for(game in resp){ //every game in the response is taken
					if(resp[game].Player1_uname==username){ // takes the username of the other player in the game
						opponent = resp[game].Player2_uname;
					}
					else{
						opponent = resp[game].Player1_uname;
					}
					newRow = gameTable.insertRow(); // new row is made

					newRow.classList.add("scroll"); // class 'scroll' is assigned to the new row
					oppColumn = newRow.insertCell(0); // variable for the first column of the new row
					ruleColumn = newRow.insertCell(1); // variable for the second column of the new row
					turnColumn = newRow.insertCell(2); // variable for the third column of the new row

					oppColumn.innerHTML = opponent; // labels the first column of the first row as the user name of the opponent
					ruleColumn.innerHTML = "Standard" //displays the ruleset (will change once the rulesets are applied)
					turnColumn.innerHTML = resp[game].totalturns; //displays the number of turns in the game, taken from the server

					oppColumn.classList.add("ongoing"); //assigns class to the first column
					oppColumn.id = "list"; //assigns id to the first column
					ruleColumn.classList.add("details"); //assigns class to the second column
					turnColumn.classList.add("details"); //assigns class to the third column

					oppColumn.addEventListener("click", toGame); //brings user to the game if the opponent's username is clicked
				}
			}
			else{
				document.getElementById("noGames").style.display="block"; //another table that says no ongoing games is shown if no games are being played
				document.getElementById("noGames").innerHTML="<b>NO ONGOING GAMES</b>"
				gameTable.style.display='none'; //table is hidden if there are no ongoing games
			}

		}

	}
	xmlhttp.open("GET","http://35.231.124.196/games?"+queryObjectToString({uname:username}));
	xmlhttp.send();



}
showGames();

function createGame() {
    document.getElementById("popup1").classList.toggle("active")
}
/*
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
*/
function toGame(){
	location.href = "game.html";
	//window.open("http://35.231.124.196/game.html");
    //document.getElementById("list").onclick = function() { location.href = "game.html"}
}


function toLogin(){
	localStorage.removeItem('username');
	document.getElementById("signout").onclick = function() { location.href = "login.html"}
}

function createPopup() {
	let modal = document.getElementById("mymodal"); 
	let span = document.getElementsByClassName("close");
	modal.style.display = "block";
	span[0].onclick = function() {
		modal.style.display = "none"
	}
}

function queryObjectToString(query) {
    let properties = Object.keys(query);
    let arrOfQuesryStrings = properties.map(prop => prop+"="+query[prop]);
    return(arrOfQuesryStrings.join('&'));
 }