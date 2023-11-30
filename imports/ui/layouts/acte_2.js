import "./acte_2.html";
import "../components/acte_2/continuer.js";
import "../components/acte_2/pasUnRobot.js";

import { ContinuerBeaten } from "../components/acte_2/continuer.js";

Template.acte_2.helpers({
  isBeaten() {
    return ContinuerBeaten.get();
  },
});
