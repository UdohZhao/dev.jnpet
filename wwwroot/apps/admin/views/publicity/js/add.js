$(function(){

  // 验证banner表单
  $('#publicityForm').submit(function() {
   // 获取banner图片临时路径
   var previewImg = $("#previewImg").val();
   if (previewImg == '') {
      swal("提交失败", "请上传banner图片 :(", "error");
   } else {
     $(this).ajaxSubmit({
        dataType:"json",
        success: function(res){
          // res
          if (res.code == 400) {
            swal("提交失败", res.msg, "error");
          } else {
            swal("提交成功", res.msg, "success");
            setTimeout('window.location.reload();',2000);
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

// 删除banner
function delP(id,imgPath){
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
        type: "POST",
        url: "/admin/publicity/del/id/"+id,
        data: {imgPath:imgPath},
        dataType: "JSON",
        success: function(res){
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
    } else {
      swal("取消了", "数据是安全的 :)", "error");
    }
  });
}

//图片上传预览    IE是用了滤镜。
function previewImage(file)
{
  var MAXWIDTH  = 90;
  var MAXHEIGHT = 90;
  var div = document.getElementById('preview');
  if (file.files && file.files[0])
  {
      div.innerHTML ='<img id=imghead onclick=$("#previewImg").click()>';
      var img = document.getElementById('imghead');
      img.onload = function(){
        var rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);
        img.width  =  rect.width;
        img.height =  rect.height;
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
    div.innerHTML = '<img id=imghead>';
    var img = document.getElementById('imghead');
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