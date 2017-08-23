$(function(){

  // 验证商品规格表单
  $('#goodsCoverForm').submit(function() {
   // type 为 1 时表示更新操作
   var type = $("input[name='type']").val();
   // 获取封面图片临时路径
   var previewImg0 = $("#previewImg0").val();
   var previewImg1 = $("#previewImg1").val();
   var previewImg2 = $("#previewImg2").val();
   if (type == 1) {
     $(this).ajaxSubmit({
        dataType:"json",
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
          console.log(e)
          swal("未知错误", "请尝试刷新页面后重试 :(", "error");
        }
     });
   } else if (previewImg0 == '' || previewImg1 == '' || previewImg2 == '') {
      swal("提交失败", "请上传3张商品封面 :(", "error");
   } else {
     $(this).ajaxSubmit({
        dataType:"json",
        success: function(res){
          // res
          if (res.code == 400) {
            swal("提交失败", res.msg, "error");
          } else {
            swal("提交成功", res.msg, "success");
            setTimeout('window.location.href = "/admin/goodsCategory/index"',2000);
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

// 删除封面图片路径
function delCover(id,path){
  swal({
    title: "确认删除封面图片吗？",
    text: "删除后将不可恢复 :(",
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
        url: "/admin/goodsCover/delCover/id/"+id,
        data: {path:path},
        dataType: "JSON",
        success: function(res){
          // res
          if (res.error == 400) {
            swal("提交失败", res.msg, "error");
          } else {
            swal("提交成功", res.msg, "success");
            window.setTimeout("window.location.reload();",2000);
          }
        },
        error: function(e){
          console.log(e);
          swal("未知错误", "请刷新页面后重试 :(", "error");
        }
      });
    } else {
      swal("取消了", "封面图片是安全的 :)", "error");
    }
  });
}

//图片上传预览IE是用了滤镜。
function previewImage(file,preview,imghead,previewImg){
  var MAXWIDTH  = 150;
  var MAXHEIGHT = 150;
  var div = document.getElementById(preview);
  if (file.files && file.files[0])
  {
      div.innerHTML ='<img id='+imghead+' onclick=$("#'+previewImg+'").click()>';
      var img = document.getElementById(imghead);
      img.onload = function(){
        var rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);
        img.width  =  rect.width;
        img.height =  rect.height;
        // img.style.marginLeft = rect.left+'px';
        img.style.marginTop = rect.top+'px';
      }
      var reader = new FileReader();
      reader.onload = function(evt){img.src = evt.target.result;}
      reader.readAsDataURL(file.files[0]);
  }
  else //兼容IE
  {
    var sFilter='filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src="';
    file.select();
    var src = document.selection.createRange().text;
    div.innerHTML = '<img id='+imghead+'>';
    var img = document.getElementById(imghead);
    img.filters.item('DXImageTransform.Microsoft.AlphaImageLoader').src = src;
    var rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);
    status =('rect:'+rect.top+','+rect.left+','+rect.width+','+rect.height);
    div.innerHTML = "<div id=divhead style='width:"+rect.width+"px;height:"+rect.height+"px;margin-top:"+rect.top+"px;"+sFilter+src+"\"'></div>";
  }
}
function clacImgZoomParam( maxWidth, maxHeight, width, height ){
    var param = {top:0, left:0, width:width, height:height};
    if( width>maxWidth || height>maxHeight ){
        rateWidth = width / maxWidth;
        rateHeight = height / maxHeight;

        if( rateWidth > rateHeight ){
            param.width =  maxWidth;
            param.height = Math.round(height / rateWidth);
        }else{
            param.width = Math.round(width / rateHeight);
            param.height = maxHeight;
        }
    }
    param.left = Math.round((maxWidth - param.width) / 2);
    param.top = Math.round((maxHeight - param.height) / 2);
    return param;
}