import React, {Component} from 'react';
import {Card, Button, Table, Spin, Drawer, Form, message, Input, Select, Popover,Popconfirm, Space} from 'antd';
import {connect} from 'react-redux';
import QueueAnim from 'rc-queue-anim';
import PropTypes from 'prop-types';
import {TweenOneGroup} from 'rc-tween-one';
import {PlusOutlined, SearchOutlined} from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import {reqUser, reqFactory, reqAddOrUpdateUser, reqMoveUser} from '../../api';
import {PAGE_SIZE} from '../../config';
import {createFactoryInfoAction} from '../../redux/actions/save_factory_action';

const { Option } = Select;
const TableContext = React.createContext(false);

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
      searchText: '',
      searchedColumn: '',
      isPageTween: false, // 表格改变的回调
    }

    componentDidMount(){
      this.getAllUser();
    }


    /* 动画开始 */
    static propTypes = {
      className: PropTypes.string,
    };

    static defaultProps = {
        className: 'table-enter-leave-demo',
    };
    constructor(props) {
        super(props);
        this.enterAnim = [
            {
              opacity: 0, x: 30, backgroundColor: '#fffeee', duration: 0,
            },
            {
              height: 0,
              duration: 200,
              type: 'from',
              delay: 250,
              ease: 'easeOutQuad',
              onComplete: this.onEnd,
            },
            {
              opacity: 1, x: 0, duration: 250, ease: 'easeOutQuad',
            },
            { delay: 1000, backgroundColor: '#fff' },
        ];
        this.pageEnterAnim = [
            {
              opacity: 0, duration: 0,
            },
            {
              height: 0,
              duration: 150,
              type: 'from',
              delay: 150,
              ease: 'easeOutQuad',
              onComplete: this.onEnd,
            },
            {
              opacity: 1, duration: 150, ease: 'easeOutQuad',
            },
        ];
        this.leaveAnim = [
            { duration: 250, opacity: 0 },
            { height: 0, duration: 200, ease: 'easeOutQuad' },
        ];
        this.pageLeaveAnim = [
            { duration: 150, opacity: 0 },
            { height: 0, duration: 150, ease: 'easeOutQuad' },
        ];
        // 动画标签，页面切换时改用 context 传递参数；
        this.animTag = ($props) => {
            return (
              <TableContext.Consumer>
                {(isPageTween) => {
                  return (
                    <TweenOneGroup
                      component="tbody"
                      enter={!isPageTween ? this.enterAnim : this.pageEnterAnim}
                      leave={!isPageTween ? this.leaveAnim : this.pageLeaveAnim}
                      appear={false}
                      exclusive
                      {...$props}
                    />
                  );
                }}
              </TableContext.Consumer>
            );
        };
    }

    onEnd = (e) => {
        const dom = e.target;
        dom.style.height = 'auto';
    }

    pageChange = () => {
        this.setState({
          isPageTween: true,
        });
    };

    /* 动画结束 */

    getColumnSearchProps = dataIndex => ({
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
            ref={node => {
              this.searchInput = node;
            }}
            placeholder={`请输入姓名关键字`}
            value={selectedKeys[0]}
            onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90 }}
            >
              搜索
            </Button>
            <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
              重置
            </Button>
          </Space>
        </div>
      ),
      filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
      onFilter: (value, record) =>
        record[dataIndex]
          ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
          : '',
      onFilterDropdownVisibleChange: visible => {
        if (visible) {
          setTimeout(() => this.searchInput.select(), 100);
        }
      },
      render: text =>
        this.state.searchedColumn === dataIndex ? (
          <Highlighter
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
            searchWords={[this.state.searchText]}
            autoEscape
            textToHighlight={text ? text.toString() : ''}
          />
        ) : (
          text
        ),
    });


    handleSearch = (selectedKeys, confirm, dataIndex) => {
      confirm();
      this.setState({
        searchText: selectedKeys[0],
        searchedColumn: dataIndex,
      });
    };
  
    handleReset = clearFilters => {
      clearFilters();
      this.setState({ searchText: '' });
    };

    getAllUser = async () => {
      let result = await reqUser('getAllUser');
      if(result.status === 2){
        message.warning(result.msg, 1);
        this.setState({isLoading: false});
        return;
      }
      let {users} = result.data;
      let factories;
      // 如果为空就从请求，否则从redux中获取
      if(!this.props.factoryInfo){
        let factoryList = await reqFactory();
        if(factoryList.status === 2){
          message.warning(factoryList.msg, 1);
        }else{
          factories = factoryList.data.factories;
          this.props.saveFactoryInfo(factories);
        }
      }else{
        factories = this.props.factoryInfo.factories;
      }

      this.dueUser(users, factories);
    }


    dueUser = (users, factories) => {
      users.map((item) => {
        let data;
        if(factories){
          data = factories.find((etem) => etem.bfid === item.faid);
          item.faname = data.name;
        }
        return item;
      });
      if(this.state.type === 'add'){
        users.reverse();
      }
      this.setState({users, isLoading: false, isPageTween: false});
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
      this.setState({users, isPageTween: false});
    }


    render() {
        const {users, isLoading, visible, type} = this.state;
        const columns = [
          {
            title: '用户名',
            dataIndex: 'username',
            key: 'username',
            align: 'center',
            sorter: (a, b) => a.username.length - b.username.length,
          },
          {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
            align: 'center',
            ...this.getColumnSearchProps('name'),
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
              sorter: (a, b) => a.faname.length - b.faname.length,
          },
          {
              title: '部门',
              dataIndex: 'department',
              key: 'department',
              align: 'center',
              sorter: (a, b) => a.department.length - b.department.length,
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
            <div style={{height: '100%'}}>
              <QueueAnim
                animConfig={[
                    { opacity: [1, 0], translateX: [0, 50] },
                    { opacity: [1, 0], translateX: [0, -50] }
                ]}
                style={{height: '100%'}}
              >
                <div style={{height: '100%'}} key="carduser">
                  <Card title={<Button type="primary" onClick={this.showDrawer} icon={<PlusOutlined />}>添加用户</Button>} style={{ height: '100%' }}>
                    <Spin tip="Loading..." spinning={isLoading}>
                      <Table
                        dataSource={users}
                        columns={columns}
                        bordered={true}
                        rowKey="uid"
                        pagination={{pageSize: PAGE_SIZE, hideOnSinglePage: true}}
                        components={{body: { wrapper: this.animTag}}}
                        onChange={this.pageChange}
                      />
                    </Spin>
                  </Card>
                </div>
              </QueueAnim>
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
