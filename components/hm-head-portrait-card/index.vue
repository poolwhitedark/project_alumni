<template>
	<div class="hm-head-portrait-card" @click="goto">
		<div class="box">
			<div class="bd">
				<image class="actionBg" src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-baron-xiaoha/9eff7970-aaef-11ea-b997-9918a5dda011.jpg" />
				<image class="avator" :src="options.avator" />
				<div class="wrap">
					<text class="name">{{ options.name }}</text>
					<text class="info">{{ options.info }}</text>
				</div>
			</div>
			<div class="ft">
				<text class="num">{{ options.num }}</text>
				<text class="num2">{{ options.num2 }}</text>
				<text class="num3">{{ options.num3 }}</text>
			</div>
			<text class="fans">{{ options.fans }}</text>
			<text class="article">{{ options.article }}</text>
			<text class="attention">{{ options.attention }}</text>
		</div>
	</div>
</template>
<script>
	export default {
		name: 'HmHeadPortraitCard',
		props: {
			dataId: {
				type: String,
				default: 'hm-head-portrait-card'
			},
			options: {
				type: Object,
				default: {

					actionBg: '/static/hm-head-portrait-card/images/img_25814_0_0.png',
					avator: '/static/hm-head-portrait-card/images/img_25814_0_1.png',
					name: '@李莉儿',
					info: '旅行社代理人',
					num: '1570',
					num2: '2570',
					num3: '230',
					fans: '粉丝',
					article: '文章',
					attention: '关注',


				}
			}
		},
		data() {
			return {


			};
		},
		methods: {
			goto() {
				this.$emit('goto')
			}
		}
	};
</script>
<style>
	@import './index.response.css';
</style>
