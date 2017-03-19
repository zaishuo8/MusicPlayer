import React, { Component, ProtTypes } from 'react';

export default class PlayList extends Component{
    render(){

        let lrcUl = [];

        let lineIndex = 0;

        let imgSrc = '';

        if(this.props.currentSingle.singleId){

            // lrc文件 当成 text 文件引入 , 用 includes-loader ,用法直接在 require 路径前加 includes!
            let lrc = require('includes!../../resource/lyric/' +
                this.props.singles[this.props.currentSingle.singleId].name +
                '.lrc');


            // 按照 每行 分成数组, \n 表示换行符
            let lrcArr = lrc.split('\n');


            let currentTime =
                this.props.currentSingle.currentTimes ? this.props.currentSingle.currentTimes : '00:00';



            lrcArr.forEach(function (value, index) {

                let time = value.match(/\[\d\d\:\d\d\.\d\d\]/)[0];

                let lineLrc = value.replace(/\[\d\d\:\d\d\.\d\d\]/, '');


                let color = '';
                let secTime = time.match(/\d\d\:\d\d/)[0];
                // currentTime >= 该句时间 , 亮该句歌词
                if(getTimesBySec(currentTime) >= getTimesBySec(secTime)){
                    color = 'white';
                    lineIndex = index;
                }

                let liStyleObj = {
                    height: '30px',
                    color: color
                };

                lrcUl.push(
                    <li key={ index } style={ liStyleObj }>
                        { lineLrc }
                    </li>
                );
                
            });


            // 工具函数, 把 分:秒 => 秒
            function getTimesBySec(times) {
                let timesArry = times.split(':');
                return parseInt(timesArry[0]) * 60 + parseInt(timesArry[1]);
            }


            imgSrc = this.props.singles[this.props.currentSingle.singleId].imgUrl;

        }





        let divStyleObj = {
            float: 'right',
            width: '30%',
            height: (this.props.browserHeight - 250) + 'px',
            marginTop: '30px',
            position: 'relative',
            left: '0',
            top: '0'
        };



        let ulStyleObj = {
            position: 'relative',
            left: '0',
            top: lineIndex ? (- lineIndex * 30) + 'px' : ''
        };

        return(
            <div className="lyric" style={ divStyleObj }>
                <div style={{ width: '180px', height: '180px' }}>
                    <img style={{ width: '180px', height: '180px' }}
                         src={ imgSrc }/>
                </div>

                <div style={{ height: (this.props.browserHeight - 450) + 'px',
                                marginTop: '20px',
                                overflow: 'hidden',}}>
                    <ul style={ ulStyleObj }>
                        { lrcUl }
                    </ul>
                </div>
            </div>
        );
    }
}