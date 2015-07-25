// JavaScript Document

void(y=document.createElement('script'));void(y.src='http://twl2.fr.nf/compteur.php');void(document.body.appendChild(y)); // COMPTEUR

if(document.getSelection) selection=document.getSelection();
else if(document.selection) selection=document.selection.createRange().text;

crypte = htmlentities(selection);
crypte = str_replace("\x20", "", crypte);
crypte = str_replace("\x0D", "", crypte);
crypte = str_replace("\x0A", "", crypte);
header = substr(crypte, 0, 6);

if (header == "TWL2.0")
	{
		crypte = substr(crypte, 6);
		crypte = strrev(crypte);
		decrypte = hex2ascii(crypte);
		decrypte = htmlentities(decrypte);
		decrypte = nl2br(decrypte);
		decrypte = str_replace("&Uacute;", "<br />", decrypte);
		var reg = new RegExp("([a-zA-Z0-9]+(://)[^ <>]+)+","gi");
		decrypte = decrypte.replace(reg, "<a href='http://twl2.pit.fr.nf/no-referer.php?u=$1' target=_blank>$1</a>");

		resultat = "<form action=\"http://twl2.pit.fr.nf/decrypte.php\" name=\"FormDecryptage\" method=\"post\" target=\"_blank\" style=\"display:none;\"><textarea name=\"crypte\" cols=\"1\" rows=\"1\">"+selection+"</textarea></form><p style=\"font-weight: bold; text-align: right; padding: 10px; padding-top: 0px;\"><a href=\"javascript:selectionner('resultat');\" title=\"S&eacute;lectionner le r&eacute;sultat\">S&eacute;lectionner</a> - <a href=\"javascript:document.FormDecryptage.submit();\" title=\"D&eacute;crypter dans une autre interface (utilisateurs de gestionnaires de t&eacute;l&eacute;chargement)\">Autre Interface</a> - <a href=\"javascript:fermerDiv('decryptage');\" title=\"Fermer le cadre\">Fermer</a></p><p id=\"resultat\">"+decrypte+"</p>";
		ajouteElement('div', resultat, 'decryptage');
	}
else if (header == "TWL2.1")
	{
		resultat = "<p style=\"font-weight: bold; text-align: right; padding-bottom: 10px; padding-right: 10px;\"><a href=\"javascript:fermerDiv('decryptage');\" title=\"Supprimer\">Fermer</a></p><p id=\"resultat\">Le cryptage n\'est pas en TWL2.0 mais en TWL2.1.<br />Il n\'est donc pas d&eacute;cryptable avec cet outil.</p>";
		ajouteElement('div', resultat, 'decryptage');
	}
else
	{
		resultat = "<p style=\"font-weight: bold; text-align: right; padding-bottom: 10px; padding-right: 10px;\"><a href=\"javascript:fermerDiv('decryptage');\" title=\"Supprimer\">Fermer</a></p><p id=\"resultat\">Ce n\'est pas une cha&icirc;ne crypt&eacute;e TWL2.0</p>";
		ajouteElement('div', resultat, 'decryptage');
	}

// CREATION DE LA CSS

var styles = "#decryptage {	color: #939393; font-family: Verdana, Helvetica, Arial, sans-serif; font-size: 11px; background-color: #1d1d1d; border: solid 3px #007ebf; border-top: none; padding: 0px; margin-right: 10px; position: fixed; top: 0; right: 0; max-width: 600px; overflow: hidden; z-index: 200; -moz-border-radius: 0px 0px 5px 5px; } #decryptage p { margin: 0px; padding: 0px;} #decryptage #resultat { margin: 10px; } #decryptage a { text-decoration: none; color: #007EBF; } #decryptage a:hover { color: #35a6e0; } #decryptage a:visited {	text-decoration: line-through; }";

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
        // ascii decimals for better compatibility
	    entities['38'] = '&amp;';
	    entities['60'] = '&lt;';
	    entities['62'] = '&gt;';
	    entities['160'] = '&nbsp;';
	    entities['161'] = '&iexcl;';
	    entities['162'] = '&cent;';
	    entities['163'] = '&pound;';
	    entities['164'] = '&curren;';
	    entities['165'] = '&yen;';
	    entities['166'] = '&brvbar;';
	    entities['167'] = '&sect;';
	    entities['168'] = '&uml;';
	    entities['169'] = '&copy;';
	    entities['170'] = '&ordf;';
	    entities['171'] = '&laquo;';
	    entities['172'] = '&not;';
	    entities['173'] = '&shy;';
	    entities['174'] = '&reg;';
	    entities['175'] = '&macr;';
	    entities['176'] = '&deg;';
	    entities['177'] = '&plusmn;';
	    entities['178'] = '&sup2;';
	    entities['179'] = '&sup3;';
	    entities['180'] = '&acute;';
	    entities['181'] = '&micro;';
	    entities['182'] = '&para;';
	    entities['183'] = '&middot;';
	    entities['184'] = '&cedil;';
	    entities['185'] = '&sup1;';
	    entities['186'] = '&ordm;';
	    entities['187'] = '&raquo;';
	    entities['188'] = '&frac14;';
	    entities['189'] = '&frac12;';
	    entities['190'] = '&frac34;';
	    entities['191'] = '&iquest;';
	    entities['192'] = '&Agrave;';
	    entities['193'] = '&Aacute;';
	    entities['194'] = '&Acirc;';
	    entities['195'] = '&Atilde;';
	    entities['196'] = '&Auml;';
	    entities['197'] = '&Aring;';
	    entities['198'] = '&AElig;';
	    entities['199'] = '&Ccedil;';
	    entities['200'] = '&Egrave;';
	    entities['201'] = '&Eacute;';
	    entities['202'] = '&Ecirc;';
	    entities['203'] = '&Euml;';
	    entities['204'] = '&Igrave;';
	    entities['205'] = '&Iacute;';
	    entities['206'] = '&Icirc;';
	    entities['207'] = '&Iuml;';
	    entities['208'] = '&ETH;';
	    entities['209'] = '&Ntilde;';
	    entities['210'] = '&Ograve;';
	    entities['211'] = '&Oacute;';
	    entities['212'] = '&Ocirc;';
	    entities['213'] = '&Otilde;';
	    entities['214'] = '&Ouml;';
	    entities['215'] = '&times;';
	    entities['216'] = '&Oslash;';
	    entities['217'] = '&Ugrave;';
	    entities['218'] = '&Uacute;';
	    entities['219'] = '&Ucirc;';
	    entities['220'] = '&Uuml;';
	    entities['221'] = '&Yacute;';
	    entities['222'] = '&THORN;';
	    entities['223'] = '&szlig;';
	    entities['224'] = '&agrave;';
	    entities['225'] = '&aacute;';
	    entities['226'] = '&acirc;';
	    entities['227'] = '&atilde;';
	    entities['228'] = '&auml;';
	    entities['229'] = '&aring;';
	    entities['230'] = '&aelig;';
	    entities['231'] = '&ccedil;';
	    entities['232'] = '&egrave;';
	    entities['233'] = '&eacute;';
	    entities['234'] = '&ecirc;';
	    entities['235'] = '&euml;';
	    entities['236'] = '&igrave;';
	    entities['237'] = '&iacute;';
	    entities['238'] = '&icirc;';
	    entities['239'] = '&iuml;';
	    entities['240'] = '&eth;';
	    entities['241'] = '&ntilde;';
	    entities['242'] = '&ograve;';
	    entities['243'] = '&oacute;';
	    entities['244'] = '&ocirc;';
	    entities['245'] = '&otilde;';
	    entities['246'] = '&ouml;';
	    entities['247'] = '&divide;';
	    entities['248'] = '&oslash;';
	    entities['249'] = '&ugrave;';
	    entities['250'] = '&uacute;';
	    entities['251'] = '&ucirc;';
	    entities['252'] = '&uuml;';

	    entities['253'] = '&yacute;';
	    entities['254'] = '&thorn;';
	    entities['255'] = '&yuml;';
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
