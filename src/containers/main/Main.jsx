import React, { Component } from 'react';
import QueueAnim from 'rc-queue-anim';
import {Button, Popconfirm, Breadcrumb} from 'antd';
import BreadcrumbItem from 'antd/lib/breadcrumb/BreadcrumbItem';

export default class Main extends Component {
    state = {
        show: true,
      };
      onClick = () => {
          console.log(1);
        this.setState({
          show: !this.state.show,
        });
      }
    render() {
        return (
            <div>
                <div className="queue-demo">
        <p className="buttons">
          <Button type="primary" onClick={this.onClick}>Switch</Button>
        </p>
        <QueueAnim className="demo-content"
          animConfig={[
            { opacity: [1, 0], translateX: [0, 50] },
            { opacity: [1, 0], translateX: [0, -50] }
          ]}>
          {this.state.show ? [
            <div className="demo-thead" key="a">
              <ul>
                <li />
                <li />
                <li />
              </ul>
            </div>,
            <div className="demo-tbody" key="b">
              <ul>
                <li>343</li>
                <li>3432</li>
                <li>4342</li>
              </ul>
            </div>
          ] : null}
        </QueueAnim>
      </div>
            </div>
        )
    }
}
