<?php
namespace apps\home\model;
use core\lib\model;
class goodsCategory extends model{
  public $table = 'goods_category';
  /**
   * 读取全部数据
   */
  public function getAll($type){
    // sql
    $sql = "
        SELECT
                *
        FROM
                `$this->table`
        WHERE
                1 = 1
        AND
                type = '$type'
        ORDER BY
                sort ASC
    ";
    return $this->query($sql)->fetchAll();
  }

}

