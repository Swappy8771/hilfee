
const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  
  prompts: [{ type: String }],
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
