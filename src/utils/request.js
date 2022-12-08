import store from '@/store';


/**
 * 发送请求
 * @param {*} url 
 * @param {*} method 
 * @param {*} data 
 * @param {*} param3 
 * @param {*} params 
 * @returns 
 */
function baseRequest(url, method, data, {
	noAuth = false,
	noVerify = false
}, params) {
	let header = {
		'content-type': 'application/json'
    }

	if (params != undefined) {
		header = {'content-type': 'application/x-www-form-urlencoded'};
	}

	if (!noAuth) {
		//登录过期自动登录
		if (!store.state.user.token) {
			// toLogin();
			return Promise.reject({
				msg: '未登录'
			});
		}
	}
    // 请求头携带token
	if (store.state.user.token) header[process.env.VUE_APP_TOKENNAME] = store.state.user.token;
    
	return new Promise((reslove, reject) => {
		uni.request({
			url: process.env.VUE_APP_INTERFACE_ADDR + url,
			method: method || 'GET',
			header: header,
			data: data || {},
			success: (res) => {
				if (noVerify)
					reslove(res.data, res);
				else if (res.data.code == 200)
					reslove(res.data, res);
				else if ([401].indexOf(res.data.code) !== -1) { // 接口没有权限时返回登录
					uni.navigateTo({
						url: '/pages/login/index'
					})
					reject(res.data);
				} else
					reject(res.data.message || '系统错误');
			},
			fail: (msg) => {
				reject('请求失败');
			}
		})
	});
}

const request = {};

['options', 'get', 'post', 'put', 'head', 'delete', 'trace', 'connect'].forEach((method) => {
	request[method] = (api, data, opt, params) => baseRequest(api, method, data, opt || {}, params)
});



export default request;