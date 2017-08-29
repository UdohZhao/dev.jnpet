<?php
namespace apps\admin\ctrl;
use core\lib\conf;
use vendor\page\Page;
use apps\admin\model\goods;
use apps\admin\model\groupGoods;
use apps\admin\model\groupJoin;
use apps\admin\model\indent;
class groupGoodsCtrl extends baseCtrl{
  public $gid;
  public $gdb;
  public $db;
  public $gjdb;
  public $idb;
  public $id;
  public $iid;
  // 构造方法
  public function _auto(){
    $this->gid = isset($_GET['gid']) ? intval($_GET['gid']) : 0;
    $this->id = isset($_GET['id']) ? intval($_GET['id']) : 0;
    $this->iid = isset($_GET['iid']) ? intval($_GET['iid']) : 0;
    $this->assign('gid',$this->gid);
    $this->assign('iid',$this->iid);
    $this->gdb = new goods();
    $this->db = new groupGoods();
    $this->gjdb = new groupJoin();
    $this->idb = new indent();
  }

  // 配置拼团页面
  public function add(){
    // Get
    if (IS_GET === true) {
      // 读取商品名称
      $cname = $this->gdb->getCname($this->gid);
      // 读取当前商品拼团信息
      //$data = $this->db->getInfo($this->gid,0);
      // assign
      $this->assign('cname',$cname);
      //$this->assign('data',$data);
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
        // 更新数据表
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
    $data = $this->db->getInfos($this->id);
    // 读取参团用户
    $data['gjData'] = $this->gjdb->getCorrelation($data['id']);
    if (!$data['gjData']) {
      $data['gjData'] = false;
    } else {
      // iid 订单id
      if ($this->iid) {
        foreach ($data['gjData'] AS $k => $v) {
          $data['gjData'][$k]['type'] = $this->idb->getType($this->iid,$v['openid']);
        }
      }
    }
    // assign
    $this->assign('data',$data);
    // display
    $this->display('groupGoods','index.html');
    die;
  }

  /**
   * 结束拼团
   */
  public function gEnd(){
    // Ajax
    if (IS_AJAX === true) {
      // 结束拼团状态
      $res = $this->db->save($this->id,array('status'=>1));
      if ($res) {
        // 下架拼团商品
        $this->gdb->save($this->gid,array('status'=>1));
        echo J(R(200,'受影响的操作 :)'));
        die;
      } else {
        echo J(R(400,'请尝试刷新页面后重试 :('));
        die;
      }
    }
  }

  /**
   * 拼团列表页面
   */
  public function listSs(){
    // Get
    if (IS_GET === true) {
      // 获取总记录数
      $totalRow = $this->db->totalRow($this->gid);
      // 实例化分页类
      $page = new Page($totalRow,conf::get('LIMIT','admin'));
      // 读取商品名称
      $cname = $this->gdb->getCname($this->gid);
      // 读取相关拼团数据
      $data = $this->db->getCorrelation($this->gid,$page->limit);
      // assign
      $this->assign('cname',$cname);
      $this->assign('data',$data);
      $this->assign('page',$page->showpage());
      // display
      $this->display('groupGoods','listSs.html');
      die;
    }
  }

  /**
   * 获取拼团配置
   */
  public function getConfig(){
    // Ajax
    if (IS_AJAX === true) {
      // 读取拼团信息（必须要在进行中）
      $status = 0;
      $res = $this->db->getConfig($this->gid,$status);
      if ($res) {
        echo J(R(400,'最近一次拼团还未结束 :('));
        die;
      } else {
        echo J(R(200,'受影响的操作 :)'));
        die;
      }
    }

  }



}