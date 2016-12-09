import React, {Component} from 'react';
import Todos from './Todos';
import './App.css';
export default class App extends Component{
    
    // render() {
    //     return (
    //         <Tabs classPrefix={'tabs'} defaultActiveIndex={0} className="tabs-bar">
    //             <TabPane order="0" tab={'Tab 1'}>第一个Tab里的内容</TabPane>
    //             <TabPane order="1" tab={'Tab 2'}>第二个Tab里的内容</TabPane>
    //             <TabPane order="2" tab={'Tab 3'}>第三个Tab里的内容</TabPane>
    //         </Tabs>
    //     );
    // }
    render() {
        return (
            <Todos>
            </Todos>
        )
    }
}


