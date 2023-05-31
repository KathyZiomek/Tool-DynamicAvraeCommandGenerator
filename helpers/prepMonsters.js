const SOURCES_JSON = require("../sources/bookSources.json");

const prepMonsters = (identifiedSource, monster) => {
  let formattedMonster, newSource;
  let monsterInitials = "";
  let monsterActions = [];

  if (identifiedSource === "5etools") {
    let tempName = monster.h;

    let splitSource = tempName.split("_");
    newSource = splitSource[1];

    let newSplitName = splitSource[0].split("%20");

    let monsterName = "";

    for (const split of newSplitName) {
      if (monsterName.length > 0) {
        monsterName += " " + split.charAt(0).toUpperCase() + split.slice(1);
      } else {
        monsterName += split.charAt(0).toUpperCase() + split.slice(1);
      }
    }

    let splitMonsterName = monsterName.split(" ");

    if (splitMonsterName.length > 1) {
      for (const split of splitMonsterName) {
        monsterInitials += split.charAt(0).toLowerCase();
      }
    } else {
      monsterInitials =
        monsterName.charAt(0).toLowerCase() +
        monsterName.charAt(1).toLowerCase();
    }

    const NEW_SOURCES_JSON = require(`../sources/bestiary/bestiary-${newSource}.json`);

    const foundMonster = NEW_SOURCES_JSON.monster.find(
      (monster) => monster.name.toLowerCase() === monsterName.toLowerCase()
    );
    if (foundMonster) {
      if (!foundMonster.action) {
        //monster is a copy of something else, need to find actions from the copy
        let copiedMonster = foundMonster._copy;

        const NEWER_SOURCES_JSON = require(`../sources/bestiary/bestiary-${copiedMonster.source.toLowerCase()}.json`);

        const foundCopiedMonster = NEWER_SOURCES_JSON.monster.find(
          (monster) =>
            monster.name.toLowerCase() === copiedMonster.name.toLowerCase()
        );
        if (foundCopiedMonster) {
          monsterFoundStatus = true;
          monsterActions = foundCopiedMonster.action;
        }
      } else {
        monsterFoundStatus = true;
        monsterActions = foundMonster.action;
      }
    }

    formattedMonster = {
      name: monsterName,
      monsterInitials: monsterInitials,
      count: monster.c,
      source: newSource,
      actions: monsterActions,
    };
  } else if (identifiedSource === "kobold") {
    let tempSlug = monster.monster.slug;
    let monsterName = monster.monster.name;

    let splitMonsterName = monsterName.split(" ");

    if (splitMonsterName.length > 1) {
      for (const split of splitMonsterName) {
        monsterInitials += split.charAt(0).toLowerCase();
      }
    } else {
      monsterInitials =
        monsterName.charAt(0).toLowerCase() +
        monsterName.charAt(1).toLowerCase();
    }

    let splitSource = tempSlug.split("-");

    let sources = [];
    let sourceTitle = "";

    for (const split of splitSource) {
      if (
        split.length === 0 ||
        split === "systems" ||
        split === "reference" ||
        split === "document" ||
        split === "srd"
      ) {
        sourceTitle = "";
      } else if (!isNaN(parseInt(split)) && sourceTitle.length > 0) {
        sources.push(sourceTitle);
        sourceTitle = "";
      } else if (
        (sourceTitle.length > 0 && split === "of") ||
        split === "a" ||
        split === "the" ||
        split === "and"
      ) {
        if (sourceTitle.length === 0) {
          sourceTitle += split;
        } else {
          sourceTitle += " " + split;
        }
      } else if (
        !monsterName.toLowerCase().includes(split) &&
        isNaN(parseInt(split))
      ) {
        if (sourceTitle.length === 0) {
          sourceTitle += split;
        } else {
          sourceTitle += " " + split;
        }
      }
    }

    let monsterFoundStatus = false;

    for (const sourceTitle of sources) {
      const foundSourceBook = SOURCES_JSON.find((source) =>
        source.name.toLowerCase().includes(sourceTitle)
      );

      if (foundSourceBook) {
        newSource = foundSourceBook.shortname.toLowerCase();

        if (newSource.length > 0) {
          const NEW_SOURCES_JSON = require(`../sources/bestiary/bestiary-${newSource}.json`);

          const foundMonster = NEW_SOURCES_JSON.monster.find(
            (monster) =>
              monster.name.toLowerCase() === monsterName.toLowerCase()
          );

          if (foundMonster) {
            if (!foundMonster.action) {
              //monster is a copy of something else, need to find actions from the copy
              let copiedMonster = foundMonster._copy;

              const NEWER_SOURCES_JSON = require(`../sources/bestiary/bestiary-${copiedMonster.source.toLowerCase()}.json`);

              const foundCopiedMonster = NEWER_SOURCES_JSON.monster.find(
                (monster) =>
                  monster.name.toLowerCase() ===
                  copiedMonster.name.toLowerCase()
              );
              if (foundCopiedMonster) {
                monsterFoundStatus = true;
                monsterActions = foundCopiedMonster.action;
              }
            } else {
              monsterFoundStatus = true;
              monsterActions = foundMonster.action;
            }
          }
        }
      }
    }
    if (!monsterFoundStatus) {
      const MPMM_SOURCE = require(`../sources/bestiary/bestiary-mpmm.json`);
      let foundMonster = MPMM_SOURCE.monster.find(
        (monster) => monster.name.toLowerCase() === monsterName.toLowerCase()
      );
      if (foundMonster) {
        monsterFoundStatus = true;
        monsterActions = foundMonster.action;
      }
    }

    formattedMonster = {
      name: monsterName,
      monsterInitials: monsterInitials,
      count: monster.count,
      source: newSource,
      actions: monsterActions,
    };
  }
  return formattedMonster;
};

module.exports = {
  prepMonsters,
};
