<?php require 'functions.php'; ?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="title" content="TWL2.0" />
<meta name="author" content="Zeraw" />
<meta name="owner" content="zerawmaster@ifrance.com" />
<meta name="subject" content="Cryptage et Décryptage du TWL2.0" />
<meta name="rating" content="Informatique" />
<meta name="description" content="Décrypter et crypter en TWL2.0 grâce à ce site extrêment rapide ! Améliorez votre expérience utilisateur en utilisant le raccourci intelligent !" />
<meta name="abstract" content="Décrypter et crypter en TWL2.0 grâce à ce site extrêment rapide ! Améliorez votre expérience utilisateur en utilisant le raccourci intelligent ! Thiweb Live en ligne, en mieux !" />
<meta name="keywords" content="twl2.0, thiweb, thiweblive, twl, zeraw, zerawmaster, cryptage, decryptage, bookmarklet" />
<meta name="revisit-after" content="20 DAYS" />
<meta name="language" content="FR" />
<meta name="robots" content="No Follow" />
<link rel="icon" type="image/ico" href="favicon.png" />
<title>TWL 2.0</title>
<script src="accordion.js" type="text/javascript"></script>
<script src="scripts.js" type="text/javascript"></script>
<link href="style.css" rel="stylesheet" type="text/css" />
</head>

<body>
<div style="position: absolute; top: 0px; left: 0px; margin: 0px; padding: 0px;"><a href="divers.php"><img src="images/encore_plus.png" alt="Encore plus !" /></a></div>
<div class="onglet-deroulant" style="position: absolute; top: 0px; right: 30px; margin: 0px; padding: 0px;">
  <div class="contenu-onglet">
  	<p>Les userbars sont un tr&egrave;s bon moyen de faire d&eacute;courvir le site. Choisissez celle que vous voulez, et copiez/collez le texte fourni dans votre signature de forum.</p>
  	<p style="text-align:center"><img src="ub/?npc&amp;ub=userbar_1.gif" alt="Userbar num&eacute;ro 1" width="350" height="19" /><br />code &agrave; copier : 
  	  <input type="text" value="[url=http://twl2.fr.nf/][img]http://twl2.fr.nf/ub/?ub=userbar_1.gif[/img][/url]" onclick="select()" /></p>
    <p style="text-align:center"><img src="ub/?npc&amp;ub=userbar_2.gif" alt="Userbar num&eacute;ro 2" width="350" height="19" /><br />code &agrave; copier : 
  	  <input type="text" value="[url=http://twl2.fr.nf/divers.php][img]http://twl2.fr.nf/ub/?ub=userbar_2.gif[/img][/url]" onclick="select()" /></p>
    <p style="font-size: 75%; font-style: italic; color: #333333; text-align: right;">
	    <?php echo'Nombre d\'affichages des userbars : '.readUserbarCounter(); ?>
    </p>
  </div>
  <div class="titre-onglet">Partager TWL2.0 avec les userbars</div>
</div>
<div id="corps">
  <div id="titre"><img src="images/titre.png" alt="TWL 2.0" width="180" height="25" /></div>
  <div id="Accordion" class="Accordion">
    <div class="AccordionPanel">
      <div class="AccordionPanelTab">D&eacute;crypter</div>
      <div class="AccordionPanelContent">
        <form action="decrypte.php" method="post">
          <p>
            <textarea id="crypte" name="crypte" cols="70" rows="5"></textarea>
            <br />
            <input type="reset" value="Effacer" />
            <input type="submit" value="D&eacute;crypter" />
          </p>
        </form>
      </div>
    </div>
    <div class="AccordionPanel">
      <div class="AccordionPanelTab">Crypter</div>
      <div class="AccordionPanelContent">
        <form action="crypte.php" method="post">
          <p>
            <textarea name="clair" cols="70" rows="5"></textarea>
            <br />
            <input type="reset" value="Effacer" />
            <input type="submit" value="Crypter" />
          </p>
        </form>
      </div>
    </div>
  </div>
  <div id="compteur">
    <?php	echo'Nombre d\'utilisations : '.readUsageCounter();	?>
  </div>
</div>
<div id="button"><a href="http://live.thiweb.com/"><img src="images/button_redna.png" alt="Redna Project" /></a><a href="http://forum.thiweb.com/"><img src="images/button_thiweb.png" alt="For Thiweb" width="80" height="15" /></a><a href="http://twl2.fr.nf/"><img src="images/button_zeraw.png" alt="By Zeraw" width="80" height="15" /></a><a href="http://validator.w3.org/check?uri=referer"><img src="images/button_valid.png" alt="Valid XHTML 1.1" /></a></div>
<script type="text/javascript">
<!--
var Accordion = new Spry.Widget.Accordion("Accordion");
document.getElementById("crypte").focus();
//-->
</script>
</body>
</html>
