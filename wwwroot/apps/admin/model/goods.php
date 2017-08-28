<?php
namespace apps\admin\model;
use core\lib\model;
class goods extends model{
  public $table = 'goods';
  /**
   * 读取商品类别下的商品总记录数
   */
  public function countGcid($gcid){
    return $this->count($this->table,['gcid'=>$gcid]);
  }

  /**
   * 写入数据表
   */
  public function add($data){
    $this->insert($this->table,$data);
    return $this->id();
  }

  /**
   * 读取全部数据
   */
  public function getAll($gcid,$search,$limit){
    // sql
    $sql = "
        SELECT
                *
        FROM
                `$this->table`
        WHERE
                1 = 1
        AND
                gcid = '$gcid'
        AND
                cname like '%$search%'
        ORDER BY
                ctime DESC
        {$limit}
    ";
    return $this->query($sql)->fetchAll();
  }

  /**
   * 读取单条数据
   */
  public function getInfo($id){
    return $this->get($this->table,'*',['id'=>$id]);
  }

  /**
   * 获取id
   */
  public function getId($gcid,$cname){
    return $this->get($this->table,'id',['gcid'=>$gcid,'cname'=>$cname]);
  }

  /**
   * 更新数据
   */
  public function save($id,$data){
    $res = $this->update($this->table,$data,['id'=>$id]);
    return $res->rowCount();
  }

  /**
   * 删除数据
   */
  public function del($id){
    $res = $this->delete($this->table,['id'=>$id]);
    return $res->rowCount();
  }

  /**
   * 获取总记录数
   */
  public function totalRow($gcid){
    return $this->count($this->table,['gcid'=>$gcid]);
  }

  /**
   * 读取商品名称
   */
  public function getCname($id){
    return $this->get($this->table,'cname',['id'=>$id]);
  }

  /**
   * 更新状态
   */
  public function changeStatus($id,$status){
    $res = $this->update($this->table,['status'=>$status],['id'=>$id]);
    return $res->rowCount();
  }

}