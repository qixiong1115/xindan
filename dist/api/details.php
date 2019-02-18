<?php
/**
 * @Author: Marte
 * @Date:   2019-01-17 20:48:33
 * @Last Modified by:   Marte
 * @Last Modified time: 2019-01-21 14:44:23
 */
include 'connect.php';

$goodsid = isset($_GET['goodsid']) ? $_GET['goodsid'] : 1;

$sql = "SELECT * FROM goodslist WHERE goodsid=$goodsid";

$res = $conn -> query($sql);

$row = $res -> fetch_all(MYSQLI_ASSOC);

if($res -> num_rows > 0){
    $arr = array(
        "code" => 1,
        "data" => $row
    );
}else{
    $arr = array(
        "code" => 0,
        "data" => "传入参数有错误"
    );
}

echo json_encode($arr,JSON_UNESCAPED_UNICODE);

$res -> close();
$conn -> close();

?>