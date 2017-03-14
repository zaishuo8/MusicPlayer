import React, { Component, PropTypes } from 'react';

export default class Controller extends Component{

    render(){

        let isPlayObj = {
                display: this.props.currentSingle.isPlay ? 'none' : 'inline-block'
            },
            isPauseObj = {
                fontSize: '36px',
                display: this.props.currentSingle.isPlay ? 'inline-block' : 'none'
            },
            allLoopObj = {
                display: this.props.loopModel === 'all-loop' ? 'inline-block' : 'none'
            },
            oneLoopObj = {
                fontSize: '36px',
                display: this.props.loopModel === 'one-loop' ? 'inline-block' : 'none'
            },
            orderLoopObj = {
                fontSize: '36px',
                display: this.props.loopModel === 'order-loop' ? 'inline-block' : 'none'
            },
            randomLoopObj = {
                display: this.props.loopModel === 'random-loop' ? 'inline-block' : 'none'
            };

        let currentSingleName = this.props.currentSingle.singleId ? (this.props.singles[this.props.currentSingle.singleId].name + ' - ') : '';
        let currentSingleAuthor = this.props.currentSingle.singleId ? (this.props.singles[this.props.currentSingle.singleId].author) : '';
        let durition = this.props.currentSingle.singleId ? (this.props.singles[this.props.currentSingle.singleId].durition) : '00:00';
        let currentTimes = this.props.currentSingle.singleId ? (this.props.currentTimes + ' / ') : '00:00 / ';


        // 把 05:15 转换成 315 秒
        function getTimesBySec(times) {
            let timesArry = times.split(':');
            return parseInt(timesArry[0]) * 60 + parseInt(timesArry[1]);
        }

        // 计算 进度 百分比 ,用于显示进度条的位置
        function countDurPercent(surrSec, duriSec) {
            return surrSec / duriSec;
        }

        // 计算进度条百分比
        let durValue = this.props.currentSingle.singleId ?
            (countDurPercent(getTimesBySec(currentTimes),getTimesBySec(durition))) : '0';


        return(
            <div className="playControllerList">
                <i className="icon iconfont" onClick={ e => this.props.preSingleClick() }>&#xe633;</i>&nbsp;

                <i className="icon iconfont" style={isPlayObj}
                   onClick={ e => this.props.doPlayClick(this.props.currentSingle) }>&#xe646;</i>

                <i className="icon iconfont" style={isPauseObj}
                    onClick={ e => this.props.doPauseClick(this.props.currentSingle) }>&#xf0067;</i>

                <i className="icon iconfont" onClick={ e => this.props.nextSingleClick() }>&#xe636;</i>&nbsp;


                <div style={{ display:'inline-block', width:'54%', marginRight: '34px', height:'42px' }}>

                    <span style={{ display: 'inline-block' }}>{currentSingleName}{currentSingleAuthor}</span>

                    <span style={{ display: 'block', float: 'right' }}>{currentTimes}{durition}</span>

                    <input ref='durControl' type="range" min="0" max="1" step="0.01"
                           value={ durValue }
                           onChange={ e => this.props.dragCurrentTime(this.refs.durControl) }
                           style={{ display: 'block', width: '100%' }}/>

                </div>


                <i className="icon iconfont" style={ allLoopObj } onClick={ e => this.props.changeLoopClick( 'all-loop' ) }>&#xe60b;</i>&nbsp;
                <i className="icon iconfont" style={ oneLoopObj } onClick={ e => this.props.changeLoopClick( 'one-loop' ) }>&#xe623;</i>
                <i className="icon iconfont" style={ orderLoopObj } onClick={ e => this.props.changeLoopClick( 'order-loop' ) }>&#xe6ea;</i>
                <i className="icon iconfont" style={ randomLoopObj } onClick={ e => this.props.changeLoopClick( 'random-loop' ) }>&#xe504;</i>&nbsp;



                <div style={ {display:'inline-block', height:'42px'} }>
                    <i className="icon iconfont" style={{fontSize: '36px', marginRight: '4px'}}>&#xe625;</i>
                    <input ref='volumeControl' type="range" min="0" max="1" step="0.01" defaultValue={ this.props.valum }
                           onChange = { e => {this.props.changeVolume(this.refs.volumeControl)} }
                           style={{ position: 'relative', top: '-4px'}}/>
                </div>
            </div>
        );
    }
}