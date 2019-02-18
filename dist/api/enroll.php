<?php
/**
 * @Author: Marte
 * @Date:   2019-01-17 09:46:18
 * @Last Modified by:   Marte
 * @Last Modified time: 2019-01-17 10:08:24
 */

include 'connect.php';

$username = isset($_POST['username']) ? $_POST['username'] : '';
$password = isset($_POST['password']) ? $_POST['password'] : '';

//插入语句
$sql = "INSERT INTO user(username,password) VALUES('$username','$password')";


if($username && $password){
    $res = $conn -> query($sql);
    if($res){
        $arr = array(
            "code" => 1,
            "message" => "注册成功",
            "username" => $username
        );
    }else{
        $arr = array(
            "code" => 0,
            "message" => "注册失败",
            "username" => $username
        );
    }


}else{
    $arr = array(
        "code" => 0,
        "message" => "内容不能为空"
    );
}


echo json_encode($arr,JSON_UNESCAPED_UNICODE);

$conn -> close();


?>