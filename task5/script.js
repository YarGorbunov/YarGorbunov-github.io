function calc() {
    let amount=document.getElementById("amount").value;
    let price=document.getElementById("price").value;
    let result=document.getElementById("result");
	if (amount=="" || price=="") {
        result.innerHTML = "Не пойдёт";
        result.style.color="#dc3545";
    }
    else if ((amount.match(/\D/) || price.match(/\D/)) === null) {
        result.innerHTML = amount*price;
        result.style.color="#2718dc";
    }
    else {
        result.innerHTML = "Не пойдёт";
        result.style.color="#dc3545";
    }
	/*
	if (amount*price==="" || isNaN(amount*price) || amount==="" || price===""){
		result.innerHTML = "Не пойдёт";
        result.style.color="#dc3545";
	} else {
		result.innerHTML = amount*price;
        result.style.color="#2718dc";
	}
	*/
}

window.addEventListener("DOMContentLoaded", function () {
    let button = document.getElementById("calcbutton");
    button.addEventListener("click", calc);
});
