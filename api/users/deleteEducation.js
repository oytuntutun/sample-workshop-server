import { User } from '../../models'

async function action(req, res) {
  const { id } = req.body

  try {
      const user = await User.findByIdAndUpdate(req.user.id, {
      $pull: {
        education: {_id: id}
      }
    }
  )
    res.send(user)
  }
  catch(err) {
    res.send.log(err)
  }
}

const deleteEducation = {
  method: 'delete',
  action
}



export default deleteEducation
