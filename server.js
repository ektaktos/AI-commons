const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const { sendSms, receiveSms } = require('./app');
const db = require('./models');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.post('/sms/send', sendSms);
app.post('/sms/receive', receiveSms);

db.sequelize.sync().then((res) => {
  
});

app.listen(process.env.PORT, ()=> {
  console.log(`App listening at ${process.env.PORT}`);
})