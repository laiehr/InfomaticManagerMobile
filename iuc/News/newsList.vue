<template>
	<view>
		<cu-custom bgColor="bg-informatic-brown" isBack>
			<block slot="backText">返回</block>
			<block slot="content">通知公告</block>
		</cu-custom>
		<view :key="index" v-for="(item,index) in news" @click="toDetail()">
			<view class="solids-bottom padding" style="background-color: white;" v-if="item.photo.length==0">
				<view class="padding-bottom-xs">
					<text class="text-xxl">{{item.title}}</text>
				</view>
				<view class="text-grey">
					<text class="text-df margin-right-sm">{{item.author}}</text>
					<text class="text-df">{{item.date}}</text>
				</view>
			</view>
			<view class="solids-bottom flex" style="background-color: white;" v-if="item.photo.length==1">
				<view class="flex-twice padding">
					<view class="margin-bottom-sm ">
							<text class="text-xxl">{{item.title}}</text>
					</view>
					<view class="text-grey">
						<text class="text-df margin-right-sm">{{item.author}}</text>
						<text class="text-df">{{item.date}}</text>
					</view>
				</view>
				<image class=" margin-top-lg margin-right flex-sub" mode="widthFix" :src="item.photo[0].name" ></image>
			</view>
			<view class="solids-bottom padding" style="background-color: white;" v-if="item.photo.length==3">
				<text class="text-xxl ">{{item.title}}</text>
				<view class="flex margin-tb-sm" >
					<image class="margin-lr-xs" mode="widthFix" :src="item.photo[0].name" ></image>
					<image class="margin-lr-xs" mode="widthFix" :src="item.photo[1].name" ></image>
					<image class="margin-lr-xs" mode="widthFix" :src="item.photo[2].name" ></image>
				</view>
				<view class="text-grey">
					<text class="text-df margin-right-sm">{{item.author}}</text>
					<text class="text-df">{{item.date}}</text>
				</view>
			</view>
		</view>
		<navTab :selection='1' />
	</view>
</template>

<script>
	export default {
		data() {
			return{
				TabCur: 0,
				tabNav:[
					"学校新闻",
					"学院公告",
					"实验室公告",
					"综合公告",
					"平台通知",
					"党团通知",
				],
				news:[
					{title:'学校任命学院党委班子',photo:[],date:'2019-11-13',author:'信息学院'},
					{title:'关于“‘两学一做’易起来”专栏投稿的通知',photo:[{name:'../../static/banner.jpg'}],date:'2019-09-24',author:'信息学院'},
					{title:'【学生交流】转发SAF关于2020年寒假加州大学洛杉矶分校大数据项目的通知',photo:[{name:'../../static/banner.jpg'},{name:'../../static/banner.jpg'},{name:'../../static/banner.jpg'}],date:'2019-09-24',author:'信息学院'},
					{title:'关于“‘两学一做’易起来”专栏投稿的通知',photo:[{name:'../../static/banner.jpg'}],date:'2019-09-24',author:'信息学院'},
					{title:'信息学院举行 “不忘初心、牢记使命”主题教育动员部署会',photo:[{name:'../../static/banner.jpg'},{name:'../../static/banner.jpg'},{name:'../../static/banner.jpg'}],date:'2019-08-28',author:'信息学院'},
				]
			}
		},
		methods:{
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
			},
			toDetail() {
				uni.navigateTo({
					url: "./newsDetail"
				})
			}
		}
	}
</script>

<style>
</style>
