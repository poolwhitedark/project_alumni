'use strict';
const db =uniCloud.database()
exports.main = async (event, context) => {
	const {user_name}=event
 let res=await db.collection('users').where({
	 user_name:user_name
 }).field({
	 'avatar_url':true,
	 'collection':true,
	 'followers':true,
	 'followings':true,
	 'user_word':true,
	 'user_name':true,
	 'user_id':true
	 
 }).get()

  return {
	 code:200,
	 msg:'请求成功',
	 data:res.data
  }
};
