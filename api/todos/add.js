import { Todo } from '../../models'
import { io } from '../../'

async function action(req, res) {
  const { io } = req.app
  const { text, _id } = req.body

  const todo = new Todo({
    _id,
    text,
    createdBy: req.user.id
  })

  await todo.save()

  // send todo to all connected users
  io.to('all-users').emit('newTodo', todo)
  // send to current user
  res.send(true)
}

const add = {
  method: 'post',
  action
}

export default add
