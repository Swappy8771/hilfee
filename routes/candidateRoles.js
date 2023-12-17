
const express = require('express');
const router = express.Router();
const JobRole = require('../models/JobRole');
const CandidateRoleDetail = require('../models/CandidateRoleDetail');


router.get('/', async (req, res) => {
    try {
      const jobRoles = await JobRole.find({}, 'name'); 
      res.render('selectRole', { jobRoles });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    }
  });
  
  
  router.post('/', async (req, res) => {
    try {
      const userId = req.session.userId; 
      const { selectedRole } = req.body;
  
      
      const existingRole = await CandidateRoleDetail.findOne({ userId, selectedRole });
      if (existingRole) {
        return res.status(400).send('Role already exists for the user.');
      }
  
      
      await CandidateRoleDetail.create({ userId, selectedRole });
  
      res.redirect('/job-portal');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    }
  });
  

module.exports = router;
