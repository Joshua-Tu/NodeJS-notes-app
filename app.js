// const fs = require("fs");

// fs.writeFileSync("notes.txt", "I am Joshua Tu!");

//
// Challenge: Append a message to notes.txt
//
// 1. Use appendFileSync to append to the file
// 2. Run the script
// 3. Check your work by opening the file and viewing the append text

// fs.appendFileSync("./notes.txt", "I live in Sydney, Australia");
// fs.appendFileSync("notes.txt", " Hey, look at here, I added something new");

// importing your own files
// require("./utils");
// 下面这个name 可以用任意其他变量名
// const add = require("./utils");

// const sum = add(4, -2);

// console.log(sum);
//
// Challenge:
// 1. Create a new file called notes.js
// 2. Create getNotes function that returns "Your notes..."
// 3. Export getNotes function
// 4. From app.js, load in and call the function printing message to console
// const getNotes = require("./notes");

// console.log(getNotes());

// Importing npm modules
// const validator = require("validator");
// const chalk = require("chalk"); // 由下面的challenge要求而来
// const getNotes = require("./notes");
// const msg = getNotes();
// console.log(msg);
// console.log(validator.isEmail("joshua@example.com"));
// console.log(validator.isURL("joshua.io"));
//
// Challenge: Use the chalk library in your project
//
// 1. Install version 2.4.1 of Chalk
// 2. Load chalk into app.js
// 3. Use it to print the string "Success" to the consol in green
// 4. Test your work
// Bonus: Use docs to mess around with other styles. Make text bold and inverse.

// const greenMsg = chalk.yellow.bold.inverse("Success");
// console.log(greenMsg);

// console.log(process.argv[2]);

// Getting input from Users
// const greenMsg = chalk.yellow.bold.inverse("Success");
// console.log(greenMsg);
// console.log(process.argv[2]);

const chalk = require("chalk");
const yargs = require("yargs");
const notes = require("./notes");

// Customize yargs version
yargs.version("1.1.0");

// add, remove, read, list
// Create add command
yargs.command({
  command: "add",
  describe: "Add a new note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string"
    },
    body: {
      describe: "Note body",
      demandOption: true,
      type: "string"
    }
  },
  handler(argv) {
    notes.addNote(argv.title, argv.body);
  }
});

// Create remove command
yargs.command({
  command: "remove",
  describe: "Remove a note", //可以用空字符串，就相当于不加描述
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string"
    }
  },
  handler(argv) {
    notes.removeNote(argv.title);
  }
});

// Create list command
yargs.command({
  command: "list",
  describe: "List your notes",
  handler() {
    // console.log("Listing out all the notes");
    notes.listNotes();
  }
});

// Create read command
yargs.command({
  command: "read",
  describe: "Read a note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string"
    }
  },
  handler(argv) {
    notes.readNote(argv.title);
  }
});

yargs.parse();

// console.log(yargs.argv);
