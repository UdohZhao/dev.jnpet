<?php
namespace apps\home\ctrl;
use apps\home\model\demoModel;
class groupCtrl extends baseCtrl{
  // 构造方法
  public function _auto(){

  }

  // 拼团商品数据
  public function index(){
    // Get
    if (IS_GET === true) {
      echo J($_GET);
      die;
    }
  }

}