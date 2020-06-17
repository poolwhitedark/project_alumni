<template>
	<view>
		
		<view class="user_info"><user_info :info="list"></user_info></view>
		<view class="award-content"><award></award></view>
		<view class="look_more">
			<image src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-baron-xiaoha/166dcb90-a7cd-11ea-b43d-2358b31b6ce6.png"></image>
			<text>更多</text>
		</view>

		<view class="room-content" v-for="item in article"><room :list="item"  @add="add"></room></view>
	</view>
</template>

<script>
import top_bar from '../../components/room/Top-bar/Top-bar.vue';
import user_info from '../../components/room/user-info/user-info.vue';
import award from '../../components/room/award/award.vue';
import room from '../../components/room/room-content/room-content.vue';
export default {
	data() {
		return {
			user_id: '',
			collection: 0,
			followers: 0,
			followings: 0,
			avatar_url: '',
			list: {
				avatar_url: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-baron-xiaoha/2922bfd0-a6eb-11ea-9e8b-05a3242b26f2.jpeg',
				collection: 55,
				followers: 44,
				followings: 44
			},
			article: [],
			id: ''
		};
	},
	onLoad(e) {
		(this.user_id = e.user_id), (this.collection = parseInt(e.collection));
		this.followers = parseInt(e.followers);
		this.followings = parseInt(e.followings);
		this.avatar_url = e.avator;
		console.log(e.avator);

		const nowlist = {
			avatar_url: this.avatar_url,
			collection: this.collection,
			followers: this.followers,
			followings: this.followings
		};
		console.log(nowlist.avatar_url);
		this.list = nowlist;
		this.id = this.user_id;
		this.getAticle(this.id);
	},

	components: {
		top_bar,
		user_info,
		award,
		room
	},
	methods: {
		add() {
			uni.navigateTo({
				url: '../edit/edit'
			});
		},
		gotoWatch() {
			uni.navigateTo({
				url: '../watchArticle/watchArticle?collection=' + this.collection + '&followers=' + this.followers + '&article_id='+this.user_id
			});
		},
		gotoBack() {
			uni.navigateBack();
		},
		getAticle(id) {
			console.log(id);
			uniCloud
				.callFunction({
					name: 'getAticleInfo',
					data: {
						user_id: id
					}
				})
				.then(res => {
					let data = res.result.data;

					var i;
					this.article.length = 0;

					for (i = 0; i < data.length; i++) {
						let list = {
							actionBg: data[i].bg,
							text: data[i].text,
							see_number: data[i].see_number,
							thumbs_up: data[i].thumbs_up,
							chatnumber: data[i].chatnumber
						};
						this.article.push(list);
						console.log(this.article);
					}
				});
		}
	}
};
</script>

<style lang="scss">
.top-bar {
	height: 80rpx;
}

.user_info {
	height: 230rpx;
}

.award-content {
	height: 250rpx;
}

.look_more {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 50rpx;

	image {
		height: 50rpx;
		width: 50rpx;
	}

	text {
		font-size: 29rpx;
		margin-left: 15rpx;
		letter-spacing: 5rpx;
		font-weight: bold;
		font-family: 'Microsoft YaHei UI Light';
		margin-bottom: 7rpx;
	}
}

.room-content {
	display: flex;
	margin-bottom: 15rpx;
	flex-direction: column;
}
</style>
