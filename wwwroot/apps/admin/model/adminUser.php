<?php
namespace apps\admin\model;
use core\lib\model;
class adminUser extends model{
  public $table = 'admin_user';

  // 获取用户信息
  public function getInfo($username,$password){
    return $this->get($this->table, '*', ['username'=>$username,'password'=>$password]);
  }

}

