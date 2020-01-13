import express from 'express';
require('dotenv').config()
const SearchRoutes = express.Router();
const axios = require('axios');
const GAME_API = process.env.GAME_API;

SearchRoutes.post('', async (req, res) => {
    console.log(req.body.query);
    const query = req.body.query;
    try {
        const games = await axios({
            method: 'post',
            url: 'https://api-v3.igdb.com/games',
            headers: {
                'Accept': 'application/json',
                'user-key': GAME_API
            },
            data:'fields name, slug, involved_companies; search '+'"'+query+'"'+';'
            })
        if (games) {
            res.json(games.data);
        }

    } catch (error) {
        res.json(error)
    }
});

export default SearchRoutes;