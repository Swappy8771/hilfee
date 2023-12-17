

const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path'); 
const multer = require('multer');
const app = express();
const port = 3000;


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/accets', express.static(path.join(__dirname, 'accets')));
app.use('/uploads', express.static('uploads'));

mongoose.connect('mongodb+srv://swapnilpatil8771:brjP3hFg8u9znsZ2@cluster0.4n9juru.mongodb.net', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


app.use(session({
  secret: 'your_secret_key',
  resave: true,
  saveUninitialized: true
}));


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const storage = multer.memoryStorage(); 
const upload = multer({ storage: storage });


app.set('view engine', 'ejs'); 
app.set('views', path.join(__dirname, 'views')); 

const candidateJobsController = require('./controllers/candidateJobsController');


const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const candidateRolesRouter = require('./routes/candidateRoles');
const candidateJobsRouter = require('./routes/candidateJobs');

app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);
app.use('/job-portal', candidateRolesRouter);
app.use('/my-jobs', candidateJobsRouter);
app.post('/upload-video', upload.single('video'), candidateJobsController.uploadVideo);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
