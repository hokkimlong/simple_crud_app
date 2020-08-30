<?php

$host = "host";
$dbname = 'dbname';
$username = 'username';
$password = 'password';

$pdo = new PDO("mysql:host=$host;dbname=$dbname",$username,$password);

$createTableSQL = "CREATE TABLE IF NOT EXISTS`tbl_sales`(
                      `id` int PRIMARY KEY AUTO_INCREMENT,
                      `item` VARCHAR(100),
                      `extra` VARCHAR(50),
                      `price` DECIMAL(10,2),
                      `date_time` TIMESTAMP )";
$pdo->query($createTableSQL);

