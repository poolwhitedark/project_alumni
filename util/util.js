function throttle(fn, gapTime) {
  if (gapTime == null || gapTime == undefined) {
    gapTime = 1500
  }

  let _lastTime = null

  // 返回新的函数
  return function () {
    let _nowTime = + new Date()
    if (_nowTime - _lastTime > gapTime || !_lastTime) {
      fn.apply(this, arguments)   //将this和参数传给原函数
      _lastTime = _nowTime
    }
  }
}

function debounce(fn, gapTime) {
  if (gapTime == null || gapTime == undefined) {
    gapTime = 300
  }
  let timeout = null
  // 返回新的函数
  return function () {
	  if(timeout !== null)  clearTimeout(timeout);        
	  timeout = setTimeout(()=>{
		  fn.apply(this, arguments)
	  },gapTime); 
  }
}


module.exports = {
	throttle:throttle,
	debounce:debounce
}