import "./timer.html";
import { HealthPoints } from "./healthPoints";

export const Dead = new ReactiveVar(false);

Template.timer.onRendered(function () {
  setTimeout(() => {
    document.getElementById("timer").classList.remove("opacity-0");
  }, 50);
});

Template.timer.helpers({
  hider() {
    // if (State.get() != "playing") {
    //   return 0;
    // } else {
    //   return 1;
    // }
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
  },
});

startCounter = function () {
  timer = setInterval(function () {
    decs = document.getElementById("challengeTimerDecs").innerHTML;
    decCount = Number(decs) - 1;
    if (decCount < 1) {
      decCount = 99;
      secs = document.getElementById("challengeTimerSecs").innerHTML;
      secCount = Number(secs) - 1;
      if (secCount < 0) {
        timerFinish();
        return;
      }
      newSecs = String(secCount).padStart(2, "0");
      document.getElementById("challengeTimerSecs").innerHTML = newSecs;
    }
    newDecs = String(decCount).padStart(2, "0");
    document.getElementById("challengeTimerDecs").innerHTML = newDecs;
  }, 10);
};

timerAddTime = function () {
  elem = document.getElementById("challengeTimerSecs").innerHTML;
  secs = Number(elem);
  // elem = secs + 3;
};

timerFinish = function () {
  // timer kills one life and resets itself
  // if no lifes lefts, go lose
  clearInterval(timer);

  // this should clearly live elsewhere
  if (HealthPoints.get() > 1) {
    document.getElementById("challengeTimerSecs").innerHTML = "01";
    document.getElementById("challengeTimerDecs").innerHTML = "99";
    startCounter();
  } else {
    document.getElementById("challengeTimerSecs").innerHTML = "00";
    document.getElementById("challengeTimerDecs").innerHTML = "00";
    document.getElementById("challengeInput").value = "";
    HealthPoints.set(HealthPoints.get() - 1);
    if (HealthPoints.get() == 0) {
      Dead.set(true);
    }
  }
};
