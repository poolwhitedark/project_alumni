<template>
	<view>
		<!-- 顶栏 -->
		<view class="top-content">
			<view class="search-people"><text @click="back">找人脉</text></view>
			<view class="student-people">
				<text @click="goStudent">学生</text>
				<text>|</text>
				<text @click="goWokers">职友</text>
			</view>
		</view>
		<view class="search-content">
			<!-- 搜索框 -->
			<search
				class="mSearch-input-box"
				:mode="2"
				button="inside"
				:placeholder="defaultKeyword"
				@search="doSearch()"
				@input="inputChange"
				@confirm="doSearch()"
				v-model="keyword"
			></search>
		</view>

		<view style="height: 15rpx;"></view>
		<view class="slfilter-content"><sl-filter :independence="false" :color="titleColor" :themeColor="themeColor" :menuList.sync="menuList" @result="result"></sl-filter></view>
		<view class="list-card-content" v-for="(item, index) in options" v-bind:key="index"><listcard :options="item" @goto="gotoRoom(item)"></listcard></view>
	</view>
</template>

<script>
import search from '../../components/mehaotian-search-revision/mehaotian-search-revision.vue';
import slFilter from '../../components/sl-filter/sl-filter.vue';
import listcard from '../../components/hm-head-portrait-card/index.vue';

export default {
	data() {
		return {
			defaultKeyword: '输入用户姓名',
			keyword: '',
			oldKeywordList: [],
			titleColor: '#666666',
			themeColor: '#000000',
			menuList: [
				{
					title: '学科分类',
					detailTitle: '请选择学科分类',
					key: 'SubjectType',
					detailList: [
						{
							title: '不限',
							value: ''
						},
						{
							title: '理学',
							value: '理学'
						},
						{
							title: '经济学',
							value: '经济学'
						},
						{
							title: '工学',
							value: '工学'
						},
						{
							title: '法学',
							value: '法学'
						},
						{
							title: '艺术学',
							value: '艺术学'
						},
						{
							title: '文学',
							value: '文学'
						},
						{
							title: '历史学',
							value: '历史学'
						},
						{
							title: '农学',
							value: '农学'
						},
						{
							title: '医学',
							value: '医学'
						},
						{
							title: '管理学',
							value: '管理学'
						},
						{
							title: '哲学',
							value: '哲学'
						},
						{
							title: '教育学',
							value: '教育学'
						},
						{
							title: '军事学',
							value: '军事学'
						}
					]
				}
			],
			options: [
				
			]
		};
	},
	components: {
		search,
		slFilter,
		listcard
	},
	created() {
		uniCloud
			.callFunction({
				name: 'gitListCard'
			})
			.then(res => {
				const data = res.result.data;
				var i;
				for (i = 0; i < data.length; i++) {
					let list_card = {
						actionBg: '/static/hm-head-portrait-card/images/img_25814_0_0.png',
						avator: data[i].avatar_url,
						name: '@' + data[i].user_name,
						info: data[i].user_word,
						num: data[i].followings,
						num2: data[i].collection,
						num3: data[i].followers,
						fans: '粉丝',
						article: '文章',
						attention: '关注',
						user_id: data[i].user_id
					};
					this.options.push(list_card);
				}
			});
	},
	methods: {
		result(val) {
			console.log(val.SubjectType);
			uniCloud
				.callFunction({
					name: 'search-subject',
					data: {
						subject: val.SubjectType
					}
				})
				.then(res => {
					let data = res.result.data;
					var i;
					for (i = 0; i < data.length; i++) {
						let listcard = {
							actionBg: '/static/hm-head-portrait-card/images/img_25814_0_0.png',
							avator: data[i].avatar_url,
							name: '@' + data[i].user_name,
							info: data[i].user_word,
							num: data[i].followings,
							num2: data[i].collection,
							num3: data[i].followers,
							fans: '粉丝',
							article: '文章',
							attention: '关注',
							user_id: data[i].user_id
						};
						this.options.length = 0;
						this.options.push(listcard);
					}
				});
		},
		doSearch(data) {
			uniCloud
				.callFunction({
					name: 'search-name',
					data: {
						user_name: this.keyword
					}
				})
				.then(res => {
					let data = res.result.data;
					var i;
					for (i = 0; i < data.length; i++) {
						let listcard = {
							actionBg: '/static/hm-head-portrait-card/images/img_25814_0_0.png',
							avator: data[i].avatar_url,
							name: '@' + data[i].user_name,
							info: data[i].user_word,
							num: data[i].followings,
							num2: data[i].collection,
							num3: data[i].followers,
							fans: '粉丝',
							article: '文章',
							attention: '关注'
						};
						this.options.length = 0;
						this.options.push(listcard);
					}
				});

			console.log(this.keyword);
		},
		inputChange() {},
		goStudent() {
			uniCloud
				.callFunction({
					name: 'goChange',
					data: {
						occupation: '学生'
					}
				})
				.then(res => {
					let data = res.result.data;
					var i;
					for (i = 0; i < data.length; i++) {
						let listcard = {
							actionBg: '/static/hm-head-portrait-card/images/img_25814_0_0.png',
							avator: data[i].avatar_url,
							name: '@' + data[i].user_name,
							info: data[i].user_word,
							num: data[i].followings,
							num2: data[i].collection,
							num3: data[i].followers,
							fans: '粉丝',
							article: '文章',
							attention: '关注',
							user_id: data[i].user_id
						};
						this.options.length = 0;
						this.options.push(listcard);
					}
				});
		},
		goWokers() {
			uniCloud
				.callFunction({
					name: 'goChange',
					data: {
						occupation: '职友'
					}
				})
				.then(res => {
					let data = res.result.data;
					var i;
					for (i = 0; i < data.length; i++) {
						let listcard = {
							actionBg: '/static/hm-head-portrait-card/images/img_25814_0_0.png',
							avator: data[i].avatar_url,
							name: '@' + data[i].user_name,
							info: data[i].user_word,
							num: data[i].followings,
							num2: data[i].collection,
							num3: data[i].followers,
							fans: '粉丝',
							article: '文章',
							attention: '关注',
							user_id: data[i].user_id
						};
						this.options.length = 0;
						this.options.push(listcard);
					}
				});
		},
		back() {
			uniCloud
				.callFunction({
					name: 'gitListCard'
				})
				.then(res => {
					const data = res.result.data;
					var i;
					this.options.length = 0;
					for (i = 0; i < data.length; i++) {
						let list_card = {
							actionBg: '/static/hm-head-portrait-card/images/img_25814_0_0.png',
							avator: data[i].avatar_url,
							name: '@' + data[i].user_name,
							info: data[i].user_word,
							num: data[i].followings,
							num2: data[i].collection,
							num3: data[i].followers,
							fans: '粉丝',
							article: '文章',
							attention: '关注'
						};

						this.options.push(list_card);
					}
				});
		},
		gotoRoom(e) {
			const a = e.user_id;
			const b = JSON.stringify(e.num);
			const c = JSON.stringify(e.num2);
			const d = JSON.stringify(e.num3);
			const f = e.avator;
			console.log(e);

			uni.navigateTo({
				url: '../Room/Room?user_id=' + a + '&collection=' + b + '&followers=' + c + '&followings=' + d + '&avator=' + encodeURIComponent(JSON.stringify(e.avator))
			});
		}
	}
};
</script>

<style lang="scss">
.top-content {
	background-color: #ffffff;
	width: 100%;
	display: flex;
	box-sizing: border-box;

	.search-people {
		float: left;
		margin-left: 20rpx;
		font-weight: bold;
		letter-spacing: 5rpx;
		font-family: 'Microsoft YaHei UI Light';
	}

	.student-people {
		display: flex;
		float: right;
		margin-left: 380rpx;

		text {
			font-weight: bold;
			font-family: 'Microsoft YaHei UI Light';
			letter-spacing: 5rpx;
		}
	}
}

.search-content {
	margin: 0 28rpx;

	.mSearch-input-box {
		margin-top: 30rpx;
	}
}

.list-card-content {
}
</style>
