<template>
	<view class="card-container">
		<tj_panel class="mt_45" round shadow v-for="(item, i) in cardData" :key="i">
			<view class="card-item-t">
				<tj_row flex class="notes">
					<view class="tj-col " style="flex: 1;"><tj_rate v-model="item.rate" :size="14" disabled></tj_rate></view>
					<view class="tj-col" align="right" style="flex: 1;">
						<text class="f12">{{ item.address }}</text>
						<i class="ml_20"><image :src="item.icon"></image></i>
					</view>
				</tj_row>
				<view><image :src="item.url"></image></view>
			</view>
			<view align="center" class="f15 fb card-item-c">
				<p>{{ item.name }}</p>
				<p class="f12 light-grey mt_10">{{ item.occupation }}</p>
			</view>
			<view class="card-item-f">
				<tj_row flex align="center">
					<view v-for="(item, i) in item.follows" :key="i" class="tj-col" style="flex: 1;">
						<view class="f20 mainColor fb">{{ item.num }}</view>
						<view class="f14 grey mt_8">{{ item.name }}</view>
					</view>
				</tj_row>
			</view>
		</tj_panel>
	</view>
</template>

<script>
import tj_panel from 'library/panel/index.vue';
import tj_row from 'library/row/index.vue';
import tj_rate from 'library/rate/index.vue';
export default {
	name: 'tj-card',
	props: {
		cardData: {
			type: Array,
			default() {
				return [];
			}
		}
	},
	data() {
		return {};
	},
	components: {
		tj_panel,
		tj_row,
		tj_rate
	},
	methods: {}
};
</script>

<style lang="scss">
.card-container {
	padding: 30rpx;

	.card-item-t {
		position: relative;
		> view:nth-last-child(1) {
			> image {
				position: absolute;
				top: -120%;
				left: 50%;
				width: 140rpx;
				height: 140rpx;
				border-radius: 50%;
				transform: translateX(-50%);
			}
		}
		i {
			> image {
				vertical-align: middle;
				width: 30rpx;
				height: 23rpx;
			}
		}
	}

	.card-item-c {
		padding: 20rpx 0 39rpx;
	}
	.tj-col {
		height: 85rpx;

		> image {
			vertical-align: middle;
			margin-top: 23rpx;
			width: 140rpx;
			height: 140rpx;
		}
	}
}
</style>
