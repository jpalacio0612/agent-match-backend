const { Schema, model } = require('mongoose');

const agentSchema = new Schema(
  {
    name: String,
  },
  {
    timestamps: true,
  },
);

const Agent = model('Agent', agentSchema);

module.exports = Agent;
