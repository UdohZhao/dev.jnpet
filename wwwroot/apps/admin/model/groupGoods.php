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
  public function getInfo($gid){
    return $this->get($this->table,'*',['gid'=>$gid]);
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

  /**
   * 读取相关拼团数据
   */
  public function getCorrelation($gid){
    // sql
    $sql = "
        select
                *
        from
                `$this->table`
        where
                1 = 1
        and
                gid = '$gid'
        order by
                end_time DESC
    ";
    return $this->query($sql)->fetchAll();
  }

  /**
   * 读取正在进行中的配置
   */
  public function getConfig($gid,$status){
    return $this->get($this->table,'*',['gid'=>$gid,'status'=>$status]);
  }

}