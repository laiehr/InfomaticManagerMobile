<template>
	<view style="height: 100rpx;">
		<view class="cu-bar tabbar bg-white foot">
			<view v-for="(item,index) in tabInfo" class="action" :key="index" @click="navTo(item.nav)">
				<view :class="{'text-bold':index === selection,'text-informatic-brown':index === selection}">
					<text :class="item.icon"></text>
					<text class="text-df">{{item.text}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			selection: {
				required: true,
				type: Number
			}
		},
		methods: {
			navTo(url) {
				uni.redirectTo({
					url: url
				})
			}
		},
		data() {
			return {
				tabInfo: [{
						icon: 'cuIcon-home',
						text: '主页',
						nav: '../../iuc/index/index'
					},
					{
						icon: 'cuIcon-notice',
						text: '通知公告',
						nav: '../../iuc/News/newsList'
					},
					{
						icon: 'cuIcon-notice',
						text: '待开发',
						nav: ''
					},
					{
						icon: 'cuIcon-my',
						text: '我的',
						nav: '../profile/profile'
					}
				],
			}
		}
	}
</script>

<style>
</style>
