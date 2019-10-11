import socketioJwt from 'socketio-jwt'
import config from './'

export default io => {
  // JWT middleware for socket.io
  io.use(socketioJwt.authorize({
    secret: config.JWT_SECRET,
    handshake: true
  }))

  // fires when a user is connected
  // this only happens when a user authenticates (after login)
  io.on('connection', (socket) => {
    const userId = socket.decoded_token.id

    console.log('a user connected', socket.id)

    // create a room with userId
    // useful for sending data to a single online user
    socket.join(userId)

    // join all-users room. we use this to send the changes to all online users
    socket.join('all-users')

    // no need to leave room, because socket.io automatically does that
    socket.on('disconnect', () => {
      console.log('a user disconnected', userId)
    })
  })
}
