/*
 * action 类型
 */

export const CHANGE_TAB = 'CHANGE_TAB';
export const LOAD_SINGLES = 'LOAD_SINGLES';
export const LOAD_ALBUM = 'LOAD_ALBUM';
export const ADD_PLAYLIST = 'ADD_PLAYLIST';
export const REMOVE_PLAYLIST = 'REMOVE_PLAYLIST';
export const PLAY_THIS_SINGLE = 'PLAY_THIS_SINGLE';
export const PLAY_THIS_SINGLE_TO_LIST = 'PLAY_THIS_SINGLE_TO_LIST';
export const GET_BROWSER_HEIGHT = 'GET_BROWSER_HEIGHT';
export const DO_PLAY = 'DO_PLAY';
export const DO_PAUSE = 'DO_PAUSE';
export const CHANGE_LOOP = 'CHANGE_LOOP';
export const SET_CURRENTTIME = 'SET_CURRENTTIME';
export const PRE_SINGLE = 'PRE_SINGLE';
export const NEXT_SINGLE = 'NEXT_SINGLE';
export const PLAYLIST_HOVERED = 'PLAYLIST_HOVERED';
export const PLAYLIST_HOVEREOUT = 'PLAYLIST_HOVEREOUT';
export const SINGLELIST_HOVERED = 'SINGLELIST_HOVERED';
export const SINGLELIST_HOVEREOUT = 'SINGLELIST_HOVEREOUT';
export const CHANGE_VALUM = 'CHANGE_VALUM';
export const PLAY_ALL = 'PLAY_ALL';


/*
 * action 创建函数
 */

export function changeTab(tab) {
    return{
        type: CHANGE_TAB,
        tab
    }
}

export function loadSingles(singles) {
    return {
        type: LOAD_SINGLES,
        singles
    }
}

export function loadAlbum(album) {
    return {
        type: LOAD_ALBUM,
        album
    }
}

export function addPlaylist(singleIdArray) {
    return{
        type: ADD_PLAYLIST,
        singleIdArray
    }
}

export function removePlaylist(singleId) {
    return{
        type: REMOVE_PLAYLIST,
        singleId
    }
}

export function playThisSingle(currentSingle) {
    return{
        type: PLAY_THIS_SINGLE,
        currentSingle
    }
}

export function playThisSingleToList(singleIdArray) {
    return{
        type: PLAY_THIS_SINGLE_TO_LIST,
        singleIdArray
    }
}

export function getBrowserHeight(browserHeight) {
    return{
        type: GET_BROWSER_HEIGHT,
        browserHeight
    }
}

export function doPlay(currentSingle) {
    return{
        type: DO_PLAY,
        currentSingle
    }
}

export function doPause(currentSingle) {
    return{
        type: DO_PAUSE,
        currentSingle
    }
}

export function changeLoop(loopModel) {
    return{
        type: CHANGE_LOOP,
        loopModel
    }
}

export function setCurrentTime(currentTimes) {
    return{
        type: SET_CURRENTTIME,
        currentTimes
    }
}

export function playPreSingle(preSingle) {
    return{
        type: PRE_SINGLE,
        preSingle
    }
}

export function playNextSingle(nextSingle) {
    return{
        type: NEXT_SINGLE,
        nextSingle
    }
}

export function playListHovered(singleId) {
    return{
        type: PLAYLIST_HOVERED,
        singleId
    }
}

export function playListHoverOut() {
    return{
        type: PLAYLIST_HOVEREOUT
    }
}

export function singleListHovered(singleId) {
    return{
        type: SINGLELIST_HOVERED,
        singleId
    }
}

export function singleListHoverOut() {
    return{
        type: SINGLELIST_HOVEREOUT
    }
}

export function changeValum(valum) {
    return{
        type: CHANGE_VALUM,
        valum
    }
}

export function playAll(singleIdArray) {
    return{
        type: PLAY_ALL,
        singleIdArray
    }
}

