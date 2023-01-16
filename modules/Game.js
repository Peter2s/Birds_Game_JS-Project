import { Utility } from "./utility.js";
import { User } from "./User.js";
import { Bird } from "./Birds.js";
import * as g from "./Main.js";
import { Boom } from "./Boom.js";
//start games
//single class
export class Game {
  #time;
  #user;
  #gameObject;
  constructor(htmlObj, time = 60) {
    this.#gameObject = htmlObj;
    this.#gameObject.score.innerHTML = 0;
    this.#gameObject.birdsKilled.innerHTML = 0;
    this.#time = time;
    this.#createUser();
    this.#setPlayerName();
  }
  get score() {
    return parseInt(this.#gameObject.score.innerHTML);
  }
  set score(value) {
    this.#gameObject.score.innerHTML = value;
  }
  get birdKilled() {
    return parseInt(this.#gameObject.birdsKilled.innerHTML);
  }
  set birdKilled(value) {
    this.#gameObject.birdsKilled.innerHTML = value;
  }

  startGame() {
    this.birdKilled = "0";
    this.score = "0";
    let starGameForm = document.querySelector(".popup");
    starGameForm.remove();
    this.#timer();
    let intervals = this.#generateBirds();
    setTimeout(() => {
      this.#endGame(intervals);
    }, (this.#time +1 ) * 1000);
  }
  #createUser() {
    let href = window.location.href;
    let user = new User(Utility.getUserNameFromURL(href));
    this.#user = user;
    this.#setPlayerName();
  }
  #setPlayerName() {
    let names = this.#gameObject.names;
    for (let name of names) {
      name.innerHTML = this.#user.name;
    }
    this.#gameObject.lastScore.innerHTML = this.#user.getLastScroe()
  }
  #generateBirds() {
    let cyan = setInterval(() => {
      let b = new Bird("cyan");
      b.fly();
    }, 1500);
    let brown = setInterval(() => {
      let b = new Bird("brown");
      b.fly();
    }, 4500);
    let white = setInterval(() => {
      let b = new Bird("white");
      b.fly();
      let boom = new Boom()
      boom.dropBoom()
    }, 10000);
    return { cyan, brown, white };
  }
  #timer() {
    let time = this.#time;
    let id = setInterval(() => {
      this.#gameObject.time.innerHTML = time;
      if (time > 0) {
        time--;
      } else clearInterval(id);
    }, 1000);
  }
  #endGame(birdsIntervals) {
    for (let prop in birdsIntervals) {
      clearInterval(birdsIntervals[prop]);
    }
    Bird.destory();
    window.localStorage[this.#user.name] = g.default.score;
    this.showPopup();
  }
  
  
  showPopup() {
    let div = document.createElement("div");
    div.classList.add("popup");
    let img = document.createElement("img");
    img.classList.add("popup_img");
    let status = document.createElement("h1");
    if (this.score > 50) {
      img.src = "../images/happy.png";
      status.innerText = "you are Win";
    } else {
      img.src = "../images/angry.png";
      status.innerText = "you are lose";
    }
    div.append(status);
    div.appendChild(img);
    let score = document.createElement("h1");
    score.innerHTML = `${this.score}`;
    div.append(score);
    let playAgain = document.createElement("button");
    playAgain.innerText = "play Again";
    playAgain.onclick = () => {
      g.default.startGame();
    };
    div.append(playAgain);
    document.querySelector("body").append(div);
  }
}
