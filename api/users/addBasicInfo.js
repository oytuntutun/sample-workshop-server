import { User } from '../../models'

async function action(req, res) {
  const { name, surname, title, company, photo, darkmode } = req.body

  const user = await User.findByIdAndUpdate(
    req.user.id,
    {
      name,
      surname,
      title,
      company,
      photo,
      darkmode
    }
  )
  res.status(200).json({ user })
  await user.save()
}

const addBasicInfo = {
  method: 'put',
  action
}

export default addBasicInfo
