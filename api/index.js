

const express = require('express');
const routerApi = require('./routes');
const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler');
const cors = require('cors');

//const certifi = require('certifi');
// Get the path to the trusted certificate bundle
//process.env.SSL_CERT_FILE = certifi.where();

const app = express();
const port = 3020;

app.use(express.json());
const whitelist = ['http://localhost:8080'];
const options = {
  origin: (origin, callback) => {
    if(whitelist.includes(origin)){
      callback(null, true);
    }
    else{
      callback(new Error('Not allowed '))
    }
  }
}
app.use(cors());

app.get('/api', (req, res) => {
  res.send('Hola mi server en express');
});

app.get('/api/nueva-ruta', (req, res) => {
  res.send('Hola soy una nueva ruta');
});

routerApi(app);

app.use(boomErrorHandler);
app.use(logErrors)
app.use(errorHandler)




app.listen(port, () => {
  console.log('running on port '+ port)
});

