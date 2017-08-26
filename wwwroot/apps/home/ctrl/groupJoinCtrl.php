<?php
namespace apps\home\ctrl;
use apps\home\model\groupJoin;
use apps\home\model\groupGoods;
class groupJoinCtrl extends baseCtrl{
  public $db;
  public $ggdb;
  public $ggid;
  public $openid;
  // 构造方法
  public function _auto(){
    $this->db = new groupJoin();
    $this->ggdb = new groupGoods();
    $this->ggid = isset($_GET['ggid']) ? intval($_GET['ggid']) : 0;
    $this->openid = isset($_GET['openid']) ? $_GET['openid'] : '';
  }

  /**
   * 验证拼团信息
   */
  public function checkGroupInfo(){
    // Get
    if (IS_GET === true) {
      // 防止重复参团
      $gjId = $this->db->getGjId($this->ggid,$this->openid);
      if ($gjId) {
        echo J(R(400,'请勿重复参团 :('));
        die;
      }
      // 参团日期是否截止
      $ggData = $this->ggdb->getInfo($this->ggid);
      if ($ggData['end_time'] < time()) {
        echo J(R(401,'参团日期已经截止 :('));
        die;
      }
      ###
      echo J(R(200,'受影响的操作 :)'));
      die;
    }

  }

  /**
   * 参团加入
   */
  public function add(){
    // Post
    if (IS_POST === true) {
      // 获取拼团商品信息
      $ggData = $this->ggdb->getInfo($this->ggid);
      // 获取相关参团人数
      $count = $this->db->getCcount($this->ggid);
      // data
      $data = $this->getData();
      $res = $this->db->add($data);
      if ($res) {
        // 参团人数+1等于设定的参团人数就激活订单
        $count = bcadd($count, 1, 0);
        if ($count == $ggData['quantity']) {
          $this->ggdb->save($this->ggid,array('type'=>1));
        }
        echo J(R(200,'受影响的操作 :)'));
        die;
      } else {
        echo J(R(400,'参团加入失败 :('));
        die;
      }
    }
  }

  /**
   * 初始化参团加入数据
   */
  private function getData(){
    $data = array();
    $data['ggid'] = $this->ggid;
    $data['openid'] = $this->openid;
    $data['nickname'] = $_POST['nickname'];
    $data['avatarurl'] = $_POST['avatarurl'];
    $data['ctime'] = time();
    return $data;
  }



}