import React from 'react';
import Nav from './Nav';
import MusicPlayer from './MusicPlayer';


export default React.createClass({
    render() {


        return (
            <div>
                <Nav/>

                { this.props.children }

                <MusicPlayer/>

            </div>
        )
    }
})