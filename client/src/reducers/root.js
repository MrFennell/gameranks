import { combineReducers } from 'redux';
import errors from './errors/errors';
import session from './session/session';
import games from './profile/games';

export default combineReducers({
    session,
    errors,
    games
});