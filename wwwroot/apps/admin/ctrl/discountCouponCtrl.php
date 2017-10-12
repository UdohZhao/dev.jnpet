<?php
namespace apps\admin\ctrl;
use core\lib\conf;
use apps\admin\model\discountCoupon;
class discountCouponCtrl extends baseCtrl{
  public $db;
  public $id;
  // 构造方法
  public function _auto(){
    $this->db = new discountCoupon();
    $this->id = isset($_GET['id']) ? intval($_GET['id']) : 0;
  }

  // 添加优惠券页面
  public function add(){
    // Get
    if (IS_GET === true) {
      // display
      $this->display('discountCoupon','add.html');
      die;
    }
    // Ajax
    if (IS_AJAX === true) {
      // data
      $data = $this->getData();
      // 写入数据表
      $res = $this->db->add($data);
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
    $data['show_language'] = htmlspecialchars($_POST['show_language']);
    $data['iprice'] = $_POST['iprice'];
    $data['price'] = $_POST['price'];
    $data['sort'] = intval($_POST['sort']);
    return $data;
  }

  // 优惠券列表页面
  public function index(){
    // 读取全部数据
    $data = $this->db->getAll();
    // assign
    $this->assign('data',$data);
    // display
    $this->display('discountCoupon','index.html');
    die;
  }

  // 删除
  public function del(){
    // Ajax
    if (IS_AJAX === true) {
      $res = $this->db->del($this->id);
      if ($res) {
        echo J(R(200,'受影响的操作 :)'));
        die;
      } else {
        echo J(R(400,'请尝试刷新页面后重试 :)'));
        die;
      }
    }
  }

}