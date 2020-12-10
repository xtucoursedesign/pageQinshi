import React, { Component } from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'
import {Button, Popconfirm, Breadcrumb, Tag} from 'antd';
import {deleteUserInfoAction} from '../../../redux/actions/create_user_action';
import {dateFormat} from '../../../myFunction/time_format';
import {reqLocation, reqWeather} from '../../../api';
import {imgUrl} from '../../../myFunction/weather_img';
import {getTitleInfo} from '../../../myFunction/title_info';
import './css/header.less';


@connect(
    state => ({
        userInfo: state.userInfo,
        titleInfo: state.titleInfo,
        tagInfo: state.tagInfo
    }),
    {
        deleteUserInfo: deleteUserInfoAction
    }
)
@withRouter
class Header extends Component {

    state = {
        time: dateFormat("YYYY-mm-dd HH:MM:SS", new Date()), // 时间格式化
        location: '', // 位置
        weatherUrl: '', // 天气图片url
        weatherType: '', // 天气类型
        temperature: '', // 温度状况
        timerId: null,
    }
    // 组件挂载
    componentDidMount(){
        let timerId = setInterval(() => {this.setState({time: dateFormat("YYYY-mm-dd HH:MM:SS", new Date())})}, 1000);
        this.setState({timerId})
        this.getLocation();
    }
    // 组件卸载
    componentWillUnmount(){
        // 清空定时器
        clearInterval(this.state.timerId);
    }
    // 退出
    loginOut = () => {
        this.props.deleteUserInfo();
    }
    // 获取位置
    getLocation = async () => {
        let result = await reqLocation();
        const {location} = result.data;
        if(!location){
            location = "北京";
        }
        this.getWeather(location);
        this.setState({location})
    }
    // 获取天气
    getWeather = async city => {
        let result = await reqWeather(city);
        const {type, high, low} = result.data.data.forecast[0];
        let weatherUrl = imgUrl(type);
        let temperature = low + "~" + high;
        this.setState({weatherUrl, weatherType: type, temperature}); 
    }

    closetag = (index) => {
        let path = [...this.props.tagInfo.path];
        console.log(path)
        console.log(index)

        this.props.history.goBack(-1);
    }

    redirect = (ele) => {
        this.props.history.go(ele);
    }
    
    render() {
        let path = [...this.props.tagInfo.path];
        const {name} = this.props.userInfo.user;
        const {pathname} = this.props.location;
        const {time, location, weatherUrl, weatherType, temperature} = this.state;
        if(path.indexOf(pathname) === -1 && pathname !== '/admin/home'){
            path.push(pathname);
        }
        let title = [];
        if(this.props.titleInfo){
            title = this.props.titleInfo.title;
        }else{
            title = getTitleInfo(this.props.location.pathname).titl;
        }
        return (
            <div className="adminheader">
                <div className="header-top">
                    <Breadcrumb className="breadcrumb">
                        {
                            title.map((ele, index) => <Breadcrumb.Item key={index} style={{color: '#97a8be'}}>{ele}</Breadcrumb.Item>)
                        }
                    </Breadcrumb>
                    <div className="header-top-right">
                        <span>欢迎，{name}</span>
                        <Popconfirm 
                            title="确定要退出吗？"
                            okText="是"
                            cancelText="否"
                            onConfirm={this.loginOut}
                        >
                            <Button type="link">退出</Button>
                        </Popconfirm> 
                    </div> 
                </div>
                <div className="header-bottom">
                    <Tag onClick={() => this.redirect('/admin/home')} style={{height: '26px', margin: '2px', lineHeight: '24px'}} color={pathname === '/admin/home' ? '#1DA57A' : ''}>
                        首页
                    </Tag>
                    {
                        path.map((ele, index) => (
                            <Tag key={ele} closable onClose={() => this.closetag(index)} onClick={() => this.redirect(ele)} style={{height: '26px', margin: '2px', lineHeight: '24px'}} color={pathname === ele ? '#1DA57A' : ''}>
                                {getTitleInfo(ele).last}
                            </Tag>
                        ))
                    }
                    <div className="header-bottom-right">
                        <span>{time}</span>
                        <span className="local">{location}</span>
                        <img src={weatherUrl} alt="天气"/>
                        <span className="weather">{weatherType}</span>
                        <span>{temperature}</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default Header;
