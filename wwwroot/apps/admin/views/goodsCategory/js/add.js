$(function(){

  // 验证登录表单
  $("#goodsCategoryForm").validate({
      focusInvalid: true,
      rules: {
        cname: {
          required: true
        },
        sort: {
          required: true,
          digits: true
        }
      },
      messages: {
        cname: {
          required: "<span style='color:red;'>商品类别名称不能为空 :(</span>"
        },
        sort: {
          required: "<span style='color:red;'>排序不能为空 :(</span>",
          digits: "<span style='color:red;'>必须输入整数 :(</span>"
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
                window.setTimeout("window.location.href='/admin/goodsCategory/index'",2000);
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