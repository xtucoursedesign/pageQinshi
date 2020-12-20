let title = [['首页'], ['工厂管理'], ['项目管理'], ['用户管理'], ['主钢构件管理'], ['零件管理'], ['图形图表'], ['图形图表', '饼状图'], ['图形图表', '柱状图']];
export function getTitleInfo(key){
    if(typeof key === "number"){
        return title[key];
    }else{
        let lastkey = key.split("/").reverse();
        if(lastkey[0] === 'addlayoff'){
            return {key: ['2'], titl: title[2], last: '添加下料'};
        }
        if(lastkey[1] === 'layoff'){
            return {key: ['2'], titl: title[2], last: '下料管理'};
        }
        if(lastkey[2] === 'layoff'){
            return {key: ['2'], titl: title[2], last: '修改下料'};
        }
        if(lastkey[0] === 'addpreassembly'){
            return {key: ['2'], titl: title[2], last: '添加组装'};
        }
        if(lastkey[1] === 'preassembly'){
            return {key: ['2'], titl: title[2], last: '组装管理'};
        }
        if(lastkey[2] === 'preassembly'){
            return {key: ['2'], titl: title[2], last: '修改组装'};
        }
        if(lastkey[0] === 'addassembly'){
            return {key: ['2'], titl: title[2], last: '添加二次装配'};
        }
        if(lastkey[1] === 'assembly'){
            return {key: ['2'], titl: title[2], last: '二次装配管理'};
        }
        if(lastkey[2] === 'assembly'){
            return {key: ['2'], titl: title[2], last: '修改二次装配'};
        }
        // switch(lastkey[0]){
        //     case "home":
        //         return {key: ['0'], titl: title[0], last: title[0][0]};
        //     case "factory":
        //         return {key: ['1'], titl: title[1], last: title[1][0]};
        //     case "project":
        //         return {key: ['2'], titl: title[2], last: title[2][0]};
        //     case "user":
        //         return {key: ['3'], titl: title[3], last: title[3][0]};
        //     case "main":
        //         return {key: ['4'], titl: title[4], last: title[4][0]};
        //     case "part":
        //         return {key: ['5'], titl: title[5], last: title[5][0]};
        //     case "pie":
        //         return {key: ['6', '7'], titl: title[7], last: title[7][1]};
        //     case "line":
        //         return {key: ['6', '8'], titl: title[8], last: title[8][1]};
        //     case 'addassembly':
        //         return {key: ['2'], titl: title[2], last: ''};
        //     case '':
        //         return {key: ['2'], titl: title[2], last: ''};
        //     default:
        //         return {key: ['2'], titl: title[2], last: title[2][0]};
        // }
        switch(key){
            case "/admin/home":
                return {key: ['0'], titl: title[0], last: title[0][0]};
            case "/admin/factory":
                return {key: ['1'], titl: title[1], last: title[1][0]};
            case "/admin/project":
                return {key: ['2'], titl: title[2], last: title[2][0]};
            case "/admin/user":
                return {key: ['3'], titl: title[3], last: title[3][0]};
            case "/admin/main":
                return {key: ['4'], titl: title[4], last: title[4][0]};
            case "/admin/part":
                return {key: ['5'], titl: title[5], last: title[5][0]};
            case "/admin/char/pie":
                return {key: ['6', '7'], titl: title[7], last: title[7][1]};
            case "/admin/char/line":
                return {key: ['6', '8'], titl: title[8], last: title[8][1]};
            default:
                return {key: ['2'], titl: title[2], last: title[2][0]};
        }
    }
}