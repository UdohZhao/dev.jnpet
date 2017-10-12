$(function(){

})

// 取消订单
function coo(iid,ggid,gjid){

  console.log(iid,ggid,gjid);

  swal({
    title: "确认取消订单吗？",
    text: "如果该用户太久时间未付款可以取消其订单!",
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
        method: 'POST',
        url: '/admin/indent/coo/id/'+iid,
        data: {
          ggid: ggid,
          gjid: gjid
        },
        dataType: 'JSON',
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

// 发货
function commonSs(iid,type){

  console.log(iid,type);

  swal({
    title: "确认商品已经发出吗？",
    text: "确定后将不可更改！",
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
          id: iid,
          type: type
        },
        dataType: 'JSON',
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

// 结束拼团
function ggEnd(id,gid){

  console.log(id,gid);

  swal({
    title: "确认所有参团用户购买的商品已经发出吗？",
    text: "确定后将不可更改！",
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
        url: '/admin/groupGoods/gEnd',
        data: {
          id: id,
          gid: gid
        },
        dataType: 'JSON',
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