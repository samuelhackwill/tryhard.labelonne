import "./leaderboard.html";

const allScore = new ReactiveVar([""]);

Template.leaderboard.onCreated(function () {});

Template.leaderboard.onRendered(function () {
  setTimeout(function () {
    document.getElementById("leaderboard").classList.remove("opacity-0");
  }, 500);

  Meteor.call("getScore", (error, result) => {
    if (!error) {
      console.log(result);
      allScore.set(result);
    } else {
    }
  });
});

Template.leaderboard.helpers({
  getScore() {
    return allScore.get();
  },
  ranker(r) {
    return r + 1;
  },
});
