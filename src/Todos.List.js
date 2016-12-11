import React, {Component} from 'react';

class TodoItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            readOnly: true
        };
    }
    itemDoubleClickHandler(e) {
        if (e.target.parentNode.dataset.type === 'done') return;
        this.setState({
            readOnly: false
        });
    }
    itemBlurHandler(e) {
        this.props.updateItem({
            id: parseInt(e.target.parentNode.dataset.id, 10),
            content: e.target.value
        });
        this.setState({
            readOnly: true
        });
    }
    handlerChange(e) {
        this.props.updateItem({
            id: parseInt(e.target.parentNode.dataset.id, 10),
            content: e.target.value
        });
    }
    itemCheckHandler(e) {
        this.props.changeItemType(
            parseInt(e.target.parentNode.dataset.id, 10)
        );
    }
    deleteHandler(e) {
        this.props.delItemById(parseInt(e.target.parentNode.dataset.id, 10));
    }
    render() {
        const { item } = this.props;
        const isChecked = item.type === 'todo' ? false : true;
        return (
            <li data-id={item.id} data-type={item.type} className={item.type}>
                <input type="checkbox" onChange={this.itemCheckHandler.bind(this)} checked={isChecked}/>
                <input 
                    type="text" 
                    value={item.content} 
                    onChange={this.handlerChange.bind(this)} 
                    onDoubleClick={this.itemDoubleClickHandler.bind(this)} 
                    onBlur={this.itemBlurHandler.bind(this)}
                    readOnly={this.state.readOnly}/>
                <button onClick={this.deleteHandler.bind(this)}>删除</button>
            </li>
        )
    }
}
export default class TodosList extends Component {
    getItems(list) {
        const { updateItem, changeItemType, delItemById} = this.props;
        return list.map((item, index)=> {
            return (
                <TodoItem 
                    key={index} 
                    item={item} 
                    index={index} 
                    updateItem={updateItem}
                    changeItemType={changeItemType}
                    delItemById={delItemById}
                ></TodoItem>
            )
        });
    }
    render() {
        return (
            <div className="todos-list">
                <div className="todo-items">
                    <h1>未完成土豆</h1>
                    {this.getItems(this.props.todoList)}
                </div>
                <div className="done-items">
                    <h1>已完成土豆</h1>
                    {this.getItems(this.props.doneList)}
                </div>
            </div>
        )
    }
}