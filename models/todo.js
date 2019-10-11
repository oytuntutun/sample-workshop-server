import mongo from 'mongoose'

const TodoSchema = new mongo.Schema({
  text: String,
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

const Todo = mongo.model('Todo', TodoSchema)

export default Todo
