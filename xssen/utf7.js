
/* Copyright (C) 2010 紫云飞

* Interfaces:

* data = UTF7.encode(src);

* data = UTF7.decode(src);

*/


var UTF7 = {

        base64Str: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",

        directStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'(),-./:?",

        optionalStr: "!\"#$%&*;<=>@[]^_`{|}",

        encode: function(str) {

                var l = str.length;

                var output = "";

                var chr1, chr2, chr3, chr4, enc1, enc2, enc3, input, direct, p;

                for (var j = 0; j < l; j++) {

                        if (this.directStr.indexOf(str[j]) != -1 || /\s/.test(str[j]) == true) {

                                output = output + str[j];

                                direct = true;

                                continue;

                        }

                        if (direct != false) output = output + "+";

                        else output = output.slice(0, -1);

                        if (str[j] == "*") input = "002a"

                        else if (str[j] == "+") input = "002b"

                        else if (str[j] == "@") input = "0040"

                        else if (str[j] == "_") input = "005f"

                        else input = escape(str[j]).replace(/%u/gi, "").replace(/%/gi, "");

                        var num = 4 - input.length;

                        if (num > 0) {

                                input = String(Number("1.0e" + num)).slice(1) + input;

                        }

                        if (direct != false || p == 3) {

                                chr1 = parseInt(input[0], 16);

                                chr2 = parseInt(input[1], 16);

                                chr3 = parseInt(input[2], 16);

                                chr4 = parseInt(input[3], 16);

                                enc1 = (chr1 << 2) | (chr2 >> 2);

                                enc2 = (((chr2 & 3) << 4) | chr3);

                                if (this.directStr.indexOf(str[j + 1]) != -1 || /\s/.test(str[j + 1]) == true || (j + 1) == l) {

                                        enc3 = chr4 << 2;

                                }

                                else {

                                        if (str[j + 1] == "*") input = "002a"

                                        else if (str[j + 1] == "+") input = "002b"

                                        else if (str[j + 1] == "@") input = "0040"

                                        else if (str[j + 1] == "_") input = "005f"

                                        else input = escape(str[j + 1]).replace(/%u/gi, "").replace(/%/gi, "");

                                        var num = 4 - input.length;

                                        if (num > 0) {

                                                input = String(Number("1.0e" + num)).slice(1) + input;

                                        }

                                        chr1 = parseInt(input[0], 16)

                                        enc3 = chr4 << 2 | chr1 >> 2

                                }

                                output = output + this.base64Str.charAt(enc1) + this.base64Str.charAt(enc2) + this.base64Str.charAt(enc3) + "-";

                                p = 1;

                        }

                        else {

                                if (p == 1) {

                                        chr1 = parseInt(input[0], 16);

                                        chr2 = parseInt(input[1], 16);

                                        chr3 = parseInt(input[2], 16);

                                        chr4 = parseInt(input[3], 16);

                                        enc1 = (chr1 & 3) << 4 | chr2;

                                        enc2 = chr3 << 2 | chr4 >> 2;

                                        if (this.directStr.indexOf(str[j + 1]) != -1 || /\s/.test(str[j + 1]) == true || (j + 1) == l) {

                                                enc3 = (chr4 & 3) << 4;

                                        }

                                        else {

                                                if (str[j + 1] == "*") input = "002a"

                                                else if (str[j + 1] == "+") input = "002b"

                                                else if (str[j + 1] == "@") input = "0040"

                                                else if (str[j + 1] == "_") input = "005f"

                                                else input = escape(str[j + 1]).replace(/%u/gi, "").replace(/%/gi, "");

                                                var num = 4 - input.length;

                                                if (num > 0) {

                                                        input = String(Number("1.0e" + num)).slice(1) + input;

                                                }

                                                chr1 = parseInt(input[0], 16)

                                                enc3 = (chr4 & 3) << 4 | chr1;

                                        }

                                        output = output + this.base64Str.charAt(enc1) + this.base64Str.charAt(enc2) + this.base64Str.charAt(enc3) + "-";

                                        p = 2;

                                }

                                else if (p == 2) {

                                        chr2 = parseInt(input[1], 16);

                                        chr3 = parseInt(input[2], 16);

                                        chr4 = parseInt(input[3], 16);

                                        enc1 = (chr2 << 2) | (chr3 >> 2);

                                        enc2 = (chr3 & 3) << 4 | chr4;

                                        output = output + this.base64Str.charAt(enc1) + this.base64Str.charAt(enc2) + "-";

                                        p = 3;

                                }

                        }

                        direct = false;

                }

                return output;

        },

        decode: function(str) {

                var output = "";

                for (; str.length > 0;) {

                        if (str[0] != "+") {

                                output = output + str[0];

                                str = str.slice(1)

                                continue;

                        };

                        var end = str.indexOf("-");

                        if (end == -1) {

                                output = output + this._decode(str.slice(1));

                                return output;

                        }

                        output = output + this._decode(str.slice(1, end));

                        str = str.slice(end + 1)

                }

                return output;

        },

        _decode: function(str) {

                var chr1, chr2, chr3, enc1, enc2, enc3, enc4, enc5, input;

                var hex = "";

                var output = "";

                for (i = 0; str.length > 0; i++) {

                        if (i == 0) {

                                input = str.slice(0, 3)

                                str = str.slice(3)

                                chr1 = this.base64Str.indexOf(input[0]);

                                chr2 = this.base64Str.indexOf(input[1]);

                                var lastchr = chr3 = this.base64Str.indexOf(input[2]);

                                enc1 = chr1 >> 2;

                                enc2 = ((chr1 & 3) << 2) | (chr2 >> 4);

                                enc3 = chr2 & 15;

                                enc4 = chr3 >> 2;

                                hex = hex + Number(enc1).toString(16) + Number(enc2).toString(16) + Number(enc3).toString(16) + Number(enc4).toString(16);

                                hex = hex.replace(/-1/g, "");

                        }

                        if (i == 1) {

                                input = str.slice(0, 3)

                                str = str.slice(3)

                                chr1 = this.base64Str.indexOf(input[0]);

                                chr2 = this.base64Str.indexOf(input[1]);

                                chr3 = this.base64Str.indexOf(input[2]);

                                enc1 = (lastchr & 3) << 2 | chr1 >> 4;

                                enc2 = chr1 & 15;

                                enc3 = chr2 >> 2;

                                enc4 = (chr2 & 3) << 2 | chr3 >> 4;

                                enc5 = chr3 & 15;

                                hex = hex + Number(enc1).toString(16) + Number(enc2).toString(16) + Number(enc3).toString(16) + Number(enc4).toString(16) + Number(enc5).toString(16);

                                hex = hex.replace(/-1/g, "");

                                i = -1;

                        }

                }

                for (;;) {

                        temp = hex.slice(0, 4);

                        hex = hex.slice(4);

                        if (temp.length < 4) break;

                        output = output + unescape("%u" + temp)

                }

                return output;

        }

}

function decodes(str){

var code = document.getElementById(str).value;

a=UTF7.decode(code);

return document.getElementById(str).value;

}
