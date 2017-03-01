import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { changeTab } from '../actions/actions';
import MyMusic from './MyMusic';
import MusicPlayer from './MusicPlayer';

class App extends Component{
    render(){

        const { dispatch, nowTab } = this.props;

        let myMusicStyle = {
            dispaly: this.props.nowTab === 'myMusic' ? 'block' : 'none'
        };

        let musicPlayerStyle = {
            dispaly: this.props.nowTab === 'musicPlayer' ? 'none' : 'block'
        };

        return(
            <div>
                <MyMusic/>
                <MusicPlayer/>
            </div>
        );
    }
}

function mapStateToProps(state) {
    // console.log('state');
    // console.log(state);
    return {
        nowTab: state.tab
    }
}


export default connect(mapStateToProps)(App)