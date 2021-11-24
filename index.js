var express = require('express')
var bodyParser = require('body-parser')
var DataStore = require('nedb')

const port = 3000
var BASE_API_PATH = "/api/v1"
var DB_FILE_NAME = __dirname + "/contacts.json"


console.log("Starting API server...")

const app = express()
app.use(bodyParser.json())

var db = new DataStore({
  filename: DB_FILE_NAME,
  autoload: true
});


app.get('/', (req, res) => {
  res.send('<html><body><h1>My server</h1></body></html>')
})

app.post(BASE_API_PATH + "/contacts", (req, res) => {
  console.log(Date() + " - POST /contacts");
    
  var contact = req.body;
  db.insert(contact, (err) => {
      if (err) {
        console.log(Date() + " - " + err);
        res.sendStatus(500);
      }else {
        res.sendStatus(201);
      }
  });
})

app.get(BASE_API_PATH + "/contacts", (req, res) => {
  console.log(Date() + " - GET /contacts");

  db.find({}, (err, contacts) => {
    if (err) {
      console.log(Date() + " - " + err);
      res.sendStatus(500);
    }else {
      res.send(contacts.map((contact) =>{
        delete contact._id;
        return contact;
      }));
    }
  });
});

app.put(BASE_API_PATH + "/contacts", (req, res) => {
  console.log(Date() + " - PUT /contacts");

  var updContact = req.body;

  db.update({ name: updContact.name }, {$set: { name: updContact.name, phone: updContact.phone }}, (err, numReplaced) => {
    if (err) {
      console.log(Date() + " - " + err);
      res.sendStatus(500);
    }else {
      res.sendStatus(200);
      console.log(Date() + " - Put /contacts - updated " + numReplaced + " entities");
    }
  });
});

app.delete(BASE_API_PATH + "/contacts", (req, res) => {
  console.log(Date() + " - DELETE /contacts");

  var contactName = req.body;

  db.remove({name: contactName.name}, (err, numRemoved) => {
    if (err) {
      console.log(Date() + " - " + err);
      res.sendStatus(500);
    }else {
      res.sendStatus(200);
      console.log(Date() + " - DELETE /contacts - deleted " + numRemoved + " entities");
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

console.log("Server ready")