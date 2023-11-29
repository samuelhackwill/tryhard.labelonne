import "./game_captcha.html";
import "../layouts/level_1.js";
import "../layouts/level_2.js";

export let index = new ReactiveVar(0);

import { Level1Beaten } from "../layouts/level_1.js";

Template.game_captcha.onCreated(function () {
  // console.log(
  //   "has visited before? ",
  //   localStorage.getItem("visited") == "true"
  // );
  // shuffleArray(aurevoirs);
  // shuffleArray(moreBonjours);
  // shuffleArray(moreAdjectifs);
  // if (localStorage.getItem("visited") == "true") {
  //   initialData = [];
  //   for (let index = 0; index < 10; index++) {
  //     var moreBonjour = moreBonjours.shift();
  //     var adjectif = moreAdjectifs.shift();
  //     initialData.push(moreBonjour + " " + adjectif);
  //   }
  // }
  // localStorage.setItem("visited", "true");
  // console.log(this.data.finished);
});

Template.game_captcha.helpers({
  level1Beaten() {
    console.log(Level1Beaten.get());
    return Level1Beaten.get();
  },
});
