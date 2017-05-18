<?php
include('./mysqli.php');
$trees = $mysqli->query('select * from menu')->fetch_all(1);;
header("Content-Type:text/json;charset=utf-8");


foreach($trees as $v){
	if($v['parentId'] == 0){
		$arr[$v['id']] = $v;
	}else{
		$arr[$v['parentId']]['children'][] = $v;
	}
}
$arr = array_values($arr);
echo json_encode($arr);


