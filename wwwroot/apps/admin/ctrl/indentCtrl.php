<?php
namespace apps\admin\ctrl;
use core\lib\conf;
use apps\admin\model\indent;
use apps\admin\model\indentGoods;
use apps\admin\model\indentTakeDelivery;
use apps\admin\model\groupJoin;
use apps\admin\model\groupGoods;
class indentCtrl extends baseCtrl{
  public $itype;
  public $type;
  public $db;
  public $igdb;
  public $itddb;
  public $gjdb;
  public $ggdb;
  public $id;
  // 构造方法
  public function _auto(){
    $this->itype = isset($_GET['itype']) ? intval($_GET['itype']) : 0;
    $this->type = isset($_GET['type']) ? intval($_GET['type']) : 0;
    $this->id = isset($_GET['id']) ? intval($_GET['id']) : 0;
    $this->assign('itype',$this->itype);
    $this->assign('type',$this->type);
    $this->db = new indent();
    $this->igdb = new indentGoods();
    $this->itddb = new indentTakeDelivery();
    $this->gjdb = new groupJoin();
    $this->ggdb = new groupGoods();
  }

  /**
   * 订单列表
   */
  public function index(){
    // 读取订单数据
    $data = $this->db->getAll($this->itype,$this->type);
    foreach ($data AS $k => $v) {
      // 读取订单商品数据
      $data[$k]['igData'] = $this->igdb->getCorrelation($v['id']);
      // 读取订单收货数据
      $data[$k]['itdData'] = $this->itddb->getCorrelation($v['id']);
    }
    // assign
    $this->assign('data',$data);
    // display
    $this->display('indent','index.html');
    die;
  }

  /**
   * 共同的操作
   */
  public function commonSs(){
    // Ajax
    if (IS_AJAX === true) {
      $data = array();
      // 发货
      if ($this->type == 2) {
        $data['stime'] = time();
        $data['type'] = $this->type;
      }
      $res = $this->db->save($this->id,$data);
      if ($res) {
        echo J(R(200,'受影响的操作 :)'));
        die;
      } else {
        echo J(R(400,'请尝试刷新页面后重试 :('));
        die;
      }
    }

  }

  /**
   * 取消订单
   */
  public function coo(){
    // Ajax
    if (IS_AJAX === true) {
      // 删除订单
      $res = $this->db->del($this->id);
      if ($res) {
        $this->igdb->del($this->id);
        $this->itddb->del($this->id);
        // 删除参团数据
        $this->gjdb->delCorrelation($_POST['ggid'],$_POST['openid']);
        // 更新拼团商品状态
        $this->ggdb->save($_POST['ggid'],array('type'=>0,'status'=>0));
        echo J(R(200,'受影响的操作 :)'));
        die;
      } else {
        echo J(R(400,'请尝试刷新页面后重试 :('));
        die;
      }
    }
  }

}