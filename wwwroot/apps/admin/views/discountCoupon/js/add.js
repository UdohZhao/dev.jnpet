$(function(){

  // 验证优惠券表单
  $("#discountCouponForm").validate({
      focusInvalid: true,
      rules: {
        show_language: {
          required: true
        },
        iprice: {
          required: true,
          number: true
        },
        price: {
          required: true,
          number: true
        },
        sort: {
          required: true,
          digits: true
        }
      },
      messages: {
        show_language: {
          required: "<span style='color:red;'>展示语不能为空 :(</span>"
        },
        iprice: {
          required: "<span style='color:red;'>订单价格不能为空 :(</span>",
          number: "<span style='color:red;'>必须输入合法的数字（整数，小数） :(</span>"
        },
        price: {
          required: "<span style='color:red;'>优惠价格不能为空 :(</span>",
          number: "<span style='color:red;'>必须输入合法的数字（整数，小数） :(</span>"
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
              } else {
                swal("提交成功", res.msg, "success");
                window.setTimeout("window.location.href='/admin/discountCoupon/index'",2000);
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