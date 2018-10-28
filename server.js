const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const MongoClient = require('mongodb').MongoClient
var _ = require('lodash')
const uuidv4 = require('uuid/v4')

app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
)

app.use(bodyParser.json())

MongoClient.connect(
  'mongodb://localhost:27017/Trello',
  { useNewUrlParser: true },
  (err, client) => {
    if (err) return console.log(err)
    db = client.db('Trello')
    app.listen(3000, () => {
      console.log('listening on 3000')
    })
  },
)

//USERS

app.get('/getUsers', (req, res) => {
  db.collection('Users')
    .find({})
    .toArray((err, items) => {
      if (err) {
        console.log(err)
      } else {
        res.send(JSON.stringify(items))
      }
    })
})

app.post('/createUser', (req, res) => {
  db.collection('Users').insertOne(req.body, (err, result) => {
    if (err) return console.log(err)
    console.log('Create new user and saved to database')
    res.redirect('/')
  })
})

app.delete('/deleteUser/:id', (req, res) => {
  const id = req.params.id.toString()
  db.collection('Users').remove({ "_id": id }, function(err, result) {
    res.send(result === 1 ? { msg: 'Deleted' } : { msg: 'error: ' + err })
  })
})

//STORIES

app.post('/createStory', (req, res) => {
  db.collection('Stories').insertOne(req.body, (err, result) => {
    if (err) return console.log(err)
    console.log('Create new story and saved to database')
    res.redirect('/')
  })
})
