import express from 'express';
require('dotenv').config()

const SingleGameRoutes = express.Router();
const axios = require('axios');
const GAME_API = process.env.GAME_API;

SingleGameRoutes.post('', async (req, res) => {
    const gameId = req.body.gameId;

    axios({
        method: 'post',
        url: 'https://api-v3.igdb.com/games',
        headers: {
            'Accept': 'application/json',
            'user-key': GAME_API
        },
        data: 'fields name,cover.image_id,popularity,slug; where id = '+gameId+';'
    })
    .then(e => {
        console.log(e.data);
        res.json(e.data);
    })
    .catch(err => {
        console.error(err);
    });
});


export default SingleGameRoutes;