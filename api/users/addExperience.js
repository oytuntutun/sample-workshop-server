import { User } from '../../models'
import mongo from 'mongoose'

async function action(req, res) {
  const {
    company,
    title,
    description,
    startedAt,
    endedAt,
    currentlyWorking,
    location,
  } = req.body

  const user = await User.findByIdAndUpdate(
    req.user.id,
    {
      $addToSet:{
        experience: {
          company,
          title,
          description,
          startedAt,
          endedAt,
          currentlyWorking,
          location
        }
      }
    }
  )

  console.log('user', user)

  res.status(200).json({ user })
  await user.save()
}

const addExperience = {
  method: 'post',
  action
}

export default addExperience
