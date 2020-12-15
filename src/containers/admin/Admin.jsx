import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Redirect, Route, Switch} from 'react-router-dom';
import { Layout } from 'antd';
import Left from './left/Left';
import Header from './header/Header';
import Home from '../home/Home';
import Project from '../project/Project';
import User from '../user/User';
import Pie from '../pie/Pie';
import Factory from '../factory/Factory';
import Main from '../main/Main';
import Part from '../part/Part';
import Line from '../line/Line';
import './admin.less';

const { Content, Footer } = Layout;


@connect(
    state => ({userInfo: state.userInfo, titleInfo: state.titleInfo, leftInfo: state.leftInfo}),
    {
        
    }
)
class Admin extends Component {
    render() {
        const {isLogin} = this.props.userInfo;
        const {collapsed} = this.props.leftInfo;
        if(isLogin){
            return (
                <Layout style={{minHeight: '100vh'}}>
                    <Left></Left>
                    <Layout className="site-layout" style={{marginLeft: collapsed ? '80px' : '200px'}}>
                        <Header style={{width: collapsed ? 'calc(100% - 80px)' : 'calc(100% - 200px)', position: 'fixed', zIndex: '1'}}></Header>
                        <Content className="admin_content">
                            <div className="site-layout-background" style={{height: "100%"}}>
                                <Switch>
                                    <Route path="/admin/home" component={Home}></Route>
                                    <Route path="/admin/project" component={Project}></Route>
                                    <Route path="/admin/user" component={User}></Route>
                                    <Route path="/admin/factory" component={Factory}></Route>
                                    <Route path="/admin/main" component={Main}></Route>
                                    <Route path="/admin/part" component={Part}></Route>
                                    <Route path="/admin/char/pie" component={Pie}></Route>
                                    <Route path="/admin/char/line" component={Line}></Route>
                                    <Redirect to="/admin/home"></Redirect>
                                </Switch>
                            </div>
                        </Content>
                        <Footer style={{ textAlign: 'center' }}>Curriculum Design ©2020 Created by LiPei</Footer>
                    </Layout>
                </Layout>
            )

        }else{
            return (<Redirect to="/login"></Redirect>)
        }
        
    }
}

export default Admin;
