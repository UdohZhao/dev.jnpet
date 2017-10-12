<?php
namespace apps\home\ctrl;
use core\lib\conf;
use apps\home\model\indent;
use apps\home\model\indentGoods;
use apps\home\model\indentTakeDelivery;
use apps\home\model\cart;
use apps\home\model\goodsCover;
use apps\home\model\groupGoods;
use apps\home\model\groupJoin;
class indentCtrl extends baseCtrl{
  public $openid;
  public $itype;
  public $db;
  public $igdb;
  public $itddb;
  public $cdb;
  public $gcodb;
  public $ggdb;
  public $gjdb;
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
    $this->ggdb = new groupGoods();
    $this->gjdb = new groupJoin();
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
          echo J(R(400,'请尝试关闭小程序后重进 :(',false));
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
          echo J(R(400,'请尝试关闭小程序后重进 :(',false));
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
      $idata['ggid'] = isset($_POST['ggid']) ? $_POST['ggid'] : 0;
      $idata['openid'] = $this->openid;
      $idata['inumber'] = createIn();
      if ($this->itype == 1) {
        // 拼团商品计算价格
        $idata['total_money'] = bcmul($_POST['promotion_price'], $_POST['quantity'], 2);
      } else {
        $idata['total_money'] = isset($_POST['totalPrice']) ? $_POST['totalPrice'] : 0;
      }
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
        // 获取订单类型，1为拼团
        $itype = $this->db->getItype($this->id);
        if ($itype == 1) {
          // 获取订单商品id
          $gid = $this->igdb->getGid($this->id);
          // 获取拼团商品信息主键id
          $ggid = $this->ggdb->getId($gid);
          // 删除相关拼团加入数据
          $this->gjdb->del($this->openid,$ggid);
        }
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
      // 获取订单类型，1为拼团
      $idata = $this->db->getInfo($this->id);
      if ($idata['itype'] == 1) {
        // 删除相关拼团加入数据
        $this->gjdb->del($this->openid,$idata['ggid']);
        // 更新拼团商品状态
        $this->ggdb->save($idata['ggid'],array('type'=>0,'status'=>0));
        // 删除订单
        $res = $this->db->del($this->id);
        if ($res) {
          $this->igdb->del($this->id);
          $this->itddb->del($this->id);
        }
      } else {
        // 修改订单状态
        $res = $this->db->save($this->id,array('status'=>2));
      }
      // ###
      if ($res) {
        echo J(R(200,'受影响的操作 :)'));
        die;
      } else {
        echo J(R(400,''));
        die;
      }
    }
  }

  /**
   * 请求收货
   */
  public function tdog(){
    // Get
    if (IS_GET === true) {
      $res = $this->db->save($this->id,array('type'=>3));
      if ($res) {
        echo J(R(200,'受影响的操作 :)'));
        die;
      } else {
        echo J(R(400,''));
        die;
      }
    }

  }

  /**
   * 请求进入售后
   */
  public function afterSale(){
    // Get
    if (IS_GET === true) {
      $res = $this->db->save($this->id,array('type'=>4));
      if ($res) {
        echo J(R(200,'受影响的操作 :)'));
        die;
      } else {
        echo J(R(400,''));
        die;
      }
    }

  }

  /**
   * 请求申请退款
   */
  public function refund(){
    // Get
    if (IS_GET === true) {
      $res = $this->db->save($this->id,array('status'=>4));
      if ($res) {
        echo J(R(200,'受影响的操作 :)'));
        die;
      } else {
        echo J(R(400,''));
        die;
      }
    }

  }

  // 微信支付
  public function wxPay(){
    // Get
    if (IS_GET === true) {
      // 获取订单数据
      $data = $this->db->getInfo($this->id);
      // 优惠券（订单满多少立即多少？）
      $iprice = isset($_GET['iprice']) ? intval($_GET['iprice']) : 0;
      $price = isset($_GET['price']) ? intval($_GET['price']) : 0;
      if ($iprice != 0 && $price != 0 && $data['itype'] != 1) {
        if ($data['total_money'] > $iprice) {
          $data['total_money'] = bcsub($data['total_money'], $price, 0);
        }
      }
      $data['total_money'] = bcmul($data['total_money'], 100, 0);
      // 统一下单
      $jsApiParameters = wxJsapiPay($this->openid,'宠物饲料',$data['inumber'],$data['total_money'],$this->id);
      echo J($jsApiParameters);
      die;
    }
  }

  // 微信支付回调
  public function notify(){

    //$xml = $GLOBALS['HTTP_RAW_POST_DATA'];
    $xml = file_get_contents("php://input");

    // 这句file_put_contents是用来查看服务器返回的XML数据 测试完可以删除了
    file_put_contents(ICUNJI."/vendor/wxpay/wxlogs/check.log",$xml.PHP_EOL,FILE_APPEND);

    //将服务器返回的XML数据转化为数组
    //$data = json_decode(json_encode(simplexml_load_string($xml,'SimpleXMLElement',LIBXML_NOCDATA)),true);
    $data = xmlToArray($xml);
    // 保存微信服务器返回的签名sign
    $data_sign = $data['sign'];
    // sign不参与签名算法
    unset($data['sign']);
    $sign = makeSign($data);

    // 判断签名是否正确  判断支付状态
    if ( ($sign===$data_sign) && ($data['return_code']=='SUCCESS') && ($data['result_code']=='SUCCESS') ) {
        $result = $data;
        // 这句file_put_contents是用来查看服务器返回的XML数据 测试完可以删除了
        file_put_contents(ICUNJI."/vendor/wxpay/wxlogs/ok.log",$xml.PHP_EOL,FILE_APPEND);

        //获取服务器返回的数据
        $order_sn = $data['out_trade_no'];  //订单单号
        $order_id = $data['attach'];        //附加参数,选择传递订单ID
        $openid = $data['openid'];          //付款人openID
        $total_fee = $data['total_fee'];    //付款金额

        // 微信支付成功后修改订单状态
        $this->db->save($order_id,array('type'=>1,'ptime'=>time()));

    }else{
        $result = false;
    }
    // 返回状态给微信服务器
    if ($result) {
        $str='<xml><return_code><![CDATA[SUCCESS]]></return_code><return_msg><![CDATA[OK]]></return_msg></xml>';
    }else{
        $str='<xml><return_code><![CDATA[FAIL]]></return_code><return_msg><![CDATA[签名失败]]></return_msg></xml>';
    }
    echo $str;
    return $result;

  }

}