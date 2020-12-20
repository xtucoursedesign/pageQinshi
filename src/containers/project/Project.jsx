import React, { Component } from 'react';
import { Table, Space, Button, Card, Spin, Input, message, Modal, Form, DatePicker, Select, Popconfirm, Progress } from 'antd';
import {connect} from 'react-redux';
import {PlusOutlined, SearchOutlined} from '@ant-design/icons';
import moment from 'moment';
import Highlighter from 'react-highlight-words';
import QueueAnim from 'rc-queue-anim';
import PropTypes from 'prop-types';
import {TweenOneGroup} from 'rc-tween-one';
import {reqFactory, reqProject} from '../../api';
import {PAGE_SIZE} from '../../config';


const TableContext = React.createContext(false);
const {Option} = Select;

@connect(
    state => ({factoryInfo: state.factoryInfo}),
    {

    }
)
class Project extends Component {

    state = {
        // 主表
        mainData: [],
        // 附表
        minorcData: [],
        isLoading: true,
        isPageTween: false, // 表格改变的回调
        visible: false, // model可见
        type: 'add',
        factories: [],
        // 立项日期
        approdate: '',
        // 合同交货日期
        spededate: '',
        // 实际交货日期
        actdate: '',
        // 附属表的加载
        minorcLoading: false,
        expandedRowKeys: [], // 展开的行
    }

    componentDidMount(){
        this.getAllProject();
    }

    // 获取项目信息
    getAllProject = async () => {
        let result = await reqProject({method: 'getAllProject'});
        if(result.status === 2){
            message.warning(result.msg, 1);
        }
        let {project} = result.data;
        let factories;
        if(this.props.factoryInfo){
            factories = [...this.props.factoryInfo.factories];
        }else{
            let factoryInfo = await reqFactory();
            if(factoryInfo.status === 2){
                message.warning(result.msg, 1);
            }else{
                factories = factoryInfo.data.factories;
            }
        }
        // console.log(project);
        // console.log(factories) 
        this.dueProject(project, factories);
    }

    // 处理项目
    dueProject = (project, factories) => {
        project.map((item) => {
            let factory = factories.find((it) => it.bfid === item.faid);
            item.faname = factory.name;
            return item;
        })
        this.setState({mainData: project, factories, isLoading: false, visible: false, isPageTween: false});
        if(this.proForm){
            this.proForm.resetFields();
        }
    }

    // 辅表项
    expandedRowRender = () => {
        const {minorcData, minorcLoading} = this.state;
        const minorcolumns = [
            {   title: '步骤', dataIndex: 'stepname', key: 'stepname', align: 'center' },
            {   title: '状态',
                render:  (item) => (
                    <Progress
                        strokeColor={{
                            '0%': '#108ee9',
                            '100%': '#87d068',
                        }}
                        status="active"
                        percent={item.status}
                    />
                ),
                align: 'center'
            },
            {
              title: '操作',
              render: (item) => (
                <Button onClick={() => this.props.history.push(`/admin/project/${item.step}/${this.state.expandedRowKeys[0]}`)}>查看详情</Button>
              ),
              align: 'center'
            },
        ];
        return (
            <Spin tip="Loading..." spinning={minorcLoading}>
                <Table columns={minorcolumns} dataSource={minorcData} pagination={false} />
            </Spin>
        );
    };


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

    getColumnSearchProps = (keyWord, dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
        <Input
            ref={node => {
            this.searchInput = node;
            }}
            placeholder={`请输入${keyWord}关键字`}
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
    //搜索结束

    handleOk = () => {
        this.proForm.validateFields().then(async (value) => {
            const {approdate, spededate, actdate, type, oldPid} = this.state;
            value.approdate = approdate;
            value.spededate = spededate;
            value.actdate = actdate;
            console.log(value, type);
            if(type === 'add'){
                value.method = 'insertProject';
            }else{
                value.method = 'updateProject',
                value.oldPid = oldPid;
            }
            let result = await reqProject(value);
            message.success(result.msg, 1);
            let {factories} = this.state;
            let mainData = [...this.state.mainData];
            if(type === 'add'){
                mainData.unshift(value);
            }else{
                let index = mainData.findIndex((item) => item.pid === oldPid);
                mainData[index] = value;
            }
            this.dueProject(mainData, factories);
        })
    }

    handleCancel = () => {
        this.proForm.resetFields();
        this.setState({visible: false});
    }


    showModel = (type, item) => {
        if(type === 'update'){
            this.setState({oldPid: item.pid, approdate: item.approdate, spededate: item.spededate, actdate: item.actdate});
            if(this.proForm){
                this.proForm.setFieldsValue({pid: item.pid, name: item.name, faid: item.faid, investid: item.investid, investname: item.investname, approdate: moment(item.approdate, 'YYYY-MM-DD HH:mm:ss'), spededate: moment(item.spededate, 'YYYY-MM-DD HH:mm:ss'), actdate: item.actdate ? moment(item.actdate,'YYYY-MM-DD HH:mm:ss') : null});
            }
        }
        this.setState({type, visible: true});
    }
    // 删除项目
    removeProject = async ({pid}) => {
        let {factories} = this.state;
        let mainData = [...this.state.mainData];
        let data = {pid, method: 'removeProject'};
        let result = await reqProject(data);
        message.success(result.msg);
        let index = mainData.findIndex((item) => item.pid === pid);
        mainData.splice(index, 1);
        this.dueProject(mainData, factories);
    }

    // 日期改变的回调
    onChange = (type, time) => {
        this.setState({[type] : time});
    }
    // 展开附属表的回调
    expandRow = (expanded, {pid}) => {
        if(expanded){
            this.setState({expandedRowKeys: [pid]});
        }else{
            this.setState({expandedRowKeys: []});
        }
        this.setState({minorcLoading: expanded});
        this.getSketchByProId(pid);
    }

    // 获取指定项目的附属表
    getSketchByProId = async (pid) => {
        let result = await reqProject({method: 'getSketchByProId', pid});
        // console.log(result);
        let stepname = ['下料', '组装', '二次装配'];
        let minorcData = result.data.sketch;
        minorcData.map((item, index) => {
            item.stepname = stepname[index];
            return item;
        })
        this.setState({minorcData, minorcLoading: false});
    }
    render() {
        const {mainData, isLoading, visible, type, factories, expandedRowKeys} = this.state;

        const maincolumns = [
            { title: '项目编号', dataIndex: 'pid', key: 'pid', align: 'center', sorter: (a, b) => a.pid.length - b.pid.length,},
            { title: '项目名字', dataIndex: 'name', key: 'name', align: 'center', sorter: (a, b) => a.name.length - b.name.length, ...this.getColumnSearchProps('名字', 'name')},
            { title: '所属工厂', dataIndex: 'faname', key: 'faname', align: 'center', sorter: (a, b) => a.faname.length - b.faname.length, ...this.getColumnSearchProps('工厂', 'faname') },
            { title: '投资方编号', dataIndex: 'investid', key: 'investid', align: 'center', sorter: (a, b) => a.investid.length - b.investid.length, },
            { title: '投资方名字', dataIndex: 'investname', key: 'investname', align: 'center', sorter: (a, b) => a.investname.length - b.investname.length, ...this.getColumnSearchProps('名字', 'investname')},
            { title: '立项日期', dataIndex: 'approdate', key: 'approdate', align: 'center' },
            { title: '合同交货日期', dataIndex: 'spededate', key: 'spededate', align: 'center' },
            { title: '实际交货日期', dataIndex: 'actdate', key: 'actdate', align: 'center' },
            {
                title: '操作',
                render: (item) => (
                    <div>
                        <Button type="primary" style={{marginRight: '10px'}} onClick={() => this.showModel("update", item)}>修改</Button>
                        <Popconfirm
                        title={`确认删除${item.name}?`}
                        onConfirm={() => this.removeProject(item)}
                        okType="danger"
                        okText="确认"
                        cancelText="取消"
                      >
                        <Button type="primary" danger>删除</Button>
                      </Popconfirm>
                    </div>
                ),
                align: 'center'
            },
        ];
        return (
            <QueueAnim
                animConfig={[
                    { opacity: [1, 0], translateX: [0, 50] },
                    { opacity: [1, 0], translateX: [0, -50] }
                ]}
                style={{height: '100%'}}
            >
                <div style={{height: "100%"}} key="projectkey">
                    <Card 
                        title={<Button type="primary" icon={<PlusOutlined />} onClick={() => this.showModel("add")}>添加项目</Button>}
                        style={{height: "100%"}}
                    >
                        <Spin tip="Loading..." spinning={isLoading}>
                            <Table
                                className="components-table-demo-nested"
                                columns={maincolumns}
                                expandable={{expandedRowRender: this.expandedRowRender, onExpand: this.expandRow}}
                                dataSource={mainData}
                                pagination={{pageSize: PAGE_SIZE, hideOnSinglePage: true}}
                                components={{body: { wrapper: this.animTag}}}
                                onChange={this.pageChange}
                                rowKey="pid"
                                expandedRowKeys={expandedRowKeys}
                            />
                        </Spin>
                    </Card>
                </div>
                <Modal
                    title={type === 'add' ? '添加项目' : '修改项目'}
                    visible={visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Form ref={(proForm) => this.proForm = proForm} labelCol={{span: 5}}>
                        <Form.Item
                            name="pid"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入11位项目编号!',
                                },
                                {
                                    len: 11,
                                    message: '请输入11位项目编号!'
                                }
                            ]}
                            label="项目编号"
                        >
                            <Input placeholder="项目编号"/>
                        </Form.Item>
                        <Form.Item
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入项目名!',
                                },
                                {
                                    max: 28,
                                    message: '项目名必须小于28个字符!'
                                }
                            ]}
                            label="项目名字"
                        >
                            <Input placeholder="项目名字"/>
                        </Form.Item>
                        <Form.Item
                            name="faid"
                            rules={[
                                {
                                    required: true,
                                    message: '请选择所属工厂!',
                                },
                            ]}
                            label="工厂"
                        >
                            <Select placeholder="请选择一个工厂">
                                {
                                    factories.map((item) => (<Option value={item.bfid} key={item.bfid}>{item.name}</Option>))
                                }
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="investid"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入11位投资方编号!',
                                },
                                {
                                    len: 11,
                                    message: '请输入11位投资方编号!'
                                }
                            ]}
                            label="投资方编号"
                        >
                            <Input placeholder="投资方编号"/>
                        </Form.Item>
                        <Form.Item
                            name="investname"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入投资方名字!',
                                },
                                {
                                    max: 18,
                                    message: '项目名必须小于18个字符!'
                                }
                            ]}
                            label="投资方名字"
                        >
                            <Input placeholder="投资方名字"/>
                        </Form.Item>
                        <Form.Item
                            name="approdate"
                            rules={[
                                {
                                    required: true,
                                    message: '请选择立项日期!',
                                },
                            ]}
                            label="立项日期"
                        >
                            <DatePicker showTime onChange={(mement, time) => this.onChange('approdate', time)} />
                        </Form.Item>
                        <Form.Item
                            name="spededate"
                            rules={[
                                {
                                    required: true,
                                    message: '请选择合同交货日期!',
                                },
                            ]}
                            label="合同交货日期"
                        >
                            <DatePicker showTime onChange={(mement, time) => this.onChange('spededate', time)} />
                        </Form.Item>
                        <Form.Item
                            name="actdate"
                            label="实际交货日期"
                        >
                            <DatePicker showTime onChange={(mement, time) => this.onChange('actdate', time)} />
                        </Form.Item>
                    </Form>
                </Modal>
            </QueueAnim>
        )
    }
}

export default Project;