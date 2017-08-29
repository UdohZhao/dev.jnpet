<?php
namespace apps\home\model;
use core\lib\model;
class goodsEstimate extends model{
  public $table = 'goods_estimate';
  /**
   * 写入数据
   */
  public function add($data){
    $this->insert($this->table,$data);
    return $this->id();
  }

  /**
   * 读取相关数据
   */
  public function getCorrelation($gid){
    // sql
    $sql = "
        select
                *
        from
                `$this->table`
        where
                1 = 1
        and
                gid = '$gid'
        order by
                ctime DESC
    ";
    return $this->query($sql)->fetchAll();
  }

}

