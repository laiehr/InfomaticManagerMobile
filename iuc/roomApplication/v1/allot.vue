<template>
	<view id="lab-apply-allot">
		<cu-custom bgColor="bg-informatic-brown" isBack>
			<block slot="backText">返回</block>
			<block slot="content">分管领导分配</block>
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
			<view class="cu-form-group">
				<view class="title">申请房间号</view>
				<input :value="model.RoomName" disabled />
			</view>
			<view class="cu-form-group">
				<view class="title">指导老师</view>
				<input :value="model.GuideTeacher" disabled />
			</view>
			<view class="cu-form-group">
				<view class="title">机房管理员</view>
				<picker :range="array" :value="index" @change="managerChange">
					<view class="picker">{{array[index]}}</view>
				</picker>
			</view>
		</form>
		<view class="cu-bar bg-white solids-bottom margin-top">
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
		<view class="action-list cu-list grid col-3 margin-top margin-bottom">
			<view class="cu-item" @click="submit('确认')">
				<view class="cuIcon-roundcheckfill text-green"></view>
				<text>确认分配</text>
			</view>
			<view class="cu-item" @click="submit('修改')">
				<view class="cuIcon-writefill text-red"></view>
				<text>退回修改</text>
			</view>
			<view class="cu-item" @click="submit('无法')">
				<view class="cuIcon-roundclosefill text-red"></view>
				<text>取消流程</text>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		onLoad: function(opt) {
			this.ID = opt.id;
			this.getAssignData(this.ID);
			this.getData(this.ID);
		},
		data() {
			return {
				managerIDs: [],
				array: [],
				index: 0, //picker的数组
				ID: "", //申请表
				handlerId: "", //被分配的执行人ID
				model: {},
				assignModel: {},
				time: "",
				timeline: {},
				displayTimeline: false
			}
		},
		methods: {
			getAssignData(ID) {
				uni.post("/api/roomApp/v1/GetAssignApplication", {
					ID
				}, msg => {
					if (msg.success) {
						this.assignmodel = msg.data;
						this.setManager(msg);
					}
				})
			},
			getData(ID) {
				uni.post("/api/roomApp/v1/GetApplication", {
					ID
				}, msg => {
					if (msg.success) {
						this.model = msg.data;
						this.timeline = msg.timeline;
						this.timeCombine();
					}
				})

			},
			managerChange(e) {
				this.index = e.target.value;
				this.getManagerID(e.target.value);
			},
			submit(opinion) {
				if (opinion == '确认') {
					if (this.handlerId == "") {
						uni.showToast({
							title: "管理员不能为空"
						})
						return;
					}
					uni.post("/api/roomApp/v1/AssignForm", {
						ID: this.ID,
						HandlerId: this.handlerId,
						ReviewOpinion: opinion
					}, msg => {
						if (msg.success) {
							uni.showToast({
								title: '分配成功'
							})
							setTimeout(function() {
								uni.navigateBack({

								});
								uni.hideToast();
							}, 1500);
						}
					})
				} else if (opinion == '修改') {
					let id = this.ID;
					let handID = this.handlerId;
					uni.showModal({
						title: "是否确认修改",
						success: function(res) {
							if (res.confirm) {
								uni.post("/api/roomApp/v1/AssignForm", {
									ID: id,
									HandlerId: handID,
									ReviewOpinion: opinion
								}, msg => {
									if (msg.success) {
										uni.showToast({
											title: '修改成功'
										})
										setTimeout(function() {
											uni.navigateBack({

											});
											uni.hideToast();
										}, 1500);
									}
								})
							}
						}
					})
				} else if (opinion == '无法') {
					let id = this.ID;
					let handID = this.handlerId;
					uni.showModal({
						title: "是否确认取消",
						success: function(res) {
							if (res.confirm) {
								uni.post("/api/roomApp/v1/AssignForm", {
									ID: id,
									HandlerId: handID,
									ReviewOpinion: opinion
								}, msg => {
									if (msg.success) {
										uni.showToast({
											title: '取消成功'
										})
										setTimeout(function() {
											uni.navigateBack({

											});
											uni.hideToast();
										}, 1500);
									}
								})
							}
						}
					})

				}
			},
			timeCombine() {
				this.time = this.model.StartDate + " — " + this.model.EndDate;
			},
			setManager(msg) {
				this.array = ["未设置"];
				this.managerArray = msg.users;
				for (var i = 1; i <= msg.users.length; i++) {
					this.array[i] = msg.users[i - 1].RealName;
				}
			},
			getManagerID(value) {
				for (var i = 0; i < this.managerArray.length; i++) {
					if (this.managerArray[i].RealName == this.array[value]) {
						this.handlerId = this.managerArray[i].ID;
						this.handlerId = this.managerArray[i].ID;
						break;
					}
				}
			},
			foldUp(){
				this.displayTimeline=!this.displayTimeline;
			}
		}
	}
</script>

<style>
</style>
