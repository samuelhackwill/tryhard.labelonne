import "./pasUnRobot.html";

export const PasUnRobotBeaten = new ReactiveVar(false);

import { CaptchaBeaten } from "./challenge.js";

Template.pasUnRobot.onCreated(function () {
  this.hasInteracted = new ReactiveVar(false);
});

Template.pasUnRobot.onRendered(function () {
  setTimeout(() => {
    document.getElementById("pasUnRobot").classList.remove("opacity-0");
  }, 50);
});

Template.pasUnRobot.helpers({
  hasInteracted() {
    return PasUnRobotBeaten.get();
  },
  captchaBeaten() {
    return CaptchaBeaten.get();
  },
});

Template.pasUnRobot.events({
  "click input#pasUnRobot"() {
    PasUnRobotBeaten.set(true);

    const instance = Template.instance();
    instance.hasInteracted.set(true);
  },
});
