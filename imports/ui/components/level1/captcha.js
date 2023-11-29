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
});

Template.captcha.onRendered(function () {
  setTimeout(() => {
    document.getElementById("captcha").classList.remove("opacity-0");
  }, 50);
});
