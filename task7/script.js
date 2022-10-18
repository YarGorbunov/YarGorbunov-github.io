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
    let result = document.getElementById("result-2");
    result.innerHTML="";
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
        result.innerHTML=100*amount.value;
    } else if (select.value==='2'){
        if(size[0].checked===true) result.innerHTML=200*amount.value;
        else if(size[1].checked===true) result.innerHTML=300*amount.value;
    } else if (select.value==='3'){
        if(checkbox.checked===false) result.innerHTML=400*amount.value;
        else result.innerHTML=500*amount.value;
    }
}

window.addEventListener("DOMContentLoaded", function () {
    let button = document.getElementById("calcbutton");
    button.addEventListener("click", calc);
    let select = document.getElementById("product-type");
    select.addEventListener("change", function(){ count("change");});
    let amount = document.getElementById("amount-2");
    amount.addEventListener("input", function() { count("input");});
    let size=document.querySelectorAll("label.radio input");
    size.forEach(function(size1){ size1.addEventListener("change",function(){ count("input");});});
    let checkbox=document.querySelector("label.checkbox input");
    checkbox.addEventListener("change", function(){ count("input");});
});