<?php
/**
 * @Author: Marte
 * @Date:   2019-01-21 14:51:11
 * @Last Modified by:   Marte
 * @Last Modified time: 2019-02-15 15:24:47
 */
include 'connect.php';

$uid = isset($_POST['uid']) ? $_POST['uid'] : 1;

$sql = "SELECT * FROM user_cart WHERE uid=$uid";

$res = $conn -> query($sql);

if($res){
    if($res -> num_rows > 0){
        $row = $res -> fetch_all(MYSQLI_ASSOC);
        // var_dump(count($row));
        $arr = array();
        for($i = 0; $i < count($row); $i++){
            $sql2 = "SELECT * FROM goodslist WHERE goodsid=" . $row[$i]['goodsid'];
            $res2 = $conn -> query($sql2);
            $all = $res2 -> fetch_all(MYSQLI_ASSOC)[0];
            $all["deleid"] = $row[$i]["deleid"];
            $all["nums"] = $row[$i]["num"];
            $arr[] = $all;
            
        }
        $datalist = array(
            "code" => 1,
            "datalist" => $arr,
            "message" => "加载完成"
        );
        $res2 -> close();
    }else{
        $datalist = array(
            "code" =>  2,
            "message" => "购物车内无商品"
        );
    }
}else{
    $datalist = array(
        "code" =>  0,
        "message" => "参数有误"
    );
}
echo json_encode($datalist,JSON_UNESCAPED_UNICODE);


$res -> close();
$conn -> close();
?>