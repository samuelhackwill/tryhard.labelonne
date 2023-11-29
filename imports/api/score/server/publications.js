import { Meteor } from "meteor/meteor";
import { Score } from "../score.js";

Meteor.methods({
  insertScore(data) {
    console.log(data);
    Score.insert({
      pseudo: data.pseudo,
      captchas: data.scoreCaptchas,
      precision: data.scorePrecision,
    });
  },

  removeScore() {
    Score.remove({});
  },

  async getScore() {
    return Score.find({}, { sort: { captchas: -1, precision: -1 } }).fetch();
  },
});
