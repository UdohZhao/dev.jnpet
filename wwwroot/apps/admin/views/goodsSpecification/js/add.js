$(function(){

  // 验证商品规格表单
  $('#goodsSpecificationForm').submit(function() {
   // 获取规格
   var cname = $("#cname").val();
   if (cname == false) {
    swal("提交失败", "商品规格不能为空 :(", "error");
   } else {
     $(this).ajaxSubmit({
        dataType:"json",
        success: function(res){
          // res
          if (res.code == 400) {
            swal("提交失败", res.msg, "error");
          } else if (res.code == 401) {
            swal("提交失败", res.msg, "error");
          } else {
            // gid 为 0 表示更新操作
            if (res.data.gid == 0) {
              swal("提交成功", res.msg, "success");
              setTimeout("window.location.reload();",2000);
            } else {
              window.location.href = "/admin/goodsCover/add/gid/"+res.data.gid;
            }
          }
        },
        error: function(e){
          console.log(e)
          swal("未知错误", "请尝试刷新页面后重试 :(", "error");
        }
     });
   }
   return false; //阻止表单默认提交
  });

})

// 添加一栏
var fileTo = 0;
function addGoodsSpecification(){
  //var asid = randomString();
  var html = '<div class="form-group" id="file'+fileTo+'">'+
             '<label for="inputEmail3" class="col-sm-2 control-label">规格</label>'+
             '<div class="col-sm-9">'+
             '<input type="text" class="form-control" name="cname[]" placeholder="请输入规格">'+
             '</div>'+
             '<button type="button" class="btn btn-danger" style="float:right;" onclick="delAc('+fileTo+');">删除</button>'+
             '</div>';
  $("#specificationContainer").append(html);
  fileTo++;
}

// 删除一栏
function delAc(acid){
  $("#file"+acid).remove();
}

// 删除一栏（id）
function del(id){
  swal({
    title: "确认删除吗？",
    text: "删除后将不可恢复!",
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
        url: "/admin/goodsSpecification/del/id/"+id,
        dataType: "JSON",
        success: function(res){
          // res
          if (res.code == 400) {
            swal("提交失败", res.msg, "error");
          } else {
            swal("提交成功", res.msg, "success");
            setTimeout("window.location.reload();",2000);
          }
        },
        error: function(e){
          console.log(e);
          swal("未知错误", "请尝试刷新页面后重试 :(", "error");
        }
      });
      //swal("Deleted!", "Your imaginary file has been deleted.", "success");
    } else {
      swal("取消了", "数据是安全的 :)", "error");
    }
  });
}