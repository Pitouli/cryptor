<?php
//Script de connexion à la BDD
$hst = "mysql13.000webhost.com";
$dbn = "a6022219_001";
$usr = "a6022219_admin";
$pwd = "1T15Rea11yDangeR0u5";

$dbl = mysql_connect($hst, $usr, $pwd);
mysql_select_db($dbn, $dbl);

?>