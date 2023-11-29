import "./game_captcha.html";
import "../layouts/level_1.js";

export let index = new ReactiveVar(0);

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
  theCaptcha() {
    if (index.get() >= initialData.length) {
      var aurevoir = aurevoirs.shift();
      var adjectif = moreAdjectifs.shift();
      return aurevoir + " " + adjectif;
    }

    return initialData[index.get()];
  },
});
