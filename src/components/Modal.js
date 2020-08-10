import React from 'react';
import '../styles/App.css';


export class Modal extends React.Component {

    render() {
        return(
            <div className='updateModal'>

                {this.props.fields.map(field =>
                    <>
                    <label>{field}</label>
                    <input/>
                    </>
                )}
                <button>Update</button>
            </div>
        )

    }
}