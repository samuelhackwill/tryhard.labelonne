import "./challenge.html";

import { index } from "../pages/game_captcha.js";
import { State } from "../layouts/feed.js";

export const TotalKeyStrokes = new ReactiveVar(0);
export const TotalCompletedChars = new ReactiveVar(0);

Template.challenge.onCreated(function () {
  this.hasInteracted = new ReactiveVar(false);
});

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
    // console.log(
    //   "typing ",
    //   e.originalEvent.key,
    //   " at position ",
    //   e.currentTarget.value.length + 1
    // );
    // console.log("checking for ", this[e.currentTarget.value.length]);

    if (e.originalEvent.key == this[e.currentTarget.value.length]) {
      document.getElementById("challengeStatus").innerHTML = "✅ ";
    } else {
      document.getElementById("challengeStatus").innerHTML = "❎ ";
    }

    TotalKeyStrokes.set(TotalKeyStrokes.get() + 1);
  },

  "keyup .challengeInput"(e) {
    const instance = Template.instance();

    if (!instance.hasInteracted.get()) {
      startCounter();
    }
    captchaLength = this.length;
    inputLength = e.currentTarget.value.length;
    if (inputLength >= captchaLength) {
      if (e.currentTarget.value == this) {
        e.currentTarget.value = "";
        index.set(index.get() + 1);
        TotalCompletedChars.set(TotalCompletedChars.get() + this.length);
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
    if (State.get() != "playing") {
      return 0;
    } else {
      return 1;
    }
  },
});
