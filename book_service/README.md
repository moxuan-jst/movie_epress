# 电影网站项目练习

> 此项目使用`express`框架搭建后台服务器，使用vue前端框架搭建前端，使用`mongodb`数据库存储数据。

### 安装
```bash
npm install 

DEBUG=book-service:* npm start
```

### 搭建日志

#### 2020-01-01
- 后台API开发
  - checkAdminPower 方法未完成。
  - 在真实环境中，对数据的删除最好使用回收站机制，使回收的数据进行暂存而不是直接删除数据，以便数据可以进行回档和保存。
  

#### 2019-12-19
- 路由接口
  - 评论接口BUG
    - 虽然判断评论为空，但是数据还是会提交到数据库。
  - 点赞接口
    - 有问题，估计后台接口没有开发完毕
  - 下载接口
    - 有问题，同上
  - 站内信接口完成
- 前台API开发

总结：首先需要明确需求，然后添加数据集，添加方法，再执行各种操作。  


#### 2019-12-18

- 用户系统开发
  - 路由接口开发
  所有相关API的返回数据格式均为JOSN格式，其数据结构为：
  ```js
  {
      status:(此次请求的错误情况， 1为出错，0为正常)，
      meg: (提示信息)，
      data: (需要传送的数据)
  }
  ```
  - 密码未加密
  - 粗心导致数据有，但是无法更新
    - `nModified`：数据库操作数量

#### 2019-12-17

- 使用脚手架初始化项目
    ```bash
    npm init -y
    npm install express-generator -g
    ```
- 练习项目初始化
  ```bash
  express book_service
  cd book_service
  npm install 
  # 启动项目
  DEBUG=book-service:* npm start 
  ```
- 目录结构
  - bin：文件家中包含的`www.js`包含对启动项目的一些测试服务器的配置。
  - node_models：npm安装依赖目录。
  - public：本系统相关的静态资源。
  - routes：项目的全部代码和路由内容
  - views：`.jade`文件为在routes文件夹下的逻辑代码代用的相关模板文件。由于使用vue，所以可以不需要使用express的前台模板模板。
  - models：用户模块的操作。
  - common：通用模块。
- 连接数据库使用第三方中间件`mongoose`
  ```bash
  npm i mongoose -D
  ```
- 使用`supervisor`启动器热启动
  ```bash
  npm i supervisor -g
  supervisor bin/www
  ```

