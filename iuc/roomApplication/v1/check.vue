<template>
	<view id="lab-apply-check">
		<cu-custom bgColor="bg-informatic-brown" isBack>
			<block slot="backText">返回</block>
			<block slot="content">指导老师审核</block>
		</cu-custom>
		<lab-Steps v-model="model" />
		<form>
			<view class="cu-form-group margin-top">
				<view class="title">申请人</view>
				<input :value="model.Owner" disabled />
			</view>
			<view class="cu-form-group">
				<view class="title">申请原因</view>
				<input :value="model.ApplicationReason" disabled />
			</view>
			<view class="cu-form-group">
				<view class="title">起止时间</view>
				<input :value="time" disabled />
			</view>
			<view class="cu-form-group margin-bottom solids-bottom">
				<view class="title">申请房间号</view>
				<input :value="model.RoomName" disabled />
			</view>
		</form>
		<view class="cu-bar bg-white solids-bottom">
			<view class="action text-xl">
				<text class="cuIcon-title text-blue text-xl"></text>
				<text class="text-bold text-xl">操作流程</text>
			</view>
			<view class="action" @click="foldUp">
				<text class="text-df">{{displayTimeline?'收起':'展开'}}</text>
				<text class="padding-lr-xs text-bold" :class="displayTimeline?'cuIcon-fold':'cuIcon-unfold'"></text>
			</view>
		</view>
		<labTimeLine :timeline="timeline" v-show="displayTimeline"></labTimeLine>
		<view class="action-list cu-list grid col-2 margin-top">
			<view class="cu-item" @click="submit('通过')">
				<view class="cuIcon-roundcheckfill text-green"></view>
				<text>审核通过</text>
			</view>
			<view class="cu-item" @click="submit('修改')">
				<view class="cuIcon-writefill text-red"></view>
				<text>退回修改</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: "",
				model: {},
				time: "",
				timeline: {},
				displayTimeline: false
			}
		},
		onLoad(opt) {
			this.id = opt.id;
			this.getData(this.id);
		},
		methods: {
			submit(opinion) {
				let id = this.id;
				if (opinion == '通过') {
					uni.post("/api/roomApp/v1/GuidTeacherChecking", {
						ID: id,
						GuideTeacherOpinion: opinion
					}, msg => {
						if (msg.success) {
							uni.showToast({
								title: '通过成功'
							});
							setTimeout(function() {
								uni.navigateBack({});
								uni.hideToast();
							}, 1500);
						}
					})
				} else if (opinion == '修改') {
					let id = this.id;
					uni.showModal({
						title: "是否确认修改",
						success: function(res) {
							if (res.confirm) {
								uni.post("/api/roomApp/v1/GuidTeacherChecking", {
									ID: id,
									GuideTeacherOpinion: opinion
								}, msg => {
									if (msg.success) {
										uni.showToast({
											title: '修改成功'
										})
										setTimeout(function() {
											uni.navigateBack({});
											uni.hideToast();
										}, 1500);
									}
								});
							}
						}
					})
				}
			},
			getData(id) {
				uni.post("/api/roomApp/v1/GetApplication", {
					id: id
				}, msg => {
					if (msg.success) {
						this.timeline = msg.timeline;
						this.model = msg.data;
						this.TimeCombine();
					}
				})
			},
			TimeCombine() {
				this.time = this.model.StartDate + " — " + this.model.EndDate;
			},
			foldUp(){
				this.displayTimeline=!this.displayTimeline;
			}
		}
	}
</script>

<style>

</style>
