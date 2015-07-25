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
<link href="style.css" rel="stylesheet" type="text/css" />
</head>

<body>
<div id="corps">
  <div id="titre"><a href="index.php"><img src="images/titre.png" alt="TWL 2.0" width="180" height="25" /></a></div>
  <div id="Accordion" class="Accordion">
    <div class="AccordionPanel">
      <div class="AccordionPanelTab">R&eacute;sultat du cryptage</div>
      <div class="AccordionPanelContent">
        <?php
		  if(isset($_POST['clair']))
		    {
		      $clair = $_POST['clair'];
		      $hexrev = strtoupper(strrev(bin2hex(stripslashes($clair)))) ;
		      //$hexrev = str_replace("A0D0", "AD", $hexrev);
		      $crypte = wordwrap("TWL2.0$hexrev", 65 ," ", 1);
		    }
		  else { $crypte = "Aucune donn&eacute; n'a pu &ecirc;tre crypt&eacute;e"; }
		?>
        <p>
          <textarea name="resultat" id="resultat" cols="70" rows="5"><?php echo $crypte; ?></textarea>
          <br />
          <input value="S&eacute;lectionner" type="button" onclick="selectResultat();" />
        </p>
      </div>
    </div>
    <div class="AccordionPanel">
      <div class="AccordionPanelTab">D&eacute;crypter</div>
      <div class="AccordionPanelContent">
        <form action="decrypte.php" method="post">
          <p>
            <textarea name="crypte" cols="70" rows="5"></textarea>
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
    <?php
		$fp = fopen("compteur.txt","r+"); 
		$nbutilisations = fgets($fp,255); 
		$nbutilisations++; 
		fseek($fp,0); 
		fputs($fp,$nbutilisations); 
		fclose($fp); 
		echo'Nombre d\'utilisations : '.$nbutilisations.'';
	?>
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
