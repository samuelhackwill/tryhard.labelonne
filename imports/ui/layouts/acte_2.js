import "./acte_2.html";

import "../components/acte_1/continuer.js";
import "../components/acte_1/pasUnRobot.js";
import "../components/acte_1/captcha.js";
import "../components/acte_1/challenge.js";

import "../components/acte_2/timer.js";
import "../components/acte_2/healthPoints.js";

import "../../api/captchas/captchasII.js";

import { PasUnRobotBeaten } from "../components/acte_1/pasUnRobot.js";
import { ContinuerBeaten } from "../components/acte_1/continuer.js";
import { CaptchaBeaten } from "../components/acte_2/healthPoints.js";
import { HealthPoints } from "../components/acte_2/healthPoints.js";
import { Dead } from "../components/acte_2/timer.js";

export let Index = new ReactiveVar(0);

export const Acte2Beaten = new ReactiveVar(false);

Template.acte_2.onCreated(function () {
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

Template.acte_2.onRendered(function () {
  const instance = Template.instance();
  Tracker.autorun(() => {
    if (ContinuerBeaten.get() == true) {
      instance.state.set("displayPasUnRobot");
    }
    if (PasUnRobotBeaten.get() == true) {
      instance.state.set("displayCaptcha");
    }
    if (CaptchaBeaten.get() == true || Dead.get() == true) {
      const fadeElements = [
        "timer",
        "healthPoints",
        "challenge",
        "captcha",
        "pasUnRobot",
      ];
      const fadeDuration = 500;
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
              if (HealthPoints.get() == 0) {
                HealthPoints.set(3);
              } else {
                // increment level or else terminate act
                if (instance.level.get() > 1) {
                  Acte2Beaten.set(true);
                } else {
                  instance.level.set(instance.level.get() + 1);
                }
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

Template.acte_2.helpers({
  isState(name) {
    const instance = Template.instance();
    return instance.state.get() == name;
  },
  theCaptchaLvl2() {
    const instance = Template.instance();
    const name = "lvl" + instance.level.get() + "DataII";
    return window[name][Index.get()];
  },
  theCaptchaPlusLvl2() {
    const instance = Template.instance();
    const name = "lvl" + instance.level.get() + "DataII";
    return {
      theCaptcha: window[name][Index.get()],
      initialDataLength: window[name].length,
      theLevel: instance.level.get(),
      theActe: 2,
    };
  },
  theLevel() {
    const instance = Template.instance();
    return instance.level.get();
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
