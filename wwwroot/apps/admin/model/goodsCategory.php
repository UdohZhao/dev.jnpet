<?php
namespace apps\admin\model;
use core\lib\model;
class goodsCategory extends model{
  public $table = 'goods_category';
  /**
   * 获取id
   */
  public function getId($cname,$type){
    return $this->get($this->table,'id',['cname'=>$cname,'type'=>$type]);
  }

  /**
   * 写入数据表
   */
  public function add($data){
    $this->insert($this->table,$data);
    return $this->id();
  }

  /**
   * 读取全部记录
   */
  public function getAll($type,$search,$limit){
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
        AND
                cname like '%$search%'
        ORDER BY
                sort ASC
        {$limit}
    ";
    return $this->query($sql)->fetchAll();
  }

  /**
   * 读取单条记录
   */
  public function getSingle($id){
    return $this->get($this->table,'*',['id'=>$id]);
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
   * 读取总记录数
   */
  public function totalRow($type){
    return $this->count($this->table,['type'=>$type]);
  }

  /**
   * 读取商品类别名称
   */
  public function getCname($id){
    return $this->get($this->table,'cname',['id'=>$id]);
  }


}