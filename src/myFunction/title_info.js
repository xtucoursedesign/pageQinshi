let title = [['首页'], ['工厂管理'], ['项目管理'], ['用户管理'], ['主钢构件管理'], ['零件管理'], ['图形图表'], ['图形图表', '饼状图'], ['图形图表', '柱状图']];
export function getTitleInfo(key){
    if(typeof key === "number"){
        return title[key];
    }else{
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
                return {key: ['0'], titl: title[0], last: title[0][0]};
        }
    }
}