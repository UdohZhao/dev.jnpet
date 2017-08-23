<?php
namespace apps\home\ctrl;
use apps\home\model\demoModel;
class goodsEstimateCtrl extends baseCtrl{
  public $gid;
  // 构造方法
  public function _auto(){
    $this->gid = isset($_GET['gid']) ? intval($_GET['gid']) : 0;
  }

  // 请求商品评价数据
  public function getData(){
    // Get
    if (IS_GET === true) {
      echo J($this->gid);
      die;
    }
  }


}