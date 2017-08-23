<?php
namespace apps\admin\model;
use core\lib\model;
class groupGoods extends model{
  public $table = 'group_goods';
  /**
   * 写入数据表
   */
  public function add($data){
    $this->insert($this->table,$data);
    return $this->id();
  }

  /**
   * 读取拼团信息
   */
  public function getInfo($gid,$status){
    return $this->get($this->table,'*',['gid'=>$gid,'status'=>$status]);
  }

  /**
   * 更新数据表
   */
  public function save($id,$data){
    $res = $this->update($this->table,$data,['id'=>$id]);
    return $res->rowCount();
  }

  /**
   * 删除数据
   */
  public function del($gid){
    $res = $this->delete($this->table,['gid'=>$gid]);
    return $res->rowCount();
  }

}