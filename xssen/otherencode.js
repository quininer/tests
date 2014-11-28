function encode(){ 
  if(document.XSS.ascii.value != ''){ 
    var vText = document.XSS.ascii.value; 
    document.XSS.hex.value = convertToHex(vText); 
    document.XSS.hex2.value = convertToHex2(vText); 
    document.XSS.hex3.value = convertToHex3(vText);
    document.XSS.hex4.value = convertToHex4(vText);
    document.XSS.hex5.value = convertToHex5(vText);
     document.XSS.hex6.value=convertToHex6();
         document.XSS.hexlast.value=convertToHexlast(vText);
var vEncoded2 = convertToUnicode2(vText);
    document.XSS.stringfromcharcode.value = vEncoded2;
    document.XSS.hexhtml.value = convertToHexHTML(vText); 
    var vEncoded = convertToUnicode(vText); 
    document.XSS.unicode.value = vEncoded; 
    document.XSS.ascii.focus();
    document.XSS.ascii.blur();
    document.XSS.ascii.select();
    document.XSS.base64.value=encodeBase64(document.XSS.ascii.value);
  } 
} 

function convertToUnicode(source) { 
  result = ''; 
  for (i=0; i<source.length; i++) {
    result += '&#' + source.charCodeAt(i); 
  }
  return result; 
} 
function convertToUnicode2(source) { 
  result2 = ''; 
  for (i=0; i<source.length; i++) {
    result2 += ',' + source.charCodeAt(i);
        var ghghgh='';
       ghghgh=result2.replace(/\u002C/,"")   
  }
  return "String.fromCharCode("+ ghghgh+")"; 
} 

function convertToHex(num) { 
  var hex = ''; 
  for (i=0;i<num.length;i++) {
    if (num.charCodeAt(i).toString(16).toUpperCase().length < 2) {
      hex += "%0" + num.charCodeAt(i).toString(16).toUpperCase(); 
    } else {
      hex += "\\u00" + num.charCodeAt(i).toString(16).toUpperCase();       
    }
  }
  return hex;
} 
function convertToHex2(num) { 
  var hex2 = ''; 
  for (i=0;i<num.length;i++) {
    if (num.charCodeAt(i).toString(16).toUpperCase().length < 2) {
      hex2 += "%0" + num.charCodeAt(i).toString(16).toUpperCase(); 
    } else {
      hex2 += "%" + num.charCodeAt(i).toString(16).toUpperCase();       
    }
  }
  return hex2;
} 
function convertToHex3(num) { 
  var hex3 = ''; 
  for (i=0;i<num.length;i++) {
    if (num.charCodeAt(i).toString(16).toUpperCase().length < 2) {
      hex3 += "%0" + num.charCodeAt(i).toString(16).toUpperCase(); 
    } else {
      hex3 += "\\x" + num.charCodeAt(i).toString(16).toUpperCase();       
    }
  }
  return hex3;
} 
function convertToHex4(num) { 
  var hex4 = ''; 
  for (i=0;i<num.length;i++) {
    if (num.charCodeAt(i).toString(16).toUpperCase().length < 2) {
      hex4 += "%0" + num.charCodeAt(i).toString(16).toUpperCase(); 
    } else {
      hex4 += "%" + num.charCodeAt(i).toString(16).toUpperCase();    
               var qwe='';
             qwe=hex4.replace(/%3C/g, "%D5%3C") 
                             qwe=qwe.replace(/%3E/g, "%D5%3E") 
qwe=qwe.replace(/%22/g, "%D5%22")
qwe=qwe.replace(/%27/g, "%D5%27") 
    }
  }
  return qwe;
} 
function convertToHex5(num) { 
  var hex5 = ''; 
  for (i=0;i<num.length;i++) {
    if (num.charCodeAt(i).toString(16).toUpperCase().length < 2) {
      hex5 += "%0" + num.charCodeAt(i).toString(16).toUpperCase(); 
    } else {
      hex5 += "%" + num.charCodeAt(i).toString(16).toUpperCase();    
               var qwer='';
             qwer=hex5.replace(/%09/g, "&Tab;") 
                             qwer=qwer.replace(/%0A/g, "&NewLine;") 
                             qwer=qwer.replace(/%21/g, "&excl;") 
                             qwer=qwer.replace(/%22/g, "&quot;") 
                             qwer=qwer.replace(/%23/g, "&num;") 
                             qwer=qwer.replace(/%24/g, "&dollar;") 
                             qwer=qwer.replace(/%25/g, "&percent;") 
                             qwer=qwer.replace(/%26/g, "&amp;") 
                             qwer=qwer.replace(/%27/g, "&apos;") 
                             qwer=qwer.replace(/%28/g, "&lpar;") 
                             qwer=qwer.replace(/%29/g, "&rpar;") 
                             qwer=qwer.replace(/%2A/g, "&ast;") 
                             qwer=qwer.replace(/%2B/g, "&plus;") 
                             qwer=qwer.replace(/%2C/g, "&comma;") 
                             qwer=qwer.replace(/%2E/g, "&period;") 
                             qwer=qwer.replace(/%2F/g, "&sol;") 
                             qwer=qwer.replace(/%3A/g, "&colon;") 
                             qwer=qwer.replace(/%3B/g, "&semi;") 
                             qwer=qwer.replace(/%3C/g, "&lt;") 
                             qwer=qwer.replace(/%3D/g, "&equals;") 
                             qwer=qwer.replace(/%3E/g, "&gt;") 
                             qwer=qwer.replace(/%3F/g, "&quest;") 
          qwer=qwer.replace(/%40/g, "&commat;") 
                             qwer=qwer.replace(/%5B/g, "&lsqb;") 
                             qwer=qwer.replace(/%5C/g, "&bsol;") 
                             qwer=qwer.replace(/%5D/g, "&rsqb;") 
                             qwer=qwer.replace(/%5E/g, "&Hat;") 
                             qwer=qwer.replace(/%5F/g, "&lowbar;") 
                             qwer=qwer.replace(/%60/g, "&grave;") 
                             qwer=qwer.replace(/%7B/g, "&lcub;") 
                             qwer=qwer.replace(/%7C/g, "&vert;") 
                             qwer=qwer.replace(/%7D/g, "&rcub;") 
                             qwer=qwer.replace(/%20/g, "&nbsp;") 

    }
  }
  return qwer;
} 
function convertToHex6()
  {
  var hjk=document.XSS.ascii.value;
    var tab='';
    var c='';
    var f='';
  tab=hjk.replace(/ /g, "	") 
c=hjk.replace(/ /g, "")
f=hjk.replace(/ /, "\/") 
  return tab+"<!---->"+c+"<!---->"+f;
} 
function convertToHexlast(num)
{
  var stringfromcharcode2 = ''; 
  for (i=0;i<num.length;i++) {
    if (num.charCodeAt(i).toString(8).toUpperCase().length < 2) {
      stringfromcharcode2 += "%0" + num.charCodeAt(i).toString(8).toUpperCase(); 
    } else {
      stringfromcharcode2 +="\\"+num.charCodeAt(i).toString(8).toUpperCase(); 
             var asdzxc='';
             asdzxc="eval('"+ stringfromcharcode2 +"')";      
    }
}
 return asdzxc;
} 
function convertToHexHTML(num) { 
  var hexhtml = ''; 
  for (i=0;i<num.length;i++) {
    if (num.charCodeAt(i).toString(16).toUpperCase().length < 2) {
      hexhtml += "&#x0" + num.charCodeAt(i).toString(16).toUpperCase() + ";"; 
    } else {
      hexhtml += "&#x" + num.charCodeAt(i).toString(16).toUpperCase() + ";"; 
    }
  }
  return hexhtml; 
} 
var base64Chars = new Array(
    'A','B','C','D','E','F','G','H',
    'I','J','K','L','M','N','O','P',
    'Q','R','S','T','U','V','W','X',
    'Y','Z','a','b','c','d','e','f',
    'g','h','i','j','k','l','m','n',
    'o','p','q','r','s','t','u','v',
    'w','x','y','z','0','1','2','3',
    '4','5','6','7','8','9','+','/'
);

var reverseBase64Chars = new Array();
for (var i=0; i < base64Chars.length; i++){
    reverseBase64Chars[base64Chars[i]] = i;
}

var base64Str;
var base64Count;
function setBase64Str(str){
    base64Str = str;
    base64Count = 0;
}
function readBase64(){    
    if (!base64Str) return -1;
    if (base64Count >= base64Str.length) return -1;
    var c = base64Str.charCodeAt(base64Count) & 0xff;
    base64Count++;
    return c;
}
function encodeBase64(str){
    setBase64Str(str);
    var result = '';
    var inBuffer = new Array(3);
    var lineCount = 0;
    var done = false;
    while (!done && (inBuffer[0] = readBase64()) != -1){
        inBuffer[1] = readBase64();
        inBuffer[2] = readBase64();
        result += (base64Chars[ inBuffer[0] >> 2 ]);
        if (inBuffer[1] != -1){
            result += (base64Chars [(( inBuffer[0] << 4 ) & 0x30) | (inBuffer[1] >> 4) ]);
            if (inBuffer[2] != -1){
                result += (base64Chars [((inBuffer[1] << 2) & 0x3c) | (inBuffer[2] >> 6) ]);
                result += (base64Chars [inBuffer[2] & 0x3F]);
            } else {
                result += (base64Chars [((inBuffer[1] << 2) & 0x3c)]);
                result += ('=');
                done = true;
            }
        } else {
            result += (base64Chars [(( inBuffer[0] << 4 ) & 0x30)]);
            result += ('=');
            result += ('=');
            done = true;
        }
        lineCount += 4;
        if (lineCount >= 76){
            result += ('\n');
            lineCount = 0;
        }
    }
    return result;
}



