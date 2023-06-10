const identifySource = require("./helpers/identifySource.js").identifySource;
const importUserData = require("./helpers/importUserData.js").importUserData;
const identifyEncounters =
  require("./helpers/identifyEncounters.js").identifyEncounters;

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const ask = (msg) =>
  new Promise((resolve) => rl.question(msg, (response) => resolve(response)));

const generateEncounters = async () => {
  const encounterBuilder = await ask(
    "Which source are you using?\n Enter '1' for 5eTools \n Enter '2' for Kobold+\n"
  );
  const hiddenRollPreference = await ask(
    "Do you want to hide all flavour text (monster name, description, to hit bonuses) and monster rolls?\n Enter '1' for yes \n Enter '2' for no\n"
  );
  let hiddenRolls = parseInt(hiddenRollPreference) === 1 ? " -h" : "";
  // const time = await ask("How Many Years: ");

  const identifiedSource = identifySource(encounterBuilder);

  const [userData, userDataEncounterNames] = importUserData(identifiedSource);

  identifyEncounters(userData, userDataEncounterNames, hiddenRolls);

  rl.close();
};

generateEncounters();
