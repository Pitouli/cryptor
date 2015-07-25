<?php session_start();

require('users_n_code.php'); // contient les array $user_code et $code_user

$user = $_SESSION['user'];
$code = $_SESSION['code'];

if(!array_key_exists($user, $user_code)) {
	echo('Une erreur a été générée : identification échouée. Retourner <a href="index.php">ici</a> pour l\'identification');
	unset($_SESSION['user']);
	unset($_SESSION['code']);
	exit();
}
else {
	if($code != $user_code[$user]) {
		echo('Une erreur a été générée : identification échouée. Retourner <a href="index.php">ici</a> pour l\'identification');
		unset($_SESSION['user']);
		unset($_SESSION['code']);
		exit();
	}
}

function color($edit,$var) {
	if(is_numeric($edit)) {
		if($var) {
			echo 'vert';
		}
		else {
			echo 'rouge';
		}	
	}
}
	

if(is_numeric($_GET['edit'])) {
	$edit = $_GET['edit'];
	require('connect.php');
	$req = "SELECT * FROM betatest WHERE id='$edit'";
	$recup = mysql_fetch_array(mysql_query($req));
	$res = unserialize($recup['resultat']);
	mysql_close();
	if($recup['user'] != $user AND !$_SESSION['admin']) {
		echo('Une erreur a été générée : le tableau demandé ne semble pas vous appartenir.');
		exit();
	}
}
else {
	$edit = 'new';
}
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Tableau de beta-test du bookmarklet</title>
<link href="style.css" rel="stylesheet" type="text/css" />
</head>

<body>
<div id="corps">
<form id="form_tableau" method="post" action="save-tableau.php">
<input name="edit" type="hidden" value="<?=$edit?>" />
<h1>Tableau de beta-test</h1>
<p><a href="index.php">Retour à l'accueil</a></p>
<p>Entrons dans le vif du sujet. Pour créer un nouveau tableau de test, indique le système d'opération que tu comptes utiliser de manière à peu près précise (Windows Seven pro est largement suffisant... A priori que ce soit le build 4678 ou 5786 ne changera pas grand chose !) ainsi que le navigateur (là, on va dire que la version est un peu plus importante. Ne tombons pas dans l'excès non plus !)</p>
<p>Pour me faciliter la tâche, si tu pouvais écrire les noms en copiant (et adaptant) ce modèle, ça m'arrangerait : Windows XP, Windows Vista Pro, Windows Seven Ultimate, Mac OS X, Linux Ubuntu, Firefox 2, Firefox 3.5, Internet Explorer 8, Safari 4, etc.</p>
<p>Puis réponds &quot;oui&quot; à chaque critère en cochant la case en regard de celui ci, ou &quot;non&quot; en la décochant (ou en la laissant décochée). Tu peux si besoin (et si possible à chaque fois que tu ne coche pas la case) ajouter des commentaires ou des indications dans les champs de texte qui suivent les cases.</p>
<p>Je n'ai pas voulu passer trop de temps à créer cette interface de beta testage, et j'ai donc été assez &quot;brutal&quot; dans la gestion des erreurs. Donc si ça plante, lis l'information qui t'es donnée, et essaie de recommencer en la prenant en compte ! Par exemple, un test peut être complété en plusieurs fois (voir la note important qui suit), mais doit impérativement comporté le nom de l'OS et du navigateur pour être sauvegardé.</p>
<p>Note importante : tu peux remplir le tableau en plusieurs fois, et l'éditer à tout instant. Cependant, si tu sais qu'il n'est pas complet, pense à cocher la dernière case tout en bas, (elle est collée au bouton de sauvegarde) ! De même, histoire de me faire gagner du temps, tu trouveras à la fin du test un micro tableau pour me dire si oui ou non il est utile que je vienne le lire. Attention ! Un tableau où tout est considéré comme parfait n'est pas un mauvais tableau ! Cela me permettra au contraire d'indiquer que le bookmarklet est compatible avec l'OS et le navigateur utilisé !</p>
<h2>Tableau de résultat</h2>
<p>Merci de le remplir INTEGRALEMENT (les cases de commentaires peuvent ne pas être remplies, et evidemment si un problème est révélé lors du test, des cases peuvent ne pas être cochées). Remarque supplémentaire : tout est tourné de manière à ce qu'une case coché signifie&quot;bien&quot;. La tournure &quot;Pas d'amélioration à faire&quot; n'est pas une incitation à ne pas en proposer !!</p>
<table id="tableau_test">
  <tr>
    <td>Système d'exploitation</td>
    <td class="td_input"><input type="text" class="input_text" name="Input_OS" id="Input_OS" value="<?=$res['Input_OS']?>" /></td>
  </tr>
  <tr>
    <td>Navigateur utilisé</td>
    <td class="td_input"><input type="text" class="input_text" name="Input_Nav" id="Input_Nav" value="<?=$res['Input_Nav']?>" /></td>
  </tr>
  <tr>
    <td colspan="2" class="tableau_titre1"><div align="center">Hors Zone de Texte</div></td>
  </tr>
  <tr>
    <td colspan="2" class="tableau_titre2"><div align="center">Sélection de texte crypté</div></td>
  </tr>
  <tr>
    <td>Decryptage effectif</td>
    <td class="td_input <?php color($edit,$res['HZT_SelCry_1']); ?>"><input name="HZT_SelCry_1" type="checkbox" class="input_checkbox" id="HZT_SelCry_1" <?php if($res['HZT_SelCry_1']) echo 'checked="checked"'; ?> />
        <input type="text" class="input_text" value="<?=$res['HZT_SelCry_Com_1']?>" name="HZT_SelCry_Com_1" id="HZT_SelCry_Com_1" /></td>
  </tr>
  <tr>
    <td>Apparition d'un panneau</td>
    <td class="td_input <?php color($edit,$res['HZT_SelCry_2']); ?>"><input type="checkbox" class="input_checkbox" name="HZT_SelCry_2" id="HZT_SelCry_2" <?php if($res['HZT_SelCry_2']) echo 'checked="checked"'; ?> /> 
        <input type="text" class="input_text" value="<?=$res['HZT_SelCry_Com_2']?>" name="HZT_SelCry_Com_2" id="HZT_SelCry_Com_2" /></td>
  </tr>
  <tr>
    <td>Bonne transformation des urls en liens</td>
    <td class="td_input <?php color($edit,$res['HZT_SelCry_3']); ?>"><input type="checkbox" class="input_checkbox" name="HZT_SelCry_3" id="HZT_SelCry_3" <?php if($res['HZT_SelCry_3']) echo 'checked="checked"'; ?> />
        <input type="text" class="input_text" value="<?=$res['HZT_SelCry_Com_3']?>" name="HZT_SelCry_Com_3" id="HZT_SelCry_Com_3" /></td>
  </tr>
  <tr>
    <td>La fonction &quot;fermer&quot; du panneau fonctionne</td>
    <td class="td_input <?php color($edit,$res['HZT_SelCry_4']); ?>"><input type="checkbox" class="input_checkbox" name="HZT_SelCry_4" id="HZT_SelCry_4" <?php if($res['HZT_SelCry_4']) echo 'checked="checked"'; ?> />
        <input type="text" class="input_text" value="<?=$res['HZT_SelCry_Com_4']?>" name="HZT_SelCry_Com_4" id="HZT_SelCry_Com_4" /></td>
  </tr>
  <tr>
    <td>La fonction &quot;autre interface&quot; du panneau fonctionne</td>
    <td class="td_input <?php color($edit,$res['HZT_SelCry_5']); ?>"><input type="checkbox" class="input_checkbox" name="HZT_SelCry_5" id="HZT_SelCry_5" <?php if($res['HZT_SelCry_5']) echo 'checked="checked"'; ?> />
        <input type="text" class="input_text" value="<?=$res['HZT_SelCry_Com_5']?>" name="HZT_SelCry_Com_5" id="HZT_SelCry_Com_5" /></td>
  </tr>
  <tr>
    <td>La fonction &quot;sélectionner&quot; du panneau fonctionne</td>
    <td class="td_input <?php color($edit,$res['HZT_SelCry_6']); ?>"><input type="checkbox" class="input_checkbox" name="HZT_SelCry_6" id="HZT_SelCry_6" <?php if($res['HZT_SelCry_6']) echo 'checked="checked"'; ?> />
        <input type="text" class="input_text" value="<?=$res['HZT_SelCry_Com_6']?>" name="HZT_SelCry_Com_6" id="HZT_SelCry_Com_6" /></td>
  </tr>
  <tr>
    <td>Quand le texte est long, apparition d'une scrollbar</td>
    <td class="td_input <?php color($edit,$res['HZT_SelCry_7']); ?>"><input type="checkbox" class="input_checkbox" name="HZT_SelCry_7" id="HZT_SelCry_7" <?php if($res['HZT_SelCry_7']) echo 'checked="checked"'; ?> />
        <input type="text" class="input_text" value="<?=$res['HZT_SelCry_Com_7']?>" name="HZT_SelCry_Com_7" id="HZT_SelCry_Com_7" /></td>
  </tr>
  <tr>
    <td>Si TWL2.1, message clair d'explication</td>
    <td class="td_input <?php color($edit,$res['HZT_SelCry_8']); ?>"><input type="checkbox" class="input_checkbox" name="HZT_SelCry_8" id="HZT_SelCry_8" <?php if($res['HZT_SelCry_8']) echo 'checked="checked"'; ?> />
        <input type="text" class="input_text" value="<?=$res['HZT_SelCry_Com_8']?>" name="HZT_SelCry_Com_8" id="HZT_SelCry_Com_8" /></td>
  </tr>
  <tr>
    <td>Respect de la mise en forme originale (saut de lignes)</td>
    <td class="td_input <?php color($edit,$res['HZT_SelCry_9']); ?>"><input type="checkbox" class="input_checkbox" name="HZT_SelCry_9" id="HZT_SelCry_9" <?php if($res['HZT_SelCry_9']) echo 'checked="checked"'; ?> />
        <input type="text" class="input_text" value="<?=$res['HZT_SelCry_Com_9']?>" name="HZT_SelCry_Com_9" id="HZT_SelCry_Com_9" /></td>
  </tr>
  <tr>
    <td>Pas d'aberration esthétique</td>
    <td class="td_input <?php color($edit,$res['HZT_SelCry_10']); ?>"><input type="checkbox" class="input_checkbox" name="HZT_SelCry_10" id="HZT_SelCry_10" <?php if($res['HZT_SelCry_10']) echo 'checked="checked"'; ?> />
        <input type="text" class="input_text" value="<?=$res['HZT_SelCry_Com_10']?>" name="HZT_SelCry_Com_10" id="HZT_SelCry_Com_10" /></td>
  </tr>
  <tr>
    <td>Pas de problème de sécurité</td>
    <td class="td_input <?php color($edit,$res['HZT_SelCry_11']); ?>"><input type="checkbox" class="input_checkbox" name="HZT_SelCry_11" id="HZT_SelCry_11" <?php if($res['HZT_SelCry_11']) echo 'checked="checked"'; ?> />
        <input type="text" class="input_text" value="<?=$res['HZT_SelCry_Com_11']?>" name="HZT_SelCry_Com_11" id="HZT_SelCry_Com_11" /></td>
  </tr>
  <tr>
    <td>Pas de corrections à apporter</td>
    <td class="td_input <?php color($edit,$res['HZT_SelCry_12']); ?>"><input type="checkbox" class="input_checkbox" name="HZT_SelCry_12" id="HZT_SelCry_12" <?php if($res['HZT_SelCry_12']) echo 'checked="checked"'; ?> />
        <input type="text" class="input_text" value="<?=$res['HZT_SelCry_Com_12']?>" name="HZT_SelCry_Com_12" id="HZT_SelCry_Com_12" /></td>
  </tr>
  <tr>
    <td>Pas d'améliorations à apporter</td>
    <td class="td_input <?php color($edit,$res['HZT_SelCry_13']); ?>"><input type="checkbox" class="input_checkbox" name="HZT_SelCry_13" id="HZT_SelCry_13" <?php if($res['HZT_SelCry_13']) echo 'checked="checked"'; ?> />
        <input type="text" class="input_text" value="<?=$res['HZT_SelCry_Com_13']?>" name="HZT_SelCry_Com_13" id="HZT_SelCry_Com_13" /></td>
  </tr>
  <tr>
    <td colspan="2" class="tableau_titre2"><div align="center">Sélection de texte clair</div></td>
  </tr>
  <tr>
    <td>Cryptage effectif</td>
    <td class="td_input <?php color($edit,$res['HZT_SelClair_1']); ?>"><input type="checkbox" class="input_checkbox" name="HZT_SelClair_1" id="HZT_SeclClair_1" <?php if($res['HZT_SelClair_1']) echo 'checked="checked"'; ?> />
        <input type="text" class="input_text" value="<?=$res['HZT_SelClair_Com_1']?>" name="HZT_SelClair_Com_1" id="HZT_SelClair_Com_1" /></td>
  </tr>
  <tr>
    <td>Apparition d'un panneau</td>
    <td class="td_input <?php color($edit,$res['HZT_SelClair_2']); ?>"><input type="checkbox" class="input_checkbox" name="HZT_SelClair_2" id="HZT_SeclClair_2" <?php if($res['HZT_SelClair_2']) echo 'checked="checked"'; ?> />
        <input type="text" class="input_text" value="<?=$res['HZT_SelClair_Com_2']?>" name="HZT_SelClair_Com_2" id="HZT_SelClair_Com_2" /></td>
  </tr>
  <tr>
    <td>La fonction &quot;fermer&quot; du panneau fonctionne</td>
    <td class="td_input <?php color($edit,$res['HZT_SelClair_3']); ?>"><input type="checkbox" class="input_checkbox" name="HZT_SelClair_3" id="HZT_SeclClair_3" <?php if($res['HZT_SelClair_3']) echo 'checked="checked"'; ?> />
        <input type="text" class="input_text" value="<?=$res['HZT_SelClair_Com_3']?>" name="HZT_SelClair_Com_3" id="HZT_SelClair_Com_3" /></td>
  </tr>
  <tr>
    <td>La fonction &quot;autre interface&quot; du panneau fonctionne</td>
    <td class="td_input <?php color($edit,$res['HZT_SelClair_4']); ?>"><input type="checkbox" class="input_checkbox" name="HZT_SelClair_4" id="HZT_SeclClair_4" <?php if($res['HZT_SelClair_4']) echo 'checked="checked"'; ?> />
        <input type="text" class="input_text" value="<?=$res['HZT_SelClair_Com_4']?>" name="HZT_SelClair_Com_4" id="HZT_SelClair_Com_4" /></td>
  </tr>
  <tr>
    <td>La fonction &quot;sélectionner&quot; du panneau fonctionne</td>
    <td class="td_input <?php color($edit,$res['HZT_SelClair_5']); ?>"><input type="checkbox" class="input_checkbox" name="HZT_SelClair_5" id="HZT_SeclClair_5" <?php if($res['HZT_SelClair_5']) echo 'checked="checked"'; ?> />
        <input type="text" class="input_text" value="<?=$res['HZT_SelClair_Com_5']?>" name="HZT_SelClair_Com_5" id="HZT_SelClair_Com_5" /></td>
  </tr>
  <tr>
    <td>Pas d'aberration esthétique</td>
    <td class="td_input <?php color($edit,$res['HZT_SelClair_6']); ?>"><input type="checkbox" class="input_checkbox" name="HZT_SelClair_6" id="HZT_SeclClair_6" <?php if($res['HZT_SelClair_6']) echo 'checked="checked"'; ?> />
        <input type="text" class="input_text" value="<?=$res['HZT_SelClair_Com_6']?>" name="HZT_SelClair_Com_6" id="HZT_SelClair_Com_6" /></td>
  </tr>
  <tr>
    <td>Pas de problème de sécurité</td>
    <td class="td_input <?php color($edit,$res['HZT_SelClair_7']); ?>"><input type="checkbox" class="input_checkbox" name="HZT_SelClair_7" id="HZT_SeclClair_7" <?php if($res['HZT_SelClair_7']) echo 'checked="checked"'; ?> />
        <input type="text" class="input_text" value="<?=$res['HZT_SelClair_Com_7']?>" name="HZT_SelClair_Com_7" id="HZT_SelClair_Com_7" /></td>
  </tr>
  <tr>
    <td>Pas de corrections à apporter</td>
    <td class="td_input <?php color($edit,$res['HZT_SelClair_8']); ?>"><input type="checkbox" class="input_checkbox" name="HZT_SelClair_8" id="HZT_SeclClair_8" <?php if($res['HZT_SelClair_8']) echo 'checked="checked"'; ?> />
        <input type="text" class="input_text" value="<?=$res['HZT_SelClair_Com_8']?>" name="HZT_SelClair_Com_8" id="HZT_SelClair_Com_8" /></td>
  </tr>
  <tr>
    <td>Pas d'améliorations à apporter</td>
    <td class="td_input <?php color($edit,$res['HZT_SelClair_9']); ?>"><input type="checkbox" class="input_checkbox" name="HZT_SelClair_9" id="HZT_SeclClair_9" <?php if($res['HZT_SelClair_9']) echo 'checked="checked"'; ?> />
        <input type="text" class="input_text" value="<?=$res['HZT_SelClair_Com_9']?>" name="HZT_SelClair_Com_9" id="HZT_SelClair_Com_9" /></td>
  </tr>
  <tr>
    <td colspan="2" class="tableau_titre2"><div align="center">Pas de sélection</div></td>
  </tr>
  <tr>
    <td>Clic gauche sur le bookmarklet = ouverture dans l'onglet du site TWL2 Online</td>
    <td class="td_input <?php color($edit,$res['HZT_PasSel_1']); ?>"><input type="checkbox" class="input_checkbox" name="HZT_PasSel_1" id="HZT_PasSel_1" <?php if($res['HZT_PasSel_1']) echo 'checked="checked"'; ?> />
        <input type="text" class="input_text" value="<?=$res['HZT_PasSel_Com_1']?>" name="HZT_PasSel_Com_1" id="HZT_PasSel_Com_1" /></td>
  </tr>
  <tr>
    <td>Clic roulette sur le bookmarklet = ouverture dans un nouvel onglet du site TWL2 Online</td>
    <td class="td_input <?php color($edit,$res['HZT_PasSel_2']); ?>"><input type="checkbox" class="input_checkbox" name="HZT_PasSel_2" id="HZT_PasSel_2" <?php if($res['HZT_PasSel_2']) echo 'checked="checked"'; ?> />
        <input type="text" class="input_text" value="<?=$res['HZT_PasSel_Com_2']?>" name="HZT_PasSel_Com_2" id="HZT_PasSel_Com_2" /></td>
  </tr>
  <tr>
    <td>Pas de corrections à apporter</td>
    <td class="td_input <?php color($edit,$res['HZT_PasSel_3']); ?>"><input type="checkbox" class="input_checkbox" name="HZT_PasSel_3" id="HZT_PasSel_3" <?php if($res['HZT_PasSel_3']) echo 'checked="checked"'; ?> />
        <input type="text" class="input_text" value="<?=$res['HZT_PasSel_Com_3']?>" name="HZT_PasSel_Com_3" id="HZT_PasSel_Com_3" /></td>
  </tr>
  <tr>
    <td>Pas d'améliorations à apporter</td>
    <td class="td_input <?php color($edit,$res['HZT_PasSel_4']); ?>"><input type="checkbox" class="input_checkbox" name="HZT_PasSel_4" id="HZT_PasSel_4" <?php if($res['HZT_PasSel_4']) echo 'checked="checked"'; ?> />
        <input type="text" class="input_text" value="<?=$res['HZT_PasSel_Com_4']?>" name="HZT_PasSel_Com_4" id="HZT_PasSel_Com_4" /></td>
  </tr>
  <tr>
    <td colspan="2" class="tableau_titre1"><div align="center">Dans une Zone de Texte</div></td>
  </tr>
  <tr>
    <td colspan="2" class="tableau_titre2"><div align="center">Sélection de texte crypté</div></td>
  </tr>
  <tr>
    <td>Décryptage et remplacement du cryptage dans la zone de texte</td>
    <td class="td_input <?php color($edit,$res['ZT_SelCry_1']); ?>"><input type="checkbox" class="input_checkbox" name="ZT_SelCry_1" id="ZT_SelCry_1" <?php if($res['ZT_SelCry_1']) echo 'checked="checked"'; ?> />
        <input type="text" class="input_text" value="<?=$res['ZT_SelCry_Com_1']?>" name="ZT_SelCry_Com_1" id="ZT_SelCry_Com_1" /></td>
  </tr>
  <tr>
    <td>Repositionnement du curseur à la fin du décryptage</td>
    <td class="td_input <?php color($edit,$res['ZT_SelCry_2']); ?>"><input type="checkbox" class="input_checkbox" name="ZT_SelCry_2" id="ZT_SelCry_2" <?php if($res['ZT_SelCry_2']) echo 'checked="checked"'; ?> />
        <input type="text" class="input_text" value="<?=$res['ZT_SelCry_Com_2']?>" name="ZT_SelCry_Com_2" id="ZT_SelCry_Com_2" /></td>
  </tr>
  <tr>
    <td>Repositionnement de la scrollbar de la zone de texte à l'endroit adéquat</td>
    <td class="td_input <?php color($edit,$res['ZT_SelCry_3']); ?>"><input type="checkbox" class="input_checkbox" name="ZT_SelCry_3" id="ZT_SelCry_3" <?php if($res['ZT_SelCry_3']) echo 'checked="checked"'; ?> />
        <input type="text" class="input_text" value="<?=$res['ZT_SelCry_Com_3']?>" name="ZT_SelCry_Com_3" id="ZT_SelCry_Com_3" /></td>
  </tr>
  <tr>
    <td>Décryptage et apparition d'un panneau</td>
    <td class="td_input <?php color($edit,$res['ZT_SelCry_4']); ?>"><input type="checkbox" class="input_checkbox" name="ZT_SelCry_4" id="ZT_SelCry_4" <?php if($res['ZT_SelCry_4']) echo 'checked="checked"'; ?> />
        <input type="text" class="input_text" value="<?=$res['ZT_SelCry_Com_4']?>" name="ZT_SelCry_Com_4" id="ZT_SelCry_Com_4" /></td>
  </tr>
  <tr>
    <td>Dans le panneau, bonne transformation des urls en liens</td>
    <td class="td_input <?php color($edit,$res['ZT_SelCry_5']); ?>"><input type="checkbox" class="input_checkbox" name="ZT_SelCry_5" id="ZT_SelCry_5" <?php if($res['ZT_SelCry_5']) echo 'checked="checked"'; ?> />
        <input type="text" class="input_text" value="<?=$res['ZT_SelCry_Com_5']?>" name="ZT_SelCry_Com_5" id="ZT_SelCry_Com_5" /></td>
  </tr>
  <tr>
    <td>Dans le panneau, la fonction &quot;fermer&quot; du panneau fonctionne</td>
    <td class="td_input <?php color($edit,$res['ZT_SelCry_6']); ?>"><input type="checkbox" class="input_checkbox" name="ZT_SelCry_6" id="ZT_SelCry_6" <?php if($res['ZT_SelCry_6']) echo 'checked="checked"'; ?> />
        <input type="text" class="input_text" value="<?=$res['ZT_SelCry_Com_6']?>" name="ZT_SelCry_Com_6" id="ZT_SelCry_Com_6" /></td>
  </tr>
  <tr>
    <td>Dans le panneau, la fonction &quot;autre interface&quot; du panneau fonctionne</td>
    <td class="td_input <?php color($edit,$res['ZT_SelCry_7']); ?>"><input type="checkbox" class="input_checkbox" name="ZT_SelCry_7" id="ZT_SelCry_7" <?php if($res['ZT_SelCry_7']) echo 'checked="checked"'; ?> />
        <input type="text" class="input_text" value="<?=$res['ZT_SelCry_Com_7']?>" name="ZT_SelCry_Com_7" id="ZT_SelCry_Com_7" /></td>
  </tr>
  <tr>
    <td>Dans le panneau, la fonction &quot;sélectionner&quot; du panneau fonctionne</td>
    <td class="td_input <?php color($edit,$res['ZT_SelCry_8']); ?>"><input type="checkbox" class="input_checkbox" name="ZT_SelCry_8" id="ZT_SelCry_8" <?php if($res['ZT_SelCry_8']) echo 'checked="checked"'; ?> />
        <input type="text" class="input_text" value="<?=$res['ZT_SelCry_Com_8']?>" name="ZT_SelCry_Com_8" id="ZT_SelCry_Com_8" /></td>
  </tr>
  <tr>
    <td>Dans le panneau, quand le texte est long, apparition d'une scrollbar</td>
    <td class="td_input <?php color($edit,$res['ZT_SelCry_9']); ?>"><input type="checkbox" class="input_checkbox" name="ZT_SelCry_9" id="ZT_SelCry_9" <?php if($res['ZT_SelCry_9']) echo 'checked="checked"'; ?> />
        <input type="text" class="input_text" value="<?=$res['ZT_SelCry_Com_9']?>" name="ZT_SelCry_Com_9" id="ZT_SelCry_Com_9" /></td>
  </tr>
  <tr>
    <td>Si TWL2.1, message clair d'explication</td>
    <td class="td_input <?php color($edit,$res['ZT_SelCry_10']); ?>"><input type="checkbox" class="input_checkbox" name="ZT_SelCry_10" id="ZT_SelCry_10" <?php if($res['ZT_SelCry_10']) echo 'checked="checked"'; ?> />
        <input type="text" class="input_text" value="<?=$res['ZT_SelCry_Com_10']?>" name="ZT_SelCry_Com_10" id="ZT_SelCry_Com_10" /></td>
  </tr>
  <tr>
    <td>Respect de la mise en forme original (saut de lignes)</td>
    <td class="td_input <?php color($edit,$res['ZT_SelCry_11']); ?>"><input type="checkbox" class="input_checkbox" name="ZT_SelCry_11" id="ZT_SelCry_11" <?php if($res['ZT_SelCry_11']) echo 'checked="checked"'; ?> />
        <input type="text" class="input_text" value="<?=$res['ZT_SelCry_Com_11']?>" name="ZT_SelCry_Com_11" id="ZT_SelCry_Com_11" /></td>
  </tr>
  <tr>
    <td>Pas d'aberration esthétique</td>
    <td class="td_input <?php color($edit,$res['ZT_SelCry_12']); ?>"><input type="checkbox" class="input_checkbox" name="ZT_SelCry_12" id="ZT_SelCry_12" <?php if($res['ZT_SelCry_12']) echo 'checked="checked"'; ?> />
        <input type="text" class="input_text" value="<?=$res['ZT_SelCry_Com_12']?>" name="ZT_SelCry_Com_12" id="ZT_SelCry_Com_12" /></td>
  </tr>
  <tr>
    <td>Pas de problème de sécurité</td>
    <td class="td_input <?php color($edit,$res['ZT_SelCry_13']); ?>"><input type="checkbox" class="input_checkbox" name="ZT_SelCry_13" id="ZT_SelCry_13" <?php if($res['ZT_SelCry_13']) echo 'checked="checked"'; ?> />
        <input type="text" class="input_text" value="<?=$res['ZT_SelCry_Com_13']?>" name="ZT_SelCry_Com_13" id="ZT_SelCry_Com_13" /></td>
  </tr>
  <tr>
    <td>Pas de corrections à apporter</td>
    <td class="td_input <?php color($edit,$res['ZT_SelCry_14']); ?>"><input type="checkbox" class="input_checkbox" name="ZT_SelCry_14" id="ZT_SelCry_14" <?php if($res['ZT_SelCry_14']) echo 'checked="checked"'; ?> />
        <input type="text" class="input_text" value="<?=$res['ZT_SelCry_Com_14']?>" name="ZT_SelCry_Com_14" id="ZT_SelCry_Com_14" /></td>
  </tr>
  <tr>
    <td>Pas d'améliorations à apporter</td>
    <td class="td_input <?php color($edit,$res['ZT_SelCry_15']); ?>"><input type="checkbox" class="input_checkbox" name="ZT_SelCry_15" id="ZT_SelCry_15" <?php if($res['ZT_SelCry_15']) echo 'checked="checked"'; ?> />
        <input type="text" class="input_text" value="<?=$res['ZT_SelCry_Com_15']?>" name="ZT_SelCry_Com_15" id="ZT_SelCry_Com_15" /></td>
  </tr>
  <tr>
    <td colspan="2" class="tableau_titre2"><div align="center">Sélection de texte clair</div></td>
  </tr>
  <tr>
    <td>Cryptage et remplacement du texte clair avec ajout des balises [code] dans la zone de texte</td>
    <td class="td_input <?php color($edit,$res['ZT_SelClair_1']); ?>"><input type="checkbox" class="input_checkbox" name="ZT_SelClair_1" id="ZT_SelClair_1" <?php if($res['ZT_SelClair_1']) echo 'checked="checked"'; ?> />
        <input type="text" class="input_text" value="<?=$res['ZT_SelClair_Com_1']?>" name="ZT_SelClair_Com_1" id="ZT_SelClair_Com_1" /></td>
  </tr>
  <tr>
    <td>Repositionnement du curseur à la fin du cryptage</td>
    <td class="td_input <?php color($edit,$res['ZT_SelClair_2']); ?>"><input type="checkbox" class="input_checkbox" name="ZT_SelClair_2" id="ZT_SelClair_2" <?php if($res['ZT_SelClair_2']) echo 'checked="checked"'; ?> />
        <input type="text" class="input_text" value="<?=$res['ZT_SelClair_Com_2']?>" name="ZT_SelClair_Com_2" id="ZT_SelClair_Com_2" /></td>
  </tr>
  <tr>
    <td>Repositionnement de la scrollbar de la zone de texte à l'endroit adéquat</td>
    <td class="td_input <?php color($edit,$res['ZT_SelClair_3']); ?>"><input type="checkbox" class="input_checkbox" name="ZT_SelClair_3" id="ZT_SelClair_3" <?php if($res['ZT_SelClair_3']) echo 'checked="checked"'; ?> />
        <input type="text" class="input_text" value="<?=$res['ZT_SelClair_Com_3']?>" name="ZT_SelClair_Com_3" id="ZT_SelClair_Com_3" /></td>
  </tr>
  <tr>
    <td>Apparition d'un panneau </td>
    <td class="td_input <?php color($edit,$res['ZT_SelClair_4']); ?>"><input type="checkbox" class="input_checkbox" name="ZT_SelClair_4" id="ZT_SelClair_4" <?php if($res['ZT_SelClair_4']) echo 'checked="checked"'; ?> />
        <input type="text" class="input_text" value="<?=$res['ZT_SelClair_Com_4']?>" name="ZT_SelClair_Com_4" id="ZT_SelClair_Com_4" /></td>
  </tr>
  <tr>
    <td>La fonction &quot;fermer&quot; du panneau fonctionne</td>
    <td class="td_input <?php color($edit,$res['ZT_SelClair_5']); ?>"><input type="checkbox" class="input_checkbox" name="ZT_SelClair_5" id="ZT_SelClair_5" <?php if($res['ZT_SelClair_5']) echo 'checked="checked"'; ?> />
        <input type="text" class="input_text" value="<?=$res['ZT_SelClair_Com_5']?>" name="ZT_SelClair_Com_5" id="ZT_SelClair_Com_5" /></td>
  </tr>
  <tr>
    <td>Le panneau n'est pas <strong>trop</strong> dérangeant</td>
    <td class="td_input <?php color($edit,$res['ZT_SelClair_6']); ?>"><input type="checkbox" class="input_checkbox" name="ZT_SelClair_6" id="ZT_SelClair_6" <?php if($res['ZT_SelClair_6']) echo 'checked="checked"'; ?> />
        <input type="text" class="input_text" value="<?=$res['ZT_SelClair_Com_6']?>" name="ZT_SelClair_Com_6" id="ZT_SelClair_Com_6" /></td>
  </tr>
  <tr>
    <td>L'explication du panneau est claire</td>
    <td class="td_input <?php color($edit,$res['ZT_SelClair_7']); ?>"><input type="checkbox" class="input_checkbox" name="ZT_SelClair_7" id="ZT_SelClair_7" <?php if($res['ZT_SelClair_7']) echo 'checked="checked"'; ?> />
        <input type="text" class="input_text" value="<?=$res['ZT_SelClair_Com_7']?>" name="ZT_SelClair_Com_7" id="ZT_SelClair_Com_7" /></td>
  </tr>
  <tr>
    <td>Pas d'aberration esthétique</td>
    <td class="td_input <?php color($edit,$res['ZT_SelClair_8']); ?>"><input type="checkbox" class="input_checkbox" name="ZT_SelClair_8" id="ZT_SelClair_8" <?php if($res['ZT_SelClair_8']) echo 'checked="checked"'; ?> />
        <input type="text" class="input_text" value="<?=$res['ZT_SelClair_Com_8']?>" name="ZT_SelClair_Com_8" id="ZT_SelClair_Com_8" /></td>
  </tr>
  <tr>
    <td>Pas de problème de sécurité</td>
    <td class="td_input <?php color($edit,$res['ZT_SelClair_9']); ?>"><input type="checkbox" class="input_checkbox" name="ZT_SelClair_9" id="ZT_SelClair_9" <?php if($res['ZT_SelClair_9']) echo 'checked="checked"'; ?> />
        <input type="text" class="input_text" value="<?=$res['ZT_SelClair_Com_9']?>" name="ZT_SelClair_Com_9" id="ZT_SelClair_Com_9" /></td>
  </tr>
  <tr>
    <td>Pas de corrections à apporter</td>
    <td class="td_input <?php color($edit,$res['ZT_SelClair_10']); ?>"><input type="checkbox" class="input_checkbox" name="ZT_SelClair_10" id="ZT_SelClair_10" <?php if($res['ZT_SelClair_10']) echo 'checked="checked"'; ?> />
        <input type="text" class="input_text" value="<?=$res['ZT_SelClair_Com_10']?>" name="ZT_SelClair_Com_10" id="ZT_SelClair_Com_10" /></td>
  </tr>
  <tr>
    <td>Pas d'améliorations à apporter</td>
    <td class="td_input <?php color($edit,$res['ZT_SelClair_11']); ?>"><input type="checkbox" class="input_checkbox" name="ZT_SelClair_11" id="ZT_SelClair_11" <?php if($res['ZT_SelClair_11']) echo 'checked="checked"'; ?> />
        <input type="text" class="input_text" value="<?=$res['ZT_SelClair_Com_11']?>" name="ZT_SelClair_Com_11" id="ZT_SelClair_Com_11" /></td>
  </tr>
  <tr>
    <td colspan="2" class="tableau_titre2"><div align="center">Pas de sélection</div></td>
  </tr>
  <tr>
    <td>Insertion au niveau du curseur d'une userbarre</td>
    <td class="td_input <?php color($edit,$res['ZT_PasSel_1']); ?>"><input type="checkbox" class="input_checkbox" name="ZT_PasSel_1" id="ZT_PasSel_1" <?php if($res['ZT_PasSel_1']) echo 'checked="checked"'; ?> />
        <input type="text" class="input_text" value="<?=$res['ZT_PasSel_Com_1']?>" name="ZT_PasSel_Com_1" id="ZT_PasSel_Com_1" /></td>
  </tr>
  <tr>
    <td>Fermeture du panneau s'il était ouvert</td>
    <td class="td_input <?php color($edit,$res['ZT_PasSel_2']); ?>"><input type="checkbox" class="input_checkbox" name="ZT_PasSel_2" id="ZT_PasSel_2" <?php if($res['ZT_PasSel_2']) echo 'checked="checked"'; ?> />
        <input type="text" class="input_text" value="<?=$res['ZT_PasSel_Com_2']?>" name="ZT_PasSel_Com_2" id="ZT_PasSel_Com_2" /></td>
  </tr>
  <tr>
    <td>La userbarre est esthétique</td>
    <td class="td_input <?php color($edit,$res['ZT_PasSel_3']); ?>"><input type="checkbox" class="input_checkbox" name="ZT_PasSel_3" id="ZT_PasSel_3" <?php if($res['ZT_PasSel_3']) echo 'checked="checked"'; ?> />
        <input type="text" class="input_text" value="<?=$res['ZT_PasSel_Com_3']?>" name="ZT_PasSel_Com_3" id="ZT_PasSel_Com_3" /></td>
  </tr>
  <tr>
    <td>La userbarre est pratique</td>
    <td class="td_input <?php color($edit,$res['ZT_PasSel_4']); ?>"><input type="checkbox" class="input_checkbox" name="ZT_PasSel_4" id="ZT_PasSel_4" <?php if($res['ZT_PasSel_4']) echo 'checked="checked"'; ?> />
        <input type="text" class="input_text" value="<?=$res['ZT_PasSel_Com_4']?>" name="ZT_PasSel_Com_4" id="ZT_PasSel_Com_4" /></td>
  </tr>
  <tr>
    <td>La userbarre est facilement compréhensible</td>
    <td class="td_input <?php color($edit,$res['ZT_PasSel_5']); ?>"><input type="checkbox" class="input_checkbox" name="ZT_PasSel_5" id="ZT_PasSel_5" <?php if($res['ZT_PasSel_5']) echo 'checked="checked"'; ?> />
        <input type="text" class="input_text" value="<?=$res['ZT_PasSel_Com_5']?>" name="ZT_PasSel_Com_5" id="ZT_PasSel_Com_5" /></td>
  </tr>
  <tr>
    <td>La userbarre est &quot;attirante&quot;</td>
    <td class="td_input <?php color($edit,$res['ZT_PasSel_6']); ?>"><input type="checkbox" class="input_checkbox" name="ZT_PasSel_6" id="ZT_PasSel_6" <?php if($res['ZT_PasSel_6']) echo 'checked="checked"'; ?> />
        <input type="text" class="input_text" value="<?=$res['ZT_PasSel_Com_6']?>" name="ZT_PasSel_Com_6" id="ZT_PasSel_Com_6" /></td>
  </tr>
  <tr>
    <td>La userbarre n'est pas <strong>trop</strong> &quot;tappe à l'oeil&quot;</td>
    <td class="td_input <?php color($edit,$res['ZT_PasSel_7']); ?>"><input type="checkbox" class="input_checkbox" name="ZT_PasSel_7" id="ZT_PasSel_7" <?php if($res['ZT_PasSel_7']) echo 'checked="checked"'; ?> />
        <input type="text" class="input_text" value="<?=$res['ZT_PasSel_Com_7']?>" name="ZT_PasSel_Com_7" id="ZT_PasSel_Com_7" /></td>
  </tr>
  <tr>
    <td>Pas d'aberration esthétique</td>
    <td class="td_input <?php color($edit,$res['ZT_PasSel_8']); ?>"><input type="checkbox" class="input_checkbox" name="ZT_PasSel_8" id="ZT_PasSel_8" <?php if($res['ZT_PasSel_8']) echo 'checked="checked"'; ?> />
        <input type="text" class="input_text" value="<?=$res['ZT_PasSel_Com_8']?>" name="ZT_PasSel_Com_8" id="ZT_PasSel_Com_8" /></td>
  </tr>
  <tr>
    <td>Pas de problème de sécurité</td>
    <td class="td_input <?php color($edit,$res['ZT_PasSel_9']); ?>"><input type="checkbox" class="input_checkbox" name="ZT_PasSel_9" id="ZT_PasSel_9" <?php if($res['ZT_PasSel_9']) echo 'checked="checked"'; ?> />
        <input type="text" class="input_text" value="<?=$res['ZT_PasSel_Com_9']?>" name="ZT_PasSel_Com_9" id="ZT_PasSel_Com_9" /></td>
  </tr>
  <tr>
    <td>Pas de corrections à apporter</td>
    <td class="td_input <?php color($edit,$res['ZT_PasSel_10']); ?>"><input type="checkbox" class="input_checkbox" name="ZT_PasSel_10" id="ZT_PasSel_10" <?php if($res['ZT_PasSel_10']) echo 'checked="checked"'; ?> />
        <input type="text" class="input_text" value="<?=$res['ZT_PasSel_Com_10']?>" name="ZT_PasSel_Com_10" id="ZT_PasSel_Com_10" /></td>
  </tr>
  <tr>
    <td>Pas d'améliorations à apporter</td>
    <td class="td_input <?php color($edit,$res['ZT_PasSel_11']); ?>"><input type="checkbox" class="input_checkbox" name="ZT_PasSel_11" id="ZT_PasSel_11" <?php if($res['ZT_PasSel_11']) echo 'checked="checked"'; ?> />
        <input type="text" class="input_text" value="<?=$res['ZT_PasSel_Com_11']?>" name="ZT_PasSel_Com_11" id="ZT_PasSel_Com_11" /></td>
  </tr>
</table>
<h2>Des améliorations ?</h2>
<p>
  <textarea name="Input_Amelio" id="Input_Amelio" cols="45" rows="5"><?=$res['Input_Amelio']?></textarea>
</p>
<h2>Un petit mot en plus ?</h2>
<p>
  <textarea name="Input_Com" id="Input_Com" cols="45" rows="5"><?=$res['Input_Com']?></textarea>
</p>
<h2>Conclusion</h2>
<p>Merci d'avoir pris la peine de réaliser ce test ! N'hésite pas à en faire pleins d'autre ! Pour me faire gagner pleins de temps et m'éviter d'avoir à coder un truc qui le vérifierait automatiquement, merci de cocher les cases comme précedemment :</p>
<table id="tableau_info">
  <tr>
    <td>Il n'y a pas de problème(s) à corriger</td>
    <td><input type="checkbox" name="test_no_pb" class="input_checkbox" id="test_no_pb" <?php if($res['test_no_pb']) echo 'checked="checked"'; ?> /></td>
  </tr>
  <tr>
    <td>Il n'y a pas d'amélioration(s) à apporter</td>
    <td><input type="checkbox" name="test_no_amelio" class="input_checkbox" id="test_no_amelio" <?php if($res['test_no_amelio']) echo 'checked="checked"'; ?> /></td>
  </tr>
</table>
<p>Encore merci !</p>
<p>
  <input type="submit" name="save_test" id="save_test" value="SAUVEGARDER" />
  <input type="checkbox" name="test_en_redac" class="input_checkbox" id="test_en_redac" <?php if($res['test_en_redac']) echo 'checked="checked"'; ?> /> 
  <em>Cocher la case si le test est en cours de rédaction  </em></p>
</form>
</div>
</body>
</html>
