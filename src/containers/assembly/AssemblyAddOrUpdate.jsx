import React, { Component } from 'react';
import QueueAnim from 'rc-queue-anim';
import moment from 'moment';
import {Button, Card, Form, Input, Select, DatePicker, Radio, Tag, message} from 'antd';
import {LeftOutlined, CheckCircleOutlined, CloseCircleOutlined} from '@ant-design/icons';
import {reqPart, reqMain, reqProject, reqAssembly} from '../../api';
import Editor from '../editor/Editor';

const {Option} = Select;

export default class LayoffAddOrUpdate extends Component {
    state = {
        type: '',
        secdate: '',// 下料日期
        shotdate: '', //打孔日期
        // unit: 'g',
        part: [], // 所有零件信息
        main: [], // 所有主钢构信息
        project: [], // 所有项目信息
        isShowRadio: true,
    }

    componentDidMount(){
        // console.log(this.props.match.params.aid)
        if(this.props.match.params.aid){
            this.setState({type: 'update'});
            this.getAssembly(this.props.match.params.aid);
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

    // 获取二次装配信息
    getAssembly = async (aaid) => {
        let result = await reqAssembly({method: 'getAssembly', aid: aaid});
        let assembly = result.data.assembly;
        const {aid, complete, hole, mainid, partid, require, secdate} = assembly;
        if(hole === 1){
            const {shotcomp, shotdate} = assembly;
            this.assForm.setFieldsValue({aid, complete, hole, mainid, partid, secdate: moment(secdate, 'YYYY-MM-DD HH:mm:ss'), shotcomp, shotdate: moment(shotdate, 'YYYY-MM-DD HH:mm:ss')});
            this.setState({secdate, shotdate, isShowRadio: false});
        }else{
            this.assForm.setFieldsValue({aid, complete, hole, mainid, partid, secdate: moment(secdate, 'YYYY-MM-DD HH:mm:ss')});
            this.setState({secdate});
        }
        this.editor.current.setText(require);
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
        // console.log(values)
        const {secdate, type, shotdate} = this.state;
        // console.log(secdate)
        // console.log(shotdate)
        values.require = this.editor.current.getText();
        values.secdate = secdate;
        values.shotdate = shotdate;
        if(type === 'add'){
            values.method = 'insertAssembly';
        }else{
            values.method = 'updateAssembly';
            values.oldAid = this.props.match.params.aid;
        }
        let result = await reqAssembly(values);
        message.success(result.msg, 1);
        this.props.history.replace(`/admin/project/assembly/${this.props.match.params.pid}`)
    }
    // 选择下料时间的回调
    onChange = (type, time) => {
        this.setState({[type]: time});
    }

    // saveUnit = (unit) => {
    //     this.setState({unit});
    // }

    isSelect = (e) => {
        // console.log(e.target.value)
        this.setState({isShowRadio: e.target.value !== 1});
    }

    render() {
        const {type, part, main, project, isShowRadio} = this.state;
        // const selectAfter = (
        //     <Select defaultValue="g" className="select-after" onSelect={this.saveUnit} value={unit}>
        //         <Option value="g">g / 克</Option>
        //         <Option value="kg">kg / 千克</Option>
        //     </Select>
        // );
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
                        title={<Button type="link" size="large" icon={<LeftOutlined />} onClick={() => this.props.history.goBack()}>{type === 'add' ? '添加二次装配' : '修改二次装配'}</Button>}
                        style={{height: "100%"}}
                    >
                        <Form 
                            labelCol={{xl: 2, md: 5, sm: 8, xs: 12}}
                            wrapperCol={{xl: 8, md: 12, sm: 16, xs: 20}}
                            onFinish={this.formFinish}
                            ref={(assForm) => this.assForm = assForm}
                        >
                            <Form.Item
                                name="aid"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入11位二次装配编号!',
                                    },
                                    {
                                        len: 11,
                                        message: '请输入11位二次装配编号!'
                                    }
                                ]}
                                label="二次装配编号"
                            >
                                <Input placeholder="二次装配编号"/>
                            </Form.Item>
                            <Form.Item
                                name="secdate"
                                rules={[
                                    {
                                        required: true,
                                        message: '请选择二次装配日期!',
                                    }
                                ]}
                                label="二次装配日期"
                            >
                                <DatePicker showTime onChange={(mement, time) => this.onChange('secdate', time)} />
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
                            {/* <Form.Item
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
                            </Form.Item> */}
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
                                name="hole"
                                rules={[
                                    {
                                        required: true,
                                        message: '请选择是否打孔!',
                                    },
                                ]}
                                label="是否打孔"
                                initialValue={0}
                            >
                                <Radio.Group name="hole" onChange={this.isSelect}>
                                    <Radio value={0}><Tag icon={<CloseCircleOutlined />} color="error">否</Tag></Radio>
                                    <Radio value={1}><Tag icon={<CheckCircleOutlined />} color="success">是</Tag></Radio>
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item
                                name="shotdate"
                                label="打孔日期"
                            >
                                <DatePicker showTime onChange={(mement, time) => this.onChange('shotdate', time)} disabled={isShowRadio}/>
                            </Form.Item>
                            <Form.Item
                                name="shotcomp"
                                label="是否打孔完成"
                                initialValue={0}
                            >
                                <Radio.Group name="shotcomp" disabled={isShowRadio}>
                                    <Radio value={0}><Tag icon={<CloseCircleOutlined />} color="error">未完成</Tag></Radio>
                                    <Radio value={1}><Tag icon={<CheckCircleOutlined />} color="success">已完成</Tag></Radio>
                                </Radio.Group>
                            </Form.Item>
                            {/* <Form.Item
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
                            </Form.Item> */}
                            <Form.Item
                                label="二次装配要求"
                                name="require"
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
