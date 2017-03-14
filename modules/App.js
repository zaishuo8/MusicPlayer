import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import MyMusic from './MyMusic';
import MusicPlayer from './MusicPlayer';

class App extends Component{
    render(){

        return(
            <div>
                <MyMusic />
                <MusicPlayer />
            </div>
        );
    }
}