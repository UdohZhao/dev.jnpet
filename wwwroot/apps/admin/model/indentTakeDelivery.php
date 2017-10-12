<?php
namespace apps\admin\model;
use core\lib\model;
class indentTakeDelivery extends model{
  public $table = 'indent_take_delivery';
  /**
   * 读取订单相关收货数据
   */
  public function getCorrelation($iid){
    return $this->get($this->table,'*',['iid'=>$iid]);
  }

  /**
   * 删除订单
   */
  public function del($iid){
    $res = $this->delete($this->table,['iid'=>$iid]);
    return $res->rowCount();
  }

}