<template>
	<view class="card-container">
		<tj_panel class="mt_40" round shadow v-for="(item, i) in cardData" :key="i">
			<view class="card-item-t">
				<tj_row flex >
					<view class="tj-col notes" style="flex: 1;"><tj_rate v-model="item.rate" :size="14" disabled></tj_rate></view>
					<view class="tj-col" align="right" style="flex: 1;">
						<text class="f12">{{ item.Appointment }}</text>
					</view>
				</tj_row>
				<view><image :src="item.url"></image></view>
			</view>
			<view align="center" class="f15 fb card-item-c">
				<p>{{ item.name }}</p>
				<p class="f12 light-grey mt_10">{{ item.occupation }}</p>
			</view>
			<view>
				<tj_row flex>
					<view v-for="(item, i) in item.follows" :key="i" class="tj-col" style="flex: 1;">
						<view class="f14" :class="i == 1 ? 'tc' : i == 2 ? 'tr' : ''">{{ item.name }}{{ item.num }}</view>
						<!-- <view class="f14 grey mt_8">{{ item.name }}</view> -->
					</view>
				</tj_row>
			</view>
			<view class="card-item-f">
				<view class="tj-col" align="center" style="flex: 1;">
					<text class="f17 mainColor fb">{{ item.introduce }}</text>
					<p class="pt_10"><image :src="item.icon2"></image></p>
				</view>
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
	padding: 0 30rpx;

	.card-item-t {
		position: relative;
		> view:nth-last-child(1) {
			> image {
				position: absolute;
				top: -240%;
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
		padding: 30rpx 0 39rpx;
	}
	.tj-col {
		> image {
			vertical-align: middle;
			margin-top: 23rpx;
			width: 140rpx;
			height: 140rpx;
		}
	}
	.card-item-f {
        padding: 49rpx 0 0;
		p {
			> image {
				width: 35rpx;
				height: 24rpx;
			}
		}
	}
}
</style>
