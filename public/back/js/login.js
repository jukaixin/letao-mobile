
// 对表单进行验证
$('#form').bootstrapValidator({
  //2. 指定校验时的图标显示，默认是bootstrap风格
  feedbackIcons: {
    valid: 'glyphicon glyphicon-ok',
    invalid: 'glyphicon glyphicon-remove',
    validating: 'glyphicon glyphicon-refresh'
  },
  // 校验字段
  fields:{
    username:{
      validators:{
        notEmpty:{
          message:'用户名不能为空'
        },
        stringLength:{
          min:2,
          max:6,
          message:'用户名必须是2-6位数字之间'
        },
        callback: {
          message: "用户名不存在! "
        }
      }
    },
    password:{
      validators:{
        notEmpty:{
          message:'密码不能为空'
        },
        stringLength:{
          min:6,
          max:12,
          message:'密码必须是6-12位数字之间'
        },
        callback: {
          message: "密码错误"
        }
      }
    },
  }
})


// 表单验证成功时会执行的函数
$('#form').on('success.form.bv',function(e){
  // 禁止表单的默认提交，进行ajax提交
  e.preventDefault();
  $.ajax({
    type:'POST',
    url:'/employee/employeeLogin',
    data:$('#form').serialize(),
    dataType:'json',
    success:function(info){
      // console.log(info);
      if(info.success){
        // 成功提交，跳转到首页
        location.href ='index.html'
      }
      if(info.error===1001) {
        // 密码错误
        // message: "密码错误！"
        // INVALID ：校验失败的
        $('#form').data('bootstrapValidator').updateStatus('password','INVALID','callback')
      }
      if(info.error===1000) {
        //  message: "用户名不存在! "
        $('#form').data('bootstrapValidator').updateStatus('username','INVALID','callback')
      }
    }
  })
})

$('[type="reset"]').click(function(){
  // 重置表单状态
// reset自带可重置内容功能，但重置不了状态，
$('#form').data('bootstrapValidator').resetForm();

})