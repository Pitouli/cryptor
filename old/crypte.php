<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="fr" lang="fr">
<head>
<title>ThiWeb Live 2.0 | Cryptage</title>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
<link rel="icon" type="image/ico" href="favicon.ico" />
<script src="SpryAssets/SpryAccordion.js" type="text/javascript"></script>
<link href="style1.css" rel="stylesheet" type="text/css" />
<link href="SpryAssets/SpryAccordion.css" rel="stylesheet" type="text/css" />
</head>
<body>
<p align="center">&nbsp;</p>
<p align="center"><img src="images/blason.png" alt="blason" width="120" height="120" border="0"/></p>
<p align="center">&nbsp;</p>
<div id="Accordion1" class="Accordion" >
<div class="Panel">
  <div class="PanelTab" >R&eacute;sultat du cryptage</div>
  <div class="PanelContent">
	<div align="center"><span class="Style1">
	  	  <?php
		$clair = htmlentities($_POST['clair']);
		$hexrev = strrev(bin2hex($clair)) ;
		echo wordwrap("TWL2.0$hexrev", 65 ," ", 1);
	  ?></span>
	</div>
  </div>
</div>
  <div class="Panel">
    <div class="PanelTab">D&eacute;crypter</div>
    <div class="PanelContent" align="center">
      <form action="decrypte.php" method="post" name="decrypt" id="decrypt">
        <p>
          <label>
          <textarea name="crypte" cols="70" rows="5"></textarea>
          </label>
          <br />
          <br />
          <input type="reset" value="Effacer" />
          <input type="submit" value="D&eacute;crypter" />
        </p>
      </form>
    </div>
  </div>
  <div class="Panel">
    <div class="PanelTab">Crypter</div>
    <div class="PanelContent" align="center">
    <form action="crypte.php" method="post" name="clair" id="clair">
	<p>
  	<label>
    <textarea name="clair" cols="70" rows="5"></textarea>
	</label>
	<br />
    <br />
  	<input type="reset" value="Effacer" />
    <input type="submit" value="Crypter" /></p>
  </form>
    </div>
  </div>
  <div class="Panel">
    <div class="PanelTab">Trucs et autres</div>
    <div class="PanelContent">
<p class="Style3">Remmerciements sp&eacute;ciaux &agrave; :</p>
    <ul>
      <li class="Style3">Redna, qui a cr&eacute;&eacute; le logiciel ThiwebLive</li>
      <li class="Style3">Un cr&eacute;ateur que je ne connais pas qui en fait n'est plus inconnu vu que je sais maintenant que c'est Bernat, qui en a fait l'adaptation php</li>
      <li class="Style3">La communaut&eacute; thiwebienne pour tout et pour rien (surtout pour tout)...</li>
    </ul>
    <p class="Style3">Les am&eacute;lios apport&eacute;es par rapport au script origial :</p>
    <ul>
      <li class="Style3">Une interface soign&eacute;e</li>
      <li class="Style3">Une modification du script de cryptage : maintenant, il tronque le r&eacute;sultat au l<span class="Style3">ieu de le donner sous forme de ligne d'un kilom&egrave;tre. Il respecte &agrave; peu pr&egrave;s la troncature du logiciel.</span></li>
    </ul>
    <p class="Style3">Pourquoi cette version ?</p>
    <ul>
      <li class="Style3">Pour mon utilit&eacute; personelle</li>
      <li class="Style3">Pour le plaisir de faire de la mise en page</li>
      <li class="Style3">Parce que j'ai trifouill&eacute; du php ce qui est un d&eacute;but pour moi</li>
      <li class="Style3">Et puis, pourquoi voulez-vous que je me justifie ?</li>
    </ul>
    <p class="PanelTab">Sign&eacute; : Pitouli</p>
    </div>
  </div>
</div>
<br />
</p>
<br />
<div align="center"><a href="http://validator.w3.org/check?uri=http%3A//www.thiweblive.fr.nf/twl2/index2.php" target="_blank"><img src="images/xhtml_valid.gif" alt="wthml 1.0 valid" width="80" height="15" border="0" longdesc="http://validator.w3.org/check?uri=referer" /></a><br />
</div>
<script type="text/javascript">
<!--
var Accordion1 = new Spry.Widget.Accordion("Accordion1");
//-->
</script>
</body>
</html>
