import "./challenge.html";

import { Index } from "../../layouts/acte_1.js";

export const TotalKeyStrokes = new ReactiveVar(0);
export const TotalCompletedChars = new ReactiveVar(0);
export const CaptchaBeaten = new ReactiveVar(false);

let isDamageable = true;

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
    const instance = Template.instance();

    dontValidate = ["Shift", "Enter", "Dead", "Escape", "Backspace"];
    if (dontValidate.includes(e.originalEvent.key)) {
      return;
    }

    // console.log(instance.lastKeyPress, e.originalEvent.key);

    // if (instance.lastKeyPress == "Dead") {
    //   console.log("holy shit that's a trema, don't validate!");
    // }

    if (
      e.originalEvent.key == this.theCaptcha[e.currentTarget.value.length] &&
      this.theCaptcha.startsWith(e.currentTarget.value)
    ) {
      document
        .getElementsByClassName("captchaLetter")
        [e.currentTarget.value.length].classList.add("translate-y-1");
      // document.getElementById("challengeStatus").innerHTML = "✅";
      instance.wrongInput.set(false);
      isDamageable = true;
    } else {
      instance.wrongInput.set(true);
      if (this.theActe == 2 && isDamageable) {
        dealDamage(1, Index.get());
      }
      isDamageable = false;
      // document.getElementById("challengeStatus").innerHTML = "❎";
    }
    TotalKeyStrokes.set(TotalKeyStrokes.get() + 1);
  },

  "keyup .challengeInput"(e) {
    // getting template context
    const instance = Template.instance();

    // we don't want to start the timer twice
    if (!instance.hasInteracted.get() && this.theActe == 2) {
      console.log("start counter");
      startCounter();
    }

    instance.hasInteracted.set(true);

    // we need to compare how much of the captcha
    // we've already typed with the captcha's length
    captchaLength = this.theCaptcha.length;
    inputLength = e.currentTarget.value.length;
    for (let index = 0; index < inputLength; index++) {
      // animation
      removeLetterAnimation = setTimeout(function () {
        document
          .getElementsByClassName("captchaLetter")
          [index]?.classList.remove("translate-y-1");
      }, 100);
    }

    if (inputLength >= captchaLength) {
      if (e.currentTarget.value == this.theCaptcha) {
        // word finished
        if (this.theActe == 2) {
          timerAddTime();
        }
        Index.set(Index.get() + 1);
        e.currentTarget.value = "";
        TotalCompletedChars.set(
          TotalCompletedChars.get() + this.theCaptcha.length
        );
        if (this.initialDataLength <= Index.get()) {
          // all words finished
          CaptchaBeaten.set(true);
          Index.set(Index.get() - 1); // lol
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
