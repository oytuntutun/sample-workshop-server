import { User } from '../../models'
import config from '../../config'
import jwt from 'jsonwebtoken'

async function action(req, res) {
  const { io } = req.app
  const { email, password } = req.body
  // check if there is a user with the same email
  const exists = await User.findOne({ email: email.toLowerCase() })
  if(exists) return res.status(400).send('Email already exists.')

  const newUser = new User({
    email
  })

  // create and save hashed password
  newUser.password = newUser.generateHash(password)

  const user = await newUser.save(),
    tokenData = { id: user.id },
    // create a token
    token = jwt.sign(tokenData, config.JWT_SECRET, { expiresIn: '14d' })

  // send the token and user object as response
  res.send({ user, token })
}

const signup = {
  method: 'post',
  action
}

export default signup
