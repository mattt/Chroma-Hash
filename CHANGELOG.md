## Version 1.0.1 [2014-06-25]

- [Bugfix] Fixed rendering issues in Chrome and Firefox

## Version 1.0.0 [2014-06-25]

- [Bugfix] Fixed race condition that caused colors to differ slightly when typing quickly
- [Changed] Using CSS transitions when supported, falling back on jQuery `animate()` (joshdick)
- [Changed] Refactored and modernized code base

## Version 0.4.2 [2013-11-16]

- [Bugfix] Fixed issue where incorrect colors appear when typing quickly

## Version 0.4.1 [2012-8-9]

- [Changed] Renamed chroma-hash.js to jquery.chroma-hash.js, in order to better-communicate jQuery dependency

## Version 0.4.0 [2012-8-9]

- [Bugfix] Chroma-Hash function now works for password elements that do not have an id attribue
- [Changed] Updated and modernized example page to HTML5
- [Changed] Color transitions now use CSS3 transitions, rather than jQuery Color Animations

## Version 0.3.0 [2009-8-12]

- [Changed] jQuery UI Dependency Removed: Chroma-Hash now includes jQuery Color Animations (John Resig), which was the critical component from jQuery UI. (On suggestion of Stan Wiechers, Joel Moss, and others)
- [New] Low Bit Rounding: Each color channel has its least significant digit rounded to zero (eg. 0xF4 -> 0xF0, 0x42 -> 0x4). This increases the number of collisions per color, and thereby improves the overall security of the visualization. Since the differences in colors within a particular 4-byte range are nearly imperceptible to humans, this change does not affect general aesthetics. (Thanks to
[Ian Young](http://blog.iangreenleaf.com/2009/08/making-chroma-hash-less-leaky.html))
- [Bugfix] CSS Positioning Errors: Positioning of color bars is now more robust across different browsers. Successfully tested on Safari 4, Firefox 3.5 and Opera 10

## Version 0.2.0 [2009-8-4]

- [New] Salt: Added parameter for salt to be applied for hash function
- [New] Grayscale: Added parameter to specify minimum number of characters of input needed for colors to appear. Under that length, bars appear in grayscale
- [Bugfix] "Color change effects pause on lost focus" (mikehamer)
- [Changed] Tag-line is now "A sexy, secure visualization of password field input"

## Version 0.1.0 [2009-7-29]

Initial release
