import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ListController from './components/ListController';
import PlayList from './components/PlayList';
import PlayController from './components/PlayController';
require('../style/app.scss');
import { changeTab, getBrowserHeight, doPlay, doPause, changeLoop, setCurrentTime, playPreSingle,
    playNextSingle, playThisSingle, playListHovered, playListHoverOut, changeValum } from '../actions/actions';

class App extends Component {

    componentWillMount(){

        const { dispatch } = this.props;

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
            backgroundColor: '#292a2b'
        };

        let doPlayClick = (function (currentSingle) {
            dispatch(doPlay(currentSingle));
            this.refs.trueAudio.play();
        }).bind(this);

        let doPauseClick = (function (currentSingle) {
            dispatch(doPause(currentSingle));
            this.refs.trueAudio.pause();
        }).bind(this);



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

        let src = currentSingle.singleId ? (singles[currentSingle.singleId].src) : '';


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

            dispatch(playPreSingle(preSingle));

        }).bind(this);

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

            dispatch(playNextSingle(nextSingle));

        }).bind(this);

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

        let changeVolume = (function (changeVolumeDOM) {
            let newValum = changeVolumeDOM.value;
            this.refs.trueAudio.volume = newValum;

            //这里改不改 reducers 中的 valume 都没关系,因为UI的展现不是由 state 控制的
            dispatch(changeValum(newValum));
        }).bind(this);

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



        return (
            <div style={backGroungObj}>
                <div className="musicPlayer">
                    <i style={{ float: 'right',fontSize: '50px' }} className="icon iconfont"
                       onClick={ (function () {
                           this.props.dispatch(changeTab('myMusic'));
                       }).bind(this) }>&#xe61a;</i>
                    <ListController></ListController>
                    <PlayList ref = 'playListId' playList = { playList }
                              singles = { singles }
                              browserHeight = {browserHeight}
                              playListThisSingleClick = { playListThisSingleClick }
                              playListHoveredId={ playListHoveredId }
                              singleHovered={ singleHovered }
                              singleHoverOut={ singleHoverOut }
                              currentSingle={currentSingle}
                              doPauseClick = {doPauseClick}
                              doPlayClick = { doPlayClick }></PlayList>
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
                                    dragCurrentTime = { dragCurrentTime }></PlayController>
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
