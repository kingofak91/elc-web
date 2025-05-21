const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const path = require('path');
const helmet = require('helmet');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/dbConfig');
const cookieParser = require('cookie-parser');

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(cors());

const meterRoutes     = require('./routes/meterRoutes');
const bankingRoutes   = require('./routes/bankingRoutes');
const Routes = require('./routes/meterUpdateRoutes');


app.get('/upi/:uniqueId', (req, res) => {
  const { uniqueId } = req.params;
  res.render('upi', { uniqueId });
});

app.use('/', meterRoutes);
app.use('/', bankingRoutes);
app.use('/meter-updates', Routes);
// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
