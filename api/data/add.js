import { User } from '../../models'

async function action(req, res) {
  const { name, surname, title, company } = req.body

  const user = await User.findByIdAndUpdate(
    req.user.id,
    {
      name,
      surname,
      title,
      company
    }
  )
  res.status(200).json({ user })
  await user.save()
}

const add = {
  method: 'put',
  action
}

export default add
