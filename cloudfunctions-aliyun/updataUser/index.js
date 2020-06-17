'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	const {
		avatarUrl,
		user_name,
		sex,
		phone,
		user_id
	} = event
	let res = await db.collection('users').where({
		user_id: user_id
	}).update({
		avatar_url: avatarUrl,
		user_name: user_name,
		sex: sex,
		phone: phone
	}).then(res => {
		return {
			data: res.data,
			msg: '修改成功'
		}
	})
	console.log(res)
};
