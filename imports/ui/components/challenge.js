import "./challenge.html";

import { Index } from "../layouts/level_1.js";

export const TotalKeyStrokes = new ReactiveVar(0);
export const TotalCompletedChars = new ReactiveVar(0);
export const Captcha1Beaten = new ReactiveVar(false);

Template.challenge.onCreated(function () {
  this.hasInteracted = new ReactiveVar(false);
});

Template.challenge.onRendered(function () {});

Template.challenge.events({
  "keydown .challengeInput"(e) {
    keyPress = e.originalEvent.key;
    if (keyPress.startsWith("Arrow")) {
      e.preventDefault();
      console.log(keyPress);
      return;
    }
  },

  "keydown .challengeInput"(e) {
    if (e.originalEvent.key == this.theCaptcha[e.currentTarget.value.length]) {
      document.getElementById("challengeStatus").innerHTML = "✅ ";
    } else {
      document.getElementById("challengeStatus").innerHTML = "❎ ";
    }
    TotalKeyStrokes.set(TotalKeyStrokes.get() + 1);
  },

  "keyup .challengeInput"(e) {
    console.log("this", this);
    const instance = Template.instance();
    // if (!instance.hasInteracted.get()) {
    //   startCounter();
    // }
    captchaLength = this.theCaptcha.length;
    inputLength = e.currentTarget.value.length;
    if (inputLength >= captchaLength) {
      if (e.currentTarget.value == this.theCaptcha) {
        e.currentTarget.value = "";
        Index.set(Index.get() + 1);
        TotalCompletedChars.set(
          TotalCompletedChars.get() + this.theCaptcha.length
        );
        if (this.initialDataLength <= Index.get()) {
          Captcha1Beaten.set(true);
        }
      }
    }
  },
});

startCounter = function () {
  const instance = Template.instance();

  instance.hasInteracted.set(true);

  timer = setInterval(function () {
    decs = document.getElementById("challengeTimerDecs").innerHTML;
    decCount = Number(decs) - 1;
    if (decCount < 1) {
      decCount = 99;
      secs = document.getElementById("challengeTimerSecs").innerHTML;
      secCount = Number(secs) - 1;
      if (secCount < 0) {
        clearInterval(timer);
        State.set("loggingScore");
        document.getElementById("challengeInput").value = "";
        document.getElementById("challengeTimerSecs").innerHTML = "00";
        document.getElementById("challengeTimerDecs").innerHTML = "00";
        return;
      }
      newSecs = String(secCount).padStart(2, "0");
      document.getElementById("challengeTimerSecs").innerHTML = newSecs;
    }
    newDecs = String(decCount).padStart(2, "0");
    document.getElementById("challengeTimerDecs").innerHTML = newDecs;
  }, 10);
};

Template.challenge.helpers({
  hider() {
    // if (State.get() != "playing") {
    //   return 0;
    // } else {
    //   return 1;
    // }
  },
});
