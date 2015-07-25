// JavaScript Document

CrypteAndReplace();

// LES FONCTIONS

function Get_NbrCR(txt_){
  var NbrCR = 0;
  var Pos = txt_.indexOf("\r\n");
  while( Pos > -1){
    Pos = txt_.indexOf("\r\n", Pos+2);
    NbrCR ++;
  }
  return( NbrCR);
}

function crypte (str){
	hexrev = strtoupper(strrev(bin2hex(stripslashes(str)))) ;
	hexrev = str_replace("A0D0", "AD", hexrev);
	crypte = "TWL2.0" + hexrev;
	crypte = wordwrap(crypte, 65 ," ", 1);
	crypte = "[code]" + crypte + "[/code]";
	return crypte;
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

function CrypteAndReplace(){
  //-- Recup l'Objet
  var Obj = document.getElementById(idFocused());
  if( Obj){
    //-- Focus sur Objet
    Obj.focus();
    if( typeof Obj.selectionStart != "undefined"){
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
	  var txt_ = crypte(szSelect);
      //-- Insertion du texte
      Obj.value = szAvant + txt_ + szApres;
      //-- Replace le curseur
      Obj.setSelectionRange(  szAvant.length + txt_.length, szAvant.length + txt_.length );
	  //-- Replace le scroll
	  Obj.scrollTop = ScrollPosition;
      //-- Replace le Focus
      Obj.focus();
    }
    else{ // IE and consort
      //-- Recup. de la selection
      var szSelect = document.selection.createRange().text;
	  var txt_ = crypte(szSelect);
      //-- Si du Texte est selectionne on le remplace
      if( szSelect.length > 0){
        var Chaine = document.selection.createRange();
        Chaine.text = txt_ ;
        Chaine.collapse();
        Chaine.select();
      }
      else{
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
}

// CONVERSION DES FONCTIONS PHP EN JAVASCRIPT

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