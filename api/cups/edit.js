import { Cup, User, Todo } from '../../models'
import { io } from '../../'

async function action(req, res) {
  // javascript
  res.send(true)
}

const add = {
  method: 'put',
  action,
}

export default add
