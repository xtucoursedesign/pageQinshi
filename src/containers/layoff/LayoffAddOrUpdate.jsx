import React, { Component } from 'react';
import QueueAnim from 'rc-queue-anim';
import moment from 'moment';
import {Button, Card, Form, Input, Select, DatePicker, Radio, Tag, message} from 'antd';
import {LeftOutlined, CheckCircleOutlined, CloseCircleOutlined} from '@ant-design/icons';
import {reqPart, reqMain, reqProject, reqLayoff} from '../../api';
import Editor from '../editor/Editor';

const {Option} = Select;

export default class LayoffAddOrUpdate extends Component {
    state = {
        type: '',
        baitdate: '',// 下料日期
        unit: 'g',
        part: [], // 所有零件信息
        main: [], // 所有主钢构信息
        project: [], // 所有项目信息
    }

    componentDidMount(){
        // console.log(this.props.match.params.pid)
        if(this.props.match.params.lid){
            this.setState({type: 'update'});
            this.getLayoff(this.props.match.params.lid);
        }else{
            this.setState({type: 'add'});
        }
        this.getAllPart();
        this.getAllMain();
        this.getAllProject();
    }

    editor = React.createRef();

    // 所有零件信息
    getAllPart = async () => {
        let result = await reqPart({method: 'getAllPart'});
        if(result.status === 2){
            message.warning(result.msg, 1);
            return;
        }
        this.setState({part: result.data.part});
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

    // 获取下料信息
    getLayoff = async (llid) => {
        let result = await reqLayoff({method: 'getLayoff', lid: llid});
        let layoff = result.data.layoff;
        const {lid, baitdate, complete, count, mainid, note, partid, proid, unit, weight} = layoff;
        this.layForm.setFieldsValue({lid, baitdate: moment(baitdate, 'YYYY-MM-DD HH:mm:ss'), complete, count, mainid, partid, proid, weight});
        this.setState({unit, baitdate});
        this.editor.current.setText(note);

    }

    // 所有项目信息
    getAllProject = async () => {
        let result = await reqProject({method: 'getAllProject'});
        if(result.status === 2){
            message.warning(result.msg, 1);
            return;
        }
        this.setState({project: result.data.project});
    }
    // 表单完成的回调
    formFinish = async (values) => {
        const {unit, baitdate, type} = this.state;
        values.note = this.editor.current.getText();
        values.unit = unit;
        values.baitdate = baitdate;
        if(type === 'add'){
            values.method = 'insertLayoff';
        }else{
            values.method = 'updateLayoff';
            values.oldLid = this.props.match.params.lid;
        }
        let result = await reqLayoff(values);
        message.success(result.msg, 1);
        this.props.history.replace(`/admin/project/layoff/${this.props.match.params.pid}`)
    }
    // 选择下料时间的回调
    onChange = (baitdate) => {
        this.setState({baitdate});
    }

    saveUnit = (unit) => {
        this.setState({unit});
    }

    render() {
        const {type, unit, part, main, project} = this.state;
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
                <div style={{height: "100%"}} key="projectkey">
                    <Card 
                        title={<Button type="link" size="large" icon={<LeftOutlined />} onClick={() => this.props.history.goBack()}>{type === 'add' ? '添加下料' : '修改下料'}</Button>}
                        style={{height: "100%"}}
                    >
                        <Form 
                            labelCol={{xl: 2, md: 5, sm: 8, xs: 12}}
                            wrapperCol={{xl: 8, md: 12, sm: 16, xs: 20}}
                            onFinish={this.formFinish}
                            ref={(layForm) => this.layForm = layForm}
                        >
                            <Form.Item
                                name="lid"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入11位下料编号!',
                                    },
                                    {
                                        len: 11,
                                        message: '请输入11位下料编号!'
                                    }
                                ]}
                                label="下料编号"
                            >
                                <Input placeholder="下料编号"/>
                            </Form.Item>
                            <Form.Item
                                name="baitdate"
                                rules={[
                                    {
                                        required: true,
                                        message: '请选择下料日期!',
                                    }
                                ]}
                                label="下料日期"
                            >
                                <DatePicker showTime onChange={(mement, time) => this.onChange(time)} />
                            </Form.Item>
                            <Form.Item
                                name="partid"
                                rules={[
                                    {
                                        required: true,
                                        message: '请选择零件!',
                                    },
                                ]}
                                label="零件"
                            >
                                <Select placeholder="请选择一个零件">
                                    {
                                        part.map((item) => (<Option value={item.pid} key={item.pid}>{item.name}</Option>))
                                    }
                                </Select>
                            </Form.Item>
                            <Form.Item
                                name="count"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入零件数量!',
                                    },
                                    {
                                        pattern: /^[0-9]*$/,
                                        message: '请输入数字!'
                                    }
                                ]}
                                label="零件数量"
                            >
                                <Input placeholder="零件数量"/>
                            </Form.Item>
                            <Form.Item
                                name="mainid"
                                rules={[
                                    {
                                        required: true,
                                        message: '请选择主钢构!',
                                    }
                                ]}
                                label="主钢构"
                            >
                                <Select placeholder="请选择一个主钢构">
                                    {
                                        main.map((item) => (<Option value={item.mid} key={item.mid}>{item.name}</Option>))
                                    }
                                </Select>
                            </Form.Item>
                            <Form.Item
                                name="complete"
                                rules={[
                                    {
                                        required: true,
                                        message: '请选择是否完成!',
                                    },
                                ]}
                                label="完成情况"
                                initialValue={0}
                            >
                                <Radio.Group name="complete">
                                    <Radio value={0}><Tag icon={<CloseCircleOutlined />} color="error">未完成</Tag></Radio>
                                    <Radio value={1}><Tag icon={<CheckCircleOutlined />} color="success">已完成</Tag></Radio>
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item
                                name="proid"
                                rules={[
                                    {
                                        required: true,
                                        message: '请选择所属项目!',
                                    },
                                ]}
                                label="所属项目"
                                initialValue={this.props.match.params.pid}
                            >
                                <Select placeholder="请选择一个所属项目">
                                    {
                                        project.map((item) => (<Option value={item.pid} key={item.pid}>{item.name}</Option>))
                                    }
                                </Select>
                            </Form.Item>
                            <Form.Item
                                name="weight"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入重量!',
                                    },
                                    {
                                        pattern: /^[0-9]*$/,
                                        message: '请输入数字!'
                                    }
                                ]}
                                label="重量"
                            >
                                <Input placeholder="重量" addonAfter={selectAfter}/>
                            </Form.Item>
                            <Form.Item
                                label="备注"
                                name="note"
                                wrapperCol={{xl: 17, md: 12, sm: 8, xs: 4}}
                            >
                                <Editor ref={this.editor}></Editor>
                            </Form.Item>
                            <Form.Item 
                                label= {<Button type="primary" htmlType="submit" size="large">提交</Button>}
                                colon={false}
                            >
                            </Form.Item>
                        </Form>
                    </Card>
                </div>
            </QueueAnim>
        )
    }
}
