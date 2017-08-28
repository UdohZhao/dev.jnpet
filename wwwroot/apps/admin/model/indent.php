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

  /**
   * 更新数据
   */
  public function save($id,$data){
    $res = $this->update($this->table,$data,['id'=>$id]);
    return $res->rowCount();
  }

  /**
   * 读取订单类型
   */
  public function getType($id,$openid){
    return $this->get($this->table,'type',['id'=>$id,'openid'=>$openid]);
  }

  /**
   * 删除订单
   */
  public function del($id){
    $res = $this->delete($this->table,['id'=>$id]);
    return $res->rowCount();
  }

}