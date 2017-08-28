$(function(){

})

// 基础编辑
function basicInfoEdit(type,gcid,id){
  window.location.href = "/admin/goods/add/type/"+type+"/gcid/"+gcid+"/id/"+id;
}

// 规格编辑
function specificationEdit(gid){
  window.location.href = "/admin/goodsSpecification/add/gid/"+gid;
}

// 封面编辑
function coverEdit(gid){
  window.location.href = "/admin/goodsCover/add/gid/"+gid;
}

// 删除
function del(type,id){
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
        url: "/admin/goods/del/type/"+type+"/id/"+id,
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

// 配置拼团
function ggConfig(gid){
  // 防止多次配置
  $.ajax({
    method: "GET",
    url: "/admin/groupGoods/getConfig/gid/"+gid,
    dataType: "JSON",
    success: function (res) {
      console.log(res);
      if (res.code == 400) {
        swal("错误提示", res.msg, "error");
      } else {
        window.location.href = "/admin/groupGoods/add/gid/"+gid;
      }
    },
    error: function (e) {
      console.log(e);
    }
  });
}

// 上架&下架
function changeStatus(type,id,status){
  swal({
    title: "确认当前操作吗?",
    text: "上架后商品将对外展示，下架后商品可编辑！",
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
        type: "POST",
        url: "/admin/goods/changeStatus/type/"+type+"/id/"+id,
        data: {status:status},
        dataType: "JSON",
        success: function(res){

          console.log(res);

          if (res.code == 400) {
            swal("提交失败", res.msg, "error");
          } else if (res.code == 401) {
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

// 拼团详情
function ggInfo(gid){
  window.location.href = "/admin/groupGoods/listSs/gid/"+gid;
}