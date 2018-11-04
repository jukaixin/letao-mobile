

// 需求：1左边进行渲染，根据左边id进行渲染右边对应页面
$(function(){
  $.ajax({
    type:'get',
    url:'/category/queryTopCategory',
    dataType:'json',
    success:function(info){
      console.log(info);
      // 根据模板进行渲染
      var htmlStr=template('left_tpl' ,info);
      $('.main_left ul').html( htmlStr );

      // 在第一次请求ajax是，就进行渲染一次页面
      renderById(info.rows[0].id);
    }
  })
  // 根据id进行渲染二级分类
  // 2因为给a注册点击事件，要进行3.多次的二级分类渲染，水封装
  $('.main_left ul').on('click','a',function(){
    // 获取id
    var id=$(this).data('id');
    // 渲染当前点击的id所携带的数据
    renderById(id);
    // 让其点击的高亮，未点击的移除
    $(this).addClass('active').parent().siblings().find('a').removeClass('active');
  })
  function renderById (id){
    $.ajax({
      type:'get',
      data:{
        id:id
      },
      url:'/category/querySecondCategory',
      dataType:'json',
      success:function(info){
        console.log(info);
        // 模板动态渲染
        var htmlStr=template('right_tpl',info);
        $('.main_right ul').html(htmlStr);
      }
    })
  }
})