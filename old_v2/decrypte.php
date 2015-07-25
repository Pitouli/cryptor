<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
<link rel="icon" type="image/ico" href="favicon.ico" />
<title>TWL 2.0</title>
<script src="accordion.js" type="text/javascript"></script>
<script src="selectcode.js" type="text/javascript"></script>
<link href="style.css" rel="stylesheet" type="text/css" />
</head>

<body>
<div id="corps">
  <div id="titre"><a href="index.php"><img src="images/titre.png" alt="TWL2.0" /></a></div>
  <div id="Accordion" class="Accordion">
    <div class="AccordionPanel">
      <div class="AccordionPanelTab">R&eacute;sultat du d&eacute;cryptage</div>
      <div class="AccordionPanelContent"> <a href="#" onclick="selectCode(this); return false;">
        <input value="S&eacute;lectionner" type="button" />
        </a><br />
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
			$crypte = htmlentities($_POST['crypte']);
			$crypte = str_replace("\x20", "", $crypte);
			$crypte = str_replace("\x0D", "", $crypte);
			$crypte = str_replace("\x0A", "", $crypte);
			$header = substr($crypte, 0, 6);
			if ($header == "TWL2.0")
				{
					$crypte = substr($crypte, 6);
					$crypte = strrev($crypte);
					$decrypte = hex2ascii($crypte);
					$decrypte = nl2br(htmlentities($decrypte));
					$decrypte = str_replace("&Uacute;", "<br />", $decrypte);
					echo '<span>'.$decrypte.'</span>';
				}
			else
				{
					echo "Ce n'est pas une cha&icirc;ne crypt&eacute;e TWL2.0";
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
<div id="button"><a href="http://www.thiweblive.com/"><img src="images/button_redna.png" alt="Redna Project" /></a><a href="http://forum.thiweb.com/"><img src="images/button_thiweb.png" alt="For Thiweb" width="80" height="15" /></a><img src="images/button_zeraw.png" alt="By Zeraw" width="80" height="15" /><a href="http://validator.w3.org/check?uri=referer"><img src="images/button_valid.png" alt="Valid XHTML 1.1" /></a></div>
<script type="text/javascript">
<!--
var Accordion = new Spry.Widget.Accordion("Accordion");
//-->
</script>
</body>
</html>
