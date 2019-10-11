import { config } from 'dotenv'

// Load env
config()

function required(key) {
  throw new Error(`${key} is required env variable.`)
}

export default {
  DB_URL: process.env.DB_URL || required('DB_URL'),
  JWT_SECRET: process.env.JWT_SECRET || required('JWT_SECRET')
}
