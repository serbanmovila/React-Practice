import React from 'react';
import '../styles/App.css';
import {connect} from "react-redux";
import Song from "./Song";
import {Modal} from "./Modal";

class ListSongs extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isModalOpen: true
        }
    }

    componentWillMount() {
        document.addEventListener('click', this.handleClick)
    }

    handleClick = (e) => {
        console.log(e.target.className);
        if (e.target.className === 'modal')
            this.setState({
                isModalOpen: false
            })
    }

    render() {
        console.log(this.props);
        return(
            <>{this.state.isModalOpen === true ?
                <div className='modal'><Modal fields= {['Title','Artist','Album Cover URL']}/></div> : null}

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Artist</th>
                        <th>Album Cover URL</th>
                        <th>Show Details</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.songs.map(song =>
                    <Song
                        key = {song.songID}
                        song = {song} />)}
                </tbody>

            </table>
            </>
        )
    }
}

function mapStateToProps(state) {
    return {songs: state.SongReducer.songs};
}

export default connect(mapStateToProps, null)(ListSongs);