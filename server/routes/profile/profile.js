import express from 'express';
require('dotenv').config()
import Profile from '../../models/Profile';
const session = require('express-session');
const ProfileRoutes = express.Router();
const axios = require('axios');

ProfileRoutes.get('/loadUserGames', async (req, res) => {
    const user =  req.body.user
    if (sessionUser){
        const username = user.username;
        const profile = await Profile.findOne({username: username});
        if (profile){
            res.send(profile.games);
        }
    }else{
        res.send('User not found.')
    }
})

ProfileRoutes.get('/loadGames', async (req, res) => {
    const sessionUser =  req.session.user
    if (sessionUser){
        const username = sessionUser.username;
        const profile = await Profile.findOne({username: username});
        if (profile){
            res.send(profile.games);
        }
    }else{
        res.send([])
    }
})

ProfileRoutes.post('/likes', async (req, res) => {
 try {
        const { game } = req.body;
        if(game){
                
            //search for user profile
            const sessionUser =  req.session.user.username;
            const profile = await Profile.findOne({username: sessionUser});
            const like = true;
            
            if (profile){
                //check for existing game entry
                const gameCheck = await Profile.findOne({username: sessionUser, "games.game_id":game.id});
                
                // update field in object only
                if (gameCheck){
                    await Profile.updateOne(
                        {"username": sessionUser, "games.game_id":game.id},
                        {$set:{'games.$.likes': like}
                        }
                    )
                    const game_response = {game_id: game.id, likes: like}
                    res.send(game_response);
                //if no game exists already create new entry
                }else{
                    await Profile.updateOne(
                        {"username": sessionUser},
                        {
                            $push:{'games': {
                                    "game_id": game.id,
                                    "likes" : like
                            }}
                        }
                    )
                    const game_response = {game_id: game.id, likes: like}
                    res.send(game_response);

                }
            }
        }
    } catch (err) {
        res.status(400).send(parseError(err));
    }
    
});


export default ProfileRoutes;