<?php
/**
 * @Author: Marte
 * @Date:   2019-01-16 20:49:11
 * @Last Modified by:   Marte
 * @Last Modified time: 2019-02-13 10:46:59
 */
include 'connect.php';

$username = isset($_POST['username']) ? $_POST['username'] : '';
$password = isset($_POST['password']) ? $_POST['password'] : '';

$sql = "SELECT * FROM user WHERE username='$username'";

//执行
$res = $conn -> query($sql);

// var_dump($res);

if($res -> num_rows <= 0){
    $arr = array(
        "code" => 1,
        "message" => '该用户名可注册'
    );
}else{
    $arr = array(
        "code" => 0,
        "message" => '该用户名以被注册'
    );
}

echo json_encode($arr , JSON_UNESCAPED_UNICODE);

$conn -> close();

?>