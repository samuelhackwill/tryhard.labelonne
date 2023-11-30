import "./level_1.html";
import "../components/level1/continuer.js";
import "../components/level1/pasUnRobot.js";
import "../components/level1/captcha.js";
import "../components/level1/challenge.js";
import "../../api/captchas/captchas.js";

import { PasUnRobotBeaten } from "../components/level1/pasUnRobot.js";
import { ContinuerBeaten } from "../components/level1/continuer.js";
import { CaptchaBeaten } from "../components/level1/challenge.js";

export let Index = new ReactiveVar(0);

export const Level1Beaten = new ReactiveVar(false);

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
            .classList.remove("delay-300");

          document
            .getElementById(fadeElements[index])
            .classList.add("opacity-0");
        }, (index + 1) * fadeDuration);
      }
      document
        .getElementById("pasUnRobot")
        .addEventListener("transitionend", () => {
          setTimeout(() => {
            const instance = Template.instance();
            console.log("BITE ", Level1Beaten.get());
            Level1Beaten.set(true);
            instance.state.set("acteIII");
          }, 1000);
        });
    }
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
    return lvl5Data[Index.get()];
  },
  theCaptchaPlus() {
    return {
      theCaptcha: lvl5Data[Index.get()],
      initialDataLength: lvl5Data.length,
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
