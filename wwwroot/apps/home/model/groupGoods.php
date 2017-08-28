<?php
namespace apps\home\model;
use core\lib\model;
class groupGoods extends model{
  public $table = 'group_goods';
  /**
   * 读取相关数据
   */
  public function getCorrelation($gid){
    return $this->get($this->table,'*',['gid'=>$gid,'status'=>'0']);
  }

  /**
   * 读取单条信息
   */
  public function getInfo($id){
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
   * 读取id
   */
  public function getId($gid){
    return $this->get($this->table,'id',['gid'=>$gid]);
  }



}

