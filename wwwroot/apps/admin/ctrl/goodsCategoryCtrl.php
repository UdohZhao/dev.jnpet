<?php
namespace apps\admin\ctrl;
use vendor\page\Page;
use core\lib\conf;
use apps\admin\model\goodsCategory;
use apps\admin\model\goods;
class goodsCategoryCtrl extends baseCtrl{
  public $db;
  public $gdb;
  public $id;
  public $type;
  // 构造方法
  public function _auto(){
    $this->db = new goodsCategory();
    $this->gdb = new goods();
    $this->id = isset($_GET['id']) ? intval($_GET['id']) : 0;
    $this->type = isset($_GET['type']) ? intval($_GET['type']) : 0;
    $this->assign('type',$this->type);
  }

  // 添加商品分类页面
  public function add(){
    // Get
    if (IS_GET === true) {
      // id
      if ($this->id) {
        // 读取单条数据
        $data = $this->db->getSingle($this->id);
        // assign
        $this->assign('data',$data);
      }
      // display
      $this->display('goodsCategory','add.html');
      die;
    }
    // Ajax
    if (IS_AJAX === true) {
      // data
      $data = $this->getData();
      // 防止重复添加
      $id = $this->db->getId($data['cname'],$data['type']);
      if ($id) {
        // id
        if ($this->id) {
          if ($this->id != $id) {
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
    $data['cname'] = htmlspecialchars($_POST['cname']);
    $data['sort'] = intval($_POST['sort']);
    $data['type'] = $_POST['type'];
    return $data;
  }

  // 商品分类列表页面
  public function index(){
    // search
    $search = isset($_POST['search']) ? htmlspecialchars($_POST['search']) : '';
    // 获取总记录数
    $totalRow = $this->db->totalRow($this->type);
    // 实例化分页类
    $page = new Page($totalRow,conf::get('LIMIT','admin'));
    // 读取数据
    $data = $this->db->getAll($this->type,$search,$page->limit);
    // assign
    $this->assign('data',$data);
    $this->assign('page',$page->showpage());
    // display
    $this->display('goodsCategory','index.html');
    die;
  }

  // 删除数据
  public function del(){
    // Ajax
    if (IS_AJAX === true) {
      $res = $this->gdb->countGcid($this->id);
      if ($res) {
        echo J(R(401,'请先删除该商品类别所属的商品 :('));
        die;
      }
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