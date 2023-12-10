const username = localStorage.getItem('username'); //takes the username from the login page
const id = localStorage.getItem('id');
//alert("working")

if(username == null){ //goes back to the login page if user did not log in
	// alert("you are being redirected to the login page");
	document.getElementById('homepage').style.display='none';
	window.open("http://104.196.1.169/login.html","_self");
}
else{ //displays username on the heading if the user logged in
	document.getElementById('homepage').style.display='block';
	document.getElementById("player").innerHTML="Welcome "+username+"!";
}

function toHome() {
    document.getElementById("home").onclick = function () { location.href = "home.html"}
}

/*
function toLogin(){
    document.getElementById("signout").onclick = function() { location.href = "login.html"}
}
*/

function toRules() {
    document.getElementById("rules").onclick = function () { location.href = "rulesets.html"}
}

function showRules() {
    
    
    console.log("in showRules")

    let xmlhttp = new XMLHttpRequest()
	xmlhttp.onerror = function(){alert("Error!")};
	xmlhttp.onload = function(){

    let rules = JSON.parse(this.responseText)
    console.log("rules: " + rules)

        let dropdown = document.getElementById("rulesets")
	    console.log("dropdown: "+dropdown)

        for (let rule in rules) {

            console.log("rule: " + rule)
            
            let newOption = document.createElement("option")

            newOption.value = rules[rule].Rule_ID
            newOption.text = rules[rule].Ruleset_name


	        console.log(newOption)
            dropdown.appendChild(newOption)

            console.log()



        }


    }

    //let rulesetElement = document.getElementById("ruleset")
    
	xmlhttp.open("GET","http://104.196.1.169/rules");
	xmlhttp.send();
}
showRules();



function showGames(){
	// takes the game table from the html
	let gameTable = document.getElementById("gameTable");
<<<<<<< HEAD

	console.log("gameTable after assignment: " +gameTable)
=======
	console.log("gameTable after assignment: " +gameTable)
	
>>>>>>> 9d834ba3d32e52d7e13350eeb9f1549a4a867530
	let xmlhttp = new XMLHttpRequest();
	xmlhttp.onerror = function(){alert("Error!")};
	xmlhttp.onload = function(){
		if(this.status!=200){alert("Error!")}
		else{

			let resp = JSON.parse(this.responseText); // takes the response from the server in variable resp
			console.log(resp)
			if(resp.length>0){
				document.getElementById("noGames").style.display="none"; //hides the table that says no games if user has ongoing games
				for(game in resp){ //every game in the response is taken
					//alert(resp[game].Player1_ID);
					//alert(resp[game].Player2_ID);
					if(username==resp[game].Player1_uname){ // takes the username of the other player in the game
						opponent = resp[game].Player2_uname;
					}
					else{
						opponent = resp[game].Player1_uname;
					}
					//let opponent = getUser(opponentId);
					//alert("opponent");
					console.log("gameTable: " + gameTable)
					newRow = gameTable.insertRow(); // new row is made

					newRow.classList.add("scroll"); // class 'scroll' is assigned to the new row
					oppColumn = newRow.insertCell(0); // variable for the first column of the new row
					ruleColumn = newRow.insertCell(1); // variable for the second column of the new row
					turnColumn = newRow.insertCell(2); // variable for the third column of the new row

					//alert("opponent: "+opponent);
					oppColumn.innerHTML = opponent; // labels the first column of the first row as the user name of the opponent
					ruleColumn.innerHTML = resp[game].Rule_Name; //displays the ruleset (will change once the rulesets are applied)
					turnColumn.innerHTML = resp[game].totalturns; //displays the number of turns in the game, taken from the server

					oppColumn.classList.add("ongoing"); //assigns class to the first column
					oppColumn.id = "list"; //assigns id to the first column
					ruleColumn.classList.add("details"); //assigns class to the second column
					turnColumn.classList.add("details"); //assigns class to the third column
					//alert(resp[game].Game_ID)
					let gameID = resp[game].Game_ID;
					let ruleID = resp[game].Rule_ID;

					/*
					oppColumn.addEventListener("click", function(){
						alert(opponent);
						location.href="game.html";
					}); //brings user to the game if the opponent's username is clicked*/


					// anonymous function where opponent is different at each iteration of the loop

					(function (gameID,ruleID) {
        					oppColumn.addEventListener("click", function () {
     							//alert(gameID);
							localStorage.setItem('ruleID', ruleID);
							localStorage.setItem('gameID', gameID);
            						location.href = "game.html";
        					});
    					})(gameID,ruleID)

				}
			}
			else{
				document.getElementById("noGames").style.display="block"; //another table that says no ongoing games is shown if no games are being played
				//document.getElementById("noGames").innerHTML="<b>NO ONGOING GAMES</b>"
				gameTable.style.display='none'; //table is hidden if there are no ongoing games
			}

		}

	}
	xmlhttp.open("GET","http://104.196.1.169/games?"+queryObjectToString({id:id}));
	xmlhttp.send();



}
showGames();

function createGame() {
	document.getElementById("popup1").classList.toggle("active")

}

function toNewGame(){
    let newOpp = document.getElementById("newGame").value.toLowerCase();
    let ruleset = document.getElementById("rulesets").value

	if(!newOpp){ alert("Specify your opponent's name")}
	else if(ruleset==0){alert("Choose a ruleset!")}
	else{
		if(newOpp!=username){ // makes sure that the opponent's username is not the same as the user
			let xmlhttp = new XMLHttpRequest();
			xmlhttp.onerror = function() {alert("Error")}
			xmlhttp.onload = function(){
				if(this.status!=200){
					alert("Error Code: "+this.status)
				}
				else{
					let ids = JSON.parse(this.responseText);

					if(ids.player1ID!=0 && ids.player2ID!=0){
						alert("Game Created!"); 
						location.reload(); //refreshes page when game is created
					}
					else if(ids.player2ID==0){ //returns 0 if the typed in username is not in the database

						alert("Opponent not found!");
						document.getElementById("newGame").value=""; // clears the input value of opponent username
					}
				}
			}
			xmlhttp.open("GET","http://104.196.1.169/creategame?"+queryObjectToString({uname:username,opp:newOpp, ruleid:ruleset}));
			xmlhttp.send();
		}
		else{
			alert("Opponent cannot be your own username!");
			document.getElementById("newGame").value="";
		}
	}
}


    //if(ruleset.value == "0") alert("No ruleset selected!")


	/*
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
                    window.location.href("http://104.196.1.169/game.html","_self");
                }
            }
        } else {
            alert("server responded with status: ", this.status)
        }
    }*/

//xmlhttp.open("GET","http://104.196.1.169/home?"+queryObjectToString({uname:uname.value}));
//xmlhttp.send();



function toGame(opp){
	location.href = "game.html";
	console.log(opp);
	//window.open("http://104.196.1.169/game.html");
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
