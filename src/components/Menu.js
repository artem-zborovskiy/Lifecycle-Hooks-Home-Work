import React from "react";

class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: ''
        };
    }

    changeInput = (event) => {
        this.setState({title: event.target.value});
    }

    render() {
        return(
            <div>
                <input type="text" onChange={this.changeInput}/>
                <button className="edit-btn" onClick={() => {return this.props.func(this.state.title, this.props.id)}}>EDIT</button>
            </div>
        );
    }
}

export default Menu;