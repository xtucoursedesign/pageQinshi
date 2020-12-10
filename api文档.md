# 接口文档

## 附录

1. 公共请求参数

------------------------------------------------------------

> 每个接口需要的Header参数值（登录接口不需要）

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

```json
2. 添加用户
3. 更新用户
4. 获取所有用户列表
5. 删除用户
6. 获取分类列表
7. 添加分类
8. 更新分类名称
9. 根据分类ID获取分类
10. 获取商品分页列表
11. 根据name/desc搜索产品分页列表
12. 根据商品ID获取商品
13. 添加商品
14. 更新商品
15. 对商品进行上架/下架处理
16. 上传图片
17. 删除图片
18. 添加角色
19. 获取角色列表
20. 更新角色(给角色设置权限)

```

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
