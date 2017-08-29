<?php
namespace apps\home\ctrl;
use apps\home\model\goodsEstimate;
class goodsEstimateCtrl extends baseCtrl{
  public $gid;
  public $db;
  // 构造方法
  public function _auto(){
    $this->gid = isset($_GET['gid']) ? intval($_GET['gid']) : 0;
    $this->db = new goodsEstimate();
  }

  // 请求商品评价数据
  public function getData(){
    // Get
    if (IS_GET === true) {
      $data = $this->db->getCorrelation($this->gid);
      echo J(R(200,'',$data));
    }
  }


}