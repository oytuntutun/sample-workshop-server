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

  const user = await User.findByIdAndUpdate(
    req.user.id,
    {
      $addToSet:{
        educations: {
          school,
          degree,
          division,
          endedAt,
          startedAt,
          currentlyStudying,
          location
        }
      }
    }
  )

  await console.log('user', user.education)

  res.status(200).json({ user })
  await user.save()
}

const addExperience = {
  method: 'post',
  action
}

export default addExperience
