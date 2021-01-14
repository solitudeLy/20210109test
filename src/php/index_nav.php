<?php
// 
header('content-type: text/html;charset=utf-8;');
// 接收前段传来的数据
$firstName = $_GET['firstName'];

// 连接数据库
$sql = " SELECT '$firstName' FROM `nav` GROUP BY `first_list` ";

$link = mysqli_connect('127.0.0.1','root','root','ysl');

$res = mysqli_query($link,$sql);

$data = mysqli_fetch_all($res,MYSQLI_ASSOC);

mysqli_close($link);

// 返回结果给前端
if(count($data)){
    // 表示没获取到
    $arr = array(
        "second_list" =>$data['second_list'],
      )
};

$jsonstr = json_encode($arr);
echo $jsonstr;



?>