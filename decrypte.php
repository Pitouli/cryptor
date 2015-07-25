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
      <div class="AccordionPanelTab">R&eacute;sultat du d&eacute;cryptage</div>
      <div class="AccordionPanelContent">
          <?php
			function hex2ascii($str)
				{
					$p = '';
					for ($i=0; $i < strlen($str); $i=$i+2)
						{
							$p .= chr(hexdec(substr($str, $i, 2)));
						}
					return $p;
				}
			if(isset($_POST['crypte'])) 
				{ 
					$crypte = trim($_POST['crypte']);
				}			
			elseif(isset($_GET['crypte'])) 
				{ 
					$crypte = trim($_GET['crypte']);
				}

			$crypte = str_replace("\x20", "", $crypte);
			$crypte = str_replace("\x0D", "", $crypte);
			$crypte = str_replace("\x0A", "", $crypte);
			$header = substr($crypte, 0, 6);

			if ($header == "TWL2.0" || $header == "TWL2.2")
				{
					$crypte = substr($crypte, 6);

					if ($header == "TWL2.0") 
					{
						// Because of issues with encoding, I had the bad idea to replace all the "0D0A" characters (probably \r\n) by a simple "AD" which after decoding gives a "Ù" which I then had to replace by a "<br />" etc.
						// I have made the encoding correction, which allowed me to delete all this "patches". The issue is now that many of the encrypted codes have been done with the "buggy" version
						// Therefore, the only goal of this "if/else" condition is to correct make the decryptor working with the old encrypted codes. It's a patch against the patches... 
						$str = "";
						for ($i=0; $i < strlen($crypte); $i=$i+2)
							{
								$c = substr($crypte, $i, 2); 
								if ($c == "AD") 
									{
										$str .= "A0D0";
									}
								else
									{
										$str .= $c;
									}
							}		
						$crypte = $str;
						// Normally, it is the only difference
						// NB : this "for loop" is equivalent to this : str_replace("AD", "A0D0", $crypte); with the difference that it observes the characters 2 by 2. Therefore, XXADXX will give XXA0D0XX in both case, but XADXXX will give XA0D0XXX in the first case, which is not wanted, and stay XADXXX with the "for loop"
					}

					$crypte = strrev($crypte);
					$decrypte = hex2ascii($crypte);
					//echo "<p>phase 5: ".$decrypte."</p>";
					$decrypte = nl2br(htmlentities($decrypte));
					//echo "phase 6: ".$decrypte;
					//$decrypte = str_replace("&Uacute;", "<br />", $decrypte);
					$decrypte = ereg_replace("[[:alpha:]]+://[^<>[:space:]]+[[:alnum:]/]","<a href=\"\\0\" target=\"blank\">\\0</a>", $decrypte);
					//echo "phase 7: ".$decrypte."</p>";

					echo '<p><input value="S&eacute;lectionner" type="button" onclick="selectSpan(this); return false;" /><br /><span id="resultat">'.$decrypte.'</span></p>';
				}
			else
				{
					echo "<p>Ce n'est pas une cha&icirc;ne crypt&eacute;e TWL2.0 ni TWL2.2</p>";
				}
		  ?>
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
