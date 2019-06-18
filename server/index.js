require('newrelic');
const express = require('express');
const path = require('path');
const app = express();
const axios = require('axios');
const request = require('request');

app.use('/', express.static(path.join(__dirname, '../public')));

app.get('/:id', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.get('/restaurants/:id/reservations', (req, res) => {
  const { id } = req.params;
  axios.get(`http://18.223.184.243:3020/restaurants/${id}/reservations`)
  .then(response => {
    res.status(200).send(response.data);
  })
  .catch(error => {
    res.status(500).send();
  });
  // request
  // .get(`http://localhost:3020/restaurants/${id}/reservations`)
  // .on('data', (data) => {
  //   res.send(data).status(200);
  // })
  // .on('error', (err) => {
  //   res.sendStatus(500);
  // })
});

// app.post('/restaurants/:id/reservations', (req, res) => {
//   const { id } = req.params;
//   axios.get(`http://localhost:3020/restaurants/${id}/reservations`)
//   .then(response => {
//     res.status(201).send(response.data);
//   })
//   .catch(error => {
//     res.status(500).send();
//   });
// });

app.listen(3000, () => {
  console.log('Open Table proxy server listening on port 3000!');
});
