import { User } from '../../models'

async function action(req, res) {
  const {
    school,
    degree,
    division,
    endedAt,
    startedAt,
    currentlyStudying,
    location
  } = req.body

  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        $addToSet: {
          education: {
            school,
            degree,
            division,
            endedAt,
            startedAt,
            currentlyStudying,
            location
          }
        }
      },
      {
        new: true
      }
    )
    console.log('my user', user)
    res.status(200).json({ user })
    await user.save()
  }
  catch(err) {
    console.log(err)
  }
}

const addExperience = {
  method: 'post',
  action
}

export default addExperience
