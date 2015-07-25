<?php session_start();

require('users_n_code.php'); // contient les array $user_code et $code_user

$user = $_SESSION['user'];
$code = $_SESSION['code'];

if(!array_key_exists($user, $user_code)) {
	echo('Une erreur a été générée : identification échouée. Retourner <a href="index.php">ici</a> pour l\'identification');
	exit();
}
else {
	if($code != $user_code[$user]) {
		echo('Une erreur a été générée : identification échouée. Retourner <a href="index.php">ici</a> pour l\'identification');
		exit();
	}
}

if(!is_numeric($_POST['edit']) AND $_POST['edit'] != 'new') {
	echo('Une erreur a été générée : il manque une variable importante');
	exit();
}
else {
	$edit = $_POST['edit'];
}

$res = $_POST;

if((!isset($res['Input_OS']) OR $res['Input_OS'] == NULL) OR (!isset($res['Input_Nav']) OR $res['Input_Nav'] == NULL)) {
	echo('Une erreur a été générée : il nous manque le nom de l\'OS et/ou du navigateur utilisé');
	exit();
}

$OS = $res['Input_OS'];
$nav = $res['Input_Nav'];
if($res['test_no_pb']) { $test_no_pb = 1; } else { $test_no_pb = 0; }
if($res['test_no_amelio']) { $test_no_amelio = 1; } else { $test_no_amelio = 0; }
if($res['test_en_redac']) { $test_en_redac = 1; } else { $test_en_redac = 0; }
$resultat = serialize($res);

if($edit == 'new') {
	require('connect.php');
	$req = "INSERT INTO betatest VALUES ('','$user','$code','$OS','$nav','$test_no_pb','$test_no_amelio','$test_en_redac','$resultat')";
	mysql_query($req) or die('Mysql error:'.mysql_error()); 
	mysql_close();
}
else {
	require('connect.php');
	$req = "UPDATE betatest SET OS='$OS', nav='$nav', test_no_pb='$test_no_pb', test_no_amelio='$test_no_amelio', test_en_redac='$test_en_redac', resultat='$resultat' WHERE id='$edit'";	
	mysql_query($req) or die('Mysql error:'.mysql_error()); 
	mysql_close();
}

?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="Refresh" content="3;URL=index.php" />
<title>Sauvegarde effectuée</title>
<link href="style.css" rel="stylesheet" type="text/css" />
</head>
<body>
<div id="corps">
  <p>Sauvegarde effectuée. Redirection dans 3 secondes.</p>
</div>
</body>
</html>
