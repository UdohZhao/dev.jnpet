$(function(){

})

// 删除
function del(id){
  swal({
    title: "确认删除吗?",
    text: "删除后无法恢复!",
    type: "warning",
    showCancelButton: true,
    confirmButtonColor: "#DD6B55",
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    closeOnConfirm: false,
    closeOnCancel: false
  },
  function(isConfirm){
    if (isConfirm) {
      // Ajax
      $.ajax({
        type: "GET",
        url: "/admin/discountCoupon/del/id/"+id,
        dataType: "JSON",
        success: function(res){
          if (res.code == 400) {
            swal("提交失败", res.msg, "error");
          } else {
            swal("提交成功", res.msg, "success");
            window.setTimeout("window.location.reload();",2000);
          }
        },
        error: function(e){
          console.log(e);
          swal("未知错误", "请尝试刷新页面后重试 :(", "error");
        }
      });
    } else {
      swal("取消了", "数据是安全的 :)", "error");
    }
  });
}