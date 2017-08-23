<?php
namespace apps\home\model;
use core\lib\model;
class discountCoupon extends model{
  public $table = 'discount_coupon';
  /**
   *读取全部数据
   */
  public function getAll(){
    // sql
    $sql = "
      SELECT
              *
      FROM
              `$this->table`
      ORDER BY
              sort ASC
    ";
    return $this->query($sql)->fetchAll();
  }


}

