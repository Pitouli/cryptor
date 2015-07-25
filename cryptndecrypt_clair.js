// JavaScript Document

if (window.getSelection) {  // Tous les navigateurs, sauf IE avant la version 9
	var selection = window.getSelection().toString();
}
else if (document.selection) { // Internet Explorer
	var selection = document.selection.createRange().text;

}

var tag = tagFocused();

if((tag == 'INPUT') || (tag == 'TEXTAREA')) { // On est dans une zone de texte
	ActionDansInput();
}
else { // On est pas dans une zone de texte
	if(selection && selection.length > 0) { // Il y a une selection
		ActionSelectionHorsInput(selection);
	}
	else { // Il n'y a pas de sélection
		location.href='http://twl2.fr.nf/';
	}
}
	
// ###########################################################
// # DEBUT DES FONCTIONS COMMUNES OR BOUCLES CONDITIONNELLES #
// ###########################################################	

// FONCTIONS DE TRAITEMENT

function ActionSelectionHorsInput(selection) {

// var regExpBeginning = /^\s+/;
// var regExpEnd = /\s+$/;  
// selection = selection.replace(regExpBeginning, "").replace(regExpEnd, ""); // On supprime les carcatères invisibles de début et de fin de chaine

header = substr(selection, 0, 6);

if (header == "TWL2.0" || header == "TWL2.2")
	{		
		decrypte = decrypter(selection,true);
		compteur(); // On compte le nombre d'utilisation

		resultat = "<form action=\"http://twl2.fr.nf/decrypte.php\" name=\"FormDecryptage\" method=\"post\" target=\"_blank\" style=\"display:none;\"><textarea name=\"crypte\" cols=\"1\" rows=\"1\">"+selection+"</textarea></form><p id=\"panneau_nav_bar\"><a href=\"javascript:selectionner('resultat');\" title=\"S&eacute;lectionner le r&eacute;sultat\">S&eacute;lectionner</a> - <a href=\"javascript:document.FormDecryptage.submit();\" title=\"D&eacute;crypter dans une autre interface (utilisateurs de gestionnaires de t&eacute;l&eacute;chargement)\">Autre Interface</a> - <a href=\"javascript:fermerDiv('panneau_bookmarklet_twl2');\" title=\"Fermer le cadre\">Fermer</a></p><p id=\"resultat\">"+decrypte+"</p>";
		ajouteElement('div', resultat, 'panneau_bookmarklet_twl2');
	}
else if (header == "TWL2.1")
	{		
		resultat = "<p id=\"panneau_nav_bar\"><a href=\"javascript:fermerDiv('panneau_bookmarklet_twl2');\" title=\"Supprimer\">Fermer</a></p><p id=\"resultat\">Le cryptage n\'est pas en TWL2.0 mais en TWL2.1.<br />Il n\'est donc pas d&eacute;cryptable avec cet outil.</p>";
		ajouteElement('div', resultat, 'panneau_bookmarklet_twl2');
	}
else
	{
		crypte = crypter(selection);
		compteur(); // On compte le nombre d'utilisation

		resultat = "<form action=\"http://twl2.fr.nf/crypte.php\" name=\"FormCryptage\" method=\"post\" target=\"_blank\" style=\"display:none;\"><textarea name=\"clair\" cols=\"1\" rows=\"1\">"+selection+"</textarea></form><p id=\"panneau_nav_bar\"><a href=\"javascript:selectTextarea('panneau_textarea_result_crypte');\" title=\"S&eacute;lectionner le r&eacute;sultat\">S&eacute;lectionner</a> - <a href=\"javascript:document.FormCryptage.submit();\" title=\"Crypter dans une autre interface\">Autre Interface</a> - <a href=\"javascript:fermerDiv('panneau_bookmarklet_twl2');\" title=\"Fermer le cadre\">Fermer</a></p><p id=\"resultat\"><textarea id=\"panneau_textarea_result_crypte\" cols=\"1\" rows=\"1\">"+crypte+"</textarea></p>";
		ajouteElement('div', resultat, 'panneau_bookmarklet_twl2');		
	}

} // Fin de function ActionSelectionHorsInput

function ActionDansInputTransformationSelection(szSelect) {

if(szSelect.length > 0) {
	
	header = substr(szSelect, 0, 6);
	
	if (header == "TWL2.0" || header == "TWL2.2")
		{
			var decrypte_panneau = decrypter(szSelect,true); // Le decryptage classique, avec remplacement
			var decrypte = decrypter(szSelect,false); // On est dans un input, donc on remplace pas les retours à la ligne et les url
			compteur(); // On compte le nombre d'utilisation
	
			resultat = "<form action=\"http://twl2.fr.nf/decrypte.php\" name=\"FormDecryptage\" method=\"post\" target=\"_blank\" style=\"display:none;\"><textarea name=\"crypte\" cols=\"1\" rows=\"1\">"+szSelect+"</textarea></form><p id=\"panneau_nav_bar\"><a href=\"javascript:selectionner('resultat');\" title=\"S&eacute;lectionner le r&eacute;sultat\">S&eacute;lectionner</a> - <a href=\"javascript:document.FormDecryptage.submit();\" title=\"D&eacute;crypter dans une autre interface (utilisateurs de gestionnaires de t&eacute;l&eacute;chargement)\">Autre Interface</a> - <a href=\"javascript:fermerDiv('panneau_bookmarklet_twl2');\" title=\"Fermer le cadre\">Fermer</a></p><p id=\"resultat\">"+decrypte_panneau+"</p>";
			ajouteElement('div', resultat, 'panneau_bookmarklet_twl2'); 
			
			txt_ = decrypte;
			return txt_;
		}
	else if (header == "TWL2.1")
		{		
			resultat = "<p id=\"panneau_nav_bar\"><a href=\"javascript:fermerDiv('panneau_bookmarklet_twl2');\" title=\"Supprimer\">Fermer</a></p><p id=\"resultat\">Le cryptage n\'est pas en TWL2.0 mais en TWL2.1.<br />Il n\'est donc pas d&eacute;cryptable avec cet outil.</p>";
			ajouteElement('div', resultat, 'panneau_bookmarklet_twl2');
			
			txt_ = szSelect;
			return txt_;
		}
	else
		{
			crypte = crypter(szSelect, true);
			compteur(); // On compte le nombre d'utilisation
	
			resultat = "<p id=\"panneau_nav_bar\"><a href=\"javascript:fermerDiv('panneau_bookmarklet_twl2');\" title=\"Fermer le cadre\">Fermer</a></p><p id=\"resultat\">Faites d&eacute;couvrir le site et son bookmarklet en rajoutant &agrave; votre message une userbarre ! <br />Il vous suffit de placer votre curseur &agrave; l'endroit o&ugrave; vous voulez l'ajouter - sans faire de s&eacute;lection - puis de cliquer sur le <acronym title=\"Favoris Intelligent\">bookmarklet</acronym> !<br />C'est tout, mais &ccedil;a aide beaucoup !<br />Merci<br />Zeraw</p>";
			ajouteElement('div', resultat, 'panneau_bookmarklet_twl2');
			
			txt_ = crypte;
			return txt_;
		}
} 
else { // Si la selection est de longueur nulle
	if($('panneau_bookmarklet_twl2')) { // Si l'élément existe déjà
		fermerDiv('panneau_bookmarklet_twl2');
	}	
	txt_ = '[url=http://twl2.fr.nf/][img]http://twl2.fr.nf/ub/?ub=userbar_3.gif[/img][/url][url=http://twl2.fr.nf/divers.php][img]http://twl2.fr.nf/ub/?npc&ub=bouton_bookmarklet.gif[/img][/url][url=http://twl2.fr.nf/][img]http://twl2.fr.nf/ub/?npc&ub=bouton_site.gif[/img][/url][url=http://forum.thiweb.com/viewtopic.php?f=9&t=1242][img]http://twl2.fr.nf/ub/?npc&ub=bouton_tuto.gif[/img][/url]';
	return txt_;
}

} // Fin de function ActionDansInputTransformationSelection

function ActionDansInput() {
	//-- Recup l'Objet
	var Obj = objFocused();
	if( Obj) {
		//-- Focus sur Objet
		Obj.focus();
		if( typeof Obj.selectionStart != "undefined") {
			//-- Position du curseur
			var PosDeb  = Obj.selectionStart;
			var PosFin  = Obj.selectionEnd;
			//-- Position du scroll
			var ScrollPosition = Obj.scrollTop;
			//-- Recup. des Chaines
			var Chaine  = Obj.value;
			var szAvant = Chaine.substring( 0 , PosDeb);
			var szApres = Chaine.substring( PosFin, Obj.textLength );
			//-- Recup. texte selectionne
			var szSelect = Chaine.substring( PosDeb, PosFin);
			var txt_ = ActionDansInputTransformationSelection(szSelect); 
			//-- Insertion du texte
			Obj.value = szAvant + txt_ + szApres;
			//-- Replace le curseur
			Obj.setSelectionRange(  szAvant.length + txt_.length, szAvant.length + txt_.length );
			//-- Replace le scroll
			Obj.scrollTop = ScrollPosition;
			//-- Replace le Focus
			Obj.focus();
		}
		else { // IE and consort
			//-- Recup. de la selection
			var szSelect = document.selection.createRange().text;
			var txt_ = ActionDansInputTransformationSelection(szSelect); 
			
			//-- Si du Texte est selectionne on le remplace
			if( szSelect.length > 0) {
				var Chaine = document.selection.createRange();
				Chaine.text = txt_ ;
				Chaine.collapse();
				Chaine.select();
			}
			else {
				var Chaine = Obj.value;
				var szMark ="~~";
				//-- Cree un double et insert la Mark ou est le curseur
				var szTmp = document.selection.createRange().duplicate();
				szTmp.text = szMark;
				//-- Recup. la position du curseur
				var PosDeb = Obj.value.search(szMark);
				//-- Recup. des Chaines
				var szAvant = Chaine.substring( 0 , PosDeb);
				var szApres = Chaine.substring( PosDeb, Obj.textLength );
				//-- Insertion du texte
				Obj.value = szAvant + txt_ + szSelect + szApres;
				//-- Repositionne le curseur
				PosDeb += txt_.length;
				//-(*)- Supprime les retours Chariot
				PosDeb -= Get_NbrCR( szAvant);
				//-- Recup de la Chaine
				Chaine = Obj.createTextRange();
				//-- Deplace le Debut de la chaine
				Chaine.moveStart('character', PosDeb);
				//-- Deplace le curseur
				Chaine.collapse();
				Chaine.select();
			}
		}
	}
} // Fin de ActionDansInput

// FONCTIONS DE CRYPTAGE ET DECRYPTAGE

function decrypter(crypte, transfURL) { // "transfURL" peut être true ou flase
	header = substr(crypte, 0, 6);
	//crypte = htmlentities(crypte); // Ceci est il vraiment utile ?
	crypte = str_replace("\x20", "", crypte);
	crypte = str_replace("\x0D", "", crypte);
	crypte = str_replace("\x0A", "", crypte);
	crypte = substr(crypte, 6);

	if (header == "TWL2.0")  {
		// Suite a des petits... hum bug d'encodage... le TWL2.0 faisait des remplacements mal venus. Donc on les inverse ic (voir code source php)
		str = "";
		for (i=0; i < strlen(crypte); i=i+2) {
			c = substr(crypte, i, 2);
			if (c=="AD")
				str += "A0D0";
			else
				str += c;
		}
		crypte = str;		
	}

	crypte = strrev(crypte);
	decrypte = hex2ascii(crypte);
	if(transfURL) { // Si on ne travaille pas dans un input
		decrypte = htmlentities(decrypte);
		decrypte = nl2br(decrypte);
		//decrypte = str_replace("&Uacute;", "<br />", decrypte);
		var reg = new RegExp("([a-zA-Z0-9]+(://)[^ <>]+)+","gi");
		decrypte = decrypte.replace(reg, "<a href='http://twl2.fr.nf/no-referer.php?u=$1' target=_blank>$1</a>");	
	}
	return decrypte;
}

function crypter(str,balise){ // "balise" peut etre true ou false
	hexrev = strtoupper(strrev(bin2hex(stripslashes(str)))) ;
	//hexrev = str_replace("A0D0", "AD", hexrev); // This was used for TWL2.0
	crypte = "TWL2.2" + hexrev;
	crypte = wordwrap(crypte, 65 ," ", 1);
	if(balise) { crypte = "[code]" + crypte + "[/code]"; }
	return crypte;
}

// CREATION DE LA CSS

var styles = "#panneau_bookmarklet_twl2{color:#939393;font-family:Verdana,Helvetica,Arial,sans-serif;font-size:11px;background-color:#1d1d1d;border:solid 3px #007ebf;border-top:0;padding:0;margin:0;margin-right:10px;position:fixed;top:0;right:0;max-width:600px;overflow:hidden;z-index:200;-webkit-border-bottom-right-radius:5px;-webkit-border-bottom-left-radius:5px;-moz-border-radius-bottomright:5px;-moz-border-radius-bottomleft:5px;border-bottom-right-radius:5px;border-bottom-left-radius:5px;scrollbar-arrow-color:#007ebf;scrollbar-3dlight-color:#1d1d1d;scrollbar-highlight-color:#1d1d1d;scrollbar-face-color:#1d1d1d;scrollbar-shadow-color:#1d1d1d;scrollbar-darkshadow-color:#1d1d1d;scrollbar-track-color:#1d1d1d}#panneau_bookmarklet_twl2 p{margin:0;padding:0}#panneau_bookmarklet_twl2 a{text-decoration:none;color:#007ebf}#panneau_bookmarklet_twl2 a:hover{color:#35a6e0}#panneau_bookmarklet_twl2 a:visited{text-decoration:line-through}#panneau_bookmarklet_twl2 #panneau_nav_bar{font-weight:700;text-align:right;margin:0;padding:3px}#panneau_bookmarklet_twl2 #resultat{margin:0;padding:10px;border-top:1px solid #007ebf;overflow-x:hidden;overflow-y:auto;max-height:400px}#panneau_bookmarklet_twl2 #panneau_textarea_result_crypte{font-family:Courier New,Lucida Console,Monaco,sans-serif;margin:0;width:450px;height:150px;border:1px solid #007ebf;background:transparent;font-size:10px;overflow-x:hidden;overflow-y:auto;color:#939393}";

var styleTag = document.createElement('style');
styleTag.setAttribute('type','text/css');
styleTag.setAttribute('media','screen');

if (document.all&&!window.opera) 
	{
		styleTag.styleSheet.cssText = styles;
	}
else 
	{
		styleTag.appendChild(document.createTextNode(styles));
	}
	
document.getElementsByTagName('HEAD').item(0).appendChild(styleTag);

// FONCTIONS DE CREATION DE LA DIV DE RESULTAT

function ajouteElement(typeElement, contenu, idElement, vitesse) {
	// On regarde d'abord si l'élément existe ou pas
	if($(idElement)) { // Si l'élément existe déjà
		document.body.removeChild($(idElement));
	}	
	// crée un nouvel élément div
	// et lui donne un peu de contenu
	// et on lui donne un id
	// et on le masque
	nouvelElement = document.createElement(typeElement);
	nouvelElement.innerHTML = contenu;
	nouvelElement.id = idElement;
	
	// ajoute l'élément qui vient d'être créé et son contenu au DOM
	document.body.appendChild(nouvelElement);
//	$(idElement).style.display='none';
//	
//	acth=act_height(idElement);
//	maxh=max_height(idElement);
//	if(!vitesse){
//		vitesse = maxh*5;
//	}
//	if(acth==0){
//		$(idElement).style.top=-maxh;
//		$(idElement).style.display="block";
//		var nbEtapes;
//		nbEtapes=Math.ceil(vitesse/maxh);
//		for(i=0;i<=maxh;i++){
//			newPosition=maxh-i;
//			STO("$('"+idElement+"').style.top='-"+newPosition+"px'",nbEtapes*i);
//		}
//	}
}

function fermerDiv(id, vitesse){
	acth=act_height(id);
	maxh=max_height(id);
	if(!vitesse){
		vitesse = acth*10;
	}
	if(acth==maxh){
		$(id).style.display="block";
		var nbEtapes;
		nbEtapes=Math.ceil(vitesse/acth);
		STO("document.body.removeChild($('"+id+"'));",nbEtapes*acth);
		for(i=0;i<=acth;i++){
			newPosition=i;
			STO("$('"+id+"').style.top='-"+newPosition+"px'",nbEtapes*i);
		}
	}
}

//function delElem(child) {
//	
//	var old = document.getElementById(child);
//	document.body.removeChild(old);
//} 

// FONCTIONS DIVERSES

function compteur() { // Compteur d'utilisation
	void(y=document.createElement('script'));
	void(y.src='http://twl2.fr.nf/compteur.php');
	void(document.body.appendChild(y)); 
}

function selectTextarea(id) {
	document.getElementById(id).select(); 
}

function selectionner(id)
{
	// Id du bloc span
	var e = document.getElementById(id);

	// Not IE
	if (window.getSelection)
	{
		var s = window.getSelection();
		// Safari
		if (s.setBaseAndExtent)
		{
			s.setBaseAndExtent(e, 0, e, e.innerText.length - 1);
		}
		// Firefox and Opera
		else
		{
			var r = document.createRange();
			r.selectNodeContents(e);
			s.removeAllRanges();
			s.addRange(r);
		}
	}
	// Some older browsers
	else if (document.getSelection)
	{
		var s = document.getSelection();
		var r = document.createRange();
		r.selectNodeContents(e);
		s.removeAllRanges();
		s.addRange(r);
	}
	// IE
	else if (document.selection)
	{
		var r = document.body.createTextRange();
		r.moveToElementText(e);
		r.select();
	}
}

function tagFocused(){
	tagFocused = document.activeElement.tagName;
	return tagFocused;
} 

function objFocused(){
	if(document.activeElement){
		objFocused = document.activeElement;
		return objFocused;
	}
	else{
		idFocused = 'message'; // On espere que le textarea ou se situe le curseur a pour id 'message'...
		return document.getElementById(idFocused);
	}
} 


function idFocused(){
	if(document.activeElement){
		idFocused = document.activeElement.id;
		return idFocused;
	}
	else{
		idFocused = 'message'; // On espere que le textarea ou se situe le curseur a pour id 'message'...
		return idFocused;
	}
} 

function Get_NbrCR(txt_){ // Fonction qui donne la position du curseur
  var NbrCR = 0;
  var Pos = txt_.indexOf("\r\n");
  while( Pos > -1){
    Pos = txt_.indexOf("\r\n", Pos+2);
    NbrCR ++;
  }
  return( NbrCR);
}

// FONCTIONS SIMPLEJS

function $(id) {
	return document.getElementById(id);
}
function STO(_24,_25) {
	return window.setTimeout(_24,_25);
}
//function DecToHexa(_26){
//var _27=parseInt(_26).toString(16);
//if(_26<16){
//_27="0"+_27;
//}
//return _27;
//}
//function addslashes(str){
//str=str.replace(/\"/g,"\\\"");
//str=str.replace(/\'/g,"\\'");
//return str;
//}
//function $toggle(id){
//if(act_height(id)==0){
//$blinddown(id);
//}else{
//$blindup(id);
//}
//}
function act_height(id)	{
	height=$(id).clientHeight;
	if(height==0) {
			height=$(id).offsetHeight;
		}
	return height;
}
//function act_width(id){
//width=$(id).clientWidth;
//if(width==0){
//width=$(id).offsetWidth;
//}
//return width;
//}
function max_height(id) {
	var ids=$(id).style;
	ids.overflow="hidden";
	
	if(act_height(id)!=0) {
		return act_height(id);
	}
	else {
		origdisp=ids.display;
		origheight=ids.height;
		origpos=ids.position;
		origvis=ids.visibility;
		ids.visibility="hidden";
		ids.height="";
		ids.display="block";
		ids.position="absolute";
		height=act_height(id);
		ids.display=origdisp;
		ids.height=origheight;
		ids.position=origpos;
		ids.visibility=origvis;
		return height;
	}
}
//function $blindup(id,_2f){
//if(!_2f){
//_2f=200;
//}
//acth=act_height(id);
//maxh=max_height(id);
//if(acth==maxh){
//$(id).style.display="block";
//var _30;
//_30=Math.ceil(_2f/acth);
//for(i=0;i<=acth;i++){
//newh=acth-i;
//STO("$('"+id+"').style.height='"+newh+"px'",_30*i);
//}
//}
//}
//function $blinddown(id,_32){
//if(!_32){
//_32=200;
//}
//acth=act_height(id);
//if(acth==0){
//maxh=max_height(id);
//$(id).style.display="block";
//$(id).style.height="0px";
//var _33;
//_33=Math.ceil(_32/maxh);
//for(i=1;i<=maxh;i++){
//STO("$('"+id+"').style.height='"+i+"px'",_33*i);
//}
//}
//}

// CONVERSION DES FONCTIONS PHP EN JAVASCRIPT

function hex2ascii(str) {
    // Convert Hexadecimal to Ascii

	var p = "";
	for (i=0; i < strlen(str); i=i+2)
		{
			p = p.concat(chr(hexdec(substr(str, i, 2))));
		}
	return p;
}

function str_replace(search, replace, subject) {
    // Replaces all occurrences of search in haystack with replace  
    // *     example 1: str_replace(' ', '.', 'Kevin van Zonneveld');
    // *     returns 1: 'Kevin.van.Zonneveld'
    // *     example 2: str_replace(['{name}', 'l'], ['hello', 'm'], '{name}, lars');
    // *     returns 2: 'hemmo, mars'
	
    var f = search, r = replace, s = subject;
    var ra = r instanceof Array, sa = s instanceof Array, f = [].concat(f), r = [].concat(r), i = (s = [].concat(s)).length;

    while (j = 0, i--) {
        if (s[i]) {
            while (s[i] = s[i].split(f[j]).join(ra ? r[j] || "" : r[0]), ++j in f){};
        }
    };

    return sa ? s : s[0];
}

function strlen (string) {
    // Get string length  
    // *     example 1: strlen('Kevin van Zonneveld');
    // *     returns 1: 19
	
    return (string+'').length;
}

function hexdec(hex_string) {
    // Returns the decimal equivalent of the hexadecimal number  
    // *     example 1: hexdec('that');
    // *     returns 1: 10
    // *     example 2: hexdec('a0');
    // *     returns 2: 160
	
    hex_string = (hex_string+'').replace(/[^a-f0-9]/gi, '');
    return parseInt(hex_string, 16);
}

function chr( ascii ) {
    // Converts a codepoint number to a character  
    // *     example 1: chr(75);
    // *     returns 1: 'K'
	
    return String.fromCharCode(ascii);
}

function isset(  ) {
    // *     example 1: isset( undefined, true);
    // *     returns 1: false
    // *     example 2: isset( 'Kevin van Zonneveld' );
    // *     returns 2: true
    
    var a=arguments; var l=a.length; var i=0;
    
    if (l==0) { 
        throw new Error('Empty isset'); 
    }
    
    while (i!=l) {
        if (typeof(a[i])=='undefined' || a[i]===null) { 
            return false; 
        } else { 
            i++; 
        }
    }
    return true;
}

function substr( f_string, f_start, f_length ) {
    // Returns part of a string  
    // *       example 1: substr('abcdef', 0, -1);
    // *       returns 1: 'abcde'
    // *       example 2: substr(2, 0, -6);
    // *       returns 2: ''
	
    f_string += '';

    if(f_start < 0) {
        f_start += f_string.length;
    }

    if(f_length == undefined) {
        f_length = f_string.length;
    } else if(f_length < 0){
        f_length += f_string.length;
    } else {
        f_length += f_start;
    }

    if(f_length < f_start) {
        f_length = f_start;
    }

    return f_string.substring(f_start, f_length);
}

function strrev( string ){
    // Reverse a string  
    // *     example 1: strrev('Kevin van Zonneveld');
    // *     returns 1: 'dlevennoZ nav niveK'
	
    var ret = '', i = 0;

    string += '';
    for ( i = string.length-1; i >= 0; i-- ){
       ret += string.charAt(i);
    }

    return ret;
}

function nl2br (str, is_xhtml) {
    // Converts newlines to HTML line breaks  
    // *     example 1: nl2br('Kevin\nvan\nZonneveld');
    // *     returns 1: 'Kevin<br />\nvan<br />\nZonneveld'
    // *     example 2: nl2br("\nOne\nTwo\n\nThree\n", false);
    // *     returns 2: '<br>\nOne<br>\nTwo<br>\n<br>\nThree<br>\n'
    // *     example 3: nl2br("\nOne\nTwo\n\nThree\n", true);
    // *     returns 3: '<br />\nOne<br />\nTwo<br />\n<br />\nThree<br />\n'
	
    breakTag = '<br />';
    if (typeof is_xhtml != 'undefined' && !is_xhtml) {
        breakTag = '<br>';
    }

    return (str + '').replace(/([^>]?)\n/g, '$1'+ breakTag +'\n');
}

function htmlentities (string, quote_style) {
    // Convert all applicable characters to HTML entities  
    // -    depends on: get_html_translation_table
    // *     example 1: htmlentities('Kevin & van Zonneveld');
    // *     returns 1: 'Kevin &amp; van Zonneveld'
	
    var histogram = {}, symbol = '', tmp_str = '', i = 0;
    tmp_str = string.toString();
    
    if (false === (histogram = get_html_translation_table('HTML_ENTITIES', quote_style))) {
        return false;
    }
    
    for (symbol in histogram) {
        entity = histogram[symbol];
        tmp_str = tmp_str.split(symbol).join(entity);
    }
    
    return tmp_str;
}

function get_html_translation_table(table, quote_style) {
    // Returns the internal translation table used by htmlspecialchars and htmlentities  
    // *     example 1: get_html_translation_table('HTML_SPECIALCHARS');
    // *     returns 1: {'"': '&quot;', '&': '&amp;', '<': '&lt;', '>': '&gt;'}
    
    var entities = {}, histogram = {}, decimal = 0, symbol = '';
    var constMappingTable = {}, constMappingQuoteStyle = {};
    var useTable = {}, useQuoteStyle = {};
    
    useTable      = (table ? table.toUpperCase() : 'HTML_SPECIALCHARS');
    useQuoteStyle = (quote_style ? quote_style.toUpperCase() : 'ENT_COMPAT');
    
    // Translate arguments
    constMappingTable[0]      = 'HTML_SPECIALCHARS';
    constMappingTable[1]      = 'HTML_ENTITIES';
    constMappingQuoteStyle[0] = 'ENT_NOQUOTES';
    constMappingQuoteStyle[2] = 'ENT_COMPAT';
    constMappingQuoteStyle[3] = 'ENT_QUOTES';
    
    // Map numbers to strings for compatibilty with PHP constants
    if (!isNaN(useTable)) {
        useTable = constMappingTable[useTable];
    }
    if (!isNaN(useQuoteStyle)) {
        useQuoteStyle = constMappingQuoteStyle[useQuoteStyle];
    }
    
    if (useTable == 'HTML_SPECIALCHARS') {
        // ascii decimals for better compatibility
        entities['38'] = '&amp;';
        entities['60'] = '&lt;';
        entities['62'] = '&gt;';
    } else if (useTable == 'HTML_ENTITIES') {
		var entities = {
			// ascii decimals for better compatibility
			38 : "&amp;",
			60 : "&lt;",
			62 : "&gt;",
	
			94 : "&circ;",
			126 : "&tilde;",
			
			130 : "&sbquo;",	// Single Low-9 Quotation Mark
			131 : "&fnof;",		// Latin Small Letter F With Hook
			132 : "&bdquo;",	// Double Low-9 Quotation Mark
			133 : "&hellip;",	// Horizontal Ellipsis
			134 : "&dagger;",	// Dagger
			135 : "&Dagger;",	// Double Dagger
			136 : "&circ;",		// Modifier Letter Circumflex Accent
			137 : "&permil;",	// Per Mille Sign
			138 : "&Scaron;",	// Latin Capital Letter S With Caron
			139 : "&lsaquo;",	// Single Left-Pointing Angle Quotation Mark
			140 : "&OElig;",	// Latin Capital Ligature OE
			145 : "&lsquo;",	// Left Single Quotation Mark
			146 : "&rsquo;",	// Right Single Quotation Mark
			147 : "&ldquo;",	// Left Double Quotation Mark
			148 : "&rdquo;",	// Right Double Quotation Mark
			149 : "&bull;",		// Bullet
			150 : "&ndash;",	// En Dash
			151 : "&mdash;",	// Em Dash
			152 : "&tilde;",	// Small Tilde
			153 : "&trade;",	// Trade Mark Sign
			154 : "&scaron;",	// Latin Small Letter S With Caron
			155 : "&rsaquo;",	// Single Right-Pointing Angle Quotation Mark
			156 : "&oelig;",	// Latin Small Ligature OE
			159 : "&Yuml;",		// Latin Capital Letter Y With Diaeresis
	
			160 : "&nbsp;",		// Non-breaking space
			161 : "&iexcl;",		// Inverted exclamation mark
			162 : "&cent;",		// Cent sign
			163 : "&pound;",		// Pound sign
			164 : "&curren;",	// Currency sign
			165 : "&yen;",		// Yen sign
			166 : "&brvbar;",	// Broken vertical bar
			167 : "&sect;",		// Section sign
			168 : "&uml;",		// Diaeresis
			169 : "&copy;",		// Copyright sign
			170 : "&ordf;",		// Feminine ordinal indicator
			171 : "&laquo;",		// Left-pointing double angle quotation mark
			172 : "&not;",		// Not sign
			173 : "&shy;",		// Soft hyphen
			174 : "&reg;",		// Registered sign
			175 : "&macr;",		// Macron
			176 : "&deg;",		// Degree sign
			177 : "&plusmn;",	// Plus-minus sign
			178 : "&sup2;",		// Superscript two
			179 : "&sup3;",		// Superscript three
			180 : "&acute;",		// Acute accent
			181 : "&micro;",		// Micro sign
			182 : "&para;",		// Pilcrow sign
			183 : "&middot;",	// Middle dot
			184 : "&cedil;",		// Cedilla
			185 : "&sup1;",		// Superscript one
			186 : "&ordm;",		// Masculine ordinal indicator
			187 : "&raquo;",		// Right-pointing double angle quotation mark
			188 : "&frac14;",	// Vulgar fraction one-quarter
			189 : "&frac12;",	// Vulgar fraction one-half
			190 : "&frac34;",	// Vulgar fraction three-quarters
			191 : "&iquest;",	// Inverted question mark
			192 : "&Agrave;",	// A with grave
			193 : "&Aacute;",	// A with acute
			194 : "&Acirc;",		// A with circumflex
			195 : "&Atilde;",	// A with tilde
			196 : "&Auml;",		// A with diaeresis
			197 : "&Aring;",		// A with ring above
			198 : "&AElig;",		// AE
			199 : "&Ccedil;",	// C with cedilla
			200 : "&Egrave;",	// E with grave
			201 : "&Eacute;",	// E with acute
			202 : "&Ecirc;",		// E with circumflex
			203 : "&Euml;",		// E with diaeresis
			204 : "&Igrave;",	// I with grave
			205 : "&Iacute;",	// I with acute
			206 : "&Icirc;",		// I with circumflex
			207 : "&Iuml;",		// I with diaeresis
			208 : "&ETH;",		// Eth
			209 : "&Ntilde;",	// N with tilde
			210 : "&Ograve;",	// O with grave
			211 : "&Oacute;",	// O with acute
			212 : "&Ocirc;",		// O with circumflex
			213 : "&Otilde;",	// O with tilde
			214 : "&Ouml;",		// O with diaeresis
			215 : "&times;",		// Multiplication sign
			216 : "&Oslash;",	// O with stroke
			217 : "&Ugrave;",	// U with grave
			218 : "&Uacute;",	// U with acute
			219 : "&Ucirc;",		// U with circumflex
			220 : "&Uuml;",		// U with diaeresis
			221 : "&Yacute;",	// Y with acute
			222 : "&THORN;",		// Thorn
			223 : "&szlig;",		// Sharp s. Also known as ess-zed
			224 : "&agrave;",	// a with grave
			225 : "&aacute;",	// a with acute
			226 : "&acirc;",		// a with circumflex
			227 : "&atilde;",	// a with tilde
			228 : "&auml;",		// a with diaeresis
			229 : "&aring;",		// a with ring above
			230 : "&aelig;",		// ae. Also known as ligature ae
			231 : "&ccedil;",	// c with cedilla
			232 : "&egrave;",	// e with grave
			233 : "&eacute;",	// e with acute
			234 : "&ecirc;",		// e with circumflex
			235 : "&euml;",		// e with diaeresis
			236 : "&igrave;",	// i with grave
			237 : "&iacute;",	// i with acute
			238 : "&icirc;",		// i with circumflex
			239 : "&iuml;",		// i with diaeresis
			240 : "&eth;",		// eth
			241 : "&ntilde;",	// n with tilde
			242 : "&ograve;",	// o with grave
			243 : "&oacute;",	// o with acute
			244 : "&ocirc;",		// o with circumflex
			245 : "&otilde;",	// o with tilde
			246 : "&ouml;",		// o with diaeresis
			247 : "&divide;",	// Division sign
			248 : "&oslash;",	// o with stroke. Also known as o with slash
			249 : "&ugrave;",	// u with grave
			250 : "&uacute;",	// u with acute
			251 : "&ucirc;",		// u with circumflex
			252 : "&uuml;",		// u with diaeresis
			253 : "&yacute;",	// y with acute
			254 : "&thorn;",		// thorn
			255 : "&yuml;",		// y with diaeresis
			264 : "&#264;",		// Latin capital letter C with circumflex
			265 : "&#265;",		// Latin small letter c with circumflex
			338 : "&OElig;",		// Latin capital ligature OE
			339 : "&oelig;",		// Latin small ligature oe
			352 : "&Scaron;",	// Latin capital letter S with caron
			353 : "&scaron;",	// Latin small letter s with caron
			372 : "&#372;",		// Latin capital letter W with circumflex
			373 : "&#373;",		// Latin small letter w with circumflex
			374 : "&#374;",		// Latin capital letter Y with circumflex
			375 : "&#375;",		// Latin small letter y with circumflex
			376 : "&Yuml;",		// Latin capital letter Y with diaeresis
			402 : "&fnof;",		// Latin small f with hook, function, florin
			710 : "&circ;",		// Modifier letter circumflex accent
			732 : "&tilde;",		// Small tilde
			913 : "&Alpha;",		// Alpha
			914 : "&Beta;",		// Beta
			915 : "&Gamma;",		// Gamma
			916 : "&Delta;",		// Delta
			917 : "&Epsilon;",	// Epsilon
			918 : "&Zeta;",		// Zeta
			919 : "&Eta;",		// Eta
			920 : "&Theta;",		// Theta
			921 : "&Iota;",		// Iota
			922 : "&Kappa;",		// Kappa
			923 : "&Lambda;",	// Lambda
			924 : "&Mu;",		// Mu
			925 : "&Nu;",		// Nu
			926 : "&Xi;",		// Xi
			927 : "&Omicron;",	// Omicron
			928 : "&Pi;",		// Pi
			929 : "&Rho;",		// Rho
			931 : "&Sigma;",		// Sigma
			932 : "&Tau;",		// Tau
			933 : "&Upsilon;",	// Upsilon
			934 : "&Phi;",		// Phi
			935 : "&Chi;",		// Chi
			936 : "&Psi;",		// Psi
			937 : "&Omega;",		// Omega
			945 : "&alpha;",		// alpha
			946 : "&beta;",		// beta
			947 : "&gamma;",		// gamma
			948 : "&delta;",		// delta
			949 : "&epsilon;",	// epsilon
			950 : "&zeta;",		// zeta
			951 : "&eta;",		// eta
			952 : "&theta;",		// theta
			953 : "&iota;",		// iota
			954 : "&kappa;",		// kappa
			955 : "&lambda;",	// lambda
			956 : "&mu;",		// mu
			957 : "&nu;",		// nu
			958 : "&xi;",		// xi
			959 : "&omicron;",	// omicron
			960 : "&pi;",		// pi
			961 : "&rho;",		// rho
			962 : "&sigmaf;",	// sigmaf
			963 : "&sigma;",		// sigma
			964 : "&tau;",		// tau
			965 : "&upsilon;",	// upsilon
			966 : "&phi;",		// phi
			967 : "&chi;",		// chi
			968 : "&psi;",		// psi
			969 : "&omega;",		// omega
			977 : "&thetasym;",	// Theta symbol
			978 : "&upsih;",		// Greek upsilon with hook symbol
			982 : "&piv;",		// Pi symbol
			8194 : "&ensp;",		// En space
			8195 : "&emsp;",		// Em space
			8201 : "&thinsp;",	// Thin space
			8204 : "&zwnj;",		// Zero width non-joiner
			8205 : "&zwj;",		// Zero width joiner
			8206 : "&lrm;",		// Left-to-right mark
			8207 : "&rlm;",		// Right-to-left mark
			8211 : "&ndash;",	// En dash
			8212 : "&mdash;",	// Em dash
			8216 : "&lsquo;",	// Left single quotation mark
			8217 : "&rsquo;",	// Right single quotation mark
			8218 : "&sbquo;",	// Single low-9 quotation mark
			8220 : "&ldquo;",	// Left double quotation mark
			8221 : "&rdquo;",	// Right double quotation mark
			8222 : "&bdquo;",	// Double low-9 quotation mark
			8224 : "&dagger;",	// Dagger
			8225 : "&Dagger;",	// Double dagger
			8226 : "&bull;",		// Bullet
			8230 : "&hellip;",	// Horizontal ellipsis
			8240 : "&permil;",	// Per mille sign
			8242 : "&prime;",	// Prime
			8243 : "&Prime;",	// Double Prime
			8249 : "&lsaquo;",	// Single left-pointing angle quotation
			8250 : "&rsaquo;",	// Single right-pointing angle quotation
			8254 : "&oline;",	// Overline
			8260 : "&frasl;",	// Fraction Slash
			8364 : "&euro;",		// Euro sign
			8472 : "&weierp;",	// Script capital
			8465 : "&image;",	// Blackletter capital I
			8476 : "&real;",		// Blackletter capital R
			8482 : "&trade;",	// Trade mark sign
			8501 : "&alefsym;",	// Alef symbol
			8592 : "&larr;",		// Leftward arrow
			8593 : "&uarr;",		// Upward arrow
			8594 : "&rarr;",		// Rightward arrow
			8595 : "&darr;",		// Downward arrow
			8596 : "&harr;",		// Left right arrow
			8629 : "&crarr;",	// Downward arrow with corner leftward. Also known as carriage return
			8656 : "&lArr;",		// Leftward double arrow. ISO 10646 does not say that lArr is the same as the 'is implied by' arrow but also does not have any other character for that function. So ? lArr can be used for 'is implied by' as ISOtech suggests
			8657 : "&uArr;",		// Upward double arrow
			8658 : "&rArr;",		// Rightward double arrow. ISO 10646 does not say this is the 'implies' character but does not have another character with this function so ? rArr can be used for 'implies' as ISOtech suggests
			8659 : "&dArr;",		// Downward double arrow
			8660 : "&hArr;",		// Left-right double arrow
			// Mathematical Operators
			8704 : "&forall;",	// For all
			8706 : "&part;",		// Partial differential
			8707 : "&exist;",	// There exists
			8709 : "&empty;",	// Empty set. Also known as null set and diameter
			8711 : "&nabla;",	// Nabla. Also known as backward difference
			8712 : "&isin;",		// Element of
			8713 : "&notin;",	// Not an element of
			8715 : "&ni;",		// Contains as member
			8719 : "&prod;",		// N-ary product. Also known as product sign. Prod is not the same character as U+03A0 'greek capital letter pi' though the same glyph might be used for both
			8721 : "&sum;",		// N-ary summation. Sum is not the same character as U+03A3 'greek capital letter sigma' though the same glyph might be used for both
			8722 : "&minus;",	// Minus sign
			8727 : "&lowast;",	// Asterisk operator
			8729 : "&#8729;",	// Bullet operator
			8730 : "&radic;",	// Square root. Also known as radical sign
			8733 : "&prop;",		// Proportional to
			8734 : "&infin;",	// Infinity
			8736 : "&ang;",		// Angle
			8743 : "&and;",		// Logical and. Also known as wedge
			8744 : "&or;",		// Logical or. Also known as vee
			8745 : "&cap;",		// Intersection. Also known as cap
			8746 : "&cup;",		// Union. Also known as cup
			8747 : "&int;",		// Integral
			8756 : "&there4;",	// Therefore
			8764 : "&sim;",		// tilde operator. Also known as varies with and similar to. The tilde operator is not the same character as the tilde, U+007E, although the same glyph might be used to represent both
			8773 : "&cong;",		// Approximately equal to
			8776 : "&asymp;",	// Almost equal to. Also known as asymptotic to
			8800 : "&ne;",		// Not equal to
			8801 : "&equiv;",	// Identical to
			8804 : "&le;",		// Less-than or equal to
			8805 : "&ge;",		// Greater-than or equal to
			8834 : "&sub;",		// Subset of
			8835 : "&sup;",		// Superset of. Note that nsup, 'not a superset of, U+2283' is not covered by the Symbol font encoding and is not included.
			8836 : "&nsub;",		// Not a subset of
			8838 : "&sube;",		// Subset of or equal to
			8839 : "&supe;",		// Superset of or equal to
			8853 : "&oplus;",	// Circled plus. Also known as direct sum
			8855 : "&otimes;",	// Circled times. Also known as vector product
			8869 : "&perp;",		// Up tack. Also known as orthogonal to and perpendicular
			8901 : "&sdot;",		// Dot operator. The dot operator is not the same character as U+00B7 middle dot
			// Miscellaneous Technical
			8968 : "&lceil;",	// Left ceiling. Also known as an APL upstile
			8969 : "&rceil;",	// Right ceiling
			8970 : "&lfloor;",	// left floor. Also known as APL downstile
			8971 : "&rfloor;",	// Right floor
			9001 : "&lang;",		// Left-pointing angle bracket. Also known as bra. Lang is not the same character as U+003C 'less than'or U+2039 'single left-pointing angle quotation mark'
			9002 : "&rang;",		// Right-pointing angle bracket. Also known as ket. Rang is not the same character as U+003E 'greater than' or U+203A 'single right-pointing angle quotation mark'
			// Geometric Shapes
			9642 : "&#9642;",	// Black small square
			9643 : "&#9643;",	// White small square
			9674 : "&loz;",		// Lozenge
			// Miscellaneous Symbols
			9702 : "&#9702;",	// White bullet
			9824 : "&spades;",	// Black (filled) spade suit
			9827 : "&clubs;",	// Black (filled) club suit. Also known as shamrock
			9829 : "&hearts;",	// Black (filled) heart suit. Also known as shamrock
			9830 : "&diams;"   // Black (filled) diamond suit
			
		};
			
		// Même liste que précédemment, mais avec un autre type d'écriture			
		
		/*			
        // ascii decimals for better compatibility
	    entities['38'] = '&amp;';
	    entities['60'] = '&lt;';
	    entities['62'] = '&gt;';

		entities['94'] = '&circ;';
		entities['126'] = '&tilde;';
		
		entities['130'] = '&sbquo;';	// Single Low-9 Quotation Mark
		entities['131'] = '&fnof;';		// Latin Small Letter F With Hook
		entities['132'] = '&bdquo;';	// Double Low-9 Quotation Mark
		entities['133'] = '&hellip;';	// Horizontal Ellipsis
		entities['134'] = '&dagger;';	// Dagger
		entities['135'] = '&Dagger;';	// Double Dagger
		entities['136'] = '&circ;';		// Modifier Letter Circumflex Accent
		entities['137'] = '&permil;';	// Per Mille Sign
		entities['138'] = '&Scaron;';	// Latin Capital Letter S With Caron
		entities['139'] = '&lsaquo;';	// Single Left-Pointing Angle Quotation Mark
		entities['140'] = '&OElig;';	// Latin Capital Ligature OE
		entities['145'] = '&lsquo;';	// Left Single Quotation Mark
		entities['146'] = '&rsquo;';	// Right Single Quotation Mark
		entities['147'] = '&ldquo;';	// Left Double Quotation Mark
		entities['148'] = '&rdquo;';	// Right Double Quotation Mark
		entities['149'] = '&bull;';		// Bullet
		entities['150'] = '&ndash;';	// En Dash
		entities['151'] = '&mdash;';	// Em Dash
		entities['152'] = '&tilde;';	// Small Tilde
		entities['153'] = '&trade;';	// Trade Mark Sign
		entities['154'] = '&scaron;';	// Latin Small Letter S With Caron
		entities['155'] = '&rsaquo;';	// Single Right-Pointing Angle Quotation Mark
		entities['156'] = '&oelig;';	// Latin Small Ligature OE
		entities['159'] = '&Yuml;';		// Latin Capital Letter Y With Diaeresis

		entities['160'] = '&nbsp;';		// Non-breaking space
		entities['161'] = '&iexcl;';		// Inverted exclamation mark
		entities['162'] = '&cent;';		// Cent sign
		entities['163'] = '&pound;';		// Pound sign
		entities['164'] = '&curren;';	// Currency sign
		entities['165'] = '&yen;';		// Yen sign
		entities['166'] = '&brvbar;';	// Broken vertical bar
		entities['167'] = '&sect;';		// Section sign
		entities['168'] = '&uml;';		// Diaeresis
		entities['169'] = '&copy;';		// Copyright sign
		entities['170'] = '&ordf;';		// Feminine ordinal indicator
		entities['171'] = '&laquo;';		// Left-pointing double angle quotation mark
		entities['172'] = '&not;';		// Not sign
		entities['173'] = '&shy;';		// Soft hyphen
		entities['174'] = '&reg;';		// Registered sign
		entities['175'] = '&macr;';		// Macron
		entities['176'] = '&deg;';		// Degree sign
		entities['177'] = '&plusmn;';	// Plus-minus sign
		entities['178'] = '&sup2;';		// Superscript two
		entities['179'] = '&sup3;';		// Superscript three
		entities['180'] = '&acute;';		// Acute accent
		entities['181'] = '&micro;';		// Micro sign
		entities['182'] = '&para;';		// Pilcrow sign
		entities['183'] = '&middot;';	// Middle dot
		entities['184'] = '&cedil;';		// Cedilla
		entities['185'] = '&sup1;';		// Superscript one
		entities['186'] = '&ordm;';		// Masculine ordinal indicator
		entities['187'] = '&raquo;';		// Right-pointing double angle quotation mark
		entities['188'] = '&frac14;';	// Vulgar fraction one-quarter
		entities['189'] = '&frac12;';	// Vulgar fraction one-half
		entities['190'] = '&frac34;';	// Vulgar fraction three-quarters
		entities['191'] = '&iquest;';	// Inverted question mark
		entities['192'] = '&Agrave;';	// A with grave
		entities['193'] = '&Aacute;';	// A with acute
		entities['194'] = '&Acirc;';		// A with circumflex
		entities['195'] = '&Atilde;';	// A with tilde
		entities['196'] = '&Auml;';		// A with diaeresis
		entities['197'] = '&Aring;';		// A with ring above
		entities['198'] = '&AElig;';		// AE
		entities['199'] = '&Ccedil;';	// C with cedilla
		entities['200'] = '&Egrave;';	// E with grave
		entities['201'] = '&Eacute;';	// E with acute
		entities['202'] = '&Ecirc;';		// E with circumflex
		entities['203'] = '&Euml;';		// E with diaeresis
		entities['204'] = '&Igrave;';	// I with grave
		entities['205'] = '&Iacute;';	// I with acute
		entities['206'] = '&Icirc;';		// I with circumflex
		entities['207'] = '&Iuml;';		// I with diaeresis
		entities['208'] = '&ETH;';		// Eth
		entities['209'] = '&Ntilde;';	// N with tilde
		entities['210'] = '&Ograve;';	// O with grave
		entities['211'] = '&Oacute;';	// O with acute
		entities['212'] = '&Ocirc;';		// O with circumflex
		entities['213'] = '&Otilde;';	// O with tilde
		entities['214'] = '&Ouml;';		// O with diaeresis
		entities['215'] = '&times;';		// Multiplication sign
		entities['216'] = '&Oslash;';	// O with stroke
		entities['217'] = '&Ugrave;';	// U with grave
		entities['218'] = '&Uacute;';	// U with acute
		entities['219'] = '&Ucirc;';		// U with circumflex
		entities['220'] = '&Uuml;';		// U with diaeresis
		entities['221'] = '&Yacute;';	// Y with acute
		entities['222'] = '&THORN;';		// Thorn
		entities['223'] = '&szlig;';		// Sharp s. Also known as ess-zed
		entities['224'] = '&agrave;';	// a with grave
		entities['225'] = '&aacute;';	// a with acute
		entities['226'] = '&acirc;';		// a with circumflex
		entities['227'] = '&atilde;';	// a with tilde
		entities['228'] = '&auml;';		// a with diaeresis
		entities['229'] = '&aring;';		// a with ring above
		entities['230'] = '&aelig;';		// ae. Also known as ligature ae
		entities['231'] = '&ccedil;';	// c with cedilla
		entities['232'] = '&egrave;';	// e with grave
		entities['233'] = '&eacute;';	// e with acute
		entities['234'] = '&ecirc;';		// e with circumflex
		entities['235'] = '&euml;';		// e with diaeresis
		entities['236'] = '&igrave;';	// i with grave
		entities['237'] = '&iacute;';	// i with acute
		entities['238'] = '&icirc;';		// i with circumflex
		entities['239'] = '&iuml;';		// i with diaeresis
		entities['240'] = '&eth;';		// eth
		entities['241'] = '&ntilde;';	// n with tilde
		entities['242'] = '&ograve;';	// o with grave
		entities['243'] = '&oacute;';	// o with acute
		entities['244'] = '&ocirc;';		// o with circumflex
		entities['245'] = '&otilde;';	// o with tilde
		entities['246'] = '&ouml;';		// o with diaeresis
		entities['247'] = '&divide;';	// Division sign
		entities['248'] = '&oslash;';	// o with stroke. Also known as o with slash
		entities['249'] = '&ugrave;';	// u with grave
		entities['250'] = '&uacute;';	// u with acute
		entities['251'] = '&ucirc;';		// u with circumflex
		entities['252'] = '&uuml;';		// u with diaeresis
		entities['253'] = '&yacute;';	// y with acute
		entities['254'] = '&thorn;';		// thorn
		entities['255'] = '&yuml;';		// y with diaeresis
		entities['264'] = '&#264;';		// Latin capital letter C with circumflex
		entities['265'] = '&#265;';		// Latin small letter c with circumflex
		entities['338'] = '&OElig;';		// Latin capital ligature OE
		entities['339'] = '&oelig;';		// Latin small ligature oe
		entities['352'] = '&Scaron;';	// Latin capital letter S with caron
		entities['353'] = '&scaron;';	// Latin small letter s with caron
		entities['372'] = '&#372;';		// Latin capital letter W with circumflex
		entities['373'] = '&#373;';		// Latin small letter w with circumflex
		entities['374'] = '&#374;';		// Latin capital letter Y with circumflex
		entities['375'] = '&#375;';		// Latin small letter y with circumflex
		entities['376'] = '&Yuml;';		// Latin capital letter Y with diaeresis
		entities['402'] = '&fnof;';		// Latin small f with hook, function, florin
		entities['710'] = '&circ;';		// Modifier letter circumflex accent
		entities['732'] = '&tilde;';		// Small tilde
		entities['913'] = '&Alpha;';		// Alpha
		entities['914'] = '&Beta;';		// Beta
		entities['915'] = '&Gamma;';		// Gamma
		entities['916'] = '&Delta;';		// Delta
		entities['917'] = '&Epsilon;';	// Epsilon
		entities['918'] = '&Zeta;';		// Zeta
		entities['919'] = '&Eta;';		// Eta
		entities['920'] = '&Theta;';		// Theta
		entities['921'] = '&Iota;';		// Iota
		entities['922'] = '&Kappa;';		// Kappa
		entities['923'] = '&Lambda;';	// Lambda
		entities['924'] = '&Mu;';		// Mu
		entities['925'] = '&Nu;';		// Nu
		entities['926'] = '&Xi;';		// Xi
		entities['927'] = '&Omicron;';	// Omicron
		entities['928'] = '&Pi;';		// Pi
		entities['929'] = '&Rho;';		// Rho
		entities['931'] = '&Sigma;';		// Sigma
		entities['932'] = '&Tau;';		// Tau
		entities['933'] = '&Upsilon;';	// Upsilon
		entities['934'] = '&Phi;';		// Phi
		entities['935'] = '&Chi;';		// Chi
		entities['936'] = '&Psi;';		// Psi
		entities['937'] = '&Omega;';		// Omega
		entities['945'] = '&alpha;';		// alpha
		entities['946'] = '&beta;';		// beta
		entities['947'] = '&gamma;';		// gamma
		entities['948'] = '&delta;';		// delta
		entities['949'] = '&epsilon;';	// epsilon
		entities['950'] = '&zeta;';		// zeta
		entities['951'] = '&eta;';		// eta
		entities['952'] = '&theta;';		// theta
		entities['953'] = '&iota;';		// iota
		entities['954'] = '&kappa;';		// kappa
		entities['955'] = '&lambda;';	// lambda
		entities['956'] = '&mu;';		// mu
		entities['957'] = '&nu;';		// nu
		entities['958'] = '&xi;';		// xi
		entities['959'] = '&omicron;';	// omicron
		entities['960'] = '&pi;';		// pi
		entities['961'] = '&rho;';		// rho
		entities['962'] = '&sigmaf;';	// sigmaf
		entities['963'] = '&sigma;';		// sigma
		entities['964'] = '&tau;';		// tau
		entities['965'] = '&upsilon;';	// upsilon
		entities['966'] = '&phi;';		// phi
		entities['967'] = '&chi;';		// chi
		entities['968'] = '&psi;';		// psi
		entities['969'] = '&omega;';		// omega
		entities['977'] = '&thetasym;';	// Theta symbol
		entities['978'] = '&upsih;';		// Greek upsilon with hook symbol
		entities['982'] = '&piv;';		// Pi symbol
		entities['8194'] = '&ensp;';		// En space
		entities['8195'] = '&emsp;';		// Em space
		entities['8201'] = '&thinsp;';	// Thin space
		entities['8204'] = '&zwnj;';		// Zero width non-joiner
		entities['8205'] = '&zwj;';		// Zero width joiner
		entities['8206'] = '&lrm;';		// Left-to-right mark
		entities['8207'] = '&rlm;';		// Right-to-left mark
		entities['8211'] = '&ndash;';	// En dash
		entities['8212'] = '&mdash;';	// Em dash
		entities['8216'] = '&lsquo;';	// Left single quotation mark
		entities['8217'] = '&rsquo;';	// Right single quotation mark
		entities['8218'] = '&sbquo;';	// Single low-9 quotation mark
		entities['8220'] = '&ldquo;';	// Left double quotation mark
		entities['8221'] = '&rdquo;';	// Right double quotation mark
		entities['8222'] = '&bdquo;';	// Double low-9 quotation mark
		entities['8224'] = '&dagger;';	// Dagger
		entities['8225'] = '&Dagger;';	// Double dagger
		entities['8226'] = '&bull;';		// Bullet
		entities['8230'] = '&hellip;';	// Horizontal ellipsis
		entities['8240'] = '&permil;';	// Per mille sign
		entities['8242'] = '&prime;';	// Prime
		entities['8243'] = '&Prime;';	// Double Prime
		entities['8249'] = '&lsaquo;';	// Single left-pointing angle quotation
		entities['8250'] = '&rsaquo;';	// Single right-pointing angle quotation
		entities['8254'] = '&oline;';	// Overline
		entities['8260'] = '&frasl;';	// Fraction Slash
		entities['8364'] = '&euro;';		// Euro sign
		entities['8472'] = '&weierp;';	// Script capital
		entities['8465'] = '&image;';	// Blackletter capital I
		entities['8476'] = '&real;';		// Blackletter capital R
		entities['8482'] = '&trade;';	// Trade mark sign
		entities['8501'] = '&alefsym;';	// Alef symbol
		entities['8592'] = '&larr;';		// Leftward arrow
		entities['8593'] = '&uarr;';		// Upward arrow
		entities['8594'] = '&rarr;';		// Rightward arrow
		entities['8595'] = '&darr;';		// Downward arrow
		entities['8596'] = '&harr;';		// Left right arrow
		entities['8629'] = '&crarr;';	// Downward arrow with corner leftward. Also known as carriage return
		entities['8656'] = '&lArr;';		// Leftward double arrow. ISO 10646 does not say that lArr is the same as the 'is implied by' arrow but also does not have any other character for that function. So ? lArr can be used for 'is implied by' as ISOtech suggests
		entities['8657'] = '&uArr;';		// Upward double arrow
		entities['8658'] = '&rArr;';		// Rightward double arrow. ISO 10646 does not say this is the 'implies' character but does not have another character with this function so ? rArr can be used for 'implies' as ISOtech suggests
		entities['8659'] = '&dArr;';		// Downward double arrow
		entities['8660'] = '&hArr;';		// Left-right double arrow
		// Mathematical Operators
		entities['8704'] = '&forall;';	// For all
		entities['8706'] = '&part;';		// Partial differential
		entities['8707'] = '&exist;';	// There exists
		entities['8709'] = '&empty;';	// Empty set. Also known as null set and diameter
		entities['8711'] = '&nabla;';	// Nabla. Also known as backward difference
		entities['8712'] = '&isin;';		// Element of
		entities['8713'] = '&notin;';	// Not an element of
		entities['8715'] = '&ni;';		// Contains as member
		entities['8719'] = '&prod;';		// N-ary product. Also known as product sign. Prod is not the same character as U+03A0 'greek capital letter pi' though the same glyph might be used for both
		entities['8721'] = '&sum;';		// N-ary summation. Sum is not the same character as U+03A3 'greek capital letter sigma' though the same glyph might be used for both
		entities['8722'] = '&minus;';	// Minus sign
		entities['8727'] = '&lowast;';	// Asterisk operator
		entities['8729'] = '&#8729;';	// Bullet operator
		entities['8730'] = '&radic;';	// Square root. Also known as radical sign
		entities['8733'] = '&prop;';		// Proportional to
		entities['8734'] = '&infin;';	// Infinity
		entities['8736'] = '&ang;';		// Angle
		entities['8743'] = '&and;';		// Logical and. Also known as wedge
		entities['8744'] = '&or;';		// Logical or. Also known as vee
		entities['8745'] = '&cap;';		// Intersection. Also known as cap
		entities['8746'] = '&cup;';		// Union. Also known as cup
		entities['8747'] = '&int;';		// Integral
		entities['8756'] = '&there4;';	// Therefore
		entities['8764'] = '&sim;';		// tilde operator. Also known as varies with and similar to. The tilde operator is not the same character as the tilde, U+007E, although the same glyph might be used to represent both
		entities['8773'] = '&cong;';		// Approximately equal to
		entities['8776'] = '&asymp;';	// Almost equal to. Also known as asymptotic to
		entities['8800'] = '&ne;';		// Not equal to
		entities['8801'] = '&equiv;';	// Identical to
		entities['8804'] = '&le;';		// Less-than or equal to
		entities['8805'] = '&ge;';		// Greater-than or equal to
		entities['8834'] = '&sub;';		// Subset of
		entities['8835'] = '&sup;';		// Superset of. Note that nsup, 'not a superset of, U+2283' is not covered by the Symbol font encoding and is not included.
		entities['8836'] = '&nsub;';		// Not a subset of
		entities['8838'] = '&sube;';		// Subset of or equal to
		entities['8839'] = '&supe;';		// Superset of or equal to
		entities['8853'] = '&oplus;';	// Circled plus. Also known as direct sum
		entities['8855'] = '&otimes;';	// Circled times. Also known as vector product
		entities['8869'] = '&perp;';		// Up tack. Also known as orthogonal to and perpendicular
		entities['8901'] = '&sdot;';		// Dot operator. The dot operator is not the same character as U+00B7 middle dot
		// Miscellaneous Technical
		entities['8968'] = '&lceil;';	// Left ceiling. Also known as an APL upstile
		entities['8969'] = '&rceil;';	// Right ceiling
		entities['8970'] = '&lfloor;';	// left floor. Also known as APL downstile
		entities['8971'] = '&rfloor;';	// Right floor
		entities['9001'] = '&lang;';		// Left-pointing angle bracket. Also known as bra. Lang is not the same character as U+003C 'less than'or U+2039 'single left-pointing angle quotation mark'
		entities['9002'] = '&rang;';		// Right-pointing angle bracket. Also known as ket. Rang is not the same character as U+003E 'greater than' or U+203A 'single right-pointing angle quotation mark'
		// Geometric Shapes
		entities['9642'] = '&#9642;';	// Black small square
		entities['9643'] = '&#9643;';	// White small square
		entities['9674'] = '&loz;';		// Lozenge
		// Miscellaneous Symbols
		entities['9702'] = '&#9702;';	// White bullet
		entities['9824'] = '&spades;';	// Black (filled) spade suit
		entities['9827'] = '&clubs;';	// Black (filled) club suit. Also known as shamrock
		entities['9829'] = '&hearts;';	// Black (filled) heart suit. Also known as shamrock
		entities['9830'] = '&diams;';   // Black (filled) diamond suit			
		*/
		
    } else {
        throw Error("Table: "+useTable+' not supported');
        return false;
    }
    
    if (useQuoteStyle != 'ENT_NOQUOTES') {
        entities['34'] = '&quot;';
    }
    
    if (useQuoteStyle == 'ENT_QUOTES') {
        entities['39'] = '&#039;';
    }
    
    // ascii decimals to real symbols
    for (decimal in entities) {
        symbol = String.fromCharCode(decimal);
        histogram[symbol] = entities[decimal];
    }
    
    return histogram;
}

function bin2hex (s){
    // Converts the binary representation of data to hex  
    // 
    // version: 909.322
    // discuss at: http://phpjs.org/functions/bin2hex
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   bugfixed by: Onno Marsman
    // +   bugfixed by: Linuxworld
    // *     example 1: bin2hex('Kev');
    // *     returns 1: '4b6576'
    // *     example 2: bin2hex(String.fromCharCode(0x00));
    // *     returns 2: '00'
    var i, f = 0, a = [];
    
    s += '';
    f = s.length;
    
    for (i = 0; i<f; i++) {
        a[i] = s.charCodeAt(i).toString(16).replace(/^([\da-f])$/,"0$1");
    }
    
    return a.join('');
}

function stripslashes (str) {
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Ates Goral (http://magnetiq.com)
    // +      fixed by: Mick@el
    // +   improved by: marrtins
    // +   bugfixed by: Onno Marsman
    // +   improved by: rezna
    // +   input by: Rick Waldron
    // +   reimplemented by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: stripslashes('Kevin\'s code');
    // *     returns 1: "Kevin's code"
    // *     example 2: stripslashes('Kevin\\\'s code');
    // *     returns 2: "Kevin\'s code"
    return (str+'').replace(/\\(.?)/g, function (s, n1) {
        switch (n1) {
            case '\\':
                return '\\';
            case '0':
                return '\0';
            case '':
                return '';
            default:
                return n1;
        }
    });
}

function strrev (string) {
    // Reverse a string  
    // 
    // version: 909.322
    // discuss at: http://phpjs.org/functions/strrev
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   bugfixed by: Onno Marsman
    // *     example 1: strrev('Kevin van Zonneveld');
    // *     returns 1: 'dlevennoZ nav niveK'
    var ret = '', i = 0;

    string += '';
    for ( i = string.length-1; i >= 0; i-- ){
       ret += string.charAt(i);
    }

    return ret;
}

function strtoupper (str) {
    // Makes a string uppercase  
    // 
    // version: 909.322
    // discuss at: http://phpjs.org/functions/strtoupper
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Onno Marsman
    // *     example 1: strtoupper('Kevin van Zonneveld');
    // *     returns 1: 'KEVIN VAN ZONNEVELD'
    return (str+'').toUpperCase();
}

function str_replace (search, replace, subject, count) {
    // Replaces all occurrences of search in haystack with replace  
    // 
    // version: 909.322
    // discuss at: http://phpjs.org/functions/str_replace
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Gabriel Paderni
    // +   improved by: Philip Peterson
    // +   improved by: Simon Willison (http://simonwillison.net)
    // +    revised by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
    // +   bugfixed by: Anton Ongson
    // +      input by: Onno Marsman
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +    tweaked by: Onno Marsman
    // +      input by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   input by: Oleg Eremeev
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: Oleg Eremeev
    // %          note 1: The count parameter must be passed as a string in order
    // %          note 1:  to find a global variable in which the result will be given
    // *     example 1: str_replace(' ', '.', 'Kevin van Zonneveld');
    // *     returns 1: 'Kevin.van.Zonneveld'
    // *     example 2: str_replace(['{name}', 'l'], ['hello', 'm'], '{name}, lars');
    // *     returns 2: 'hemmo, mars'
    var i = 0, j = 0, temp = '', repl = '', sl = 0, fl = 0,
            f = [].concat(search),
            r = [].concat(replace),
            s = subject,
            ra = r instanceof Array, sa = s instanceof Array;
    s = [].concat(s);
    if (count) {
        this.window[count] = 0;
    }

    for (i=0, sl=s.length; i < sl; i++) {
        if (s[i] === '') {
            continue;
        }
        for (j=0, fl=f.length; j < fl; j++) {
            temp = s[i]+'';
            repl = ra ? (r[j] !== undefined ? r[j] : '') : r[0];
            s[i] = (temp).split(f[j]).join(repl);
            if (count && s[i] !== temp) {
                this.window[count] += (temp.length-s[i].length)/f[j].length;}
        }
    }
    return sa ? s : s[0];
}

function wordwrap (str, int_width, str_break, cut) {
    // Wraps buffer to selected number of characters using string break char  
    // 
    // version: 909.322
    // discuss at: http://phpjs.org/functions/wordwrap
    // +   original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
    // +   improved by: Nick Callen
    // +    revised by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Sakimori
    // +   bugfixed by: Michael Grier
    // *     example 1: wordwrap('Kevin van Zonneveld', 6, '|', true);
    // *     returns 1: 'Kevin |van |Zonnev|eld'
    // *     example 2: wordwrap('The quick brown fox jumped over the lazy dog.', 20, '<br />\n');
    // *     returns 2: 'The quick brown fox <br />\njumped over the lazy<br />\n dog.'
    // *     example 3: wordwrap('Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.');
    // *     returns 3: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod \ntempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim \nveniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea \ncommodo consequat.'
    // PHP Defaults
    var m = ((arguments.length >= 2) ? arguments[1] : 75   );
    var b = ((arguments.length >= 3) ? arguments[2] : "\n" );
    var c = ((arguments.length >= 4) ? arguments[3] : false);

    var i, j, l, s, r;

    str += '';

    if (m < 1) {
        return str;
    }

    for (i = -1, l = (r = str.split(/\r\n|\n|\r/)).length; ++i < l; r[i] += s) {
        for (s = r[i], r[i] = ""; s.length > m; r[i] += s.slice(0, j) + ((s = s.slice(j)).length ? b : "")){
            j = c == 2 || (j = s.slice(0, m + 1).match(/\S*(\s)?$/))[1] ? m : j.input.length - j[0].length || c == 1 && m || j.input.length + (j = s.slice(m).match(/^\S*/)).input.length;
        }
    }
    
    return r.join("\n");
}
