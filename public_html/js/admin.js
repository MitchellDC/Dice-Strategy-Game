function editPopup() {
	let modal = document.getElementById("mymodal"); 
	let span = document.getElementsByClassName("close");
	modal.style.display = "block";
	span[0].onclick = function() {
		modal.style.display = "none";
	}
	window.onclick = function(event) {
		if (event.target == modal) {
			modal.style.display = "none";
		}
	}
}

function createPopup() {
	let modal = document.getElementById("createmodal"); 
	let span = document.getElementsByClassName("create_close");
	modal.style.display = "block";
	span[0].onclick = function() {
		modal.style.display = "none";
	}
	window.onclick = function(event) {
		if (event.target == modal) {
			modal.style.display = "none";
		}
	}

	let submit = document.getElementById("createform");
	submit.addEventListener("click", function(event) {
		event.preventDefault();


		let antiMalware = document.getElementById("antiMalware").checked;	
		let ciphertext = document.getElementById("ciphertext").checked;
		let firewall = document.getElementById("firewall").checked;
		let nonEthicalHacking = document.getElementById("nonEthicalHacking").checked;
		let reboot = document.getElementById("reboot").checked;
		let powerOutlet = document.getElementById("powerOutlet").checked;
		let recursion = document.getElementById("recursion").checked;
		let securitySpecialist = document.getElementById("securitySpecialist").checked;
		let tryCatch = document.getElementById("tryCatch").checked;
		let windowsUpdate = document.getElementById("windowsUpdate").checked;
		let fullStack = document.getElementById("fullStack").checked;
		let infiniteLoop = document.getElementById("infiniteLoop").checked;
		let bug = document.getElementById("bug").checked;
		let typeCast = document.getElementById("typeCast").checked;
		let binarySearch = document.getElementById("binarySearch").checked;

		let lowBattery = document.getElementById("lowBattery").checked;
		let blueScreen = document.getElementById("blueScreen").checked;
		let slowComputer = document.getElementById("slowComputer").checked;
		let computerVirus = document.getElementById("computerVirus").checked;
		let ransomware = document.getElementById("ransomware").checked;
		let syntaxError = document.getElementById("syntaxError").checked;


		let ruleName = document.getElementById("ruleName").value;
		let health = document.getElementById("health").value;

		if(ruleName){
			let xml = new XMLHttpRequest();
			xml.onerror=function(){alert("Create Error")}
			xml.onload=function(){
				let resp = this.responseText;
				console.log(resp)
				if(this.status==200){
					console.log(resp)
					if(resp=="found"){
						alert("Choose another ruleset name!");
						document.getElementById("ruleName").value="";
					}
					else if(resp=="created"){
						alert("Ruleset Created!");
						location.reload();
					}
				}
				else{
					alert("Error in creating ruleset")
				}
				

			}
			let rules = {
				antiMalware:antiMalware,
				ciphertext:ciphertext,
				firewall:firewall,
				nonEthicalHacking:nonEthicalHacking, 
				reboot:reboot,
				powerOutlet:powerOutlet,
				recursion:recursion, 
				securitySpecialist:securitySpecialist, 
				tryCatch:tryCatch, 
				windowsUpdate:windowsUpdate,
				fullStack:fullStack, 
				infiniteLoop:infiniteLoop, 
				bug:bug, 
				typeCast:typeCast,
				binarySearch:binarySearch,
				lowBattery:lowBattery,
				blueScreen:blueScreen,
				slowComputer:slowComputer,
				computerVirus:computerVirus,
				ransomware:ransomware,
				syntaxError:syntaxError,
				ruleName:ruleName,
				health:health
			}

			xml.open("GET","http://104.196.1.169/createrule?"+queryObjectToString(rules));
			xml.send();


		}
		
		else{
			alert("Type In Ruleset Name!")
			document.getElementById("ruleName").value="";

		}
	});
}



document.addEventListener("DOMContentLoaded" , function () {
	let signoutB = document.getElementById("signout");
	signoutB.addEventListener("click", signout); 

});

function signout() {
	location.href = "login.html"; 
}


function showRules(){
	let xml = new XMLHttpRequest();

	xml.onerror=function(){alert("Error in Showing Active Rulesets")}
	xml.onload=function(){
		let resp = JSON.parse(this.responseText);
		console.log(resp);
		/*
		let resp = [{Rule_ID:0, Ruleset_name:"rule1"}, {Rule_ID:1, Ruleset_name:"rule2"},
					{Rule_ID:2, Ruleset_name:"rule3"}]
		//let rules = document.getElementById("rules");*/
		let rules = document.getElementById("rules");

		for(rule in resp){
			newRow = rules.insertRow();

			col1=newRow.insertCell(0);
			col2=newRow.insertCell(1);


			ruleid = resp[rule].Rule_ID;
			col1.innerHTML=resp[rule].Ruleset_name;
			col2.innerHTML="Delete";

			col2.classList.add("col2");

			
			(function (ruleid) {
				col2.addEventListener("click", function () {
					deleteRule(ruleid);
				});
			})(ruleid);



		}


		
	}
	xml.open("GET","http://104.196.1.169/rules");
	xml.send()

}
showRules();

function deleteRule(ruleID){
	alert("Rule "+ruleID+" will be deleted")
	let xml = new XMLHttpRequest();
	xml.onerror=function(){}

	xml.onload=function(){
		let resp = this.responseText;
		console.log(resp);
		if(this.responseText=="deleted")
		{
			alert("Rule successfully deleted");
			location.reload();
		}
	}



	xml.open("GET","http://104.196.1.169/deleterule?"+queryObjectToString({ruleid:ruleID}));
	xml.send()
}

function queryObjectToString(query) {
    let properties = Object.keys(query);
    let arrOfQuesryStrings = properties.map(prop => prop+"="+query[prop]);
    return(arrOfQuesryStrings.join('&'));
 }
