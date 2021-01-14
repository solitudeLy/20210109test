<?php
// 1. 接受前端传递的数据
$username = $_POST['username'];
$password = $_POST['password'];


// 查询
// 查询数据库是否有获取到的username
  // 2-1. 准备 sql 语句
  $sql1 = "SELECT * FROM `users` WHERE `username`='$username'";
  // 2-2. 连接数据库
  $link1 = mysqli_connect('127.0.0.1', 'root', 'root', 'ysl');
  // 2-3. 执行 sql 语句
  $res1 = mysqli_query($link1, $sql1);
  // 2-4. 解析结果
  $data1 = mysqli_fetch_all($res1, MYSQLI_ASSOC);
  // 2-5. 关闭连接
  mysqli_close($link1);

  if (count($data1)) {
    // 用户重复
    $arr =array(
      "message" => "用户名重复注册失败",
      "code" => 0
    );
  } else {
    // 数据库不存在注册用户名，可插入

    // 2-1. 准备 sql 语句
    $sql = "INSERT INTO `users` VALUES(NULL, '$username', '$password', '$username')";
    // 2-2. 连接数据库
    $link = mysqli_connect('127.0.0.1', 'root', 'root', 'ysl');
    // 2-3. 执行 sql 语句
    $res = mysqli_query($link, $sql);
    // 2-5. 关闭连接
    mysqli_close($link);

    // 判断插入结果
  
    if ($res) {
      $arr = array(
        "message" => "注册成功",
        "code" => 1
      );
    } else {
      $arr = array(
        "message" => "注册失败",
        "code" => 0
      );
    }
  
    // // 返回一个 json 格式字符串
    echo json_encode($arr);

  }

?>
