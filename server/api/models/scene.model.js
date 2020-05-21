const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SceneSchema = new Schema({
  name: {
    type: String,
  },
}, {
  timestamp: true,
});

module.exports = mongoose.model('Scene', SceneSchema);
