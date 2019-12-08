<template>
	<view>
		<view class="cu-bar fixed" style="background-color: #6d3b5e;">	<!--四个按钮-->
			<view class="padding-lr">
				<button class="cu-btn cuIcon bg-informatic-brown text-xl" @click="back">
					<text class="cuIcon-back"></text>
				</button>
			</view>
		</view>
		<view class="margin">
			<view>
				<p class="margin-tb text-xxl"><strong>学院开展2019年政治理论学习</strong></p>
				<p class="text-grey text-lg margin-tb"><span class="margin-right">来源：信息学院</span><span>2019-5-31</span></p>
			</view>
			<view class="margin-tb solids-bottom">
				<image src="../../static/deitailNews.jpg"></image>
				<p class="text-grey text-lg padding-tb">5月31日下午，信息科学与技术学院在物理大楼117报告厅召开政治理论学习大会。会议由学院党委书记刘弢主持。</p>
			</view>
			<view class="text-xl">
				<p>刘国深教授从几个风波事例引出了讲座主题，分析了目前的台海局势和两岸关系，展望了国家完全统一的前景。</p>
				<view class="margin-tb"><image src="../../static/deitailNews.jpg"></image></view>
				<p>刘国深教授时而用闽南语，时而用老朽音，还原了一个个生动的亲历场景，讲座内容丰富、精彩不断，让全体教职工在捧腹大笑的过程中收获满满。</p>
			</view>
			<view>
				<p class="text-grey text-lg margin-tb">责任编辑：信息学院</p></view>
			</view>
		</view>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		methods:{
			back()
			{
				uni.navigateBack({
					
				})
			}
		}
	}
</script>

<style>
	page{
		background-color: white;
	}
	image{
		width: 100%;
		align-items: center;
	}
</style>
