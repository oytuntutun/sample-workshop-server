import { User } from '../../models'

async function action(req, res) {
  const { payload, _id } = req.body

  const user = await User.findByIdAndUpdate(
    req.user.id,
    payload
    )
  res.status(200).json({ user })
  await user.save()
  console.log(user)
}

const add = {
  method: 'put',
  action
}

export default add
