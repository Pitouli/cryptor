<?php

function code($decoded, $version = "TWL2.2") {

	$hexrev = strtoupper(strrev(bin2hex(stripslashes($decoded))));
	
	if ($version == "TWL2.0") {
		$hexrev = str_replace("A0D0", "AD", $hexrev);
	}

	$coded = wordwrap("TWL2.2".$hexrev, 65 ," ", 1);

	return $coded;

}

function decode($coded, $html = true, $convertLinks = true) {

	$coded = trim($coded);
	$coded = str_replace("\x20", "", $coded);
	$coded = str_replace("\x0D", "", $coded);
	$coded = str_replace("\x0A", "", $coded);

	$header = substr($coded, 0, 6);

	if ($header == "TWL2.0" || $header == "TWL2.2") {
		$coded = substr($coded, 6);

		if ($header == "TWL2.0") {
			// Because of issues with encoding, I had the bad idea to replace all the "0D0A" characters (probably \r\n) by a simple "AD" which after decoding gives a "Ù" which I then had to replace by a "<br />" etc.
			// I have made the encoding correction, which allowed me to delete all this "patches". The issue is now that many of the encrypted codes have been done with the "buggy" version
			// Therefore, the only goal of this "if/else" condition is to correct make the decryptor working with the old encrypted codes. It's a patch against the patches... 
			$str = "";
			for ($i=0; $i < strlen($coded); $i=$i+2) {
				$c = substr($coded, $i, 2); 
				if ($c == "AD") 
					$str .= "A0D0";
				else 
					$str .= $c;
			}		
			$coded = $str;
			// Normally, it is the only difference
			// NB : this "for loop" is equivalent to this : str_replace("AD", "A0D0", $coded); with the difference that it observes the characters 2 by 2. Therefore, XXADXX will give XXA0D0XX in both case, but XADXXX will give XA0D0XXX in the first case, which is not wanted, and stay XADXXX with the "for loop"
		}

		$coded = strrev($coded);
		$decoded = hex2ascii($coded);
		//echo "<p>phase 5: ".$decoded."</p>";
		if ($html) 
			$decoded = htmlentities($decoded);
		//echo "phase 6: ".$decoded;
		//$decoded = str_replace("&Uacute;", "<br />", $decoded);
		if ($html && $convertLinks) 
			//$decoded = preg_replace("/([[:alpha:]]+://[^<>[:space:]]+[[:alnum:]/])/i",'<a href="$1" target="blank">$1</a>', $decoded);
			$decoded = preg_replace('@(https?://([-\w\.]+[-\w])+(:\d+)?(/([\w/_\.#-]*(\?\S+)?[^\.\s])?)?)@', '<a href="$1" target="_blank">$1</a>', $decoded);

		if ($html) 
			$decoded = nl2br($decoded);
		//echo "phase 7: ".$decoded."</p>";

		$decoded = iconv("utf-8", "utf-8//ignore", $decoded);

		if (empty($decoded))
			throw new Exception('Le décryptage a retourné une chaîne vide. Est-ce normal ?');

		return $decoded;
	}
	else {
		throw new Exception('Décryptage impossible. Est-ce vraiment du TWL2.0 ou du TWL2.2 ?');
	}
}

function hex2ascii($hex) {
	$ascii = '';
	for ($i=0; $i < strlen($hex); $i=$i+2) {
		$ascii .= chr(hexdec(substr($hex, $i, 2)));
	}
	return $ascii;
}

function incrementUsageCounter () {
	$fp = fopen("compteur.txt","r+"); 
	$nbutilisations = fgets($fp,255); 
	$nbutilisations++; 
	fseek($fp,0); 
	fputs($fp,$nbutilisations); 
	fclose($fp); 
	return $nbutilisations;
}

function readUsageCounter () {
	$fp = fopen("compteur.txt","r+"); 
	$nbutilisations = fgets($fp,255); 
	fclose($fp); 
	return $nbutilisations;
}

function readUserbarCounter () {
	$fp = fopen("ub/compteur.txt","r+"); 
	$nbutilisations = fgets($fp,255); 
	fclose($fp); 
	return $nbutilisations;
}

