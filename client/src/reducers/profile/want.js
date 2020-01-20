import {
    UPDATE_GAME_WANT
} from 'actions/profile/want';

import {
    LOAD_WANT
}from 'actions/profile/profile';

export default (state = [], {type, game}) => {
    Object.freeze(state);
    
    switch (type) {
        case LOAD_WANT:
            if (game === undefined){
                return []
            }
            return game;
        case UPDATE_GAME_WANT:
            // const want = game.want;
            const found = state.find(x => x.game_id === game.game_id);
            if (found){
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