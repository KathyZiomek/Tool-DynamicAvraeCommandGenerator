const identifySource = (source) => {
  let identifiedSource = "";

  if (parseInt(source) === 1) {
    identifiedSource = "5etools";
    console.log("5eTools selected, proceeding...");
    // console.log("identified 5etools");
  } else if (parseInt(source) === 2) {
    identifiedSource = "kobold";
    console.log("Kobold+ selected, proceeding...");
    // console.log("identified kobold");
  } else {
    console.log(
      "You need to input either '1' or '2' in the command line. Any other options are invalid.\nStopping process..."
    );
    process.exit();
  }

  return identifiedSource;
};

module.exports = {
  identifySource,
};
