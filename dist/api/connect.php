<?php
/**
 * @Author: Marte
 * @Date:   2019-01-11 17:08:23
 * @Last Modified by:   Marte
 * @Last Modified time: 2019-02-14 14:15:33
 */


$servername = 'localhost';//主机名
$username = 'root';//登陆数据库的用户名
$password = '';//如果用wamp就是为空，用phpstudy 密码是 root
$dbname = 'project_1811';//数据库名称

$conn = new mysqli($servername,$username,$password,$dbname);

//设置编码
$conn -> set_charset("utf8");
//测试是否成功
//js使用对象和方法：是用.      arr.length  arr.push()
//php使用对象和方法： ->     $conn->属性名    $conn->方法名()

// if($conn->connect_error) {
//     //打印这里，失败了
//     die('连接失败：'.$conn->connect_error);
// }else{
//     // 连接成功
//      echo '成功连接数据库';
// }


?>