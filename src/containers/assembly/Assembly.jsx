import React, { Component } from 'react';
import {Table, Space, Button, Card, Spin, Input, message, Popconfirm, Modal, Switch} from 'antd';
import {PlusOutlined, SearchOutlined, LeftOutlined, LoadingOutlined, CloseOutlined, CheckOutlined} from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import QueueAnim from 'rc-queue-anim';
import PropTypes from 'prop-types';
import {TweenOneGroup} from 'rc-tween-one';
import {reqPart, reqMain, reqProject, reqAssembly} from '../../api';
import {PAGE_SIZE} from '../../config';

const TableContext = React.createContext(false);

export default class Layoff extends Component {

    state = {
        part: [], // 所有零件信息
        main: [], // 所有主钢构信息
        proname: '', //项目名
        assemblies: [], // 二次装配
        isLoading: true,
        isPageTween: false, // 表格改变的回调
        visible: false,
        require: '', // 备注
    }


    componentDidMount(){
        // console.log(this.props.history.location.pathname)
        // console.log()
        // console.log(this.props.match.params.pid)
        this.getProjectInfo();
        this.getAllPart();
        this.getAllMain();
        setTimeout(() => this.getAllAssemblyByProId(), 1000);
    }

    // 所有零件信息
    getAllPart = async () => {
        let result = await reqPart({method: 'getAllPart'});
        if(result.status === 2){
            message.warning(result.msg, 1);
            return;
        }
        this.setState({part: result.data.part});
    }

    // 得到项目信息
    getProjectInfo = async () => {
        let result = await reqProject({method: 'getProject', pid: this.props.match.params.pid});
        this.setState({proname: result.data.project.name});
    }

    // 所有主钢构信息
    getAllMain = async () => {
        let result = await reqMain({method: 'getAllMain'});
        if(result.status === 2){
            message.warning(result.msg, 1);
            return;
        }
        this.setState({main: result.data.main});
    }

    // 根据项目编号获取二次装配信息
    getAllAssemblyByProId = async () => {
        let result = await reqAssembly({method: 'getAllAssemblyByProId', proid: this.props.match.params.pid});
        // console.log(result);
        if(result.status === 2){
            message.warning(result.msg, 1);
        }else{
            const {main, part} = this.state;
            // console.log(main)
            let assemblies = result.data.assemblies;
            // console.log(layoff)
            assemblies.map((item) => {
                let oneMain = main.find((it) => it.mid === item.mainid);
                // console.log(oneMain)
                if(oneMain){
                    item.mainname = oneMain.name;
                }
                let onePart = part.find((it) => it.pid === item.partid);
                if(onePart){
                    item.partname = onePart.name;
                }
                return item;
            });
            // console.log(main, part);
            this.setState({assemblies});
        }
        this.setState({isLoading: false});
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


    // 切换状态
    updateAssemblyState = async ({aid, complete}) => {
        // console.log(aid, complete);
        // return;
        let assemblies = [...this.state.assemblies];
        let con = complete === 1 ? 0 : 1;
        let result = await reqAssembly({method: 'updateAssemblyState', complete: con, aid});
        message.success(result.msg, 1);
        let index = assemblies.findIndex((item) => item.aid === aid);
        assemblies[index].complete = con;
        this.setState({assemblies});
    }

    // 切换打孔状态
    updateHoleState = async ({aid, shotcomp}) => {
        // console.log(aid, shotcomp);
        let assemblies = [...this.state.assemblies];
        let con = shotcomp === 1 ? 0 : 1;
        let result = await reqAssembly({method: 'updateHoleState', shotcomp: con, aid});
        message.success(result.msg, 1);
        let index = assemblies.findIndex((item) => item.aid === aid);
        assemblies[index].shotcomp = con;
        this.setState({assemblies});
    }

    // 删除下料
    removeAssembly = async (aid) => {
        // console.log(aid);
        let result = await reqAssembly({method: 'removeAssembly', aid});
        message.success(result.msg, 1);
        let assemblies = [...this.state.assemblies];
        assemblies = assemblies.filter(item => item.aid !== aid);
        this.setState({assemblies});
    }

    // 查看要求
    showRequire = (item) => {
        this.setState({visible: true, require: item.require});
    }

    render() {
        const {assemblies, isLoading, proname, visible, require} = this.state;
        const columns = [
            {
              title: '编号',
              dataIndex: 'aid',
              key: 'aid',
              align: 'center',
            },
            {
              title: '二次装配时间',
              dataIndex: 'secdate',
              key: 'secdate',
              align: 'center',
            },
            {
              title: '零件名称',
              dataIndex: 'partname',
              key: 'partname',
              align: 'center',
              ...this.getColumnSearchProps('零件名称', 'partname')
            },
            // {
            //     title: '零件数量',
            //     dataIndex: 'count',
            //     key: 'count',
            //     align: 'center',
            // },
            {
                title: '主钢构',
                dataIndex: 'mainname',
                key: 'mainname',
                align: 'center',
                ...this.getColumnSearchProps('主钢构', 'mainname')
            },
            {
                title: '完成情况',
                render: item => {
                    if(item.complete === 1){
                        return (
                            <div>
                                <Button type="primary" danger onClick={() => {this.updateAssemblyState(item)}}>切换为未完成</Button><br />
                                <span>已完成</span>
                            </div>
                        )
                    }else{
                        return (
                            <div>
                                <Button type="primary" onClick={() => {this.updateAssemblyState(item)}}>切换为已完成</Button><br />
                                <span>未完成</span>
                            </div>
                        )
                    }
                },
                align: 'center',
            },
            {
                title: '所属项目',
                render: () => (<span>{proname}</span>),
                align: 'center',
            },
            {
                title: '是否打孔',
                render: (item) => (
                    <Switch
                        checkedChildren={<CheckOutlined />}
                        unCheckedChildren={<CloseOutlined />}
                        checked={item.hole}
                    />
                ),
                align: 'center',
            },
            {
                title: '打孔时间',
                render: (item) => {
                    if(item.shotdate){
                        return (<span>{item.shotdate}</span>)
                    }else{
                        return (<span>无</span>)
                    }
                },
                align: 'center',
            },
            {
                title: '打孔完成情况',
                render: (item) => {
                    if(item.shotdate){
                        if(item.shotcomp === 1){
                            return (
                                <div>
                                    <Button type="primary" danger onClick={() => {this.updateHoleState(item)}}>切换为未完成</Button><br />
                                    <span>已完成</span>
                                </div>
                            )
                        }else{
                            return (
                                <div>
                                    <Button type="primary" onClick={() => {this.updateHoleState(item)}}>切换为已完成</Button><br />
                                    <span>未完成</span>
                                </div>
                            )
                        }
                    }else{
                        return (<span>无</span>)
                    }
                },
                align: 'center',
            },
            // {
            //     title: '重量',
            //     align: 'center',
            //     render: item => (<span>{item.weight + item.unit}</span>)
            // },
            {
                title: '操作',
                align: 'center',
                render: item => (
                    <div>
                        <Button style={{marginRight: '10px'}} type="primary" onClick={() => this.showRequire(item)}>要求</Button>
                        <Button style={{marginRight: '10px'}} type="primary" onClick={() => this.props.history.push(this.props.history.location.pathname + "/" + item.aid)}>修改</Button>
                        <Popconfirm
                          title={`确认删除?`}
                          onConfirm={() => this.removeAssembly(item.aid)}
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
            <QueueAnim
                animConfig={[
                    { opacity: [1, 0], translateX: [0, 50] },
                    { opacity: [1, 0], translateX: [0, -50] }
                ]}
                style={{height: '100%'}}
            >
                <div style={{height: "100%"}} key="projectkey">
                    <Card 
                        title={<Button type="link" size="large" icon={<LeftOutlined />} onClick={() => this.props.history.goBack()}>二次装配管理</Button>}
                        extra={<Button type="primary" icon={<PlusOutlined />} onClick={() => this.props.history.push(this.props.history.location.pathname + "/addassembly")}>添加二次装配</Button>}
                        style={{height: "100%"}}
                    >
                        <Spin tip="Loading..." spinning={isLoading}>
                            <Table
                                className="components-table-demo-nested"
                                columns={columns}
                                dataSource={assemblies}
                                pagination={{pageSize: PAGE_SIZE, hideOnSinglePage: true}}
                                components={{body: { wrapper: this.animTag}}}
                                onChange={this.pageChange}
                                rowKey="aid"
                            />
                        </Spin>
                    </Card>
                    <Modal
                        title="查看备注"
                        visible={visible}
                        onOk={() => this.setState({visible: false})}
                        onCancel={() => this.setState({visible: false})}
                    >
                        <span>{require ? <span dangerouslySetInnerHTML={{__html: require}}></span> : <LoadingOutlined/>}</span>
                    </Modal>
                </div>
            </QueueAnim>
        )
    }
}

