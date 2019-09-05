/* eslint-disable import/no-extraneous-dependencies */
import express from 'express';
import bodyParser from 'body-parser';
import '@babel/polyfill';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

app.get('/', (req, res) => {
  res.send('Homepage! Hello world.');
});

export default app;
