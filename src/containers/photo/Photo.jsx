import React, { Component } from 'react';
import { Upload, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import {BASE_URL} from '../../config';
import {PROXY} from '../../config';

function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
}

export default class Photo extends Component {
    state = {
        // 预览modal
        previewVisible: false,
        // 预览图片地址
        previewImage: '',
        // 预览
        previewTitle: '',
        fileList: [],
    };

    setFileList = (fileList) => {
        this.setState({fileList});
    }

    getPhotoList = () => {
      let fileList = [...this.state.fileList];
      return JSON.stringify(fileList);
    }

    handleCancel = () => this.setState({ previewVisible: false });

    handlePreview = async file => {
      if (!file.url && !file.preview) {
          file.preview = await getBase64(file.originFileObj);
      }

      this.setState({
          previewImage: file.url || file.preview,
          previewVisible: true,
          previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
      });
    };

    handleChange = ({file}) => {
      
      if(file.status === 'done'){
        message.success("上传成功!", 1);
        if(file.response.status === 0){
          let {img} = file.response.data;
          let fileList = [...this.state.fileList];
          img.url = PROXY + img.url;
          fileList.push(img);
          this.setState({fileList});
        }
      }else if(file.status === 'error'){
        message.error("上传失败!", 1);
      }if(file.status === 'removed'){
        let fileList = [...this.state.fileList];
        fileList = fileList.filter((item) => item.uid !== file.uid);
        this.setState({fileList});
      }

    };
    render() {
        const { previewVisible, previewImage, fileList, previewTitle } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
        return (
            <div>
              <Upload
                action={`${BASE_URL}/FileUploadServlet?method=upload`}
                method="POST" // 请求方式
                listType="picture-card"
                fileList={fileList}
                onPreview={this.handlePreview}
                onChange={this.handleChange}
              >
                {fileList.length >= 3 ? null : uploadButton}
              </Upload>
              <Modal
                visible={previewVisible}
                title={previewTitle}
                footer={null}
                onCancel={this.handleCancel}
              >
                <img alt="example" style={{width: '100%'}} src={previewImage} />
              </Modal>
            </div>
        )
    }
}
