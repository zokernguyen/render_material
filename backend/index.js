require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

//importing models
const Note = require('./models/note')

//server init
const app = express();

const PORT = process.env.POR || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

//middlewares
//#libs
app.use(express.static("dist"));
app.use(express.json());

//#custom middlewares
//##logger
const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
}

app.use(requestLogger);

//##error handler
const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })

    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}

// routes
//homepage
app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

//GET all
app.get('/api/notes', (request, response) => {
    Note.find({}).then(notes => {
        response.json(notes);
    });
});

//GET by id
app.get('/api/notes/:id', (request, response, next) => {
    Note.findById(request.params.id)
        .then(note => {
            if (note) {
                response.json(note)
            } else {
                response.status(404).end()
            }
        })

        .catch(error => next(error))
});

//POST new note
app.post('/api/notes', (request, response, next) => {
    const body = request.body

    if (body.content === undefined) {
        return response.status(400).json({ error: 'content missing' })
    }

    const note = new Note({
        content: body.content,
        important: body.important || false,
    })

    note.save().then(savedNote => {
        response.json(savedNote)
    })
    .catch(error => next(error))
});

//PUT update note
app.put('/api/notes/:id', (request, response, next) => {

    const { content, important } = request.body

    Note.findByIdAndUpdate(
        request.params.id,

        { content, important },
        { new: true, runValidators: true, context: 'query' }
    )
        .then(updatedNote => {
            response.json(updatedNote)
        })
        .catch(error => next(error))
})

//DELETE note by id
app.delete('/api/notes/:id', (request, response, next) => {
    Note.findByIdAndRemove(request.params.id)
        .then(result => {
        response.status(204).end()
        })
    .catch(error => next(error))
});

//middlewares that run after routes
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint);
// this has to be the last loaded middleware.
app.use(errorHandler);