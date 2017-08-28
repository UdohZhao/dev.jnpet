<?php
namespace apps\admin\ctrl;
use core\lib\conf;
use apps\admin\model\goods;
use apps\admin\model\groupGoods;
class groupGoodsCtrl extends baseCtrl{
  public $gid;
  public $gdb;
  public $db;
  public $id;
  // 构造方法
  public function _auto(){
    $this->gid = isset($_GET['gid']) ? intval($_GET['gid']) : 0;
    $this->id = isset($_GET['id']) ? intval($_GET['id']) : 0;
    $this->assign('gid',$this->gid);
    $this->gdb = new goods();
    $this->db = new groupGoods();
  }

  // 配置拼团页面
  public function add(){
    // Get
    if (IS_GET === true) {
      // 读取商品名称
      $cname = $this->gdb->getCname($this->gid);
      // 读取当前商品拼团信息
      $data = $this->db->getInfo($this->gid,0);
      // assign
      $this->assign('cname',$cname);
      $this->assign('data',$data);
      $this->assign('today',date('Y-m-d H:i')); // 今天
      $this->assign('tomorrow',date("Y-m-d H:i",strtotime("+7 day"))); // +7天
      // display
      $this->display('groupGoods','add.html');
      die;
    }
    // Ajax
    if (IS_AJAX === true) {
      // data
      $data = $this->getData();
      // id
      if ($this->id) {
        $res = $this->db->save($this->id,$data);
      } else {
        // 写入数据表
        $res = $this->db->add($data);
      }
      if ($res) {
        echo J(R(200,'受影响的操作 :)'));
        die;
      } else {
        echo J(R(400,'请尝试刷新页面后重试 :('));
        die;
      }
    }
  }

  // 初始化数据
  private function getData(){
    $data = array();
    $data['gid'] = $this->gid;
    $data['quantity'] = intval($_POST['quantity']);
    $data['start_time'] = strtotime($_POST['start_time']);
    $data['end_time'] = strtotime($_POST['end_time']);
    $data['type'] = 0;
    $data['status'] = 0;
    return $data;
  }

  // 拼团详情页面
  public function index(){
    // 读取拼团信息
    $data = $this->db->getInfo($this->gid,0);
    // assign
    $this->assign('data',$data);
    // display
    $this->display('groupGoods','index.html');
    die;
  }

}