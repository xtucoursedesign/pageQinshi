import React, { Component } from 'react';
import { Calendar, Badge } from 'antd';
import QueueAnim from 'rc-queue-anim';

function getListData(value) {
    let listData;
    switch (value.date()) {
      case 8:
        listData = [
          { type: 'warning', content: 'home.jsx', key: "key1" },
          { type: 'success', content: 'home.jsx', key: "key2" }
        ];
        break;
      case 10:
        listData = [
          { type: 'warning', content: 'home.jsx', key: "key3" },
          { type: 'success', content: 'home.jsx', key: "key4" },
          { type: 'error', content: 'home.jsx', key: "key5" }
        ];
        break;
      case 15:
        listData = [
          { type: 'warning', content: 'home.jsx', key: "key6" },
          { type: 'success', content: 'home.jsx', key: "key7" }
        ];
        break;
    }
    return listData || [];
}
  
function dateCellRender(value) {
    // console.log(value);
    const listData = getListData(value);
    return (
    <ul className="events">
        {
            listData.map(item => (
            <li key={item.key}>
                <Badge status={item.type} text={item.content} />
            </li>
            ))
        }
    </ul>
);
}
  
  function getMonthData(value) {
    if (value.month() === 8) {
      return 1394;
    }
  }
  
  function monthCellRender(value) {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  }


export default class Home extends Component {

    
    render() {
        return (
          <QueueAnim
            animConfig={[
              { opacity: [1, 0], translateX: [0, 50] },
              { opacity: [1, 0], translateX: [0, -50] }
            ]}
            style={{height: '100%'}}
          >
            <div style={{height: '100%'}} key="calendar">
              <Calendar dateCellRender={dateCellRender} monthCellRender={monthCellRender} style={{padding: '12px', height: "100%", borderRadius: '8px'}}/>
            </div>
          </QueueAnim>
        )
    }
}
