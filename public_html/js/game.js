/* 0 = roll both |||| 1 = re-roll one dice |||| +2 one dice |||| end turn*/


let stage = 1
let dfsDiceId = document.getElementById("defenseDiceId")
let atkDiceId = document.getElementById("attackDiceId")
let selected = null
let attackNum = 0
let defenseNum = 0

let dfsDiceId2 = document.getElementById("defenseDiceId2")
let atkDiceId2 = document.getElementById("attackDiceId2")
let selected2 = null
let attackNum2 = 0
let defenseNum2 = 0


let health1 = 20;
let health2 = 20;

document.getElementById("p1Health").innerHTML = health1;
document.getElementById("p2Health").innerHTML = health2;

// turn is 0 if its player 1's turn, 1 otherwise
let turn = 0;

document.getElementById("rollButtonId").style.display = "block";
document.getElementById("rollButtonId2").style.display = "none";

function refreshDice(){
	atkDiceId.src = `css/images/dd0.jpeg`
	dfsDiceId.src = `css/images/dd0.jpeg`

	atkDiceId2.src = `css/images/dd0.jpeg`
	dfsDiceId2.src = `css/images/dd0.jpeg`
}

function rollDefense() {
	if(turn==0){
		defenseNum = Math.floor(Math.random() * 6) + 1;
		dfsDiceId.src = `css/images/dd${defenseNum}.jpeg`
	}
	else{
		defenseNum2 = Math.floor(Math.random() * 6) + 1;
		dfsDiceId2.src = `css/images/dd${defenseNum2}.jpeg`
	}

}

function rollAttack() {
	if(turn==0){
		attackNum = Math.floor(Math.random() * 6) + 1;
		atkDiceId.src = `css/images/dd${attackNum}.jpeg`;
        }
        else{
		attackNum2 = Math.floor(Math.random() * 6) + 1;
                atkDiceId2.src = `css/images/dd${attackNum2}.jpeg`;
        }
}

function healthChange(){
	change1 = attackNum2-defenseNum
	change2 = attackNum-defenseNum2

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


function allowSelection() {
	atkDiceId.addEventListener("click", function() {
		if(turn==0 && stage!=1 && stage!=4 ){
			if(stage==2 && selected==atkDiceId)
			{
				selected.style.border="0px"
				selected = null
			}
			else{
                                selected = atkDiceId
                                dfsDiceId.style.border = "0px"
                                atkDiceId.style.border = "5px solid #000000"
           		}
	      }
	 })
        dfsDiceId.addEventListener("click", function() {
                if(turn==0 && stage!=1 && stage!=4 ){
			if(stage==2 && selected==dfsDiceId)
			{
				selected.style.border="0px"
				selected = null
			}
			else{
		                selected = dfsDiceId
                                dfsDiceId.style.border = "5px solid #000000"
                                atkDiceId.style.border = "0px"
			}
             	}
	  })
}
function allowSelection2(){
        atkDiceId2.addEventListener("click", function() {
		if(turn==1 && stage!=1 && stage!=4){
			if(stage==2 && selected==atkDiceId2){
				selected.style.border="0px"
				selected = null
			}
			else{
                		selected = atkDiceId2
                       		dfsDiceId2.style.border = "0px"
                        	atkDiceId2.style.border = "5px solid #000000"
			}
		}
	})
        dfsDiceId2.addEventListener("click", function() {
                if(turn==1 && stage!=1 && stage!=4){
			if(stage==2 && selected==dfsDiceId2){
				selected.style.border="0px"
				selected = null
			}
			else{
		       		selected = dfsDiceId2
                        	dfsDiceId2.style.border = "5px solid #000000"
                       		atkDiceId2.style.border = "0px"
			}
		}
        })

}


function pTurn(){
        if (stage == 1) {
                rollAttack();
                rollDefense();

                document.getElementById("instructionsId").innerHTML = "Select one die to re-roll (or skip)"
                stage = 2
        }
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
                	else {
                    		alert("skipped re-roll")
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
                        else {
                        	alert("skipped re-roll")

                        }

			document.getElementById("rollButtonId2").innerHTML = "+2"
                }
		selected = null
		stage = 3
                document.getElementById("instructionsId").innerHTML = "Select one die to +2"
        }
        else if (stage == 3) {
                if (selected == null) {
                        alert("please select dice")
                }
		else{
			if(turn==0){
				if (selected == atkDiceId) {
                        		attackNum+=2
                        		atkDiceId.src = `css/images/dd${attackNum}.jpeg`
					atkDiceId.style.border = "0px"
                		}
				else{
					defenseNum += 2
                        		dfsDiceId.src = `css/images/dd${defenseNum}.jpeg`
					dfsDiceId.style.border = "0px"
				}
				document.getElementById("rollButtonId").innerHTML = "END"
			}
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
				document.getElementById("rollButtonId2").innerHTML = "END"
			}
			stage = 4
			document.getElementById("instructionsId").innerHTML = "End turn"
		}

                selected = null
        }
	else{

                if(turn==0){
			alert("player 2's turn now")
                        turn=1
                        document.getElementById("instructionsId").innerHTML = "Roll dice Player 2"
			document.getElementById("rollButtonId").style.display = "none";
			document.getElementById("rollButtonId2").style.display = "block";
			document.getElementById("rollButtonId2").innerHTML = "ROLL"
                }
                else{
			alert("player 1's turn now")
                        turn=0
                        document.getElementById("instructionsId").innerHTML = "Roll dice Player 1"
			document.getElementById("rollButtonId").style.display = "block";
                        document.getElementById("rollButtonId2").style.display = "none";
			document.getElementById("rollButtonId").innerHTML = "ROLL"

			healthChange()

			refreshDice()
                }
		if(health1<=0)
		{
			alert("Player 2 wins!")
			document.getElementById("p1Health").innerHTML = 0;
		}
		else if(health2<=0){
			alert("Player 1 wins!");
			document.getElementById("p2Health").innerHTML = 0;
		}
		else{
                	stage = 1;
		}

        }

}


allowSelection();
allowSelection2();

document.getElementById("rollButtonId").addEventListener("click",pTurn)
document.getElementById("rollButtonId2").addEventListener("click",pTurn)



document.getElementById("instructionsId").innerHTML = "Roll dice Player 1"
// update instruction text


/*
elem.addEventListener("click", function() {
    alert("test")
    console.log("test")

})


const elem = document.getElementById("rollButtonID");
console.log(elem)


/*
const rollButton = document.querySelector(".rollButton");
rollButton.addEventListener("click", rollDice); */
