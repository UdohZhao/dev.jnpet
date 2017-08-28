<?php
namespace apps\home\model;
use core\lib\model;
class indentTakeDelivery extends model{
  public $table = 'indent_take_delivery';
  /**
   * 写入数据表
   */
  public function add($data){
    $this->insert($this->table,$data);
    return $this->id();
  }

  /**
   * 读取相关数据
   */
  public function getCorrelation($iid){
    return $this->get($this->table,'*',['iid'=>$iid]);
  }

}

