export const ADD_SONG = 'ADD_SONG';
export const UPDATE_SONG ='UPDATE_SONG';
export const API_START = 'API_START';
export const API_FAIL = 'API_FAIL';
export const API_SUCCESS = 'API_SUCCESS';
export const API_REQUESTED = 'API_REQUESTED';

export const addAction = ({name, artist, albumCover}) => dispatch => {

    dispatch({
        type: ADD_SONG,
        payload: {name, artist, albumCover}
    })
}

export const updateAction = ({id, key, value}) => dispatch => {
    dispatch({
        type: UPDATE_SONG,
        payload: {id, key, value}
    })
}

export const showMoreAction = ({id, name, apiRequested}) => async (dispatch) => {
    if(apiRequested === false) {
        dispatch({
            type: API_START,
            payload: {id}
        })

        try{
            let api = 'https://thingproxy.freeboard.io/fetch/https://api.deezer.com/search?q='.concat(name);
            await fetch(api).then(response => response.json()).then(data => {
                console.log(data);
                if (data['data'][0] === undefined) {
                    dispatch({
                        type: API_FAIL,
                        payload: {id}
                    })
                } else {
                    let duration = data['data'][0]['duration'];
                    let album = data['data'][0]['album']['title'];
                    let songData = data['data'];
                    dispatch({
                        type: API_SUCCESS,
                        payload: {id, duration, album, songData}
                    })
                }
            })
        }
        catch {
            dispatch({
                type: API_FAIL,
                payload: {id}
            })
        }
    }
    else {
        dispatch({
            type: API_REQUESTED,
            payload: {id}
        })

    }
}