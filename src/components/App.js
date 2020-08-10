import React, {Component} from 'react';
import '../styles/App.css';
import { Provider } from 'react-redux';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import SongReducer from "../reducers/SongReducer";
import thunk from "redux-thunk";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import AddSong from "./AddSong";
import ListSongs from "./ListSongs";
import Tabs from "./Tabs";
import SongDetails from "./SongDetails";

const reducers = combineReducers({
    SongReducer: SongReducer
});

const store = createStore(reducers, applyMiddleware(thunk));

class App extends Component {

  render() {
    return(
        <Provider store={store}>
            <Router>
                <Tabs />
                <Switch>
                    <Route path='/add_song' component={AddSong}/>
                    <Route path='/' exact component={ListSongs}/>
                    <Route path='/song/:id' component={SongDetails}/>
                </Switch>
            </Router>
        </Provider>
    )

  }
}

export default App;
