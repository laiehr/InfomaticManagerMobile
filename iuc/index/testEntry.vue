<template>
	<view class="flex flex-direction padding">
		<a href="javascript:;" class="cu-btn bg-green lg margin-top" @click="go('5516da53-739f-454a-a3a9-7e7824987a6d','roomApplication')">以普通学生身份登录</a>
		<a href="javascript:;" class="cu-btn bg-green lg margin-top" @click="go('d9824e8c-c998-45e2-8156-34d723049855','roomApplication')">以普通老师身份登录</a>
		<a href="javascript:;" class="cu-btn bg-green lg margin-top" @click="go('99cf2fcb-c7d9-4773-8cc2-b157157a7ee4','roomApplication')">以分管领导身份登录</a>
		<a href="javascript:;" class="cu-btn bg-green lg margin-top" @click="go('b15f7cdb-9f96-4041-a7b2-4cfeebabaa8d','roomApplication')">以实验室管理员身份登录</a>
		<a href="javascript:;" class="cu-btn bg-blue lg margin-top" @click="goCreate">列表页面</a>
		<a href="javascript:;" class="cu-btn bg-blue lg margin-top" @click="go('44213f8a-c90a-422b-88c0-815f4de5a000','softwareInstall')">以管理员身份登录</a>
		<a href="javascript:;" class="cu-btn bg-blue lg margin-top" @click="go('d9824e8c-c998-45e2-8156-34d723049855','softwareInstall')">以普通老师身份登录</a>
		<a href="javascript:;" class="cu-btn bg-blue lg margin-top" @click="go('8094cf84-01e6-484d-bb01-04a299f5ef5b','softwareInstall')">以维修者主管身份登录</a>
		<a href="javascript:;" class="cu-btn bg-blue lg margin-top" @click="go('b15f7cdb-9f96-4041-a7b2-4cfeebabaa8d','softwareInstall')">以普通维修者身份登录</a>
		<button @click="clear">清空缓存</button>
	</view>
</template>

<script>
	let app = require("@/config");
	export default {
		methods: {
			goCreate() {
				uni.navigateTo({
					url: "/iuc/softwareInstall/v1/list"
				})
			},
			go(id, where) {
				uni.post("/uc/getCurrentUserGuid", {
					id
				}, msg => {
					uni.setStorage({
						key: 'currentUserGuid',
						data: msg.currentUserGuid,
					});
					app.currentUserGuid = msg.currentUserGuid;
					app.userInfo = msg.userInfo;
					let ps = app.userInfo.permissons;
					app.checkPermission = (p) => {
						return ps && ps.indexOf(p) >= 0;
					};
					if (where == 'softwareInstall') {
						uni.navigateTo({
							url: "/iuc/" + where + "/v1/list"
						})
					} else if (where == 'roomApplication') {
						uni.navigateBack({
							
						});
					}
				});
			},
			clear() {
				uni.clearStorage();
				uni.navigateBack({
					
				});
			}
		},
		data() {
			return {
				app
			}
		}
	}
</script>

<style lang="less">
</style>
