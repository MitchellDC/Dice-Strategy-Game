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


let ruleTable = document.getElementById("ruleTable");
console.log("outsideRuletable: "+ ruleTable)


function displayRulesets(){

	// takes the rulesets table from the html
	let ruleTable = document.getElementById("ruleTable");
    console.log("ruletable: "+ ruleTable)
	let xmlhttp = new XMLHttpRequest();
	xmlhttp.onerror = function(){alert("Error!")};
	xmlhttp.onload = function(){
		if(this.status!=200){alert("Error!")}
		else{

			let resp = JSON.parse(this.responseText); // takes the response from the server in variable resp
			console.log("resp: "+ resp)
			if(resp.length>0){
				document.getElementById("noRulesets").style.display="none"; // hides the table that says no rulesets if there are no active rulesets
				console.log("ruletable: " + ruleTable)
                for(Rule in resp){ // every ruleset in the response is taken
                    
					newRow = ruleTable.insertRow(); // new row is made
					console.log("ruletable: " + ruleTable)
					console.log(newRow)

					ruleColumn = newRow.insertCell(0); // variable for the second column of the new row

					ruleColumn.innerHTML = resp[Rule].Ruleset_name //displays the ruleset (will change once the rulesets are applied)

					ruleColumn.classList.add("details"); //assigns class to the columns
					ruleColumn.id = ruleID; //assigns id to the first column
					//alert(resp[game].Game_ID)
					let ruleID = resp[Rule].Rule_ID;


					/*
					oppColumn.addEventListener("click", function(){
						alert(opponent);
						location.href="game.html";
					}); //brings user to the game if the opponent's username is clicked*/


					// anonymous function where opponent is different at each iteration of the loop

					(function (ruleID) {
						ruleColumn.addEventListener("click", function () {
							 alert(ruleID);
							document.getElementById("ruleset").classList.toggle("active")
						});
					})(ruleID)

				}
			}
			else{
				document.getElementById("noRules").style.display="block"; //another table that says no active rulesets if there are no rulesets made
				//document.getElementById("noRules").innerHTML="<b>NO ACTIVE RULESETS</b>"
				ruleTable.style.display='none'; //table is hidden if there are no active rulesets
			}

		}

	}
	xmlhttp.open("GET","http://104.196.1.169/rules");
	xmlhttp.send();
}
displayRulesets();
