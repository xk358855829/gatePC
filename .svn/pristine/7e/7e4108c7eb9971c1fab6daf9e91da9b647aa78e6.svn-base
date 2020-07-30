import axios from 'axios'
import store from '@/store/index.js'

import { Message } from 'element-ui'
const http = {}

var instance = axios.create({
    timeout: 5000
})

// post请求头
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

// 添加请求拦截器
instance.interceptors.request.use(
    function (config) {
        // 请求头添加token
        if (config.url.indexOf("/webUser/login") == -1) {
            // config.headers.token = 'daaba32e0b3b296bd5331af9320feefe'
        }
        return config
    },
    function (error) {
        return Promise.reject(error)
    }
)

// 响应拦截器即异常处理
instance.interceptors.response.use(
    response => {
        return response.data
    },
    err => {
        if (err && err.response) {
        } else {
            err.message = '连接服务器失败'
        }
        // Message.error({
        //     message: err.message
        // })
        return Promise.reject(err.response)
    }
)

http.get = function (url, options) {
    return new Promise((resolve, reject) => {
        instance
            .get(url, options)
            .then(response => {
                resolve(response)
            })
            .catch(e => {
                console.log(e)
            })
    })
}

http.post = function (url, data) {
    return new Promise((resolve, reject) => {
        instance
            .post(url, data)
            .then(response => {
                console.log(response)
                resolve(response)
            })
            .catch(e => {
                console.log(e)
            })
    })
}

export default http
