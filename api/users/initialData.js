import { Todo } from '../../models'

async function action(req, res) {
  const todos = await Todo.find()
  res.send(todos)
}

const initialData = {
  method: 'get',
  action
}

export default initialData
