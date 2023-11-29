import "./pasUnRobot.html";

Template.pasUnRobot.onCreated(function () {
  this.hasInteracted = new ReactiveVar(false);
});

Template.pasUnRobot.helpers({
  hasInteracted() {
    const instance = Template.instance();
    return instance.hasInteracted.get();
  },
});

Template.pasUnRobot.events({
  "click input#pasUnRobot"() {
    const instance = Template.instance();
    instance.hasInteracted.set(true);
  },
});
