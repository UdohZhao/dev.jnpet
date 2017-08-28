<?php
namespace apps\admin\ctrl;
use core\lib\conf;
use vendor\page\Page;
use apps\admin\model\goodsCategory;
use apps\admin\model\goods;
use apps\admin\model\goodsSpecification;
use apps\admin\model\goodsCover;
use apps\admin\model\groupGoods;
use apps\admin\model\groupJoin;
class goodsCtrl extends baseCtrl{
  public $gcid;
  public $gcdb;
  public $db;
  public $type;
  public $id;
  public $gsdb;
  public $gcodb;
  public $ggdb;
  public $gjdb;
  // 构造方法
  public function _auto(){
    $this->gcid = isset($_GET['gcid']) ? intval($_GET['gcid']) : 0;
    $this->type = isset($_GET['type']) ? intval($_GET['type']) : 0;
    // assign
    $this->assign('gcid',$this->gcid);
    $this->assign('type',$this->type);
    $this->gcdb = new goodsCategory();
    $this->db = new goods();
    $this->gsdb = new goodsSpecification();
    $this->gcodb = new goodsCover();
    $this->ggdb = new groupGoods();
    $this->gjdb = new groupJoin();
    // id
    $this->id = isset($_GET['id']) ? intval($_GET['id']) : 0;
  }

  // 添加商品页面
  public function add(){
    // Get
    if (IS_GET === true) {
      // id
      if ($this->id) {
        // 读取单条数据
        $data = $this->db->getInfo($this->id);
        $this->assign('data',$data);
      }
      // 读取商品类别名称
      $cname = $this->gcdb->getCname($this->gcid);
      // assign
      $this->assign('cname',$cname);
      // display
      $this->display('goods','add.html');
      die;
    }
    // Ajax
    if (IS_AJAX === true) {
      // data
      $data = $this->getData();
      // 防止重复添加
      $res = $this->db->getId($this->gcid,$data['cname']);
      if ($res) {
        // id
        if ($this->id) {
          if ($this->id != $res) {
            echo J(R(401,'请勿重复添加 :('));
            die;
          }
        } else {
          echo J(R(401,'请勿重复添加 :('));
          die;
        }
      }
      // id
      if ($this->id) {
        // 更新数据表
        $res = $this->db->save($this->id,$data);
        if ($res) {
          echo J(R(200,'受影响的操作 :)',array('id'=>0)));
          die;
        }
      } else {
        // 写入数据表
        $res = $this->db->add($data);
        if ($res) {
          echo J(R(200,'受影响的操作 :)',array('id'=>$res)));
          die;
        }
      }
      echo J(R(400,'请尝试刷新页面后重试 :('));
      die;
    }
  }

  // 初始化数据
  private function getData(){
    $data = array();
    $data['gcid'] = $this->gcid;
    $data['cname'] = htmlspecialchars($_POST['cname']);
    $data['tips'] = htmlspecialchars($_POST['tips']);
    $data['original_price'] = $_POST['original_price'];
    $data['promotion_price'] = $_POST['promotion_price'];
    $data['inventory'] = $_POST['inventory'];
    $data['content'] = $_POST['content'];
    $data['ctime'] = time();
    $data['type'] = $this->type;
    $data['status'] = 1;
    return $data;
  }

  // 商品列表页面
  public function index(){
    // 读取商品类别名称
    $cname = $this->gcdb->getCname($this->gcid);
    // search
    $search = isset($_POST['search']) ? htmlspecialchars($_POST['search']) : '';
    // 获取总记录数
    $totalRow = $this->db->totalRow($this->gcid);
    // 实例化分页类
    $page = new Page($totalRow,conf::get('LIMIT','admin'));
    // 读取数据
    $data = $this->db->getAll($this->gcid,$search,$page->limit);
    // assign
    $this->assign('cname',$cname);
    $this->assign('data',$data);
    $this->assign('page',$page->showpage());
    // display
    $this->display('goods','index.html');
    die;
  }

  // 删除
  public function del(){
    // Ajax
    if (IS_AJAX === true) {
      // goods
      $res = $this->db->del($this->id);
      if ($res) {
        // goods_specification
        $this->gsdb->delCorrelation($this->id);
        // goods_cover
        $data = $this->gcodb->getCorrelation($this->id);
        foreach ( $data AS $k => $v ) {
          @unlink(ICUNJI.$v['img_path']);
        }
        $this->gcodb->delCorrelation($this->id);
        // type 1 拼团
        if ($this->type == 1) {
          $this->ggdb->del($this->id);
          $this->gjdb->del($this->id);
        }
        echo J(R(200,'受影响的操作 :)'));
        die;
      } else {
        echo J(R(400,'请尝试刷新页面后重试 :('));
        die;
      }
    }
  }

  // 上架&下架
  public function changeStatus(){
    // Ajax
    if (IS_AJAX === true) {
      // type 1 拼团
      if ($this->type == 1) {
        // 读取拼团信息（必须要在进行中）
        $status = 0;
        $res = $this->ggdb->getInfo($this->id,$status);
        if (!$res) {
          echo J(R(401,'请先配置拼团信息 :('));
          die;
        }
      }
      $res = $this->db->changeStatus($this->id,$_POST['status']);
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