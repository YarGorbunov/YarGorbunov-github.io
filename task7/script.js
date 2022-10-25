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

function count(){
    let select = document.getElementById("product-type");
    let amount = document.getElementById("amount-2");
    let result = document.getElementById("result-2");
    result.innerHTML="";
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

function change() {
    let select = document.getElementById("product-type");
    let amount = document.getElementById("amount-2");
    let result = document.getElementById("result-2");
    result.innerHTML="";
    amount.style.display="block";
    let sizelabel=document.querySelectorAll("label.radio");
    let checkboxlabel=document.querySelector("label.checkbox");
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

let arr=new Array();
let pages=new Array(8);
function sliderResize(){
    if (arr.length===0 || document.documentElement.clientWidth>=576 && arr.length!=4 || document.documentElement.clientWidth<576 && arr.length!=8){
    if(document.documentElement.clientWidth>=576){
        let m=4;
        let n=4;
        arr.length=m;
        for(let i=0;i<arr.length;i++){
            arr[i]=new Array(n);
            for(let j=0;j<arr[i].length;j++){
                arr[i][j]=document.getElementById("sliderImg-"+(n*i+j+1));
                if (i===0) arr[i][j].style.display="block";
                else arr[i][j].style.display="none";
            }
        }
    }else {
        let m=8;
        let n=2;
        arr.length=m;
        for(let i=0;i<arr.length;i++){
            arr[i]=new Array(n);
            for(let j=0;j<arr[i].length;j++){
                arr[i][j]=document.getElementById("sliderImg-"+(n*i+j+1));
                if (i===0) arr[i][j].style.display="block";
                else arr[i][j].style.display="none";
            }
        }
    }
    for(let i=0;i<pages.length;i++){
        if (i<arr.length) pages[i].style.display="block";
        else pages[i].style.display="none";
    }
    pages[0].checked=true;
    }
}

function sliderToLeft(){
    let active;
    for(let i=0;i<arr.length;i++)
        if (arr[i][0].style.display==="block"){
            active=i;
            break;
        }
    arr[active].forEach(function(el){el.style.display="none";});
    active--;
    if(active===-1) active+=arr.length;
    arr[active].forEach(function(el){el.style.display="block";});
    pages[active].checked=true;
}

function sliderToRight(){
    let active;
    for(let i=0;i<arr.length;i++)
        if (arr[i][0].style.display==="block"){
            active=i;
            break;
        }
    arr[active].forEach(function(el){el.style.display="none";});
    active++;
    if(active===arr.length) active=0;
    arr[active].forEach(function(el){el.style.display="block";});
    pages[active].checked=true;
}

function pageChange(page){
    let active;
    for(let i=0;i<arr.length;i++)
        if (arr[i][0].style.display==="block"){
            active=i;
            break;
        }
    arr[active].forEach(function(el){el.style.display="none";});
    arr[page].forEach(function(el){el.style.display="block";});
}

window.addEventListener("DOMContentLoaded", function () {
    let button = document.getElementById("calcbutton");
    button.addEventListener("click", calc);
    let select = document.getElementById("product-type");
    select.addEventListener("change", change);
    let amount = document.getElementById("amount-2");
    amount.addEventListener("input", count);
    let size=document.querySelectorAll("label.radio input");
    size.forEach(function(size1){ size1.addEventListener("change", count);});
    let checkbox=document.querySelector("label.checkbox input");
    checkbox.addEventListener("change", count);
    window.addEventListener("resize",sliderResize);
    let buttonLeft = document.getElementById("button-left");
    buttonLeft.addEventListener("click",sliderToLeft);
    let buttonRight = document.getElementById("button-right");
    buttonRight.addEventListener("click",sliderToRight);
    let pager=document.getElementById("pager");
    pages=pager.querySelectorAll("input");
    pages.forEach(function(button, page){button.addEventListener("change", function(){pageChange(page);} );});
    sliderResize();
});