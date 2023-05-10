require("dotenv").config();
const productsRouter = require('./productsRouter');
const usersRouter = require('./usersRouter');

const APISTORE =  process.env.APISTORE
function routerApi(app){
  app.use(APISTORE + '/products', productsRouter);
  app.use(APISTORE + '/users', usersRouter);
  app.use(APISTORE + '/users', usersRouter);
}

module.exports = routerApi
