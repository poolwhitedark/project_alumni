'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	const{user_id}=event
  let res=await db.collection('users').where({
	  user_id: user_id
  }).get()
  console.log(res.data.result[0].thumbs_up_article_ids)
  return res.data
};
