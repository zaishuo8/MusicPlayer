import React, { Component, PropTypes } from 'react';

export default class SlinglesList extends Component{
    render(){

        let singlesList = [];

        let singlesData = this.props.singles;
        let i = 0; //标记区分奇偶行
        for(let key in singlesData){
            i++;
            singlesList.push(
                <li key={ key } className={ i%2 === 0? 'oddTr':'evenTr' }
                    onMouseOver = { e => this.props.singleHovered(key) }
                    onMouseOut={ e => this.props.singleHoverOut() }>
                    <span className="singleName">{ singlesData[key].name }</span>
                    <span className="singleDo"
                          style={{ visibility: (this.props.singleListHoveredId === key ? 'visible' : 'hidden') }}>
                        <i onClick={ e => this.props.playThisSingleClick(key)} style={{fontSize: '42px'}} className="icon iconfont">&#xe608;</i>&nbsp;&nbsp;&nbsp;&nbsp;
                        <i onClick={ e => this.props.addSingleClick(key) } style={{fontSize: '42px'}} className="icon iconfont">&#x34c1;</i>&nbsp;&nbsp;&nbsp;&nbsp;
                        <i style={{fontSize: '36px'}} className="icon iconfont">&#xe694;</i>
                    </span>
                    <span className="singleAuthor">{ singlesData[key].author }</span>
                    <span className="singleAlbum">{ singlesData[key].imgName }</span>
                    <span className="singleDurition">{ singlesData[key].durition }</span>
                </li>
            );
        }


        return(
            <ul className="singlesListTable">
                <li className="firstTr oddTr">
                    <span className="singleName">歌曲</span>
                    <span className="singleDo" style={{ visibility: 'hidden' }}>
                        <i style={{fontSize: '42px'}} className="icon iconfont">&#xe608;</i>&nbsp;&nbsp;&nbsp;&nbsp;
                        <i style={{fontSize: '42px'}} className="icon iconfont">&#x34c1;</i>&nbsp;&nbsp;&nbsp;&nbsp;
                        <i style={{fontSize: '36px'}} className="icon iconfont">&#xe694;</i>
                    </span>
                    <span className="singleAuthor">歌手</span>
                    <span className="singleAlbum">专辑</span>
                    <span className="singleDurition">时长</span>
                </li>
                { singlesList }
            </ul>
        )
    }
}