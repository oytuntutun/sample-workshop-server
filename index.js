import express from 'express'
import dbConfig from './config/db'
import ioConfig from './config/ioConfig'
import configMiddlewares from './config/middlewares'
import cors from 'cors'
import http from 'http'
import SocketIO from 'socket.io'
import { routeCreator } from './lib'

// use port from env or 4000 if it doesn't exist. feel free to change
const port = process.env.PORT || 4000
const app = express()

// add your cors
app.use('*', cors({ origin: [
  'http://localhost:3000',
  'http://localhost:4000',
] }))

dbConfig(app)
configMiddlewares(app)
/*
  routeCreator reads every folder in API, loops in them
  then for each file dynamically generates endpoints
  lets say folder name is todos and file name is add and method is post
  results in a post endpoint at APP_URL/todos/add
*/
app.use(routeCreator())

const server = http.Server(app)
export const io = new SocketIO(server)

ioConfig(io)

// inserts io to each route/to the app params
// const { io } = req.app
app.io = io

server.listen(port, () => console.log(`App listening on port ${port}`))
