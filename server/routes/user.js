import Joi from '@hapi/joi';
import express from 'express';
import User from '../models/user';
import Profile from '../models/Profile';

import { signUp } from '../validations/user';
import { parseError, sessionizeUser } from '../util/helpers';

const userRoutes = express.Router();

userRoutes.post('', async (req, res) => {
    try {
        const { username, email, password } = req.body
        const value = await signUp.validateAsync({ username, email, password });
        if(value){
            const newUser = new User({ username, email, password });
            const sessionUser = sessionizeUser(newUser);
            await newUser.save();
            
            req.session.user = sessionUser;

            if(sessionUser.username){
                const games = [];
                const newProfile = new Profile({username: sessionUser.username}, games)
                await newProfile.save();
                res.send(sessionUser);
            }
        }
        
    } catch (err) {
        console.log(err);
        res.status(400).send(parseError(err));
    }
});

export default userRoutes;