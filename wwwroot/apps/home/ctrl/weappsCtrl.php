<?php
namespace apps\home\ctrl;
use core\lib\conf;
class weappsCtrl extends baseCtrl{
  public $code;
  // 构造方法
  public function _auto(){
    $this->code = isset($_GET['code']) ? $_GET['code'] : '';
  }

  // 登录态
  public function onLogin(){
    // Get
    if (IS_GET === true) {
      $data = CG("https://api.weixin.qq.com/sns/jscode2session?appid=".conf::get('APPID','weapp')."&secret=".conf::get('SECRET','weapp')."&js_code=".$this->code."&grant_type=authorization_code");
      echo $data;
      die;
    }
  }

}