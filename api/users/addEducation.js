import { User } from '../../models'
import mongo from 'mongoose'

async function action(req, res) {
  const {
    school,
    degree,
    division,
    endedAt,
    startedAt,
    currentlyStudying,
    location,
    description
  } = req.body

  let education = {
    school,
    degree,
    division,
    endedAt,
    startedAt,
    currentlyStudying,
    location,
    description,
    _id: mongo.Types.ObjectId()
  }

  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        $addToSet: {
          education
        }
      },
      {
        new: true
      }
    )

    res.status(200).json({ education })
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
