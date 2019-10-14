import { User } from '../../models'

async function action(req, res) {
  const { payload } = req.body

  const user = await User.findByIdAndUpdate(
    req.user.id,
    payload
    )
  res.status(200).json({ user })
  await user.save()
}

const add = {
  method: 'put',
  action
}

export default add
