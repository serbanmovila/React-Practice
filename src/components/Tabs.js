import React from 'react';
import '../styles/App.css';
import {Link} from "react-router-dom";


export default class Tabs extends React.Component {

    highlightTab = (e) => {
        let children = e.target.parentNode.childNodes;
        for (let i=0; i<children.length; i++) {
            console.log(children[i]);
            console.log(e.target);
            if (children[i] === e.target)
                children[i].style.backgroundColor = '#4B0082';
            else
                children[i].style.backgroundColor = '#8A2BE2';
        }
    }



    render() {
        return(
            <div className='tabs'>
                <Link onClick={(e) => this.highlightTab(e)} to='/add_song'>Add Song</Link>
                <Link onClick={(e) => this.highlightTab(e)} to='/'>List Songs</Link>
            </div>
        )

    }
}