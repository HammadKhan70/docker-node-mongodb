const express = require('express')
const mongoose = require("mongoose");
const Users = require('./models/users')
var bodyParser = require('body-parser')
const url = 'mongodb://localhost:27017/docker'
const app = express()
const port = 8081

//connect db
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

// parsing Request
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// add User
app.post('/addUser', (req, res) => {
  let name, email
  if (req.body.name) name = req.body.name
  if (req.body.email) email = req.body.email

  var user = new Users({
    name,
    email
  })

  user.save((err, result) => {
    if (err) return res.send(err)
    else return res.send(result)
  })
})

// getUser
app.get('/getUser', (req, res) => {

  Users.find({}, (err, result) => {
    if (err) return res.send(err)
    else return res.send(result)
  })
})

// update User
app.put('/updateUser', (req, res) => {

  let email
  if (req.body.email) email = req.body.email
  Users.updateOne(
    { email },
    { $set: { name: req.body.name } }, (err, result) => {
      if (err) return res.send(err)
      else return res.send(result)
    })
})

// delete User
app.delete('/deleteUser',(req, res) => {

  let email
  if(req.body.email) email = req.body.email
  Users.deleteOne({email},(err, result) => {
    if(err) return res.send(err)
    else return res.send(result)
  })
})

app.listen(port, () => {
  console.log(`server is running on http://127.0.0.1:${port}`)
})