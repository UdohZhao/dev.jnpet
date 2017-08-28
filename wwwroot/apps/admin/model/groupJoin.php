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
}