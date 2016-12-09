import React, {Component} from 'react';

export default class TodosHeader extends Component {
    render() {
        const { inputValue, onInputChange, onButtonClick } = this.props;
        return (
            <div className="todos-header">
                <input type="text" placeholder="请输入todo" defaultValue={inputValue} onChange={onInputChange}/>
                <button onClick={onButtonClick}>增加todo</button>
            </div>
        )
    }
}