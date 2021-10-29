const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const {auth} = require('express-openid-connect')
require('dotenv').config()

const app = express()
const authConfig = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH0_SECRET,
  baseURL: process.env.AUTH0_BASE_URL,
  clientID: process.env.AUTH0_CLIENT_ID,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
}
const corsConfig = {
  origin: [process.env.UI_URL],
}

app.use(cors(corsConfig))
// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(authConfig));
app.use((req, res, next) => {
  console.trace(req.url)
  console.trace(req.headers.host)

  // Development mode - request comes from React dev server
  if(req.headers['x-forwarded-host'] === process.env.UI_HOST){
    console.trace('dev')
  }
  // Production - authentication required
  else {
    console.trace('prod')
    if(!req.oidc.isAuthenticated()) {
      res.redirect('/login')
    }
  }
  next()
})
app.use(bodyParser.json())
app.use(express.static('ui/build'))
app.listen(process.env.PORT, () => console.log(`Cortex App is running on port ${process.env.PORT}...`))

app.get('/api/data', (req, res) => {
  console.trace(req.params)
  res.json({
    data: 'hello',
  })
})
