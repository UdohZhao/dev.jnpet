<?php
namespace apps\home\model;
use core\lib\model;
class cart extends model{
  public $table = 'cart';
  /**
   * 写入数据表
   */
  public function add($data){
    $this->insert($this->table,$data);
    return $this->id();
  }

  /**
   * 读取id
   */
  public function getId($openid,$specification,$gid){
    return $this->get($this->table,'id',['openid'=>$openid,'specification'=>$specification,'gid'=>$gid]);
  }

  /**
   * 读取购物车数据
   */
  public function getAll($openid){
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
      ORDER BY
              ctime DESC
    ";
    return $this->query($sql)->fetchAll();
  }

  /**
   * 删除数据
   */
  public function del($openid,$id){
    $res = $this->delete($this->table,['openid'=>$openid,'id'=>$id]);
    return $res->rowCount();
  }


}

