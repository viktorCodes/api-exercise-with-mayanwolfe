const express = require('express')

const app = express()

const morgan = require('morgan')

const PORT = 3001

app.use(express.json())

app.use(morgan('tiny'))

morgan.token('object', function(request, response) {
    return `${JSON.stringify(request.body)}`
})

app.use(morgan(':method :url :status :res[content-length] :response-time ms  :object'))



let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
    response.json(persons)
})


app.get('/info', (request, response) => {

    const currentDate = new Date()

    response.send(`<h2>Phonebook has info for ${persons.length}  people </h2> <h2>${currentDate}</h2>`)
})


app.get('/api/persons/:id', (request, response) => {

    const id = request.params.id
    const entry = persons.find(entry => entry.id == id)

    if(entry){

        response.json(entry)

    }else{
       response.status(404).end()
    }

    retun
})

app.delete('/api/persons/:id', (request, response) => {

    const id = Number(request.params.id)

    persons =persons.filter(entry => entry.id !== id)

    response.status(204).end()
})

const generateId = () => {
    const maxID = persons.length > 0 ? Math.max( ...persons.map(n => n.id)) : 0

    return maxID + 1


}

app.post('/api/persons', (request, response) => {

    const body = request.body

    if(!body.name){
        //custom error message
        return response.status(418).json({error: 'name is missing'})
    }

    if(!body.number){
        //custom error message
        return response.status(418).json({error: 'number is missing'})
    }

    if(persons.some(entry => entry.name === body.name)){
        //

        return response.status(409).json({error: 'name must be unique'})
    }



    



    let entry = {
        id: generateId(),
        name: body.name,
        number: body.number
    }

    persons.push(entry)
    response.json(entry)
})

app.listen(PORT, () => {
    console.log(`Server active on ${PORT}`)
})