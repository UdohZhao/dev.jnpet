<?php
namespace apps\home\ctrl;
use apps\home\model\indent;
use apps\home\model\indentGoods;
use apps\home\model\indentTakeDelivery;
use apps\home\model\cart;
use apps\home\model\goodsCover;
class indentCtrl extends baseCtrl{
  public $openid;
  public $itype;
  public $db;
  public $igdb;
  public $itddb;
  public $cdb;
  public $gcodb;
  public $id;
  // 构造方法
  public function _auto(){
    $this->openid = isset($_GET['openid']) ? $_GET['openid'] : '';
    $this->itype = isset($_GET['itype']) ? intval($_GET['itype']) : 0;
    $this->db = new indent();
    $this->igdb = new indentGoods();
    $this->itddb = new indentTakeDelivery();
    $this->cdb = new cart();
    $this->gcodb = new goodsCover();
    $this->id = isset($_GET['id']) ? intval($_GET['id']) : 0;
  }

  // 添加订单
  public function add(){
    // Post
    if (IS_POST === true) {
      // idata
      $idata = $this->getIdata();
      // id
      if ($this->id) {
        // 更新订单表
        $res = $this->db->save($this->id,$idata);
        if ($res) {
          // 添加订单收货数据
          $itddata = $this->getItdData();
          $this->itddb->add($itddata);
          echo J(R(200,'受影响的操作 :)',array('iid'=>$this->id)));
          die;
        } else {
          echo J(R(400,'请尝试关闭小程序后重进 :('));
          die;
        }
      } else {
        // 写入订单数据表
        $iid = $this->db->add($idata);
        if ($iid) {
          $igdata = $this->getIgdata($iid);
          // 写入订单商品表
          foreach ($igdata AS $k => $v) {
            $this->igdb->add($v);
          }
          // 删除购物车相关数据
          foreach ($_POST['cid'] AS $k => $v) {
            $this->cdb->del($this->openid,$v);
          }
          echo J(R(200,'受影响的操作 :)',array('iid'=>$iid)));
          die;
        } else {
          echo J(R(400,'请尝试关闭小程序后重进 :('));
          die;
        }
      }
    }

  }

  // 初始化订单数据
  private function getIdata(){
    $idata = array();
    // id
    if ($this->id) {
      $idata['remarks'] = $_POST['message'];
      $idata['status'] = 1;
    } else {
      $idata['openid'] = $this->openid;
      $idata['inumber'] = createIn();
      $idata['total_money'] = isset($_POST['totalPrice']) ? $_POST['totalPrice'] : 0;
      $idata['ctime'] = time();
      $idata['itype'] = $this->itype;
      $idata['type'] = 0;
      $idata['status'] = 0;
      $idata['ptime'] = '';
      $idata['stime'] = '';
      $idata['transportation'] = '';
      $idata['transport_number'] = '';
    }
    return $idata;
  }

  // 初始化订单商品数据
  private function getIgdata($iid){
    $igdata = array();
    $_POST['cid'] = explode(',', $_POST['cid']);
    $_POST['gid'] = explode(',', $_POST['gid']);
    $_POST['cname'] = explode(',', $_POST['cname']);
    $_POST['promotion_price'] = explode(',', $_POST['promotion_price']);
    $_POST['quantity'] = explode(',', $_POST['quantity']);
    $_POST['specification'] = explode(',', $_POST['specification']);
    foreach ($_POST['cid'] AS $k => $v) {
      $igdata[$k]['iid'] = $iid;
      $igdata[$k]['gid'] = $_POST['gid'][$k];
      $igdata[$k]['goods_name'] = $_POST['cname'][$k];
      $igdata[$k]['goods_specification'] = $_POST['specification'][$k];
      $igdata[$k]['goods_price'] = $_POST['promotion_price'][$k];
      $igdata[$k]['quantity'] = $_POST['quantity'][$k];
    }
    return $igdata;

  }

  // 初始化订单收货数据
  private function getItdData(){
    $itddata = array();
    $itddata['iid'] = $this->id;
    $itddata['contacts'] = $_POST['contacts'];
    $itddata['phone'] = $_POST['phone'];
    $itddata['address'] = $_POST['address'];
    $itddata['postal_code'] = $_POST['postal_code'];
    return $itddata;

  }

  // 订单数据
  public function index(){
    // Get
    if (IS_GET === true) {
      // iid
      if ($this->id) {
        // 获取订单数据
        $data = $this->db->getInfo($this->id);
        // 获取订单商品数据
        $data['igData'] = $this->igdb->getCorrelation($this->id);
        foreach ($data['igData'] AS $k => $v) {
          $data['igData'][$k]['img_path'] = $this->gcodb->getCover($v['gid']);
        }
        // 获取订单收货数据
        $data['itdData'] = $this->itddb->getCorrelation($this->id);
        echo J(R(200,'受影响的操作 :)',$data));
        die;
      } else {
        echo J(R(400,'请尝试关闭小程序后重进 :('));
        die;
      }
    }
  }

  // 订单列表数据
  public function indexAll(){
    // Get
    if (IS_GET === true) {
      // 获取当前用户的订单列表
      $data = $this->db->getCorrelation($this->openid,$this->itype);
      if ($data) {
        // 获取订单商品数据
        foreach ($data AS $k => $v) {
          $data[$k]['igData'] = $this->igdb->getCorrelation($v['id']);
          // 获取订单商品封面
          foreach ($data[$k]['igData'] AS $kk => $vv) {
            $data[$k]['igData'][$kk]['img_path'] = $this->gcodb->getCover($vv['gid']);
          }
        }
        echo J(R(200,'受影响的操作 :)',$data));
        die;
      } else {
        echo J(R(400,'您还没有相关订单数据，去逛逛看看需要购买什么 ～',false));
        die;
      }
    }

  }

  // 检测订单支付是否超时
  public function checkTimeout(){
    // Get
    if (IS_GET === true) {
      $ctime = $this->db->getCtime($this->id);
      // 时间戳比较
      $ctime = bcadd($ctime, 1800, 0);
      if ($ctime < time()) {
        // 修改为超时状态
        $this->db->save($this->id,array('status'=>3));
        echo J(R(400,'当前订单已经超时 :('));
        die;
      } else {
        echo J(R(200,'受影响的操作 :)'));
        die;
      }
    }

  }

  // 取消订单
  public function coo(){
    // Get
    if (IS_GET === true) {
      $res = $this->db->save($this->id,array('status'=>2));
      if ($res) {
        echo J(R(200,'受影响的操作 :)'));
        die;
      } else {
        echo J(R(400,''));
        die;
      }
    }
  }

}