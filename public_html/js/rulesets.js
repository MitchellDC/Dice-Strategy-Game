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
    document.getElementById("rulePopup").classList.toggle("active")
}

<<<<<<< HEAD
=======

let ruleTable = document.getElementById("ruleTable");
console.log("outsideRuletable: "+ ruleTable)


>>>>>>> 8af57a7269395ef882d1e9955b0f7ebcef74dcf3
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

				for(let i = 0; i < resp.length; i++) {
					
					newRow = ruleTable.insertRow() // maybe i+1

					// variable for the second column of the new row

					newRow.innerHTML = resp[i].Ruleset_name //displays the ruleset (will change once the rulesets are applied)
					newRow.classList.add("details"); //assigns class to the columns
					//alert(resp[game].Game_ID)
					let ruleID = resp[i].Rule_ID;
					newRow.id = ruleID; //assigns id to the first column

					/*
					oppColumn.addEventListener("click", function(){
						alert(opponent);
						location.href="game.html";
					}); //brings user to the game if the opponent's username is clicked*/


					// anonymous function where opponent is different at each iteration of the loop

					(function (ruleID) {
						newRow.addEventListener("click", function () {
						alert(ruleID)
						document.getElementById("rulePopup").classList.toggle("active")
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
<<<<<<< HEAD



function displayHealth() { // to display initial health in rulesets popup

	let health = document.getElementById("health") // get id from div in popup
	let xmlhttp = new XMLHttpRequest();
	xmlhttp.onerror = function(){alert("Error!")};
	xmlhttp.onload = function(){

		let resp = JSON.parse(this.responseText); // takes the response from the server in variable resp
		for(let Rule in resp){
			health.classList.add("r-titles"); // add class to div
			health.innerHTML = ("Initial Health: " + resp[Rule].InitialHealth); // display initial health from database table
		}
	}
	xmlhttp.open("GET","http://104.196.1.169/rules");
	xmlhttp.send();
}
displayHealth();


function displayPowers() {

	let createPowers = document.getElementById("powers")
	let xmlhttp = new XMLHttpRequest();
	xmlhttp.onerror = function(){alert("Error!")};
	xmlhttp.onload = function(){

		let resp = JSON.parse(this.responseText); // takes the response from the server in variable resp
		for(let Rule in resp){
			console.log("in loop")

			let powers = document.createElement("div")

			if(resp[Rule].antiMalware == true){
				console.log("antiMalware true")
				powers.innerHTML += "antiMalware";
			}
			if(resp[Rule].binarySearch == true){
				console.log("binarySearch true")
				powers.innerHTML += "binarySearch";
			}
			if(resp[Rule].ciphertext == true){
				console.log("ciphertext true")
				powers.innerHTML += "ciphertext";
			}

			// append divs to container inside popup
			createPowers.appendChild(powers)
		}
	}
	xmlhttp.open("GET","http://104.196.1.169/rules");
	xmlhttp.send();
}
displayPowers();
=======
>>>>>>> 8af57a7269395ef882d1e9955b0f7ebcef74dcf3
