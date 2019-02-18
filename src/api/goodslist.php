<?php
/**
 * @Author: Marte
 * @Date:   2019-01-17 10:45:12
 * @Last Modified by:   Marte
 * @Last Modified time: 2019-01-23 09:17:58
 */

include 'connect.php';

$page = isset($_GET['page']) ? $_GET['page'] : '1';
$qty = isset($_GET['qty']) ? $_GET['qty'] : '10';//默认10条
$type = isset($_GET['type']) ? $_GET['type'] : 'goodsid';//默认goodsid排序
$order = isset($_GET['order']) ? $_GET['order'] : 'asc';//默认升序


$sql = "SELECT * FROM goodslist";

$res = $conn -> query($sql);

// $row = $res -> fetch_all(MYSQLI_ASSOC);


//起始的数据
$nums = ($page-1)*$qty;
// echo $nums;

$sql2 = "SELECT * FROM goodslist ORDER BY $type $order LIMIT $nums,$qty";

$res2 = $conn -> query($sql2);

$row2 = $res2 -> fetch_all(MYSQLI_ASSOC);


if($res2 -> num_rows >0){
    $arr = array(
        "code" => 1,//有数据
        "sum" => $res -> num_rows,//总条数
        "page" => $page,//当前页
        "list" => $row2,//数据
        "qty" => $qty,//每页多少条
        "type" =>$type,//排序类型
        "order" => $order//升降序
    );
}else{
    $arr = array(
        "code" => 0,
        "message" => "没有更多数据了"
    );
}


// var_dump($row2);
echo json_encode($arr,JSON_UNESCAPED_UNICODE);
$res -> close();
$res2 -> close();
$conn -> close();

?>