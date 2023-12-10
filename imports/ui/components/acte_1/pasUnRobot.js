import "./pasUnRobot.html";

export const PasUnRobotBeaten = new ReactiveVar(false);

import { CaptchaBeaten } from "./challenge.js";

import { Acte1Beaten } from "../../layouts/acte_1.js";

Template.pasUnRobot.onCreated(function () {
  this.hasInteracted = new ReactiveVar(false);
});

Template.pasUnRobot.onRendered(function () {
  setTimeout(() => {
    document.getElementById("pasUnRobot").classList.remove("opacity-0");
  }, 50);
});

Template.pasUnRobot.helpers({
  isItActeII() {
    return Acte1Beaten.get();
  },
  hasInteracted() {
    return PasUnRobotBeaten.get();
  },
  captchaBeaten() {
    return CaptchaBeaten.get();
  },
  showLevel() {
    if (this > 1) {
      return true;
    } else {
      return false;
    }
  },
  levelColor(level) {
    output = {
      1: "border-blue-500",
      2: "border-orange-500",
      3: "border-stone-500",
      4: "border-lime-500",
      5: "border-purple-500",
    };
    return output[level];

    // bg-blue-600
    // hover:bg-blue-800
    // active:ring-blue-300
    // text-white
  },
});

Template.pasUnRobot.events({
  "click input#pasUnRobot"() {
    PasUnRobotBeaten.set(true);

    const instance = Template.instance();
    instance.hasInteracted.set(true);
  },
});
