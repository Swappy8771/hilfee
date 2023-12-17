
const express = require('express');
const router = express.Router();
const CandidateRoleDetail = require('../models/CandidateRoleDetail');
const JobPrompt = require('../models/JobPrompt');
const candidateJobsController = require('../controllers/candidateJobsController')

router.get('/', candidateJobsController.getMyJobs);

module.exports = router;
