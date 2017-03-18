import React, { Component, PropTypes } from 'react';

export default class ClickTip extends Component{

    render(){
        return(
            <div className="clickTip" ref='clickTip' style={{
                width: '240px',
                height: '160px',
                position: 'fixed',
                top: '50%',
                left: '50%',
                marginTop: '-80px',
                marginLeft: '-120px',
                backgroundColor: '#333',
                borderRadius: '5px',
                color: 'white',
                fontSize: '16px',
                textAlign: 'center',
                lineHeight: '160px',
                opacity: '0.7',
                display: this.props.clickTipStatus
            }}>已经添加到播放列表</div>
        );
    }
}