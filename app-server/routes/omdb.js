const express = require('express');
const Router = express.Router();
const axios = require('axios');  

const OMDB_API_KEY=process.env.OMDB_API_KEY;
const OMDB_URL=process.env.OMDB_URL;



Router.get('/search', (req, res) => {
    // query parameter
    const search = req.query.title;
    const url = `${OMDB_URL}?apikey=${OMDB_API_KEY}&s=${search}`
    axios.get(url)
      .then(function (response) {
          // handle success
          res.send(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
});

Router.get('/result/:imdbId', (req, res) => {
    // route parameter
    const imdbId = req.params.imdbId;
    const url = `${OMDB_URL}?apikey=${OMDB_API_KEY}&i=${imdbId}`
    axios.get(url)
      .then(function (response) {
          // handle success
          res.send(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error.message);
      });
});

module.exports = Router;