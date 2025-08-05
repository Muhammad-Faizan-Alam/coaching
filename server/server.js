const express = require('express');
const app = express();
const cors = require('cors');
const serverless = require('serverless-http');
const errorHandler = require('./middlewares/errorHandler');
require('dotenv').config();
require('./config/db')();

app.use(express.json());
app.use(cors());

// Routes
app.use('/api/coaching-centers', require('./routes/coachingRoutes'));
app.use('/api/courses', require('./routes/courseRoutes'));
app.use('/api/subjects', require('./routes/subjectRoutes'));
app.use('/api/tests', require('./routes/testRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/reviews', require('./routes/reviewRoutes'));
app.use('/api/enroll', require('./routes/enrollCourseRoutes'));

app.use(errorHandler);

// Instead of app.listen
module.exports = app;
module.exports.handler = serverless(app);