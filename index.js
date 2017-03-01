import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import MyMusic from './modules/MyMusic';
import MusicPlayer from './modules/MusicPlayer';
import musicReducer from './reducers';

let store = createStore(musicReducer);

let rootElement = document.getElementById('root');
render(
    <Provider store={store}>
        <div>
            <MyMusic/>
            <MusicPlayer/>
        </div>
    </Provider>,
    rootElement
);