import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import App from './App';
import store from './redux/store.js';
import 'moment/locale/zh-cn';

ReactDOM.render(
  <Provider store={store}>
      <BrowserRouter>
        <ConfigProvider locale={zhCN}>
            <App/>
        </ConfigProvider>
      </BrowserRouter>
  </Provider>
  , document.getElementById('root'));
