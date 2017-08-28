<?php
namespace apps\home\model;
use core\lib\model;
class goodsSpecification extends model{
  public $table = 'goods_specification';
  /**
   * 读取相关商品规格
   */
  public function getCorrelation($gid){
    return $this->select($this->table,'cname',['gid'=>$gid]);
  }

}