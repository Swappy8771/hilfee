
const bcrypt = require('bcrypt');
const Candidate = require('../models/Candidate'); 



const signup = async (req, res) => {
  try {
    const { phonenumber, password, confirmPassword, name, email } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Password and Confirm Password do not match' });
    }

    let existingUser = await Candidate.findOne({ phonenumber });
    if (existingUser) {
      return res.status(400).json({ message: 'Phone number or email Id already exists' });
    }

    existingUser = await Candidate.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Phone number or email Id already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newCandidate = new Candidate({
      phonenumber,
      password: hashedPassword,
    
      email,
    });

    await newCandidate.save();

    req.session.userId = newCandidate._id;
    res.redirect('/profile');
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const login = async (req, res) => {
  try {
    const { identifier, password } = req.body;
    const candidate = await Candidate.findOne({
      $or: [{ phonenumber: identifier }, { email: identifier }]
    });
    if (!candidate) {
      return res.status(401).json({ message: 'Invalid phonenumber or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, candidate.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid phonenumber or password' });
    }

    req.session.userId = candidate._id;
    res.redirect('/profile');
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal server error' });
    }
    
    // Redirect to the login page with a logout message
    res.redirect('/auth/login?message=Logout successful');
  });
};


module.exports = {
  signup,
  login,
  logout
};
