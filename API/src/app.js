/* eslint-disable import/no-extraneous-dependencies */
import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/user-routes'
import '@babel/polyfill';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

// routes
app.use('/api/v1',userRoutes)


export default app;
