import React, { Component } from 'react';
import { Card, Button, Table, Spin, Drawer, Form, message, Input, Select, Popover,Popconfirm } from 'antd';
import {connect} from 'react-redux';
import {reqUser, reqFactory, reqAddOrUpdateUser, reqMoveUser} from '../../api';
import {PAGE_SIZE} from '../../config';
import {createFactoryInfoAction} from '../../redux/actions/save_factory_action';

const { Option } = Select;

@connect(
  state => ({factoryInfo: state.factoryInfo}),
  {
    saveFactoryInfo: createFactoryInfoAction
  }
)
class User extends Component {

    state = {
      users: [],
      isLoading: true,
      visible: false,
      type: 'add',
      oldUid: '',
    }

    componentDidMount(){
      this.getAllUser();
    }

    getAllUser = async () => {
      let result = await reqUser('getAllUser');
      let {users} = result.data;
      let factories;
      // 如果为空就从请求，否则从redux中获取
      if(!this.props.factoryInfo){
        let factoryList = await reqFactory();
        factories = factoryList.data.factories;
        this.props.saveFactoryInfo(factories);
      }else{
        factories = this.props.factoryInfo.factories;
      }

      this.dueUser(users, factories);
    }


    dueUser = (users, factories) => {
      users.map((item) => {
        let data = factories.find((etem) => etem.bfid === item.faid);
        item.faname = data.name;
        return item;
      });
      if(this.state.type === 'add'){
        users.reverse();
      }
      this.setState({users, isLoading: false});
    }


    onClose = () => {
      // 不重置表单
      this.setState({visible: false});
    }

    showDrawer = () => {
      if(this.userForm){
        this.userForm.resetFields();
      }
      this.setState({visible: true});
    }


    cancle = () => {
      this.setState({visible: false});
      // 重置表单
      this.userForm.resetFields();
    }


    updateUser = item => {
      this.setState({type: 'update', visible: true, oldUid: item.uid});
      if(this.userForm){
        this.userForm.setFieldsValue(item);
      }
    }

    // 表单失败的回调
    onFinishFailed = ({errorFields}) => {
      console.log(errorFields)
      errorFields.forEach((item) => message.error(item.errors[0], 1))
    }
    // 表单成功的回调
    onFinish = async (data) => {
      const {type, oldUid} = this.state;
      if(type === 'add'){
        data.method = 'insertUser';
        let result = await reqAddOrUpdateUser(data);
        message.success(result.msg, 1);
        let users = [...this.state.users];
        users.push(data);
        this.dueUser(users, this.props.factoryInfo.factories);
      }else{
        data.method = 'updateUser';
        data.oldUid = oldUid;
        let result = await reqAddOrUpdateUser(data);
        message.success(result.msg, 1);
        let users = [...this.state.users];
        let index = users.findIndex((item) => item.uid == oldUid);
        data.password = '';
        data.rePassword = '';
        users[index] = data;
        this.dueUser(users, this.props.factoryInfo.factories);
      }
      // 清空表单
      this.userForm.resetFields();
      this.setState({visible: false});
    }


    reMoveUser = async ({uid}) => {
      let result = await reqMoveUser('removeUser', uid);
      message.success(result.msg, 1);
      let users = [...this.state.users];
      users = users.filter(item => item.uid != uid);
      this.setState({users});
    }


    render() {
        const {users, isLoading, visible, type} = this.state;
        const columns = [
          {
            title: '用户名',
            dataIndex: 'username',
            key: 'username',
            align: 'center',
          },
          {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
            align: 'center',
          },
          {
            title: '电话',
            dataIndex: 'phone',
            key: 'phone',
            align: 'center',
          },
          {
              title: '工厂',
              dataIndex: 'faname',
              key: 'faname',
              align: 'center',
          },
          {
              title: '部门',
              dataIndex: 'department',
              key: 'department',
              align: 'center',
          },
          {
              title: '操作',
              align: 'center',
              render: item => (
                  <div>
                      <Button style={{marginRight: '10px'}} type="primary" onClick={() => this.updateUser(item)}>修改</Button>
                      <Popconfirm
                        title={`确认删除${item.username}?`}
                        onConfirm={() => this.reMoveUser(item)}
                        okType="danger"
                        okText="确认"
                        cancelText="取消"
                      >
                        <Button type="primary" danger>删除</Button>
                      </Popconfirm>
                      
                  </div>
              )
          },
        ];
        return (
            <div style={{ height: '100%' }}>
              <Card title={<Button type="primary" onClick={this.showDrawer}>添加用户</Button>} style={{ height: '100%' }}>
                <Spin tip="Loading..." spinning={isLoading}>
                  <Table dataSource={users} columns={columns} bordered={true} rowKey="uid" pagination={{pageSize: PAGE_SIZE, hideOnSinglePage: true}}/>
                </Spin>
              </Card>
              <Drawer
                title={type === 'add' ? "添加用户" : "修改用户"}
                placement="left"
                closable={true}
                onClose={this.onClose}
                visible={visible}
                width="500px"
              >
                <Form ref={(userForm) => this.userForm = userForm} labelCol={{span: 5}} onFinishFailed={this.onFinishFailed} onFinish={this.onFinish}>
                  <Form.Item
                      name="uid"
                      rules={[
                          {
                              required: true,
                              message: '请输入8位用户编号!',
                          },
                          {
                              len: 8,
                              message: '请输入8位用户编号!'
                          }
                      ]}
                      label="编号"
                  >
                      <Input placeholder="用户编号"/>
                  </Form.Item>
                  <Form.Item
                      name="username"
                      rules={[
                          {
                              required: true,
                              message: '请输入用户名!',
                          },
                          {
                              max: 8,
                              message: '用户名最多8位!'
                          }
                      ]}
                      label="用户名"
                  >
                      <Input placeholder="用户名"/>
                  </Form.Item>
                  <Form.Item
                      name="password"
                      rules={[
                          {
                              required: true,
                              message: '请输入密码!',
                          },
                          {
                              max: 10,
                              message: '密码最多10位!'
                          }
                      ]}
                      label="密码"
                  >
                      <Input.Password placeholder="密码"/>
                  </Form.Item>
                  <Form.Item
                      name="rePassword"
                      rules={[
                          {
                              required: true,
                              message: '请再次输入密码!',
                          },
                          {
                              max: 10,
                              message: '密码最多10位!'
                          }
                      ]}
                      label="重复密码"
                  >
                      <Input.Password placeholder="重复密码"/>
                  </Form.Item>
                  <Form.Item
                      name="name"
                      rules={[
                          {
                              required: true,
                              message: '请输入姓名!',
                          },
                          {
                              max: 20,
                              message: '姓名最多20位!'
                          }
                      ]}
                      label="姓名"
                  >
                      <Input placeholder="姓名"/>
                  </Form.Item>
                  <Form.Item
                      name="phone"
                      rules={[
                          {
                              required: true,
                              message: '请输入电话!',
                          },
                          {
                              max: 11,
                              message: '电话最多11位!'
                          },
                          {
                              pattern: /^[0-9]{1,11}$/,
                              message: '请输入数字!'
                          }
                      ]}
                      label="电话"
                  >
                      <Input placeholder="电话" addonBefore="+86"/>
                  </Form.Item>
                  <Form.Item
                      name="faid"
                      label="工厂"
                      rules={[
                        {
                            required: true,
                            message: '请选择一个工厂!',
                        }
                    ]}
                  >
                      <Select placeholder="请选择一个工厂">
                        {
                          this.props.factoryInfo ? this.props.factoryInfo.factories.map((item) => (<Option value={item.bfid} key={item.bfid}>{item.name}</Option>)) : <Option value="0">请选择一个工厂</Option>
                        }
                      </Select>
                  </Form.Item>
                  <Form.Item
                      name="department"
                      label="部门"
                      rules={[
                        {
                            required: true,
                            message: '请输入部门名称!',
                        },
                        {
                            max: 20,
                            message: '部门名称最多20位!'
                        }
                      ]}
                  >
                      <Input placeholder="部门名称"/>
                  </Form.Item>
                  <Form.Item>
                      <Popover content="取消会清空表单">
                        <Button type="primary" danger style={{float: 'right'}} onClick={this.cancle}>
                        取消
                        </Button>
                      </Popover> 
                      <Button type="primary" htmlType="submit" style={{float: 'right', marginRight: '15px'}}>
                      提交
                      </Button>
                  </Form.Item>
                  
                </Form>
              </Drawer>
            </div>
        )
    }
}

export default User;
