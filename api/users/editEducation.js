import { User } from '../../models'

async function action(req, res) {
  const { school, _id } = req.body

  //
  // const findEducation = User.findOne({"_id": req.user.id},{education: { $elemMatch: {education:_id}}})
  //
  // console.log('education', findEducation)

  const user = await User.findOneAndUpdate(
    {
      _id: req.user.id,
      'education._id': _id
    },
    {
      $set: {
        'education.$.school': school
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
