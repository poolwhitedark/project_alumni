'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	const {
		user_id,
		password
	} = event
	let res = await db.collection('login').where({
		user_id: user_id,
		password: password
	}).remove()
	if (res.data == '') {
		return {
			status: 1,
			message: "用户名或密码不正确"
		}
	} else {
		return {
			status: 0,
			message: "登陆成功"
		}
	}
};
