<?php
namespace apps\home\ctrl;
use core\lib\conf;
use apps\home\model\goods;
use apps\home\model\goodsCover;
use apps\home\model\goodsSpecification;
use apps\home\model\discountCoupon;
class goodsCtrl extends baseCtrl{
  public $db;
  public $gcodb;
  public $gsdb;
  public $dcdb;
  public $id;
  // 构造方法
  public function _auto(){
    $this->db = new goods();
    $this->gcodb = new goodsCover();
    $this->gsdb = new goodsSpecification();
    $this->dcdb = new discountCoupon();
    $this->id = isset($_GET['id']) ? intval($_GET['id']) : 0;
  }

  // 默认首页
  public function getInfo(){
    // Get
    if (IS_GET === true) {
      $data = $this->db->getInfo($this->id);
      if ($data) {
        // 替换图片完整路径
        $data['content'] = getImgReplaceUrl($data['content'],conf::get('SERVER_NAME','weapp'));
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
        // 优惠券
        $data['dcData'] = $this->dcdb->getAll();
        echo J(R(200,'',$data));
        die;
      } else {
        echo J(R(400,'',false));
        die;
      }
    }
  }

}