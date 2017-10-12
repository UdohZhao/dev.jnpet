<?php
namespace apps\admin\model;
use core\lib\model;
class publicity extends model{
  public $table = 'publicity';
  /**
   * 写入数据表
   */
  public function add($data){
    $this->insert($this->table,$data);
    return $this->id();
  }

  /**
   * 读取单条数据
   */
  public function getInfo(){
    return $this->get($this->table,'*');
  }

  /**
   * 删除数据
   */
  public function del($id){
    $res = $this->delete($this->table,['id'=>$id]);
    return $res->rowCount();
  }

}