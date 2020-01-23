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
ProfileRoutes.get('/loadProfile', async (req, res) => {
    const sessionUser =  req.session.user
    if (sessionUser){
        const username = sessionUser.username;
        const profile = await Profile.findOne({username: username});
        // const responseObj = Object.assign({}, profile);
            
            const profCopy = {
                'games': profile.games,
                'likes': profile.likes,
                'owned':profile.owned,
                'want':profile.wishlist
            }
            res.send(profCopy);
    
    }else{
        res.send([])
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

ProfileRoutes.get('/loadLikes', async (req, res) => {
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

                if (like === true){
                    await Profile.updateOne(
                        {"username": sessionUser},
                        {$push:{'likes':{'game_id':game.id}}}
                    )
                
                    const game_response = {game_id: game.id, likes: true}
                    res.send(game_response);
                }
                
               else if (like === false){
                      
                    await Profile.updateOne(
                        {"username": sessionUser},
                        {$pull:{'likes':{'game_id':game.id}}}
                    )

                    const game_response = {game_id: game.id, likes: false}
                    res.send(game_response);

                }
            }
        }
        else{
            res.send();
        }
    } catch (err) {
        res.status(400).send(parseError(err));
    }
});

ProfileRoutes.post('/owned', async (req, res) => {
    
    try {
        const game = req.body;
        const sessionUser =  req.session.user.username;
        if(game){
            //search for user profile
            const sessionUser =  req.session.user.username;
            const profile = await Profile.findOne({username: sessionUser});
            const owned = game.owned;
            
            if (profile){

                if (owned === true){
                    await Profile.updateOne(
                        {"username": sessionUser},
                        {$push:{'owned':{'game_id':game.id}}}
                    )
                
                    const game_response = {game_id: game.id, owned: true}
                    res.send(game_response);
                }
                
               else if (owned === false){
                      
                    await Profile.updateOne(
                        {"username": sessionUser},
                        {$pull:{'owned':{'game_id':game.id}}}
                    )

                    const game_response = {game_id: game.id, owned: false}
                    res.send(game_response);

                }
            }
        }
    } catch (err) {
        res.status(400).send(parseError(err));
    }
});

ProfileRoutes.post('/want', async (req, res) => {

    try {
        const game = req.body;
        const sessionUser =  req.session.user.username;
        if(game){
            //search for user profile
            const sessionUser =  req.session.user.username;
            const profile = await Profile.findOne({username: sessionUser});
            const want = game.want;
            
            if (profile){

                if (want === true){
                    await Profile.updateOne(
                        {"username": sessionUser},
                        {$push:{'wishlist':{'game_id':game.id}}}
                    )
                
                    const game_response = {game_id: game.id, want: true}
                    res.send(game_response);
                }
                
               else if (want === false){
                      
                    await Profile.updateOne(
                        {"username": sessionUser},
                        {$pull:{'wishlist':{'game_id':game.id}}}
                    )

                    const game_response = {game_id: game.id, want: false}
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
                    const game_response = {game_id: game.id, played: played}
                    res.send(game_response);

                 //delete field if false   
                }else if (gameCheck && played === false){

                   //check the number of fields left. If there is only the Id, delete the game entry.
                    const gameIndex = gameCheck.games.findIndex(e => e.game_id === game.id) ;
                    const storeGameData = Object.keys(gameCheck.games[gameIndex]);
                    const numberOfEntries = storeGameData.length; //reuse the original query's data but subtract one since we just deleted it
                  
                    //delete game entry if only id
                    if (numberOfEntries <= 2){

                        await Profile.updateOne(
                            {"username": sessionUser, "games.game_id":game.id},
                            {$pull:{'games':{'game_id':game.id}}}
                        )

                        const game_response = {game_id: game.id, likes: false}
                        res.send(game_response);

                    //remove field only if more fields exist
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