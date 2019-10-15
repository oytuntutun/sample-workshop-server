import { User } from '../../models'

async function action(req, res) {
  const { company, title } = req.body
  console.log('is it working?')
  const user = await User.findByIdAndUpdate(
    req.user.id,
    {
      $addToSet:{
        experiences: { company, title }
      }
    }
  )
  res.status(200).json({ user })
  await user.save()
}

const addExperience = {
  method: 'post',
  action
}

export default addExperience
