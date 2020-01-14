import mongoose from 'mongoose'
const Schema = mongoose.Schema
const citySchema = new Schema({
  id: String,
  value: Array
})

export default mongoose.model('City', citySchema)
