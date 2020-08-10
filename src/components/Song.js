import React from 'react';
import '../styles/App.css';
import {connect} from "react-redux";
import {updateAction, showMoreAction} from '../actions/SongActions';
import {Link} from "react-router-dom";

export class Song extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            editingImage: false,
            details: false,
            isModalOpen: true
        }
    }

    updateStore = (e, key) => {
        let id = this.props.song.songID;
        let value = e.currentTarget.textContent;

        const {updateAction} = this.props;

        if(e.key === 'Enter')
            e.currentTarget.blur();

        updateAction({
            id: id,
            key: key,
            value: value
        });
    }

    imageState = (state) => {
        this.setState({
            editingImage: state
        })
    }

    render() {
        let {songID, name, artist, albumCover} = this.props.song;

        let songPath = '/song/'.concat(songID);

        return(
            <tr>
                <td>{songID}</td>
                <td contentEditable={true} onKeyPress={(e) => this.updateStore(e, 'name')}>{name}</td>
                <td contentEditable={true} onKeyPress={(e) => this.updateStore(e, 'artist')}>{artist}</td>
                <td contentEditable={true} onKeyPress={(e) => this.updateStore(e, 'albumCover')} onFocus={() => this.imageState(true)} onBlur={() => this.imageState(false)}>
                    {this.state.editingImage ? albumCover : <img src={albumCover} alt='Album Cover'/>}
                </td>
                <td><Link to={songPath}>Show details</Link></td>
            </tr>
        )
    }

}

function mapStateToProps(state, ownProps) {
    let id = ownProps.song.songID;
    let data;
    let loading = state.SongReducer.songs[id-1].loading;

    function filterObj(obj) {
        let newObj = {};
        for (let key in obj) {
            if (obj.hasOwnProperty(key))
                if (typeof obj[key] !== 'object')
                    newObj[key] = obj[key];
        }
        return newObj;
    }

    if(state.SongReducer.songs[id-1].data !== undefined) {
        data = filterObj(state.SongReducer.songs[id - 1].data[id-1]);
        return {
            loading: loading,
            data: data
        }

    }
    return {
        loading: loading,
    };
}

export default connect(mapStateToProps, {updateAction, showMoreAction})(Song);