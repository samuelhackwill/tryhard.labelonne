import "./level_1.html";
import "../components/continuer.js";
import "../components/pasUnRobot.js";
import "../components/captcha.js";

import { PasUnRobotBeaten } from "../components/pasUnRobot.js";
import { ContinuerBeaten } from "../components/continuer.js";

Template.level_1.onCreated(function () {
  this.state = new ReactiveVar("initial");
  // one of
  // > initial
  // > acteI
  // > acteII
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
    console.log("state of level 1 ", instance.state.get());
  });
});

Template.level_1.helpers({
  state(name) {
    console.log(name);
    const instance = Template.instance();
    return instance.state.get() == name;
  },
});
