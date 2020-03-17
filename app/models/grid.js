const mongoose = require('mongoose')

const gridSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
      default: 'My new Grid'
    },
    walls: {
      type: Array,
      required: true,
      default: undefined
    },
    weights: {
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
