import React, {Component} from 'react';
import TodosHeader from './Todos.Header';
import TodosList from './Todos.List';
import './Todos.css';

export default class Todos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filter: 'all',
            list: [{
                id: 1,
                content: '今天要吃炸鸡',
                type: 'done'
            }, {
                id: 2,
                content: '明天要吃烤鸭',
                type: 'todo'
            }]
        };
    }
    getDoneList() {
        return this.state.list.filter(function (v) {
            return v.type === 'done';
        });
    }
    getTodoList() {
        return this.state.list.filter(function (v) {
            return v.type === 'todo';
        });
    }
    getItemById(id) {
        return this.state.list.filter(function (v) {
            return v.id === id;
        })[0];
    }
    changeItemType(id) {
        const newList = this.state.list.map(function (v) {
            if (v.id === id) {
                return Object.assign({}, v, {
                    type: v.type === 'todo' ? 'done' : 'todo'
                });
            } else {
                return v;
            }
        });
        this.setState({
            list: newList
        });
    }
    delItemById(id) {
        const newList = this.state.list.filter((v) => {
            return v.id !== id;
        });
        this.setState({
            list: newList 
        });
    }
    addItem(content) {
        let maxId = this.state.list.reduce(function(preV, currentV) {
            if (currentV.id > preV.id) {
                return currentV;
            } else {
                return preV;
            }
        }).id;

        this.setState({
            list: [...this.state.list, {
                id: ++maxId,
                content: content,
                type: 'todo'
        }]
        });
    }
    updateItem(data) {
        const newList = this.state.list.map(function (v) {
            if (v.id === data.id) {
                return Object.assign({}, v, {
                    content: data.content
                });
            } else {
                return v;
            }
        });
        this.setState({
            list: newList
        });
    }
    inputChange(e) {
        const {value} = e.target;
        this.setState({
            newTodo: value
        });
    }
    addTodo() {
        const { newTodo } = this.state;
        if (newTodo && newTodo.trim()) {
            this.addItem(this.state.newTodo);
        }
    }
    render() {
        return (
            <section className="todos">
                <TodosHeader 
                    onInputChange={this.inputChange.bind(this)} 
                    onButtonClick={this.addTodo.bind(this)} 
                    inputValue={this.state.newTodo}
                    ></TodosHeader>
                <TodosList 
                    list={this.state.list}
                    doneList={this.getDoneList()}
                    todoList={this.getTodoList()}
                    updateItem={this.updateItem.bind(this)}
                    changeItemType={this.changeItemType.bind(this)}
                    delItemById={this.delItemById.bind(this)}
                ></TodosList>
            </section>
        )

    }
}