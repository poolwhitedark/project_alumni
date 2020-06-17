'use strict';
const db=uniCloud.database()
exports.main = async (event, context) => {
 const {user_id}=event
 let res =await db.collection('login').where({
	 user_id
 }).get()
 console.log(res)
 if(res.data.length==0){
	 return{
		 status:false
	 }
 }else{
	 return{
		 status:true
	 }
 }
  
};
