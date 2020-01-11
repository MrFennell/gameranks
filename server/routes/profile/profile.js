import express from 'express';
require('dotenv').config()
import Profile from '../../models/Profile';
const session = require('express-session');
const ProfileRoutes = express.Router();
const axios = require('axios');
import { parseError} from '../../util/helpers';

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
        const game = req.body;
        const sessionUser =  req.session.user.username;
        if(game){
            //search for user profile
            const sessionUser =  req.session.user.username;
            const profile = await Profile.findOne({username: sessionUser});
            const like = game.likes;
            
            if (profile){
                //check for existing game entry
                const gameCheck = await Profile.findOne({username: sessionUser, "games.game_id":game.id});
                
                // add field if value is true
                if (gameCheck && like === true){
                    await Profile.updateOne(
                        {"username": sessionUser, "games.game_id":game.id},
                        {$set:{'games.$.likes': true}}
                    )
                    const game_response = {game_id: game.id, likes: like}
                    res.send(game_response);
                
               // delete field if value is false
               }else if (gameCheck && like === false){

                   //check the number of fields left. If there is only the Id, delete the game entry.
                    const gameIndex = gameCheck.games.findIndex(e => e.game_id === game.id) ;
                    const storeGameData = Object.keys(gameCheck.games[gameIndex]);
                    const numberOfEntries = storeGameData.length; //reuse the original query's data but subtract one since we just deleted it
                  

                    if (numberOfEntries <= 2){

                        await Profile.updateOne(
                            {"username": sessionUser, "games.game_id":game.id},
                            {$pull:{'games':{'game_id':game.id}}}
                        )

                        const game_response = {game_id: game.id, likes: false}
                        res.send(game_response);
                    }else{
                        
                        await Profile.updateOne(
                            {"username": sessionUser, "games.game_id":game.id},
                            {$unset:{'games.$.likes': false}}
                        )

                        const game_response = {game_id: game.id, likes: false}
                        res.send(game_response);

                    }



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

ProfileRoutes.post('/played', async (req, res) => {
    try {
        const game = req.body;
        if(game){
            //search for user profile
            const sessionUser =  req.session.user.username;
            const profile = await Profile.findOne({username: sessionUser});
            const played = game.played;
            if (profile){
                //check for existing game entry
                const gameCheck = await Profile.findOne({username: sessionUser, "games.game_id":game.id});

                // update field in object only
                if (gameCheck && played === true){
                    await Profile.updateOne(
                        {"username": sessionUser, "games.game_id":game.id},
                        {$set:{'games.$.played': played}}
                    )

                    //check the number of fields left. If there is only the Id, delete the game entry.
                    const gameIndex = gameCheck.games.findIndex(e => e.game_id === game.id) ;
                    const storeGameData = Object.keys(gameCheck.games[gameIndex]);
                    const numberOfEntries = storeGameData.length; //reuse the original query's data but subtract one since we just deleted it
    

                    const game_response = {game_id: game.id, played: played}
                    res.send(game_response);
                //if no game exists already create new entry
                }else if (gameCheck && played === false){

                   //check the number of fields left. If there is only the Id, delete the game entry.
                    const gameIndex = gameCheck.games.findIndex(e => e.game_id === game.id) ;
                    const storeGameData = Object.keys(gameCheck.games[gameIndex]);
                    const numberOfEntries = storeGameData.length; //reuse the original query's data but subtract one since we just deleted it
                  
                    //delete
                    if (numberOfEntries <= 2){

                        await Profile.updateOne(
                            {"username": sessionUser, "games.game_id":game.id},
                            {$pull:{'games':{'game_id':game.id}}}
                        )

                        const game_response = {game_id: game.id, likes: false}
                        res.send(game_response);
                        
                    //update
                    }else{
                        
                        await Profile.updateOne(
                            {"username": sessionUser, "games.game_id":game.id},
                            {$unset:{'games.$.played': false}}
                        )

                        const game_response = {game_id: game.id, likes: false}
                        res.send(game_response);

                    }



                 //if no game exists already create new entry
                }else{
                    await Profile.updateOne(
                        {"username": sessionUser},
                        {
                            $push:{'games': {
                                    "game_id": game.id,
                                    "played" : played
                            }}
                        }
                    )
                    const game_response = {game_id: game.id, played: played}
                    res.send(game_response);
                }
            }
        }
    } catch (err) {
        res.status(400).send(parseError(err));
    }
});


export default ProfileRoutes;