import {ADD_SONG, API_FAIL, API_REQUESTED, API_START, API_SUCCESS, UPDATE_SONG} from "../actions/SongActions";

const initialState = {
    songs: [],
    songID: 1
}

export default function SongReducer(state = initialState, action) {
    switch(action.type) {
        case ADD_SONG: {
            let songs = state.songs;
            let newSong = {songID: state.songID ++, ...action.payload, apiRequested: false, loading: false};
            songs.push(newSong);
            return {
                ...state,
                songs: songs,
                songID: state.songID++
            };
        }
        case UPDATE_SONG: {
            let {id, key, value} = action.payload;

            state.songs[id-1][key] = value;
            return state;

        }
        case API_START: {
            let {id} = action.payload;
            let songs = state.songs;
            songs[id-1].loading = true;
            return {
                ...state,
                songs: songs
            }
        }
        case API_SUCCESS: {
            let {id, duration, album, songData} = action.payload;
            let details = {
                duration: duration,
                album: album
            }
            let songs = state.songs;
            songs[id-1].duration = details.duration;
            songs[id-1].album = details.album;
            songs[id-1].loading = false;
            songs[id-1].apiRequested = true;
            songs[id-1].data = songData;
            console.log({...state, songs:songs});
            return {
                ...state,
                songs: songs
            }
        }
        case API_FAIL: {
            let {id} = action.payload;
            let songs = state.songs;
            songs[id-1].loading = false;
            songs[id-1].failed = true;
            return {
                ...state,
                songs: songs
            }

        }
        case API_REQUESTED: {
            let {id} = action.payload;
            let songs = state.songs;
            songs[id-1].loading = false;
            return {
                ...state,
                songs: songs
            };
        }
        default:
            return state;
    }
}