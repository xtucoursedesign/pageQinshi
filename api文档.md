# 接口文档

## 附录

1. 公共请求参数

------------------------------------------------------------

> 每个接口需要的参数值（登录接口不需要）

------------------------------------------------------------

|参数名称|类型|是否必选|描述
|:----:|:---:|:----:|:------:|
token  |String|Y    |登录的token|

------------------------------------------------------------

例如： token
64bb678d918f45028f86b378c0f005dfd849152048d44cd3a5c85e159dfd2553

------------------------------------------------------------

## 目录

1. 登录
2. 获取位置信息
3. 获取天气信息
4. 获取所有工厂信息
5. 添加工厂信息
6. 修改工厂信息
7. 获取所有用户信息
8. 更新或添加用户
9. 删除用户
10. 分页获取零件信息
11. 分页搜索零件信息
12. 删除零件信息
13. 添加零件信息
14. 上传图片或文件
15. 修改零件信息
16. 分页获取主钢构信息
17. 分页搜索主钢构信息
18. 删除主钢构信息
19. 添加主钢构信息
20. 修改主钢构信息
21. 获取所有项目信息
22. 添加项目信息
23. 修改项目信息
24. 删除项目信息
25. 获取辅助表信息
26. 获取所有零件信息
27. 获取所有主钢构信息
28. 根据项目编号获取下料信息
29. 添加下料信息
30. 修改下料信息
31. 修改下料状态
32. 删除下料信息
33. 添加二次装配信息
34. 修改二次装配信息
35. 获取二次装配信息
36. 根据项目编号获取二次装配信息
37. 切换二次装配状态
38. 切换打孔装配状态
39. 删除二次装配信息
40. 获取组装信息
41. 根据项目编号获取组装信息
42. 添加组装信息
43. 修改组装信息
44. 修改组装完成状态
45. 删除组装信息

## 1. 登录

### 登录请求URL

> <http://localhost:8080/xtuproject/UserServlet?method=login>

### 登录请求方式

> post

### 登录参数类型

|参数|是否必选|类型|说明|
|:--:|:-----:|:--:|:--:|
|username|Y|string|用户名|
|password|Y|string|密码|

### 登录返回示例

```json
//成功
{
  "status": 0,
  "data": {
    "user": {
      "uid": "00000002",
      "username": "lisi",
      "name": "李四",
      "phone": "12645874125",
      "faid": "00000000002"
    },
    "token": "64bb678d918f45028f86b378c0f005dfd849152048d44cd3a5c85e159dfd2553"
}
//失败
{
    "status": 1,
    "msg": "用户名或密码错误!"
}
```

## 2. 获取位置信息

### 位置请求URL

> <http://localhost:8080/xtuproject/AddrServlet?method=address>

### 位置请求方式

> get

### 位置参数类型

> 无

### 位置返回示例

```json
//成功
{
  "status": 0,
  "data": {
    "location": "北京"
  }
}
```

## 3. 获取天气信息

### 获取天气信息请求URL

> <http://wthrcdn.etouch.cn/weather_mini?city=北京>

### 获取天气信息请求方式

> GET

### 获取天气信息参数类型

|参数        |是否必选 |类型      |说明      |
|:----------:|:------:|:-------:|:--------:|
|city        |Y       |string   |城市名称   |

### 获取天气信息返回示例

```json
{
    "data": {
        "yesterday": {
            "date": "9日星期五",
            "high": "高温 21℃",
            "fx": "南风",
            "low": "低温 10℃",
            "fl": "<![CDATA[1级]]>",
            "type": "霾"
        },
        "city": "北京",
        "forecast": [
            {
                "date": "10日星期六",
                "high": "高温 23℃",
                "fengli": "<![CDATA[2级]]>",
                "low": "低温 15℃",
                "fengxiang": "南风",
                "type": "霾"
            },
            {
                "date": "11日星期天",
                "high": "高温 18℃",
                "fengli": "<![CDATA[3级]]>",
                "low": "低温 7℃",
                "fengxiang": "北风",
                "type": "阴"
            },
            {
                "date": "12日星期一",
                "high": "高温 18℃",
                "fengli": "<![CDATA[2级]]>",
                "low": "低温 6℃",
                "fengxiang": "西风",
                "type": "多云"
            },
            {
                "date": "13日星期二",
                "high": "高温 19℃",
                "fengli": "<![CDATA[2级]]>",
                "low": "低温 6℃",
                "fengxiang": "北风",
                "type": "多云"
            },
            {
                "date": "14日星期三",
                "high": "高温 14℃",
                "fengli": "<![CDATA[2级]]>",
                "low": "低温 5℃",
                "fengxiang": "东南风",
                "type": "晴"
            }
        ],
        "ganmao": "感冒低发期，天气舒适，请注意多吃蔬菜水果，多喝水哦。",
        "wendu": "19"
    }
}
```

## 4. 获取所有工厂信息

### 获取所有工厂信息请求URL

> <http://localhost:8080/xtuproject/FactoryServlet?method=getAllFactory>

### 获取所有工厂信息请求方式

> GET

### 获取所有工厂信息参数类型

> 无

### 获取所有工厂信息返回示例

```json
{
  "status": 0,
  "data": {
    "factories": [
      {
        "bfid": "00000000001",
        "name": "一分厂"
      },
      {
        "bfid": "00000000002",
        "name": "二分厂"
      },
      {
        "bfid": "00000000003",
        "name": "三分厂"
      },
      {
        "bfid": "00000000004",
        "name": "四分厂"
      },
      {
        "bfid": "00000000005",
        "name": "五分厂"
      },
      {
        "bfid": "00000000006",
        "name": "六分厂"
      },
      {
        "bfid": "00000000007",
        "name": "七分厂"
      },
      {
        "bfid": "00000000008",
        "name": "八分厂"
      },
      {
        "bfid": "00000000009",
        "name": "九分厂"
      }
    ]
  }
}

// 失败
{
  "status": 2,
  "msg": "暂无数据"
}
```

## 5. 添加工厂

### 添加工厂信息请求URL

> <http://localhost:8080/xtuproject/FactoryServlet?method=insertFactory>

### 添加工厂信息请求方式

> POST

### 添加工厂信息参数类型

|参数        |是否必选 |类型      |说明      |
|:----------:|:------:|:-------:|:--------:|
|bfid        |Y       |string   |工厂编号   |
|name        |Y       |string   |工厂名     |

### 添加工厂信息返回示例

```json
// 成功
{
  "status": 0,
  "msg": "添加成功!"
}
// 失败
{
  "status": 1,
  "msg": "添加失败!"
}

// 失败
{
  "status": 1,
  "msg": "编号重复!"
}
```

## 6. 修改工厂

### 修改工厂信息请求URL

> <http://localhost:8080/xtuproject/FactoryServlet?method=updateFactory>

### 修改工厂信息请求方式

> POST

### 修改工厂信息参数类型

|参数        |是否必选 |类型      |说明        |
|:----------:|:------:|:-------:|:----------:|
|bfid        |Y       |string   |工厂编号     |
|name        |Y       |string   |工厂名       |
|oldBfid     |Y       |String   |之前的工厂编号|

### 修改工厂信息返回示例

```json
// 成功
{
  "status": 0,
  "msg": "修改成功!"
}
// 失败
{
  "status": 1,
  "msg": "修改失败!"
}
// 失败
{
  "status": 1,
  "msg": "编号重复!"
}
```

## 7. 获取所有用户

### 获取所有用户信息请求URL

> <http://localhost:8080/xtuproject/UserServlet?method=getAllUser>

### 获取所有用户信息请求方式

> POST

### 获取所有用户信息参数类型

> 无

### 获取所有用户信息返回示例

```json
{
  "status": 0,
  "data": {
    "users": [
      {
        "uid": "00000001",
        "username": "zhangsan",
        "name": "张三",
        "phone": "15423451247",
        "faid": "00000000001",
        "department": "事业部"
      },
      {
        "uid": "00000002",
        "username": "lisi",
        "name": "李四",
        "phone": "12645874125",
        "faid": "00000000002",
        "department": "人事部"
      }
    ]
  }
}

// 失败
{
  "status": 2,
  "msg": "暂无数据"
}
```

## 8. 更新或添加用户

### 更新或添加用户信息请求URL

> <http://localhost:8080/xtuproject/UserServlet?method=getAllUser>

### 更新或添加用户信息请求方式

> POST

### 更新或添加用户信息参数类型

|参数        |是否必选 |类型      |说明                            |
|:----------:|:------:|:-------:|:------------------------------:|
|uid         |Y       |string   |用户编号                         |
|username    |Y       |string   |用户名                           |
|password    |Y       |String   |密码                             |
|rePassword  |Y       |String   |重复密码                         |
|name        |Y       |String   |姓名                             |
|phone       |Y       |String   |电话                             |
|faid        |Y       |String   |工厂编号                         |
|department  |Y       |String   |部门名                           |
|oldUid      |N       |String   |之前的用户编号, 更新需要，添加不需要|

### 更新或添加用户信息返回示例

```json
// 成功
{
  "status": 0,
  "msg": "修改成功!"
}
// 失败
{
  "status": 1,
  "msg": "修改失败!"
}
// 失败
{
  "status": 1,
  "msg": "编号重复!"
}

// 成功
{
  "status": 0,
  "msg": "添加成功!"
}
// 失败
{
  "status": 1,
  "msg": "添加失败!"
}
// 失败
{
  "status": 1,
  "msg": "编号重复!"
}
```

## 9. 删除用户

### 删除用户信息请求URL

> <http://localhost:8080/xtuproject/UserServlet>

### 删除用户信息请求方式

> POST

### 删除用户信息参数类型

|参数        |是否必选 |类型      |说明                            |
|:----------:|:------:|:-------:|:------------------------------:|
|uid         |Y       |string   |用户编号                         |
|method      |Y       |string   |方法 removeUser                  |

### 删除用户信息返回示例

```json
// 成功
{
  "status": 0,
  "msg": "删除成功!"
}
// 失败
{
  "status": 1,
  "msg": "删除失败!"
}
```

## 10. 分页获取零件信息

### 分页获取零件信息请求URL

> <http://localhost:8080/xtuproject/PartServlet>

### 分页获取零件信息请求方式

> POST

### 分页获取零件信息参数类型

|参数        |是否必选 |类型      |说明                            |
|:----------:|:------:|:-------:|:------------------------------:|
|page        |Y       |string   |指定页数                         |
|method      |Y       |string   |方法 getPartByPage               |

### 分页获取零件信息返回示例

```json
// 成功
{
  "status": 0,
  "data": {
    "part": {
      "list": [
        {
          "pid": "00000000001",
          "name": "中齿轮",
          "material": "铁",
          "specifi": "普通规格",
          "texture": "生铁",
          "weight": 55,
          "img": "[{
            'uid': 'd1763a3f665b478b800202254f7e0207',
            'name': '2_xxx.jpg',
            'status': 'done',
            'url': '/image/51abcca6ea4049498834aadfa2772dc52_milkdue.jpg'
          }]"
        },
        {
          "pid": "00000000002",
          "name": "大齿轮",
          "material": "铁",
          "specifi": "普通规格",
          "texture": "生铁",
          "weight": 58,
          "img": "[{
            'uid': 'd1763a3f665b478b800202254f7e0207',
            'name': '2_xxx.jpg',
            'status': 'done',
            'url': '/image/51abcca6ea4049498834aadfa2772dc52_milkdue.jpg'
          }]"
        }
      ],
    "current": 1,
    "totalPage": 0,
    "totalCount": 3
    }
  }
}

// 失败
{
  "status": 1,
  "msg": "页码出错!"
}

// 失败
{
  "status": 2,
  "msg": "暂无数据"
}
```

## 11. 分页搜索零件信息

### 分页搜索零件信息请求URL

> <http://localhost:8080/xtuproject/PartServlet>

### 分页搜索零件信息请求方式

> POST

### 分页搜索零件信息参数类型

|参数        |是否必选 |类型      |说明                            |
|:----------:|:------:|:-------:|:------------------------------:|
|page        |Y       |string   |指定页数                         |
|method      |Y       |string   |方法 getPartBySearch             |
|searchType  |Y       |string   |搜索类型                         |
|searchKeyWord|Y      |string   |搜索关键字                       |

### 分页搜索零件信息返回示例

```json
// 成功
{
  "status": 0,
  "data": {
    "part": {
      "list": [
        {
          "pid": "00000000001",
          "name": "中齿轮",
          "material": "铁",
          "specifi": "普通规格",
          "texture": "生铁",
          "weight": 55,
          "img": "[{
            'uid': 'd1763a3f665b478b800202254f7e0207',
            'name': '2_xxx.jpg',
            'status': 'done',
            'url': '/image/51abcca6ea4049498834aadfa2772dc52_milkdue.jpg'
          }]"
        },
        {
          "pid": "00000000002",
          "name": "大齿轮",
          "material": "铁",
          "specifi": "普通规格",
          "texture": "生铁",
          "weight": 58,
          "img": "[{
            'uid': 'd1763a3f665b478b800202254f7e0207',
            'name': '2_xxx.jpg',
            'status': 'done',
            'url': '/image/51abcca6ea4049498834aadfa2772dc52_milkdue.jpg'
          }]"
        }
      ],
    "current": 1,
    "totalPage": 2,
    "totalCount": 3
    }
  }
}

// 失败
{
  "status": 1,
  "msg": "页码出错!"
}

// 失败
{
  "status": 2,
  "msg": "暂无数据"
}
```

## 12. 删除零件信息

### 删除零件信息请求URL

> <http://localhost:8080/xtuproject/PartServlet>

### 删除零件信息请求方式

> POST

### 删除零件信息参数类型

|参数        |是否必选 |类型      |说明                            |
|:----------:|:------:|:-------:|:------------------------------:|
|method      |Y       |string   |方法 removePart                 |
|pid         |Y       |string   |零件编号                         |

### 分删除零件信息返回示例

```json
// 成功
{
  "status": 0,
  "msg": "删除成功!"
}
// 失败
{
  "status": 1,
  "msg": "删除失败!"
}
```

## 13. 添加零件信息

### 添加零件信息请求URL

> <http://localhost:8080/xtuproject/PartServlet>

### 添加零件信息请求方式

> POST

### 添加零件信息参数类型

|参数        |是否必选 |类型      |说明                            |
|:----------:|:------:|:-------:|:------------------------------:|
|method      |Y       |string   |方法 insertPart                 |
|pid         |Y       |string   |零件编号                         |
|name        |Y       |string   |零件名字                         |
|material    |Y       |string   |零件材料                         |
|specifi     |Y       |string   |零件规格                         |
|texture     |Y       |string   |零件材质                         |
|weight      |Y       |string   |零件重量                         |
|img         |Y       |string   |零件图片json串格式               |
|unit        |Y       |string   |零件单位                         |

### 添加零件零件信息返回示例

```json
// 成功
{
  "status": 0,
  "msg": "添加成功!"
}
// 失败
{
  "status": 1,
  "msg": "添加失败!"
}
// 失败
{
  "status": 1,
  "msg": "编号重复!"
}
```

## 14. 上传图片或文件

### 上传图片或文件信息请求URL

> <http://localhost:8080/xtuproject/FileUploadServlet>

### 上传图片或文件信息请求方式

> POST

### 上传图片或文件信息参数类型

> 文件本身

### 上传图片或文件信息返回示例

```json
// 成功
{
  "status": 0,
  "data": {
      "img": {
        "uid": "d1763a3f665b478b800202254f7e0207",
        "name": "2_xxx.jpg",
        "status": "done",
        "url": "/image/51abcca6ea4049498834aadfa2772dc52_xxx.jpg"
      }
  }
}
```

## 15. 修改零件信息

### 修改零件信息请求URL

> <http://localhost:8080/xtuproject/PartServlet>

### 修改零件信息请求方式

> POST

### 修改零件信息参数类型

|参数        |是否必选 |类型      |说明                            |
|:----------:|:------:|:-------:|:------------------------------:|
|method      |Y       |string   |方法 updatePart                 |
|pid         |Y       |string   |零件编号                         |
|name        |Y       |string   |零件名字                         |
|material    |Y       |string   |零件材料                         |
|specifi     |Y       |string   |零件规格                         |
|texture     |Y       |string   |零件材质                         |
|weight      |Y       |string   |零件重量                         |
|img         |Y       |string   |零件图片json串格式               |
|unit        |Y       |string   |零件单位                         |
|oldPid      |Y       |string   |旧的零件编号                     |

### 修改零件零件信息返回示例

```json
// 成功
{
  "status": 0,
  "msg": "修改成功!"
}
// 失败
{
  "status": 1,
  "msg": "修改失败!"
}
// 失败
{
  "status": 1,
  "msg": "编号重复!"
}
```

## 16. 分页获取主钢构信息

### 分页获取主钢构信息请求URL

> <http://localhost:8080/xtuproject/MainServlet>

### 分页获取主钢构信息请求方式

> POST

### 分页获取主钢构信息参数类型

|参数        |是否必选 |类型      |说明                            |
|:----------:|:------:|:-------:|:------------------------------:|
|page        |Y       |string   |指定页数                         |
|method      |Y       |string   |方法 getMainByPage               |

### 分页获取主钢构信息返回示例

```json
// 成功
{
  "status": 0,
  "data": {
    "main": {
      "list": [
        {
          "mid": "00000000001",
          "name": "中齿轮",
          "material": "铁",
          "specifi": "普通规格",
          "texture": "生铁",
          "weight": 55,
          "img": "[{
            'uid': 'd1763a3f665b478b800202254f7e0207',
            'name': '2_xxx.jpg',
            'status': 'done',
            'url': '/image/51abcca6ea4049498834aadfa2772dc52_milkdue.jpg'
          }]",
          "unit": "kg"
        },
        {
          "mid": "00000000002",
          "name": "大齿轮",
          "material": "铁",
          "specifi": "普通规格",
          "texture": "生铁",
          "weight": 58,
          "img": "[{
            'uid': 'd1763a3f665b478b800202254f7e0207',
            'name': '2_xxx.jpg',
            'status': 'done',
            'url': '/image/51abcca6ea4049498834aadfa2772dc52_milkdue.jpg'
          }]",
          "unit": "kg"
        }
      ],
    "current": 1,
    "totalPage": 0,
    "totalCount": 3
    }
  }
}

// 失败
{
  "status": 1,
  "msg": "页码出错!"
}

// 失败
{
  "status": 2,
  "msg": "暂无数据"
}
```

## 17. 分页搜索主钢构信息

### 分页搜索主钢构信息请求URL

> <http://localhost:8080/xtuproject/MainServlet>

### 分页搜索主钢构信息请求方式

> POST

### 分页搜索主钢构信息参数类型

|参数        |是否必选 |类型      |说明                            |
|:----------:|:------:|:-------:|:------------------------------:|
|page        |Y       |string   |指定页数                         |
|method      |Y       |string   |方法 getMainBySearch             |
|searchType  |Y       |string   |搜索类型                         |
|searchKeyWord|Y      |string   |搜索关键字                       |

### 分页搜索主钢构信息返回示例

```json
// 成功
{
  "status": 0,
  "data": {
    "part": {
      "list": [
        {
          "mid": "00000000001",
          "name": "中齿轮",
          "material": "铁",
          "specifi": "普通规格",
          "texture": "生铁",
          "weight": 55,
          "img": "[{
            'uid': 'd1763a3f665b478b800202254f7e0207',
            'name': '2_xxx.jpg',
            'status': 'done',
            'url': '/image/51abcca6ea4049498834aadfa2772dc52_milkdue.jpg'
          }]"
        },
        {
          "mid": "00000000002",
          "name": "大齿轮",
          "material": "铁",
          "specifi": "普通规格",
          "texture": "生铁",
          "weight": 58,
          "img": "[{
            'uid': 'd1763a3f665b478b800202254f7e0207',
            'name': '2_xxx.jpg',
            'status': 'done',
            'url': '/image/51abcca6ea4049498834aadfa2772dc52_milkdue.jpg'
          }]"
        }
      ],
    "current": 1,
    "totalPage": 2,
    "totalCount": 3
    }
  }
}

// 失败
{
  "status": 1,
  "msg": "页码出错!"
}

// 失败
{
  "status": 2,
  "msg": "暂无数据"
}
```

## 18. 删除主钢构信息

### 删除主钢构信息请求URL

> <http://localhost:8080/xtuproject/MainServlet>

### 删除主钢构信息请求方式

> POST

### 删除主钢构信息参数类型

|参数        |是否必选 |类型      |说明                            |
|:----------:|:------:|:-------:|:------------------------------:|
|method      |Y       |string   |方法 removeMain                 |
|pid         |Y       |string   |主钢构编号                         |

### 分删除主钢构信息返回示例

```json
// 成功
{
  "status": 0,
  "msg": "删除成功!"
}
// 失败
{
  "status": 1,
  "msg": "删除失败!"
}
```

## 19. 添加主钢构信息

### 添加主钢构信息请求URL

> <http://localhost:8080/xtuproject/MainServlet>

### 添加主钢构信息请求方式

> POST

### 添加主钢构信息参数类型

|参数        |是否必选 |类型      |说明                            |
|:----------:|:------:|:-------:|:------------------------------:|
|method      |Y       |string   |方法 insertPart                 |
|mid         |Y       |string   |主钢构编号                         |
|name        |Y       |string   |主钢构名字                         |
|material    |Y       |string   |主钢构材料                         |
|specifi     |Y       |string   |主钢构规格                         |
|texture     |Y       |string   |主钢构材质                         |
|weight      |Y       |string   |主钢构重量                         |
|img         |Y       |string   |主钢构图片json串格式               |
|unit        |Y       |string   |主钢构单位                         |

### 添加主钢构信息返回示例

```json
// 成功
{
  "status": 0,
  "msg": "添加成功!"
}
// 失败
{
  "status": 1,
  "msg": "添加失败!"
}
// 失败
{
  "status": 1,
  "msg": "编号重复!"
}
```

## 20. 修改主钢构信息

### 修改主钢构信息请求URL

> <http://localhost:8080/xtuproject/MainServlet>

### 修改主钢构信息请求方式

> POST

### 修改主钢构信息参数类型

|参数        |是否必选 |类型      |说明                            |
|:----------:|:------:|:-------:|:------------------------------:|
|method      |Y       |string   |方法 updateMain                 |
|mid         |Y       |string   |主钢构编号                         |
|name        |Y       |string   |主钢构名字                         |
|material    |Y       |string   |主钢构材料                         |
|specifi     |Y       |string   |主钢构规格                         |
|texture     |Y       |string   |主钢构材质                         |
|weight      |Y       |string   |主钢构重量                         |
|img         |Y       |string   |主钢构图片json串格式               |
|unit        |Y       |string   |主钢构单位                         |
|oldPid      |Y       |string   |旧的主钢构编号                     |

### 修改主钢构信息返回示例

```json
// 成功
{
  "status": 0,
  "msg": "修改成功!"
}
// 失败
{
  "status": 1,
  "msg": "修改失败!"
}
// 失败
{
  "status": 1,
  "msg": "编号重复!"
}
```

## 21. 获取所有项目信息

### 获取所有项目信息请求URL

> <http://localhost:8080/xtuproject/ProjectServlet>

### 获取所有项目信息请求方式

> POST

### 获取所有项目信息参数类型

|参数        |是否必选 |类型      |说明                            |
|:----------:|:------:|:-------:|:------------------------------:|
|method      |Y       |string   |方法 getAllProject               |

### 获取所有项目信息返回示例

```json
// 成功
{
  "status": 0,
  "msg": "修改成功!"
}
// 失败
{
  "status": 1,
  "msg": "修改失败!"
}
// 失败
{
  "status": 1,
  "msg": "编号重复!"
}
```

## 22. 添加项目信息

### 添加项目信息请求URL

> <http://localhost:8080/xtuproject/ProjectServlet>

### 添加项目信息请求方式

> POST

### 添加项目信息参数类型

|参数        |是否必选 |类型      |说明                            |
|:----------:|:------:|:-------:|:------------------------------:|
|method      |Y       |string   |方法 insertProject               |
|pid         |Y       |string   |项目编号                         |
|name        |Y       |string   |项目名字                         |
|faid        |Y       |string   |所属工厂                         |
|investid    |Y       |string   |投资方编号                       |
|investname  |Y       |string   |投资方名字                       |
|approdate   |Y       |string   |立项日期                         |
|spededate   |Y       |string   |交货日期                         |
|actdate     |N       |string   |实际交货日期                     |

### 添加项目信息返回示例

```json
// 成功
{
  "status": 0,
  "msg": "添加成功!"
}
// 失败
{
  "status": 1,
  "msg": "添加失败!"
}
// 失败
{
  "status": 1,
  "msg": "编号重复!"
}
```

## 23. 修改项目信息

### 修改项目信息请求URL

> <http://localhost:8080/xtuproject/ProjectServlet>

### 修改项目信息请求方式

> POST

### 修改项目信息参数类型

|参数        |是否必选 |类型      |说明                            |
|:----------:|:------:|:-------:|:------------------------------:|
|method      |Y       |string   |方法 updateProject               |
|pid         |Y       |string   |项目编号                         |
|name        |Y       |string   |项目名字                         |
|faid        |Y       |string   |所属工厂                         |
|investid    |Y       |string   |投资方编号                       |
|investname  |Y       |string   |投资方名字                       |
|approdate   |Y       |string   |立项日期                         |
|spededate   |Y       |string   |交货日期                         |
|actdate     |N       |string   |实际交货日期                     |
|oldPid      |Y       |string   |旧的项目编号                     |

### 修改项目信息返回示例

```json
// 成功
{
  "status": 0,
  "msg": "修改成功!"
}
// 失败
{
  "status": 1,
  "msg": "修改失败!"
}
// 失败
{
  "status": 1,
  "msg": "编号重复!"
}
```

## 24. 删除项目信息

### 删除项目信息请求URL

> <http://localhost:8080/xtuproject/ProjectServlet>

### 删除项目信息请求方式

> POST

### 删除项目信息参数类型

|参数        |是否必选 |类型      |说明                            |
|:----------:|:------:|:-------:|:------------------------------:|
|method      |Y       |string   |方法 removeProject               |
|pid         |Y       |string   |项目编号                         |

### 删除项目信息返回示例

```json
// 成功
{
  "status": 0,
  "msg": "删除成功!"
}
// 失败
{
  "status": 1,
  "msg": "删除失败!"
}
```

## 25. 获取辅助表信息

### 获取辅助表信息请求URL

> <http://localhost:8080/xtuproject/ProjectServlet>

### 获取辅助表信息请求方式

> POST

### 获取辅助表信息参数类型

|参数        |是否必选 |类型      |说明                            |
|:----------:|:------:|:-------:|:------------------------------:|
|method      |Y       |string   |方法 getSketchByProId           |
|pid         |Y       |string   |项目编号                         |

### 获取辅助表信息返回示例

```json
{
  "status": 0,
  "data": {
  "sketch": [
    {
      "step": "layoff",
      "status": 50
    },
    {
      "step": "assembly",
      "status": 50
    },
    {
      "step": "preassembly",
      "status": 50
    }
  ]
}

```

## 26. 获取所有零件信息

### 获取所有零件信息请求URL

> <http://localhost:8080/xtuproject/PartServlet>

### 获取所有零件信息请求方式

> POST

### 获取所有零件信息参数类型

|参数        |是否必选 |类型      |说明                            |
|:----------:|:------:|:-------:|:------------------------------:|
|method      |Y       |string   |方法 getAllPart                  |

### 获取所有零件信息返回示例

```json
// 成功
{
  "status": 0,
  "data": {
    "part": [
      {
        "pid": "00000000003",
        "name": "小齿轮",
        "material": "铁",
        "specifi": "普通规格",
        "texture": "生铁",
        "weight": "8",
        "img": "[{\"uid\":\"63a4dfbb1c8843a0bac573d512681f9a\",\"name\":\"2_milkdue.jpg\",\"status\":\"done\",\"url\":\"http://localhost:8080/image/c10dca9158f447b489ce440a9b3b82a22_milkdue.jpg\"}]",
        "unit": "g"
      },
      {
        "pid": "00000000004",
        "name": "大轴",
        "material": "铜",
        "specifi": "普通规格",
        "texture": "铜",
        "weight": "11",
        "img": "[{\"uid\":\"48eede42c20f44fa9bb103eefeb94914\",\"name\":\"logo.png\",\"status\":\"done\",\"url\":\"http://localhost:8080/image/3cb5967b8f5348f0a70fdd33baced759logo.png\"}]",
        "unit": "g"
      },
      {
        "pid": "00000000005",
        "name": "中轴",
        "material": "铁",
        "specifi": "普通规格",
        "texture": "生铁",
        "weight": "45",
        "img": "[{\"uid\":\"fb4efbffabaa4370be4d14b63aac8eb4\",\"name\":\"logo.png\",\"status\":\"done\",\"url\":\"http://localhost:8080/image/c30533695dc64b3ba758e20a07404fb2logo.png\"},{\"uid\":\"0d263a9b769b45cca5301c0c2724f7e9\",\"name\":\"2_milkdue.jpg\",\"status\":\"done\",\"url\":\"http://localhost:8080/image/7706474f342a4ded9e377ec38748c56b2_milkdue.jpg\"}]",
        "unit": "kg"
      },
      {
        "pid": "00000000006",
        "name": "苏西",
        "material": "铜",
        "specifi": "普通规格",
        "texture": "生铁",
        "weight": "45",
        "img": "[{\"uid\":\"a746f6bb910f4fe4b7f5449b5e0a3123\",\"name\":\"卡通太空流星免抠图.png\",\"status\":\"done\",\"url\":\"http://localhost:8080/image/9457809f9cb3414c8ae34e6dc3990bc1卡通太空流星免抠图.png\"}]",
        "unit": "kg"
      }
    ]
  }
}

// 失败
{
  "status": 2,
  "msg": "暂无数据"
}
```

## 27. 获取所有主钢构信息

### 获取所有主钢构信息请求URL

> <http://localhost:8080/xtuproject/MainServlet>

### 获取所有主钢构信息请求方式

> POST

### 获取所有主钢构信息参数类型

|参数        |是否必选 |类型      |说明                            |
|:----------:|:------:|:-------:|:------------------------------:|
|method      |Y       |string   |方法 getAllMain                  |

### 获取所有主钢构信息返回示例

```json
// 成功
{
  "status": 0,
  "data": {
    "main": [
      {
        "num": 1,
        "mid": "00000000001",
        "name": "流星",
        "material": "铁",
        "specifi": "普通",
        "texture": "铁",
        "weight": "100",
        "img": "[{\"uid\":\"63a4dfbb1c8843a0bac573d512681f9a\",\"name\":\"2_milkdue.jpg\",\"status\":\"done\",\"url\":\"http://localhost:8080/image/c10dca9158f447b489ce440a9b3b82a22_milkdue.jpg\"}]",
        "unit": "kg"
      },
      {
        "num": 2,
        "mid": "00000000002",
        "name": "流星",
        "material": "1",
        "specifi": "1",
        "texture": "1",
        "weight": "1",
        "img": "[{\"uid\":\"63a4dfbb1c8843a0bac573d512681f9a\",\"name\":\"2_milkdue.jpg\",\"status\":\"done\",\"url\":\"http://localhost:8080/image/c10dca9158f447b489ce440a9b3b82a22_milkdue.jpg\"}]",
        "unit": "g"
      },
      {
        "num": 3,
        "mid": "00000000004",
        "name": "苏西",
        "material": "铜",
        "specifi": "普通规格",
        "texture": "生铁",
        "weight": "45",
        "img": "[{\"uid\":\"d69137ec2e944f7eba65820f10a3d988\",\"name\":\"卡通太空流星免抠图.png\",\"status\":\"done\",\"url\":\"http://localhost:8080/image/ee15641f11ae4baf879e20de3cc50884卡通太空流星免抠图.png\"}]",
        "unit": "g"
      }
    ]
  }
}

// 失败
{
  "status": 2,
  "msg": "暂无数据"
}
```

## 28. 根据项目编号获取下料信息

### 根据项目编号获取下料信息请求URL

> <http://localhost:8080/xtuproject/LayoffServlet>

### 根据项目编号获取下料信息请求方式

> POST

### 根据项目编号获取下料信息参数类型

|参数        |是否必选 |类型      |说明                            |
|:----------:|:------:|:-------:|:------------------------------:|
|method      |Y       |string   |方法 getAllLayoffByProId         |
|proId       |Y       |string   |编号                             |

### 根据项目编号获取下料信息返回示例

```json
// 成功
{
  "status": 0,
  "data": {
    "layoff": [
      {
        "lid": "00000000003",
        "baitdate": "2020-12-14 19:52:38",
        "partid": "00000000003",
        "count": 2,
        "mainid": "00000000004",
        "complete": 1,
        "proid": "00000000003",
        "weight": "21",
        "unit": "kg",
        "note": "<p>fsdfsf</p>\n<p><strong>fsdfsdfsdf</strong></p>\n"
      },
      {
        "lid": "00000000004",
        "baitdate": "2020-12-07 20:07:16",
        "partid": "00000000003",
        "count": 3,
        "mainid": "00000000004",
        "complete": 0,
        "proid": "00000000003",
        "weight": "12",
        "unit": "g",
        "note": "ww"
      }
    ]
  }
}
// 失败
{
  "status": 2,
  "msg": "暂无数据"
}
```

## 29. 添加下料信息

### 添加下料信息请求URL

> <http://localhost:8080/xtuproject/LayoffServlet>

### 添加下料信息请求方式

> POST

### 添加下料信息参数类型

|参数        |是否必选 |类型      |说明                            |
|:----------:|:------:|:-------:|:------------------------------:|
|method      |Y       |string   |方法 insertLayoff                |
|lid         |Y       |string   |编号                             |
|baitdate    |Y       |string   |下料日期                         |
|partid      |Y       |string   |零件编号                         |
|count       |Y       |int      |零件数量                         |
|mainid      |Y       |string   |主钢构编号                       |
|complete    |Y       |int      |是否完成                         |
|proid       |Y       |string   |项目编号                         |
|weight      |Y       |string   |重量                             |
|unit        |Y       |string   |单位                             |
|note        |Y       |string   |备注                             |

### 添加下料信息返回示例

```json
// 成功
{
  "status": 0,
  "msg": "添加成功!"
}
// 失败
{
  "status": 1,
  "msg": "添加失败!"
}
// 失败
{
  "status": 1,
  "msg": "编号重复!"
}
```

## 30. 修改下料信息

### 修改下料信息请求URL

> <http://localhost:8080/xtuproject/LayoffServlet>

### 修改下料信息请求方式

> POST

### 修改下料信息参数类型

|参数        |是否必选 |类型      |说明                            |
|:----------:|:------:|:-------:|:------------------------------:|
|method      |Y       |string   |方法 updateLayoff                |
|lid         |Y       |string   |编号                             |
|baitdate    |Y       |string   |下料日期                         |
|partid      |Y       |string   |零件编号                         |
|count       |Y       |int      |零件数量                         |
|mainid      |Y       |string   |主钢构编号                       |
|complete    |Y       |int      |是否完成                         |
|proid       |Y       |string   |项目编号                         |
|weight      |Y       |string   |重量                             |
|unit        |Y       |string   |单位                             |
|note        |Y       |string   |备注                             |
|oldLid      |Y       |string   |之前的编号                        |

### 修改下料信息返回示例

```json
// 成功
{
  "status": 0,
  "msg": "修改成功!"
}
// 失败
{
  "status": 1,
  "msg": "修改失败!"
}
// 失败
{
  "status": 1,
  "msg": "编号重复!"
}
```

## 31. 修改下料状态

### 修改下料状态请求URL

> <http://localhost:8080/xtuproject/LayoffServlet>

### 修改下料状态请求方式

> POST

### 修改下料状态参数类型

|参数        |是否必选 |类型      |说明                            |
|:----------:|:------:|:-------:|:------------------------------:|
|method      |Y       |string   |方法 updateLayoffState           |
|lid         |Y       |string   |编号                             |
|complete    |Y       |string   |完成状态                         |

### 修改下料状态返回示例

```json
// 成功
{
  "status": 0,
  "msg": "修改成功!"
}
// 失败
{
  "status": 1,
  "msg": "修改失败!"
}
```

## 32. 删除下料信息

### 删除下料信息请求URL

> <http://localhost:8080/xtuproject/LayoffServlet>

### 删除下料信息请求方式

> POST

### 删除下料信息参数类型

|参数        |是否必选 |类型      |说明                            |
|:----------:|:------:|:-------:|:------------------------------:|
|method      |Y       |string   |方法 removeLayoff                |
|lid         |Y       |string   |编号                             |

### 删除下料信息返回示例

```json
// 成功
{
  "status": 0,
  "msg": "删除成功!"
}
// 失败
{
  "status": 1,
  "msg": "删除失败!"
}
```

## 33. 添加二次装配信息

### 添加二次装配信息请求URL

> <http://localhost:8080/xtuproject/AssemblyServlet>

### 添加二次装配信息请求方式

> POST

### 添加二次装配信息参数类型

|参数        |是否必选 |类型      |说明                            |
|:----------:|:------:|:-------:|:------------------------------:|
|method      |Y       |string   |方法 insertAssembly              |
|aid         |Y       |string   |编号                             |
|secdate     |Y       |string   |二次装配日期                     |
|partid      |Y       |string   |零件编号                         |
|mainid      |Y       |string   |主钢构编号                       |
|complete    |Y       |int      |是否完成                         |
|proid       |Y       |string   |项目编号                         |
|hole        |Y       |int      |是否打孔                         |
|shotdate    |N       |string   |打孔日期                         |
|shotcomp    |N       |int      |打孔是否完成                      |
|require     |Y       |string   |二次装配要求                      |

### 添加二次装配信息返回示例

```json
// 成功
{
  "status": 0,
  "msg": "添加成功!"
}
// 失败
{
  "status": 1,
  "msg": "添加失败!"
}
// 失败
{
  "status": 1,
  "msg": "编号重复!"
}
```

## 34. 修改二次装配信息

### 修改二次装配信息请求URL

> <http://localhost:8080/xtuproject/AssemblyServlet>

### 修改二次装配信息请求方式

> POST

### 修改二次装配信息参数类型

|参数        |是否必选 |类型      |说明                            |
|:----------:|:------:|:-------:|:------------------------------:|
|method      |Y       |string   |方法 updateAssembly              |
|aid         |Y       |string   |编号                             |
|secdate     |Y       |string   |二次装配日期                     |
|partid      |Y       |string   |零件编号                         |
|mainid      |Y       |string   |主钢构编号                       |
|complete    |Y       |int      |是否完成                         |
|proid       |Y       |string   |项目编号                         |
|hole        |Y       |int      |是否打孔                         |
|shotdate    |N       |string   |打孔日期                         |
|shotcomp    |N       |int      |打孔是否完成                      |
|require     |Y       |string   |二次装配要求                      |
|oldAid      |Y       |string   |旧的编号                          |

### 修改二次装配信息返回示例

```json
// 成功
{
  "status": 0,
  "msg": "修改成功!"
}
// 失败
{
  "status": 1,
  "msg": "修改失败!"
}
// 失败
{
  "status": 1,
  "msg": "编号重复!"
}
```

## 35. 获取二次装配信息

### 获取二次装配信息请求URL

> <http://localhost:8080/xtuproject/AssemblyServlet>

### 获取二次装配信息请求方式

> POST

### 获取二次装配信息参数类型

|参数        |是否必选 |类型      |说明                            |
|:----------:|:------:|:-------:|:------------------------------:|
|method      |Y       |string   |方法 getAssembly                 |
|aid         |Y       |string   |编号                             |

### 获取二次装配信息返回示例

```json
{
  "status": 0,
    "data": {
    "assembly": {
      "aid": "00000000001",
      "secdate": "2020-12-18 17:11:33",
      "partid": "00000000005",
      "complete": 0,
      "require": "<p>发士大夫石帆胜丰</p>\n<p>发士大夫十分</p>\n<p>发射点十分士大夫法大师傅十分</p>\n<p>ssfsfsf<strong>sfsfsf</strong><strong><em>fsfsfsfs</em></strong><strong><em><ins>fsfdsfsdfsdfs</ins></em></strong></p>\n",
      "proid": "00000000003",
      "mainid": "00000000002",
      "hole": 0
    }
  }
}
```

## 36. 根据项目编号获取二次装配信息

### 根据项目编号获取二次装配信息请求URL

> <http://localhost:8080/xtuproject/AssemblyServlet>

### 根据项目编号获取二次装配信息请求方式

> POST

### 根据项目编号获取二次装配信息参数类型

|参数        |是否必选 |类型      |说明                            |
|:----------:|:------:|:-------:|:------------------------------:|
|method      |Y       |string   |方法 getAllAssemblyByProId       |
|proid       |Y       |string   |编号                             |

### 根据项目编号获取二次装配信息返回示例

```json
{
  "status": 0,
  "data": {
    "assemblies": [
      {
        "aid": "00000000002",
        "secdate": "2020-12-10 17:12:38",
        "partid": "00000000005",
        "complete": 1,
        "require": "<p>fsdfsdfsf<strong>fsdfdsfsfsf</strong></p>\n<p><code><strong>fdsfsdfsfsdfsf</strong></code></p>\n<p><code><strong>fsfsfsf</strong></code></p>\n",
        "proid": "00000000003",
        "mainid": "00000000004",
        "hole": 1,
        "shotdate": "2020-12-24 17:12:48",
        "shotcomp": 1
      },
      {
        "aid": "00000000004",
        "secdate": "2020-12-07 19:53:24",
        "partid": "00000000003",
        "complete": 0,
        "require": "五",
        "proid": "00000000003",
        "mainid": "00000000004",
        "hole": 1,
        "shotdate": "2020-12-03 19:53:56",
        "shotcomp": 0
      }
    ]
  }
}
```

## 37. 切换二次装配状态

### 切换二次装配状态请求URL

> <http://localhost:8080/xtuproject/AssemblyServlet>

### 切换二次装配状态请求方式

> POST

### 切换二次装配状态参数类型

|参数        |是否必选 |类型      |说明                            |
|:----------:|:------:|:-------:|:------------------------------:|
|method      |Y       |string   |方法 updateAssemblyState         |
|aid         |Y       |string   |编号                             |
|complete    |Y       |string   |完成情况                         |

### 切换二次装配状态返回示例

```json
// 成功
{
  "status": 0,
  "msg": "修改成功!"
}
// 失败
{
  "status": 1,
  "msg": "修改失败!"
}
```

## 38. 切换打孔装配状态

### 切换打孔状态请求URL

> <http://localhost:8080/xtuproject/AssemblyServlet>

### 切换打孔状态请求方式

> POST

### 切换打孔状态参数类型

|参数        |是否必选 |类型      |说明                            |
|:----------:|:------:|:-------:|:------------------------------:|
|method      |Y       |string   |方法 updateHoleState             |
|aid         |Y       |string   |编号                             |
|shotcomp    |Y       |string   |完成情况                         |

### 切换打孔状态返回示例

```json
// 成功
{
  "status": 0,
  "msg": "修改成功!"
}
// 失败
{
  "status": 1,
  "msg": "修改失败!"
}
```

## 39. 删除二次装配信息

### 删除二次装配信息请求URL

> <http://localhost:8080/xtuproject/AssemblyServlet>

### 删除二次装配信息请求方式

> POST

### 删除二次装配信息参数类型

|参数        |是否必选 |类型      |说明                            |
|:----------:|:------:|:-------:|:------------------------------:|
|method      |Y       |string   |方法 removeAssembly             |
|aid         |Y       |string   |编号                             |

### 删除二次装配信息返回示例

```json
// 成功
{
  "status": 0,
  "msg": "删除成功!"
}
// 失败
{
  "status": 1,
  "msg": "删除失败!"
}
```

## 40. 获取组装信息

### 获取组装信息请求URL

> <http://localhost:8080/xtuproject/PreassemblyServlet>

### 获取组装信息请求方式

> POST

### 获取组装信息参数类型

|参数        |是否必选 |类型      |说明                            |
|:----------:|:------:|:-------:|:------------------------------:|
|method      |Y       |string   |方法 getPreassembly              |
|paid        |Y       |string   |编号                             |

### 获取组装信息返回示例

```json
{
  "status": 0,
  "data": {
      "preassembly": {
      "paid": "00000000003",
      "assdate": "2020-12-08 20:07:54",
      "mainid": "00000000004",
      "complete": 1,
      "require": "frewrer",
      "proid": "00000000003"
    }
  }
}
```

## 41. 根据项目编号获取组装信息

### 根据项目编号获取组装信息请求URL

> <http://localhost:8080/xtuproject/PreassemblyServlet>

### 根据项目编号获取组装信息请求方式

> POST

### 根据项目编号获取组装信息参数类型

|参数        |是否必选 |类型      |说明                            |
|:----------:|:------:|:-------:|:------------------------------:|
|method      |Y       |string   |方法 getAllPreassemblyByProId    |
|proid       |Y       |string   |编号                             |

### 根据项目编号获取组装信息返回示例

```json
{
  "status": 0,
  "data": {
    "preassemblies": [
      {
        "paid": "00000000004",
        "assdate": "2020-12-07 20:08:11",
        "complete": 0,
        "require": "frdsf",
        "proid": "00000000003"
      },
      {
        "paid": "00000000003",
        "assdate": "2020-12-08 20:07:54",
        "mainid": "00000000004",
        "complete": 1,
        "require": "frewrer",
        "proid": "00000000003"
      }
    ]
  }
}
```

## 42. 添加组装信息

### 添加组装信息请求URL

> <http://localhost:8080/xtuproject/PreassemblyServlet>

### 添加组装信息请求方式

> POST

### 添加组装信息参数类型

|参数        |是否必选 |类型      |说明                            |
|:----------:|:------:|:-------:|:------------------------------:|
|method      |Y       |string   |方法 insertPreassembly           |
|paid        |Y       |string   |编号                             |
|assdate     |Y       |string   |组装日期                         |
|mainid      |Y       |string   |主钢构编号                       |
|complete    |Y       |int      |完成情况                         |
|proid       |Y       |string   |项目编号                         |
|require     |Y       |string   |要求                             |

### 添加组装信息返回示例

```json
// 成功
{
  "status": 0,
  "msg": "添加成功!"
}
// 失败
{
  "status": 1,
  "msg": "添加失败!"
}
// 失败
{
  "status": 1,
  "msg": "编号重复!"
}
```

## 43. 修改组装信息

### 修改组装信息请求URL

> <http://localhost:8080/xtuproject/PreassemblyServlet>

### 修改组装信息请求方式

> POST

### 修改组装信息参数类型

|参数        |是否必选 |类型      |说明                            |
|:----------:|:------:|:-------:|:------------------------------:|
|method      |Y       |string   |方法 updatePreassembly           |
|paid        |Y       |string   |编号                             |
|assdate     |Y       |string   |组装日期                         |
|mainid      |Y       |string   |主钢构编号                       |
|complete    |Y       |int      |完成情况                         |
|proid       |Y       |string   |项目编号                         |
|require     |Y       |string   |要求                             |
|oldPaid     |Y       |string   |旧的编号                         |

### 修改组装信息返回示例

```json
// 成功
{
  "status": 0,
  "msg": "修改成功!"
}
// 失败
{
  "status": 1,
  "msg": "修改失败!"
}
// 失败
{
  "status": 1,
  "msg": "编号重复!"
}
```

## 44. 修改组装完成状态

### 修改组装完成状态请求URL

> <http://localhost:8080/xtuproject/PreassemblyServlet>

### 修改组装完成状态请求方式

> POST

### 修改组装完成状态参数类型

|参数        |是否必选 |类型      |说明                            |
|:----------:|:------:|:-------:|:------------------------------:|
|method      |Y       |string   |方法 updatePreassemblyState      |
|paid        |Y       |string   |编号                             |
|complete    |Y       |int      |完成情况                         |

### 修改组装完成状态返回示例

```json
// 成功
{
  "status": 0,
  "msg": "修改成功!"
}
// 失败
{
  "status": 1,
  "msg": "修改失败!"
}
```

## 45. 删除组装信息

### 删除组装信息请求URL

> <http://localhost:8080/xtuproject/PreassemblyServlet>

### 删除组装信息请求方式

> POST

### 删除组装信息参数类型

|参数        |是否必选 |类型      |说明                            |
|:----------:|:------:|:-------:|:------------------------------:|
|method      |Y       |string   |方法 removePreassembly           |
|paid        |Y       |string   |编号                             |

### 删除组装信息返回示例

```json
// 成功
{
  "status": 0,
  "msg": "删除成功!"
}
// 失败
{
  "status": 1,
  "msg": "删除失败!"
}
```

## 46. 将主钢构导出为excel

### 将主钢构导出为excel请求URL

> <http://localhost:8080/xtuproject/MainServlet>

### 将主钢构导出为excel请求方式

> POST

### 将主钢构导出为excel参数类型

|参数        |是否必选 |类型      |说明                            |
|:----------:|:------:|:-------:|:------------------------------:|
|method      |Y       |string   |方法 exportAllMain              |

## 47. 将零件导出为excel

### 将零件导出为excel请求URL

> <http://localhost:8080/xtuproject/PartServlet>

### 将零件导出为excel请求方式

> POST

### 将零件导出为excel参数类型

|参数        |是否必选 |类型      |说明                            |
|:----------:|:------:|:-------:|:------------------------------:|
|method      |Y       |string   |方法 exportAllPart              |