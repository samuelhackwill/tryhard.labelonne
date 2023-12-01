import "./captcha.html";

Template.captcha.helpers({
  ranSeed() {
    return Math.floor(Math.random() * 100);
  },
  ranId() {
    _id = this.theCaptcha.replace(/[ ',;"()]/g, "");
    __id = _id.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    return __id;
  },
  splittedThis() {
    const splittedThis = [];
    for (let index = 0; index < this.theCaptcha.length; index++) {
      splittedThis.push(this.theCaptcha[index]);
    }
    return splittedThis;
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

Template.captcha.onRendered(function () {
  setTimeout(() => {
    document.getElementById("captcha").classList.remove("opacity-0");
  }, 50);
});
