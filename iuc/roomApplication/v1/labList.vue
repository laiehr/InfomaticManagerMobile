<template>
	<view class="bg-white">
		<cu-custom bgColor="bg-informatic-brown" isBack>
			<block slot="backText">返回</block>
			<block slot="content">实验室列表页</block>
		</cu-custom>
		<scroll-view scroll-x class="bg-white nav text-center" scroll-with-animation :scroll-left="scrollLeft">
			<view class="cu-item" :class="index==TabCur?'text-informatic-brown text-bold cur':''" v-for="(item,index) in buildings" :key="index" @tap="tabSelect($event, item.ID)"
			 :data-id="index">
				<span>{{item.Name}}</span>
			</view>
		</scroll-view>
		<view v-for="(item,index) in labs" :key="index" @click="labDetail(item.ID)">
			<labInfoCard class="margin-lr-xl" :lab="item" displayArrow></labInfoCard>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad() {
			this.getBuildings();
		},
		data() {
			return {
				TabCur: 0,
				scrollLeft: 0,
				buildings: [],
				buildingDic: {},
				labs: []
			};
		},
		methods: {
			tabSelect(e, ID) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60;
				this.getLabs(ID);
			},
			getBuildings() {
				uni.post("/api/building/GetBuildings", {}, msg => {
					this.buildings = msg.data;
					this.buildings = this.buildings.filter(e => e.ID !== '00000000-0000-0000-0000-000000000000');
					this.buildings.map(e => this.buildingDic[e.ID] = e.Name);
					this.getLabs(this.buildings[0].ID);
				});
			},
			getLabs(pid) {
				uni.post("/api/building/GetRooms", {pid}, msg => {
					this.labs = msg.data;
					this.labs = this.labs.filter(e => e.ID !== '00000000-0000-0000-0000-000000000000');
				})
			},
			labDetail(id) {
				uni.navigateTo({ 
					url: './roomDetail?id=' + id
				})
			}
		}
	}
</script>

<style>
</style>
