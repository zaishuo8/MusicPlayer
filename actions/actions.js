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

// 切换 曲库 播放器 界面
export function changeTab(tab) {
    return{
        type: CHANGE_TAB,
        tab
    }
}



// 加载 曲库列表
export function loadSingles(singles) {
    return {
        type: LOAD_SINGLES,
        singles
    }
}



// 加载 专辑列表
export function loadAlbum(album) {
    return {
        type: LOAD_ALBUM,
        album
    }
}



// 添加到播放列表
export function addPlaylist(singleIdArray) {
    return{
        type: ADD_PLAYLIST,
        singleIdArray
    }
}



// 从播放列表中移除
export function removePlaylist(singleId) {
    return{
        type: REMOVE_PLAYLIST,
        singleId
    }
}



// 播放该单曲
export function playThisSingle(currentSingle) {
    return{
        type: PLAY_THIS_SINGLE,
        currentSingle
    }
}



// 曲库中直接播放的单曲添加到 播放列表 表头
export function playThisSingleToList(singleIdArray) {
    return{
        type: PLAY_THIS_SINGLE_TO_LIST,
        singleIdArray
    }
}



// 获取浏览器高度
export function getBrowserHeight(browserHeight) {
    return{
        type: GET_BROWSER_HEIGHT,
        browserHeight
    }
}



// 控制器上播放按钮
export function doPlay(currentSingle) {
    return{
        type: DO_PLAY,
        currentSingle
    }
}



// 控制器上暂停按钮
export function doPause(currentSingle) {
    return{
        type: DO_PAUSE,
        currentSingle
    }
}



// 切换循环方式
export function changeLoop(loopModel) {
    return{
        type: CHANGE_LOOP,
        loopModel
    }
}



// 控制器上 随意拖动进度条修改 当前播放时间
export function setCurrentTime(currentTimes) {
    return{
        type: SET_CURRENTTIME,
        currentTimes
    }
}



// 播放上一曲
export function playPreSingle(preSingle) {
    return{
        type: PRE_SINGLE,
        preSingle
    }
}



// 播放下一曲
export function playNextSingle(nextSingle) {
    return{
        type: NEXT_SINGLE,
        nextSingle
    }
}



// 鼠标移上播放列表
export function playListHovered(singleId) {
    return{
        type: PLAYLIST_HOVERED,
        singleId
    }
}



// 鼠标移开播放列表
export function playListHoverOut() {
    return{
        type: PLAYLIST_HOVEREOUT
    }
}



// 鼠标移上曲库列表
export function singleListHovered(singleId) {
    return{
        type: SINGLELIST_HOVERED,
        singleId
    }
}



// 鼠标移开曲库列表
export function singleListHoverOut() {
    return{
        type: SINGLELIST_HOVEREOUT
    }
}



// 修改音量
export function changeValum(valum) {
    return{
        type: CHANGE_VALUM,
        valum
    }
}



// 播放全部
export function playAll(singleIdArray) {
    return{
        type: PLAY_ALL,
        singleIdArray
    }
}

