import "./scoreLogger.html";

import { index } from "../pages/game_captcha.js";

import { TotalKeyStrokes } from "./challenge.js";
import { TotalCompletedChars } from "./challenge.js";
import { State } from "../layouts/feed.js";

Template.scoreLogger.onCreated(function () {
  setTimeout(function () {
    document.getElementById("scoreLogger").classList.remove("opacity-0");
    document.getElementById("scoreLoggerPseudo").focus();
  }, 500);
});

Template.scoreLogger.helpers({
  getScore() {
    return index.get();
  },

  getPrecision() {
    return Math.round(
      (TotalCompletedChars.get() / TotalKeyStrokes.get()) * 100
    );
  },
});

Template.scoreLogger.events({
  "click #scoreLoggerSubmit"() {
    data = {};
    data.pseudo = document.getElementById("scoreLoggerPseudo").value;
    data.scoreCaptchas = index.get();
    data.scorePrecision = Math.round(
      (TotalCompletedChars.get() / TotalKeyStrokes.get()) * 100
    );

    Meteor.call("insertScore", data);

    document.getElementById("scoreLogger").classList.add("opacity-0");
    setTimeout(() => {
      State.set("finished");
    }, 1000);
  },
});
