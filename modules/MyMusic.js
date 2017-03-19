import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { changeTab, loadSingles, loadAlbum, addPlaylist, playThisSingle, playThisSingleToList,
    singleListHovered, singleListHoverOut, playAll, changeTipStatus } from '../actions/actions';
require('../style/app.scss');
let singlesData = require('../data/singles.json');
import Controller from './components/Controller';
import SlinglesList from './components/SlinglesList';
import ClickTip from './components/ClickTip';


class MyMusic extends Component {

    componentWillMount(){

        const { dispatch } = this.props;

        // 准备数据, 把图片和 src 放入数据对象
        singlesData = (function getAudioImgUrlandSrc(singles) {
            for (let key in singles){
                singles[key].imgUrl = "./resource/img/" + singles[key].imgName + ".jpg";
                singles[key].src = "./resource/mp3/" + singles[key].name + ".mp3";
            }
            return singles;
        })(singlesData);

        // 修改 store
        dispatch(loadSingles(singlesData));

    }

    render() {

        const { nowTab, singles, currentSingle, singleListHoveredId, clickTipStatus } = this.props;


        let myMusicStyle = {
            display: nowTab === 'myMusic' ? 'block' : 'none'
        };

        
        // 显示一下 ClickTip , 2s 后消失
        let showClickTip = function (context) {
            context.props.dispatch(changeTipStatus('block'));
            setTimeout((function () {
                this.props.dispatch(changeTipStatus('none'));
            }).bind(context),2000);
        };
        

        // 点击播放全部, dispatch 曲库列表中所有的 singleId 组成的数组
        // 同时设置 第一首 单曲为 当前播放
        let playAllClick = (function () {

            let addIdList = [];

            for(let key in singles){
                addIdList.push(key);
            }

            this.props.dispatch(playAll(addIdList));

            //第一首歌设置为currentSingle
            this.props.dispatch(playThisSingle(
                {
                    singleId: addIdList[0],
                    isPlay: true,
                    currentTime: '00:00'
                }
            ));

            tabToMusicPlayer();


        }).bind(this);



        // 点击添加单曲到播放列表
        let addSingleClick = (function (key) {
            this.props.dispatch(addPlaylist([key]));

            //若此时没有 currentsingle 则设置该单曲为 currentsingle
            if(!currentSingle.singleId){
                this.props.dispatch(playThisSingle(
                    {
                        singleId: key,
                        isPlay: false,
                        currentTime: '00:00'
                    }
                ));
            }

            showClickTip(this);

        }).bind(this);


        // 点击播放该单曲
        let playThisSingleClick = (function (key) {
            this.props.dispatch(playThisSingleToList([key]));   // 将该单曲放到播放列表头部
            this.props.dispatch(playThisSingle(                 // 将该单曲设置为当前播放曲目
                {
                    singleId: key,
                    isPlay: true,
                    currentTime: '00:00'
                }
            ));

            tabToMusicPlayer();
            
        }).bind(this);


        // hover 到需要被操作的单曲上
        let singleHovered = (function (singleId) {
            this.props.dispatch(singleListHovered(singleId));
        }).bind(this);


        // hoverout 该单曲
        let singleHoverOut = (function () {
            this.props.dispatch(singleListHoverOut());
        }).bind(this);


        // 切换到 musicplayer
        let tabToMusicPlayer = (function () {
            this.props.dispatch(changeTab('musicPlayer'));
        }).bind(this);

        return (
            <div className="myMusic" style={ myMusicStyle }>

                <Controller playAllClick = { playAllClick }></Controller>

                <i style={{ float: 'right', fontSize: '40px', marginTop: '-42px' }}
                   className="icon iconfont"
                   onClick={ tabToMusicPlayer }>&#xe626;
                </i>

                <SlinglesList singles = { singles }
                              playThisSingleClick = { playThisSingleClick }
                              addSingleClick = { addSingleClick }
                              singleHovered={ singleHovered }
                              singleListHoveredId={ singleListHoveredId }
                              singleHoverOut={ singleHoverOut }>
                </SlinglesList>

                <ClickTip clickTipStatus={ clickTipStatus } />

            </div>
        )
    }
}




function mapStateToProps(state) {
    // console.log('state');
    // console.log(state);
    return {
        nowTab: state.tab,
        singles: state.loadSingles,
        currentSingle: state.currentSingle,
        singleListHoveredId: state.singleListHovered,
        clickTipStatus: state.clickTipStatus
    }
}


export default connect(mapStateToProps)(MyMusic)
