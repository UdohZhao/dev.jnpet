$(function(){

})

// 共同操作
function commonSs(id,type){
  var title;
  var text;
  // type ?
  if (type == 2) {
    title = '确认商品已经发出吗？';
    text = '确认后将不可更改!';
  }

  swal({
    title: title,
    text: text,
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
        method: 'GET',
        url: '/admin/indent/commonSs',
        data: {
          id: id,
          type: type
        },
        success: function(res){
          console.log(res);
          // res
          if (res.code == 400) {
            swal("请求失败", res.msg, "error");
          } else {
            swal("请求成功", res.msg, "success");
            setTimeout("window.location.reload();",2000);
          }
        },
        error: function(e){
          console.log(e);
        }
      });
    } else {
      swal("取消了", "未受影响的操作 :)", "error");
    }
  });

}

// 拼团详情
function groupInfo(iid,ggid){
  console.log(iid,ggid);
  window.location.href = "/admin/groupGoods/index/iid/"+iid+"/id/"+ggid;
}

// 申请退款？拒绝&同意
function nook(id,status){

  console.log(id,status);

  // swal
  swal({
    title: '确认此操作吗？',
    text: '请自行联系客户解决!',
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
        method: 'GET',
        url: '/admin/indent/nook',
        data: {
          id: id,
          status: status
        },
        success: function(res){

          console.log(res);

          // res
          if (res.code == 400) {
            swal("请求失败", res.msg, "error");
          } else {
            swal("请求成功", res.msg, "success");
            setTimeout("window.location.reload();",2000);
          }
        },
        error: function(e){
          console.log(e);
        }
      });
    } else {
      swal("取消了", "未受影响的操作 :)", "error");
    }
  });

}