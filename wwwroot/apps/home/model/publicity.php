<?php
namespace apps\home\model;
use core\lib\model;
class publicity extends model{
  public $table = 'publicity';
  /**
   * 读取banner
   */
  public function getBanner(){
    return $this->get($this->table,'img_path');
  }
}

