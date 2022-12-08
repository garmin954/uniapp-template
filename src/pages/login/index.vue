<template>
	<view class="content">
		<u-loading mode="circle" v-if="isLogin"></u-loading>
		<view v-else>
			<u-form :model="form" ref="uForm">
			<u-form-item label="账号"><u-input v-model="form.username" /></u-form-item>
			<u-form-item label="密码"><u-input v-model="form.password" type="password" /></u-form-item>
		</u-form>
		<u-button @click="submitLogin" type="info" style="width:500rpx">提交</u-button>
		</view>
	</view>
</template>

<script>
import { loginApi } from '@/api';
import { mapGetters } from "vuex";
import { debounce } from "@/utils/common";

	export default {
		data() {
			return {
				form: {
					username: 'user1',
					password: '123456'
				}
			}
		},
		onLoad() {
			this.isLogin && this.toHome()
		},
		computed:{
			...mapGetters(['isLogin'])
		},
		methods: {
			toHome(){
				uni.switchTab({
					url: '/pages/index/index'
				})
			},
			submitLogin: debounce(function () {
				// TODO 表单验证

				console.log('submitLogin');
				loginApi({...this.form}).then(response=>{
					console.log(response);
					if (response.code == 200) {
						this.$store.dispatch('USERINFO', response.data)
						uni.showToast({
							title: '登录成功！'
						})
						this.toHome()
					}else{

						uni.showToast({
							title:'登录失败!'
						})
					}
				})
			}, 500)
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin-top: 300rpx
	}
</style>
