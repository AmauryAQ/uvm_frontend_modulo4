const chalk = require('chalk');
const yargs = require('yargs');
const notes = require('./notes.js');

yargs.version('1.1.0');

yargs.command({
    command: 'add',
    describe: 'Agrega una nueva nota    ',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    
    handler(argv){
        notes.addNote(argv.title, argv.body);
    }

})

yargs.command({
    command: 'remove',
    describe: 'Elimina una nota',
    builder:{
        title: {
            describe: 'Titulo de la nota',
            demandOption: true,
            type: 'string'
        }
    },

    handler(argv){
        notes.removeNote(argv.title);
    }
})

yargs.command({
    command: 'list',
    describe: 'Muestra un listado de tus notas',
    handler(){
        notes.listNotes();
    }
})

yargs.command({
    command: 'read',
    describe: 'Muestra una nota',
    builder: {
        title: {
            describe: 'Titulo de la nota',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        notes.readNote(argv.title);
    }
})

yargs.parse()