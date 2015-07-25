<?php session_start();

require('users_n_code.php'); // contient les array $user_code et $code_user

$user = $_SESSION['user'];
$code = $_SESSION['code'];

if(!$_SESSION['admin']) {
	$identification_error = TRUE;
}

function color($var,$invert) { // Invert est un booléen
	if(($var AND !$invert) OR (!$var AND $invert)) {
		echo 'vert';
	}
	else {
		echo 'rouge';
	}	
}

if($identification_error) {
	echo('
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Connexion</title>
<link href="style.css" rel="stylesheet" type="text/css" />
</head>
<body>
<div id="corps">
<h1>Connexion</h1>
<p>
	<form action="index.php" method="get" name="form-identification">
		user : <input name="user" type="text" /><br />
		code : <input name="code" type="password" /><br />
		<input name="" type="submit" value="Se connecter" />
	</form>
</p>
</div>
</body>
</html>
');
	exit();
}
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Beta-test du bookmarklet</title>
<link href="style.css" rel="stylesheet" type="text/css" />
</head>

<body>
<div id="corps">
<h1>Compte-Rendu Beta-testeurs</h1>
<p><a href="index.php">Retour à l'index</a></p>
<h2>Compte-rendu des Beta-test</h2>
<table id="tableau_cr_admin">
  <tr class="tableau_titre">
    <td>OS</td>
    <td>Navigateur</td>
    <td>User</td>
    <td class="color_result">No PB</td>
    <td class="color_result">No Amelio</td>
    <td class="color_result">Redac Fini</td>
    <td>Action</td>
  </tr>

    <?php
$req = "SELECT * FROM betatest ORDER BY OS, nav DESC";
require('connect.php');
$rep = mysql_query($req) or die(mysql_error());
mysql_close();
			
while($data = mysql_fetch_array($rep)){	
	$id = $data['id'];		
	$OS = $data['OS'];
	$nav = $data['nav'];
	$test_en_redac = $data['test_en_redac'];
	$test_no_pb = $data['test_no_pb'];
	$test_no_amelio = $data['test_no_amelio'];
	$user_test = $data['user']
?>
  <tr>
    <td><?=$OS?></td>
    <td><?=$nav?></td>
    <td><?=$user_test?></td>
    <td class="<?php color($test_no_pb,0); ?>">&nbsp;</td>
    <td class="<?php color($test_no_amelio,0); ?>">&nbsp;</td>
    <td class="<?php color($test_en_redac,1); ?>">&nbsp;</td>
    <td><a href="tableau.php?edit=<?=$id?>">voir/éditer</a> - <a href="suppr-tableau.php?suppr=<?=$id?>" onclick="return confirm('Confirmer la suppression du test');">suppr</a></td>
  </tr>
<?php
} // Fin du WHILE
?>
</table>
<h2>Le fichier de connexion</h2>
<?php
	$filename = "users_n_code.php";
	if(isset($_POST['textarea_user_n_code'])) {
		$new_contents = $_POST['textarea_user_n_code'];
		$new_contents = stripslashes($new_contents);
		$handle = fopen ($filename, "r+");
		fseek($handle,0); 
		fputs($handle,$new_contents); 
		fclose ($handle); 
	}
	$handle = fopen ($filename, "r+");
	$contents = fread ($handle, filesize ($filename));
	fclose ($handle); 	
?>
<form id="form_user_n_code" method="post" action="admin.php">
  <p>
    <textarea name="textarea_user_n_code" id="textarea_user_n_code" cols="60" rows="10"><?=$contents?></textarea><br />
    <input type="submit" name="save_form_user_n_code" id="save_form_user_n_code" value="SAUVEGARDER" />
  </p>
</form>
<p>&nbsp;</p>
</div>
</body>
</html>
