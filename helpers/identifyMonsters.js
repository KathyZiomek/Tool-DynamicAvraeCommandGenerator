const prepMonsters = require("./prepMonsters.js").prepMonsters;

const identifyMonsters = (
  identifiedSource,
  userData,
  userDataEncounterNames
) => {
  let newUserData = [];
  let newUserDataEncounterNames = [];

  // if (userData.length === 1) {
  //   if (identifiedSource === "kobold") {
  //     newUserData.push(prepMonsters(identifiedSource, userData));
  //   } else if (identifiedSource === "5etools") {
  //     newUserData.push(prepMonsters(identifiedSource, userData));
  //   }
  // } else {
  let encounter = 0;
  userData.forEach((data) => {
    let newEncounters = [];

    if (data) {
      if (data.length >= 1) {
        data.forEach((da) => {
          if (identifiedSource === "kobold") {
            newEncounters.push(prepMonsters(identifiedSource, da));
          } else if (identifiedSource === "5etools") {
            newEncounters.push(prepMonsters(identifiedSource, da));
          }
        });
        newUserDataEncounterNames.push(userDataEncounterNames[encounter]);
        newUserData.push(newEncounters);
      } else {
        if (identifiedSource === "kobold") {
          newUserData.push(prepMonsters(identifiedSource, data));
        } else if (identifiedSource === "5etools") {
          newUserDataEncounterNames.push(userDataEncounterNames[encounter]);
          newUserData.push(prepMonsters(identifiedSource, data));
        }
      }
    }
    encounter++;
  });
  // }

  return [newUserData, newUserDataEncounterNames];
};

module.exports = {
  identifyMonsters,
};
