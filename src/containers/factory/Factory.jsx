import React, { Component } from 'react';
import { Form, Input, Card, Button, Table, Modal, message, Spin } from 'antd';
import {connect} from 'react-redux';
import QueueAnim from 'rc-queue-anim';
import {PlusOutlined} from '@ant-design/icons';
import PropTypes from 'prop-types';
import {TweenOneGroup} from 'rc-tween-one';
import {reqFactory, reqAddFactory, reqRemoveFactory, reqUpdateFactory} from '../../api';
import {PAGE_SIZE} from '../../config';
import {createFactoryInfoAction} from '../../redux/actions/save_factory_action';

const {confirm} = Modal;
const TableContext = React.createContext(false);
  

@connect(
    state => ({factoryInfo: state.factoryInfo}),
    {
        saveFactoryInfo: createFactoryInfoAction
    }
)
class Factory extends Component {
    state = {
        factories: [],
        visible: false,
        type: 'add',
        oldBfid: '',
        isLoading: true,
        isPageTween: false, // 表格改变的回调
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

    
    componentDidMount(){
        // 如果为空 就请求，否则从redux中获取
        if(!this.props.factoryInfo){
            this.getAllFactory();
        }else{
            // 为了不改变redux中的factories元素的顺序
            let factories = [...this.props.factoryInfo.factories];
            this.dueFactory(factories);
        }
    }

    
    
    // 获取所有工厂信息
    getAllFactory = async () => {
        let result = await reqFactory();
        if(result.status === 2){
            message.warning(result.msg, 1);
            this.setState({isLoading: false});
        }else{
            let {factories} = result.data;
            this.props.saveFactoryInfo(factories);
            // 为了不改变redux中的factories元素的顺序
            let fact = [...factories];
            this.dueFactory(fact);
        } 
    }

    // 处理工厂信息
    dueFactory = factories => {
        factories.reverse();
        factories.map((item, index) => {
            item.num = index + 1;
            return item;
        })
        this.setState({factories, isLoading: false, isPageTween: false});
    }

    showAdd = (type, data) => {
        this.setState({visible: true, type});
        if(type !== 'add' && this.facForm){
            this.facForm.setFieldsValue({bfid: data.bfid, name: data.name});
            this.setState({oldBfid: data.bfid});
        };
    }

    handleOk = () => {
        const {type} = this.state;
        if(type === 'add'){
            this.facForm.validateFields().then(async ({bfid, name}) => {
                let result = await reqAddFactory('insertFactory', bfid, name);
                message.success(result.msg, 1);
                this.facForm.resetFields();
                let factories = [...this.state.factories];
                factories.unshift({num: factories.length + 1, bfid, name});
                this.setState({factories, isPageTween: false});
                this.handleCancel();
            })
        }else{
            const {oldBfid} = this.state;
            this.facForm.validateFields().then(async ({bfid, name}) => {
                let result = await reqUpdateFactory('updateFactory', bfid, name, oldBfid);
                message.success(result.msg, 1);
                this.facForm.resetFields();
                let factories = [...this.state.factories];
                factories = factories.map((item) => {
                    if(item.bfid === oldBfid){
                        item.bfid = bfid;
                        item.name = name;
                    }
                    return item;
                });
                this.setState({factories});
                this.handleCancel();
            })
        }
    }

    handleCancel = () => {
        this.facForm.resetFields();
        this.setState({visible: false});
    }

    deleteFactory = ({bfid, name}) => {
        confirm({
            title: `确定删除${name}?`,
            okType: 'danger',
            onOk: async () => {
                let result = await reqRemoveFactory('removeFactory', bfid);
                message.success(result.msg, 1);
                let factories = [...this.state.factories];
                factories = factories.filter(item => item.bfid !== bfid);
                this.setState({factories, isPageTween: false});
            }
        })
    }
    

    render() {
        const {factories, visible, type, isLoading} = this.state;
        const columns = [
            {
                title: '序号',
                dataIndex: 'num',
                key: 'num',
                align: 'center',
                sorter: (a, b) => a.num - b.num,
            },
            {
                title: '编号',
                dataIndex: 'bfid',
                key: 'bfid',
                align: 'center',
                sorter: (a, b) => a.bfid.length - b.bfid.length,
            },
            {
                title: '名字',
                dataIndex: 'name',
                key: 'name',
                align: 'center',
                sorter: (a, b) => a.name.length - b.name.length,
            },
            {
                title: '操作',
                align: 'center',
                render: (item) => (
                    <div>
                        <Button style={{marginRight: '10px'}} type="primary" onClick={() => this.showAdd('update', item)}>修改</Button>
                        <Button onClick={() => this.deleteFactory(item)} type="primary" danger>删除</Button>
                    </div>
                )
            }
        ];
        return (
            <QueueAnim
                animConfig={[
                    { opacity: [1, 0], translateX: [0, 50] },
                    { opacity: [1, 0], translateX: [0, -50] }
                ]}
                style={{height: '100%'}}
            >
                <div style={{height: "100%"}} key="cardfactory">
                    <Card 
                        title={<Button type="primary" onClick={() => this.showAdd('add')} icon={<PlusOutlined />}>添加工厂</Button>}
                        style={{height: "100%"}}
                    >   <Spin tip="Loading..." spinning={isLoading}>
                            <Table 
                                dataSource={factories}
                                columns={columns}
                                bordered={true}
                                rowKey="bfid"
                                pagination={{pageSize: PAGE_SIZE, hideOnSinglePage: true}}
                                components={{body: { wrapper: this.animTag}}}
                                onChange={this.pageChange}
                            />
                        </Spin>
                        <Modal
                            title={type === 'add' ? '添加工厂' : '修改工厂'}
                            visible={visible}
                            onOk={this.handleOk}
                            onCancel={this.handleCancel}
                        >
                            <Form ref={(facForm) => this.facForm = facForm}>
                                <Form.Item
                                    name="bfid"
                                    rules={[
                                        {
                                            required: true,
                                            message: '请输入11位工厂编号!',
                                        },
                                        {
                                            len: 11,
                                            message: '请输入11位工厂编号!'
                                        }
                                    ]}
                                    label="编号"
                                >
                                    <Input placeholder="工厂编号"/>
                                </Form.Item>
                                <Form.Item
                                    name="name"
                                    rules={[
                                        {
                                            required: true,
                                            message: '请输入工厂名!',
                                        },
                                        {
                                            max: 28,
                                            message: '工厂名必须小于28个字符!'
                                        }
                                    ]}
                                    label="名字"
                                >
                                    <Input placeholder="工厂名字"/>
                                </Form.Item>
                            </Form>
                        </Modal>
                    </Card>
                </div>
            </QueueAnim>
        )
    }
}

export default Factory;
