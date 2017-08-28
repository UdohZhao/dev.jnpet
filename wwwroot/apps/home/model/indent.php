<?php
namespace apps\home\model;
use core\lib\model;
class indent extends model{
  public $table = 'indent';
  /**
   * 写入数据表
   */
  public function add($data){
    $this->insert($this->table,$data);
    return $this->id();
  }

  /**
   * 读取单条信息
   */
  public function getInfo($id){
    return $this->get($this->table,'*',['id'=>$id]);
  }

  /**
   * 更新数据表
   */
  public function save($id,$data){
    $res = $this->update($this->table,$data,['id'=>$id]);
    return $res->rowCount();
  }

  /**
   * 读取相关数据
   */
  public function getCorrelation($openid,$itype){
    // sql
    $sql = "
        SELECT
                *
        FROM
                `$this->table`
        WHERE
                1 = 1
        AND
                openid = '$openid'
        AND
                itype = '$itype'
        ORDER BY
                ctime DESC
    ";
    return $this->query($sql)->fetchAll();
  }

  /**
   * 读取订单创建时间
   */
  public function getCtime($id){
    return $this->get($this->table,'ctime',['id'=>$id]);
  }

  /**
   * 读取订单类型
   */
  public function getItype($id){
    return $this->get($this->table,'itype',['id'=>$id]);
  }

  /**
   * 删除数据
   */
  public function del($id){
    $res = $this->delete($this->table,['id'=>$id]);
    return $res->rowCount();
  }

}

