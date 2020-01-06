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
        data: 'fields '+
        'age_ratings.category,'+
        'age_ratings.content_descriptions.description,'+
        'age_ratings.rating,'+
        'age_ratings.rating_cover_url,'+
        'age_ratings.synopsis,'+
        'aggregated_rating,'+
        'aggregated_rating_count,'+
        'alternative_names, '+
        'artworks.image_id,'+
        'bundles,'+
        'category,'+
        'collection,'+
        'cover,'+
        'created_at,'+
        'dlcs.name,'+
        'expansions.name,'+
        'external_games,'+
        'first_release_date,'+
        'follows,'+
        'franchise.name,'+
        'franchises.name,'+
        'game_engines.name,'+
        'game_modes.name,'+
        'genres.name,'+
        'involved_companies.company.name,'+
        'involved_companies.company.logo.url,'+
        'keywords.name,'+
        'multiplayer_modes.campaigncoop,'+
        'name,'+
        'platforms.name,'+
        'popularity,'+
        'pulse_count,'+
        'rating,'+
        'rating_count,'+
        'release_dates,'+
        'screenshots.image_id,'+
        'similar_games,'+
        'slug,'+
        'standalone_expansions,'+
        'status,'+
        'summary,'+
        'tags,'+
        'themes,'+
        'time_to_beat,'+
        'total_rating,'+
        'total_rating_count,'+
        'updated_at,'+
        'url,'+
        'cover.image_id,'+
        'popularity,slug; where id = '+gameId+';'
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