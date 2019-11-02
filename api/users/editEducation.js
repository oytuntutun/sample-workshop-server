import { User } from '../../models'

async function action(req, res) {
  const {
    school,
    _id,
    division,
    description,
    location,
    startedAt,
    endedAt,
    currentlyStudying
  } = req.body

  const user = await User.findOneAndUpdate(
    {
      _id: req.user.id,
      'education._id': _id
    },
    {
      $set: {
        'education.$.school': school,
        'education.$.division': division,
        'education.$.description': description,
        'education.$.location': location,
        'education.$.startedAt': startedAt,
        'education.$.endedAt': endedAt,
        'education.$.currentlyStudying': currentlyStudying,
      }
    },
    {
      new: true
    }
  )
  res.status(200).json({ user })

  console.log('user',user)
}

const editEducation = {
  method: 'put',
  action
}

export default editEducation
