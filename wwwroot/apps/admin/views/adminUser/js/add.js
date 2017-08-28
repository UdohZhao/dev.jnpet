$(function(){

  // 验证登录表单
  $("#adminUserForm").validate({
      focusInvalid: true,
      rules: {
        username: {
          required: true
        },
        password: {
          required: true,
          minlength: 6
        },
        rPassword: {
          required: true,
          minlength: 6,
          equalTo: "#password"
        }
      },
      messages: {
        username: {
          required: "<span style='color:red;'>用户名不能为空 :(</span>"
        },
        password: {
          required: "<span style='color:red;'>密码不能为空 :(</span>",
          minlength: "<span style='color:red;'>密码长度不能小于6个字符 :(</span>"
        },
        rPassword: {
          required: "<span style='color:red;'>确认密码不能为空 :(</span>",
          minlength: "<span style='color:red;'>密码长度不能小于6个字符 :(</span>",
          equalTo: "<span style='color:red;'>两次密码不一致 :(</span>"
        }
      },
      submitHandler: function(form){
        $(form).ajaxSubmit({
            dataType:"json",
            success:function( res ){
              // res
              if (res.code == 400) {
                swal("提交失败", res.msg, "error");
              } else if (res.code == 401) {
                swal("提交失败", res.msg, "error");
              } else {
                swal("提交成功", res.msg, "success");
                window.setTimeout("window.location.href='/admin/adminUser/index'",2000);
              }
            },
            error:function(e){
              console.log(e);
              swal("未知错误 :(", "请刷新页面后重试!", "error");
            }
        });
      }
  });

})