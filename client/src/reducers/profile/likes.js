import {
    UPDATE_GAME_LIKE
} from 'actions/profile/likes';

import {
    LOAD_LIKES
}from 'actions/profile/profile';

export default (state = [], {type, game}) => {
    Object.freeze(state);
    
    switch (type) {
        case LOAD_LIKES:
        if (game === undefined){
            return []
        }
            return game;
        case UPDATE_GAME_LIKE:
            const likesFound = state.find(x => x.game_id === game.game_id);
            if (likesFound){
                return state.filter(e => e.game_id !== game.game_id);
            }else{
                return [
                    ...state,
                    {'game_id':game.game_id}
                ]
            }
        default:
            return state;
    }
};