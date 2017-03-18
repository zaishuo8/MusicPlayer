import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadAlbum } from '../actions/actions';
require('../style/app.scss');
let albumData = require('../data/album.json');

class App extends Component {

    componentWillMount(){

        const { dispatch } = this.props;

        albumData = (function getAlbumImgUrl(album){
            for (let key in album){
                album[key].imgUrl = "./resource/img/" + album[key].name + ".jpg";
            }
            return album;
        })(albumData);

        dispatch(loadAlbum(albumData));


    }


    render() {

        const { albums } = this.props;


        let AlbumLists = [];


        for(let key in albums){
            AlbumLists.push(
                <li key={key} className="ablumLi">
                   <img src={albums[key].imgUrl}/>
                   <h2 className="albumName">{albums[key].name}</h2>
                   <h2 className="albumAthor">{albums[key].author}</h2>
                </li>
            );
        }

        return (
            <div className="myAlbum">

                { AlbumLists }

                <li style={{ clear: 'both' }}></li>

            </div>
        )
    }
}




function mapStateToProps(state) {
    // console.log('state');
    // console.log(state);
    return {
        albums: state.loadAlbum
    }
}


export default connect(mapStateToProps)(App)
