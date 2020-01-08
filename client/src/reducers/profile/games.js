import {
    UPDATE_PROFILE_GAME_LIKE,
    LOAD_PROFILE_GAMES
} from '../../actions/profile';

export default (state = [], {type, games}) => {
    Object.freeze(state);
    switch (type) {
        case LOAD_PROFILE_GAMES:
            return games;
        case UPDATE_PROFILE_GAME_LIKE:
            //update state array where game.like changed
            
            const likes = games.likes;
            const found = state.find(x => x.game_id === games.game_id);
            console.log(found);
            if (found){
                return state.map((item, index) => {
                if(item.game_id === games.game_id){
                    return {
                        ...item,
                        likes: likes
                    }
                }
                    return item
                });
            }else{
                return [
                    ...state,
                    games
                ]
            }
            
        default:
            return state;
    }
};