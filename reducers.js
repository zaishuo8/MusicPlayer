import { combineReducers } from 'redux';
import { LOAD_SINGLES, LOAD_ALBUM, ADD_PLAYLIST,
    REMOVE_PLAYLIST, PLAY_THIS_SINGLE,
    PLAY_THIS_SINGLE_TO_LIST ,GET_BROWSER_HEIGHT, DO_PLAY,
    DO_PAUSE, CHANGE_LOOP, SET_CURRENTTIME,
    ANTHER_SINGLE, PLAYLIST_HOVERED,
    PLAYLIST_HOVEREOUT, SINGLELIST_HOVERED,
    SINGLELIST_HOVEREOUT, CHANGE_VALUM, CHANGE_TAB,
    PLAY_ALL, CHANGE_CLICKTIP, REMOVE_ALL_SINGLE } from './actions/actions';

// 当前页面: 曲库 ? 播放器
function tab( state = 'myMusic', action ) {
    switch (action.type){
        case CHANGE_TAB:
            return action.tab;
        default:
            return state;
    }
}


// 曲库列表
function loadSingles(state = {}, action) {
    switch (action.type) {
        case LOAD_SINGLES:
            return  action.singles;
        default:
            return state;
    }
}


// 专辑列表
function loadAlbum(state = {}, action) {
    switch (action.type) {
        case LOAD_ALBUM:
            return  action.album;
        default:
            return state;
    }
}


// 数组去重函数,工具函数
function unique(arr) {
    var result=[];
    for(var i=0; i<arr.length; i++){
        if(result.indexOf(arr[i])==-1){
            result.push(arr[i])
        }
    }
    return result;
}

// 播放列表
function playList( state = [], action) {
    switch (action.type){

        // 放到列表尾部
        case ADD_PLAYLIST:
            return unique(state.slice(0).concat(action.singleIdArray));

        // 放到列表头部
        case PLAY_THIS_SINGLE_TO_LIST:
            return unique(action.singleIdArray.concat(state.slice(0)));

        case PLAY_ALL:
            return unique(action.singleIdArray.concat(state.slice(0)));

        // 移出播放列表
        case REMOVE_PLAYLIST:
            let newState = state.slice(0);
            for(let i = 0; i < newState.length; i++){
                if(newState[i] === action.singleId) newState.splice(i, 1);
            }
            return newState;

        // 移除所有歌曲
        case REMOVE_ALL_SINGLE:
            return [];

        default:
            return state;
    }
}


// 当前播放单曲
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
        case ANTHER_SINGLE:
            return action.preSingle;
        default:
            return state;
    }
}


// 浏览器高度,该数据用于定位 控制器 位置
function browserHeight( state = 0 , action ) {
    switch (action.type){
        case GET_BROWSER_HEIGHT:
            return action.browserHeight;
        default:
            return state;
    }
}


// 循环方式
function loopModel( state = 'all-loop', action) {
    switch (action.type){
        case CHANGE_LOOP:
            return action.loopModel;
        default:
            return state;
    }
}


// 音量
function valum( state = '0.5', action ) {
    switch (action.type){
        case CHANGE_VALUM:
            return action.valum;
        default:
            return state;
    }
}


// 播放列表中被 hovered 的单曲 ( 判断是否显示功能组件 )
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


// 曲库列表中被 hovered 的单曲 ( 判断是否显示功能组件 )
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



// clickTip 状态
function clickTipStatus( state = 'none', action) {
    switch (action.type){
        case CHANGE_CLICKTIP:
            return action.opMessage
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
    valum,
    clickTipStatus
});

export default musicReducer;