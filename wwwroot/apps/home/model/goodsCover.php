<?php
namespace apps\home\model;
use core\lib\model;
class goodsCover extends model{
  public $table = 'goods_cover';
  /**
   * 读取单个商品封面图片
   */
  public function getCover($gid){
    return $this->get($this->table,'img_path',['gid'=>$gid]);
  }

  /**
   * 读取全部商品封面图片
   */
  public function getAllCover($gid){
    return $this->select($this->table,'img_path',['gid'=>$gid]);
  }

}

