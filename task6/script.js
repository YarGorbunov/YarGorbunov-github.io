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
}

function count(event){
    let select = document.getElementById("product-type");
    let amount = document.getElementById("amount-2");
    amount.style.display="block";
    let sizelabel=document.querySelectorAll("label.radio");
    let checkboxlabel=document.querySelector("label.checkbox");
    if (event==="change") {
        if (select.value==='1'){
            sizelabel[0].style.display="none";
            sizelabel[1].style.display="none";
            checkboxlabel.style.display="none";
        } else if (select.value==='2'){
            sizelabel[0].style.display="block";
            sizelabel[1].style.display="block";
            checkboxlabel.style.display="none";
        } else if (select.value==='3'){
            sizelabel[0].style.display="none";
            sizelabel[1].style.display="none";
            checkboxlabel.style.display="block";
        }
        amount.value="";
    }
    if (amount.value==="" || isNaN(Number(amount.value))) return 0;
    let size=document.querySelectorAll("label.radio input");
    let checkbox=document.querySelector("label.checkbox input");
    if (select.value==='1'){
        
    } else if (select.value==='2'){

    } else if (select.value==='3'){

    }
}

window.addEventListener("DOMContentLoaded", function () {
    let button = document.getElementById("calcbutton");
    button.addEventListener("click", calc);
    let select = document.getElementById("product-type");
    select.addEventListener("change", function(){ count("change");});
    let amount = document.getElementById("amount-2");
    amount.addEventListener("input", function() { count("input");});
});