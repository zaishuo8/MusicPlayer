import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router'

export default class Nav extends Component{
    render(){


        let divStyle = {
            width: '100%',
            backgroundColor: '#e0e0e0',
            height: '100px',
            marginBottom: '50px'
        };

        let ulStyle = {
            width: '90%',
            margin: '0 auto'
        };

        let liStyle = {
            display: 'inline-block',
            height: '100px',
            fontSize: '20px',
            lineHeight: '100px',
            paddingLeft: '30px',
            paddingRight: '30px'
        };

        return(
            <div className="nav" style={divStyle}>
                <ul style={ulStyle}>
                    <Link to="/mymusic"><li style={liStyle}>我的音乐</li></Link>
                    <Link to="/myalbum"><li style={liStyle}>我的专辑</li></Link>
                </ul>
            </div>
        );
    }
}