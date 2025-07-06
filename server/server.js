const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
require('./config/db')();

app.use(express.json());
app.use(cors());

// Routes
app.use('/api/coaching-centers', require('./routes/coachingRoutes'));
app.use('/api/courses', require('./routes/courseRoutes'));
app.use('/api/subjects', require('./routes/subjectRoutes'));
app.use('/api/tests', require('./routes/testRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
