import {
    ProjectOutlined,
    HomeOutlined,
    IdcardOutlined,
    AreaChartOutlined,
    PieChartOutlined,
    BarChartOutlined,
    ShopOutlined,
    GroupOutlined,
    SettingOutlined
} from '@ant-design/icons';

let menu = [
    {
        title: '首页',
        key: "0",
        path: '/admin/home',
        icon: <HomeOutlined />
    },
    {
        title: '工厂管理',
        key: "1",
        path: '/admin/factory',
        icon: <ShopOutlined />
    },
    {
        title: '项目管理',
        key: "2",
        path: '/admin/project',
        icon: <ProjectOutlined />
    },
    {
        title: '用户管理',
        key: "3",
        path: '/admin/user',
        icon: <IdcardOutlined />
    },
    {
        title: '主钢构件管理',
        key: "4",
        path: '/admin/main',
        icon: <GroupOutlined />
    },
    {
        title: '零件管理',
        key: "5",
        path: '/admin/part',
        icon: <SettingOutlined />
    },
    // {
    //     title: '图形图表',
    //     key: "6",
    //     path: '/admin/char',
    //     icon: <AreaChartOutlined />,
    //     children: [
    //         {
    //             title: '饼状图',
    //             key: "7",
    //             path: '/admin/char/pie',
    //             icon: <PieChartOutlined />
    //         },
    //         {
    //             title: '柱状图',
    //             key: "8",
    //             path: '/admin/char/line',
    //             icon: <BarChartOutlined />
    //         }
    //     ]
    // }
]

export default menu;