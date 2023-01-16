import { Utility } from "./utility.js";
import { Bird } from "./Birds.js";
export class Boom {
  constructor() {
    this.boom = document.createElement("img");
    this.boom.src = "../images/boom.png";
    this.boom.style.width = "50px";
    this.boom.style.height = "50px";
    this.boom.style.position = "absolute";
    const body = document.querySelector("body");
    body.append(this.boom);
  }
  dropBoom() {
    let boomLeft = Math.floor(
      Math.random() * (window.innerWidth - parseInt(this.boom.style.width))
    );
    this.boom.style.left = `${boomLeft}px`;
    this.boom.style.top = "0px";
    this.boom.onclick = (e) => {
      let birds = document.querySelectorAll("img");
      let boomSurroundings = Utility.getSurroundings(e.target);
      boomSurroundings.left -= 100;
      boomSurroundings.right += 100;
      boomSurroundings.top -= 100;
      boomSurroundings.bottom += 100;
      for (let bird of birds) {
        let birdSurroundings = Utility.getSurroundings(bird);
        if (!this.#checkIfBirdsSurroundings(birdSurroundings, boomSurroundings))
          Bird.calculateScore(bird);
      }
    };
    let boomId = setInterval(() => {
      if (parseInt(this.boom.style.top) < window.innerHeight) {
        this.boom.style.top = `${parseInt(this.boom.style.top) + 5}px`;
      } else {
        clearInterval(boomId);
      }
    }, 100);
  }
  #checkIfBirdsSurroundings(birdSurroundings, boomSurroundings) {
    if (birdSurroundings.right < boomSurroundings.left) return true;
    if (birdSurroundings.left > boomSurroundings.right) return true;
    if (birdSurroundings.bottom < boomSurroundings.top) return true;
    if (birdSurroundings.top > boomSurroundings.bottom) return true;
    return false;
  }
}
