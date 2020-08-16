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
  const message =  req.body.Body;
  console.log(message);
  const splitted = message.split('\n');
  console.log(splitted);
  if (splitted.length > 3) {
    // This is a new user, make registration then insert data to db with userId 
    const data = {
      name: splitted[0],
      age: splitted[1],
      sex: splitted[2],
      address: splitted[3],
      ethnicity: splitted[4],
      phone: req.body.From
    }
    const newUser = await model.User.create(data);
    const Id = String(newUser.id);
    const userId = Id.padStart(4,'0');
    const twiml = new messagingResponse();
    twiml.message(`Hi ${newUser.name}, You have been registered. Your user ID is ${userId}. \n Note: You are to use this ID to send ${newUser.name}'s measurement.`);
    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
  }else{
    // user already exists, insert to db
    const data = {
      userId: parseInt(splitted[0]),
      muac: splitted[1],
    }
    const newRecord = model.Measurements.create(data);
    const user = await model.User.findOne({
      where: { id: data.userId },
    });
    const Id = String(user.id);
    const userId = Id.padStart(4,'0');
    const twiml = new messagingResponse();
    twiml.message(`Hi, ${user.name} (${userId}) \nYour Measurement has been received`);
    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
  }
}

module.exports = {
  sendSms, receiveSms
}

