
const multer = require('multer'); 
const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const { requireAuth } = require('../middleware/authMiddleware');


const upload = multer({ dest: 'uploads/' }); 

router.get('/', requireAuth, (req, res) => {
 
  res.render('profile', { profile: res.locals.candidate });
});
 
  router.get('/update', requireAuth, (req, res) => {
    res.render('updateProfile');
  });
  
  router.post('/update', requireAuth, upload.single('profileImage'), profileController.updateProfile);
  
module.exports = router;
