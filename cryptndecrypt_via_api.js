// JavaScript Document

// ################
// # AJAX SNIPPET #
// ################

var ajax = {};
ajax.x = function() {
    if (typeof XMLHttpRequest !== 'undefined') {
        return new XMLHttpRequest();  
    }
    var versions = [
        "MSXML2.XmlHttp.6.0",
        "MSXML2.XmlHttp.5.0",   
        "MSXML2.XmlHttp.4.0",  
        "MSXML2.XmlHttp.3.0",   
        "MSXML2.XmlHttp.2.0",  
        "Microsoft.XmlHttp"
    ];

    var xhr;
    for(var i = 0; i < versions.length; i++) {  
        try {  
            xhr = new ActiveXObject(versions[i]);  
            break;  
        } catch (e) {
        }  
    }
    return xhr;
};

ajax.send = function(url, callback, method, data, sync) {
    var x = ajax.x();
    x.open(method, url, sync);
    x.onreadystatechange = function() {
        if (x.readyState == 4) {
            callback(JSON.parse(x.responseText));
        }
    };
    if (method == 'POST') {
        x.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    }
    x.send(data)
};

ajax.get = function(url, data, callback, sync) {
    var query = [];
    for (var key in data) {
        query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
    }
    ajax.send(url + (query.length ? '?' + query.join('&') : ''), callback, 'GET', null, sync)
};

ajax.post = function(url, data, callback, sync) {
    var query = [];
    for (var key in data) {
        query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
    }
    ajax.send(url, callback, 'POST', query.join('&'), sync)
};

// ######################
// # CORPS DU PROGRAMME #
// ######################

var tag = tagFocused();

if((tag == 'INPUT') || (tag == 'TEXTAREA')) { // On est dans une zone de texte
	selection = getSelectionFromInput();

	if (selection && selection.length > 0) {
		ajax.post('http://twl2.fr.nf/api.php', {'str': selection}, function (data) { ActionDansInput(data) }, true);
	}
	else {
		ActionDansInput();
	}

}
else { // On est pas dans une zone de texte

	var selection;

	if (window.getSelection) {  // Tous les navigateurs, sauf IE avant la version 9
		selection = window.getSelection().toString();
	}
	else if (document.selection) { // Internet Explorer
		selection = document.selection.createRange().text;
	}

	if (selection && selection.length > 0) { // Il y a une selection
		ajax.post('http://twl2.fr.nf/api.php', {'str': selection}, function (data) { ActionSelectionHorsInput(data) }, true);
	}
	else { // Il n'y a pas de sélection
		location.href='http://twl2.fr.nf/';
	}
}
	
// ###########################################################
// # DEBUT DES FONCTIONS COMMUNES OR BOUCLES CONDITIONNELLES #
// ###########################################################	

// FONCTIONS DE TRAITEMENT

function ActionSelectionHorsInput(data) {

	if (data.status == "success" && data.action == "decode") {
		resultat = "<form action=\"http://twl2.fr.nf/decrypte.php\" name=\"FormDecryptage\" method=\"post\" target=\"_blank\" style=\"display:none;\"><textarea name=\"crypte\" cols=\"1\" rows=\"1\">"+selection+"</textarea></form><p id=\"panneau_nav_bar\"><a href=\"javascript:selectionner('resultat');\" title=\"S&eacute;lectionner le r&eacute;sultat\">S&eacute;lectionner</a> - <a href=\"javascript:document.FormDecryptage.submit();\" title=\"D&eacute;crypter dans une autre interface (utilisateurs de gestionnaires de t&eacute;l&eacute;chargement)\">Autre Interface</a> - <a href=\"javascript:fermerDiv('panneau_bookmarklet_twl2');\" title=\"Fermer le cadre\">Fermer</a></p><p id=\"resultat\">"+data.message.html+"</p>";
		ajouteElement('div', resultat, 'panneau_bookmarklet_twl2');
	}
	else if (data.status == "success" && data.action == "code")	{
		resultat = "<form action=\"http://twl2.fr.nf/crypte.php\" name=\"FormCryptage\" method=\"post\" target=\"_blank\" style=\"display:none;\"><textarea name=\"clair\" cols=\"1\" rows=\"1\">"+selection+"</textarea></form><p id=\"panneau_nav_bar\"><a href=\"javascript:selectTextarea('panneau_textarea_result_crypte');\" title=\"S&eacute;lectionner le r&eacute;sultat\">S&eacute;lectionner</a> - <a href=\"javascript:document.FormCryptage.submit();\" title=\"Crypter dans une autre interface\">Autre Interface</a> - <a href=\"javascript:fermerDiv('panneau_bookmarklet_twl2');\" title=\"Fermer le cadre\">Fermer</a></p><p id=\"resultat\"><textarea id=\"panneau_textarea_result_crypte\" cols=\"1\" rows=\"1\">"+data.message+"</textarea></p>";
		ajouteElement('div', resultat, 'panneau_bookmarklet_twl2');		
	}
	else {		
		resultat = "<p id=\"panneau_nav_bar\"><a href=\"javascript:fermerDiv('panneau_bookmarklet_twl2');\" title=\"Supprimer\">Fermer</a></p><p id=\"resultat\">"+data.message+"</p>";
		ajouteElement('div', resultat, 'panneau_bookmarklet_twl2');
	}

} // Fin de function ActionSelectionHorsInput

function ActionDansInputTransformationSelection(szSelect, data) {

if(typeof data !== 'undefined') {
	
	if (data.status == "success" && data.action == "decode") {
		resultat = "<form action=\"http://twl2.fr.nf/decrypte.php\" name=\"FormDecryptage\" method=\"post\" target=\"_blank\" style=\"display:none;\"><textarea name=\"crypte\" cols=\"1\" rows=\"1\">"+szSelect+"</textarea></form><p id=\"panneau_nav_bar\"><a href=\"javascript:selectionner('resultat');\" title=\"S&eacute;lectionner le r&eacute;sultat\">S&eacute;lectionner</a> - <a href=\"javascript:document.FormDecryptage.submit();\" title=\"D&eacute;crypter dans une autre interface (utilisateurs de gestionnaires de t&eacute;l&eacute;chargement)\">Autre Interface</a> - <a href=\"javascript:fermerDiv('panneau_bookmarklet_twl2');\" title=\"Fermer le cadre\">Fermer</a></p><p id=\"resultat\">"+data.message.html+"</p>";
		ajouteElement('div', resultat, 'panneau_bookmarklet_twl2'); 
		
		return data.message.raw;
	}
	else if (data.status == "success" && data.action == "code")	{
		resultat = "<p id=\"panneau_nav_bar\"><a href=\"javascript:fermerDiv('panneau_bookmarklet_twl2');\" title=\"Fermer le cadre\">Fermer</a></p><p id=\"resultat\">Faites d&eacute;couvrir le site et son bookmarklet en rajoutant &agrave; votre message une userbarre ! <br />Il vous suffit de placer votre curseur &agrave; l'endroit o&ugrave; vous voulez l'ajouter - sans faire de s&eacute;lection - puis de cliquer sur le <acronym title=\"Favoris Intelligent\">bookmarklet</acronym> !<br />C'est tout, mais &ccedil;a aide beaucoup !<br />Merci<br />Zeraw</p>";
		ajouteElement('div', resultat, 'panneau_bookmarklet_twl2');
		
		return '[code]'+data.message+'[/code]';
	}
	else {		
		resultat = "<p id=\"panneau_nav_bar\"><a href=\"javascript:fermerDiv('panneau_bookmarklet_twl2');\" title=\"Supprimer\">Fermer</a></p><p id=\"resultat\">"+data.message+"</p>";
		ajouteElement('div', resultat, 'panneau_bookmarklet_twl2');

		return szSelect;
	}
} 
else { // Si la selection est de longueur nulle et que donc il n'ya pas eu de requête ajax
	if($('panneau_bookmarklet_twl2')) { // Si l'élément existe déjà
		fermerDiv('panneau_bookmarklet_twl2');
	}	
	return '[url=http://twl2.fr.nf/][img]http://twl2.fr.nf/ub/?ub=userbar_3.gif[/img][/url][url=http://twl2.fr.nf/divers.php][img]http://twl2.fr.nf/ub/?npc&ub=bouton_bookmarklet.gif[/img][/url][url=http://twl2.fr.nf/][img]http://twl2.fr.nf/ub/?npc&ub=bouton_site.gif[/img][/url][url=http://forum.thiweb.com/viewtopic.php?f=9&t=1242][img]http://twl2.fr.nf/ub/?npc&ub=bouton_tuto.gif[/img][/url]';
}

} // Fin de function ActionDansInputTransformationSelection

function getSelectionFromInput () {

	//-- Recup l'Objet
	var Obj = objFocused();
	var selection = null;
	if (Obj) {
		//-- Focus sur Objet
		Obj.focus();
		if( typeof Obj.selectionStart != "undefined") {
			//-- Position du curseur
			var PosDeb  = Obj.selectionStart;
			var PosFin  = Obj.selectionEnd;
			//-- Recup. des Chaines
			var Chaine  = Obj.value;
			//-- Recup. texte selectionne
			selection = Chaine.substring(PosDeb, PosFin);
		}
		else { // IE and consort
			//-- Recup. de la selection
			selection = document.selection.createRange().text;
		}
	}
	return selection;

}

function ActionDansInput(data) {
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
			var txt_ = ActionDansInputTransformationSelection(szSelect, data); 
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
			var txt_ = ActionDansInputTransformationSelection(szSelect, data); 
			
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

/*
function compteur() { // Compteur d'utilisation
	void(y=document.createElement('script'));
	void(y.src='http://twl2.fr.nf/compteur.php');
	void(document.body.appendChild(y)); 
}
*/

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
		return document.activeElement;
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
