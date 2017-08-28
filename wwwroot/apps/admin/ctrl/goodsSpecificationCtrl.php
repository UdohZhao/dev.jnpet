<?php
namespace apps\admin\ctrl;
use core\lib\conf;
use apps\admin\model\goodsSpecification;
class goodsSpecificationCtrl extends baseCtrl{
  public $gid;
  public $db;
  public $id;
  public $type;
  // 构造方法
  public function _auto(){
    $this->gid = isset($_GET['gid']) ? intval($_GET['gid']) : 0;
    $this->assign('gid',$this->gid);
    $this->db = new goodsSpecification();
    $this->id = isset($_GET['id']) ? intval($_GET['id']) : 0;
    // type为1时表示更新
    $this->type = isset($_GET['type']) ? intval($_GET['type']) : 0;
  }

  // 添加商品规格页面
  public function add(){
    // Get
    if (IS_GET === true) {
      // 读取相关数据
      $data = $this->db->getCorrelation($this->gid);
      if ($data) {
        // 更新操作
        $this->assign('type',1);
      } else {
        // 写入操作
        $this->assign('type',0);
      }
      // assign
      $this->assign('data',$data);
      // display
      $this->display('goodsSpecification','add.html');
      die;
    }
    // Ajax
    if (IS_AJAX === true) {
      // data
      $data = $this->getData();
      // 删除相关数据
      if ($this->type == 1) {
        $res = $this->db->delCorrelation($this->gid);
        if (!$res) {
          echo J(R(401,'请尝试刷新页面后重试 :('));
          die;
        }
      }
      foreach ($data['gid'] AS $k => $v) {
        // 写入数据表
        $res = $this->db->add($data['gid'][$k],$data['cname'][$k]);
      }
      if ($res) {
        // type为1时表示更新
        if ($this->type == 1) {
          $this->gid = 0;
        }
        echo J(R(200,'受影响的操作 :)',array('gid'=>$this->gid)));
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
    foreach ($_POST['cname'] AS $k => $v) {
      $data['gid'][] = $this->gid;
      $data['cname'][] = htmlspecialchars($v);
    }
    return $data;
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
        echo J(R(400,'请尝试刷新页面后重试 :('));
        die;
      }
    }
  }

}