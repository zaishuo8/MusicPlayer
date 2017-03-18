import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ListController from './components/ListController';
import PlayList from './components/PlayList';
import PlayController from './components/PlayController';
require('../style/app.scss');
import { changeTab, getBrowserHeight, doPlay, doPause, changeLoop,
    setCurrentTime, playAntherSingle, playThisSingle,
    playListHovered, playListHoverOut, changeValum, removePlaylist,
    removeAllSingles} from '../actions/actions';

class App extends Component {

    componentWillMount(){

        const { dispatch } = this.props;


        // 获取浏览器高度
        let browserHeight = document.documentElement.clientHeight;
        dispatch(getBrowserHeight(browserHeight));


    }

    componentDidMount(){

        //设置初始音量
        this.refs.trueAudio.volume = this.props.valum;

        // 播放进度
        setInterval( (function() {
            let currentTimeBySec = this.refs.trueAudio.currentTime;

            if( Math.floor(currentTimeBySec) === Math.floor(this.refs.trueAudio.duration)){

                // 相当于nextSingleClick()
                (function () {

                    let singleId = '';

                    if(this.props.loopModel === 'random-loop'){
                        let randomIndex = Math.floor(this.props.playList.length * Math.random());
                        singleId = this.props.playList[randomIndex];
                    }else{
                        for(let i = 0; i < this.props.playList.length; i++){

                            if(this.props.currentSingle.singleId === this.props.playList[i]){
                                if( i === this.props.playList.length - 1 ){
                                    singleId = this.props.playList[0];
                                }else{
                                    singleId = this.props.playList[ i + 1 ];
                                }
                            }
                        }
                    }

                    let nextSingle = {
                        singleId: singleId,
                        isPlay: true,
                        currentTimes: '00:00'
                    };

                    this.props.dispatch(playNextSingle(nextSingle));

                }).bind(this)();
            }else{

                let setMinute = Math.floor(currentTimeBySec/60) + '';
                let setSecond = Math.floor(currentTimeBySec%60) + '';
                if(setMinute.length === 1) { setMinute = '0' + setMinute };
                if(setSecond.length === 1 ) { setSecond = '0' + setSecond };
                let currentTimer = setMinute + ':' + setSecond;

                this.props.dispatch(setCurrentTime(currentTimer));

            }
        }).bind(this), 1000);
    }

    render() {

        const {  nowTab, dispatch, singles, playList, browserHeight, currentSingle,
            loopModel, playListHoveredId, valum } = this.props;

        let backGroungObj = {
            display: nowTab === 'musicPlayer' ? 'block' : 'none',
            width: '100%',
            height: browserHeight + 'px',
            backgroundColor: '#292a2b',
            position: 'fixed',
            top: '0',
            left: '0'
        };


        // 点击播放
        let doPlayClick = (function (currentSingle) {
            dispatch(doPlay(currentSingle));
            this.refs.trueAudio.play();
        }).bind(this);


        // 点击暂停
        let doPauseClick = (function (currentSingle) {
            dispatch(doPause(currentSingle));
            this.refs.trueAudio.pause();
        }).bind(this);


        // 点击修改循环方式
        let changeLoopClick = function (loopModel) {
            switch (loopModel){
                case 'all-loop':
                    dispatch(changeLoop('one-loop'));
                    return;
                case 'one-loop':
                    dispatch(changeLoop('order-loop'));
                    return;
                case 'order-loop':
                    dispatch(changeLoop('random-loop'));
                    return;
                case 'random-loop':
                    dispatch(changeLoop('all-loop'));
                    return;
            }
        };



        // 真实的音频资源地址
        let src = currentSingle.singleId ? (singles[currentSingle.singleId].src) : '';


        // 点击上一曲
        let preSingleClick = (function () {

            let singleId = '';

            if(loopModel === 'random-loop'){
                let randomIndex = Math.floor(playList.length * Math.random());
                singleId = playList[randomIndex];
            }else{
                for(let i = 0; i < playList.length; i++){

                    if(currentSingle.singleId === playList[i]){
                        if( i === 0 ){
                            singleId = playList[playList.length - 1];
                        }else{
                            singleId = playList[ i - 1 ];
                        }
                    }
                }
            }

            let preSingle = {
                singleId: singleId,
                isPlay: true,
                currentTimes: '00:00'
            };

            dispatch(playAntherSingle(preSingle));

        }).bind(this);


        // 点击下一曲
        let nextSingleClick = (function () {

            let singleId = '';

            if(loopModel === 'random-loop'){
                let randomIndex = Math.floor(playList.length * Math.random());
                singleId = playList[randomIndex];
            }else{
                for(let i = 0; i < playList.length; i++){

                    if(currentSingle.singleId === playList[i]){
                        if( i === playList.length - 1 ){
                            singleId = playList[0];
                        }else{
                            singleId = playList[ i + 1 ];
                        }
                    }
                }
            }

            let nextSingle = {
                singleId: singleId,
                isPlay: true,
                currentTimes: '00:00'
            };

            dispatch(playAntherSingle(nextSingle));

        }).bind(this);



        // 播放该曲目
        let playListThisSingleClick = (function (key) {
            dispatch(playThisSingle(
                {
                    singleId: key,
                    isPlay: true,
                    currentTime: '00:00'
                }
            ));
        }).bind(this);

        let singleHovered = (function (singleId) {
            dispatch(playListHovered(singleId));
        }).bind(this);


        let singleHoverOut = (function () {
            dispatch(playListHoverOut());
        }).bind(this);



        // 修改音量
        let changeVolume = (function (changeVolumeDOM) {
            let newValum = changeVolumeDOM.value;
            this.refs.trueAudio.volume = newValum;

            dispatch(changeValum(newValum));
        }).bind(this);


        // 拖拽播放进度
        let dragCurrentTime = (function (dragDOM) {

            let newCurrent = (dragDOM.value * this.refs.trueAudio.duration);

            //设置真的播放进度
            this.refs.trueAudio.currentTime = newCurrent;

            //修改 reducers 中的 currentTime
            let newMinute = Math.floor(newCurrent/60) + '';
            let newSecond = Math.floor(newCurrent%60) + '';
            if(newMinute.length === 1) { newMinute = '0' + newMinute };
            if(newSecond.length === 1 ) { newSecond = '0' + newSecond };
            let newCurrentTimer = newMinute + ':' + newSecond;

            this.props.dispatch(setCurrentTime(newCurrentTimer));

        }).bind(this);



        // 移除播放列表
        let delateThisSingle = (function (singleId) {
            // 如果被移除的是正在播放的歌曲,则先 播放下一曲
            if (singleId === currentSingle.singleId){
                nextSingleClick();
            }

            dispatch(removePlaylist(singleId));
        }).bind(this);


        // 移除所有歌曲
        let removeAllSingleClick = (function () {

            // 重置播放器
            dispatch(playAntherSingle({
                singleId: '',
                isPlay: false,
                currentTimes: '00:00'
            }));
            dispatch(removeAllSingles());
        }).bind(this);



        return (
            <div style={backGroungObj}>
                <div className="musicPlayer">

                    <i style={{ float: 'right',fontSize: '50px' }} className="icon iconfont"
                       onClick={ (function () {
                           this.props.dispatch(changeTab('myMusic'));
                       }).bind(this) }>&#xe61a;
                    </i>

                    <ListController
                        removeAllSingleClick = { removeAllSingleClick }></ListController>

                    <PlayList ref = 'playListId' playList = { playList }
                              singles = { singles }
                              browserHeight = {browserHeight}
                              playListThisSingleClick = { playListThisSingleClick }
                              playListHoveredId={ playListHoveredId }
                              singleHovered={ singleHovered }
                              singleHoverOut={ singleHoverOut }
                              currentSingle={currentSingle}
                              doPauseClick = {doPauseClick}
                              doPlayClick = { doPlayClick }
                              delateThisSingle = { delateThisSingle }>
                    </PlayList>

                    <PlayController browserHeight = { browserHeight }
                                    currentSingle={currentSingle}
                                    doPlayClick = { doPlayClick }
                                    doPauseClick = {doPauseClick}
                                    loopModel = { loopModel }
                                    changeLoopClick = { changeLoopClick }
                                    singles = { singles }
                                    currentTimes = { currentSingle.currentTimes }
                                    preSingleClick = { preSingleClick }
                                    nextSingleClick = { nextSingleClick }
                                    valum = { valum }
                                    changeVolume = { changeVolume }
                                    dragCurrentTime = { dragCurrentTime }>
                    </PlayController>

                </div>

                <audio style={{ display: 'none' }} src={src} autoPlay={ currentSingle.isPlay }
                       ref='trueAudio' id="trueAudio" controls="controls" />
            </div>
        )
    }
}




function mapStateToProps(state) {

    // console.log(state);
    return {
        nowTab: state.tab,
        playList: state.playList,
        singles: state.loadSingles,
        browserHeight: state.browserHeight,
        currentSingle: state.currentSingle,
        loopModel: state.loopModel,
        playListHoveredId: state.playListHovered,
        valum: state.valum
    }
}


export default connect(mapStateToProps)(App)
