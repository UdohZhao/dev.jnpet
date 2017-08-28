<?php
namespace apps\home\model;
use core\lib\model;
class goods extends model{
  public $table = 'goods';
  /**
   * 读取全部商品数据
   */
  public function getAll($type){
    // sql
    $sql = "
        SELECT
                id , cname , promotion_price , original_price
        FROM
                `$this->table`
        WHERE
                1 = 1
        AND
                type = '$type'
        AND
                status = '0'
        ORDER BY
                ctime DESC
    ";
    return $this->query($sql)->fetchAll();
  }

  /**
   * 读取相关数据
   */
  public function getCorrelation($gcid){
    // sql
    $sql = "
        SELECT
                id , cname , promotion_price , original_price
        FROM
                `$this->table`
        WHERE
                1 = 1
        AND
                gcid = '$gcid'
        AND
                status = '0'
        ORDER BY
                ctime DESC
    ";
    return $this->query($sql)->fetchAll();
  }

  /**
   * 读取详细信息
   */
  public function getInfo($id){
    return $this->get($this->table,'*',['id'=>$id]);
  }


}