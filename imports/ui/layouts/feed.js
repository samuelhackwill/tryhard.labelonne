import "./feed.html";
import "../components/captcha.js";
import "../components/challenge.js";
import "../components/leaderboard.js";
import "../components/scoreLogger.js";

export const State = new ReactiveVar("playing");
// one of : "playing"
//          "loggingScore"
//          "finished"

Template.feed.helpers({
  hider() {
    if (State.get() != "playing") {
      return 0;
    } else {
      return 1;
    }
  },

  state(e) {
    console.log(State.get() == e, State.get(), e);
    return State.get() == e;
  },
});
