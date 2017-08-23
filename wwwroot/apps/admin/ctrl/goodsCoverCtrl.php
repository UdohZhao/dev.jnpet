<?php
namespace apps\admin\ctrl;
use core\lib\conf;
use apps\admin\model\goodsCover;
class goodsCoverCtrl extends baseCtrl{
  public $gid;
  public $db;
  public $type;
  public $id;
  // 构造方法
  public function _auto(){
    $this->gid = isset($_GET['gid']) ? intval($_GET['gid']) : 0;
    $this->assign('gid',$this->gid);
    $this->db = new goodsCover();
    // type 为 1 时表示更新
    $this->type = isset($_GET['type']) ? intval($_GET['type']) : 0;
    $this->id = isset($_GET['id']) ? intval($_GET['id']) : 0;
  }

  // 添加商品封面页面
  public function add(){
    // Get
    if (IS_GET === true) {
      // 读取相关数据
      $data = $this->db->getCorrelation($this->gid);
      if ($data) {
        $this->assign('type',1);
      } else {
        $this->assign('type',0);
      }
      // assign
      $this->assign('data',$data);
      // display
      $this->display('goodsCover','add.html');
      die;
    }
    // Ajax
    if (IS_AJAX === true) {
      // res
      $res = upFiles('img_path');
      if ($res['code'] == 400) {
        echo J(R(400,$res['msg']));
        die;
      }
      // data
      $data = $this->getData($res['data']);
      // 写入数据表
      foreach ($data['gid'] AS $k => $v) {
        $res = $this->db->add($data['gid'][$k],$data['img_path'][$k]);
      }
      if ($res) {
        // type 1 更新
        echo J(R(200,'受影响的操作 :)'));
        die;
      } else {
        echo J(R(400,'请尝试刷新页面后重试 :('));
        die;
      }

    }
  }

  // 初始化数据
  private function getData($imgpath){
    $data = array();
    foreach ($imgpath AS $k => $v) {
      $data['gid'][] = $this->gid;
      $data['img_path'][] = $v;
    }
    return $data;
  }

  // 删除封面图片
  public function delCover(){
    // Ajax
    if (IS_AJAX === true) {
      $res = $this->db->del($this->id);
      if ($res) {
        // 获取图片路径
        $path = ICUNJI . $_POST['path'];
        @unlink($path);
        echo J(R(200,'受影响的操作 :)'));
        die;
      } else {
        echo J(R(400,'请尝试刷新页面后重试 :('));
        die;
      }
    }
  }

}