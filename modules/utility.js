export class Utility{
    constructor(){
        if (new.target.name == "Utility") {
            throw new Error("You cannot create an instance of Abstract class"); 
            }
    }
    static validateUserName(userName){
        if(isNaN(Number(userName.trim()))  && userName.trim() != "")  return true
        else return false;
    }
    static getUserNameFromURL(href){
        return href.split('?')[1].split('=')[1].split("+").join(" ")
    }
    static getSurroundings(item){
        let left =parseInt(item.style.left);
        let right = parseInt(item.width + left);
        let top = parseInt(item.style.left);
        let bottom = parseInt(top + item.height);
        return {left,right,top,bottom}
    }
}
