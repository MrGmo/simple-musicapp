const express = require('express');
const app = express();
const dotenv = require('dotenv')
const MongoClient = require('mongodb').MongoClient
const PORT = 4000;
dotenv.config()

let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'music'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))



app.get('/',(request, response)=>{
    db.collection('musicians').find().toArray()
    .then(data => {
        response.render('index.ejs', { info: data })
    })
    .catch(error => console.error(error))
})

app.post('/addMusician', (request, response) => {
    db.collection('musicians').insertOne(request.body)
    .then(result => {
        console.log('Musician Added')
        response.redirect('/')
    })
    .catch(error => console.error(error))
})

app.delete('/deleteMusician', (request, response) => {
    db.collection('musicians').deleteOne({name: request.body.nameVar})
    .then(result => {
        console.log('Musician Deleted')
        response.json('Musician Deleted')
    })
    .catch(error => console.error(error))

})

app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})
