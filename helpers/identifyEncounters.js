const fs = require("fs");

const identifyEncounters = (identifiedSource, userData, hiddenRolls) => {
  let encounter = 1;

  userData.forEach((data) => {
    let encounterText = "";

    encounterText += "******************************\n";
    encounterText += `Encounter #${encounter}\n`;
    encounterText += "******************************\n";
    encounterText += "Adding monsters to initiative:\n";
    encounterText += "******************************\n";

    let group = 1;

    if (data.length > 1) {
      encounterText += "!multiline\n";
    }
    data.forEach((monster) => {
      //   console.log(monster);
      let monsterName = monster.name;
      let count = monster.count;

      encounterText += `!i madd "${monsterName}" -n ${count} -group "Group ${group}"\n`;

      group++;
    });

    encounterText += "\n";
    encounterText += "******************************\n";
    encounterText += "Monster actions:\n";
    encounterText += "******************************\n";

    data.forEach((monster) => {
      //   console.log(monster);
      encounterText += "\n";
      encounterText += `Monster: ${monster.name}\n`;

      if (monster.actions) {
        encounterText += "Attacks:\n";
        monster.actions.forEach((action) => {
          if (monster.count > 1) {
            for (let i = 1; i <= monster.count; i++) {
              encounterText += `!i a "${action.name} (${monster.monsterInitials}${i})"${hiddenRolls} -t \n`;
            }
          } else {
            encounterText += `!i a "${action.name}"${hiddenRolls} -t \n`;
          }
        });
      } else {
        encounterText += `No Actions Found.\nActions will need to be created manually for this monster.\n`;
      }

      encounterText += "\n";
      encounterText += "Attack of Opportunity:\n";
      encounterText += `!i aoo "${monster.monsterInitials}1"${hiddenRolls} "Attack Name" -t `;

      encounterText += "\n";
      encounterText += "HP:\n";
      encounterText += `!i hp "${monster.monsterInitials}1" +/-#`;

      encounterText += "\n";
      encounterText += "Checks:\n";
      encounterText += `!i offturncheck "${monster.monsterInitials}1" DEX`;

      encounterText += "\n";
      encounterText += "Saves:\n";
      encounterText += `!i offturnsave "${monster.monsterInitials}1" DEX`;

      encounterText += "\n";
      encounterText += "\n";
      encounterText += "-----------------------------\n";
    });

    fs.writeFileSync(`./encounters/encounter${encounter}.txt`, encounterText);

    encounter++;
  });

  console.log("Done!");
  console.log("Files created in ./encounters folder");
};

module.exports = {
  identifyEncounters,
};
