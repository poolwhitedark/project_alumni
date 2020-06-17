'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	const {
		user_id
	} = event
	let res = await db.collection('users').where({
		user_id: user_id,
	}).get()
	console.log(res.data)
	return {
		data: res.data,
		status: 0,
		msg: "获取用户信息成功"
	}
};
