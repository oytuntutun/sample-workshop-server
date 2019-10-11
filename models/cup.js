import mongo from 'mongoose'

const CupSchema = new mongo.Schema({
  name: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
}, { strict: false })

const Cup = mongo.model('Cup', CupSchema)

export default Cup
