/* goals and notes */
// change dfsDiceId and atkDiceId (append1)
// change alerts to pop-ups (player turn ends)
// make code for if player loads in game and it isn't their turn
/* end goals and notes */

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
let maxHealth = 30 // ADMIN changes this
let attackNum1 = 0 // db player1Attack
let defenseNum1 = 0 // db player1Defense
let attackNum2 = 0 // db player2Attack
let defenseNum2 = 0 // db player2Defense
let health1 = maxHealth; // db player1Health
let health2 = maxHealth; // db player2Health
let totalTurns = 0;


let player1Powerups = []
let player1Debuffs = []
let player2Powerups = []
let player2Debuffs = []

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
    ransomware: true // once, 50% chance to lose 10 health

}

let debuffNames = {
	syntaxError: "Syntax Error",
	lowBattery: "Low Battery",
	blueScreen: "Blue Screen",
	computerVirus: "Computer Virus",
	slowComputer: "Slow Computer",
	ransomware: "Ransomware"
}

let debuffDesc = {
	syntaxError: "Once, lose 5 health",
    lowBattery: "Every turn, lose 2 health",
    blueScreen: "Once, cannot attack or defend",
    computerVirus: "Two turns, cannot defend",
    slowComputer: "Two turns, cannot attack",
    ransomware:  "Once, 50% chance to lose 10 health"
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
    recursion: true, // every turn, do damage twice
    nonEthicalHacking: false, // every turn, lower enemy defense by 4
    tryCatch: false, // upon death, revive with 5 health
    antiMalware: false, // every turn, minimum defense is 4
    reboot: false, // once, restore all health
    recharge: true, // every turn, gain 2 health
    securitySpecialist: false, // every turn, gain 2 defense
    systemUpdate: true, // every turn, gain 1 attack, 1 defense, 1 health
    firewall: false // once, become immune

}

// map internal keys to user-friendly names
let powerupNames = {
	recursion: "Recursion",
	nonEthicalHacking: "Non-Ethical Hacking",
	tryCatch: "Try-Catch",
	antiMalware: "Anti-Malware",
	reboot: "Reboot",
	recharge: "Recharge",
	securitySpecialist: "Security Specialist",
	systemUpdate: "System Update",
	firewall: "Firewall"
}

// powerup description
let powerupDescription = {
	recursion: "Every turn, do damage twice",
	nonEthicalHacking: "Every turn, lower enemy defense by 4",
	tryCatch: "Upon death, revive with 5 health",
	antiMalware: "Every turn, minimum defense is 4",
	reboot: "Once, restore all health",
	recharge: "Every turn, gain 2 health",
	securitySpecialist: "Every turn, gain 2 defense",
	systemUpdate: "Every turn, gain 1 attack, 1 defense, 1 health",
	firewall: "Once, become immune"
}

let powerups2 = {
    recursion: false,
    nonEthicalHacking: false,
    tryCatch: false,
    antiMalware: false,
    reboot: false,
    securitySpecialist: false,
    systemUpdate: false, 
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

document.getElementById("round").innerHTML = ("Round: " + (totalTurns))
document.getElementById("p1Health").innerHTML = "Proppa (" + health1 + " / " + maxHealth + ")";
document.getElementById("p2Health").innerHTML = "Frost (" + health2 + " / " + maxHealth + ")";
document.getElementById("rollButtonId").style.display = "block"; // shows button
document.getElementById("rollButtonId2").style.display = "none"; // hides button

// returns text of button to "ROLL" after a player ends turn
function refreshButtons(){
	document.getElementById("rollButtonId").innerHTML = "ROLL"
    document.getElementById("rollButtonId2").innerHTML = "ROLL"

}

// every three turns select from 2 powerups
function selectPower(powerNum){

	// get array of powerup keys
let powerupKeys = Object.keys(powerups1)

// get random key from array of powerup keys
let randomPowerupKey = powerupKeys[Math.floor(Math.random() * powerupKeys.length)]

// get corresponding powerup from key location and change name to user friendly name (SEE selectPower FOR DETAILS)
let randomPowerupNames = powerupNames[randomPowerupKey]

// get corresponding powerup description from key location and display under powerup name
let randomPowerupDesc = powerupDescription[randomPowerupKey]

// get another random powerup
let powerupKeys2 = Object.keys(powerups1)
let randomPowerupKey2 = powerupKeys2[Math.floor(Math.random() * powerupKeys2.length)]
let randomPowerupNames2 = powerupNames[randomPowerupKey2]
let randomPowerupDesc2 = powerupDescription[randomPowerupKey2]

	// if the condition is true, toggle the popups
	document.getElementById("select").classList.toggle("active")
	document.getElementById("select2").classList.toggle("active")
	// two random powerups selected from array of keys
	document.getElementById("rpower1").innerHTML = randomPowerupNames
	document.getElementById("pdesc").innerHTML = randomPowerupDesc
	document.getElementById("rpower2").innerHTML = randomPowerupNames2
	document.getElementById("pdesc2").innerHTML = randomPowerupDesc2

	// set the selected power-up to true based on the powerNum
	if (powerNum === 1) {
		// set the value for power-up 1 to true
		randomPowerupKey = true;
	} else if (powerNum === 2) {
		// set the value for power-up 2 to true
		randomPowerupKey2 = true;
	}
}

function getDebuff(){

	let debuffKeys = Object.keys(debuffs1)
	let randomDebuffKey = debuffKeys[Math.floor(Math.random() * debuffKeys.length)]
	let randomDebuffName = debuffNames[randomDebuffKey]
	let randomDebuffDesc = debuffDesc[randomDebuffKey]

	document.getElementById("debuff").classList.toggle("active")
	document.getElementById("rdebuff").innerHTML = randomDebuffName
	document.getElementById("ddesc").innerHTML = randomDebuffDesc
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
	if(turn==0){
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
	if(turn==0){
		attackNum1 = Math.floor(Math.random() * 6) + 1;
		atkDiceId.src = `css/images/dd${attackNum1}.jpeg`;
    }
    else{
		attackNum2 = Math.floor(Math.random() * 6) + 1;
        atkDiceId2.src = `css/images/dd${attackNum2}.jpeg`; 
    }
}

// front-end calculations
function healthChange() {

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
    // if (powerups1.recharge) {
    //     health1 += rechargeGain

    // }
    // if (powerups2.recharge) {
    //     health2 += rechargeGain

    // }

	if(change1>0)
	{   
		health1 = health1-change1
	}
	if (change2>0) {
		health2 = health2-change2
	}

	document.getElementById("p1Health").innerHTML = "Proppa (" + health1 + " / " + maxHealth + ")";
	document.getElementById("p2Health").innerHTML = "Frost (" + health2 + " / " + maxHealth + ")";

	totalTurns = totalTurns + 1;
	document.getElementById("round").innerHTML = ("Round: " + (totalTurns))

	// check if the total number of turns is divisible by 3 and not equal to 0
	if (totalTurns % 3 == 0 && totalTurns != 0){
		alert("Select A Powerup 😎")
		selectPower()
	}

	if (totalTurns % 5 == 0 && totalTurns != 0){
		alert("You got a random disadvantage ☠️")
		getDebuff()
	}
}

// updates powerup arrays
function updatePowerups(object, arr) {

	for (let field in object) {
		if (object[field]) {
			arr.push(field)

		}
	}

	for (let i = 0; i < arr.length; i++) {
		newRow = playerPowerupsTable.insertRow();
		nameColumn = newRow.insertCell(0)
		durationColumn = newRow.insertCell(1)
	
		nameColumn.innerHTML = arr[i]
		durationColumn.innerHTML = ""
	
	}

}

updatePowerups(debuffs1, player1Debuffs)
updatePowerups(powerups1, player1Powerups)


// lets player 1 select dice if appropriate
function allowSelection() {
	// attack dice player 1
	atkDiceId.addEventListener("click", function() {
		if(turn==0 && stage!=1 && stage!=4 ){ 
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
		if(turn==0 && stage!=1 && stage!=4 ){
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
		if(turn==1 && stage!=1 && stage!=4){
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
		if(turn==1 && stage!=1 && stage!=4){
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
		if(turn == 0){
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
			if(turn==0){
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
			document.getElementById("instructionsId").innerHTML = "Roll dice Player "+(turn+1) // need database (username)
		}
		// battle not ready
		else{
			// player 1's turn
			if(turn==0){
				alert("player 2's turn now") // change to pop-up
				
				document.getElementById("instructionsId").innerHTML = "Roll dice Player 2"
				document.getElementById("rollButtonId").style.display = "none";
				document.getElementById("rollButtonId2").style.display = "block";
				document.getElementById("rollButtonId2").innerHTML = "ROLL"
				turn = 1
				// player 1 ends their turn
				/* db update the following values (PUT)
					player1Health 
					player2Health
					player1Attack
					player1Defense
					turn = *opponent user name*
				*/
			}
			// player 2's turn
			else{
				alert("player 1's turn now")  // change to pop-up
				
				document.getElementById("instructionsId").innerHTML = "Roll dice Player 1"
				document.getElementById("rollButtonId").style.display = "block";
				document.getElementById("rollButtonId2").style.display = "none";
				document.getElementById("rollButtonId").innerHTML = "ROLL"
				turn = 0
				// player 2 ends their turn
				/* db update the following values (PUT)
					player1Health 
					player2Health
					player2Attack
					player2Defense
					turn = *opponent user name*
				*/
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
		else if(health1<=0)
		{
			hideButtons();
			alert("Player 2 wins!") // replace with username and make pop-up
			document.getElementById("instructionsId").innerHTML = "Player 2 wins!" // replace with username
			document.getElementById("p1Health").innerHTML = 0;
		}
		else if(health2<=0){
			hideButtons();
			alert("Player 1 wins!"); // replace with username and make pop-up
			document.getElementById("instructionsId").innerHTML = "Player 1 wins!" // replace with username
			document.getElementById("p2Health").innerHTML = 0;
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

allowSelection();
allowSelection2();

document.getElementById("rollButtonId").addEventListener("click",playerAction)
document.getElementById("rollButtonId2").addEventListener("click",playerAction)

document.getElementById("instructionsId").innerHTML = "Roll dice Player 1" // db username
