// 点击链接，.active
// 点击分类，一级二级显示
$('.lt_aside .cate').click(function(){
  $(this).next().slideToggle();
})
// 点击菜单，动
$('.main-header .icon-left').click(function(){
  $('.lt_aside').toggleClass('hidemenu');
  $('.lt-main').toggleClass('hidemenu');
  $('.main-header').toggleClass('hidemenu');
})
// 点击icon-right，显示模态框
$('.main-header .icon-right').click(function(){
  $('#logoutModal').modal("show");
})
// 当点击退出时,向后台请求数据，退回未登录状态
$('#logout').click(function(){
//  
$.ajax({
  type:'GET',
  url:'/employee/employeeLogout',
  dataType:'json',
  success:function(info){
    console.log(info);
    if(info.success){
      location.href='login.html'
    }
    
  }
})

})