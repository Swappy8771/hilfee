
const mongoose = require('mongoose');

const jobRoleSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

const JobRole = mongoose.model('JobRole', jobRoleSchema);

module.exports = JobRole;
