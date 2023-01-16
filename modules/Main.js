import { Game } from "./Game.js";
let startGame = document.querySelector(".popup button");
let time = document.querySelector(".time");
let score = document.querySelector(".score");
let names = document.querySelectorAll(".name");
let birdsKilled = document.querySelector(".birds");
let lastScore = document.querySelector(".lastscore")
let data ={time,score,names,birdsKilled,lastScore}
const game = new Game(data);
let gunAudio = new Audio('../audio/gun.mp3');

startGame.onclick = function () {
  game.startGame();
  window.onmousedown = function (e) {
    e.preventDefault()   
    gunAudio.play();
  };
};
export default game ;

