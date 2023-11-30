import "./challenge.html";

import { Index } from "../../layouts/acte_1.js";

export const TotalKeyStrokes = new ReactiveVar(0);
export const TotalCompletedChars = new ReactiveVar(0);
export const CaptchaBeaten = new ReactiveVar(false);

Template.challenge.onCreated(function () {
  this.wrongInput = new ReactiveVar(false);
  this.hasInteracted = new ReactiveVar(false);
});

Template.challenge.onRendered(function () {
  setTimeout(() => {
    document.getElementById("challenge").classList.remove("opacity-0");
  }, 50);
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
    const instance = Template.instance();

    if (
      e.originalEvent.key == this.theCaptcha[e.currentTarget.value.length] &&
      this.theCaptcha.startsWith(e.currentTarget.value)
    ) {
      document
        .getElementsByClassName("captchaLetter")
        [e.currentTarget.value.length].classList.add("translate-y-1");
      document.getElementById("challengeStatus").innerHTML = "✅ ";
      instance.wrongInput.set(false);
    } else {
      instance.wrongInput.set(true);
      document.getElementById("challengeStatus").innerHTML = "❎ ";
    }
    TotalKeyStrokes.set(TotalKeyStrokes.get() + 1);
  },

  "keyup .challengeInput"(e) {
    const instance = Template.instance();
    // if (!instance.hasInteracted.get()) {
    //   startCounter();
    // }
    captchaLength = this.theCaptcha.length;
    inputLength = e.currentTarget.value.length;

    console.log("prout", inputLength);

    for (let index = 0; index < inputLength; index++) {
      removeLetterAnimation = setTimeout(function () {
        document
          .getElementsByClassName("captchaLetter")
          [index]?.classList.remove("translate-y-1");
      }, 100);
    }

    if (inputLength >= captchaLength) {
      if (e.currentTarget.value == this.theCaptcha) {
        Index.set(Index.get() + 1);
        e.currentTarget.value = "";
        TotalCompletedChars.set(
          TotalCompletedChars.get() + this.theCaptcha.length
        );
        if (this.initialDataLength <= Index.get()) {
          CaptchaBeaten.set(true);
          Index.set(Index.get() - 1); // lol
        } else {
        }
      }
    }

    // check if we cleared the fault
    if (
      e.originalEvent.key == "Backspace" &&
      this.theCaptcha.startsWith(e.currentTarget.value)
    ) {
      instance.wrongInput.set(false);
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
  wrongInput() {
    const instance = Template.instance();
    instance.wrongInput.get();
    if (instance.wrongInput.get() == true) {
      return "bg-red-300";
    }
    return;
  },
  levelColor(obj) {
    output = {
      1: "border-blue-500",
      2: "border-orange-500",
      3: "border-stone-500",
      4: "border-lime-500",
      5: "border-purple-500",
    };
    return output[obj.theLevel];

    // bg-blue-600
    // hover:bg-blue-800
    // active:ring-blue-300
    // text-white
  },
});
