import "./healthPoints.html";

export const HealthPoints = new ReactiveVar(3);
export const MaxHealthPoints = new ReactiveVar(3);

export const CaptchaBeaten = new ReactiveVar(false);

damagedAtIndex = null;

Template.healthPoints.onRendered(function () {
  setTimeout(() => {
    document.getElementById("healthPoints").classList.remove("opacity-0");
  }, 50);
});

Template.healthPoints.helpers({
  hps() {
    hps = [];
    maxHps = MaxHealthPoints.get();
    actualHps = HealthPoints.get();

    for (let index = 0; index < maxHps - actualHps; index++) {
      hps.push("🤍");
    }
    for (let index = 0; index < actualHps; index++) {
      hps.push("❤️");
    }

    return hps;
  },
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

dealDamage = function (howMany) {
  console.log(HealthPoints.get());
  if (HealthPoints.get() > 0) {
    HealthPoints.set(HealthPoints.get() - howMany);
  }

  if (HealthPoints.get() == 0) {
    CaptchaBeaten.set(true);
    timerFinish();
  }
};
