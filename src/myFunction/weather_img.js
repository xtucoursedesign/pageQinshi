// 多云 晴 小雨 中雨 大雨 阴 雷阵雨 阵雨
let urls = [
    'http://api.map.baidu.com/images/weather/day/duoyun.png', 
    'http://api.map.baidu.com/images/weather/day/qing.png', 
    'http://api.map.baidu.com/images/weather/day/xiaoyu.png',
    'http://api.map.baidu.com/images/weather/day/zhongyu.png',
    'http://api.map.baidu.com/images/weather/day/dayu.png',
    'http://api.map.baidu.com/images/weather/day/yin.png',
    'http://api.map.baidu.com/images/weather/day/leizhenyu.png',
    'http://api.map.baidu.com/images/weather/day/zhenyu.png',
    'http://api.map.baidu.com/images/weather/day/xiaoxue.png',
    'http://api.map.baidu.com/images/weather/day/zhongxue.png',
    'http://api.map.baidu.com/images/weather/day/daxue.png',
    'http://api.map.baidu.com/images/weather/day/baoyu.png',
    'http://api.map.baidu.com/images/weather/day/dabaoyu.png',
    'http://api.map.baidu.com/images/weather/day/mai.png',
    'http://api.map.baidu.com/images/weather/day/wu.png'
];


export function imgUrl(type){
    switch (type) {
        case '多云':
            return urls[0];
        case '晴':
            return urls[1];
        case '小雨':
            return urls[2];
        case '中雨':
            return urls[3];
        case '大雨':
            return urls[4];
        case '阴':
            return urls[5];    
        case '雷阵雨':
            return urls[6]; 
        case '阵雨':
            return urls[7];
        case '小雪':
            return urls[8];
        case '中雪':
            return urls[9];
        case '大雪':
            return urls[10];
        case '暴雨':
            return urls[11];
        case '大暴雨':
            return urls[12];
        case '霾':
            return urls[13];
        case '雾':
            return urls[14];
        default:
            return urls[1];
    }
}