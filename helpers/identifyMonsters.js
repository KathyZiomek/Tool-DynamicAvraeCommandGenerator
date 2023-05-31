const prepMonsters = require("./prepMonsters.js").prepMonsters;

const identifyMonsters = (identifiedSource, userData) => {
  let newUserData = [];

  // if (userData.length === 1) {
  //   if (identifiedSource === "kobold") {
  //     newUserData.push(prepMonsters(identifiedSource, userData));
  //   } else if (identifiedSource === "5etools") {
  //     newUserData.push(prepMonsters(identifiedSource, userData));
  //   }
  // } else {
  userData.forEach((data) => {
    let newEncounters = [];
    if (data.length >= 1) {
      data.forEach((da) => {
        if (identifiedSource === "kobold") {
          newEncounters.push(prepMonsters(identifiedSource, da));
        } else if (identifiedSource === "5etools") {
          newEncounters.push(prepMonsters(identifiedSource, da));
        }
      });
      newUserData.push(newEncounters);
    } else {
      if (identifiedSource === "kobold") {
        newUserData.push(prepMonsters(identifiedSource, data));
      } else if (identifiedSource === "5etools") {
        newUserData.push(prepMonsters(identifiedSource, data));
      }
    }
  });
  // }

  return newUserData;
};

module.exports = {
  identifyMonsters,
};
