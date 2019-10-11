import { Todo } from '../../models'
import { io } from '../../'

async function action(req, res) {
  const { io } = req.app
  const { todoId, completed } = req.body

  /*
    feel free to fetch and change the completed field on the server
    for boilerplating purposes, sending from the client side seems faster to me
  */

  const todo = await Todo.findByIdAndUpdate(
    todoId,
    { completed },
    { new: true } // returns the updated document
  )

  // send the data to all connected users
  io.to('all-users').emit('complete', todo)
  // send to current user
  res.send(true)
}

const add = {
  method: 'put',
  action
}

export default add
