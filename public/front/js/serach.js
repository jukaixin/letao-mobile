

// 1.返回历史记录
// 2.获取localStorage进行渲染到页面上
//3.点x删除
// 4.点击清空记录，清除所有localStorage记录
// 5.点击搜索，据关键字跳转页面

$(function(){
  // 1.获取localStorage进行渲染到页面上
  // 由于进行的是本地存储操作, 约定存储的键名: search_list

  // 以下三句话, 放在控制台执行, 用于添加假数据
   // var arr = ["耐克", "阿迪", "阿迪王", "耐克王"];
   // var jsonStr = JSON.stringify( arr );
   // localStorage.setItem( "search_list", jsonStr );
  render();
  //  读取localStorage中存储的数据，进行渲染页面
  function getHistory (){
    var jsonStr=localStorage.getItem('search_list')||'[]';
    var arr=JSON.parse( jsonStr );
    // console.log(arr);
    return arr;
  }
  // 进行渲染到页面上
  function render(){
      var arr=getHistory();
      var htmlStr=template('tmp',{list:arr});
      $('.lt-history').html ( htmlStr );
  }
// 2.点击清空记录，清除所有localStorage记录
// 1).事件委托。removeitem进行删除，重新渲染页面
$('.lt-history').on('click','.btn-clear',function(){
  alert(1)
  // 获取数据，进行删除
  localStorage.removeItem('search_list');
  render();
})



// 3.点x删除
$('.lt-history').on('click','.btn-delete',function(){
  // alert(1)
  // 根据下标进行删除
  var index=$(this).data('index');
  var arr=getHistory();
  arr.splice(index,1);//改变了数组，需要重新存储
  localStorage.setItem('search_list',JSON.stringify(arr));
  render();
})

// 4.点击搜索，将数组中的值获取，添加到数组最前面，存储，进行页面重新渲染
$('.btn-serach').on ('click',function(){
  var key=$('.btn-input').val().trim();
  var arr=getHistory();
// 限制数组长度（若数组length>=10,删最后一个）+去重(查询数组中如果有则将其删除)
  var index=arr.indexOf(key);
  if(index!=-1){
    arr.splice(index,1);
  }
  if(arr.length>=10){
    arr.pop();
  }

  arr.unshift( key );

  console.log(arr);

  localStorage.setItem('search_list',JSON.stringify(arr));
  render();
  // 清空他的jilu
  $('.btn-input').val('');
  // 限制数组长度（若数组length>=10,删最后一个）+去重
})

})

