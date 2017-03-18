import React, { Component, ProtTypes } from 'react';

export default class PlayList extends Component{

    render(){

        let playListLi = [];
        let singlesList = this.props.singles;

        let playListThis = this;

        function switchIcon(value) {
            if(value === playListThis.props.currentSingle.singleId){
                if(playListThis.props.currentSingle.isPlay){
                    return (
                        <i className="icon iconfont" style={{ fontSize: '38px' }}
                           onClick={ e => playListThis.props.doPauseClick(playListThis.props.currentSingle)}>&#xe691;</i>
                    );
                }else{
                    return(
                        <i className="icon iconfont" style={{ fontSize: '36px' }}
                           onClick={ e => playListThis.props.doPlayClick(playListThis.props.currentSingle) }>&#xe608;</i>
                    );
                }
            } else{
                return(
                    <i className="icon iconfont" style={{ fontSize: '36px' }}
                       onClick={ e => playListThis.props.playListThisSingleClick(value) }>&#xe608;</i>
                );
            }
        }

        this.props.playList.forEach(function (value, index) {
            playListLi.push(
                <li
                key={ index }
                className={value === playListThis.props.currentSingle.singleId ? 'playListLi playingLi' : 'playListLi'}
                onMouseOver = { e => playListThis.props.singleHovered(value) }
                onMouseOut={ e => playListThis.props.singleHoverOut() }>

                    <input type="checkbox" />

                    <span className="nameSpan">{ index + 1 }&nbsp;&nbsp;&nbsp;{ singlesList[value].name }</span>

                    <span
                    className="operaSpan"
                    style={{ visibility: (playListThis.props.playListHoveredId === value ? 'visible' : 'hidden') }}>

                        { switchIcon(value) }&nbsp;&nbsp;&nbsp;


                        <i className="icon iconfont" style={{ fontSize: '32px' }}
                        onClick={ e => playListThis.props.delateThisSingle(value) }>&#xf0008;</i>

                    </span>

                    <span className="authorSpan">{ singlesList[value].author }</span>

                    <span className="durSpan">{ singlesList[value].durition }</span>
                </li>
            );
        });


        let objStyle = { height: (this.props.browserHeight - 200) + 'px'};


        return(

            <ul className="playList" style = { objStyle }>
                <li className="playListLi">
                    <input type="checkbox" />
                    <span className="nameSpan">歌曲</span>
                    <span className="operaSpan" style={{ visibility: 'hidden' }}>
                        <i className="icon iconfont" style={{ fontSize: '36px' }}>&#xe608;</i>&nbsp;&nbsp;&nbsp;
                        <i className="icon iconfont" style={{ fontSize: '32px' }}>&#xf0008;</i>
                    </span>
                    <span className="authorSpan">歌手</span>
                    <span className="durSpan">时长</span>
                </li>
                { playListLi }
            </ul>
        );
    }
}