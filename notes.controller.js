const fs = require("fs/promises");
const path = require("path");
const chalk = require("chalk");

const notesPath = path.join(__dirname, "db.json");

async function addNote(title) {
  const notes = await getNotes();
  const note = {
    title,
    id: Date.now().toString(),
  };

  notes.push(note);

  await saveNotes(notes);
  console.log(chalk.bgGreen("Note was added!"));
}

async function getNotes() {
  const notes = await fs.readFile(notesPath, { encoding: "utf-8" });
  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}

async function saveNotes(notes) {
  await fs.writeFile(notesPath, JSON.stringify(notes));
}

async function printNotes() {
  const notes = await getNotes();

  console.log("Here is the list of notes:");
  notes.forEach((note) => {
    console.log(note.id, note.title);
  });
}

async function removeNote(id) {
  const notes = await getNotes();
  console.log(`Note under id '${id}' deleted`);
  await saveNotes(notes.filter((note) => note.id !== id));
}
async function editNoteTitle(id, newTitle) {
  const notes = await getNotes();
  console.log(`Note under id '${id}' edited`);
  await saveNotes(notes.map((n) => n));
}
module.exports = {
  addNote,
  getNotes,
  removeNote,
  editNoteTitle,
};
