<?php
namespace apps\home\model;
use core\lib\model;
class indentGoods extends model{
  public $table = 'indent_goods';
  /**
   * 写入数据表
   */
  public function add($data){
    $this->insert($this->table,$data);
    return $this->id();
  }

  /**
   * 读取相关数据
   */
  public function getCorrelation($iid){
    return $this->select($this->table,'*',['iid'=>$iid]);
  }

  /**
   * 读取订单商品id
   */
  public function getGid($iid){
    return $this->get($this->table,'gid',['iid'=>$iid]);
  }

  /**
   * 读取商品销售量
   */
  public function getgCorrelation($gid){
    return $this->count($this->table,['gid'=>$gid]);
  }

  /**
   * 删除数据
   */
  public function del($iid){
    $res = $this->delete($this->table,['iid'=>$iid]);
    return $res->rowCount();
  }

  /**
   * 更新订单商品状态
   */
  public function saveStatus($iid,$gid,$specification,$data){
    $res = $this->update($this->table,$data,['iid'=>$iid,'gid'=>$gid,'goods_specification'=>$specification]);
    return $res->rowCount();
  }

}

