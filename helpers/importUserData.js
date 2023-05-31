const identifyMonsters = require("./identifyMonsters.js").identifyMonsters;

const importUserData = (identifiedSource) => {
  let userData;
  let newDataArray = [];

  if (identifiedSource === "kobold") {
    userData = require("../sources/koboldPlus.json");
  } else if (identifiedSource === "5etools") {
    userData = require("../sources/5etools.json");
    if (userData.fileType === "bestiary-sublist-saves") {
      userData = userData.saves;

      userData.forEach((encounter) => {
        newDataArray.push(encounter.entity.items);
      });

      userData = newDataArray;
    } else if (
      userData.fileType === "encounter" ||
      userData.fileType === "bestiary-sublist"
    ) {
      newDataArray.push(userData.items);
      userData = newDataArray;
    }
  }

  console.log(`# of encounters: ${userData.length}`);

  userData = identifyMonsters(identifiedSource, userData);

  return userData;
};

module.exports = {
  importUserData,
};
