import express from 'express'
import cors from 'cors'
import { config } from 'dotenv'
import { dbConnect } from './src/lib/dbConnect.js'
import router from './src/routes/router.js'

config()

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use((req, res, next) => {
  // to prevent CORS error
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  next()
})

app.use(express.static('./public'))
app.use('/api', router)

dbConnect()
app.listen(8080, () => {
  console.log('Server is up n running..')
})
