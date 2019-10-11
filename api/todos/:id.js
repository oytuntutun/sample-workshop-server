import { Todo } from '../../models'

async function action(req, res) {
  const { io } = req.app // io exists in every endpoint automatically
  const { text, _id } = req.body

  const todo = new Todo({
    _id,
    text,
    createdBy: req.user.id // for logged in users, req.user is always there.
  })

  await todo.save()

  // send todo to all connected users
  io.to('all-users').emit('newTodo', todo)

  // tell the current user it was successful (or send other the data if you want)
  res.send(true)
}

const add = {
  method: 'post', // change this to the correct router method (post, get etc...)
  action,
}

export default add
