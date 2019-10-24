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

  let experience = {
    company,
    title,
    description,
    startedAt,
    endedAt,
    currentlyWorking,
    location,
    _id: mongo.Types.ObjectId()
  }

  const user = await User.findByIdAndUpdate(
    req.user.id,
    {
      $addToSet: {
        experience
      }
    },
    {new: true}
  )

  res.status(200).json({ experience }) // TODO send experience here
  await user.save()
}

const addExperience = {
  method: 'post',
  action
}

export default addExperience
