import mongoose from 'mongoose'
import { MONGODB } from './config.js'

// import MONGODB from './config'
const { connect, connection } = mongoose

const connectDB = async () => {
  const db = await connect(`${MONGODB}`)
  console.log(db.connection.db.databaseName)
}

connection.on('connected', () => {
  console.log('base de datos conecada')
})

export default connectDB