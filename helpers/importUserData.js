const identifyMonsters = require("./identifyMonsters.js").identifyMonsters;

const importUserData = (identifiedSource) => {
  let userData;
  let userDataEncounterNames = [];
  let newDataArray = [];

  if (identifiedSource === "kobold") {
    userData = require("../sources/koboldPlus.json");
  } else if (identifiedSource === "5etools") {
    userData = require("../sources/5etools.json");
    if (userData.fileType === "bestiary-sublist-saves") {
      userData = userData.saves;

      let encounterNumber = 1;
      userData.forEach((encounter) => {
        if (encounter.entity.name) {
          userDataEncounterNames.push(encounter.entity.name);
        } else {
          userDataEncounterNames.push(`Encounter - 0${encounterNumber}`);
          encounterNumber++;
        }
        newDataArray.push(encounter.entity.items);
      });

      userData = newDataArray;
    } else if (
      userData.fileType === "encounter" ||
      userData.fileType === "bestiary-sublist"
    ) {
      userDataEncounterNames.push(`Encounter - 01`);
      newDataArray.push(userData.items);
      userData = newDataArray;
    }
  }

  console.log(`# of encounters: ${userData.length}`);

  [userData, userDataEncounterNames] = identifyMonsters(
    identifiedSource,
    userData,
    userDataEncounterNames
  );

  return [userData, userDataEncounterNames];
};

module.exports = {
  importUserData,
};
