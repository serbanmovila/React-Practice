import React from 'react';
import '../styles/App.css';
import {connect} from "react-redux";
import {addAction} from "../actions/SongActions";

class AddSong extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            artist: '',
            albumCover: '',

            nameValid: null,
            artistValid: null,
            coverValid: null,
            urlValid: null
        }
    }

    setInput = (e, key) => {
        this.setState(
            {
                [key]: e.target.value
        });
    }

    validate = (key, validator) => {

        if (key.length === 0){
            this.setState({
                [validator]: false
            })
            return false;
        }
        else {
            this.setState({
                [validator]: true
            })
            return true;
        }
    }

    submit = () => {
        const {addAction} = this.props;
        const {name, artist, albumCover} = this.state;

        let nameValid = this.validate(name, 'nameValid');
        let artistValid = this.validate(artist, 'artistValid');
        let coverValid = this.validate(albumCover, 'coverValid');
        let urlValid;

        let exp = 'https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)';
        let regex = RegExp(exp);
        if (!albumCover.match(regex)) {
            this.setState({
                urlValid: false
            })
            urlValid = false;
        }
        else {
                this.setState({
                    urlValid: true
                })
            urlValid = true;
            }

        if(nameValid && artistValid && coverValid && urlValid)
            addAction({
                name: name,
                artist: artist,
                albumCover: albumCover
            });
    }

    validateInput = () => {

    }

    render() {
        return(
            <div className='addSong'>
                <h1>Add song</h1>

                <label>Name</label>
                <input onBlur={(e) => this.validateInput(e, 'nameValid')} onChange={(e) => this.setInput(e,'name') }/>
                {this.state.nameValid === false && <label style={{color: 'red'}}>Name must not be empty!</label>}

                <label>Artist</label>
                <input onBlur={(e) => this.validateInput(e, 'artistValid')} onChange={(e) => this.setInput(e,'artist') }/>
                {this.state.artistValid === false && <label style={{color: 'red'}}>Artist must not be empty!</label>}

                <label>Album cover URL</label>
                <input onBlur={(e) => this.validateInput(e, 'coverValid')} onChange={(e) => this.setInput(e,'albumCover') }/>
                {this.state.coverValid === false && <label style={{color: 'red'}}>Album cover URL must not be empty!</label>}
                {this.state.urlValid === false && <label style={{color: 'red'}}>Invalid URL!</label>}

                <button onClick={this.submit}>Add Song</button>
            </div>
        )
    }
}

export default connect(null, {addAction})(AddSong);
