const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Candidate', required: true },
  roleId: { type: mongoose.Schema.Types.ObjectId, ref: 'CandidateRoleDetail', required: true },
  promptId: { type: mongoose.Schema.Types.ObjectId, ref: 'JobPrompt', required: true },
  videoUrl: { type: String, required: true },
});

const Video = mongoose.model('Video', videoSchema);

module.exports = Video;
