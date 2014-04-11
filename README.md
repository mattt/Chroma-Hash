Chroma-Hash
===========

**A sexy, secure visualization of password field input**

Chroma-Hash is a jQuery plugin that dynamically visualizes secure text-field values using ambient color bars

Password entry can be frustrating, especially with long or difficult passwords. On a webpage, secure fields obscure your input with •'s, so others can't read it. Unfortunately, neither can you—you can't tell if you got your password right until you click "Log In".

Chroma-Hash displays a series of colored bars at the end of field inputs so you can instantly see if your password is right. Chroma-Hash takes an MD5 hash of your input and uses that to compute the colors in the visualization. The resulting color pattern is non-reversible, so no one could know what your password just from the colors.

For a more detailed description of Chroma-Hash, be sure to [check out this blog post about it.](http://mattt.me/2009/chroma-hash-revisited/).

## Demo

Actions speak louder than words. Try it out at: [http://mattt.github.com/Chroma-Hash/](http://mattt.github.com/Chroma-Hash/)

## Usage

```javascript
$("input:password").chromaHash({bars: 3, salt:"7be82b35cb0199120eea35a4507c9acf", minimum:6});
```

- `bars` : number of bars displayed (1,2,3, or 4)
- `salt` : value to be appended when calculating hash function
- `minimum` : minimum number of characters needed for grayscale bars to be displayed in color

## Requirements

- jQuery 1.3+

## Ports, Implementations, and Adaptations

Chroma-Hash is also available in your choice of Javascript libraries and languages:

- [CHChromaHashView (iOS) - @mattt (Mattt Thompson)](https://github.com/mattt/CHChromaHashView)
- [ChromaHashView (Android) - @michaelevans (Michael Evans)](https://github.com/MichaelEvans/ChromaHashView)
- [YUI3 - @foxxtrot (Jeff Craig)](http://github.com/foxxtrot/Chroma-Hash)
- [Prototype - @wki (Wolfgang Kinkeldei)](http://github.com/wki/Chroma-Hash)
- [pyChroma (Python) - @leegao (Lee Gao)](http://github.com/leegao/pyChroma)
- [ChromaHash4j (Java) - @efi (Thomas Efer)](http://github.com/efi/ChromaHash4j)

> For the more acoustically-inclined, be sure to check out [Sonic-Hash](http://mattt.github.com/Sonic-Hash/), which is like its older brother, but uses sounds instead of colors.

## Credit

Inspired by Arc90 Lab's HashMask, by Chris Dary
[http://lab.arc90.com/2009/07/hashmask.php](http://lab.arc90.com/2009/07/09/hashmask-another-more-secure-experiment-in-password-masking/)

Chroma-Hash uses Paul Johnston's Javascript MD5 implementation, and is distributed under the BSD License
See [http://pajhome.org.uk/crypt/md5](http://pajhome.org.uk/crypt/md5) for more info.

Thanks to [Ian Young](http://www.iangreenleaf.com/) for his [suggestion to represent color components in 4-bits](http://blog.iangreenleaf.com/2009/08/making-chroma-hash-less-leaky.html) to increase overall security.

## Contact

Mattt Thompson

- http://github.com/mattt
- http://twitter.com/mattt
- m@mattt.me

## License

Chroma-Hash is available under the MIT license. See the LICENSE file for more info.
