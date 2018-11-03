// 进行登录拦截，判断用户是否登录过，若未登录过，则不可直接访问其他页面
$.ajax({
  type:'GET',
  url:'/employee/checkRootLogin',
  dataType:'json',
  success:function(info){
    console.log(info);
    if(info.error){
      // message: "未登录！"
      location.href='login.html'
    }
    else {
      console.log('此用户已登录');
      
    }
  }
})
// 会出现一直闪的状态，因为首页一直在不停的发送ajax请求
// 解决，首页不引入即可
