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
   * 读取拼团信息s
   */
  public function getInfos($id){
    return $this->get($this->table,'*',['id'=>$id]);
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
  public function getCorrelation($gid,$limit){
    // sql
    $sql = "
        SELECT
                *
        FROM
                `$this->table`
        WHERE
                1 = 1
        AND
                gid = '$gid'
        ORDER BY
                id DESC
        {$limit}
    ";
    return $this->query($sql)->fetchAll();
  }

  /**
   * 读取正在进行中的配置
   */
  public function getConfig($gid,$status){
    return $this->get($this->table,'*',['gid'=>$gid,'status'=>$status]);
  }

  /**
   * 读取id
   */
  public function getId($gid){
    // sql
    $sql = "
        SELECT
                id
        FROM
                `$this->table`
        WHERE
                1 = 1
        AND
                gid = '$gid'
        ORDER BY
                id DESC
    ";
    return $this->query($sql)->fetch();
  }

  /**
   * 读取总记录数
   */
  public function totalRow($gid){
    return $this->count($this->table,['gid'=>$gid]);
  }

}