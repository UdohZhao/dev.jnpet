$(function(){
  // 初始化UEditor
  var ue = UE.getEditor('container');

  // 验证商品表单
  $("#goodsForm").validate({
      focusInvalid: true,
      rules: {
        cname: {
          required: true
        },
        tips: {
          required: true
        },
        original_price: {
          required: true,
          number: true
        },
        promotion_price: {
          required: true,
          number: true
        },
        inventory: {
          required: true,
          digits: true
        }
      },
      messages: {
        cname: {
          required: "<span style='color:red;'>商品类别名称不能为空 :(</span>"
        },
        tips: {
          required: "<span style='color:red;'>小贴士不能为空 :(</span>"
        },
        original_price: {
          required: "<span style='color:red;'>原价不能为空 :(</span>",
          number: "<span style='color:red;'>必须输入合法的数字（整数，小数） :(</span>"
        },
        promotion_price: {
          required: "<span style='color:red;'>促销价不能为空 :(</span>",
          number: "<span style='color:red;'>必须输入合法的数字（整数，小数） :(</span>"
        },
        inventory: {
          required: "<span style='color:red;'>库存不能为空 :(</span>",
          digits: "<span style='color:red;'>必须输入整数 :(</span>"
        }
      },
      submitHandler: function(form){
        // 获取详情
        var html = ue.getContent();
        if (html == false) {
          swal("提交失败", "商品详情不能为空 :(", "error");
        } else {
          $(form).ajaxSubmit({
              dataType:"json",
              success:function( res ){
                // res
                if (res.code == 400) {
                  swal("提交失败", res.msg, "error");
                } else if (res.code == 401) {
                  swal("提交失败", res.msg, "error");
                } else {
                  // id为0时代表更新操作
                  if (res.data.id == 0) {
                    swal("提交成功", res.msg, "success");
                    setTimeout("window.location.reload();",2000);
                  } else {
                    window.location.href = "/admin/goodsSpecification/add/gid/"+res.data.id;
                  }
                }
              },
              error:function(e){
                console.log(e);
                swal("未知错误 :(", "请刷新页面后重试!", "error");
              }
          });
        }
      }
  });

})