import React, {Component} from 'react';

export default class Input extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 'hello'
        };
    }
    render() {
        return (
            <input type="text" defaultValue={this.state.value} onChange={e => {
                this.setState({
                    value: e.target.value.toUpperCase()
            })}}/>
        )
    }
}