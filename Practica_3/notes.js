const fs = require('fs');
const chalk = require('chalk').default;

const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateNote = notes.find((note) => note.title === title);

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes);
        console.log(chalk.green.inverse('Se creo una nueva nota!'));
    } else {
        console.log(chalk.red.inverse('Este titulo de nota ya esta ocupado'));
    }
}

const removeNote = (title) => {
    const notes = loadNotes();
    const notesToKeep = notes.filter((note) => note.title !== title);

    if (notes.length > notesToKeep.length){
        console.log(chalk.green.inverse('Nota eliminada!'));
        saveNotes(notesToKeep);
    } else {
        console.log(chalk.red.inverse('Nota no encontrada'));
    }
}

const listNotes = () => {
    const notes = loadNotes();

    console.log(chalk.blue.inverse('Tus notas'));

    notes.forEach((note) => {
        console.log(note.title);
    })
}

const readNote = (title) => {
    const notes = loadNotes();
    const note = notes.find((note) => note.title === title);

    if (note) {
        console.log(chalk.blue.inverse(note.title));
        console.log(note.body);
    } else {
        console.log(chalk.red.inverse('Nota no encontrada'));
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON)
    } catch (e) {
        return[]
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}