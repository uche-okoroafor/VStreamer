const colors = require('colors')
const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const { notFound, errorHandler } = require('./middleware/error')
const connectDB = require('./db')
const { join } = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

const authRouter = require('./routes/auth')
const userRouter = require('./routes/user')
const uploadVideoRouter = require('./routes/uploadVideoRouter.js')
const videosRouter = require('./routes/videosRouter.js')
const imageRouter = require('./routes/imageRouter.js')
const likesRouter = require('./routes/likesRouter.js')
const commentRouter = require('./routes/commentRouter.js')
const viewerRouter = require('./routes/viewerRouter.js')
const followRouter = require('./routes/followRouter.js')
const aboutRouter = require('./routes/aboutRouter.js')
const visitorRouter = require('./routes/visitorRouter.js')


const { json, urlencoded } = express

connectDB()
const app = express()
const server = http.createServer(app)

const io = socketio(server, {
  cors: {
    origin: '*'
  }
})

io.on('connection', socket => {
  console.log('connected')
})

if (process.env.NODE_ENV === 'development') {
  app.use(logger('dev'))
}
app.use(json())
app.use(urlencoded({ extended: false }))
app.use(cookieParser())

app.use((req, res, next) => {
  req.io = io
  next()
})

app.use('/auth', authRouter)
app.use('/users', userRouter)
app.use('/video', uploadVideoRouter)
app.use('/videos', videosRouter)
app.use('/image', imageRouter)
app.use('/likes', likesRouter)
app.use('/comment', commentRouter)
app.use('/views', viewerRouter)
app.use('/follow', followRouter)
app.use('/about', aboutRouter)
app.use('/visitor',visitorRouter)

app.use(express.static(join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'build')))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/client/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname), 'client', 'build', 'index.html')
  )
} else {
  app.get('/*', (req, res) => {
    res.send('API is running')
  })
}

app.use(notFound)
app.use(errorHandler)

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red)
  // Close server & exit process
  server.close(() => process.exit(1))
})

module.exports = { app, server }
