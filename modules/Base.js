import { Utility } from "./utility.js";
let from = document.querySelector("#userName form")
let goButton = document.querySelector("#go");
let userName = document.querySelector("input[name = userName]");
let error = document.querySelector("#error")
goButton.onclick = function(e){
    e.preventDefault();
    if(Utility.validateUserName(userName.value)){
        error.classList.add("hideerror")
         from.submit()
    }
    else{
        error.classList.remove("hideerror")
    }
}
