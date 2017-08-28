<?php
namespace apps\admin\model;
use core\lib\model;
class indentGoods extends model{
  public $table = 'indent_goods';
  /**
   * 读取订单相关商品数据
   */
  public function getCorrelation($iid){
    return $this->select($this->table,'*',['iid'=>$iid]);
  }

}