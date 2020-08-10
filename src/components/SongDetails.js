import React from "react";
import {connect} from "react-redux";
import {showMoreAction, updateAction} from "../actions/SongActions";
import {withRouter} from 'react-router-dom'

class SongDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            editingImage: false
        }
    }

    getDetails = (song) => {
        let id = song.songID;
        let name = song.name;
        let apiRequested = song.apiRequested;
        const {showMoreAction} = this.props;
        showMoreAction({
            id: id,
            name: name,
            apiRequested: apiRequested
        })

    }

    updateStore = (e, key) => {
        let id = this.props.match.params.id;
        let value = e.currentTarget.textContent;

        const {updateAction} = this.props;

        if (e.key === 'Enter')
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

    componentDidMount() {
        if(this.props.songs && this.props.songs[this.props.match.params.id-1])
            this.getDetails(this.props.songs[this.props.match.params.id - 1]);
    }

    render() {

        let id = this.props.match.params.id;
        let loading = this.props.loading;
        let failed = this.props.failed;
        console.log(failed);

        if (this.props.songs && this.props.songs[id - 1] !== undefined) {
            let {name, artist, albumCover, duration, album} = this.props.songs[id - 1];
            return (
                <div className='songDetails'>
                    {failed === true ? <h1>Failed to retrieve data!</h1> : (loading === true ? <h1>Loading...</h1> :
                        <div className='song'>
                            <div contentEditable={true} onKeyPress={(e) => this.updateStore(e, 'albumCover')}
                                 onFocus={() => this.imageState(true)} onBlur={() => this.imageState(false)}>
                                {this.state.editingImage === true ? albumCover :
                                    <img src={albumCover} alt='Album Cover'/>}</div>
                            <div className='songText'>
                                <h4>Name</h4>
                                <label contentEditable={true} onKeyPress={(e) => this.updateStore(e, 'name')}>{name}</label>
                                <h4>Artist</h4>
                                <label contentEditable={true}
                                       onKeyPress={(e) => this.updateStore(e, 'artist')}>{artist}</label>
                                <h4>Duration</h4>
                                <label>{duration}</label>
                                <h4>Album</h4>
                                <label>{album}</label>
                            </div>
                        </div>)}
                </div>)
        } else return (<h1>Song not found!</h1>)

    }
}

function mapStateToProps(state) {
    let id = window.location.href.split('/').pop();
    if(state.SongReducer.songs[id-1] !== undefined) {
        console.log(state.SongReducer.songs[id-1].failed);
        if(state.SongReducer.songs[id-1].failed !== true) {
            return {
                songs: state.SongReducer.songs,
                loading: state.SongReducer.songs[id - 1].loading,
                failed: false
            }
        }
        else return {
            songs: state.SongReducer.songs,
            loading: false,
            failed: true
        }

    }
    return {

    }

}

export default connect(mapStateToProps, {showMoreAction, updateAction})(withRouter(SongDetails));
