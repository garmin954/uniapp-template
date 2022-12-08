
import Storage from '@/utils/storage';

const state = {
	token: Storage.get('TOKEN') || '',
	userInfo: Storage.get('USER_INFO'),
};

const mutations = {
	LOGIN(state, token) {
		console.log(token);
		state.token = token;
		Storage.set("TOKEN", token, 60*24*7);
	},
	UPDATE_LOGIN(state, token) {
		state.token = token;
	},
	LOGOUT(state) {
		state.token = undefined;
		state.uid = undefined
		Storage.remove("TOKEN");
		Storage.remove("UID");
		Storage.remove("USER_INFO");
	},
	UPDATE_USERINFO(state, userInfo) {
		state.userInfo = userInfo;
		Storage.set("USER_INFO", userInfo);
	},

};

const actions = {
	USERINFO({
		state,
		commit
	}, data) {
		commit('LOGIN', data.token)
		commit('UPDATE_USERINFO', data.user_info)
	},
	LOGOUT_STATUS({
		state,
		commit
	}, data) {
		commit('LOGOUT')
		uni.navigateTo({
			url: '/pages/login/index'
		})
	},
};

export default {
	state,
	mutations,
	actions
};