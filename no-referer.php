<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="Refresh" content="1;URL=<?=$_GET['u']?>" />
<title>No-referer</title>
<link href="style.css" rel="stylesheet" type="text/css" />
</head>
<body>
<div id="corps">
  <p>La page sert de barrière pour le &quot;referer&quot;. </p>
  <p>Le lien sur lequel vous avez cliqué vous envoi ici, et c'est d'ici que vous allez réellement (et automatiquement), aller sur le site cible, qui ne saura pas d'où vous veniez avant.</p>
  <p>Si la redirection ne se fait pas automatiquement, ciquez sur ce lien&nbsp;:</p>
  <p style="text-align:right"><a href="<?=$_GET['u']?>" title="Cible"><strong><?=$_GET['u']?></strong></a></p>
</div>
</body>

</html>
