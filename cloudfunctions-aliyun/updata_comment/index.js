'use strict';
const db = uniCloud.database()
const $ = db.command.aggregate
const dbCmd = db.command

exports.main = async (event, context) => {

	const {
		user_id, // 用户id
		article_id, // 文章id
		content, // 评论内容
	} = event

	


	let commentObj = {
		comment_id: genID(5), // 评论id
		comment_content: content, // 评论内容
		create_time: new Date().getTime(), // 创建时间
		author_id: user_id, // 作者id
		}
    let res=await db.collection('article_content').where({
		article_id:article_id
	}).update({
		comment: dbCmd.push(commentObj)
	}).then(res =>{
		console.log(res.data)
	})
	

	//返回数据给客户端
	return {
		code: 200,
		msg: "数据更新成功"
	}
};


function genID(length) {
	return Number(Math.random().toString().substr(3, length) + Date.now()).toString(36)
}
