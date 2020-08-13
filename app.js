const twillio = require('twilio');
const model = require('./models');

const client = twillio(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);
const messagingResponse = twillio.twiml.MessagingResponse;

const sendSms = (req, res) => {
  client.messages.create({
    body: '',
    from: '',
    to: ''
  }).then((msg) => {
    console.log(message);
  })
}

const receiveSms = async (req, res) => {
  const message =  req.body.message;
  const splitted = message.split('\n');
  console.log(splitted)
  if (splitted[0].length > 4) {
    // This is a new user, make registration then insert data to db with userId 
    const data = {
      name: splitted[0],
      age: splitted[1],
      sex: splitted[2],
      address: splitted[3],
      ethnicity: splitted[4],
      phone: req.body.from
    }
    const newUser = await model.User.create(data);
    const Id = String(newUser.id);
    const userId = id.padStart(4,'0');
    const message = 'User saved';
  }else{
    // user already exists, insert to db
    const data = {
      userId: parseInt(splitted[0]),
      muac: splitted[1],
    }
    const newRecord = model.Measurements.create(data);
    const message = 'Data saved';
  }
  
  const twilm = new messagingResponse();
  twilm.message()
  res.status(200).send({message , userId: userID});
}

module.exports = {
  sendSms, receiveSms
}

