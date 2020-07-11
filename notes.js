const fs = require("fs");
const chalk = require("chalk");

const addNote = (title, body) => {
  const notes = loadNotes();

  // 此处用filter会遍历每一个notes中的数组元素，并不是最优算法
  // const duplicateNotes = notes.filter(note => {
  //   return note.title === title;
  // });

  // 而使用find会好很多
  const duplicateNote = notes.find(note => note.title === title);

  // if (duplicateNotes.length === 0) {
  if (!duplicateNote) {
    notes.push({
      title,
      body
    });
    saveNotes(notes);
    console.log("New note added");
  } else {
    console.log("Note title taken");
  }
};

const removeNote = title => {
  const notes = loadNotes();
  const notesToKeep = notes.filter(note => {
    return note.title !== title;
  });
  if (notesToKeep.length === notes.length) {
    console.log(chalk.red.inverse("No note found!"));
  } else {
    console.log(chalk.green.inverse("Note removed!"));
    saveNotes(notesToKeep);
  }
};

//
// Goal: Wire up list command
//
// 1. Create and export listNotes from notes.js
// - "Your notes" using chalk
// - Print note title for each note
// 2. Call listNotes from command handler
// 3. Test your work!
const listNotes = () => {
  const notes = loadNotes();
  console.log(chalk.inverse("Your notes"));
  notes.forEach(note => console.log(chalk.bgRed.yellow(note.title)));
};

//
// Goal: Wire up read command
//
// 1. Setup --title option for read command
// 2. Create readNote in notes.js
// - Search for note by title
// - Find note and print title (styled) and body (plain)
// - No note found? Print error in red.
// 3. Have the command handler call the function
// 4. Test your work by running a couple commands
const readNote = title => {
  // Method 1
  // try {
  //   const notes = loadNotes();
  //   const noteFound = notes.find(note => note.title === title);
  //   console.log(chalk.bgBlue.yellow.bold('title: ' + noteFound.title));
  //   console.log('Body: ' + noteFound.body);
  // } catch {
  //   console.log(chalk.bgRed.black('Note not found!'));
  // }

  // Method 2
  const notes = loadNotes();
  const noteFound = notes.find(note => note.title === title);

  if (noteFound) {
    console.log(chalk.bgBlue.yellow.bold('title: ' + noteFound.title));
    console.log('Body: ' + noteFound.body);
  } else {
    console.log(chalk.bgRed.black('Note not found!'));
  }
};

const saveNotes = notes => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

module.exports = { addNote, removeNote, listNotes, readNote };
