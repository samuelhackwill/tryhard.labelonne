lvl1DataII = [
  "ACTE TWO HERE",
  // "coucou hasardeux",
  // "hi! hypocrite",
  // "kenavo sardonique",
  // "sayonara risqué",
  // "shalom audacieux",
  // "habile buongiorno",
  // "à bientôt sceptique",
  // "adieu impatient",
  // "ciao apathique",
  // "arrivederci zélé",
  // "take care exagéré",
  // "tot ziens discret",
  // "gruezi décomplexé",
  // "tschuss implacable",
];

clearData = function () {
  localStorage.removeItem("visited");
};

shuffleArray = function (array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};
