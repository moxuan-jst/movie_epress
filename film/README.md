# 后台管理

> 电影网站的后台管理（vue）

## 开始构建

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

## 搭建日志

### 2020-01-30

- 完成首页美化

- 完成登录页美化

- 完成注册页美化

- 完成用户信息页美化

- 完成页脚美化

### 2020-01-29

- 构建首页信息

- 完成电影详情

- 完成新闻详情

- 完成用户登录

- 完成用户注册

- 完成用户信息

- 完成站内信发送

### 2020-01-01

- 开始构建

- 将所有代码上传git仓库

- 采用`vue-resource`进行网络请求

- 解决跨域问题

  - vue.js

    - 对于不支持跨域的服务器端的请求，可以使用`vue-resource`的`jsonp()`方法

      ```js
      this.$http.jsonp('url',[data], [options]).then(successCallback, errorCallback);
      ```

    - `jsonp()`不能发送post请求，不管是否跨域。

  - 服务端，在`app.js`中进行全路由的配置。

    ```js
    app.all('*', function(req, res, next){
    	res.header('Access-Control-Allow-Origin', '*');
    	res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With, yourHeaderFeild');
    	res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    	if(req.methods == 'OPTIONS'){
    		res.send(200);
    	}else{
    		next();
    	}
    });
    ```

