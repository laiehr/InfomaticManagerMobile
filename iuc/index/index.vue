<template>
	<view>
		<swiper class="screen-swiper" autoplay="true" indicator-dots="true" indicator-active-color="white" indicator-color="grey"
		 circular="true">
			<swiper-item v-for='(item,index) in swiperList' :key='index'>
				<image :src="item"></image>
			</swiper-item>
		</swiper>
		<view class="bg-white flex solids-bottom padding-tb-sm justify-between align-center">
			<view class="margin-left text-xl">
				<text class="cuIcon-notification"></text>
				<text class="text-bold margin-lr-xs">通知公告</text>
			</view>
			<swiper style="height: 40rpx;width: 250rpx;" class="swiper" autoplay="true" interval="4000" duration="500" circular="true"
			 vertical="true">
				<swiper-item v-for="(item,index) in swiperArray" :key='index'>{{item}}</swiper-item>
			</swiper>
			<view class="margin-right text-informatic-brown" @click="navToNews">查看更多<text class="cuIcon-playfill"></text></view>
		</view>
		<view class="padding-bottom bg-white">
			<view class="cu-bar bg-white">
				<view class="action">
					<text class="text-bold text-xl">我的</text>
				</view>
				<view class="action text-informatic-brown" @click="mineClick()">{{mineShow ? "收起" : "展开"}}<text :class="mineShow ? 'cuIcon-triangleupfill' : 'cuIcon-triangledownfill'"
					 style="font-size:25px;"></text></view>
			</view>
			<view class="cu-list grid col-3 no-border" v-show="mineShow">
				<view v-if="p(item.permission)" class="cu-item" v-for='(item,index) in mine' :key='index' @click="navTo(item.source)">
					<view>
						<image :src="item.image" class="cu-avatar bg-white lg" mode="aspectFit"></image>
					</view>
					<text class="text-df">{{item.text}}</text>
				</view>
			</view>
		</view>
		<view>
			<view class="cu-bar bg-white">
				<view class="action">
					<text class="text-bold text-xl">功能</text>
				</view>
				<view class="action text-informatic-brown" @click="functionClick">{{functionshow ? "收起" : "展开"}}<text :class="functionshow ? 'cuIcon-triangleupfill' : 'cuIcon-triangledownfill'"
					 style="font-size:25px;"></text></view>
			</view>
			<view class="cu-list grid col-3 no-border" v-show="functionshow">
				<view v-if="p(item.permission)" class="cu-item" v-for='(item,index) in functionList' :key='index' @click="navTo(item.source)">
					<view>
						<image :src="item.image" class="cu-avatar bg-white lg" mode="aspectFit"></image>
					</view>
					<text>{{item.text}}</text>
				</view>
			</view>
		</view>
		<navTab :selection='0' />
	</view>
</template>

<script>
	let app = require("@/config");
	export default {
		onLoad() {
			console.log(!-1);
		},
		data() {
			return {
				swiperArray: [
					"实验室管理系统",
					"开通新功能啦~",
					"新功能炸啦！"
				],
				swiperList: {
					img1: "../../static/轮播图片画板1.jpg",
					img2: "../../static/轮播图片画板2.jpg",
					img3: "../../static/轮播图片画板3.jpg"
				},
				mine: [{
						image: "../../static/我的申请.png",
						text: "我的申请",
						source: "../roomApplication/v1/myList"
					},
					{
						image: "../../static/我的待办.png",
						text: "我的待办",
						source: "../roomApplication/v1/list",
					},
					{
						image: "../../static/我的参与.png",
						text: "我的参与",
						source: "../roomApplication/v1/myInvolve",
					}
				],
				functionList: [{
						image: "../../static/实验室列表.png",
						text: "实验室列表",
						source: "../roomApplication/v1/labList"
					},
					{
						image: "../../static/实验室申请.png",
						text: "申请实验室",
						source: "../roomApplication/v1/create",
						permission: "ItemManager.CreateRoomApplicationWorkflow"
					},
					{
						image: "../../static/实验室列表.png",
						text: "所有申请",
						source: "../roomApplication/v1/alllist"
					},

				],
				mineShow: true,
				functionshow: true
			}
		},
		methods: {
			functionClick() {
				this.functionshow = !this.functionshow;
			},
			mineClick() {
				this.mineShow = !this.mineShow;
			},
			navTo(url) {
				uni.navigateTo({
					url: url
				})
			},
			navToNews() {
				uni.navigateTo({
					url: '../News/newsList'
				})
			},
			p: e => {
				return e ? app.checkPermission(e) : true;
			}
		}
	}
</script>

<style lang="scss">

</style>
