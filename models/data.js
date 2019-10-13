import mongo from 'mongoose'

const DataSchema = new mongo.Schema({
  name: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  completed: {
    type: Boolean,
    required: true,
    default: false
  },
}, { strict: false })

const Data = mongo.model('Data', DataSchema)

export default Data
