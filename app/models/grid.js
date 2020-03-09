const mongoose = require('mongoose')

const gridSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    walls: {
      type: Array,
      required: true,
      default: undefined
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
  }
)

module.exports = mongoose.model('Grid', gridSchema)
