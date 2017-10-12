<?php
namespace apps\home\ctrl;
use core\lib\conf;
use apps\home\model\goods;
use apps\home\model\goodsCover;
use apps\home\model\goodsSpecification;
use apps\home\model\goodsEstimate;
use apps\home\model\discountCoupon;
use apps\home\model\groupGoods;
use apps\home\model\groupJoin;
use apps\home\model\indent;
use apps\home\model\indentGoods;
class goodsCtrl extends baseCtrl{
  public $db;
  public $gcodb;
  public $gsdb;
  public $gedb;
  public $dcdb;
  public $ggdb;
  public $gjdb;
  public $idb;
  public $igdb;
  public $id;
  public $type;
  // 构造方法
  public function _auto(){
    $this->db = new goods();
    $this->gcodb = new goodsCover();
    $this->gsdb = new goodsSpecification();
    $this->gedb = new goodsEstimate();
    $this->dcdb = new discountCoupon();
    $this->ggdb = new groupGoods();
    $this->gjdb = new groupJoin();
    $this->idb = new indent();
    $this->igdb = new indentGoods();
    $this->id = isset($_GET['id']) ? intval($_GET['id']) : 0;
    $this->type = isset($_GET['type']) ? intval($_GET['type']) : 0;
  }

  // 默认首页
  public function getInfo(){
    // Get
    if (IS_GET === true) {
      $data = $this->db->getInfo($this->id);
      if ($data) {
        // 替换图片完整路径
        $data['content'] = getImgReplaceUrl($data['content'],conf::get('SERVER_NAME','weapp'));
        // 优惠 ？
        $data['discounts'] =  bcsub($data['original_price'], $data['promotion_price'], 2);
        // 请求商品封面图片
        $data['img_path'] = $this->gcodb->getAllCover($this->id);
        // 请求相关商品规格
        $specification = $this->gsdb->getCorrelation($this->id);
        foreach ($specification AS $k => $v) {
          if( $k == 0 ){
            $data['specification'][$k] = array('name'=>$v,'value'=>$v,'checked'=>true);
          }else{
            $data['specification'][$k] = array('name'=>$v,'value'=>$v);
          }
        }
        // type为1时表示拼团商品
        if ($this->type == 1) {
          $data['ggData'] = $this->ggdb->getCorrelation($this->id);
          $data['ggData']['start_time'] = date('Y-m-d H:i',$data['ggData']['start_time']);
          $data['ggData']['end_time'] = date('Y-m-d H:i',$data['ggData']['end_time']);
          // 读取参团人数
          $data['gjData']['count'] = $this->gjdb->getCcount($data['ggData']['id']);
        } else {
          // 优惠券
          $data['dcData'] = $this->dcdb->getAll();
          // 销量
          $data['igData']['count'] = $this->igdb->getgCorrelation($this->id);
        }
        echo J(R(200,'',$data));
        die;
      } else {
        echo J(R(400,'',false));
        die;
      }
    }
  }

  /**
   * 商品评价
   */
  public function estimate(){
    // Post
    if (IS_POST === true) {
      // data
      $data = $this->getEdata();
      // 写入评价数据
      $res = $this->gedb->add($data);
      if ($res) {
        // 更新订单商品状态为已评价
        $this->igdb->saveStatus($_POST['iid'],$_POST['gid'],$_POST['specification'],array('status'=>1));
        // 更新订单状态为已评价
        //$this->idb->save($_POST['iid'],array('type'=>'4'));
        ###
        echo J(R(200,'受影响的操作 :)'));
        die;
      } else {
        ###
        echo J(R(400,'请尝试关闭小程序重新进入 :('));
        die;
      }
    }
  }

  // 初始化评价数据
  private function getEdata(){
    $data = array();
    $data['gid'] = $_POST['gid'];
    $data['specification'] = $_POST['specification'];
    $data['openid'] = $_POST['openid'];
    $data['nickname'] = $_POST['nickname'];
    $data['avatarurl'] = $_POST['avatarurl'];
    $data['estimate'] = htmlspecialchars($_POST['estimate']);
    $data['ctime'] = time();
    $data['status'] = $_POST['status'];
    return $data;
  }

}