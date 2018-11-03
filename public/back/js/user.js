
$(function(){
  var currentPage=1;
  var pageSize=5;
  render();
  // 1.请求数据进行动态渲染
 function render (){
  $.ajax({
    type:'GET',
    data:{
      page:currentPage,
      pageSize:pageSize
    },
    url:'/user/queryUser',
    dataType:'json',
    success:function(info){
      // console.log(info);
      // 模板引擎
      var htmlStr=template('queryTmp',info);
      $('tbody').html( htmlStr );

      // 分页
      $('#paginator').bootstrapPaginator({
        bootstrapMajorVersion:3,
        totalPages:Math.ceil(info.total/info.size),
        currentPage:info.page,
        onPageClicked:function(a,b,c,page){
          currentPage=page;
          render();

        }
      })
    }
  })
 }


//  2.点击按钮，修改样式
$('tbody').on ('click','.btn',function(){
  // alert(1)
  $('#Modal').modal('show');
  // 保存id和isdelect，以便了解更换的是哪个，以及更换成了什么状态
  var id=$(this).parent().data('id');
  var isDelete=$(this).hasClass('btn-success')?'1':'0';
  $('.btn').off ('click').on('click',function(){
    $.ajax({
      type:'POST',
      url:'/user/updateUser',
      data:{
        id:id,
        isDelete:isDelete
      },
      dataType:'json',
      success:function(info){
        console.log(info);
        if(info.success){
          $('#Modal').modal('hide');
          render();
        }
      }
    })
  })
 
})
})