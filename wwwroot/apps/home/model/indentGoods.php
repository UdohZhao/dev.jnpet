<?php
namespace apps\home\model;
use core\lib\model;
class indentGoods extends model{
  public $table = 'indent_goods';
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
    return $this->select($this->table,'*',['iid'=>$iid]);
  }

}

