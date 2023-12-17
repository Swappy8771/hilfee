
const mongoose = require('mongoose');

const candidateRoleDetailSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Candidate', required: true },
  selectedRole: { type: String, required: true },
});

const CandidateRoleDetail = mongoose.model('CandidateRoleDetail', candidateRoleDetailSchema);

module.exports = CandidateRoleDetail;
