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

if(!is_numeric($_GET['suppr'])) {
	echo('Une erreur a été générée : il manque une variable importante');
	exit();
}
else {
	$suppr = $_GET['suppr'];
}

	require('connect.php');
	if(!$_SESSION['admin']) { $req = "DELETE FROM betatest WHERE id='$suppr' AND user='$user'"; }
	else { $req = "DELETE FROM betatest WHERE id='$suppr'"; }
	mysql_query($req) or die('Mysql error:'.mysql_error()); 
	mysql_close();
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="Refresh" content="3;URL=index.php" />
<title>Suppression effectuée</title>
<link href="style.css" rel="stylesheet" type="text/css" />
</head>
<body>
<div id="corps">
  <p>Suppression effectuée. Redirection dans 3 secondes.</p>
</div>
</body>
</html>
