
axios.defaults.baseURL = 'http://localhost:4000/api/';

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    config.timeout = 5000; // 设置超时时间 5s
    return config;
  }, function (error) {
    // 对错误做些什么
    return Promise.reject(error);
});

// 响应拦截器
axios.interceptors.response.use(function (response) {
    console.log('响应拦截器')
    let status = response.status;
    if((status >= 200 && status<300) ||  status == 304 ){
        let {errcode,message} = response.data;
        switch(errcode){
            case 10002:
                // 弹窗提示用户 
                console.log(message)
                break;
            case 10003:
                // 弹窗提示用户 
                console.log(message)
                break;
            case 10004:
                // 弹窗提示用户 
                console.log(message)
                break;
            default:
                break;
        }
        return response.data;
    }else{
        // 失败 reject，传递参数响应对象response
        return Promise.reject(response);
    }
    
  }, function (error) {
    if(!error.response){
        return {message:'请求错误：如超时，地址写错'}
    }
    let status = error.response.status; 
    switch(status){
        case 401:
            // 打回登录
            console.log('401 没权限，打回登录页');
            break;
        case 404:
            console.log('404 请求错误，回首页');
            break;
        case 500:
            console.log('500 服务器异常');
            break;
        default:
            console.log('其他错误');
            break;
    }
     return Promise.reject(error);    
});

