/* goals and notes */
// change dfsDiceId and atkDiceId (append1)
// change alerts to pop-ups (player turn ends)
// make code for if player loads in game and it isn't their turn
/* end goals and notes */



const gameID = localStorage.getItem('gameID'); //takes gameID from the home page
const user = localStorage.getItem('username'); //takes username of the user on a device

let stage = 1 // tracks order, front-end only
/*
	stage 1 = roll both dice
	stage 2 = select one dice to re-roll
	stage 3 = select one dice to +2
	stage 4 = end turn and health change
*/

let dfsDiceId = document.getElementById("defenseDiceId")
let atkDiceId = document.getElementById("attackDiceId")
let dfsDiceId2 = document.getElementById("defenseDiceId2")
let atkDiceId2 = document.getElementById("attackDiceId2")
let selected = null

// db get once at the start of the game (GET) 
let username1 = null 
let username2 = null

// db get all of these values every turn (GET)

let maxHealth = 20 // ADMIN changes this

let attackNum1 = 0 // db player1Attack
let defenseNum1 = 0 // db player1Defense
let attackNum2 = 0 // db player2Attack
let defenseNum2 = 0 // db player2Defense

let health1 = maxHealth; // db player1Health
let health2 = maxHealth; // db player2Health

let totalTurns = 0;


let turn = ""; // db key "turn" with value of player's username
/*
	turn = 0 -> player 1's turn
	turn = 1 -> player 2's turn
*/



// debuffs objects
let debuffs1 = {
    syntaxError: false, // once, lose 5 health
    lowBattery: false, // every turn, lose 2 health
    blueScreen: false, // once, cannot attack or defend
    computerVirus: false, // two turns, cannot defend
    slowComputer: false, // two turns, cannot attack
    ransomware: false // once, 50% chance to lose 10 health

}

let debuffs2 = {
    syntaxError: false,
    lowBattery: false,
    blueScreen: false,
    computerVirus: false,
    slowComputer: false,
    ransomware: false

}

let powerups1 = {
    recursion: false, // every turn, do damage twice
    nonEthicalHacking: false, // every turn, lower enemy defense by 4
    tryCatch: false, // upon death, revive with 5 health
    antiMalware: false, // every turn, minimum defense is 4
    reboot: false, // once, restore all health
    recharge: false, // every turn, gain 2 health
    securitySpecialist: false, // every turn, gain 2 defense
    systemUpgrade: false, // every turn, gain 1 attack, 1 defense, 1 health
    firewall: false // once, become immune

}

let powerups2 = {
    recursion: false,
    nonEthicalHacking: false,
    tryCatch: false,
    antiMalware: false,
    reboot: false,
    charge: false,
    securitySpecialist: false,
    systemUpgrade: false, 
    firewall: false
}

// debuffs balancing
syntaxErrorValue = 5
ransomwareValue = 10
lowBatteryValue = 2

// powerups balancing
recursionAttacks = 2
nonEthicalHackingValue = 4
tryCatchValue = 5
antiMalwareThreshold = 4
rechargeValue = 2
rebootValue = maxHealth
securitySpecialistValue = 4

// powerups & debuffs counters
slowComputerCount1 = 2
computerVirusCount1 = 2

slowComputerCount2 = 2
computerVirusCount2 = 2

/* front-end only, is true when a player's dice are completely rolled and ready for battle
is true after ending turn */
let diceReady1 = false;
let diceReady2 = false;

document.getElementById("p1Health").innerHTML = health1;
document.getElementById("p2Health").innerHTML = health2;
document.getElementById("rollButtonId").style.display = "block"; // shows button
document.getElementById("rollButtonId2").style.display = "none"; // hides button



function getGame(){
	let xmlhttp = new XMLHttpRequest();
	xmlhttp.onerror = function(){alert("Error!")};
	xmlhttp.onload = function(){
		if(this.status!=200){
			alert("Error!");
		}
		else{
			let resp = JSON.parse(this.responseText); //takes response from the server of the game data
			console.log(resp);
			username1=resp[0].Player1_uname; //takes username of player 1
			username2=resp[0].Player2_uname; //takes username of player2

			health1=resp[0].Player1_Health; //takes health of player1
			health2=resp[0].Player2_Health; //takes health of player2

			turn=resp[0].turn; //takes who's turn 
			totalTurns=resp[0].totalturns; //takes the number of turns in the game


			attackNum1=resp[0].Player1_attack; //takes the attacknum of player 1
			defenseNum1=resp[0].Player1_defense; // takes the defensenum of player 1

			attackNum2=resp[0].Player2_attack; //takes the attack dice value of player 2

      defenseNum2=resp[0].Player2_defense; // takes the defense dice value of player 2


			if(attackNum1>0) //checks if player 1 has rolled his dice, makes diceReady1 true if so
			{
				diceReady1=true;
			}
			if(attackNum2>0) //checks if player 2 has rolled his dice, makes diceReady2 true if so
			{
				diceReady2=true;
			}

			// changes the images of the die
			atkDiceId.src = `css/images/dd`+attackNum1+`.jpeg`
        		dfsDiceId.src = `css/images/dd`+defenseNum1+`.jpeg`
        		atkDiceId2.src = `css/images/dd`+attackNum2+`.jpeg`
        		dfsDiceId2.src = `css/images/dd`+defenseNum2+`.jpeg`


			if(user==turn){ //if it is the user's turn a button will show
				if(turn==username2){ //shows player 2 button if the user in a device is player 2
                                	document.getElementById("rollButtonId").style.display = "none";
                                	document.getElementById("rollButtonId2").style.display = "block";
                        	}
                        	else{ //shows player 1 button if the user is player 1
                                	document.getElementById("rollButtonId").style.display = "block";
                                	document.getElementById("rollButtonId2").style.display = "none";
                        	}
			}
			else{ //hides buttons if it is not user's turn
				document.getElementById("rollButtonId").style.display = "none";
				document.getElementById("rollButtonId2").style.display = "none";

				//browser gets refreshed every 5 seconds if it is not user's turn
        			setInterval(() => {
			                location.reload();
        				}, 5000);


			}



			document.getElementById("p1Health").innerHTML = health1;
        		document.getElementById("p2Health").innerHTML = health2;
			document.getElementById("instructionsId").innerHTML = "Roll dice "+turn;
		}
	}


    //sends get request to the server of the game data
	xmlhttp.open("GET","http://35.231.124.196/game?"+queryObjectToString({gameId:gameID})); 

	xmlhttp.send();
}
getGame()

// returns text of button to "ROLL" after a player ends turn
function refreshButtons(){
	document.getElementById("rollButtonId").innerHTML = "ROLL"
    document.getElementById("rollButtonId2").innerHTML = "ROLL"

}

// returns image of dice to question marks after a battle
function refreshDice(){
	atkDiceId.src = `css/images/dd0.jpeg`
	dfsDiceId.src = `css/images/dd0.jpeg`
	atkDiceId2.src = `css/images/dd0.jpeg`
	dfsDiceId2.src = `css/images/dd0.jpeg`

	// (optional bc updated afterwards)
	attackNum1 = 0
	defenseNum1 = 0 
	attackNum2 = 0
	defenseNum2 = 0
}

// defense dice roll logic and updates pic
function rollDefense() {
	if(turn==username1){
		defenseNum1 = Math.floor(Math.random() * 6) + 1;
		dfsDiceId.src = `css/images/dd${defenseNum1}.jpeg`
	}
	else{
		defenseNum2 = Math.floor(Math.random() * 6) + 1;
		dfsDiceId2.src = `css/images/dd${defenseNum2}.jpeg`
	}

}
// attack dice roll logic and updates pic
function rollAttack() {
	if(turn==username1){
		attackNum1 = Math.floor(Math.random() * 6) + 1;
		atkDiceId.src = `css/images/dd${attackNum1}.jpeg`;
	}
	else{
		attackNum2 = Math.floor(Math.random() * 6) + 1;

        atkDiceId2.src = `css/images/dd${attackNum2}.jpeg`; 
    }

}

// front-end calculations
function healthChange(){


    // blue screen = once, cannot attack or defend
    if (debuffs1.blueScreen) {
        attackNum1 = 0
        defenseNum1 = 0
        debuffs1.blueScreen = false
    }
    if (debuffs2.blueScreen) {
        attackNum2 = 0
        defenseNum2 = 0
        debuffs2.blueScreen = false
    }

    // computer virus = for two turns, cannot defend (not sure if this needs database)
    // did not implement for player 2 yet before discussion
    if (debuffs1.computerVirus) {
        defenseNum1 = 0
        computerVirusCount1 -= 1

        if (computerVirusCount1 <= 0) {
            debuffs1.computerVirus = false
            computerVirusCount1 = 2
        }

    }

    // same comments as computer virus
    if (debuffs1.slowComputer) {
        attackNum1 = 0
        slowComputerCount1 -= 1

        if (slowComputerCount1 <= 0) {
            debuffs1.slowComputer = false
            slowComputerCount1 = 2
        }
    }

    // anti-maleware = every turn, minimum value of defense is 4
    if ((powerups1.antiMalware) && (defenseNum1 < antiMalwareThreshold))  {
        defenseNum1 = 4

    }
    if ((powerups2.antiMalware) && (defenseNum2 < antiMalwareThreshold)) {
        defenseNum2 = 4

    }

    // reboot = once, restore all health
    if (powerups1.reboot) {
        health1 = maxHealth
		powerups1.reboot = false

    }
    if (powerups2.reboot) {
        health2 = maxHealth
		powerups2.reboot = false

    }

	change1 = attackNum2 - defenseNum1
	change2 = attackNum1 - defenseNum2

    // recursion = every turn, do damage again
    if (powerups1.recursion) {
        change2 = change2 * recursionAttacks
    }
    if (powerups2.recursion) {
        change1 = change1 * recursionAttacks

    }

    // Non-ethical Hacking = every turn, lower enemy defense by 4
    if (powerups1.nonEthicalHacking) {
        defenseNum2 -= nonEthicalHackingValue

    }
    if (powerups2.nonEthicalHacking) {
        defenseNum1 -= nonEthicalHackingValue

    }

    // firewall = once, become immune
    if (powerups1.firewall) {
        change1 = 0

    }
	if (powerups2.firewall) {
		change2 = 0
	}

    // syntax error = once, lose 5 heatlh
    if (debuffs1.syntaxError) {
        health1 -= syntaxErrorValue
        debuffs1.syntaxError = false
    }
    if (debuffs2.syntaxError) {
        health2 -= syntaxErrorValue
        debuffs2.syntaxError = false
    }

    // ransomware = once, 50% chance to lose 10 health
    if (debuffs1.ransomware) {

        if (Math.random() <= 0.5) {
            health1 -= ransomwareValue
        }

        debuffs1.ransomware = false
    }
    if (debuffs2.ransomware) {
        if (Math.random() <= 0.5) {
            health2 -= ransomwareValue
        }

        debuffs2.ransomware = false
    }

    // low battery = every turn, lose 2 health
    if (debuffs1.lowBattery) {
        health1 -= lowBatteryValue
    }
    if (debuffs2.lowBattery) {
        health2 -= lowBatteryValue
    }

    // power outlet = every turn, gain 2 health
    if (powerups1.charge) {
        health1 += chargeGain

    }
    if (powerups2.charge) {
        health2 += chargeGain

    }


	if(change1>0)
	{   
		health1 = health1-change1
	}
	if (change2>0) {

		health2 = health2-change2
	}

	document.getElementById("p1Health").innerHTML = health1;
	document.getElementById("p2Health").innerHTML = health2;

}

// lets player 1 select dice if appropriate
function allowSelection() {
	// attack dice player 1
	atkDiceId.addEventListener("click", function() {
		if(turn==username1 && stage!=1 && stage!=4 ){
			if(stage==2) {
				// can deselect
				if(selected==atkDiceId){
					selected.style.border="0px"
					selected = null
					document.getElementById("rollButtonId").innerHTML = "SKIP"
				}
				else{
					document.getElementById("rollButtonId").innerHTML = "RE-ROLL"
					selected = atkDiceId
					dfsDiceId.style.border = "0px"
					atkDiceId.style.border = "5px solid #000000"
				}
			}
			//stage 3
			else{
				selected = atkDiceId
				dfsDiceId.style.border = "0px"
				atkDiceId.style.border = "5px solid #000000"
           		}
	      }
	})
	// defense dice player 1
	dfsDiceId.addEventListener("click", function() {
		if(turn==username1 && stage!=1 && stage!=4 ){
			if(stage==2){
				// can deselect
				if(selected==dfsDiceId){
					selected.style.border="0px"
					selected = null
					document.getElementById("rollButtonId").innerHTML = "SKIP"
				}
				else{
					selected = dfsDiceId
					dfsDiceId.style.border = "5px solid #000000"
					atkDiceId.style.border = "0px"
					document.getElementById("rollButtonId").innerHTML = "RE-ROLL"
				}
			}
			// stage 3
			else{
				selected = dfsDiceId
				dfsDiceId.style.border = "5px solid #000000"
				atkDiceId.style.border = "0px"
			}
		}
	})
}

// lets player 2 select dice if appropriate
function allowSelection2(){
	// player 2 attack dice
	atkDiceId2.addEventListener("click", function() {
		if(turn==username2 && stage!=1 && stage!=4){
			if(stage==2){
				// can deselect 
				if(selected==atkDiceId2){
					selected.style.border="0px"
					selected = null
					document.getElementById("rollButtonId2").innerHTML = "SKIP"
				}
				else{
					document.getElementById("rollButtonId2").innerHTML = "RE-ROLL"
					selected = atkDiceId2
					dfsDiceId2.style.border = "0px"
					atkDiceId2.style.border = "5px solid #000000"
				}
			}
			else{
				selected = atkDiceId2
				dfsDiceId2.style.border = "0px"
				atkDiceId2.style.border = "5px solid #000000"
			}
		}
	})
	// player 2 defense dice
	dfsDiceId2.addEventListener("click", function() {
		if(turn==username2 && stage!=1 && stage!=4){
			if(stage==2){
				// can deselect 
				if(selected==dfsDiceId2){
					selected.style.border="0px"
					selected = null
					document.getElementById("rollButtonId2").innerHTML = "SKIP"
				}
				else{
					document.getElementById("rollButtonId2").innerHTML = "RE-ROLL"
					selected = dfsDiceId2
					dfsDiceId2.style.border = "5px solid #000000"
					atkDiceId2.style.border = "0px"
				}
			}
			else{
				selected = dfsDiceId2
				dfsDiceId2.style.border = "5px solid #000000"
				atkDiceId2.style.border = "0px"
			}
		}
	})

}

// hideButtons will be deleted because game will be deleted after ending
// players will be sent back to homepage instead (after a pop-up)
function hideButtons(){
	document.getElementById("rollButtonId").style.display = "none";
	document.getElementById("rollButtonId2").style.display = "none";
}

// player plays the game
function playerAction(){
	// stage 1 = initial rolls
	if (stage == 1) {
		rollAttack();
		rollDefense();

		document.getElementById("instructionsId").innerHTML = "Select one die to re-roll (or skip)"
		document.getElementById("rollButtonId").innerHTML = "SKIP"
		document.getElementById("rollButtonId2").innerHTML = "SKIP"

		stage = 2
    }

	// stage 2 = select one dice to re-roll
	else if (stage == 2) {
		if(turn == username1){
			if (selected == dfsDiceId) {
				rollDefense()
				dfsDiceId.style.border = "0px"
			}
			else if (selected == atkDiceId) {
				rollAttack()
				atkDiceId.style.border = "0px"
			}

			document.getElementById("rollButtonId").innerHTML = "+2"
		}
		else{
			if (selected == dfsDiceId2) {
				rollDefense()
				dfsDiceId2.style.border = "0px"
            }
			else if (selected == atkDiceId2) {
				rollAttack()
				atkDiceId2.style.border = "0px"
			}
			document.getElementById("rollButtonId2").innerHTML = "+2"
        }

		selected = null
		stage = 3
        document.getElementById("instructionsId").innerHTML = "Select one die to +2"
    }
	// stage 3 = select one dice to +2
    else if (stage == 3) {
		if (selected == null) {
			alert("please select dice") // maybe change to pop-up?
		}
		else{
			// player 1's turn
			if(turn==username1){
				if (selected == atkDiceId) {
					attackNum1+=2
					atkDiceId.src = `css/images/dd${attackNum1}.jpeg`
					atkDiceId.style.border = "0px"
                }
				else{
					defenseNum1 += 2
                			dfsDiceId.src = `css/images/dd${defenseNum1}.jpeg`
					dfsDiceId.style.border = "0px"
				}
				diceReady1 = true
				document.getElementById("rollButtonId").innerHTML = "END"
			}
			// player 2's turn
			else{
				if (selected == atkDiceId2) {
					attackNum2 += 2
					atkDiceId2.src = `css/images/dd${attackNum2}.jpeg`
					atkDiceId2.style.border = "0px"
                		}
                		else{
					defenseNum2 += 2
					dfsDiceId2.src = `css/images/dd${defenseNum2}.jpeg`
					dfsDiceId2.style.border = "0px"
				}
				diceReady2 = true
				document.getElementById("rollButtonId2").innerHTML = "END"
			}
			stage = 4
			document.getElementById("instructionsId").innerHTML = "End turn"
		}
			selected = null
    }
	// stage 4 = after player ends turn
	else if (stage == 4){
		// checks if battle ready
		if(diceReady1 && diceReady2){
			healthChange()
			refreshButtons()
			refreshDice()
			diceReady1 = false
			diceReady2 = false
			document.getElementById("instructionsId").innerHTML = "Roll dice "+turn // need database (username)
		}
		// battle not ready
		else{
			// player 1's turn
			if(turn==username1){
				alert("player 2's turn now") // change to pop-up

				document.getElementById("instructionsId").innerHTML = "Roll dice "+username2;
				document.getElementById("rollButtonId").style.display = "none";
				document.getElementById("rollButtonId2").innerHTML = "ROLL"
				turn = username2;
				totalTurns = totalTurns+1
				// player 1 ends their turn
				/* db update the following values (PUT)
					player1Health 
					player2Health
					player1Attack
					player1Defense
					turn = *opponent user name*
				*/
				/*
				xmlhttp.onerror = function(){alert("Error!")}
				xmlhttp.onload = function(){
				}
				*/
				let xhr = new XMLHttpRequest();

				let updated = {
					player1Health: health1,
					player2Health: health2,
					player1Attack: attackNum1,
					player1Defense: defenseNum1,
					player2Attack: attackNum2,

          player2Defense: defenseNum2,

					turn: username2,
					gameId: gameID,
					totalturns: totalTurns
				}

				xhr.onload = function(){

                    console.log(this.responseText)
                }


				xhr.open("POST","http://35.231.124.196/updategame1?"+queryObjectToString(updated));
				//xhr.setRequestHeader('Content-type', 'application/json');
				xhr.send();

			}
			// player 2's turn
			else{
				alert("player 1's turn now")  // change to pop-up
				document.getElementById("instructionsId").innerHTML = "Roll dice "+username1
				document.getElementById("rollButtonId2").style.display = "none";
				document.getElementById("rollButtonId").innerHTML = "ROLL"
				turn = username1;
				totalTurns = totalTurns + 1;

				// player 2 ends their turn
				/* db update the following values (PUT)
					player1Health 
					player2Health
					player2Attack
					player2Defense
					turn = *opponent user name*
				*/
				let xhr = new XMLHttpRequest();


                let updated = {
                    player1Health: health1,
                    player2Health: health2,
                    player1Attack:0,
                    player1Defense:0,
                    player2Attack: attackNum2,
                    player2Defense: defenseNum2,
                    turn: username1,
                    gameId: gameID,
                    totalturns:totalTurns
                }

                xhr.open("POST","http://35.231.124.196/updategame2?"+queryObjectToString(updated));
                //xhr.setRequestHeader('Content-type', 'application/json');
                xhr.onload = function(){
                    console.log(this.responseText)
                }
                xhr.send();
                xhr.send();

			}
		}

		// if game ends
		if(health1<=0 && health2<=0){ 
			hideButtons();
			alert("Game ends in a draw!")
			document.getElementById("instructionsId").innerHTML = "Game is a draw!"
			document.getElementById("p1Health").innerHTML = 0;
			document.getElementById("p2Health").innerHTML = 0;
		}

		else if (health1<=0) {
		
            // tryCatch = upon death, revive player with 5 hp
            if (powerups1.tryCatch) {
                health1 = 5
                powerups1.tryCatch = false
            }
            else {
                hideButtons();
                alert("Player 2 wins!") // replace with username and make pop-up
                document.getElementById("instructionsId").innerHTML = "Player 2 wins!" // replace with username
                document.getElementById("p1Health").innerHTML = 0;
            }
		}
		else if (health2<=0){

            // tryCatch = upon death, revive player with 5 hp
            if (powerups2.tryCatch) {
                health2 = 5
                powerups2.tryCatch = false
            }
            else {
                hideButtons();
                alert("Player 1 wins!"); // replace with username and make pop-up
                document.getElementById("instructionsId").innerHTML = "Player 1 wins!" // replace with username
                document.getElementById("p2Health").innerHTML = 0;
            }

		}
		else{
			stage = 1;
		}

		/* db
			player table update gamesPlayed and gamesWon
			delete game instance
		*/
    }

}



//for onclick function that brings the user back home
function backHome(){
	localStorage.removeItem('gameID');
	location.href="home.html";

};



function queryObjectToString(query) {
    let properties = Object.keys(query);
    let arrOfQuesryStrings = properties.map(prop => prop+"="+query[prop]);
    return(arrOfQuesryStrings.join('&'));
 }

allowSelection();
allowSelection2();

document.getElementById("rollButtonId").addEventListener("click",playerAction)
document.getElementById("rollButtonId2").addEventListener("click",playerAction)

//document.getElementById("instructionsId").innerHTML = "Roll dice Player 1" // db username
document.getElementById("BackHome").addEventListener("click",backHome)
