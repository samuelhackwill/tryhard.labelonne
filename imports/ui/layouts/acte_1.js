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

export const Acte1Beaten = new ReactiveVar(false);

Template.acte_1.onCreated(function () {
  this.state = new ReactiveVar("initial");
  // one of
  // > initial
  // > displayPasUnRobot
  // > displayCaptcha
  // > terminal
  this.level = new ReactiveVar(1);
  // one of
  // > 1
  // > 2
  // > 3
  // > 4
  // > 5
});

Template.acte_1.onRendered(function () {
  const instance = Template.instance();
  Tracker.autorun(() => {
    if (ContinuerBeaten.get() == true) {
      instance.state.set("displayPasUnRobot");
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
          setTimeout(
            () => {
              console.log(this);
              // increment level or else terminate act
              if (instance.level.get() == "5") {
                Acte1Beaten.set(true);
              } else {
                instance.level.set(instance.level.get() + 1);
              }

              // reinitialize components state
              PasUnRobotBeaten.set(false);
              ContinuerBeaten.set(false);
              CaptchaBeaten.set(false);
              instance.state.set("initial");
              Index.set(0);
            },
            1000,
            Template.instance()
          );
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
    const instance = Template.instance();
    const name = "lvl" + instance.level.get() + "Data";
    return window[name][Index.get()];
  },
  theCaptchaPlus() {
    const instance = Template.instance();
    const name = "lvl" + instance.level.get() + "Data";
    return {
      theCaptcha: window[name][Index.get()],
      initialDataLength: window[name].length,
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
