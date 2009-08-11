/*
 * Chroma-Hash : A sexy, secure visualization of password field input
 * http://github.com/mattt/Chroma-Hash/
 *
 * Copyright (c) 2009 Mattt Thompson
 * Licensed under the MIT licenses.
 */

(function($){
  $.fn.extend({
    chromaHash: function(options) {

      var defaults = {
          bars: 3,
          salt: "7be82b35cb0199120eea35a4507c9acf",
          minimum: 6
      };

      var options = $.extend(defaults, options);

      return this.each(function() {

        var o     = options;
        var obj   = $(this);

        if(o.bars < 1 || o.bars > 4) {
          console.log("[Warning] Chroma-Hash expects a number parameter between 1 and 4, given " + o.bars);
        }

        var colors = ["primary", "secondary", "tertiary", "quaternary"].slice(0, o.bars);

        var chromaHashesForElement = function(e) {
          id = $(e).attr('id');
          return $("label.chroma-hash").filter(function(l) {
                      return $(this).attr('for') == id;
                  });
        };

        var trigger = function(e) {
          if($(this).val() == "" ){
            chromaHashesForElement(this).animate({backgroundColor: "#ffffff", opacity: 0});
            return;
          }

          position   = $(this).position();
          height     = $(this).outerHeight();
          width      = $(this).outerWidth();

          chromaHashesForElement(this).each(function(i) {
            properties = {
                          position:   'absolute',
                          opacity:     1.0,
                          left:       position.left + width - 1,
                          top:        position.top,
                          height:     height - 2 + "px",
                          width:      8 + "px",
                          margin:     0 + "px",
                          marginLeft: -8 * (++i) + "px"
                        }
            if($.browser.safari){
              properties.marginTop = 3 + "px";
            }
            else{
              properties.marginTop = 1 + "px";
            }
            $(this).css(properties);
          });

          var id     = $(this).attr('id');
          var md5    = hex_md5('' + $(this).val() + ':' + o.salt);
          var colors = md5.match(/([\dABCDEF]{6})/ig);
          $(".chroma-hash").stop();

          if($(this).val().length < o.minimum) {
            chromaHashesForElement(this).each(function(i) {
              var g = (parseInt(colors[i], 16) % 0xF).toString(16);
              $(this).animate({backgroundColor:"#" + g + g + g});
            });
          }
          else {
            chromaHashesForElement(this).each(function(i) {
              var color = parseInt(colors[i], 16);
              var red   = (color >> 16) & 255;
              var green = (color >> 8) & 255;
              var blue  = color & 255;
              var hex   = $.map([red, green, blue], function(c, i) {
                return ((c >> 4) * 0x10).toString(16);
              }).join('');

              $(this).animate({backgroundColor:"#" + hex});
            });
          }
        };

        obj.each(function(e) {
          for(c in colors) {
            $(this).after('<label for="' + $(this).attr('id') + '" class="' + colors[c] + ' chroma-hash"></label>');
          }
          chromaHashesForElement(this).css({backgroundColor: "#FFF", opacity: 0})

          $(this).bind('keyup', trigger).bind('blur', trigger);
        });


          /*
           * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
           * Digest Algorithm, as defined in RFC 1321.
           * Version 2.2 Copyright (C) Paul Johnston 1999 - 2009
           * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
           * Distributed under the BSD License
           * See http://pajhome.org.uk/crypt/md5 for more info.
          */
          var hexcase=0;var b64pad="";function hex_md5(A){return rstr2hex(rstr_md5(str2rstr_utf8(A)));}function b64_md5(A){return rstr2b64(rstr_md5(str2rstr_utf8(A)));}function any_md5(A,B){return rstr2any(rstr_md5(str2rstr_utf8(A)),B);}function hex_hmac_md5(A,B){return rstr2hex(rstr_hmac_md5(str2rstr_utf8(A),str2rstr_utf8(B)));}function b64_hmac_md5(A,B){return rstr2b64(rstr_hmac_md5(str2rstr_utf8(A),str2rstr_utf8(B)));}function any_hmac_md5(A,C,B){return rstr2any(rstr_hmac_md5(str2rstr_utf8(A),str2rstr_utf8(C)),B);}function rstr_md5(A){return binl2rstr(binl_md5(rstr2binl(A),A.length*8));}function rstr_hmac_md5(C,F){var E=rstr2binl(C);if(E.length>16){E=binl_md5(E,C.length*8);}var A=Array(16),D=Array(16);for(var B=0;B<16;B++){A[B]=E[B]^909522486;D[B]=E[B]^1549556828;}var G=binl_md5(A.concat(rstr2binl(F)),512+F.length*8);return binl2rstr(binl_md5(D.concat(G),512+128));}function rstr2hex(C){try{hexcase;}catch(F){hexcase=0;}var E=hexcase?"0123456789ABCDEF":"0123456789abcdef";var B="";var A;for(var D=0;D<C.length;D++){A=C.charCodeAt(D);B+=E.charAt((A>>>4)&15)+E.charAt(A&15);}return B;}function rstr2b64(C){try{b64pad;}catch(G){b64pad="";}var F="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";var B="";var A=C.length;for(var E=0;E<A;E+=3){var H=(C.charCodeAt(E)<<16)|(E+1<A?C.charCodeAt(E+1)<<8:0)|(E+2<A?C.charCodeAt(E+2):0);for(var D=0;D<4;D++){if(E*8+D*6>C.length*8){B+=b64pad;}else{B+=F.charAt((H>>>6*(3-D))&63);}}}return B;}function rstr2any(K,C){var B=C.length;var J,F,A,L,E;var I=Array(Math.ceil(K.length/2));for(J=0;J<I.length;J++){I[J]=(K.charCodeAt(J*2)<<8)|K.charCodeAt(J*2+1);}var H=Math.ceil(K.length*8/(Math.log(C.length)/Math.log(2)));var G=Array(H);for(F=0;F<H;F++){E=Array();L=0;for(J=0;J<I.length;J++){L=(L<<16)+I[J];A=Math.floor(L/B);L-=A*B;if(E.length>0||A>0){E[E.length]=A;}}G[F]=L;I=E;}var D="";for(J=G.length-1;J>=0;J--){D+=C.charAt(G[J]);}return D;}function str2rstr_utf8(C){var B="";var D=-1;var A,E;while(++D<C.length){A=C.charCodeAt(D);E=D+1<C.length?C.charCodeAt(D+1):0;if(55296<=A&&A<=56319&&56320<=E&&E<=57343){A=65536+((A&1023)<<10)+(E&1023);D++;}if(A<=127){B+=String.fromCharCode(A);}else{if(A<=2047){B+=String.fromCharCode(192|((A>>>6)&31),128|(A&63));}else{if(A<=65535){B+=String.fromCharCode(224|((A>>>12)&15),128|((A>>>6)&63),128|(A&63));}else{if(A<=2097151){B+=String.fromCharCode(240|((A>>>18)&7),128|((A>>>12)&63),128|((A>>>6)&63),128|(A&63));}}}}}return B;}function str2rstr_utf16le(B){var A="";for(var C=0;C<B.length;C++){A+=String.fromCharCode(B.charCodeAt(C)&255,(B.charCodeAt(C)>>>8)&255);}return A;}function str2rstr_utf16be(B){var A="";for(var C=0;C<B.length;C++){A+=String.fromCharCode((B.charCodeAt(C)>>>8)&255,B.charCodeAt(C)&255);}return A;}function rstr2binl(B){var A=Array(B.length>>2);for(var C=0;C<A.length;C++){A[C]=0;}for(var C=0;C<B.length*8;C+=8){A[C>>5]|=(B.charCodeAt(C/8)&255)<<(C%32);}return A;}function binl2rstr(B){var A="";for(var C=0;C<B.length*32;C+=8){A+=String.fromCharCode((B[C>>5]>>>(C%32))&255);}return A;}function binl_md5(K,F){K[F>>5]|=128<<((F)%32);K[(((F+64)>>>9)<<4)+14]=F;var J=1732584193;var I=-271733879;var H=-1732584194;var G=271733878;for(var C=0;C<K.length;C+=16){var E=J;var D=I;var B=H;var A=G;J=md5_ff(J,I,H,G,K[C+0],7,-680876936);G=md5_ff(G,J,I,H,K[C+1],12,-389564586);H=md5_ff(H,G,J,I,K[C+2],17,606105819);I=md5_ff(I,H,G,J,K[C+3],22,-1044525330);J=md5_ff(J,I,H,G,K[C+4],7,-176418897);G=md5_ff(G,J,I,H,K[C+5],12,1200080426);H=md5_ff(H,G,J,I,K[C+6],17,-1473231341);I=md5_ff(I,H,G,J,K[C+7],22,-45705983);J=md5_ff(J,I,H,G,K[C+8],7,1770035416);G=md5_ff(G,J,I,H,K[C+9],12,-1958414417);H=md5_ff(H,G,J,I,K[C+10],17,-42063);I=md5_ff(I,H,G,J,K[C+11],22,-1990404162);J=md5_ff(J,I,H,G,K[C+12],7,1804603682);G=md5_ff(G,J,I,H,K[C+13],12,-40341101);H=md5_ff(H,G,J,I,K[C+14],17,-1502002290);I=md5_ff(I,H,G,J,K[C+15],22,1236535329);J=md5_gg(J,I,H,G,K[C+1],5,-165796510);G=md5_gg(G,J,I,H,K[C+6],9,-1069501632);H=md5_gg(H,G,J,I,K[C+11],14,643717713);I=md5_gg(I,H,G,J,K[C+0],20,-373897302);J=md5_gg(J,I,H,G,K[C+5],5,-701558691);G=md5_gg(G,J,I,H,K[C+10],9,38016083);H=md5_gg(H,G,J,I,K[C+15],14,-660478335);I=md5_gg(I,H,G,J,K[C+4],20,-405537848);J=md5_gg(J,I,H,G,K[C+9],5,568446438);G=md5_gg(G,J,I,H,K[C+14],9,-1019803690);H=md5_gg(H,G,J,I,K[C+3],14,-187363961);I=md5_gg(I,H,G,J,K[C+8],20,1163531501);J=md5_gg(J,I,H,G,K[C+13],5,-1444681467);G=md5_gg(G,J,I,H,K[C+2],9,-51403784);H=md5_gg(H,G,J,I,K[C+7],14,1735328473);I=md5_gg(I,H,G,J,K[C+12],20,-1926607734);J=md5_hh(J,I,H,G,K[C+5],4,-378558);G=md5_hh(G,J,I,H,K[C+8],11,-2022574463);H=md5_hh(H,G,J,I,K[C+11],16,1839030562);I=md5_hh(I,H,G,J,K[C+14],23,-35309556);J=md5_hh(J,I,H,G,K[C+1],4,-1530992060);G=md5_hh(G,J,I,H,K[C+4],11,1272893353);H=md5_hh(H,G,J,I,K[C+7],16,-155497632);I=md5_hh(I,H,G,J,K[C+10],23,-1094730640);J=md5_hh(J,I,H,G,K[C+13],4,681279174);G=md5_hh(G,J,I,H,K[C+0],11,-358537222);H=md5_hh(H,G,J,I,K[C+3],16,-722521979);I=md5_hh(I,H,G,J,K[C+6],23,76029189);J=md5_hh(J,I,H,G,K[C+9],4,-640364487);G=md5_hh(G,J,I,H,K[C+12],11,-421815835);H=md5_hh(H,G,J,I,K[C+15],16,530742520);I=md5_hh(I,H,G,J,K[C+2],23,-995338651);J=md5_ii(J,I,H,G,K[C+0],6,-198630844);G=md5_ii(G,J,I,H,K[C+7],10,1126891415);H=md5_ii(H,G,J,I,K[C+14],15,-1416354905);I=md5_ii(I,H,G,J,K[C+5],21,-57434055);J=md5_ii(J,I,H,G,K[C+12],6,1700485571);G=md5_ii(G,J,I,H,K[C+3],10,-1894986606);H=md5_ii(H,G,J,I,K[C+10],15,-1051523);I=md5_ii(I,H,G,J,K[C+1],21,-2054922799);J=md5_ii(J,I,H,G,K[C+8],6,1873313359);G=md5_ii(G,J,I,H,K[C+15],10,-30611744);H=md5_ii(H,G,J,I,K[C+6],15,-1560198380);I=md5_ii(I,H,G,J,K[C+13],21,1309151649);J=md5_ii(J,I,H,G,K[C+4],6,-145523070);G=md5_ii(G,J,I,H,K[C+11],10,-1120210379);H=md5_ii(H,G,J,I,K[C+2],15,718787259);I=md5_ii(I,H,G,J,K[C+9],21,-343485551);J=safe_add(J,E);I=safe_add(I,D);H=safe_add(H,B);G=safe_add(G,A);}return Array(J,I,H,G);}function md5_cmn(F,C,B,A,E,D){return safe_add(bit_rol(safe_add(safe_add(C,F),safe_add(A,D)),E),B);}function md5_ff(C,B,G,F,A,E,D){return md5_cmn((B&G)|((~B)&F),C,B,A,E,D);}function md5_gg(C,B,G,F,A,E,D){return md5_cmn((B&F)|(G&(~F)),C,B,A,E,D);}function md5_hh(C,B,G,F,A,E,D){return md5_cmn(B^G^F,C,B,A,E,D);}function md5_ii(C,B,G,F,A,E,D){return md5_cmn(G^(B|(~F)),C,B,A,E,D);}function safe_add(A,D){var C=(A&65535)+(D&65535);var B=(A>>16)+(D>>16)+(C>>16);return(B<<16)|(C&65535);}function bit_rol(A,B){return(A<<B)|(A>>>(32-B));}
        });
      }
    });
})(jQuery);

/*
 * jQuery Color Animations
 * Copyright 2007 John Resig
 * Released under the MIT and GPL licenses.
 */
(function(D){D.each(["backgroundColor","borderBottomColor","borderLeftColor","borderRightColor","borderTopColor","color","outlineColor"],function(F,E){D.fx.step[E]=function(G){if(G.state==0){G.start=C(G.elem,E);G.end=B(G.end);}G.elem.style[E]="rgb("+[Math.max(Math.min(parseInt((G.pos*(G.end[0]-G.start[0]))+G.start[0]),255),0),Math.max(Math.min(parseInt((G.pos*(G.end[1]-G.start[1]))+G.start[1]),255),0),Math.max(Math.min(parseInt((G.pos*(G.end[2]-G.start[2]))+G.start[2]),255),0)].join(",")+")";};});function B(F){var E;if(F&&F.constructor==Array&&F.length==3){return F;}if(E=/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(F)){return[parseInt(E[1]),parseInt(E[2]),parseInt(E[3])];}if(E=/rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(F)){return[parseFloat(E[1])*2.55,parseFloat(E[2])*2.55,parseFloat(E[3])*2.55];}if(E=/#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(F)){return[parseInt(E[1],16),parseInt(E[2],16),parseInt(E[3],16)];}if(E=/#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(F)){return[parseInt(E[1]+E[1],16),parseInt(E[2]+E[2],16),parseInt(E[3]+E[3],16)];}return A[D.trim(F).toLowerCase()];}function C(G,E){var F;do{F=D.curCSS(G,E);if(F!=""&&F!="transparent"||D.nodeName(G,"body")){break;}E="backgroundColor";}while(G=G.parentNode);return B(F);}var A={aqua:[0,255,255],azure:[240,255,255],beige:[245,245,220],black:[0,0,0],blue:[0,0,255],brown:[165,42,42],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgrey:[169,169,169],darkgreen:[0,100,0],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkviolet:[148,0,211],fuchsia:[255,0,255],gold:[255,215,0],green:[0,128,0],indigo:[75,0,130],khaki:[240,230,140],lightblue:[173,216,230],lightcyan:[224,255,255],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightyellow:[255,255,224],lime:[0,255,0],magenta:[255,0,255],maroon:[128,0,0],navy:[0,0,128],olive:[128,128,0],orange:[255,165,0],pink:[255,192,203],purple:[128,0,128],violet:[128,0,128],red:[255,0,0],silver:[192,192,192],white:[255,255,255],yellow:[255,255,0]};})(jQuery);