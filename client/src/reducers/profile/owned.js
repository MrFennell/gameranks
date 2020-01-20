import {
    UPDATE_GAME_OWNED
} from 'actions/profile/owned';

import {
    LOAD_OWNED
}from 'actions/profile/profile';

export default (state = [], {type, game}) => {
    Object.freeze(state);
    
    switch (type) {
        case LOAD_OWNED:
            if (game === undefined){
                return []
            }
            return game;
        case UPDATE_GAME_OWNED:
            const ownedFound = state.find(x => x.game_id === game.game_id);
            if (ownedFound){
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