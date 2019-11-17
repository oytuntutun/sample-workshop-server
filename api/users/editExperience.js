import { User } from '../../models'

async function action(req, res) {
  const {
    name,
    surname,
    title,
    company,
    _id,
    description,
    startedAt,
    endedAt,
    currentlyWorking,
    location
   } = req.body

  const user = await User.findOneAndUpdate(
    {
      _id: req.user.id,
      'experience._id': _id
    },
    {
      $set: {
        'experience.$.company': company,
        'experience.$.title': title,
        'experience.$.description': description,
        'experience.$.startedAt': startedAt,
        'experience.$.endedAt': endedAt,
        'experience.$.currentlyWorking': currentlyWorking,
        'experience.$.location': location,

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
