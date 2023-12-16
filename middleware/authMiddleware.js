
const Candidate = require('../models/Candidate');

const requireAuth = async (req, res, next) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const candidate = await Candidate.findById(req.session.userId);
    if (!candidate) {
      return res.status(404).json({ message: 'Candidate not found' });
    }

    res.locals.candidate = candidate;
    next(); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { requireAuth };
