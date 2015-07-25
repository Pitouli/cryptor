<?php
	$fp = fopen("compteur.txt","r+"); 
	$nbutilisations = fgets($fp,255); 
	$nbutilisations++; 
	fseek($fp,0); 
	fputs($fp,$nbutilisations); 
	fclose($fp); 
?>