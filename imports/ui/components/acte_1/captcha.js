import "./captcha.html";

Template.captcha.helpers({
  ranSeed() {
    return Math.floor(Math.random() * 100);
  },
  ranId() {
    _id = this.replace(/[ ',;"()]/g, "");
    __id = _id.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    return __id;
  },
  splittedThis() {
    const splittedThis = [];
    for (let index = 0; index < this.length; index++) {
      splittedThis.push(this[index]);
    }
    return splittedThis;
  },
});

Template.captcha.onRendered(function () {
  setTimeout(() => {
    document.getElementById("captcha").classList.remove("opacity-0");
  }, 50);
});
