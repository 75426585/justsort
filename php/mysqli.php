<?php
error_reporting(E_ALL & ~E_NOTICE);
$mysqli = new mysqli("192.168.50.242","root","123qwe",'test') or die("数据库连接错误");
$mysqli->set_charset('utf8');
