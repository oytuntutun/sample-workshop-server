// exports all models from the same file for convenience
// this lets us import stuff like
// import { ModelOne, ModelTwo } 'models.js'
// it's pretty convenient when you have to work with multiple models

export { default as User } from './users/model'
export { default as Todo } from './todos/model'
