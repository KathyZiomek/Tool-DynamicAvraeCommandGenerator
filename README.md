# Dyanamic Avrae Command Generator

Are you sick of writing Avrae commands for every session? Do you use 5eTools or Kobold+ to generate your encounters? Then this is the tool for you!

This tool will take in a .JSON file with encounter information, and output the information into easy-to-copy .txt files.

This project uses bestiary files downloaded from 5eTools, and is used as hobby enrichment only.

## Currently Supports:

- 5eTools
- Kobold+

### What does this tool do?

- Takes in a file with encounters, and outputs notepad files with Avrae commands for 1+ encounters

### What doesn't this tool do?

- Include legendary actions, or lair actions in the notepad files
- Not compatible with sites like D&D Beyond that do not have ways to obtain your generated encounter information.
- Currently does not support homebrew content (unless you format the JSON to match the existing file structure perfectly)

## How to Use

There is currently sample data in `./sources/5etools.json` and `./koboldPlus.json` that you can use to see what the output will look like (to test this tool using the sample data, skip down to the heading "Using the Tool").

To prepare your own encounters for conversion to Avrae commands, please follow these steps:

#### If Using 5eTools:

There are a few ways to download a JSON file with encounter information from 5eTools. This convertor supports the following methods:

1. In Encounter Builder, clicking the "Save to File" button at the bottom of the encounter will download a JSON file
2. You can export a pinned list as a JSON file. You can find this list in the following ways:
   1. clicking on the "Load Pinned List" button (looks like an open folder), and then clicking "Export All"
   2. clicking on the "Load Encounter" button, and then clicking "Export All"
   3. clicking on the "Download Pinned List" button (looks like a plus sign, located beside the "Load Pinned List" button)
3. You can export a portion of a pinned list. Using options 2.1 or 2.2 above, you will see the existing saved encounters. To export a single encounter as a JSON file, click the "Download" button (located beside the trash can)

Once you have downloaded a JSON file from 5eTools in one of the above methods:

- Copy the _contents_ of this file, and paste it into this project in the following file: `./sources/5etools.json`
- Make sure to erase any old data in the file before pasting your own data
- Save and close this file

#### If Using Kobold+

- Create your encounter as usual, and click the "Save" button (green button with the save icon)
- Create one or more encounters, saving as many as you would like
- Once you would like to export your encounters, copy the following snippet (if you get an error, check to make sure there are no quotation marks around the code snippet): `copy(localStorage.getItem('encounterSaved'));`
- Open the browser console on Kobold+ (you can find this by pressing F12, and ensuring that "Console" is selected in the panel that just opened in your web browser)
- Paste the code snippet, and press enter. This will copy your encounter information to your clipboard.
- Paste this copied information into the project in the following file: `./sources/koboldPlus.json`
- Make sure to erase any old data in the file before pasting your own data
- Save and close this file

Once your data source is ready, you can now use the tool!

### Using the Tool

To use this tool, please follow these steps:

1. On the top toolbar, click "Terminal", and select "New Terminal"
2. Once the terminal opens, type `node .\generateEncounters.js` to start the process (if you get an error, check to make sure there are no quotation marks around the code snippet)
3. The program will ask the following questions:

   > Which source are you using?
   > Enter '1' for 5eTools
   > Enter '2' for Kobold+

   > Do you want to hide all flavour text (monster name, description, to hit bonuses) and monster rolls?
   > Enter '1' for yes
   > Enter '2' for no

   For each question, enter only the numbers **1** or **2**.

   The process will run, and should output .txt files in the `./encounters` folder. You may now copy and paste during combat to your heart's content!

### Consideration and Caveats:

- Due to this being a tool that automatically generates Avrae commands, DMs should still review the output prior to session to ensure accuracy
- The monster and group names are generated automatically, so to customize those names, a DM can go into the encounter .txt files and make adjustments as necessary
- The creator of this tool is not held responsible for any TPKs that occur from encounters created using this tool
- Due to how the encounters are generated, please do not mix and match JSON outputs from multiple sources
- When using 5eTools, due to how the pinned lists work, it's possible that your encounters will be out of order and will include more encounters than you planned. Please double-check the output in the `./encounters` folder to ensure that your encounters are as expected.

### Future Plans:

- Change how files are exported to the `./encounters` folder
  - make sure existing files are deleted, OR a new parent folder is created for each export
- Add legendary actions and lair actions support
