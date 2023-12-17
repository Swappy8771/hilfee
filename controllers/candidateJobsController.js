
const CandidateRoleDetail = require('../models/CandidateRoleDetail');
const JobPrompt = require('../models/JobPrompt');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const Video = require('../models/Video');


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const getMyJobs = async (req, res) => {
  try {
    const userId = req.session.userId; 

    
    const candidateRoles = await CandidateRoleDetail.find({ userId });

    
    const jobPrompts = await JobPrompt.find();

    
    const videos = await Video.find({ userId });
   
    
    const videoObject = {};
    videos.forEach((video) => {
      const key = `${video.roleId}_${video.promptId}`;
      videoObject[key] = video.videoUrl;
    });
    
    res.render('myJobs', { candidateRoles, jobPrompts, videoObject });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
};

const uploadVideo = async (req, res) => {
  try {
    const { roleId, promptId } = req.body;
    const userId = req.session.userId; 

    
    if (!req.file) {
      return res.status(400).send('No video file uploaded.');
    }

    
    const videoBuffer = req.file.buffer;

    
    const videoFileName = `${userId}_${roleId}_${promptId}_${Date.now()}.webm`;

    
    const videoPath = path.join('uploads', videoFileName);
    await fs.writeFile(videoPath, videoBuffer);

    
    const video = new Video({
      userId,
      roleId,
      promptId,
      videoUrl: videoFileName,
    });

    await video.save();

    res.redirect('/my-jobs'); 
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
};

module.exports = {
  getMyJobs,uploadVideo
};
