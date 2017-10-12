<?php
namespace apps\home\model;
use core\lib\model;
class groupJoin extends model{
  public $table = 'group_join';
  /**
   * 读取参团用户加入id
   */
  public function getGjId($ggid,$openid){
    return $this->get($this->table,'id',['ggid'=>$ggid,'openid'=>$openid]);
  }

  /**
   * 写入数据表
   */
  public function add($data){
    $this->insert($this->table,$data);
    return $this->id();
  }

  /**
   * 读取相关参团人数
   */
  public function getCcount($ggid){
    return $this->count($this->table,['ggid'=>$ggid]);
  }

  /**
   * 删除相关拼团加入数据
   */
  public function del($openid,$ggid){
    $res = $this->delete($this->table,['openid'=>$openid,'ggid'=>$ggid]);
    return $res->rowCount();
  }

}

