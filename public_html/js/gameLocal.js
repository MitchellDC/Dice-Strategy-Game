/* goals and notes */
// change dfsDiceId and atkDiceId (append1)
// change alerts to pop-ups (player turn ends)
// make code for if player loads in game and it isn't their turn
/* end goals and notes */

// powerups balancing
recursionAttacks = 2
hackValue = 3
tryCatchValue = 5
antiMalwareThreshold = 4
powerOutletValue = 2
cyberSecurityValue = 3
fullStackValue = 8
windowsUpdateValue = 1

// debuffs balancing
syntaxErrorValue = 5
ransomwareValue = 15
lowBatteryValue = 2
infiniteLoopValue = 1
bugChance = 0.2 // if Math.random() is below this number, attack or defense will be 0

// powerups & debuffs counters
slowComputerCount1 = 2
computerVirusCount1 = 2

slowComputerCount2 = 2
computerVirusCount2 = 2


firewallCount = 2

let descriptions = {
	// powerups 
	antiMalware: `Make defense at least ${antiMalwareThreshold} each turn`,
	binarySearch: "Halve opponent's health next turn",
	ciphertext: "Enemy can't see your attack value", // need test
	cyberSecurity: `Every turn, gain ${cyberSecurityValue} extra defense`,
	firewall: `Become immune for ${firewallCount} turns`, // need test
	fullStack: `Set attack and defense to ${fullStackValue} next turn`,
	hack: `Enemy loses ${hackValue} defense each turn`,
	powerOutlet: `Every turn, gain ${powerOutletValue} health`,
	reboot: "Restore health to maximum next turn",
	recursion: "Damage dealt becomes value of an extra attack",
	tryCatch: "Avoid death once",
	typeCast: "Heal instead of hurting next turn",
	windowsUpdate: `+${windowsUpdateValue} attack, defense, and health each turn`,
	
	
	// debuffs
	blueScreen: "Cannot attack or defend next turn", 
	bug: "Sometimes, attack or defense is 0",
	computerVirus: `Cannot defend for ${computerVirusCount1} turns`,
	infiniteLoop: `Defend for ${infiniteLoopValue} forever`, 
	lowBattery: `Every turn, lose ${lowBatteryValue} health`,
	ransomware: `50% chance to lose ${ransomwareValue} health next turn`,
	slowComputer: `Cannot attack for ${slowComputerCount1} turns`, 
	syntaxError: `Lose ${syntaxErrorValue} health next turn`

}

const gameID = localStorage.getItem('gameID');
const user = localStorage.getItem('username')
let enabledPowerups
let enabledDebuffs
let health1
let health2
let maxHealth
let username1
let username2


function getGameState(){
	let xmlhttp = new XMLHttpRequest();
	xmlhttp.onerror = function(){alert("AJAX Error!")};
	xmlhttp.onload = function(){
		if(this.status!=200){
			alert("Server Error!");
		}
		else {
			let resp = JSON.parse(this.responseText); //takes response from the server of the game data

			username1=resp[0].Player1_uname; //takes username of player 1
			username2=resp[0].Player2_uname; //takes username of player2

			health1=resp[0].Player1_Health;
			health2=resp[0].Player2_Health; //takes health of player1

			turn=resp[0].turn; //takes who's turn 
			totalTurns=resp[0].totalturns; //takes the number of turns in the game

			attackNum1=resp[0].Player1_attack; //takes the attacknum of player 1
			defenseNum1=resp[0].Player1_defense; // takes the defensenum of player 1

			attackNum2=resp[0].Player2_attack; //takes the attack dice value of player 2
            defenseNum2=resp[0].Player2_defense; // takes the defense dice value of player 2

			rulesetID = resp[0].Rule_ID;

			console.log(resp)
			initializeRule(resp)

			}
			// display instructions and turn count
			document.getElementById("instructionsId").innerHTML = "C:\\Game\\Instruction> Roll dice " + turn
			document.getElementById("turn").innerHTML = "turn: " +totalTurns

			// update dice images
			atkDiceId.src = "css/images/dd"+attackNum1+".jpeg"
			dfsDiceId.src = "css/images/dd"+defenseNum1+".jpeg"
			atkDiceId2.src = "css/images/dd"+attackNum2+".jpeg"
			dfsDiceId2.src = "css/images/dd"+defenseNum2+".jpeg"

			// hide and show buttons buttons
			if (turn == user) { 
				// current player has control
				if(turn==username1){ //shows player 1 button if the user in a device is player 2
					document.getElementById("rollButtonId").style.display = "block";
					document.getElementById("rollButtonId2").style.display = "none";
				}
				else{ //shows player 2 button if the user is player 2
					document.getElementById("rollButtonId").style.display = "none";
					document.getElementById("rollButtonId2").style.display = "block";
				}

			}
			// player sees no buttons
			else { 
				//hides buttons if it is not user's turn
				document.getElementById("rollButtonId").style.display = "none";
				document.getElementById("rollButtonId2").style.display = "none";

				//browser gets refreshed every 5 seconds if it is not user's turn
				setInterval(() => {
					location.reload();
				}, 999999); // change back to 5000
			}
			
			if (dfsDiceId.src != `http://104.196.1.169/css/images/dd0.jpeg`) {
				diceReady1 = true
			}

			if (dfsDiceId2.src != `http://104.196.1.169/css/images/dd0.jpeg`) {
				diceReady2 = true
			}


			getMaxHealth()

		}
	
	xmlhttp.open("GET","http://104.196.1.169/game?"+queryObjectToString({gameId:gameID})); 
	xmlhttp.send();
}

// get and displays max health
function getMaxHealth() {
	let xmlhttp = new XMLHttpRequest();
	xmlhttp.onerror = function(){alert("AJAX Error!")};
	xmlhttp.onload = function(){
		if(this.status!=200) {
			alert("Server Error!");
		}
	
		else {
			let ruleJSON = JSON.parse(this.responseText); //takes response from the server of the game data
			maxHealth = ruleJSON[0].InitialHealth
			document.getElementById("p1Health").innerHTML = username1 + " (" + health1 + "/" + maxHealth + ")";
			document.getElementById("p2Health").innerHTML = username2 + " (" + health2 + "/" + maxHealth + ")";
			
		}
	}	

	xmlhttp.open("GET","http://104.196.1.169/rule?"+queryObjectToString({ruleID:rulesetID})); 
	xmlhttp.send();

}
// should only run when turns = 0
function initializeRule(resp) {
	enabledPowerups = []
	enabledDebuffs = []

	// initial
	document.getElementById("p1Health").innerHTML = username1 + " (" + health1 + "/" + maxHealth + ")";
	document.getElementById("p2Health").innerHTML = username2 + " (" + health2 + "/" + maxHealth + ")";

	let xmlhttp = new XMLHttpRequest();
	xmlhttp.onerror = function(){alert("AJAX Error!")};
	xmlhttp.onload = function(){
		if(this.status!=200){
			alert("Server Error!");
		}
		else{
			let ruleJSON = JSON.parse(this.responseText); //takes response from the server of the game data
			ruleObj = ruleJSON[0]
			ruleKeys = Object.keys(ruleObj)
			ruleLength = Object.keys(ruleObj).length

			// CREATES ENABLED ITEMS
			// adds all enabled powerups to "enabledPowerups" array (16 = number of powerups + 3)
			for(let i = 3; i < 16; i++) {
				if (ruleObj[ruleKeys[i]]) {
					enabledPowerups.push(ruleKeys[i])
				}
			}

			// enabled debuffs
			for(let i = 16; i < ruleLength; i++) {
				if (ruleObj[ruleKeys[i]]) {
					enabledDebuffs.push(ruleKeys[i])
				}
			}

			populateItems(enabledPowerups, enabledDebuffs, resp)
			
		}
	}	


	xmlhttp.open("GET","http://104.196.1.169/rule?"+queryObjectToString({ruleID:rulesetID})); 
	xmlhttp.send();
}

getGameState()

let powerups1 = {}
let powerups2 = {}
let debuffs1 = {}
let debuffs2 = {}

function populateItems(enabledPowerups, enabledDebuffs, resp) {
	console.log(enabledPowerups)
	console.log(enabledDebuffs)
	console.log(resp[0])

	for (let i = 0; i < enabledPowerups.length; i++){
		tmp = (enabledPowerups[i] + "1").toString()
		console.log(tmp)
		console.log(typeof tmp)
		console.log(typeof resp[0])
		console.log(typeof resp[0].recursion1)
		console.log(resp[0].tmp)
		console.log(resp[0].recursion1)
		if (resp[0].tmp == true) {
			console.log("tmp sliced: " + tmp.slice(0, -1))
			powerups1[tmp.slice(0, -1)] = true
			console.log("added" + tmp.slice(0, -1) + "to powerups1" )
			console.log(powerups1)
		}
	}
}

function queryObjectToString(query) {
    let properties = Object.keys(query);
    let arrOfQuesryStrings = properties.map(prop => prop+"="+query[prop]);
    return(arrOfQuesryStrings.join('&'));
 }

// debuffs objects
let player1CurrentItems = []
let player2CurrentItems = []

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

let attackNum1
let defenseNum1
let attackNum2
let defenseNum2
let change1
let change2
health1 = maxHealth;
health2 = maxHealth;
let totalTurns = 0;

let randomPowerupKey1
let randomPowerupKey2
powerupFreq = 3
debuffFreq = 5

let turn = ""; // db key "turn" with value of player's username
/*
	turn = 0> player 1's turn
	turn = 1> player 2's turn
*/

document.getElementById("rollButtonId2").style.display = "none";

/* front-end only, is true when a player's dice are completely rolled and ready for battle
is true after ending turn */
let diceReady1 = false; 
let diceReady2 = false;

// add event listeners to the popup "SELECET" buttons
document.getElementById("confirm1").addEventListener("click", addPowerupLeft)
document.getElementById("confirm2").addEventListener("click", addPowerupRight)
document.getElementById("confirm3").addEventListener("click", addDebuffLeft)
document.getElementById("confirm4").addEventListener("click", addDebuffRight)

// display initial powerups (should be none by default)
updatePowerups(1)
updatePowerups(2)

/* addPowerupLeft activated once they click on powerup pop-up button
for the left powerup */
function addPowerupLeft() {
	// makes random powerup true if they click on it

	if (turn == username1) {
		powerups1[randomPowerupKey1] = true
	}
	else {
		powerups2[randomPowerupKey1] = true
	}

	// pop-up disappears
	document.getElementById("select").classList.toggle("active")
	document.getElementById("select2").classList.toggle("active")

	// add powerup to table
	updatePowerups(1)
	updatePowerups(2)

}

// same as function above, but for the right
function addPowerupRight() {

	if (turn == username1) {
		powerups1[randomPowerupKey2] = true
	}
	else {
		powerups2[randomPowerupKey2] = true
	}
	document.getElementById("select").classList.toggle("active")
	document.getElementById("select2").classList.toggle("active")
	updatePowerups(1)
	updatePowerups(2)

}

/* addDebuffLeft activated once they click on debuff pop-up button
for the left debuff */
function addDebuffLeft() {

	if (turn == username1) { 
		debuffs1[randomDebuffKey1] = true
	}
	else {
		debuffs2[randomDebuffKey1] = true
	}

	document.getElementById("debuff1").classList.toggle("active")
	document.getElementById("debuff2").classList.toggle("active")
	updatePowerups(1)
	updatePowerups(2)

}

function addDebuffRight() {
	if (turn == username1) {
		debuffs1[randomDebuffKey2] = true
	}
	else {
		debuffs2[randomDebuffKey2] = true
	}

	document.getElementById("debuff1").classList.toggle("active")
	document.getElementById("debuff2").classList.toggle("active")
	updatePowerups(1)
	updatePowerups(2)

}

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

function itemCalculationsBefore() {

	// infinite loop = defend for 1 forever
	if (debuffs1.infiniteLoop) {
		defenseNum1 = 1
	}
	if (debuffs2.infiniteLoop) {
		defenseNum2 = 1
	}
	// full stack = make attack and defense 8 for one turn
	if (powerups1.fullStack) {
		attackNum1 = fullStackValue
		defenseNum1 = fullStackValue
		powerups1.fullStack = false
	}
	if (powerups2.fullStack) {
		attackNum2 = fullStackValue
		defenseNum2 = fullStackValue
		powerups2.fullStack = false
	}

    // computer virus = for two turns, make defense 0
    if (debuffs1.computerVirus) {
        defenseNum1 = 0
        computerVirusCount1 -= 1

        if (computerVirusCount1 <= 0) {
            debuffs1.computerVirus = false
            computerVirusCount1 = 2
        }

    }

    // slow computer = for two turns, make attack 0
    if (debuffs1.slowComputer) {
        attackNum1 = 0
        slowComputerCount1 -= 1

        if (slowComputerCount1 <= 0) {
            debuffs1.slowComputer = false
            slowComputerCount1 = 2
        }
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
	
    // hack = every turn, lower enemy defense by 4
    if (powerups1.hack) {
		let diff = defenseNum2 - hackValue
        
		if (diff < 0) {
			defenseNum2 = 0
		}
		else {
			defenseNum2 = diff
		}
    }
	if (powerups2.hack) {
        let diff = defenseNum1 - hackValue

		if (diff < 0) {
			defenseNum1 = 0
		}
		else {
			defenseNum1 = diff
		}
    }



	// cyber security = every turn, gain 2 extra defense
	if (powerups1.cyberSecurity) {
		defenseNum1 += cyberSecurityValue
	}
	if (powerups2.cyberSecurity) {
		defenseNum2 += cyberSecurityValue
	}

	// windows update = every turn, gain 1 attack, defense, and health
	if (powerups1.windowsUpdate) {
		attackNum1 += 1
		defenseNum1 += 1
		health1 += 1
	}
	if (powerups2.windowsUpdate) {
		attackNum2 += 1
		defenseNum2 += 1
		health2 += 1
	}

	// bug = 25% chance to have attack and/or defense be 0
	if (debuffs1.bug) {
		let attackChance = Math.random()
		let defenseChance = Math.random()

		if (defenseChance <= bugChance) {
			defenseNum1 = 0
		}
		if (attackChance <= bugChance) {
			attackNum1 = 0
		}

	}

	if (debuffs2.bug) {
		let attackChance = Math.random()
		let defenseChance = Math.random()

		if (defenseChance <= bugChance) {
			defenseNum2 = 0
		}
		if (attackChance <= bugChance) {
			attackNum2 = 0
		}

	}

	// anti-maleware = every turn, minimum value of defense is 4
	if ((powerups1.antiMalware) && (defenseNum1 < antiMalwareThreshold))  {
		defenseNum1 = 4

	}
	if ((powerups2.antiMalware) && (defenseNum2 < antiMalwareThreshold)) {
		defenseNum2 = 4
	}
	
	// blue screen, make attack/defense 0 for 1 turn
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
}

function itemCalculationsAfter() {
	// recursion = damage dealt becomes value of an extra attack
	if (powerups1.recursion) {
		change2 += (change2 - defenseNum2)
	}

	if (powerups2.recursion) {
		change1 += (change1 - defenseNum1)
	}

	// firewall = once, become immune
	if (powerups1.firewall) {
		change1 = 0
		powerups1.firewall = false
	}
	if (powerups2.firewall) {
		change2 = 0
		powerups1.firewall = false
	}

	// type cast = heal for damage you would have taken
	if (powerups1.typeCast) {
		health1 += change1
		change1 = 0
		powerups1.typeCast = false
	}
	if (powerups2.typeCast) {
		health2 += change2
		change2 = 0
		powerups2.typeCast = false

	}

	// binary search = reduce opponents health by half
	if (powerups1.binarySearch) {
		health2 = Math.round(health2 / 2)
		change2 = 0
		powerups1.binarySearch = false
	}
	if (powerups2.binarySearch) {
		health1 = Math.round(health2 / 2)
		change1 = 0
		powerups2.binarySearch = false
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
		let chance = Math.random()
		if (chance <= 0.5) {
			health1 -= ransomwareValue
		}
		debuffs1.ransomware = false
	}
	if (debuffs2.ransomware) {
		let chance = Math.random()
		if (chance <= 0.5) {
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
	if (powerups1.powerOutlet) {
		health1 += powerOutletValue

	}
	if (powerups2.powerOutlet) {
		health2 += powerOutletValue

	}

	// try catch = if going to die, negate attack and make health 5
	if ((powerups1.tryCatch) && (change1 > health1)) {
		change1 = 0
		health1 = 5
		powerups1.tryCatch = false
	}
	if ((powerups2.tryCatch) && (change2 > health2)) {
		change2 = 0
		health2 = 5
		powerups1.tryCatch = false
	}
}

// front-end calculations and powerup calculations
function healthChange() {

	itemCalculationsBefore()

	change1 = attackNum2 - defenseNum1
	change2 = attackNum1 - defenseNum2

	itemCalculationsAfter()

	// change health
	if(change1>0 ) {
		health1 -= change1
	}
	if (change2> 0) {
		health2 -= change2
	}

	// display health
	document.getElementById("p1Health").innerHTML = username1 + " (" + health1 + "/" + maxHealth + ")";
	document.getElementById("p2Health").innerHTML = username2 + " (" + health2 + "/" + maxHealth + ")";

	//update powerups after battle
	totalTurns = totalTurns + 1;
	updatePowerups(1)
	updatePowerups(2)
	//document.getElementById("round").innerHTML = ("Round: " + (totalTurns))

	/* SELECT POWERUP code
	check if the total number of turns is divisible by 3 and not equal to 0*/
	if (totalTurns % powerupFreq == 0 && (totalTurns != 0)){
		// if true pass powerup
		alert("Select a powerup :)")

		// get 2 random powerups
		powerupKeys = Object.keys(powerups1)
		randomPowerupKey1 = powerupKeys[Math.floor(Math.random() * powerupKeys.length)]
		randomPowerupKey2 = powerupKeys[Math.floor(Math.random() * powerupKeys.length)]
		
		// initialize variables to check validity
		let unique = true
		let alreadyHasLeft = false
		let alreadyHasRight = false
		let tries = 0

		if (randomPowerupKey1 == randomPowerupKey2)
			unique = false

		if (player1CurrentItems.includes(randomPowerupKey1))
			alreadyHasLeft = true

		if (player1CurrentItems.includes(randomPowerupKey2))
			alreadyHasRight = true

		/* ensure validity of popups (cannot be the same, and player doesn't have either option)
		will try 30 times until exiting */
		while (!unique || alreadyHasLeft || alreadyHasRight && (tries < 500)) {
			randomPowerupKey1 = powerupKeys[Math.floor(Math.random() * powerupKeys.length)]
			randomPowerupKey2 = powerupKeys[Math.floor(Math.random() * powerupKeys.length)]

			// cannot be the same
			if (randomPowerupKey1 == randomPowerupKey2) {
				unique = false
			}	
			else
				unique = true
	
			// player doesn't have either option
			if (player1CurrentItems.includes(randomPowerupKey1)) {
				alreadyHasLeft = true
			}
			else 
				alreadyHasLeft = false
	
			if (player1CurrentItems.includes(randomPowerupKey2)) {
				alreadyHasRight = true
			}
			else 
				alreadyHasRight = false

			tries += 1
			if (tries >= 50)
				console.log("exit loop after " +tries+ " tries")
		}

		// if the condition is true, toggle the popups
		// have to do this here to prevent async
	
		document.getElementById("select").classList.toggle("active")
		document.getElementById("select2").classList.toggle("active")
	
		// two random powerups selected from array of keys
		document.getElementById("rpower1").innerHTML = randomPowerupKey1
		document.getElementById("pdesc").innerHTML = descriptions[randomPowerupKey1]
		document.getElementById("rpower2").innerHTML = randomPowerupKey2
		document.getElementById("pdesc2").innerHTML = descriptions[randomPowerupKey2]

	}
	// check if the total number of turns is divisible by 5 and not equal to 0
	if (totalTurns % debuffFreq == 0 && totalTurns != 0){
		// if true pass debuff
		alert("Select a debuff :(")

		// get 2 random debuffs
		debuffKeys = Object.keys(debuffs1)
		randomDebuffKey1 = debuffKeys[Math.floor(Math.random() * debuffKeys.length)]
		randomDebuffKey2 = debuffKeys[Math.floor(Math.random() * debuffKeys.length)]

		let uniqueDebuff = true
		let alreadyHasLeftDebuff = false
		let alreadyHasRightDebuff = false
		let triesDebuff = 0

		if (randomDebuffKey1 == randomDebuffKey2)
			uniqueDebuff = false

		if (player1CurrentItems.includes(randomDebuffKey1))
			alreadyHasLeftDebuff = true

		if (player1CurrentItems.includes(randomDebuffKey2))
			alreadyHasRightDebuff = true

		/* ensure validity of popups (cannot be the same, and player doesn't have either option)
		will try 30 times until exiting */
		while (!uniqueDebuff || alreadyHasLeftDebuff || alreadyHasRightDebuff && (triesDebuff < 500)) {
			randomDebuffKey1 = debuffKeys[Math.floor(Math.random() * debuffKeys.length)]
			randomDebuffKey2 = debuffKeys[Math.floor(Math.random() * debuffKeys.length)]

			// cannot be the same
			if (randomDebuffKey1 == randomDebuffKey2) {
				uniqueDebuff = false
			}	
			else
				uniqueDebuff = true
	
			// player doesn't have either option
			if (player1CurrentItems.includes(randomDebuffKey1)) {
				alreadyHasLeftDebuff = true
			}
			else 
				alreadyHasLeftDebuff = false
	
			if (player1CurrentItems.includes(randomDebuffKey2)) {
				alreadyHasRightDebuff = true
			}
			else 
				alreadyHasRightDebuff = false

				triesDebuff += 1
			if (triesDebuff >= 500)
				console.log("exit debuff loop after " +triesDebuff+ " tries")
		}


		// if the condition is true, toggle the popups
		document.getElementById("debuff1").classList.toggle("active")
		document.getElementById("debuff2").classList.toggle("active")
	
		// two random powerups selected from array of keys
		document.getElementById("rdebuff1").innerHTML = randomDebuffKey1
		document.getElementById("ddesc").innerHTML = descriptions[randomDebuffKey1]
		document.getElementById("rdebuff2").innerHTML = randomDebuffKey2
		document.getElementById("ddesc2").innerHTML = descriptions[randomDebuffKey2]

	}
}

// updates powerup arrays
// is called after every battle and once during start of game
// clears all rows of powerups and rebuilds based on what is still true
function updatePowerups(player) {

	console.log(powerups1)
	console.log(powerups2)
	console.log(debuffs1)
	console.log(debuffs2)

	if (player == 1) {
		// clear all rows of powerup table
		for (let i = 0; i < player1CurrentItems.length; i++) {
			playerPowerupsTable.deleteRow(-1)
		}
		
		// clears current powerups array
		player1CurrentItems = []
		
		// iterate through all powerups, if true, add back to current powerups
		// this essentially filters out the values that turned false
		for (let field in powerups1) {

			if (powerups1[field]) {
				player1CurrentItems.push(field)
			}

		}
		for (let field in debuffs1) {
			if (debuffs1[field]) {
				player1CurrentItems.push(field)
			}

		}
		
		// display the true values in the table again
		for (let i = 0; i < player1CurrentItems.length; i++) {
			newRow = playerPowerupsTable.insertRow();
			nameColumn = newRow.insertCell(0)
			nameColumn.innerHTML = (player1CurrentItems[i] + "> " + descriptions[player1CurrentItems[i]])
		}
	}
	else if (player == 2) {
		// clear all rows of powerup table
		for (let i = 0; i < player2CurrentItems.length; i++) {
			enemyPowerupsTable.deleteRow(-1)
		}
		
		// clears current powerups array
		player2CurrentItems = []
		
		// iterate through all powerups, if true, add back to current powerups
		// this essentially filters out the values that turned false
		for (let field in powerups2) {

			if (powerups2[field]) {
				player2CurrentItems.push(field)
			}

		}
		for (let field in debuffs2) {
			if (debuffs2[field]) {
				player2CurrentItems.push(field)
			}

		}
		
		// display the true values in the table again
		for (let i = 0; i < player2CurrentItems.length; i++) {
			newRow = enemyPowerupsTable.insertRow();
			nameColumn = newRow.insertCell(0)
		
			nameColumn.innerHTML = (player2CurrentItems[i] + "> " + descriptions[player2CurrentItems[i]])
		}
	}



}




	// html display
	/*
	if (player == 1) {
		for (let i = 0; i < player1CurrentPowerups.length; i++) {
			newRow = playerPowerupsTable.insertRow();
			nameColumn = newRow.insertCell(0)
			durationColumn = newRow.insertCell(1)
		
			nameColumn.innerHTML = (arr[i] + "> " + descriptions[arr[i]])
			durationColumn.innerHTML = ""
		
		}
	}
	else if (player == 2) {
		for (let i = 0; i < arr.length; i++) {
			newRow = enemyPowerupsTable.insertRow();
			nameColumn = newRow.insertCell(0)
		
			nameColumn.innerHTML = (arr[i] + "> " + descriptions[arr[i]])
			
		}

	}*/


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
					atkDiceId.style.border = "5px solid #00aa00"
				}
			}
			//stage 3
			else{
				selected = atkDiceId
				dfsDiceId.style.border = "0px"
				atkDiceId.style.border = "5px solid #00aa00"

           	}
	      }
	})
	// defense dice player 1
	dfsDiceId.addEventListener("click", function() {
		if(turn==username1 && stage!=1 && stage!=4 ){
			if(stage==2){
				// can deselect
				if(selected==dfsDiceId){
					selected.style.border="3px"
					selected = null
					document.getElementById("rollButtonId").innerHTML = "SKIP"
				}
				else{
					selected = dfsDiceId
					dfsDiceId.style.border = "5px solid #00aa00"
					atkDiceId.style.border = "0px"
					document.getElementById("rollButtonId").innerHTML = "RE-ROLL"
				}
			}
			// stage 3
			else{
				selected = dfsDiceId
				dfsDiceId.style.border = "5px solid #00aa00"
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
					atkDiceId2.style.border = "3px solid #00aa00"
				}
			}
			else{
				selected = atkDiceId2
				dfsDiceId2.style.border = "0px"
				atkDiceId2.style.border = "3px solid #00aa00"

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
					dfsDiceId2.style.border = "3px solid #00aa00"
					atkDiceId2.style.border = "0px"
				}
			}
			else{
				selected = dfsDiceId2
				dfsDiceId2.style.border = "3px solid #00aa00"
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

		document.getElementById("instructionsId").innerHTML = "C:\\Game\\Instruction> Re-roll one die (or skip)"
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
        document.getElementById("instructionsId").innerHTML = "C:\\Game\\Instruction> Select one die to +2"
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
			document.getElementById("instructionsId").innerHTML = "C:\\Game\\Instruction> End turn..."
		}
			selected = null
    }
	// stage 4 = after player ends turn
	else if (stage == 4){
		// display new turns
		document.getElementById("turn").innerHTML = "turn: " + totalTurns

		// checks if battle ready
		if(diceReady1 && diceReady2){
			healthChange()
			refreshButtons()
			refreshDice()
			diceReady1 = false
			diceReady2 = false
			document.getElementById("instructionsId").innerHTML = "C:\\Game\\Instruction> Roll dice " + turn // need database (username)
			
		}
		// battle not ready
		else{
			// ending player 1's turn
			if(turn==username1){

				turn = username2
				document.getElementById("instructionsId").innerHTML = "C:\\Game\\Instruction> Roll dice " + username2
				document.getElementById("rollButtonId").style.display = "none";
				document.getElementById("rollButtonId2").style.display = "none";
				document.getElementById("rollButtonId2").innerHTML = "ROLL"
				document.getElementById("turn").innerHTML = "turn: " + totalTurns
				let xhr = new XMLHttpRequest();
				let updated = {
					player1Health: health1,
					player2Health: health2,
					player1Attack: attackNum1,
					player1Defense: defenseNum1,
					player2Attack: attackNum2,
                    player2Defense: defenseNum2,
					turn: turn,
					gameId: gameID,
					totalturns: totalTurns
					// also do all powerups
				}

				xhr.onerror = function() {
					console.log("ajax error")
				}
				xhr.onload = function(){
                    console.log(this.responseText)
                }

				xhr.open("POST","http://104.196.1.169/updategame1?"+queryObjectToString(updated));
				//xhr.setRequestHeader('Content-type', 'application/json');
				xhr.send();

				
			}
			// ending player 2's turn
			else{

				turn = username1
				document.getElementById("instructionsId").innerHTML = "C:\\Game\\Instruction> Roll dice " + username1
				document.getElementById("rollButtonId").style.display = "none";
				document.getElementById("rollButtonId2").style.display = "none";
				document.getElementById("rollButtonId").innerHTML = "ROLL"

				let xhr = new XMLHttpRequest();
				let updated = {
					player1Health: health1,
					player2Health: health2,
					player1Attack: attackNum1,
					player1Defense: defenseNum1,
					player2Attack: attackNum2,
                    player2Defense: defenseNum2,
					turn: turn,
					gameId: gameID,
					totalturns: totalTurns
					// also do all powerups
				}

				xhr.onerror = function() {
					console.log("ajax error")
				}
				xhr.onload = function(){
                    console.log(this.responseText)
                }

				xhr.open("POST","http://104.196.1.169/updategame2?"+queryObjectToString(updated));
				//xhr.setRequestHeader('Content-type', 'application/json');
				xhr.send();

			}
		}

		// if game ends
		// draw
		if(health1<=0 && health2<=0){ 
			hideButtons();
			alert("Game ends in a draw!")
			document.getElementById("instructionsId").innerHTML = "Game is a draw!"
			document.getElementById("p1Health").innerHTML = 0;
			document.getElementById("p2Health").innerHTML = 0;
		}
		//player 2 wins
		else if(health1<=0)
		{

			hideButtons();
			alert("Player 2 wins!") // replace with username and make pop-up
			document.getElementById("instructionsId").innerHTML = "Player 2 wins!" // replace with username
			document.getElementById("p1Health").innerHTML = 0;
		
		
		}
		// player 1 wins
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

function backHome() {
	window.open("http://104.196.1.169/home.html","_self");

}

allowSelection();
allowSelection2();

document.getElementById("BackHome").addEventListener("click", backHome)
document.getElementById("rollButtonId").addEventListener("click",playerAction)
document.getElementById("rollButtonId2").addEventListener("click",playerAction)

 // db username
