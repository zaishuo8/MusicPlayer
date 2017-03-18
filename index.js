import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import musicReducer from './reducers';
import MyMusic from './modules/MyMusic';
import MyAlbum from './modules/MyAlbum';
import App from './modules/app';
import { Router, Route, hashHistory, IndexRoute, browserHistory } from 'react-router';
// import { createHashHistory } from 'history';

let store = createStore(musicReducer);

let rootElement = document.getElementById('root');
render(
    <Provider store={store}>
            <Router history={ hashHistory }>
                <Route path='/' component={App}>

                    <IndexRoute component={MyMusic}/>

                    {/*<Route path='/mymusic' component={MyMusic}/>*/}
                    <Route path='/myalbum' component={MyAlbum}/>

                    {/*<Route path='/sinalb' component={MyAlbum}/>*/}

                </Route>
            </Router>
    </Provider>,
    rootElement
);