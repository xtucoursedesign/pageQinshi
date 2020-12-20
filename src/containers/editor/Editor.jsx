import React, {Component} from 'react';
import {EditorState, convertToRaw, ContentState} from 'draft-js';
import {Editor} from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';


export default class TextEditor extends Component {
  state = {
    editorState: EditorState.createEmpty(), //构建一个初始化状态的编辑器+内容
  }

  onEditorStateChange = (editorState) => {
    //   维护到状态
    this.setState({
      editorState,
    });
  };
  // 设置文本
  setText = (html)=>{
    const contentBlock = htmlToDraft(html);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      const editorState = EditorState.createWithContent(contentState);
      this.setState({
        editorState,
      });
    }
  }

  getText = () => {
    const {editorState} = this.state;
    // 返回文本
    return draftToHtml(convertToRaw(editorState.getCurrentContent()))
  }

  render() {
    const {editorState} = this.state;
    return (
      <div>
        <Editor
          editorState={editorState}
          //wrapperClassName="demo-wrapper" //最外侧容器的样式
          //editorClassName="demo-editor"//编辑区域的样式
          editorStyle={{
            border:' 1px solid black',
            paddingLeft:'10px',
            lineHeight: '20px',
            minHeight: '190px'
          }}
            //   文本框改变回调
          onEditorStateChange={this.onEditorStateChange}
        />
      </div>
    );
  }
}
