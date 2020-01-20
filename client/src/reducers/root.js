import { combineReducers } from 'redux';
import errors from './errors/errors';
import session from './session/session';
import games from './profile/games';
import profile from './profile/profile';
import likes from './profile/likes';
import owned from './profile/owned';
import want from './profile/want';


export default combineReducers({
    session,
    errors,
    games,
    profile,
    likes,
    owned,
    want
});