import React, { Component, PropTypes } from 'react';

export default class Controller extends Component{

    render(){
        return(
            <div className="controllerList">
                <div className="controllerButton" id="playAll" onClick={ e => this.props.playAllClick() }>
                    <i className="icon iconfont">&#xe61d;</i>&nbsp;
                    <span>播放全部</span>
                </div>
                {/*<div className="controllerButton" id="addTo">*/}
                    {/*<i className="icon iconfont">&#x34c1;</i>&nbsp;添加到*/}
                {/*</div>*/}
                {/*<div className="controllerButton" id="downLoad">*/}
                    {/*<i className="icon iconfont">&#xe6a2;</i>&nbsp;下载*/}
                {/*</div>*/}
                {/*<div className="controllerButton" id="banchDo">*/}
                    {/*<i className="icon iconfont">&#xe60f;</i>&nbsp;批量操作*/}
                {/*</div>*/}
            </div>
        );
    }
}