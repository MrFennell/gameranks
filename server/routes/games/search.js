import express from 'express';
require('dotenv').config()
const SearchRoutes = express.Router();
const axios = require('axios');
const GAME_API = process.env.GAME_API;

SearchRoutes.post('', async (req, res) => {
    const query = req.body.query.game;
    try {
        const games = await axios({
            method: 'post',
            url: 'https://api-v3.igdb.com/games',
            headers: {
                'Accept': 'application/json',
                'user-key': GAME_API
            },
                data:'fields name, slug, popularity, cover.image_id, release_dates.y, release_dates.m; where name ~ '+'"'+query+'"'+'*; sort popularity desc; limit 20;'
            })
        if (games) {
            res.json(games.data);
        }

    } catch (error) {
        res.json(error)
    }
});

SearchRoutes.post('/gameSuggestions', async (req, res) => {
    const query = req.body.query;
    try {
        const games = await axios({
            method: 'post',
            url: 'https://api-v3.igdb.com/games',
            headers: {
                'Accept': 'application/json',
                'user-key': GAME_API
            },
                data:'fields name, slug, popularity; where name ~ '+'"'+query+'"'+'*; sort popularity desc; limit 10; '
            })
        if (games) {
            res.json(games.data);
        }

    } catch (error) {
        res.json(error)
    }
});

SearchRoutes.post('/covers', async (req, res) => {
    const covers = req.body.games;

    const queryToString = covers.map(function(item){
        return item['game_id'];
    })

    try {
        const games = await axios({
            method: 'post',
            url: 'https://api-v3.igdb.com/games',
            headers: {
                'Accept': 'application/json',
                'user-key': GAME_API
            },
                data:'fields name, slug, cover.image_id; where id = ('+queryToString+');'
            })

        if (games) {
            res.json(games.data);
        }

    } catch (error) {
        res.json(error)
    }
});

export default SearchRoutes;