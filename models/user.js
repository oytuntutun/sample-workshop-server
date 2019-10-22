import mongo from 'mongoose'
import bcrypt from 'bcrypt'

const UserSchema = new mongo.Schema({
  name: {
    type: String,
    unique: true,
    sparse: true
  },
  experience: [{
    company: {
      type: String,
    },
    title: String,
    description: String,
    startedAt: String,
    endedAt: String,
    currentlyWorking: Boolean,
    location: String

  }],
  education: [{
    school: {
      type: String,
      required: true,
    },
    degree: String,
    division: String,
    startedAt: String,
    endedAt: String,
    currentlyStudying: Boolean,
    location: String

  }],
  email: {
    type: String,
    lowercase: true,
    trim: true,
    unique: true,
    sparse: true
  },
  lastActiveAt: {
    type: Date,
    default: Date.now
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  password: String
}, {strict: false})

// generating a hashed password with bycrpt
UserSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

// checking if password is valid on login
UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password)
}

const User = mongo.model('User', UserSchema)

export default User
