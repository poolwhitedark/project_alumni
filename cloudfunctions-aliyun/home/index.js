'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	let res = await db.collection('users').get()
	//event为客户端上传的参数
	console.log(res)
	//返回数据给客户端
	return {
		data: res.data
	}
};
