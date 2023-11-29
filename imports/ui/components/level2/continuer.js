import "./continuer.html";

export const ContinuerBeaten = new ReactiveVar(false);

Template.lvl2continuer.events({
  "click button#continuer"() {
    ContinuerBeaten.set(true);
  },
});
