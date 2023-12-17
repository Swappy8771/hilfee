
const mongoose = require('mongoose');

const jobPromptSchema = new mongoose.Schema({
  title: { type: String, required: true },
  
});

const JobPrompt = mongoose.model('JobPrompt', jobPromptSchema);

module.exports = JobPrompt;
