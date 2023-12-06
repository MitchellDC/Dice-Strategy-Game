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

