require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
const PostRoutes = require('./src/routes/PostRoutes');

app.use(cors());
app.use(express.json());
app.use('/api/', new PostRoutes().getRouter());

app.listen(port, () => {
  console.log(`Você se conectou na porta ${port}! 🚀`);
});

module.exports = app;
