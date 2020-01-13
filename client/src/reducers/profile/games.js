import {
    LOAD_PROFILE_GAMES,
    UPDATE_PROFILE_GAME_LIKE,
    UPDATE_PROFILE_GAME_PLAYED,
    UPDATE_PROFILE_GAME_WANT
} from 'actions/profile/games';

export default (state = [], {type, games}) => {
    Object.freeze(state);
    switch (type) {
        case LOAD_PROFILE_GAMES:
            return games;
        case UPDATE_PROFILE_GAME_LIKE:
            //update state array where game.like changed
            const likes = games.likes;
            const likesFound = state.find(x => x.game_id === games.game_id);
            if (likesFound){
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
        case UPDATE_PROFILE_GAME_PLAYED:
            //update state array where game.like changed
            const played = games.played;
            const playFound = state.find(x => x.game_id === games.game_id);
            if (playFound){
                return state.map((item, index) => {
                if(item.game_id === games.game_id){
                    return {
                        ...item,
                        played: played
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
        case UPDATE_PROFILE_GAME_WANT:
            //update state array where game.like changed
            const want = games.want;
            const wantFound = state.find(x => x.game_id === games.game_id);
            if (wantFound){
                return state.map((item, index) => {
                if(item.game_id === games.game_id){
                    return {
                        ...item,
                        want: want
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