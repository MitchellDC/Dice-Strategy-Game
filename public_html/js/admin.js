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
}



document.addEventListener("DOMContentLoaded" , function () {
	let signoutB = document.getElementById("signout");
	signoutB.addEventListener("click", signout); 

});

function signout() {
	location.href = "login.html"; 
}
