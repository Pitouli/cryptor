<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>No-referer</title>
<link href="style.css" rel="stylesheet" type="text/css" />
</head>
<body>
<div id="corps">
  <p>Vous voulez connaitre le Refer envoyé par votre navigateur ?</p>
  <p>Et bien le voici :</p>
  <p style="text-align:right"><a href="<?=$_SERVER["HTTP_REFERER"]?>" title="Cible"><strong><?=$_SERVER["HTTP_REFERER"]?></strong></a></p>
</div>
</body>

</html>
