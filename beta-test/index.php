<?php session_start();

require('users_n_code.php'); // contient les array $user_code et $code_user

if(isset($_GET['user']) AND isset($_GET['code'])) {
	$user = $_GET['user'];
	$code = $_GET['code'];
	if(!array_key_exists($user, $user_code)) {
		$identification_error = TRUE;
		unset($_SESSION['user']);
		unset($_SESSION['code']);
	}
	else {
		if($code != $user_code[$user]) {
			$identification_error = TRUE;
			unset($_SESSION['user']);
			unset($_SESSION['code']);
		}
		else {
			$_SESSION['user'] = $user;
			$_SESSION['code'] = $code;
		}
	}
}

$user = $_SESSION['user'];
$code = $_SESSION['code'];

if(!array_key_exists($user, $user_code)) {
	$identification_error = TRUE;
	unset($_SESSION['user']);
	unset($_SESSION['code']);
}
else {
	if($code != $user_code[$user]) {
		$identification_error = TRUE;
		unset($_SESSION['user']);
		unset($_SESSION['code']);
	}
}

if(in_array($_SESSION['user'], $user_admin)) {
	$_SESSION['admin'] = TRUE;
}
else {
	$_SESSION['admin'] = NULL;
	unset($_SESSION['admin']);
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
<p><a href="#zone_de_test">Aller directement à la zone de test</a><?php if($_SESSION['admin']) echo ' - <a href="admin.php">Panneau d\'administration</a>'; ?></p>
<h2>Introduction</h2>
<p>Merci à toi de t'être porté volontaire pour tester la dernière génération du bookmarklet, ou favoris intelligent, qui permet de crypter et décrypter &quot;en live&quot; le TWL2.0<br />
Tu vas pouvoir ici me transmettre facilement tes résultats. Il te suffit en effet de remplir pour chacun de tes tests (un test = 1 OS et 1 navigateur) un tableau et quelques champs supplémentaires.</p>
<p>Globablement, c'est très simple : il te suffit de rajouter le bookmarklet à tes favoris. Il s'agit d'un petit lien en javascript qui va permettre de récupérer un gros script javascript sur le serveur de TWL2 Online. Comme c'est du javascript, c'est dynamique, et donc certains navigateurs te préviennent par mesure de sûreté de cet état de chose (Internet Explorer par exemple). Ici, il n'y a aucun problème : la pire chose qui puisse arriver, c'est que ça ne fonctionne pas. </p>
<p>Pour rajouter le bookmarklet, tu as pleins de solutions : dans un certain nombre de navigateurs, il te suffit de faire un &quot;cliquer glisser&quot; du lien ci-dessous jusqu'à ta barre de favoris. Si ça ne marche pas, fais un clique droit dessus et choisis l'option qui ressemble à &quot;ajouter aux favoris&quot; ou à &quot;marque page&quot;. </p>
<p><a href="javascript:var%20b=document.body;void(z=document.createElement('script'));void(z.src='http://twl2.fr.nf/cryptndecrypt.js');void(b.appendChild(z))">TWL2 Online</a></p>
<p>Enfin, si même ça ne marchais pas, va dans ta barre/panneau de favoris, choisis d'ajouter un favoris, donne comme nom celui qui te plait (&quot;TWL2 Online&quot; par exemple) et indique cette adresse/url : </p>
<p>
  <input name="textfield" type="text" id="textfield" onclick="select()" value="javascript:var%20b=document.body;void(z=document.createElement('script'));void(z.src='http://twl2.fr.nf/cryptndecrypt.js');void(b.appendChild(z))" size="100" />
</p>
<h2>Utilisation</h2>
<p>L'utilisation est super simple : </p>
<ul>
  <li>Si tu sélectionnes à la souris du texte crypté dans une page (en dehors d'une zone de saisie) et que tu cliques sur le bookmarklet, un panneau apparait où ta sélection est décryptée.</li>
  <li>Si tu sélectionnes à la souris du texte en clair (non crypté) dans une page et que tu cliques sur le bookmarklet, un panneau apparait où ta sélection est cryptée.</li>
  <li>Si tu sélectionnes à la souris du texte crypté dans une zone de saisie (zone de rédaction de message par exemple) et que tu cliques sur le bookmarklet, ta sélection est remplacé par le texte décrypté, et un panneau apparait où ta sélection est décryptée.</li>
  <li>Si tu sélectionnes à la souris du texte en clair dans une zone de saisie et que tu cliques sur le bookmarklet, ta sélection est remplacée par le texte crypté.</li>
  <li>Si tu n'a pas sélectionné de texte et que ton curseur n'est pas dans une zone de saisie, un clic sur le bookmarklet agit comme un favoris normal en t'envoyant sur le site de TWL2 Online</li>
  <li>Si tu n'a pas sélectionné de texte et que ton curseur est  dans une zone de saisie, un clic sur le bookmarklet rajoute au niveau du curseur du code qui lorsque tu publies le message devient une petite barre pour faire connaitre le site, son bookmarklet et son tutoriel (à tester !)</li>
  </ul>
<p>Ce sont ces 6 cas qu'il s'agit de tester dans la suite.</p>
<h2 id="zone_de_test">Beta-test</h2>
<p>Pour démarrer un nouveau test : <a href="tableau.php">créer un nouveau tableau</a></p>
<p>Les tests que tu as déjà fait :</p>

<ul>
    <?php
$user = $_SESSION['user'];
$code = $_SESSION['code'];
$req = "SELECT * FROM betatest WHERE user = '$user' ORDER BY test_en_redac, OS, nav DESC";	
require('connect.php');
$rep = mysql_query($req) or die(mysql_error());
mysql_close();
		
while($data = mysql_fetch_array($rep)){	
	$id = $data['id'];		
	$OS = $data['OS'];
	$nav = $data['nav'];
	$test_en_redac = $data['test_en_redac'];
	$user_test = $data['user']
?>
  <li>
    <?=$OS?>, <?=$nav?> : <a href="tableau.php?edit=<?=$id?>"><?php if($test_en_redac) echo('EDITER'); else echo('éditer'); ?></a> - <a href="suppr-tableau.php?suppr=<?=$id?>" onclick="return confirm('Veux tu vraiment supprimer ton long et laborieux test ?');">supprimer</a> </li>
    <?php
} // Fin du WHILE
?>
</ul>
<h2>Le dernier mot</h2>
<p>Tu as accès à une interface qui te permet de discuter du bookmarklet selon l'OS et le navigateur. Si tu veux me soumettre des idées d'ordre plus général, écris moi un mp ou encore mieux, envoie moi un mail à <a href="mailto:zerawmaster@gmail.com">zerawmaster@gmail.com</a> !</p>
</div>
</body>
</html>
