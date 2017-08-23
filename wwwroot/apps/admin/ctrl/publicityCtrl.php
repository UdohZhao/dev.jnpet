<?php
namespace apps\admin\ctrl;
use core\lib\conf;
use apps\admin\model\publicity;
class publicityCtrl extends baseCtrl{
  public $db;
  public $id;
  // 构造方法
  public function _auto(){
    $this->db = new publicity();
    $this->id = isset($_GET['id']) ? intval($_GET['id']) : 0;
  }

  // 配置banner页面
  public function add(){
    // Get
    if (IS_GET === true) {
      // 读取单条数据
      $data = $this->db->getInfo();
      // assign
      $this->assign('data',$data);
      // display
      $this->display('publicity','add.html');
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
    $res = upFiles('img_path');
    if ($res['code'] == 400) {
      echo J($res);
      die;
    }
    $data['img_path'] = $res['data'];
    return $data;
  }

  // 删除数据
  public function del(){
    // Ajax
    if (IS_AJAX === true) {
      $res = $this->db->del($this->id);
      if ($res) {
        // 获取图片路径
        @unlink(ICUNJI.$_POST['imgPath']);
        echo J(R(200,'受影响的操作 :)'));
        die;
      } else {
        echo J(R(400,'请尝试刷新页面后重试 :('));
        die;
      }
    }
  }


}