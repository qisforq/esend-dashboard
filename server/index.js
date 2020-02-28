const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
require('./services/passport');

const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/../client/dist')));

require('./routes/authRoutes')(app)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}!`);
});
