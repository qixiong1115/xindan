<?php
/**
 * @Author: Marte
 * @Date:   2019-01-22 14:57:48
 * @Last Modified by:   Marte
 * @Last Modified time: 2019-01-23 09:54:22
 */
include 'connect.php';

$deleid = isset($_GET['deleid']) ? $_GET['deleid'] : 1;
$type = isset($_GET['type']) ? $_GET['type'] : 'sud';


$sql = "SELECT goodsid,num FROM user_cart WHERE deleid=$deleid";
$res = $conn -> query($sql);
$row = $res -> fetch_all(MYSQLI_ASSOC)[0];

$num = $row['num'];
$goodsid = $row['goodsid'];

$sql2 = "SELECT quantity FROM goodslist WHERE goodsid=$goodsid";
$res2 = $conn -> query($sql2);
//存库
$row2 = $res2 -> fetch_all(MYSQLI_ASSOC)[0]['quantity'];

if($type == "add"){
    if($num < $row2){
        $num = $num + 1;
        $sql3 = "UPDATE user_cart SET num=$num WHERE deleid=$deleid";
        $res3 = $conn -> query($sql3);
        $arr = array(
            "code" => 1,
            "num" => $num,
            "type" => $type,
            "inventory" => $row2,
            "message" => '修改成功'
        );

    }else{
        $arr = array(
            "code" => 0,
            "num" => $num,
            "type" => $type,
            "inventory" => $row2,
            "message" => '已近达到最大'
        );
    }
}else if($type == "sud"){
    if($num > 1){
        $num = $num - 1;
        $sql3 = "UPDATE user_cart SET num=$num WHERE deleid=$deleid";
        $res3 = $conn -> query($sql3);
        $arr = array(
            "code" => 1,
            "num" => $num,
            "type" => $type,
            "inventory" => $row2,
            "message" => '修改成功'
        );
    }else{
        $arr = array(
            "code" => 0,
            "num" => $num,
            "type" => $type,
            "inventory" => $row2,
            "message" => '最小一件'
        );
    }
}else{
    $arr = array(
        "code" => 2,
        "type" => $type,
        "message" => '参数有误'
    );
}


echo json_encode($arr,JSON_UNESCAPED_UNICODE);

$conn -> close();

?>