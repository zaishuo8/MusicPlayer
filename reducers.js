import { combineReducers } from 'redux';
import { LOAD_SINGLES, LOAD_ALBUM, ADD_PLAYLIST, REMOVE_PLAYLIST, PLAY_THIS_SINGLE,
    PLAY_THIS_SINGLE_TO_LIST ,GET_BROWSER_HEIGHT, DO_PLAY, DO_PAUSE, CHANGE_LOOP, SET_CURRENTTIME,
    PRE_SINGLE, NEXT_SINGLE, PLAYLIST_HOVERED, PLAYLIST_HOVEREOUT, SINGLELIST_HOVERED,
    SINGLELIST_HOVEREOUT, CHANGE_VALUM, CHANGE_TAB, PLAY_ALL } from './actions/actions';

function tab( state = 'myMusic', action ) {
    switch (action.type){
        case CHANGE_TAB:
            return action.tab;
        default:
            return state;
    }
}

function loadSingles(state = {}, action) {
    switch (action.type) {
        case LOAD_SINGLES:
            return  action.singles;
        default:
            return state;
    }
}

function loadAlbum(state = {}, action) {
    switch (action.type) {
        case LOAD_ALBUM:
            return  action.album;
        default:
            return state;
    }
}


//去重复函数
function unique(arr) {
    var result=[];
    for(var i=0; i<arr.length; i++){
        if(result.indexOf(arr[i])==-1){
            result.push(arr[i])
        }
    }
    return result;
}

function playList( state = [], action) {
    switch (action.type){
        case ADD_PLAYLIST:
            return unique(state.slice(0).concat(action.singleIdArray));
        case PLAY_ALL:
            return unique(action.singleIdArray.concat(state.slice(0)));
        case REMOVE_PLAYLIST:
            let newState = state.slice(0);
            for(let i = 0; i < newState.length; i++){
                if(newState[i] === action.singleId) newState.splice(i, 1);
            }
            return newState;
        case PLAY_THIS_SINGLE_TO_LIST:
            return unique(action.singleIdArray.concat(state.slice(0)));
        default:
            return state;
    }
}

function currentSingle( state = {
    singleId: '',
    isPlay: false,
    currentTimes: '00:00'
}, action) {
    switch (action.type){
        case PLAY_THIS_SINGLE:
            return action.currentSingle;
        case DO_PLAY:
            return Object.assign({}, state, { isPlay: (state.singleId ? true : false) });
        case DO_PAUSE:
            return Object.assign({} ,state, { isPlay: false });
        case SET_CURRENTTIME:
            return Object.assign({} ,state, { currentTimes: action.currentTimes });
        case PRE_SINGLE:
            return action.preSingle;
        case NEXT_SINGLE:
            return action.nextSingle
        default:
            return state;
    }
}

function browserHeight( state = 0 , action ) {
    switch (action.type){
        case GET_BROWSER_HEIGHT:
            return action.browserHeight;
        default:
            return state;
    }
}

function loopModel( state = 'all-loop', action) {
    switch (action.type){
        case CHANGE_LOOP:
            return action.loopModel;
        default:
            return state;
    }
}

function playListHovered( state = '', action) {
    switch (action.type){
        case PLAYLIST_HOVERED:
            return action.singleId;
        case PLAYLIST_HOVEREOUT:
            return '';
        default:
            return state;
    }
}

function singleListHovered( state = '', action) {
    switch (action.type){
        case SINGLELIST_HOVERED:
            return action.singleId;
        case SINGLELIST_HOVEREOUT:
            return '';
        default:
            return state;
    }
}

function valum( state = '0.5', action ) {
    switch (action.type){
        case CHANGE_VALUM:
            return action.valum;
        default:
            return state;
    }
}


const musicReducer = combineReducers({
    tab,
    loadSingles,
    loadAlbum,
    playList,
    currentSingle,
    browserHeight,
    loopModel,
    playListHovered,
    singleListHovered,
    valum
});

export default musicReducer;