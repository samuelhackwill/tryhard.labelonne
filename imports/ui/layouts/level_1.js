import "./level_1.html";
import "../components/continuer.js";
import "../components/pasUnRobot.js";
import "../components/captcha.js";
import "../components/challenge.js";
import "../../api/captchas/captchas.js";

import { PasUnRobotBeaten } from "../components/pasUnRobot.js";
import { ContinuerBeaten } from "../components/continuer.js";
import { CaptchaBeaten } from "../components/challenge.js";

export let Index = new ReactiveVar(0);

Template.level_1.onCreated(function () {
  this.state = new ReactiveVar("initial");
  // one of
  // > initial
  // > acteI
  // > acteII
  // > acteIII
});

Template.level_1.onRendered(function () {
  const instance = Template.instance();
  Tracker.autorun(() => {
    if (ContinuerBeaten.get() == true) {
      instance.state.set("acteI");
    }
    if (PasUnRobotBeaten.get() == true) {
      instance.state.set("acteII");
    }
    if (CaptchaBeaten.get() == true) {
      const fadeElements = ["challenge", "captcha", "pasUnRobot"];
      const fadeDuration = 1000;
      // make the animations
      for (let index = 0; index < fadeElements.length; index++) {
        setTimeout(() => {
          document
            .getElementById(fadeElements[index])
            .classList.add("opacity-0");
        }, index * fadeDuration);
      }
      document
        .getElementById("pasUnRobot")
        .addEventListener("animationend", (event) => {
          const instance = Template.instance();
          instance.state.set("acteIII");
        });
    }
    console.log("state of level 1 ", instance.state.get());
  });
});

Template.level_1.helpers({
  isState(name) {
    const instance = Template.instance();
    return instance.state.get() == name;
  },
  theCaptcha() {
    // if (Index.get() >= initialData.length) {
    //   var aurevoir = aurevoirs.shift();
    //   var adjectif = moreAdjectifs.shift();
    //   return aurevoir + " " + adjectif;
    // }
    return initialData[Index.get()];
  },
  theCaptchaPlus() {
    return {
      theCaptcha: initialData[Index.get()],
      initialDataLength: initialData.length,
    };
  },
});

Template.level_1.events({
  "click .pageContainer"() {
    const instance = Template.instance();
    if (instance.state.get() == "acteII") {
      document.getElementsByClassName("challengeInput")[0].focus();
    } else {
      return;
    }
  },
});
