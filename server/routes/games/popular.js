import express from 'express';
require('dotenv').config()
const PopularRoutes = express.Router();
const axios = require('axios');
const GAME_API = process.env.GAME_API;

PopularRoutes.post('', async (req, res) => {
    try {
        const games = await axios({
            method: 'post',
            url: 'https://api-v3.igdb.com/games',
            headers: {
                'Accept': 'application/json',
                'user-key': GAME_API
            },
            data:'fields name,popularity, screenshots.*; sort popularity desc;'
            
        })

        if (games) {
            res.json(games.data);
        }

    } catch (error) {
        res.json(error)
    }
});

export default PopularRoutes;