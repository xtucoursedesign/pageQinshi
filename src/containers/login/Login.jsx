import React, { Component } from 'react';
import { Form, Input, Button, message, Carousel } from 'antd';
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {createUserInfoAction} from '../../redux/actions/create_user_action';
import {reqLogin} from '../../api'
import logo from '../../static/imgs/xtlogo.png';
import login1 from '../../static/imgs/login1.png';
import login2 from '../../static/imgs/login2.png';
import login3 from '../../static/imgs/login3.png';
import './less/login.less';

@connect(
    state => ({userInfo: state.userInfo}),
    {
        createUserInfo: createUserInfoAction
    }
)
class Login extends Component {


    onFinishFailed = ({errorFields}) => {
        errorFields.forEach(error => message.error(error.errors[0], 1));
    }

    onFinish = async ({username, password}) => {
        let result = await reqLogin("login", username, password);
        if(result.status === 0){
            // 将user信息放入redux中管理
            this.props.createUserInfo(result.data);
            // 跳转
            this.props.history.push('/admin');
        }
    }

    render() {
        const {isLogin} = this.props.userInfo;
        if(isLogin){
            return (<Redirect to="/admin"></Redirect>);
        }else{
            return (
                <div className="mycommon" style={{overflow: 'hidden'}}>
                    <Carousel className="mycommon" dots={false} effect="scrollx" autoplay={true}>
                        <div>
                            <img src={login1} alt="xtulogo" className="mycommon"/>
                        </div>
                        <div>
                            <img src={login2} alt="xtulogo" className="mycommon"/>
                        </div>
                        <div>
                            <img src={login3} alt="xtulogo" className="mycommon"/>
                        </div>
                    </Carousel>
                        <header className="header">
                            <img src={logo} alt="xtulogo" className="logo"/>
                            <span className="title">Curriculum design</span>
                        </header>
                        <section className="section">
                            <h1>用户登录</h1>
                            <Form
                                onFinishFailed={this.onFinishFailed}
                                onFinish={this.onFinish}
                            >
                                <Form.Item
                                    name="username"
                                    rules={[
                                        {
                                            required: true,
                                            message: '请输入用户名!',
                                        },
                                        {
                                            min: 4,
                                            max: 8,
                                            message: '请输入4到8位用户名!',
                                        }
                                    ]}
                                >
                                    <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="Username" />
                                </Form.Item>
        
                                <Form.Item
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message: '请输入密码!',
                                        },
                                        {
                                            min: 4,
                                            max: 10,
                                            message: '请输入4到10位密码!',
                                        }
                                    ]}
                                >
                                    <Input.Password prefix={<LockOutlined className="site-form-item-icon"/>} placeholder="Password"/>
                                </Form.Item>
        
                                <Form.Item>
                                    <Button type="primary" htmlType="submit" className="login-submit">
                                    登录
                                    </Button>
                                </Form.Item>
                            </Form>
                        </section>
                </div>
            )
        }
        
    }
}

export default Login;
