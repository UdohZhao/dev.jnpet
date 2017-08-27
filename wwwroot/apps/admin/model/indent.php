<?php
namespace apps\admin\model;
use core\lib\model;
class indent extends model{
  public $table = 'indent';
  /**
   * 读取全部订单数据
   */
  public function getAll($itype,$type){
    // sql
    $sql = "
        SELECT
                *
        FROM
                `$this->table`
        WHERE
                1 = 1
        AND
                itype = '$itype'
        AND
                type = '$type'
        ORDER BY
                ctime DESC
    ";
    return $this->query($sql)->fetchAll();
  }

}