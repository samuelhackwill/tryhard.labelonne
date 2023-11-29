import "./level_2.html";
import "../components/level2/continuer.js";
import "../components/level2/pasUnRobot.js";

import { ContinuerBeaten } from "../components/level2/continuer.js";

Template.level_2.helpers({
  isBeaten() {
    return ContinuerBeaten.get();
  },
});
