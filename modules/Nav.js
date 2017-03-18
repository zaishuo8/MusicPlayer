import React, { Component, PropTypes } from 'react';
import { Link, IndexLink } from 'react-router'

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

                    {/*解决首页导航激活, to = '/' ,但是要用 IndexLink, 不然会一直处于激活状态*/}
                    <IndexLink activeClassName='activeLink' to="/"><li style={liStyle}>我的音乐</li></IndexLink>


                    <Link activeClassName='activeLink' to="/myalbum"><li style={liStyle}>我的专辑</li></Link>
                </ul>
            </div>
        );
    }
}