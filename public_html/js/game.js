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
let attackNum1 = 0 // db player1Attack
let defenseNum1 = 0 // db player1Defense
let attackNum2 = 0 // db player2Attack
let defenseNum2 = 0 // db player2Defense
let health1 = 20; // db player1Health
let health2 = 20; // db player2Health
let turn = 0; // db key "turn" with value of player's username
/*
	turn = 0 -> player 1's turn
	turn = 1 -> player 2's turn
*/

/* front-end only, is true when a player's dice are completely rolled and ready for battle
is true after ending turn */
let diceReady1 = false; 
let diceReady2 = false;

document.getElementById("p1Health").innerHTML = health1;
document.getElementById("p2Health").innerHTML = health2;
document.getElementById("rollButtonId").style.display = "block"; // shows button
document.getElementById("rollButtonId2").style.display = "none"; // hides button

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
function healthChange(){
	change1 = attackNum2 - defenseNum1 
	change2 = attackNum1 - defenseNum2

	if(change1>0)
	{
		health1 = health1-change1
	}
	if(change2>0){
		health2 = health2-change2
	}

	document.getElementById("p1Health").innerHTML = health1;
	document.getElementById("p2Health").innerHTML = health2;

}

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


//for onclick function that brings the user back home
function backHome(){
	location.href="home.html";

};



allowSelection();
allowSelection2();

document.getElementById("rollButtonId").addEventListener("click",playerAction)
document.getElementById("rollButtonId2").addEventListener("click",playerAction)

document.getElementById("instructionsId").innerHTML = "Roll dice Player 1" // db username
document.getElementById("BackHome").addEventListener("click",backHome)
