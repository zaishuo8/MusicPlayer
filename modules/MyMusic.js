import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { changeTab, loadSingles, loadAlbum, addPlaylist, playThisSingle, playThisSingleToList,
    singleListHovered, singleListHoverOut, playAll } from '../actions/actions';
require('../style/app.scss');
let singlesData = require('../data/singles.json');
let albumData = require('../data/album.json');
import Controller from './components/Controller';
import SlinglesList from './components/SlinglesList';

class App extends Component {

    componentWillMount(){

        const { dispatch } = this.props;

        singlesData = (function getAudioImgUrlandSrc(singles) {
            for (let key in singles){
                singles[key].imgUrl = "./resource/img/" + singles[key].imgName + ".jpg";
                singles[key].src = "./resource/mp3/" + singles[key].name + ".mp3";
            }
            return singles;
        })(singlesData);

        albumData = (function getAlbumImgUrl(album){
            for (let key in album){
                album[key].imgUrl = "./resource/img/" + album[key].name + ".jpg";
            }
            return album;
        })(albumData);

        dispatch(loadSingles(singlesData));
        dispatch(loadAlbum(albumData));


    }

    render() {

        const { nowTab, singles, currentSingle, singleListHoveredId, playList } = this.props;

        let myMusicStyle = {
            display: nowTab === 'myMusic' ? 'block' : 'none'
        };

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


        }).bind(this);

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

        }).bind(this);

        let playThisSingleClick = (function (key) {
            this.props.dispatch(playThisSingleToList([key]));
            this.props.dispatch(playThisSingle(
                {
                    singleId: key,
                    isPlay: true,
                    currentTime: '00:00'
                }
            ));
        }).bind(this);


        let singleHovered = (function (singleId) {
            this.props.dispatch(singleListHovered(singleId));
        }).bind(this);


        let singleHoverOut = (function () {
            this.props.dispatch(singleListHoverOut());
        }).bind(this);

        return (
            <div className="myMusic" style={ myMusicStyle }>
                <Controller playAllClick = { playAllClick }></Controller>
                <i style={{ float: 'right', fontSize: '40px', marginTop: '-42px' }} className="icon iconfont"
                    onClick={ (function () {
                        this.props.dispatch(changeTab('musicPlayer'));
                    }).bind(this)  }>&#xe626;</i>
                <SlinglesList playThisSingleClick = { playThisSingleClick } addSingleClick = { addSingleClick } singles = { singles }
                              singleHovered={ singleHovered } singleListHoveredId={singleListHoveredId}
                              singleHoverOut={singleHoverOut}></SlinglesList>
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
        playList: state.playList
    }
}


export default connect(mapStateToProps)(App)
