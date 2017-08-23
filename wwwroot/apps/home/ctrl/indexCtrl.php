<?php
namespace apps\home\ctrl;
use apps\home\model\demoModel;
class indexCtrl extends baseCtrl{
  // 构造方法
  public function _auto(){

  }

  // 默认首页
  public function index(){
    // Get
    if (IS_GET === true) {
      // echo '<h1 style="margin:30px;"> ~~ 欢迎使用存己框架 :)</h1>';
      // die;
      for ($i = 13000000000; $i < 13000000031; $i++) {
        echo "模拟账号：". $i . "密码：123456abc";
        // echo "INSERT INTO `user` SET username='$i',password='885406f28d22832930e8d5af8211fac0',type='0',status='0';";
        echo "<br/>";
      }


    }
  }

}