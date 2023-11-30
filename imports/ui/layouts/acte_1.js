import "./acte_1.html";
import "../components/acte_1/continuer.js";
import "../components/acte_1/pasUnRobot.js";
import "../components/acte_1/captcha.js";
import "../components/acte_1/challenge.js";
import "../../api/captchas/captchas.js";

import { PasUnRobotBeaten } from "../components/acte_1/pasUnRobot.js";
import { ContinuerBeaten } from "../components/acte_1/continuer.js";
import { CaptchaBeaten } from "../components/acte_1/challenge.js";

export let Index = new ReactiveVar(0);

export const ActeIBeaten = new ReactiveVar(false);

Template.acte_1.onCreated(function () {
  this.state = new ReactiveVar("initial");
  // one of
  // > initial
  // > displayPasUnRobot
  // > displayCaptcha
  // > terminal
  this.level = new ReactiveVar(1);
  // one of
  // 1
  // 2
  // 3
  // 4
  // 5
});

Template.acte_1.onRendered(function () {
  const instance = Template.instance();
  Tracker.autorun(() => {
    if (ContinuerBeaten.get() == true) {
      instance.state.set("dispalyPasUnRobot");
    }
    if (PasUnRobotBeaten.get() == true) {
      instance.state.set("displayCaptcha");
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
            console.log("BITE ", Acte1Beaten.get());
            Acte1Beaten.set(true);
            instance.state.set("terminal");
          }, 1000);
        });
    }
  });
});

Template.acte_1.helpers({
  isState(name) {
    const instance = Template.instance();
    return instance.state.get() == name;
  },
  theCaptcha() {
    return lvl1Data[Index.get()];
  },
  theCaptchaPlus() {
    return {
      theCaptcha: lvl1Data[Index.get()],
      initialDataLength: lvl1Data.length,
    };
  },
});

Template.acte_1.events({
  "click .pageContainer"() {
    const instance = Template.instance();
    if (instance.state.get() == "displayCaptcha") {
      document.getElementsByClassName("challengeInput")[0].focus();
    } else {
      return;
    }
  },
});
