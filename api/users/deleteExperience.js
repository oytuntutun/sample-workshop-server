import { User } from '../../models'

async function action(req, res) {
  const { id } = req.body

  console.log('id', req)

  await User.findByIdAndUpdate(req.user.id, {
    $pull: {
      experience: {_id: id}
    }
  })

  res.send(id)
}



const deleteExperience = {
  method: 'delete',
  action
}

export default deleteExperience
