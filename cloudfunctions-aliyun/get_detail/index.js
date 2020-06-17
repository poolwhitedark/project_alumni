'use strict';
// 获取数据库引用
const db = uniCloud.database()
const $ = db.command.aggregate
exports.main = async (event, context) => {

	const {
		user_id,
		article_id
	} = event

	
	
	let res=await db.collection('users').where({
		  user_id: user_id
	}).get()
	let user=res.data[0]
	console.log(res.data[0].author_likes_ids)

	
	
	
	let list = await db.collection('article_content')
		.aggregate()
		.addFields({
			
			// 是否关注作者
			is_author_like: $.in(['$article_id', user.author_likes_ids]),
			// 是否收藏文章
			is_like: $.in(['$article_id', user.article_likes_ids]),
			// 是否点赞
			is_thumbs_up: $.in(['$article_id', user.thumbs_up_article_ids])
		})
		.match({
			article_id: article_id
		})
		.project({
			coments: 0
		})
		.end()

	//返回数据给客户端
	return {
		code:200,
		msg:'数据请求成功',
		data:list.data
	}
};
