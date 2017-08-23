<?php
namespace apps\admin\ctrl;
use core\lib\conf;
use vendor\page\Page;
use apps\admin\model\adminUser;
class adminUserCtrl extends baseCtrl{
  public $db;
  public $id;
  // 构造方法
  public function _auto(){
    $this->db = new adminUser();
    $this->id = isset($_GET['id']) ? intval($_GET['id']) : 0;
  }

  // 添加后台用户页面
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
      $this->display('adminUser','add.html');
      die;
    }
    // Ajax
    if (IS_AJAX === true) {
      // data
      $data = $this->getData();
      // 防止重复添加
      $id = $this->db->getId($data['username']);
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
    $data['username'] = htmlspecialchars($_POST['username']);
    $data['password'] = enPassword(htmlspecialchars($_POST['password']));
    $data['ctime'] = time();
    $data['status'] = $_POST['status'];
    $data['type'] = $_POST['type'];
    return $data;
  }

  // 后台用户列表页面
  public function index(){
    // search
    $search = isset($_POST['search']) ? htmlspecialchars($_POST['search']) : '';
    // 获取总记录数
    $totalRow = $this->db->totalRow();
    // 实例化分页类
    $page = new Page($totalRow,conf::get('LIMIT','admin'));
    // 读取数据
    $data = $this->db->getAll($search,$page->limit);
    // assign
    $this->assign('data',$data);
    $this->assign('page',$page->showpage());
    // display
    $this->display('adminUser','index.html');
    die;
  }

  // 删除数据
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