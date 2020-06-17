'use strict';
const db = uniCloud.database()
const dbCmd = db.command
exports.main = async (event, context) => {
  const{user_id,
  article_id}=event
  
  let res=await db.collection('users').where({
  	  user_id: user_id
  }).get()
  
  const author_likes_ids=res.data[0].author_likes_ids
  console.log(author_likes_ids.includes(article_id))
  let  author_ids=null
  
  if(author_likes_ids.includes(article_id)){
	  author_ids=dbCmd.pull(article_id)
  }else{
	   author_ids=dbCmd.addToSet(article_id)
  }
  await db.collection('users').where({
	  user_id:user_id
  }).update({
	  author_likes_ids:author_ids
  })
  return {
	  code:200,
	  mag:'更新成功'
  }
};
