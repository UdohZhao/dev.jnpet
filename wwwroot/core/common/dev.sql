# 后台用户表
CREATE TABLE `admin_user`(
    `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '后台用户表主键id',
    `username` varchar(50) NOT NULL COMMENT '用户名',
    `password` char(32) NOT NULL COMMENT '密码',
    `ctime` int(10) UNSIGNED NOT NULL COMMENT '时间',
    `status` tinyint(1) UNSIGNED NOT NULL COMMENT '状态？0>正常，1>冻结',
    `type` tinyint(1) UNSIGNED NOT NULL COMMENT '类型？0>超级管理员，1>普通管理员',
    PRIMARY KEY (`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;
# 订单表
CREATE TABLE `indent`(
    `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '订单表主键id',
    `ggid` int(11) UNSIGNED NOT NULL COMMENT '关联拼团商品表主键id',
    `openid` varchar(64) NOT NULL COMMENT '唯一标识，openid',
    `inumber` varchar(64) NOT NULL COMMENT '订单编号',
    `total_money` decimal(14,2) UNSIGNED NOT NULL COMMENT '总金额',
    `remarks` varchar(255) NOT NULL COMMENT '买家留言',
    `ctime` int(10) UNSIGNED NOT NULL COMMENT '创建时间',
    `ptime` int(10) UNSIGNED NOT NULL COMMENT '付款时间',
    `stime` int(10) UNSIGNED NOT NULL COMMENT '发货时间',
    `transportation` varchar(64) NOT NULL COMMENT '承运来源',
    `transport_number` varchar(64) NOT NULL COMMENT '运单编号',
    `itype` tinyint(1) UNSIGNED NOT NULL COMMENT '订单类型？0>普通，1>拼团',
    `type` tinyint(1) UNSIGNED NOT NULL COMMENT '类型？0>待付款，1>待发货，2>待收货，3>待评价，4>售后服务',
    `status` tinyint(1) UNSIGNED NOT NULL COMMENT '状态？0>待完善，1>正常，2>取消订单，3>订单超时，4>申请退款，5>退款失败，6>退款成功',
    PRIMARY KEY (`id`),
    KEY (`ggid`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;
# 订单商品表
CREATE TABLE `indent_goods`(
    `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '订单商品表主键id',
    `iid` int(11) UNSIGNED NOT NULL COMMENT '关联订单表主键id',
    `gid` int(11) UNSIGNED NOT NULL COMMENT '关联商品表主键id',
    `goods_name` varchar(50) NOT NULL COMMENT '商品名称',
    `goods_specification` varchar(25) NOT NULL COMMENT '商品规格',
    `goods_price` decimal(14,2) UNSIGNED NOT NULL COMMENT '商品价格',
    `quantity` tinyint(3) UNSIGNED NOT NULL COMMENT '购买数量',
    `status` tinyint(1) UNSIGNED NOT NULL COMMENT '状态？0>未评价，1>已评价',
    PRIMARY KEY (`id`),
    KEY (`iid`),
    KEY (`gid`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;
# 订单收货表
CREATE TABLE `indent_take_delivery`(
    `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '订单收货表主键id',
    `iid` int(11) UNSIGNED NOT NULL COMMENT '关联订单表主键id',
    `contacts` varchar(25) NOT NULL COMMENT '联系人',
    `phone` char(11) NOT NULL COMMENT '手机号码',
    `address` varchar(255) NOT NULL COMMENT '详细地址',
    `postal_code` varchar(25) NOT NULL COMMENT '邮政编码',
    PRIMARY KEY (`id`),
    KEY (`iid`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;
# 商品类别表
CREATE TABLE `goods_category`(
    `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '商品类别表主键id',
    `cname` varchar(25) NOT NULL COMMENT '类别名称',
    `sort` tinyint(3) UNSIGNED NOT NULL COMMENT '排序',
    `type` tinyint(1) UNSIGNED NOT NULL COMMENT '类型？0>普通，1>拼团',
    PRIMARY KEY (`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;
# 商品表
CREATE TABLE `goods`(
    `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '商品表主键id',
    `gcid` int(11) UNSIGNED NOT NULL COMMENT '关联商品类别表主键id',
    `cname` varchar(255) NOT NULL COMMENT '商品名称',
    `tips` varchar(255) NOT NULL COMMENT '小贴士',
    `original_price` decimal(14,2) UNSIGNED NOT NULL COMMENT '原价',
    `promotion_price` decimal(14,2) UNSIGNED NOT NULL COMMENT '促销价',
    `inventory` int(10) UNSIGNED NOT NULL COMMENT '库存',
    `content` varchar(50000) NOT NULL COMMENT '详情',
    `ctime` int(10) UNSIGNED NOT NULL COMMENT '时间',
    `type` tinyint(1) UNSIGNED NOT NULL COMMENT '类型？0>普通商品，1>拼团商品',
    `status` tinyint(1) UNSIGNED NOT NULL COMMENT '状态？0>上架，1>下架',
    PRIMARY KEY (`id`),
    KEY (`gcid`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;
# 商品封面表
CREATE TABLE `goods_cover`(
    `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '商品封面表主键id',
    `gid` int(11) UNSIGNED NOT NULL COMMENT '关联商品表主键id',
    `img_path` varchar(255) NOT NULL COMMENT '图片路径',
    PRIMARY KEY (`id`),
    KEY (`gid`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;
# 商品规格表
CREATE TABLE `goods_specification`(
    `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '商品规格表主键id',
    `gid` int(11) UNSIGNED NOT NULL COMMENT '关联商品表主键id',
    `cname` varchar(50) NOT NULL COMMENT '名称',
    PRIMARY KEY (`id`),
    KEY (`gid`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;
# 拼团商品表
CREATE TABLE `group_goods`(
    `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '拼团商品表主键id',
    `gid` int(11) UNSIGNED NOT NULL COMMENT '关联商品表主键id',
    `quantity` tinyint(3) UNSIGNED NOT NULL COMMENT '拼团人数',
    `start_time` int(10) UNSIGNED NOT NULL COMMENT '开始时间',
    `end_time` int(10) UNSIGNED NOT NULL COMMENT '结束时间',
    `type` tinyint(1) UNSIGNED NOT NULL COMMENT '类型？0>未激活订单，1>已激活订单',
    `status` tinyint(1) UNSIGNED NOT NULL COMMENT '状态？0>进行中，1>结束',
    PRIMARY KEY (`id`),
    KEY (`gid`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;
# 拼团加入表
CREATE TABLE `group_join`(
    `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '拼团加入表主键id',
    `ggid` int(11) UNSIGNED NOT NULL COMMENT '拼团加入表主键id',
    `openid` varchar(64) NOT NULL COMMENT '唯一标识，openid',
    `nickname` varchar(50) NOT NULL COMMENT '昵称',
    `avatarurl` varchar(255) NOT NULL COMMENT '头像',
    `ctime` int(10) UNSIGNED NOT NULL COMMENT '加入时间',
    PRIMARY KEY (`id`),
    KEY (`ggid`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;
# 商品评价表
CREATE TABLE `goods_estimate`(
    `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '商品评价表主键id',
    `gid` int(11) UNSIGNED NOT NULL COMMENT '商品表主键id',
    `specification` varchar(50) NOT NULL COMMENT '商品规格',
    `openid` varchar(64) NOT NULL COMMENT '唯一标识，openid',
    `nickname` varchar(50) NOT NULL COMMENT '昵称',
    `avatarurl` varchar(255) NOT NULL COMMENT '头像',
    `estimate` varchar(255) NOT NULL COMMENT '评价',
    `ctime` int(10) UNSIGNED NOT NULL COMMENT '时间',
    `status` tinyint(1) UNSIGNED NOT NULL COMMENT '状态？0>好评，1>中评，2>差评',
    PRIMARY KEY (`id`),
    KEY (`gid`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;
# 购物车表
CREATE TABLE `cart`(
    `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '购物车表主键id',
    `gid` int(11) UNSIGNED NOT NULL COMMENT '关联商品表主键id',
    `openid` varchar(64) NOT NULL COMMENT '唯一标识，openid',
    `specification` varchar(50) NOT NULL COMMENT '商品规格',
    `quantity` tinyint(3) UNSIGNED NOT NULL COMMENT '购买数量',
    `ctime` int(10) UNSIGNED NOT NULL COMMENT '时间',
    PRIMARY KEY (`id`),
    KEY (`gid`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;
# 优惠券表
CREATE TABLE `discount_coupon`(
    `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '优惠券表主键id',
    `show_language` varchar(50) NOT NULL COMMENT '展示语',
    `iprice` smallint(5) UNSIGNED NOT NULL COMMENT '订单价格',
    `price` smallint(5) UNSIGNED NOT NULL COMMENT '优惠价格',
    `sort` tinyint(3) UNSIGNED NOT NULL COMMENT '排序',
    PRIMARY KEY (`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;
# 宣传表
CREATE TABLE `publicity`(
    `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '宣传表主键id',
    `img_path` varchar(255) NOT NULL COMMENT '图片路径',
    PRIMARY KEY (`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;



