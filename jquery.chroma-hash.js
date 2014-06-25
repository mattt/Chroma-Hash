/*
 * Chroma-Hash : A sexy, secure visualization of password field input
 * http://github.com/mattt/Chroma-Hash/
 *
 * Copyright (c) 2009-2014 Mattt Thompson (http://mattt.me)
 * Released under the MIT license.
 *
 * Inspired by HashMask by Chris Dary
 * http://lab.arc90.com/2009/07/09/hashmask-another-more-secure-experiment-in-password-masking/
 */
(function ($) {
    "use strict";

    var transition = (function () {
        var body = document.body || document.documentElement,
            style = body.style;

        if (typeof style["transition"] === "string") {
            return true;
        }

        var prefixes = ["moz", "webkit", "khtml", "o", "ms"];
        for (var p in prefixes) {
            if (typeof style[prefixes[p] + "Transition"] === "string") {
                return true;
            }
        }

        return false;
    })() ? "css" : "animate";

    $.fn.extend({
        chromaHash: function (options) {
            var defaults = {
                bars: 3,
                salt: "7be82b35cb0199120eea35a4507c9acf",
                minimum: 6
            };
            options = $.extend(defaults, options);

            var incrementingID = 0;

            /*
             * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
             * Digest Algorithm, as defined in RFC 1321.
             * Version 2.2 Copyright (c) Paul Johnston 1999 - 2009
             * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
             * Distributed under the BSD License
             */
            var hexdigest = function (e){function g(e,a,b,c,d,f,n){return h(k(h(h(e,a&b|~a&c),h(d,n)),f),a)}function l(e,a,b,c,d,f,n){return h(k(h(h(e,a&c|b&~c),h(d,n)),f),a)}function m(e,a,b,c,d,f,n){return h(k(h(h(e,a^b^c),h(d,n)),f),a)}function p(e,a,b,c,d,f,n){return h(k(h(h(e,b^(a|~c)),h(d,n)),f),a)}function h(e,a){var b=(e&65535)+(a&65535);return(e>>16)+(a>>16)+(b>>16)<<16|b&65535}function k(e,a){return e<<a|e>>>32-a};for(var a="",b=-1,c,d;++b<e.length;)c=e.charCodeAt(b),d=b+1<e.length?e.charCodeAt(b+1):0,55296<=c&&56319>=c&&56320<=d&&57343>=d&&(c=65536+((c&1023)<<10)+(d&1023),b++),127>=c?a+=String.fromCharCode(c):2047>=c?a+=String.fromCharCode(192|c>>>6&31,128|c&63):65535>=c?a+=String.fromCharCode(224|c>>>12&15,128|c>>>6&63,128|c&63):2097151>=c&&(a+=String.fromCharCode(240|c>>>18&7,128|c>>>12&63,128|c>>>6&63,128|c&63));e=Array(a.length>>2);for(b=0;b<e.length;b++)e[b]=0;for(b=0;b<8*a.length;b+=8)e[b>>5]|=(a.charCodeAt(b/8)&255)<<b%32;a=8*a.length;e[a>>5]|=128<<a%32;e[(a+64>>>9<<4)+14]=a;a=1732584193;b=-271733879;c=-1732584194;d=271733878;for(var f=0;f<e.length;f+=16){var n=a,q=b,r=c,s=d,a=g(a,b,c,d,e[f+0],7,-680876936);d=g(d,a,b,c,e[f+1],12,-389564586);c=g(c,d,a,b,e[f+2],17,606105819);b=g(b,c,d,a,e[f+3],22,-1044525330);a=g(a,b,c,d,e[f+4],7,-176418897);d=g(d,a,b,c,e[f+5],12,1200080426);c=g(c,d,a,b,e[f+6],17,-1473231341);b=g(b,c,d,a,e[f+7],22,-45705983);a=g(a,b,c,d,e[f+8],7,1770035416);d=g(d,a,b,c,e[f+9],12,-1958414417);c=g(c,d,a,b,e[f+10],17,-42063);b=g(b,c,d,a,e[f+11],22,-1990404162);a=g(a,b,c,d,e[f+12],7,1804603682);d=g(d,a,b,c,e[f+13],12,-40341101);c=g(c,d,a,b,e[f+14],17,-1502002290);b=g(b,c,d,a,e[f+15],22,1236535329);a=l(a,b,c,d,e[f+1],5,-165796510);d=l(d,a,b,c,e[f+6],9,-1069501632);c=l(c,d,a,b,e[f+11],14,643717713);b=l(b,c,d,a,e[f+0],20,-373897302);a=l(a,b,c,d,e[f+5],5,-701558691);d=l(d,a,b,c,e[f+10],9,38016083);c=l(c,d,a,b,e[f+15],14,-660478335);b=l(b,c,d,a,e[f+4],20,-405537848);a=l(a,b,c,d,e[f+9],5,568446438);d=l(d,a,b,c,e[f+14],9,-1019803690);c=l(c,d,a,b,e[f+3],14,-187363961);b=l(b,c,d,a,e[f+8],20,1163531501);a=l(a,b,c,d,e[f+13],5,-1444681467);d=l(d,a,b,c,e[f+2],9,-51403784);c=l(c,d,a,b,e[f+7],14,1735328473);b=l(b,c,d,a,e[f+12],20,-1926607734);a=m(a,b,c,d,e[f+5],4,-378558);d=m(d,a,b,c,e[f+8],11,-2022574463);c=m(c,d,a,b,e[f+11],16,1839030562);b=m(b,c,d,a,e[f+14],23,-35309556);a=m(a,b,c,d,e[f+1],4,-1530992060);d=m(d,a,b,c,e[f+4],11,1272893353);c=m(c,d,a,b,e[f+7],16,-155497632);b=m(b,c,d,a,e[f+10],23,-1094730640);a=m(a,b,c,d,e[f+13],4,681279174);d=m(d,a,b,c,e[f+0],11,-358537222);c=m(c,d,a,b,e[f+3],16,-722521979);b=m(b,c,d,a,e[f+6],23,76029189);a=m(a,b,c,d,e[f+9],4,-640364487);d=m(d,a,b,c,e[f+12],11,-421815835);c=m(c,d,a,b,e[f+15],16,530742520);b=m(b,c,d,a,e[f+2],23,-995338651);a=p(a,b,c,d,e[f+0],6,-198630844);d=p(d,a,b,c,e[f+7],10,1126891415);c=p(c,d,a,b,e[f+14],15,-1416354905);b=p(b,c,d,a,e[f+5],21,-57434055);a=p(a,b,c,d,e[f+12],6,1700485571);d=p(d,a,b,c,e[f+3],10,-1894986606);c=p(c,d,a,b,e[f+10],15,-1051523);b=p(b,c,d,a,e[f+1],21,-2054922799);a=p(a,b,c,d,e[f+8],6,1873313359);d=p(d,a,b,c,e[f+15],10,-30611744);c=p(c,d,a,b,e[f+6],15,-1560198380);b=p(b,c,d,a,e[f+13],21,1309151649);a=p(a,b,c,d,e[f+4],6,-145523070);d=p(d,a,b,c,e[f+11],10,-1120210379);c=p(c,d,a,b,e[f+2],15,718787259);b=p(b,c,d,a,e[f+9],21,-343485551);a=h(a,n);b=h(b,q);c=h(c,r);d=h(d,s)}e=[a,b,c,d];a="";for(b=0;b<32*e.length;b+=8)a+=String.fromCharCode(e[b>>5]>>>b%32&255);e=a;a="0123456789ABCDEF";b="";for(d=0;d<e.length;d++)c=e.charCodeAt(d),b+=a.charAt(c>>>4&15)+a.charAt(c&15);return b};

            return this.each(function () {
                if (options.bars < 1 || options.bars > 4) {
                    console.error("Chroma-Hash expects a number parameter between 1 and 4, given " + options.bars);
                    return false;
                }

                var colors = ["primary", "secondary", "tertiary", "quaternary"].slice(0, options.bars);

                var chromaHashesForElement = function (e) {
                    var id = $(e).attr('id');
                    return $("label.chroma-hash").filter(function () {
                        return $(this).attr('for') === id;
                    });
                };

                var trigger = function () {
                    var $input = $(this);

                    if ($input.val() === "") {
                        chromaHashesForElement(this)[transition]({
                            "background": "",
                            "opacity": "0"
                        });

                        return;
                    }

                    var position = $input.position(),
                        height = $input.outerHeight(),
                        width = $input.outerWidth();

                    chromaHashesForElement(this).each(function (i) {
                        var properties = {
                            "position": "absolute",
                            "opacity": "1.0",
                            "left": position.left + width - 1,
                            "top": position.top,
                            "height": height - 2 + "px",
                            "width": "8px",
                            "margin": "0px",
                            "marginLeft": -8 * (++i) + "px",

                            "transition": "background 0.5s",
                            "-moz-transition": "background 0.5s",
                            "-webkit-transition": "background 0.5s",
                            "-khtml-transition": "background 0.5s",
                            "-o-transition": "background 0.5s",
                            "-ms-transition": "background 0.5s",
                        };

                        if (navigator.userAgent.indexOf("Safari") > -1) {
                            properties["marginTop"] = "3px";
                        } else {
                            properties["marginTop"] = "1px";
                        }

                        $(this).css(properties);
                    });

                    var id = $input.attr('id'),
                        digest = hexdigest('' + $input.val() + ':' + options.salt),
                        colors = digest.match(/([\dABCDEF]{6})/ig);

                    if ($input.val().length < options.minimum) {
                        chromaHashesForElement(this).each(function (i) {
                            var gray = (parseInt(colors[i], 16) % 0xF).toString(16);
                            var color = "#" + gray + gray + gray;
                            $(this).stop()[transition]("background", color);
                        });
                    } else {
                        chromaHashesForElement(this).each(function (i) {
                            var color = ("#" + colors[i] + "000000").slice(0, 7);
                            $(this).stop()[transition]("background", color);
                        });
                    }
                };

                $(this).each(function (e) {
                    var $input = $(this);

                    var id = $input.attr('id');
                    if (!id || id === "") {
                        id = "chroma-hash_" + incrementingID++;
                        $input.attr('id', id);
                    }

                    for (var c in colors) {
                        $input.after('<label for="' + id + '" class="' + colors[c] + ' chroma-hash"></label>');
                    }

                    $input.bind('keyup', trigger).bind('blur', trigger);
                });
            });
        }
    });
})(jQuery);
