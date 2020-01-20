import * as apiUtil from 'util/profile/games';
import { receiveErrors } from 'actions/error';

export const UPDATE_GAME_LIKE = 'UPDATE_GAME_LIKE';

const updateGameLike = game => ({
    type: UPDATE_GAME_LIKE,
    game
});

export const addLike = game => async dispatch => {
    game.likes = true;
    const response = await apiUtil.updateLike(game);
    const data = await response.json();
    if (response.ok) {
        return dispatch(updateGameLike(data));
    }
    return dispatch(receiveErrors(data));
}

export const removeLike = game => async dispatch => {
    game.likes = false;
    const response = await apiUtil.updateLike(game);
    const data = await response.json();
    if (response.ok) {
        return dispatch(updateGameLike(data));
    }
    return dispatch(receiveErrors(data));
}