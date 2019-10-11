import { Cup } from '../../models'
import { io } from '../../'

async function action(req, res) {
  res.send(true)
}

const add = {
  method: 'post',
  action,
}

export default add
