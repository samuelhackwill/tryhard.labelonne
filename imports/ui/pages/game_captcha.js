import "./game_captcha.html";
import "../layouts/level_1.js";

import { State } from "../layouts/feed.js";

export let index = new ReactiveVar(0);

initialData = [
  "bonjour cryptique",
  "coucou hasardeux",
  "salut hypocrite",
  "hi! prudent",
  "kenavo sardonique",
  "hola honteux",
  "sayonara risqué",
  "shalom audacieux",
  "habile buongiorno",
];

aurevoirs = [
  "à bientôt",
  "a presto",
  "adieu",
  "arrivederci",
  "até logo",
  "au revoir",
  "auf wiedersehen",
  "bis bald",
  "cheerio",
  "ciao",
  "doei",
  "farewell",
  "goodbye",
  "hasta luego",
  "la revedere",
  "nos vemos",
  "pa",
  "salut",
  "see you later",
  "servus",
  "sudie",
  "szervusz",
  "szia",
  "take care",
  "tot ziens",
  "tschüss",
  "vaarwel",
];

moreBonjours = [
  "alo",
  "aye",
  "bom dia",
  "bonjour",
  "buenas",
  "buongiorno",
  "ciao",
  "coucou",
  "dag",
  "enchanté",
  "grüezi",
  "grüss gott",
  "guten tag",
  "haigh",
  "hallo",
  "hej",
  "hello",
  "hi",
  "hola",
  "hullo",
  "labas",
  "oi",
  "qué tal",
  "salut",
  "salve",
  "servus",
  "szia",
  "tja",
];

moreAdjectifs = [
  "amical",
  "apathique",
  "assertif",
  "blasé",
  "complexé",
  "confiant",
  "coupable",
  "cynique",
  "définitif",
  "déplacé",
  "désinvolte",
  "désolé",
  "discret",
  "déterminé",
  "dubitatif",
  "exagéré",
  "enchanté",
  "illégal",
  "impatient",
  "implacable",
  "indifférent",
  "intégré",
  "intéressé",
  "intrigué",
  "musical",
  "nostalgique",
  "persévérant",
  "pragmatique",
  "résolu",
  "romantique",
  "sceptique",
  "téméraire",
  "terminal",
  "tolérant",
  "truculent",
  "zélé",
];

Template.game_captcha.onCreated(function () {
  console.log(
    "has visited before? ",
    localStorage.getItem("visited") == "true"
  );

  shuffleArray(aurevoirs);
  shuffleArray(moreBonjours);
  shuffleArray(moreAdjectifs);

  if (localStorage.getItem("visited") == "true") {
    initialData = [];
    for (let index = 0; index < 10; index++) {
      var moreBonjour = moreBonjours.shift();
      var adjectif = moreAdjectifs.shift();
      initialData.push(moreBonjour + " " + adjectif);
    }
  }

  localStorage.setItem("visited", "true");
  console.log(this.data.finished);
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

Template.game_captcha.events({
  // "click .pageContainer"() {
  //   if (State.get() == "loggingScore") {
  //     return;
  //   } else {
  //     document.getElementsByClassName("challengeInput")[0].focus();
  //   }
  // },
});

clearData = function () {
  localStorage.removeItem("visited");
};

shuffleArray = function (array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};
