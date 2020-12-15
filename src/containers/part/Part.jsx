import React, {Component} from 'react'
import {List, Card, Descriptions, Image, Button, Skeleton, PageHeader, Select, Input, Spin, message, Popconfirm, Modal, Form} from 'antd';
import QueueAnim from 'rc-queue-anim';
import {PlusOutlined, SearchOutlined, SyncOutlined} from '@ant-design/icons';
import {reqPart} from '../../api';
import {COUNT} from '../../config';
import Photo from '../photo/Photo';

const {Option} = Select;

export default class Part extends Component {
    state = {
        totalCount: 0,
        currentPage: 0,
        part: [],
        loading: false,
        searchType: '1',
        searchKeyWord: '',
        type: 'show',
        isLoading: true,
        visible: false,
        modelType: 'add',
        unit: 'g', // 单位 kg / g
        oldPid: '',
    }

    photoRef = React.createRef();

    componentDidMount(){
        const {currentPage} = this.state;
        this.getPageInfo(currentPage);
    }

    getPageInfo = async (currentPage) => {
        let part = [...this.state.part];
        if(currentPage !== 0){
            part.splice(currentPage * COUNT, COUNT);
        }
        const {type, searchType, searchKeyWord} = this.state;
        let result;
        if(type === 'show'){
            result = await reqPart({method: 'getPartByPage', page: currentPage + 1});
            if(result.status === 2){
                message.warning(result.msg);
                this.setState({isLoading: false, totalCount: 0, part: []});
                return;
            }
        }else{
            result = await reqPart({method: 'getPartBySearch', page: currentPage + 1, searchType, searchKeyWord});
            if(result.status === 2){
                message.warning(result.msg);
                this.setState({isLoading: false, totalCount: 0, part: []});
                return;
            }
        }
        const {totalCount, list, current} = result.data.part;
        list.map(item => {item.loading = false; return item});
        part.push(...list);
        this.setState({totalCount, part, currentPage: current, loading: false, isLoading: false}, () => window.dispatchEvent(new Event('resize')));
    }

    onLoadMore = () => {
        const {currentPage} = this.state;
        let part = [...this.state.part];
        part = part.concat([...new Array(COUNT)].map(() => ({loading: true, img: 'null'})));
        // console.log(part)
        this.setState({loading: true, part});
        setTimeout(() => this.getPageInfo(currentPage), 1000);
    }

    deletePart = async (pid) => {
        let result = await reqPart({method: 'removePart', pid});
        message.success(result.msg);
        this.setState({part: [], isLoading: true});
        setTimeout(() => this.getPageInfo(0));
    }

    searchParts = () => {
        this.setState({type: 'search', part: [], isLoading: true});
        setTimeout(() => this.getPageInfo(0));
    }

    reset = () => {
        this.setState({part: [], currentPage: 0, type: 'show', isLoading: true});
        setTimeout(() => this.getPageInfo(0));
    }

    showModal = (modelType, item) => {
        this.setState({visible: true, modelType});
        if(modelType === 'update'){
            if(this.partForm){
                this.partForm.setFieldsValue({pid: item.pid, name: item.name, material: item.material, specifi: item.specifi, texture: item.texture, weight: item.weight});
                this.setState({unit: item.unit, oldPid: item.pid});
            }
            if(this.photoRef.current){
                // console.log(item.img)
                this.photoRef.current.setFileList(JSON.parse(item.img));
            }
        }
    };
    
    hideModal = () => {
        this.setState({visible: false,});
        this.partForm.resetFields();
        this.photoRef.current.setFileList([]);
    };
    // 添加或修改
    addOrUpdatePart = () => {
        this.partForm.validateFields().then(async (value) => {
            const {unit, modelType, oldPid} = this.state;
            value.unit = unit;
            value.img = this.photoRef.current.getPhotoList();
            if(modelType === 'update'){
                value.method = 'updatePart',
                value.oldPid = oldPid;
            }else{
                value.method = 'insertPart';
            }
            let result = await reqPart(value);
            message.success(result.msg);
            this.reset();
            this.setState({visible: false,})
        });
    }


    saveUnit = (value) => {
        this.setState({unit: value});
    }
    
    render() {
        const {totalCount, part, loading, isLoading, modelType, unit} = this.state;

        const selectAfter = (
            <Select defaultValue="g" className="select-after" onSelect={this.saveUnit} value={unit}>
                <Option value="g">g / 克</Option>
                <Option value="kg">kg / 千克</Option>
            </Select>
        );
        
        return (
            <QueueAnim
                animConfig={[
                    { opacity: [1, 0], translateX: [0, 50] },
                    { opacity: [1, 0], translateX: [0, -50] }
                ]}
                style={{height: '100%'}}
            >
                <div style={{height: '100%'}} key="partList">
                    <Spin tip="Loading..." spinning={isLoading}>
                        <List
                            grid={{
                                gutter: 1,
                                xs: 1,
                                sm: 1,
                                md: 1,
                                lg: 1,
                                xl: 1,
                                xxl: 1,
                            }}
                            dataSource={part}
                            loadMore={
                                !loading ? (
                                <div
                                    style={{
                                        textAlign: 'center',
                                        marginTop: 12,
                                        height: 32,
                                        lineHeight: '32px',
                                        display: totalCount === part.length ? 'none' : 'block'
                                    }}
                                    >
                                    <Button onClick={this.onLoadMore}>查看更多</Button>
                                </div>
                            ) : null}
                            header={
                                <PageHeader
                                    ghost={false}
                                    onBack={() => window.history.back()}
                                    title="零件管理"
                                    extra={<Button type="primary" onClick={this.showModal} icon={<PlusOutlined />} style={{margin: '0 50px'}} onClick={() => this.showModal('add')}>添加零件</Button>}
                                >
                                    <Select defaultValue="1" style={{width: 200, marginRight: 20, height: '40px'}} allowClear size="large" placeholder="选择一个条件" onChange={(searchType) => this.setState({searchType})}>
                                        <Option value="1">按名称搜索</Option>
                                        <Option value="2">按材料搜索</Option>
                                    </Select>
                                    <Input size="large" placeholder="请输入关键字，支持模糊查询" style={{width: 400, marginRight: 20}} onChange={({target}) => this.setState({searchKeyWord: target.value})}/>
                                    
                                    <Button icon={<SearchOutlined />} size="large" style={{width: '93px', marginRight: 20, backgroundColor: '#409EFF', color: 'white'}} type="text" onClick={this.searchParts}>搜索</Button>
                                    <Button icon={<SyncOutlined />} size="large" style={{width: '93px', backgroundColor: '#67C23A', color: 'white'}} type="text" onClick={this.reset}>重置</Button>
                                </PageHeader>
                            }
                            renderItem={item => (
                                <List.Item>
                                    <Card title={item.name}>
                                        <Skeleton title={false} loading={item.loading} active>
                                            <Descriptions bordered>
                                                <Descriptions.Item label="零件编号">{item.pid}</Descriptions.Item>
                                                <Descriptions.Item label="零件名字" span={2}>{item.name}</Descriptions.Item>
                                                <Descriptions.Item label="零件材料">{item.material}</Descriptions.Item>
                                                <Descriptions.Item label="零件规格" span={2}>{item.specifi}</Descriptions.Item>
                                                <Descriptions.Item label="零件材质">{item.texture}</Descriptions.Item>
                                                <Descriptions.Item label="零件重量" span={2}>{item.weight + item.unit}</Descriptions.Item>
                                                <Descriptions.Item label="零件图片" span={3}>
                                                    {
                                                        item.img !== 'null' ? 
                                                            JSON.parse(item.img).map((photo) => (
                                                                <Image
                                                                    key={photo.uid}
                                                                    width={200}
                                                                    src={photo.url}
                                                                />
                                                            )) : null
                                                    }
                                                </Descriptions.Item>
                                                <Descriptions.Item label="操作">
                                                    <Popconfirm
                                                        title={`确认删除${item.name}?`}
                                                        onConfirm={() => this.deletePart(item.pid)}
                                                        okText="确认"
                                                        cancelText="取消"
                                                    >
                                                        <Button style={{float: 'right'}} danger>删除</Button>
                                                    </Popconfirm>
                                                    <Button style={{float: 'right', marginRight: '10px'}} onClick={() => this.showModal('update', item)}>修改</Button>
                                                </Descriptions.Item>
                                            </Descriptions>
                                        </Skeleton>
                                    </Card>
                                </List.Item>
                            )}
                        />
                    </Spin>
                    <Modal
                        title={modelType === 'add' ? "添加零件" : "修改零件"}
                        visible={this.state.visible}
                        onOk={this.addOrUpdatePart}
                        onCancel={this.hideModal}
                        okText="确认"
                        cancelText="取消"
                    >
                        <Form ref={(partForm) => this.partForm = partForm} labelCol={{span: 3}} wrapperCol={{span: 21}}>
                            <Form.Item
                                name="pid"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入11位零件编号!',
                                    },
                                    {
                                        len: 11,
                                        message: '请输入11位零件编号!'
                                    }
                                ]}
                                label="编号"
                            >
                                <Input placeholder="零件编号"/>
                            </Form.Item>
                            <Form.Item
                                name="name"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入零件名!',
                                    },
                                    {
                                        max: 28,
                                        message: '零件名必须小于48个字符!'
                                    }
                                ]}
                                label="名字"
                            >
                                <Input placeholder="零件名字"/>
                            </Form.Item>
                            <Form.Item
                                name="material"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入零件材料!',
                                    },
                                    {
                                        max: 28,
                                        message: '零件材料必须小于48个字符!'
                                    }
                                ]}
                                label="材料"
                            >
                                <Input placeholder="零件材料"/>
                            </Form.Item>
                            <Form.Item
                                name="specifi"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入零件规格!',
                                    },
                                    {
                                        max: 28,
                                        message: '零件规格必须小于48个字符!'
                                    }
                                ]}
                                label="规格"
                            >
                                <Input placeholder="零件规格"/>
                            </Form.Item>
                            <Form.Item
                                name="texture"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入零件材质!',
                                    },
                                    {
                                        max: 28,
                                        message: '零件材质必须小于48个字符!'
                                    }
                                ]}
                                label="材质"
                            >
                                <Input placeholder="零件材质"/>
                            </Form.Item>
                            <Form.Item
                                name="weight"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入零件重量!',
                                    },
                                    {
                                        pattern: /^[0-9]*$/,
                                        message: '请输入数字!'
                                    }
                                ]}
                                label="重量"
                            >
                                <Input placeholder="零件重量" addonAfter={selectAfter}/>
                            </Form.Item>
                            <Form.Item
                                label="图片"
                            >
                                <Photo ref={this.photoRef}></Photo>
                            </Form.Item>
                        </Form>
                    </Modal>
                </div>
            </QueueAnim>
        )
    }
}
