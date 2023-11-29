import "./continuer.html";

export const ContinuerBeaten = new ReactiveVar(false);

Template.continuer.events({
  "click button#continuer"() {
    ContinuerBeaten.set(true);
  },
});
