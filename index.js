var express = require('express')
var bodyParser = require('body-parser')

const port = 3000
var BASE_API_PATH = "/api/v1"

var contacts = [
    {"name": "peter", "phone": "123456789"},
    {"name": "john", "phone": "987654321"}
]

console.log("Starting API server...")

const app = express()
app.use(bodyParser.json())


app.get('/', (req, res) => {
  res.send('<html><body><h1>My server</h1></body></html>')
})

app.post(BASE_API_PATH + "/contacts", (req, res) => {
    console.log(Date() + " - GET /contacts");
    var contact = req.body;
    contacts.push(contact);
    res.sendStatus(201);
})

app.get(BASE_API_PATH + "/contacts", (req, res) => {
    console.log(Date() + " - POST /contacts");
    res.send(contacts);
  })

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

console.log("Server ready")