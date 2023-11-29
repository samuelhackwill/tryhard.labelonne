// all this stuff is client side

initialData = [
  "bonjour cryptique",
  "coucou hasardeux",
  "salut hypocrite",
  "hi! prudent",
  "kenavo sardonique",
  "hola honteux",
  "sayonara risqué",
  "shalom audacieux",
  "habile buongiorno",
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
