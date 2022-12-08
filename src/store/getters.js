export default {
	token: state => {
		return state.user.token
	},
	isLogin: state => !!state.user.token,
	userInfo: state => state.user.userInfo || {},
	uid: state => state.user.uid,
};