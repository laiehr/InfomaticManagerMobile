<template>
	<view id="lab-apply-detail">
		<cu-custom bgColor="bg-informatic-brown" isBack>
			<block slot="backText">返回</block>
			<block slot="content">实验室申请表</block>
		</cu-custom>
		<lab-Steps v-model="model" />
		<view class="action-list cu-list grid col-2 margin-top">
			<view class="cu-item" @click="changeState()">
				<view class="text-blue" :class="state === 'detail' ? 'cuIcon-timefill' : 'cuIcon-form'"></view>
				<text>{{ state === 'detail' ? '流程跟踪' : "查看申请表" }}</text>
			</view> 
			<view class="cu-item" v-if="!currentStep.completed && (isAdmin || isMyStep)" @click="exeStep()">
				<view class="cuIcon-qrcode text-blue"></view>
				<text>执行步骤</text>
			</view>
		</view>
		<view v-show="state === 'detail'" class="margin-tb">
			<!--申请表-->
			<view class="cu-form-group">
				<view class="title">申请人</view>
				<input :value="model.Owner" disabled />
			</view>
			<view class="cu-form-group">
				<view class="title">申请事由</view>
				<input :value="model.ApplicationReason" disabled />
			</view>
			<view class="cu-form-group">
				<view class="title">起止时间</view>
				<input disabled="true" :value="model.CreatedTime+'-'+model.EndDate"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">申请房间号</view>
				<input :value="model.RoomName" disabled />
			</view>
			<view class="cu-form-group">
				<view class="title">指导老师</view>
				<input :value="model.GuideTeacher" disabled />
			</view>
			<!--view class="cu-form-group">
				<view class="title">审核时间</view>
				<input :value="model.GuideTeacherTime" disabled />
			</view>
			<view class="cu-form-group margin-top">
				<view class="title">管理员</view>
				<input :value="model.HandlerName" disabled />
			</view>
			<view class="cu-form-group">
				<view class="title">确认时间</view>
				<input :value="model.HandleTime" disabled />
			</view-->
		</view>
		<view v-show="state === 'timeline'" class="margin-tb">
			<labTimeLine :timeline="timeline" />
		</view>
	</view>
</template>

<script>
	let guidEmpty = '00000000-0000-0000-0000-000000000000';
	let app = require("@/config");
	export default {
		onLoad(opt) {
			this.id = opt.id;
			this.getData();
		},
		methods: {
			getData() {
				let id = this.id;
				if (!id || id === guidEmpty) {
					uni.navigateTo({
						url: '/iuc/roomApplication/v1/list'
					})
					return;
				};
				uni.post("/api/roomApp/v1/GetApplication", {
					id
				}, msg => {
					this.model = msg.data;
					this.timeline = msg.timeline;
					this.currentStep = msg.currentStep;
					this.isMyStep = msg.currentStep.IsMyStep;
				});
			},
			changeState() {
				this.state = this.state === "detail" ? "timeline" : "detail";
			},
			exeStep() {
				uni.navigateTo({
					url: this.currentStep.ToAction
				})
			}
		},
		data() {
			return {
				id: guidEmpty,
				isloading: false,
				isAdmin: app.checkPermission("ItemManager.ManageAllSoftwareInstallWorkflow"),
				isMyStep: false,
				model: {},
				timeline: [],
				currentStep: {},
				state: "detail"
			};
		}
	}
</script>

<style lang='less'>
	#lab-apply-detail {
		view .title {
			width: 6em;
		}
	}

	.cu-timeline>.cu-item::after {
		content: "";
		display: block;
		position: absolute;
		width: 4upx; //加粗使得左边直线能够被看见
		background-color: #ddd;
		left: 60upx;
		height: 100%;
		top: 0;
		z-index: 8;
	}
</style>
