export class User{
    constructor(name){
        this.name = name ;
        if( window.localStorage[name] == undefined)
             window.localStorage.setItem(name,0);
       
    }
    getLastScroe(){
        return window.localStorage[this.name];
    }
}