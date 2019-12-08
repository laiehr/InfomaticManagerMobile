<template>
	<view id="lab-apply-creat">
		<cu-custom bgColor="bg-informatic-brown" isBack>
			<block slot="backText">返回</block>
			<block slot="content">创建申请表</block>
		</cu-custom>
		<lab-Steps v-model="stepInfo" />
		<form>
			<view class="cu-form-group margin-top">
				<view class="title">申请原因<text class="text-red">*</text></view>
				<input name="input" v-model="model.applicationReason" maxlength="200"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">选择申请实验室<text class="text-red">*</text></view>
				<picker mode="multiSelector" :range="[buildings, rooms]" range-key="Name" @columnchange="columnChange" @change="selectRoom"
				 v-model="roomIndex">
					<view class="content">
						{{currentRoom}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group" @click="selectDateTime()">
				<view class="title">申请时段<text class="text-red">*</text></view>
				<text style="flex: 1;">{{model.startDate===""?"请选择申请时段"
				:model.startDate+'&nbsp;至&nbsp;'+model.endDate}}</text>
			</view>
			<view class="cu-form-group" v-if="isStudent">
				<view class="title">选择指导老师<text class="text-red">*</text></view>
				<picker :range="teachers" range-key="RealName" @change="selectTeacher">
					<view class="content">
						{{currentTeacher}}
					</view>
				</picker>
			</view>
			<view class="padding flex flex-direction">
				<button class="cu-btn bg-informatic-brown lg" :disabled="!havePermission" :loading="isSubmitting" @click="submit()">提交</button>
			</view>
		</form>
		<timePicker :show="showPicker" type="rangetime" color="#6d3b5e" 
		@cancel="selectDateTime()" @confirm="confirmDateTime"/>
	</view>
</template>

<script>
	let steps = require("../stepsv1.js")
	let app = require("@/config/index")
	export default {
		onLoad(opt) {
			this.havePermission=app.checkPermission("ItemManager.CreateRoomApplicationWorkflow");
			this.ID = opt.id;
			this.getInfo();
			this.getLabCurrentRoom(opt);
		},
		methods: {
			selectTeacher(e) {
				let u = this.teachers[e.detail.value];
				this.currentTeacher = u.RealName || "请选择指导教师";
				this.model.guideTeacherId = u.ID || guidEmpty;
			},
			selectRoom(e) {
				let index = e.detail.value[1];
				let v = this.rooms[index];
				this.currentRoom = v.ID === this.guidEmpty ? "选择实验室" : `${v.Building.Name} ${v.Name}`;
				this.model.roomId = v.ID;
			},
			submit() {
				this.isSubmitting = true;
				uni.post("/api/roomApp/v1/GetApplication", {}, msg => {
					if (msg.success == true) {
						this.model.ID = msg.data.ID;
						uni.post("/api/roomApp/v1/CreateApplication", this.model, msg => {
							this.isSubmitting = false;
							if (msg.success) {
								uni.showToast({
									title: '提交成功',
									icon: 'success',
									position: 'center'
								});
								setTimeout(function() {
									uni.navigateBack({

									});
									uni.hideToast();
								}, 1500);
							} else {
								uni.showToast({
									title: msg.msg,
									icon: 'none',
									position: 'bottom'
								})
							}
						})
					}
				})
			},
			getInfo() {
				let THIS = this;
				uni.post("/api/roomApp/v1/GetCreateApplication", {}, msg => {
					if (msg.success) {
						THIS.stepInfo = msg.data;
						THIS.isStudent = msg.isStudent;
						THIS.model.State = msg.data.State;
						THIS.buildings = msg.buildings;
						THIS.allRooms = msg.rooms;
						THIS.teachers = msg.teachers;
					}
				})
			},
			columnChange(e) {
				let column = e.detail.column
				let value = e.detail.value;
				if (column) return;

				let buildingId = this.buildings[value].ID;
				//逐个查找
				this.rooms = this.allRooms.filter(e => e.BuildingId === buildingId);
			},
			getLabCurrentRoom(opt){
				if(opt.BuildingName&&opt.labName)
				{
					this.currentRoom = opt.BuildingName+" "+opt.labName;
					this.model.roomId = opt.roomID;
				}
			},
			selectDateTime()
			{
				this.showPicker=!this.showPicker;
			},
			confirmDateTime(e)
			{
				console.log(e);
				this.model.startDate=e.value[0];
				this.model.endDate=e.value[1];
				this.selectDateTime();
			}
		},
		data() {
			return {
				model: {
					ID: '',
					applicationReason: '',
					roomId: '',
					guideTeacherId: '',
					startDate: '',
					state: 0,
					endDate: '',
					isDateTime: true
				},
				isSubmitting: false,
				buildings: [],
				allRooms: [],
				guidEmpty: '00000000-0000-0000-0000-000000000000',
				rooms: [],
				teachers: [],
				currentTeacher: "请选择指导教师",
				currentRoom: "请选择房间号",
				isStudent: true,
				ID: '',
				roomIndex: [0, 0],
				stepInfo: {},
				showPicker: false,
				havePermission: false
			}
		},
	}
</script>

<style>
</style>
