let myEmail = document.querySelector("#myEmail");
let myPassword = document.querySelector("#myPassword");
let userName = document.querySelector("#name");
let regestEmail = document.querySelector("#regestEmail");
let regestPassword = document.querySelector("#regestPassword");
let passCondition = document.querySelector(".pass-condition");
let nameCondition = document.querySelector(".name-condition");
let firstPage = document.querySelector(".first-page");
let secondPage = document.querySelector(".second-page");
let loginBtn = document.querySelector("#login");
let signBtn = document.querySelector("#sign");
let createAccount = document.querySelector(".createAccount");
let singOut = document.querySelector(".singOut");
let massegeExist = document.querySelector(".exist");
let helloPage = document.querySelector(".hello");
let sayHello = document.querySelector(".say-hello");
let haveAccount = document.querySelector(".haveAccount");


let information = [];


information = JSON.parse(localStorage.getItem("formsData")) || [];
let myName = JSON.parse(localStorage.getItem("myname"));
sayHello.innerHTML = "Hello " + myName;



signBtn.onclick = function(){
    if(validate(regestEmail , emailRegex) && validate(regestPassword , passwordRegex) && validate(userName , nameRegex)){
        let formData = {
            email : regestEmail.value,
            password: regestPassword.value,
            person: userName.value,
        }
        if(!checkData()){
            information.push(formData);
            localStorage.setItem("formsData" , JSON.stringify(information));
            clearForm();
            secondPage.classList.add("d-none");
            firstPage.classList.remove("d-none");
        }
    }
}


loginBtn.onclick = function() {
    if (signUp()) {
        firstPage.classList.add("d-none");
        clearForm();
        helloPage.classList.remove("d-none");
    }
};


function signUp(){
    for(let i = 0; i < information.length; i++){
        if(information[i].email ===  myEmail.value && information[i].password == myPassword.value){
            localStorage.setItem("myname" , JSON.stringify(information[i].person));
            sayHello.innerHTML = "Hello " + information[i].person;
            clearForm();
            return true;
        }
    }
}


function checkData() {
    for (let i = 0; i < information.length; i++) {
        if (information[i].email === regestEmail.value) {
            massegeExist.classList.remove("d-none");
            clearForm();
            return true; 
        }
    }
}



createAccount.onclick = function(){
    firstPage.classList.add("d-none");
    secondPage.classList.remove("d-none");
}


haveAccount.onclick = function(){
    secondPage.classList.add("d-none");
    firstPage.classList.remove("d-none");
}

singOut.onclick = function(){
    localStorage.removeItem("myname");
    helloPage.classList.add("d-none");
    firstPage.classList.remove("d-none");
}


function clearForm(){
    myEmail.value = "";
    myPassword.value = "";
    userName.value = "";
    regestEmail.value = "";
    regestEmail.classList.remove("is-valid");
    regestPassword.value = "";
    regestPassword.classList.remove("is-valid");
    userName.classList.remove("is-valid");
}


let emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
let passwordRegex = /^[A-Z][a-z]{3,}\d+/;
let nameRegex = /^[A-Z][a-z]{2,}\s[A-Z][a-z]{2,}/;


function validate(ele , regex){
   if(regex.test(ele.value)){
    ele.classList.add("is-valid");
    ele.classList.remove("is-invalid");
    return true;
   }else {
    ele.classList.remove("is-valid");
    ele.classList.add("is-invalid");
    return false;
}
}
regestEmail.oninput = function(){
    validate(regestEmail , emailRegex);
    massegeExist.classList.add("d-none");
    checkData();
}

regestPassword.oninput = function(){
    if (validate(regestPassword, passwordRegex)) {
        passCondition.classList.add("d-none"); 
    } else {
        passCondition.classList.remove("d-none"); 
    }
}

userName.oninput = function(){
    if(validate(userName , nameRegex)){
        nameCondition.classList.add("d-none");
    }else{
        nameCondition.classList.remove("d-none");
    }
}
