import React, { Component, PropTypes, cloneElement } from 'react';
import classnames from 'classname';
import style from './index.css';

/**
 *  <Tabs classPrefix={'tabs'} defaultActiveIndex={0} className="tabs-bar">
        <TabPane order="0" tab={'Tab 1'}>第一个Tab里的内容</TabPane>
        <TabPane order="1" tab={'Tab 2'}>第二个Tab里的内容</TabPane>
        <TabPane order="2" tab={'Tab 3'}>第三个Tab里的内容</TabPane>
    </Tabs>
 * 
 * @export
 * @class Tabs
 * @extends {Component}
 */
export default class Tabs extends Component {
    // 属性检查
    static propTypes = {
        classPrefix: PropTypes.string,
        className: PropTypes.string,
        children: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.node),
            PropTypes.node
        ]),
        defaultActiveIndex: PropTypes.number,
        activeIndex: PropTypes.number,
        onChange: PropTypes.func
    };
    // 默认属性
    static defaultProps = {
        classPrefix: 'tabs',
        className: 'tabs-bar-default',
        onChange: function() {}
    }
    // 构造器
    constructor(props) {
        // 调用父构造器
        super(props);
        // 
        const currProps = this.props;
        
        // 处理activeIndex
        let activeIndex;

        // 如果props上有activeIndex，如果无，但是有defaultActiveIndex
        if ('activeIndex' in currProps) {
            activeIndex = currProps.activeIndex;
        } else if ('defaultActiveIndex' in currProps) {
            activeIndex = currProps.defaultActiveIndex;
        }
        /**
         * 关键点构造器中，对state进行初始化 
         */
        this.state = {
            activeIndex,
            prevIndex: activeIndex // 初始化的时候，prevIndex === activeIndex
        };
    }
    /**
     *
     * 如果Tabs是智能组件的话，讲道理这里不会被执行到 
     */
    componentWillReceiveProps(nextProps) {
        console.log('in componentWillReceiveProps');
        // 考虑到props可能会被外界传入
        if ('activeIndex' in nextProps) {
            this.setState({
                activeIndex: nextProps.activeIndex
            });
        }
    }
    handleTabClick(activeIndex) {
        console.log('in handleTabClick');
        // 点击tab的时候该做些什么？
        // 1. 获得必要的数据 prevIndex,activeIndex
        const prevIndex = this.state.activeIndex;
        // 如果传入的值和当前的值不同，才考虑更新
        if (activeIndex != prevIndex) {
            // 2. 更新state
            this.setState({
                activeIndex,
                prevIndex
            });
        }
        // 3. 调用函数,处理activeIndex变更操作
        this.props.onChange({activeIndex, prevIndex});
    }
    render() {
        const { className } = this.props;
        const classes = classnames(className, 'ui-tabs');
        return (
            <div className={classes}>
                {this.renderTabsNav()}
                {this.renderTabContent()}
            </div>
        )
    }
    // tabsNav
    renderTabsNav() {
        const { classPrefix, children} = this.props;
        return (
            <TabsNav 
                key="tabBar" // TOASK 什么用？
                classPrefix={classPrefix}
                panels={children}
                activeIndex={this.state.activeIndex}
                onTabClick={this.handleTabClick.bind(this)}
            />
        )
    }
    renderTabContent() {
        const {classPrefix, children} = this.props;
        return (
            <TabContent
                key="tabcontent"
                classPrefix={classPrefix}
                panels={children}
                activeIndex={this.state.activeIndex}
            >
            </TabContent>
        )
    }
}
export class TabContent extends Component {
    getTabPanes() {
        const {classPrefix, panels, activeIndex} = this.props;
        return React.Children.map(panels, (panel) => {
            if (!panel) return;
            const order = parseInt(panel.props.order, 10);
            const isActive = activeIndex === order;
            return React.cloneElement(panel, {
                classPrefix,
                isActive,
                children: panel.props.children,
                key: `tabpane-${order}`
            })
        });
    }

    render() {
        const {classPrefix} = this.props;
        const classes = `${classPrefix}-content`;

        return (
            <div className={classes}>
                {this.getTabPanes()}
            </div>
        )
    }
}
// TabPane的实现
export class TabPane extends Component {
    render() {
        const {classPrefix, className, isActive, children} = this.props;
        const classes = classnames({
            [className]: className,
            [`${classPrefix}-panel`]: true,
            [`${classPrefix}-active`]: isActive
        });
        return (
            <div
                role="tabpanel"
                className={classes}
                aria-hidden={!isActive}
            >
            {children}
            </div>
        );
    }
}
// 从tabpane上提取必要的信息，生成tabnav
export class TabsNav extends Component {
    getTabs() {
        const { classPrefix, panels, activeIndex} = this.props;

        return React.Children.map(panels, (panel) => {
            if (!panel) { return;}
            // order为panel的顺序，如果和activeIndex相等，代表应该激活这个panel
            const order = parseInt(panel.props.order, 10);
            const classes = classnames({
                [`${classPrefix}-tab`]: true,
                [`${classPrefix}-active`]: activeIndex == order,
                [`${classPrefix}-disabled`]: panel.props.disabled
            });

            return (
                <li role="tab"
                    aria-disabled={panel.props.disabled ? 'true' : 'false'}
                    aria-selected={activeIndex == order ? 'true' : 'false'}
                    key={order}
                    className={classes}
                    onClick={this.props.onTabClick.bind(this, order)}
                >
                    {panel.props.tab}
                </li>
            );
        });
    }
    render() {
        const {classPrefix, activeIndex} = this.props;
        return (
            <div className={`${classPrefix}-bar`} role="tablist">
                <ul className={`${classPrefix}-nav`}>
                    {this.getTabs()}
                </ul>
            </div>
        )
    }
}
