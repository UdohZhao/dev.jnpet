$(function(){

  // 验证拼团表单
  $("#groupGoodsForm").validate({
      focusInvalid: true,
      rules: {
        quantity: {
          required: true,
          digits: true
        }
      },
      messages: {
        quantity: {
          required: "<span style='color:red;'>拼团人数不能为空 :(</span>",
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
                setTimeout("window.location.href = document.referrer;",2000);
              }
            },
            error:function(e){
              console.log(e);
              swal("未知错误 :(", "请刷新页面后重试!", "error");
            }
        });
      }
  });

  // 初始化日期插件
  $("#datetimeStart").datetimepicker({
      format: 'yyyy-mm-dd hh:ii',
      language: 'zh-CN',
      autoclose:true,
      startDate:new Date()
  }).on("click",function(){
      $("#datetimeStart").datetimepicker("setEndDate",$("#datetimeEnd").val())
  });
  $("#datetimeEnd").datetimepicker({
      format: 'yyyy-mm-dd hh:ii',
      language: 'zh-CN',
      autoclose:true,
      startDate:new Date()
  }).on("click",function(){
      $("#datetimeEnd").datetimepicker("setStartDate",$("#datetimeStart").val())
  });

})