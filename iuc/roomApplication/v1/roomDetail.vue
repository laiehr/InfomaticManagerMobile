<template>
	<view id="room-detail">
		<cu-custom bgColor="bg-informatic-brown" isBack>
			<block slot="backText">返回</block>
			<block slot="content">实验室详细信息</block>
		</cu-custom>
		<labInfoCard class="margin-lr" :lab="labInfo"></labInfoCard>
		<scroll-view scroll-x class="bg-white nav text-center cardPosition shadow" :style="[{height:customBar + 'px'}]">
			<view class="cu-item" :class="index==tabCur?'text-informatic-brown text-bold cur':''" v-for="(item,index) in arrays" :key="index" @tap="tabSelect" :data-id="index">
				{{item}}
			</view>
		</scroll-view>
		<view class="margin-tb bg-white text-center padding-tb" v-if="tabCur==0">
			<text>0暂无内容</text>
		</view>
		<view class="margin-tb bg-white cu-list menu" v-else-if="tabCur==1">
			<view class="cu-item" v-for="(item,index) in applicationData" :key="index">
				<text>申请人：{{item.Owner}}\n申请原因：{{item.ApplicationReason}}\n申请时段：{{item.StartDate.slice(5)}}-{{item.EndDate.slice(5)}}</text>
				<view class="cu-tag round sm" :class="'bg-' + wColor[item.State]">{{ workflow[item.State] }}</view>
			</view>
		</view>
		<view class="padding flex flex-direction" @click="create()">
			<button class="cu-btn bg-blue lg">申请</button>
		</view>
	</view>
</template>

<script>
	let app = require("@/config");
	let enums = require("../enumsv1.js");
	export default{
		onLoad(opt) {
			this.labInfo.ID = opt.id;
			this.getData();
			uni.getStorage({
				key: 'buildingDic',
				success: res =>{
					this.buildingDic = res.data;
				}
			})
		},
		methods:{
			tabSelect(e) {
				this.tabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			create() {
				if(app.checkPermission("ItemManager.CreateSoftwareInstallWorkflow")==-1)
				{
					uni.showToast({
						title: "您没有权限",
						icon: "none"
					})
					return;
				};
				uni.navigateTo({
					url: "./create?buildingID="+this.labInfo.BuildingId+"&roomID="+this.labInfo.ID+"&BuildingName="+this.labInfo.Building.Name+"&labName="+this.labInfo.Name
				})
			},
			getData(){
				if (!this.labInfo.ID) return;
				uni.post("/api/building/GetRoom", { ID: this.labInfo.ID }, msg => {
					this.labInfo = msg.data;
				});
				uni.post("/api/roomApp/v1/GetApplicationByRoom",{ ID: this.labInfo.ID },msg=>{
					this.applicationData = msg.data;
				})
			}
		},
		data(){
			return{
				workflow: enums.workflow,
				wColor: enums.workflowColor,
				roomType: enums.roomType,
				arrays: [
					"时间安排表",
					"申请记录"
				],
				tabCur: 0,
				scrollLeft: 0,
				labInfo: {
					ID: "",
					Name: "",
					BuildingId: "",
					Building: "",
					administrator: "",
					AdminTelephone: "",
					SecurityOfficer: "",
					SOTelephone: "",
					displayOrder: "",
					CreatedOn: "",
					RoomType: ""
				},
				applicationData: [],
				icon: '../../../static/XMU.png',
				buildingDic: {},
				customBar: this.CustomBar,
				labs:[]
			}
		}
	}
</script>

<style>
	.cardPosition
	{
		z-index: 100;
		position: sticky;
		top: 90rpx;
	}
</style>
