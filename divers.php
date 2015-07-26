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
<meta name="robots" content="None" />
<link rel="icon" type="image/ico" href="favicon.png" />
<title>TWL 2.0</title>
<script src="accordion.js" type="text/javascript"></script>
<script src="scripts.js" type="text/javascript"></script>
<link href="style.css" rel="stylesheet" type="text/css" /></head>

<body>
<div id="corps">
  <div id="titre"><a href="index.php"><img src="images/titre.png" alt="TWL 2.0" width="180" height="25" /></a></div>
  <div id="Accordion" class="Accordion">
    <div class="AccordionPanel">
      <div class="AccordionPanelTab">Bookmarklet</div>
      <div class="AccordionPanelContent">
      	<p>Avec le bookmarklet (favoris intelligent) :<br />
      		- s&eacute;lectionnez le cryptage TWL2.0 dans la page et d&eacute;cryptez le d'un clic<br />
      			- s&eacute;lectionnez du texte &quot;en clair&quot; dans la page et cryptez le d'un clic<br />
      				- s&eacute;lectionnez du texte &quot;en clair&quot; dans une zone de texte et remplacer le par son &eacute;quivalent crypt&eacute; d'un clic<br />
   					- ne s&eacute;lectionnez rien et utilisez le bookmarklet pour arriver sur le site d'un clic<br />
      		<br />
      		Ajoutez ce lien &agrave; vos favoris : <a href="javascript:var%20b=document.body;void(z=document.createElement('script'));void(z.src='http://twl2.fr.nf/cryptndecrypt.js');void(b.appendChild(z))" style="color: #007EBF;" >TWL2.0</a><br />
      		<br />
      	Pour ajouter le lien &agrave; vos favoris, faite un cliquer-glisser vers votre barre des favoris, ou un clic droit et &quot;ajouter aux favoris&quot;. Test&eacute; sous Firefox 3+ (ne fonctionne pas enti&egrave;rement sous FF2), Internet explorer 7+ et Google Chrome.<br />
      	Faites d&eacute;couvrir le site et son bookmarklet en mettant votre curseur sans faire de s&eacute;lection &agrave; la fin de vos messages et en cliquant sur le bookmarklet. Une signature en image fine et &eacute;l&eacute;gante sera automatiquement rajout&eacute; (ne fonctionne qu'avec les forums utilisant le BBCode)</p>
      	</div>
    </div>
    <div class="AccordionPanel">
      <div class="AccordionPanelTab">Remerciements </div>
      <div class="AccordionPanelContent">
          <p>Je tiens &agrave; remercier Bernat, gr&acirc;ce &agrave; qui j'ai pu mettre la main sur l'algorithme utilis&eacute;.<br />
            Je tiens aussi &agrave; remercier Thiweb, qui est d'une certaine mani&egrave;re &agrave; l'origine de ce site.<br />
            Je tiens  &agrave; remercier Redna, qui est lui &agrave; l'origine du logciel thiweblive. <br />
            Merci aussi &agrave; Montesquieu, qui promeut le site en m&ecirc;me temps que le logiciel.<br /> 
            Je tiens enfin &agrave; remercier les nombreux beta testeurs qui se sont sympathiquement propos&eacute;s pour m'aider dans l'am&eacute;lioration du site : E-llas, Cowboy, Imageek, MickaelRivierra, Popeye et MisterBlack.</p>
      </div>
    </div>
  </div>
  <div id="compteur">
    <?php echo'Nombre d\'utilisations : '.readUsageCounter(); ?>
  </div>
</div>
<div id="button"><a href="http://live.thiweb.com/"><img src="images/button_redna.png" alt="Redna Project" /></a><a href="http://forum.thiweb.com/"><img src="images/button_thiweb.png" alt="For Thiweb" width="80" height="15" /></a><a href="http://twl2.fr.nf/"><img src="images/button_zeraw.png" alt="By Zeraw" width="80" height="15" /></a><a href="http://validator.w3.org/check?uri=referer"><img src="images/button_valid.png" alt="Valid XHTML 1.1" /></a></div>
<script type="text/javascript">
<!--
var Accordion = new Spry.Widget.Accordion("Accordion");
//-->
</script>
</body>
</html>
