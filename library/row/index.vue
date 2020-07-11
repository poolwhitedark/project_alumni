<template>
	<view class="tj-row" :class="flex ? 'is-flex' : ''">
		<view class="tj-row__inner"><slot></slot></view>
	</view>
</template>

<script>
export default {
	name: 'tj_row',
	props: {
		flex: {
			type: Boolean,
			default: true
		}
	}
};
</script>
<style lang="scss">

</style>
