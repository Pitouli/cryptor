<pre>
<?php
$structure = array (  
	'banniere' => array (
		'durak' => 0,
		'kastar' => 0,
		'skrim' => 0,
		'tomawak' => 0,
		'autres' => array (
			'commerce' => 2,
			'soutien' => 0
			)
		), 
	'vignette' => 0, 
	'userbarre' => 0 
	);

print_r ($structure);
?>
</pre>

<?php
print $structure['vignette'];
print '<br />';
print $structure['banniere'];
print '<br />';
print $structure['banniere']['commerce'];
?>