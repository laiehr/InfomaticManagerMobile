<template>
	<view id="lab-apply-list">
		<cu-custom bgColor="bg-informatic-brown" isBack>
			<block slot="backText">返回</block>
			<block slot="content">我的申请</block>
		</cu-custom>
		<transition-group class="cu-card" name="list">
			<view class="cu-item bg-informatic-brown shadow"
			v-for="(item,index) in data" :key="index" @click="toExecute(item)">
				<sticky :item="item" />
			</view>
		</transition-group>
		<template v-if="data.length===0">
			<view class="padding-tb text-center text-lg">
				<text class="text-bold text-gray">暂无数据</text>
			</view>
		</template>
	</view>
</template>

<script>
	let app = require("@/config");
	let enums = require("../enumsv1.js");
	export default {
		onShow() {
			this.getData(1);
		},
		onLoad() {
			
		},
		methods: {
			getData(p) {
				let page = p || this.page;
				let pageSize = this.pageSize;
				uni.post("/api/roomApp/v1/GetMyApplication", {
					page,
					pageSize
				}, msg => {
					if (msg.success) {
						this.data = msg.data;
						this.data = this.data.filter(e => e.State != 0);
					}
				})
			},
			toExecute(item) {
				uni.navigateTo({
					url: item.RouteData
				})
			}
		},
		data() {
			return {
				workflow: enums.workflow,
				wColor: enums.workflowColor,
				icon: app.webInfo.avatar,
				page: 1,
				pageSize: 10,
				data: [],
				modalName: null,
				listTouchStart: 0,
				listTouchDirection: null
			}
		}
	}
</script>
	
<style>
	.list-move{
		transition: all 0.8s;
	}
	.list-enter{
		opacity: 0;
		transform: translateY(-30px);
	}
	.list-leave-to{
		opacity: 0;
		transform: translateY(-30px);
	}
	
</style>
