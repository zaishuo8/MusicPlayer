import React, { Component, PropTypes } from 'react';

export default class Controller extends Component{

    render(){
        return(
            <div className="controllerList">
                <div className="controllerButton">
                    <i className="icon iconfont">&#xe6a2;</i>&nbsp;下载
                </div>
                <div className="controllerButton">
                    <i className="icon iconfont">&#xf0008;</i>&nbsp;删除
                </div>
                <div className="controllerButton">
                    <i className="icon iconfont">&#xe66a;</i>&nbsp;清空列表
                </div>
            </div>
        );
    }
}