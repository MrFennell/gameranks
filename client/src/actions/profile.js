import * as apiUtil from '../util/profile';
import { receiveErrors } from './error';

export const LOAD_PROFILE_GAMES = 'LOAD_PROFILE_GAMES';
export const UPDATE_PROFILE_GAME_LIKE = 'UPDATE_PROFILE_GAME_LIKE';
// export const CLEAR_PROFILE_GAMES = 'CLEAR_PROFILE_GAMES';

const loadProfileGames = games => ({
    type: LOAD_PROFILE_GAMES,
    games
});

const updateProfileGameLike = games => ({
    type: UPDATE_PROFILE_GAME_LIKE,
    games
});

// const clearProfileGames = games => ({
//     type: CLEAR_PROFILE_GAMES,
//     games
// });

export const loadGames = games => async dispatch => {
    // console.log('loadGames: '+games)
    // if (games === undefined || games === null){
    //     console.log('games are null')
    //     return [];
    // }
    // else{
        const response = await apiUtil.loadGames(games);
        const data = await response.json();
        if (response.ok) {
            return dispatch(loadProfileGames(data));
        }
        return dispatch(receiveErrors(data));
    // }
}

export const like = games => async dispatch => {
    const response = await apiUtil.updateLike(games);
    const data = await response.json();
    if (response.ok) {
        return dispatch(updateProfileGameLike(data));
    }
    return dispatch(receiveErrors(data));
}

// export const clearGames = () => async dispatch => {
//     const response = await apiUtil.updateLike(games);
//     const data = await response.json();
//     return dispatch(clearProfileGames(data))
// }