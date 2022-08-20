const chalk = require('chalk')
const fs = require('fs')

const addNote = (title, body) => {
    const notes = loadNote()
    const duplicateNote = notes.find( (note) => note.title === title)

    if(!duplicateNote){
        notes.push({
            title: title,
            body: body
        })
        console.log(chalk.green.inverse('New note added!'))
        saveNotes(notes)
    } else {
        console.log(chalk.red.inverse('Note title taken!'))
    }
}

const removeNote = (title) => {
    const notes = loadNote()
    const notesToKeep = notes.filter( (note) => note.title !== title)

    if(notes.length > notesToKeep.length) {
        console.log(chalk.green.inverse('Note Removed!'))
        saveNotes(notesToKeep) 
    } else {
        console.log(chalk.red.inverse('No note found!'))
    }
}

const listNotes = () => {
    const notes = loadNote()
    console.log(chalk.italic.bold.inverse.green('Your notes'))
    notes.forEach( (note) => {
        console.log(note.title)
    })
}

const readNotes = (title) => {
    const notes = loadNote()
    const noteToRead = notes.find( (note) => note.title === title)

    if(noteToRead) {
        console.log(chalk.green.inverse(noteToRead.title))
        console.log(noteToRead.body)
    } else {
        console.log(chalk.red('No note found!'))
    }
}

const loadNote = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch(e) {
        return []
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}


module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNotes: readNotes
}