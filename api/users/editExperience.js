import { User } from '../../models'

async function action(req, res) {
  const { name, surname, title, company, _id } = req.body

  const user = await User.findByIdAndUpdate(
    {
      id: req.user.id,
      'experience._id': _id
    },
    {
      $set: {
        'experience.$.experience': experience
      }
    },
    {
      new: true
    }
  )
  res.status(200).json({ user })
  await user.save()
}

const editExperience = {
  method: 'put',
  action
}

export default editExperience
