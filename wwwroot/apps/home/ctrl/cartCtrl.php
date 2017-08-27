<?php
namespace apps\home\ctrl;
use apps\home\model\cart;
use apps\home\model\goods;
use apps\home\model\goodsCover;
class cartCtrl extends baseCtrl{
  public $db;
  public $gdb;
  public $gcodb;
  public $openid;
  public $id;
  // 构造方法
  public function _auto(){
    $this->db = new cart();
    $this->gdb = new goods();
    $this->gcodb = new goodsCover();
    $this->openid = isset($_GET['openid']) ? $_GET['openid'] : '';
    $this->id = isset($_GET['id']) ? intval($_GET['id']) : 0;
  }

  // 添加商品到购物车
  public function add(){
    // Post
    if (IS_POST === true) {
      // data
      $data = $this->getData();
      // 防止重复添加
      $id = $this->db->getId($data['openid'],$data['specification'],$_POST['gid']);
      if ($id) {
        echo J(R(401,'请勿重复添加 :('));
        die;
      }
      // 写入数据表
      $res = $this->db->add($data);
      if ($res) {
        echo J(R(200,'是否立即前往购物车结算？ :)',array('cid'=>$res)));
        die;
      } else {
        echo J(R(400,'请尝试关闭小程序后重新进入 :(',false));
        die;
      }
    }
  }

  // 初始化数据
  private function getData(){
    $data = array();
    $data['gid'] = $_POST['gid'];
    $data['openid'] = $_POST['openid'];
    $data['specification'] = $_POST['specification'];
    $data['quantity'] = $_POST['quantity'];
    $data['ctime'] = time();
    return $data;
  }

  // 购物车列表数据
  public function index(){
    // Get
    if (IS_GET === true) {
      // 读取购物车数据
      $data = $this->db->getAll($this->openid);
      if (!$data) {
        echo J(R(400,'',false));
        die;
      }
      // 读取商品数据
      foreach ($data AS $k => $v) {
        $data[$k]['gData'] = $this->gdb->getInfo($v['gid']);
        $data[$k]['gData']['img_path'] = $this->gcodb->getCover($v['gid']);
        $data[$k]['selected'] = true;
      }

      echo J(R(200,'',$data));
      die;

    }
  }

  // 删除
  public function del(){
    // Get
    if (IS_GET === true) {
      $res = $this->db->del($this->openid,$this->id);
      if ($res) {
        echo J(R(200,'受影响的操作 :)'));
        die;
      } else {
        echo J(R(400,'请尝试关闭小程序后重新进入 :)'));
        die;
      }
    }
  }

}