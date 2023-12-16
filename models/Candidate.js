

const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
  phonenumber: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  name: { type: String },
  email: { type: String },
  image: { type: String }
});

const Candidate = mongoose.model('Candidate', candidateSchema);

module.exports = Candidate;
