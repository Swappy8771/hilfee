const fs = require('fs').promises;
const path = require('path');
const multer = require('multer');
const Candidate = require('../models/Candidate');

const upload = multer({ dest: 'uploads/' });

const getProfile = async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const candidate = await Candidate.findById(req.session.userId);
    if (!candidate) {
      return res.status(404).json({ message: 'Candidate not found' });
    }

    res.render('profile', { profile: candidate });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const updateProfile = async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const candidate = await Candidate.findById(req.session.userId);
    if (!candidate) {
      return res.status(404).json({ message: 'Candidate not found' });
    }

    candidate.name = req.body.name || candidate.name;
    candidate.email = req.body.email || candidate.email;

    if (req.file) {
      if (candidate.image) {
        try {
          await fs.unlink(path.join('uploads', candidate.image));
        } catch (error) {
          console.error('Error deleting existing profile image:', error);
        }
      }

      candidate.image = req.file.filename;
    }

    await candidate.save();

    res.status(200).redirect('/profile');
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getProfile,
  updateProfile
};
