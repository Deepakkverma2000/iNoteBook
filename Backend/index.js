const connectToMongo = require('./db');
var cors = require('cors')
const express = require('express')
const app = express()

app.use(cors())




connectToMongo();
const port = 5000
// I we are sending any request.body, It is compulsary
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})