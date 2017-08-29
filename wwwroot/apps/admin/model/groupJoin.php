<?php
namespace apps\admin\model;
use core\lib\model;
class groupJoin extends model{
  public $table = 'group_join';
  /**
   * 删除数据
   */
  public function del($gid){
    $res = $this->delete($this->table,['gid'=>$gid]);
    return $res->rowCount();
  }

  /**
   * 读取相关参团用户
   */
  public function getCorrelation($ggid){
    return $this->select($this->table,'*',['ggid'=>$ggid]);
  }

  /**
   * 删除相关参团用户
   */
  public function delCorrelation($id){
    $res = $this->delete($this->table,['id'=>$id]);
    return $res->rowCount();
  }


}