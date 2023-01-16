import * as g from './Main.js';
export class Bird{
    #imgObject;
    constructor(type){
    let img = document.createElement("img");
    let body = document.querySelector("body");
    switch(type){
        case "cyan":
            img.src="../images/cyan.gif"
            img.style.width = "100px";
            img.style.height = "100px"
            break;
        case "brown":
            img.src="../images/brown.gif"
            img.style.width = "50px";
            img.style.height = "50px"
            break;
        case "white":
            img.src="../images/white.gif"
            img.style.width = "120px";
            img.style.height = "120px"
            break;
        default:
            throw "you can create bird from cyan - brown - white only";
    }
    img.type = type;
    img.style.left = "-100px";
    img.style.top = `${Math.floor(Math.random()*(window.innerHeight-parseInt(img.style.height)))}px`
    img.style.position = "absolute"
    this.#imgObject = img;
    this.#imgObject.onclick = (e)=>{
    let bird = e.target;
     Bird.calculateScore(bird);
    }
    body.append(img);
    }
    get imgObject(){return this.#imgObject}
    fly(container = window.innerWidth){
        let id = setInterval(()=>{
            let postion = parseInt(this.imgObject.style.left)
            if(  postion< container) {
                this.imgObject.style.left = `${postion += 10}px`;
            }
            else {
                this.#imgObject.remove();
                 clearInterval(id)
            }
        },100)
    }
    static calculateScore(bird){
        switch(bird.type){
            case "cyan":
                g.default.score += 5;
                g.default.birdKilled++;
              break;
            case "brown":
              g.default.score += 10;
              g.default.birdKilled++;
              break;
            case "white":
                g.default.score -= 10;
                g.default.birdKilled++;
              break;
          }
            bird.remove();
    }
    static destory(){
        let birds = document.querySelectorAll("img")
        for(let bird of birds){
            bird.remove();
        }
    }
  
        
}