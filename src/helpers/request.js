import axios from 'axios'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.baseURL = 'https://note-server.hunger-valley.com/'
axios.defaults.withCredentials = true //是否使用跨域请求

export default function request(url, type = "GET", data = {}) {
    return new Promise((resolve, reject) => {
        let option = {
            url,
            method: type,
            validateStatus(status) {
                return (status >= 200 && status < 300) || status === 400
            }
        }
        if (type.toLowerCase() === 'get') {
            option.params = data
        } else {
            option.data = data
        }
        axios(option).then(res => {
            if (res.status === 200) {
                resolve(res.data)
            } else {
                console.error(res.data)
                reject(res.data)
            }
        }).catch(err => {
            console.error({ msg: '网络异常' })
            reject({ msg: '网络异常' })
        })
    })
}
// request('/auth/login', 'POST', { username: 'hunger', password: '123456' })
//     .then(data => {
//         console.log(data)
//     })