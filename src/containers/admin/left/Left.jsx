import React, { Component } from 'react';
import {withRouter, Link} from 'react-router-dom';
import {connect} from 'react-redux'
import {Layout, Menu} from 'antd';
import {createTitleInfoAction} from '../../../redux/actions/save_title_action';
import {createTagInfoAction} from '../../../redux/actions/save_tag_action';
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
        saveTagInfo: createTagInfoAction
    }
)
@withRouter
class Left extends Component {
    state = {
        collapsed: false,
        key: [],
    };

    componentDidMount(){
        let {pathname} = this.props.location;
        let data = getTitleInfo(pathname);
        this.setState({key: data.key});
    }
    // 点开收起的回调函数
    onCollapse = collapsed => {
        console.log(collapsed)
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
        this.setState({key: [e.key]});
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
        const {collapsed, key} = this.state;
        return (
            <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse} className="left_nav">
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
