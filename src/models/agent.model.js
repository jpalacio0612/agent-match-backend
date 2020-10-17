const { Schema, model } = require('mongoose');

const agentSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    lastname: {
      type: String,
      required: [true, 'Lastname is required'],
    },
    email: {
      type: String,
      required: [true, 'Age is required'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    age: {
      type: Number,
      required: [true, 'Age is required'],
    },
    zipcode: {
      type: Number,
      required: [true, 'Zip code is required'],
    },
    lastLatitude: Number,
    lastLongitude: Number,
  },
  {
    timestamps: true,
  },
);

const Agent = model('Agent', agentSchema);

module.exports = Agent;
