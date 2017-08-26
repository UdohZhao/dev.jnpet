<?php
namespace apps\home\ctrl;
use apps\home\model\goodsCategory;
use apps\home\model\goods;
use apps\home\model\goodsCover;
use apps\home\model\groupGoods;
class groupCtrl extends baseCtrl{
  public $type;
  public $gcid;
  public $gcdb;
  public $gdb;
  public $gcodb;
  public $ggdb;
  // 构造方法
  public function _auto(){
    $this->type = isset($_GET['type']) ? intval($_GET['type']) : 1;
    $this->gcid = isset($_GET['gcid']) ? intval($_GET['gcid']) : 0;
    $this->gcdb = new goodsCategory();
    $this->gdb = new goods();
    $this->gcodb = new goodsCover();
    $this->ggdb = new groupGoods();
  }

  // 拼团商品数据
  public function index(){
    // Get
    if (IS_GET === true) {
      $data = array();
      // 请求商品分类数据
      $data['gcData'] = $this->gcdb->getAll($this->type);
      $gcAll = array();
      $gcAll['id'] = 0;
      $gcAll['cname'] = '全部';
      $gcAll['sort'] = 0;
      $gcAll['type'] = 0;
      array_unshift($data['gcData'], $gcAll);
      // 请求全部商品数据
      $data['gData'] = $this->gdb->getAll($this->type);
      if ($data['gData']) {
        foreach ($data['gData'] AS $k => $v) {
          // 请求相关商品封面图片
          $data['gData'][$k]['img_path'] = $this->gcodb->getCover($v['id']);
          // 获取拼团信息
          $data['gData'][$k]['ggData'] = $this->ggdb->getCorrelation($v['id']);
        }
      } else {
        $data['gData'] = false;
      }
      ###
      echo J(R(200,'受影响的操作 :)',$data));
      die;
    }
  }

  // 请求拼团商品数据
  public function getCorrelation(){
    // Get
    if (IS_GET === true) {
      $data = array();
      // gcid 为 0 表示请求全部商品
      if ($this->gcid == 0) {
        $data['gData'] = $this->gdb->getAll($this->type);
      } else {
        $data['gData'] = $this->gdb->getCorrelation($this->gcid);
      }
      if ($data['gData']) {
        foreach ($data['gData'] AS $k => $v) {
          // 请求相关商品封面图片
          $data['gData'][$k]['img_path'] = $this->gcodb->getCover($v['id']);
          // 获取拼团信息
          $data['gData'][$k]['ggData'] = $this->ggdb->getCorrelation($v['id']);
        }
      } else {
        $data['gData'] = false;
      }
      // 返回请求结果集
      echo J(R(200,'',$data));
      die;
    }

  }

}