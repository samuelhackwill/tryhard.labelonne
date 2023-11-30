// all this stuff is client side

lvl1Data = [
  "bonjour cryptique",
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
  "tschuss implacable",
];

lvl2Data = [
  "ça va?",
  "curieux.",
  // "oui et vous",
  // "conventionnel",
  // "ça va",
  // "automatique",
  // "et alors",
  // "annonciateur,",
  // "que pensez-vous",
  // "indiscret,",
  // "de la vitesse",
  // "à laquelle",
  // "je tape ces mots",
  // "présomptueux.",
  // "?",
  // "pas mal",
  // "poli",
  // "mais en",
  // "même temps",
  // "acrimonieux",
  // "c'est pas",
  // "des mots",
  // "très compliqués",
  "prémonitoire.",
];

lvl3Data = [
  "la touche a",
  // "la touche b",
  // "la touche c",
  // "la touche d",
  // "la touche e",
  // "la touche f",
  // "la touche g",
  // "la touche h",
  // "la touche i",
  // "la touche",
  // "la touche )",
  // "la touche *",
  // "la touche _",
  // "la touche :",
  // "la touche =",
  // "les touches",
  // ":p",
  // "o_O",
  // "T_T",
  // "è_é",
  // "les touches",
  // "éèàâäûüêëù",
  // "ñññññññ",
  // "$$$ €€€ ¥¥¥",
  // "espèces sonnantes",
  "et trébuchantes",
];

lvl4Data = [
  "et maintenant,",
  // "une poésie",
  // "composée par",
  // "Samuel Hackwill",
  // "en 2023.",
  // "c'est en anglais :",
  // "Google IBM Dell,",
  // "Salesforce Baidu Intel.",
  // "OpenAI NVIDIA,",
  // "Samsung Microsoft Meta.",
  // "Accenture Baidu Tesla,",
  // "Tencent Apple Alibaba.",
  // "Amazon Web Services,",
  // "SpaceX Boston Dynamics.",
  // "Huawei SAP Megvii,",
  // "Wipro SenseTime Adobe.",
  "fin.",
];

lvl5Data = [
  "jeu redondant",
  // "public lassé",
  // "expérience pénible",
  // "potache maximal",
  // "clavier collant",
  // "trackpad suant",
  // "pièce froide",
  // "voisin.e hostile",
  // "vidéoprojecteur bruyant",
  // "pseudo participation",
  // "game design défaillant",
  // "dispositif autoritaire",
  // "thématique ?",
  // "y'en a pas",
  // "enfance de samuel ?",
  // "frustrée",
  // "ses lacunes sociales ?",
  // "caractérisées",
  // "son désir d'asservir",
  // "les autres en",
  // "les forçant à jouer ?",
  // "assumé",
  // "lucidité ?",
  // "minimale.",
  // "continuer ?",
  // "s'il le faut",
  // "heureusement c'est",
  // "le dernier niveau",
  "juste après.",
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
