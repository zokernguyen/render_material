const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url =
    `mongodb+srv://zoker:${password}@zoker.igxilkn.mongodb.net/noteApp`

// mongodb + srv://zoker:0LlxWK7DHfG1LelI@zoker.igxilkn.mongodb.net/

mongoose.set('strictQuery', false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
    content: 'GET and POST are the most important methods of HTTP protocol',
    important: false,
})

note.save().then(result => {
    console.log('note saved!')
    mongoose.connection.close()
})