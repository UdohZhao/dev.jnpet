<?php
namespace apps\home\ctrl;
use apps\home\model\indentGoods;
use apps\home\model\goodsCover;
class indentGoodsCtrl extends baseCtrl{
  public $db;
  public $gcodb;
  public $iid;
  // 构造方法
  public function _auto(){
    $this->db = new indentGoods();
    $this->gcodb = new goodsCover();
    $this->iid = isset($_GET['iid']) ? intval($_GET['iid']) : 0;
  }

  /**
   * 请求订单商品数据
   */
  public function index(){
    // Get
    if (IS_GET === true) {
      $data = $this->db->getCorrelation($this->iid);
      // 获取商品封面图片
      foreach ($data AS $k => $v) {
        $data[$k]['img_path'] = $this->gcodb->getCover($v['gid']);
      }
      ###
      echo J(R(200,'受影响的操作 :)',$data));
      die;
    }

  }


}