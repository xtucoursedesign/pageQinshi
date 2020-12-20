import React, { Component } from 'react';
import {Table, Space, Button, Card, Spin, Input, message, Popconfirm, Modal} from 'antd';
import {PlusOutlined, SearchOutlined, LeftOutlined, LoadingOutlined} from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import QueueAnim from 'rc-queue-anim';
import PropTypes from 'prop-types';
import {TweenOneGroup} from 'rc-tween-one';
import {reqPart, reqMain, reqLayoff, reqProject} from '../../api';
import {PAGE_SIZE} from '../../config';

const TableContext = React.createContext(false);

export default class Layoff extends Component {

    state = {
        part: [], // 所有零件信息
        main: [], // 所有主钢构信息
        proname: '', //项目名
        layoff: [],
        isLoading: true,
        isPageTween: false, // 表格改变的回调
        visible: false,
        note: '', // 备注
    }


    componentDidMount(){
        // console.log(this.props.history.location.pathname)
        // console.log()
        // console.log(this.props.match.params.pid)
        this.getProjectInfo();
        this.getAllPart();
        this.getAllMain();
        setTimeout(() => this.getAllLayoffByProId(), 1000);
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

    // 根据项目编号获取下料信息
    getAllLayoffByProId = async () => {
        let result = await reqLayoff({method: 'getAllLayoffByProId', proId: this.props.match.params.pid});
        if(result.status === 2){
            message.warning(result.msg, 1);
        }else{
            const {main, part} = this.state;
            let layoff = result.data.layoff;
            // console.log(layoff)
            layoff.map((item) => {
                let oneMain = main.find((it) => it.mid === item.mainid);
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
            this.setState({layoff});
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
    updateLayoffState = async ({lid, complete}) => {
        let layoff = [...this.state.layoff];
        let con = complete === 1 ? 0 : 1;
        let result = await reqLayoff({method: 'updateLayoffState', complete: con, lid});
        message.success(result.msg, 1);
        let index = layoff.findIndex((item) => item.lid === lid);
        layoff[index].complete = con;
        this.setState({layoff});
    }

    // 删除下料
    removeLayoff = async (lid) => {
        let result = await reqLayoff({method: 'removeLayoff', lid});
        message.success(result.msg, 1);
        let layoff = [...this.state.layoff];
        layoff = layoff.filter(item => item.lid !== lid);
        this.setState({layoff});
    }

    // 查看备注
    showNode = (item) => {
        this.setState({visible: true, node: item.note});
    }

    render() {
        const {layoff, isLoading, proname, visible, node} = this.state;
        const columns = [
            {
              title: '编号',
              dataIndex: 'lid',
              key: 'lid',
              align: 'center',
            },
            {
              title: '下料时间',
              dataIndex: 'baitdate',
              key: 'baitdate',
              align: 'center',
            },
            {
              title: '零件名称',
              dataIndex: 'partname',
              key: 'partname',
              align: 'center',
              ...this.getColumnSearchProps('零件名称', 'partname')
            },
            {
                title: '零件数量',
                dataIndex: 'count',
                key: 'count',
                align: 'center',
            },
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
                                <Button type="primary" danger onClick={() => {this.updateLayoffState(item)}}>切换为未完成</Button><br />
                                <span>已完成</span>
                            </div>
                        )
                    }else{
                        return (
                            <div>
                                <Button type="primary" onClick={() => {this.updateLayoffState(item)}}>切换为已完成</Button><br />
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
                title: '重量',
                align: 'center',
                render: item => (<span>{item.weight + item.unit}</span>)
            },
            {
                title: '操作',
                align: 'center',
                render: item => (
                    <div>
                        <Button style={{marginRight: '10px'}} type="primary" onClick={() => this.showNode(item)}>备注</Button>
                        <Button style={{marginRight: '10px'}} type="primary" onClick={() => this.props.history.push(this.props.history.location.pathname + "/" + item.lid)}>修改</Button>
                        <Popconfirm
                          title={`确认删除?`}
                          onConfirm={() => this.removeLayoff(item.lid)}
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
                        title={<Button type="link" size="large" icon={<LeftOutlined />} onClick={() => this.props.history.goBack()}>下料管理</Button>}
                        extra={<Button type="primary" icon={<PlusOutlined />} onClick={() => this.props.history.push(this.props.history.location.pathname + "/addlayoff")}>添加下料</Button>}
                        style={{height: "100%"}}
                    >
                        <Spin tip="Loading..." spinning={isLoading}>
                            <Table
                                className="components-table-demo-nested"
                                columns={columns}
                                dataSource={layoff}
                                pagination={{pageSize: PAGE_SIZE, hideOnSinglePage: true}}
                                components={{body: { wrapper: this.animTag}}}
                                onChange={this.pageChange}
                                rowKey="lid"
                            />
                        </Spin>
                    </Card>
                    <Modal
                        title="查看备注"
                        visible={visible}
                        onOk={() => this.setState({visible: false})}
                        onCancel={() => this.setState({visible: false})}
                    >
                        <span>{node ? <span dangerouslySetInnerHTML={{__html: node}}></span> : <LoadingOutlined/>}</span>
                    </Modal>
                </div>
            </QueueAnim>
        )
    }
}
