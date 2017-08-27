<?php
namespace apps\admin\ctrl;
use core\lib\conf;
use apps\admin\model\indent;
class indentCtrl extends baseCtrl{
  public $itype;
  public $type;
  public $db;
  // 构造方法
  public function _auto(){
    $this->itype = isset($_GET['itype']) ? intval($_GET['itype']) : 0;
    $this->type = isset($_GET['type']) ? intval($_GET['type']) : 0;
    $this->assign('itype',$this->itype);
    $this->assign('type',$this->type);
    $this->db = new indent();
  }

  /**
   * 订单列表
   */
  public function index(){
    // 读取订单数据
    $data = $this->db->getAll($this->itype,$this->type);
    // assign
    $this->assign('data',$data);
    // display
    $this->display('indent','index.html');
    die;
  }

}