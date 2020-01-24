import {
    UPDATE_GAME_RATINGS
} from 'actions/profile/ratings';

import {
    LOAD_RATINGS
}from 'actions/profile/profile';

export default (state = [], {type, game}) => {
    Object.freeze(state);
    
    switch (type) {
        case LOAD_RATINGS:
            if (game === undefined){
                return []
            }
            return game;
        case UPDATE_GAME_RATINGS:
            const ownedFound = state.find(x => x.game_id === game.game_id);
            if (ownedFound){
                return state.filter(e => e.game_id !== game.game_id);
            }else{
                return [
                    ...state,
                    {'game_id':game.game_id, 'rating': game.rating}
                ]
            }
        default:
            return state;
    }
};