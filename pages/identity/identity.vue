<template>
	<view class="identity-container">
		<tj_panel class="mt_15" round shadow v-for="(item, i) in identityData" :key="i">
			<view @click="goIdentity(i)">
				<tj_row flex align="center">
					<view  class="tj-col" style="flex: 1;">
						<view class="f20 fb mt_8">{{ item.type }}</view>
						<view class="f12 grey">{{ item.details }}</view>
					</view>
					<view class="tj-col" style="flex: 1;"><image :src="item.url" mode=""></image></view>
				</tj_row>
			</view>
		</tj_panel>
	</view>
</template>

<script>
import tj_panel from 'library/panel/index.vue';
import tj_row from 'library/row/index.vue';

export default {
	data() {
		return {
			identityData: [
				{
					type: '企业版',
					details: '展现企业文化',
					url: require('common/images/qiye@2x.png')
				},
				{
					type: '个人版',
					details: '体现个人魅力',
					url: require('common/images/haoyou@2x.png')
				}
			],
			user_id: ''
		};
	},
	components: {
		tj_panel,
		tj_row
	},
	created() {},
	async onLoad() {
		let that = this;
		await uni.getStorage({
			key: 'user_id',
			success: function(res) {
				that.user_id = res.data;
			}
		});
	},
	methods: {
		goIdentity(i) {
			uniCloud
				.callFunction({
					name: 'version_choose',
					data: {
						phone: this.user_id,
						status: i + 1
					}
				})
				.then(res => {
					console.log(res, 'res', i);

					if (i == 1) {
						if (res.result.account_status == 1) {
							uni.switchTab({
								url: '/pages/home/index'
							});
						} else {
							uni.navigateTo({
								url: '/pages/identity/personal/index'
							});
						}
					} else {
						uni.navigateTo({
							url: '/pages/identity/enterprise/index'
						});
					}
				});
		}
	}
};
</script>

<style lang="scss">
.identity-container {
	padding: 30rpx;
	.tj-col {
		height: 190rpx;
		view {
			line-height: 68.5rpx;
		}
		> image {
			vertical-align: middle;
			margin-top: 23rpx;
			width: 114rpx;
			height: 114rpx;
		}
	}
}
</style>
