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
      echo '<h1 style="margin:30px;"> ~~ 欢迎使用存己框架 :)</h1>';
      die;
    }
  }

}