import { User } from '../../models'
import config from '../../config'
import jwt from 'jsonwebtoken'

async function action(req, res) {
  const { email, password } = req.body

  // check if the user exists
  const user = await User.findOne({ email: email.toLowerCase() })
  if(!user) return res.status(400).send('User not found')

  // check if the password is correct
  // validPassword function comes from the model file
  const valid = user.validPassword(password)
  if(!valid) return res.status(400).send('Incorrect password')

  const tokenData = { id: user.id },
    // create a token
    token = jwt.sign(tokenData, config.JWT_SECRET, { expiresIn: '14d' })

  // send the token and user object as response
  res.send({ user, token })
}

const login = {
  method: 'post',
  action
}

export default login
