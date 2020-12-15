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

文件本身

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
        "url": "/image/51abcca6ea4049498834aadfa2772dc52_milkdue.jpg"
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
|pid         |Y       |string   |零件编号                         |

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
|mid         |Y       |string   |零件编号                         |
|name        |Y       |string   |零件名字                         |
|material    |Y       |string   |零件材料                         |
|specifi     |Y       |string   |零件规格                         |
|texture     |Y       |string   |零件材质                         |
|weight      |Y       |string   |零件重量                         |
|img         |Y       |string   |零件图片json串格式               |
|unit        |Y       |string   |零件单位                         |

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
|mid         |Y       |string   |零件编号                         |
|name        |Y       |string   |零件名字                         |
|material    |Y       |string   |零件材料                         |
|specifi     |Y       |string   |零件规格                         |
|texture     |Y       |string   |零件材质                         |
|weight      |Y       |string   |零件重量                         |
|img         |Y       |string   |零件图片json串格式               |
|unit        |Y       |string   |零件单位                         |
|oldPid      |Y       |string   |旧的零件编号                     |

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