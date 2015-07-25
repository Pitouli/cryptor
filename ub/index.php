<?php

if(in_array(strtolower(end(explode('.', $_GET['ub']))), array('gif', 'GIF')))
	{
		$image = $_GET['ub'];
			if(file_exists($image))
				{
					$valid = TRUE;
				}
			else
				{
					$valid = FALSE;
				}
	}
else
	{
		$valid = FALSE;
	}	
	
if(!isset($_GET['npc'])) // On incremente le compteur d'affichage si il n'y a pas la variable "npc" ("ne pas compter")
	{
		$fp = fopen("compteur.txt","r+"); 
		$nbaffichage = fgets($fp,255); 
		$nbaffichage++; 
		fseek($fp,0); 
		fputs($fp,$nbaffichage); 
		fclose($fp); 
	}

header("Content-type: image/gif");

if($valid)
	{
		readfile($image); 
	}
else
	{
		readfile('userbar_1.gif'); 
	}		
?>