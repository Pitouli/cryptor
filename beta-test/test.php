<?php 
$user_code = array(
"zeraw" => 170391, 
"will" => 517654
);

$encode = base64_encode($user_code);
$decode = base64_decode($encode);

print_r($decode);
?>