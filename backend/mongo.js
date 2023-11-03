const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url =
    `mongodb+srv://zoker:${password}@zoker.igxilkn.mongodb.net/testNoteApp`

// mongodb + srv://zoker:0LlxWK7DHfG1LelI@zoker.igxilkn.mongodb.net/

mongoose.set('strictQuery', false)

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
    content: 'This collection is used for testing APIs',
    important: true,
})

note.save().then(result => {
    console.log('note saved!')
    mongoose.connection.close()
})

// Note.find({}).then(result => {
//     result.forEach(note => {
//         console.log(note)
//     })
// })