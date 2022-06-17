const express = require('express')
const app = express()
const { ROLE, users } = require('./data')
const { auth, authRole } = require('./auth')

app.use(express.json())
app.use(setUser)


app.get('/', (req, res) => {
  res.send('Home Page')
})

app.get('/dashboard', auth, (req, res) => {
  res.send('Dashboard Page')
})

app.get('/admin', auth, authRole(ROLE.ADMIN), (req, res) => {
  res.send('Admin Page')
})

function setUser(req, res, next) {
  const userId = req.body.userId
  if (userId) {
    req.user = users.find(user => user. id === userId)
  }
  next()
}

app.listen(3001)