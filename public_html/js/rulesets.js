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


function displayRulesets(){


	// takes the rulesets table from the html
	let ruleTable = document.getElementById("ruleTable");
<<<<<<< HEAD

=======
    console.log("ruletable: "+ ruleTable)
>>>>>>> e060db734b62164d406ad71a3fb1a6461988186e
	let xmlhttp = new XMLHttpRequest();
	xmlhttp.onerror = function(){alert("Error!")};
	xmlhttp.onload = function(){
		if(this.status!=200){alert("Error!")}
		else{

			let resp = JSON.parse(this.responseText); // takes the response from the server in variable resp
			console.log(resp)
			if(resp.length>0){
<<<<<<< HEAD
				document.getElementById("noRules").style.display="none"; // hides the table that says no rulesets if there are no active rulesets
				let column = 0
                for(Rule in resp){ // every ruleset in the response is taken
                    if (column == 4) {
                        column = 0
                        newRow = ruleTable.insertRow(); // new row is made
=======
				document.getElementById("noRulesets").style.display="none"; // hides the table that says no rulesets if there are no active rulesets
				let column = 0
				newRow = ruleTable.insertRow(); // new row is made
                for(Rule in resp){ // every ruleset in the response is taken
                    if (column == 4) {
                        column = 0
						newRow
>>>>>>> e060db734b62164d406ad71a3fb1a6461988186e
                    }

					ruleColumn = newRow.insertCell(column); // variable for the second column of the new row

					ruleColumn.innerHTML = resp[Rule].Ruleset_name //displays the ruleset (will change once the rulesets are applied)

                    let ruleID = resp[Rule].Rule_ID;
<<<<<<< HEAD
					ruleColumn.classList.add("ongoing"); //assigns class to the columns
=======
					ruleColumn.classList.add("details"); //assigns class to the columns
>>>>>>> e060db734b62164d406ad71a3fb1a6461988186e
					ruleColumn.id = ruleID; //assigns id to the first column
					//alert(resp[game].Game_ID)

					/*
					oppColumn.addEventListener("click", function(){
						alert(opponent);
						location.href="game.html";
					}); //brings user to the game if the opponent's username is clicked*/


					// anonymous function where opponent is different at each iteration of the loop

<<<<<<< HEAD
                        column += column
=======
					(function (ruleID) {
						ruleColumn.addEventListener("click", function () {
							 alert(ruleID);
							document.getElementById("ruleset").classList.toggle("active")
						});
					})(ruleID)

                    column += column
>>>>>>> e060db734b62164d406ad71a3fb1a6461988186e
				}
			}
			else{
				document.getElementById("noRules").style.display="block"; //another table that says no active rulesets if there are no rulesets made
				document.getElementById("noRules").innerHTML="<b>NO ACTIVE RULESETS</b>"
				ruleTable.style.display='none'; //table is hidden if there are no active rulesets
			}

		}

	}
	xmlhttp.open("GET","http://104.196.1.169/rules");
	xmlhttp.send();
}
<<<<<<< HEAD
displayRulesets();
=======
displayRulesets();
>>>>>>> e060db734b62164d406ad71a3fb1a6461988186e
