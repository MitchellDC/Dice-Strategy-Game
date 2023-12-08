function toHome() {
    document.getElementById("home").onclick = function () { location.href = "home.html"}
}

function toLogin(){
    document.getElementById("signout").onclick = function() { location.href = "login.html"}
}

function toRules() {
    document.getElementById("rules").onclick = function () { location.href = "rulesets.html"}
}

function showRules() {
    document.getElementById("ruleset").classList.toggle("active")
}


// function displayRulesets(){


// 	// takes the rulesets table from the html
// 	let ruleTable = document.getElementById("ruleTable");

// 	let xmlhttp = new XMLHttpRequest();
// 	xmlhttp.onerror = function(){alert("Error!")};
// 	xmlhttp.onload = function(){
// 		if(this.status!=200){alert("Error!")}
// 		else{

// 			let resp = JSON.parse(this.responseText); // takes the response from the server in variable resp
// 			console.log(resp)
// 			if(resp.length>0){
// 				document.getElementById("noRules").style.display="none"; // hides the table that says no rulesets if there are no active rulesets
// 				for(ruleset in resp){ // every ruleset in the response is taken
// 					if(resp[ruleset].Player1_uname==username){ 
// 						opponent = resp[game].Player2_uname;
// 					}
// 					else{
// 						opponent = resp[game].Player1_uname;
// 					}
// 					newRow = ruleTable.insertRow(); // new row is made

// 					newRow.classList.add("scroll"); // class 'scroll' is assigned to the new row
// 					oppColumn = newRow.insertCell(0); // variable for the first column of the new row
// 					ruleColumn = newRow.insertCell(1); // variable for the second column of the new row
// 					turnColumn = newRow.insertCell(2); // variable for the third column of the new row

// 					oppColumn.innerHTML = opponent; // labels the first column of the first row as the user name of the opponent
// 					ruleColumn.innerHTML = "Standard" //displays the ruleset (will change once the rulesets are applied)
// 					turnColumn.innerHTML = resp[game].totalturns; //displays the number of turns in the game, taken from the server

// 					oppColumn.classList.add("ongoing"); //assigns class to the first column
// 					oppColumn.id = "list"; //assigns id to the first column
// 					ruleColumn.classList.add("details"); //assigns class to the second column
// 					turnColumn.classList.add("details"); //assigns class to the third column
// 					//alert(resp[game].Game_ID)
// 					let gameID = resp[game].Game_ID;


// 					/*
// 					oppColumn.addEventListener("click", function(){
// 						alert(opponent);
// 						location.href="game.html";
// 					}); //brings user to the game if the opponent's username is clicked*/


// 					// anonymous function where opponent is different at each iteration of the loop

// 					(function (gameID) {
//         					oppColumn.addEventListener("click", function () {
//      							//alert(gameID);
// 							localStorage.setItem('gameID', gameID);
//             						location.href = "game.html";
//         					});
//     					})(gameID)

// 				}
// 			}
// 			else{
// 				document.getElementById("noRules").style.display="block"; //another table that says no ongoing games is shown if no games are being played
// 				document.getElementById("noRules").innerHTML="<b>NO ONGOING GAMES</b>"
// 				ruleTable.style.display='none'; //table is hidden if there are no ongoing games
// 			}

// 		}

// 	}
// 	xmlhttp.open("GET","http://35.231.124.196/games?"+queryObjectToString({uname:username}));
// 	xmlhttp.send();
// }
// displayRulesets();