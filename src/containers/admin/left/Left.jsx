import React, { Component } from 'react';
import {withRouter, Link} from 'react-router-dom';
import {connect} from 'react-redux'
import {Layout, Menu} from 'antd';
import {createTitleInfoAction} from '../../../redux/actions/save_title_action';
import {createTagInfoAction} from '../../../redux/actions/save_tag_action';
import {createLeftInfoAction} from '../../../redux/actions/save_left_action';
import {getTitleInfo} from '../../../myFunction/title_info';
import menu from '../../../config/menu';
import logo from '../../../static/imgs/logo.png';
import './css/left.less'

const { Sider } = Layout;
const { SubMenu } = Menu;

@connect(
    state => ({titleInfo: state.titleInfo, tagInfo: state.tagInfo}),
    {
        saveTileInfo: createTitleInfoAction,
        saveTagInfo: createTagInfoAction,
        saveLeftInfo: createLeftInfoAction,
    }
)
@withRouter
class Left extends Component {
    state = {
        collapsed: false,
    };
    // 点开收起的回调函数
    onCollapse = collapsed => {
        this.props.saveLeftInfo(collapsed);
        this.setState({collapsed});
    };

    getTitle = (e) => {
        const {pathname} = this.props.location;
        let path = [...this.props.tagInfo.path];
        if(path.indexOf(pathname) === -1 && pathname !== '/admin/home'){
            path.push(pathname);
        }
        let current = pathname;
        this.props.saveTagInfo({path, current});
        let title = getTitleInfo(parseInt(e.key));
        this.props.saveTileInfo(title);
    }

    createMenu = (menuList) => {
        return menuList.map((ele) => {
            if(!ele.children){
                return (
                    <Menu.Item key={ele.key} icon={ele.icon} onClick={(event) => this.getTitle(event)} style={{height: '56px', lineHeight: '56px'}}>
                        <Link to={ele.path}>{ele.title}</Link>
                    </Menu.Item>
                )
            }else{
                return (
                    <SubMenu key={ele.key} icon={ele.icon} title={ele.title}>
                        {
                            this.createMenu(ele.children)
                        }
                    </SubMenu>
                )
            }
        })
    }
    render() {
        const {collapsed} = this.state;
        let key = getTitleInfo(this.props.location.pathname).key;
        return (
            <Sider
                collapsible collapsed={collapsed}
                onCollapse={this.onCollapse}
                className="left_nav" 
                width={200}
                style={{
                    overflow: 'auto',
                    height: '100vh',
                    position: 'fixed',
                    left: 0,
                    zIndex: 2,
                }}
            >
                <div className="twrap">
                    <img src={logo} alt="react" style={{height: '50px'}}/>
                    <span className="title" style={collapsed ? {display: 'none'} : {display: 'block'}}>MRP</span>
                </div>
                <Menu theme="dark" selectedKeys={key} mode="inline" defaultOpenKeys={getTitleInfo(this.props.location.pathname).key}>
                    {
                        this.createMenu(menu)
                    }
                </Menu>
            </Sider>
        )
    }
}

export default Left;
