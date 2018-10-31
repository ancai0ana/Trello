const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const MongoClient = require('mongodb').MongoClient
const uuidv4 = require('uuid/v4')
const { ObjectId } = require('mongodb')
const cors = require('cors')
const basicAuth = require('express-basic-auth')

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

const handleLogin = res => {
  return queryResponse => {
    if (queryResponse) {
      res.status(200).send(queryResponse)
    } else {
      res.status(401).send('UNAUTHORIZED')
    }
  }
}

app.post('/login', cors(), (req, res) => {
  db.collection(USERS_DOCUMENT)
    .findOne({ name: req.body.name, pass: req.body.pass })
    .then(handleLogin(res))
    .catch(err => console.error(err))
})

const unauthorizedResponse = req =>
  req.auth
    ? 'Credentials ' + req.auth.user + ' : ' + req.auth.password + ' rejected'
    : 'No credentials provided'

// app.use(
//   basicAuth({
//     authorizer: myAuthorizer,
//     unauthorizedResponse: unauthorizedResponse,
//     authorizeAsync: true,
//   }),
// )

app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
)

app.use(bodyParser.json())

function myAuthorizer(username, password, callback) {
  // ar trebui hashuita parola
  return db
    .collection(USERS_DOCUMENT)
    .find({ name: username, pass: password })
    .toArray()
    .then(elements => callback(null, !!elements.length))
}

const USERS_DOCUMENT = 'Users'
const STORIES_DOCUMENT = 'Stories'
//USERS

app.get('/users', cors(), (req, res) => {
  db.collection(USERS_DOCUMENT)
    .find({})
    .toArray()
    .then(items => res.send(items))
    .catch(err => console.error(err))
})

app.post('/users', (req, res) => {
  db.collection(USERS_DOCUMENT)
    .insertOne(req.body)
    .then(result => res.send(result.ops[0]))
    .catch(err => console.error(err))
})

app.delete('/users/:id', (req, res) => {
  const id = req.params.id.toString()
  db.collection(USERS_DOCUMENT)
    .deleteOne({ _id: ObjectId(id) })
    .then(queryResponse => console.log(queryResponse.result))
    .then(queryResponse => res.send('Deleted'))
    .catch(err => console.error(err))
})

//STORIES
app.get('/stories', cors(), (req, res) => {
  db.collection(STORIES_DOCUMENT)
    .find({})
    .toArray()
    .then(items => res.send(items))
    .catch(err => console.error(err))
})

app.get('/stories/:storyId', cors(), (req, res) => {
  const storyId = req.params.storyId.toString()
  db.collection(STORIES_DOCUMENT)
    .findOne(ObjectId(storyId))
    .then(element => res.send(element))
    .catch(err => console.error(err))
})

app.post('/stories', (req, res) => {
  db.collection(STORIES_DOCUMENT)
    .insertOne(req.body)
    .then(result => res.send(result.ops[0]))
    .catch(err => console.error(err))
})

app.put('/stories/:storyId', (req, res) => {
  const storyId = req.params.storyId.toString()
  var query = { _id: ObjectId(storyId) }
  const diffStuff = { returnOriginal: false }
  db.collection(STORIES_DOCUMENT)
    .findOneAndUpdate(query, { $set: req.body }, diffStuff)
    .then(updatedDocument => res.send(updatedDocument.value))
    .catch(err => console.error(err))
})

app.delete('/stories/:storyId', (req, res) => {
  const storyId = req.params.storyId.toString()
  db.collection(STORIES_DOCUMENT)
    .deleteOne({ _id: ObjectId(storyId) })
    .then(queryResponse => console.log(queryResponse.result))
    .then(queryResponse => res.send('Deleted'))
    .catch(err => console.error(err))
})

// COMMENTS
app.post('/stories/:storyId/comments', (req, res) => {
  const storyId = req.params.storyId.toString()
  const query = { _id: ObjectId(storyId) }
  const comment = req.body;
  comment._id = uuidv4();
  const addCommentToStory = { $push: { comments: req.body } }
  const diffStuff = { returnOriginal: false }
  db.collection(STORIES_DOCUMENT)
    .findOneAndUpdate(query, addCommentToStory, diffStuff)
    .then(updatedDocument => res.send(updatedDocument.value))
    .catch(err => console.error(err))
})

app.put('/stories/:storyId/comments', (req, res) => {
  const storyId = req.params.storyId.toString()
  var query = { _id: ObjectId(storyId) }
  const diffStuff = { returnOriginal: false }
  db.collection(STORIES_DOCUMENT)
    .findOneAndUpdate(query, { $set: req.body }, diffStuff)
    .then(updatedDocument => res.send(updatedDocument.value))
    .catch(err => console.error(err))
})

app.delete('/stories/:storyId/comments', (req, res) => {
  const storyId = req.params.storyId.toString()
  db.collection(STORIES_DOCUMENT)
    .deleteOne({ _id: ObjectId(storyId) })
    .then(queryResponse => console.log(queryResponse.result))
    .then(queryResponse => res.send('Deleted'))
    .catch(err => console.error(err))
})
