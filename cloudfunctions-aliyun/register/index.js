'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const {
		user_id,
		password
	}=event
	let res=await db.collection('login').add({
		
		password,
		user_id
	})
	console.log(res.data)
	//返回数据给客户端
	return {
		code:200,
		msg:'请求成功'
	}
};
