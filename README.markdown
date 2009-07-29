Chroma-Hash
===========

## A sexy, non-reversable live visualization of password field input

*In a tweet*: Chroma-Hash is a jQuery plugin that dynamically visualizes secure text-field values using ambient color bars

Password entry can be frustrating, especially with long or difficult passwords. On a webpage, secure fields obscure your input with •'s, so others can't read it. Unfortunately, neither can you—you can't tell if you got your password right until you click "Log In". 

Chroma-Hash displays a series of colored bars at the end of field inputs so you can instantly see if your password is right. Chroma-Hash takes an MD5 hash of your input and uses that to compute the colors in the visualization. The MD5 hash is non-reversible, so no one could know what your password just from the colors. Your password will display the same sequence each time, so you can learn to expect "blue, red, pink", for instance; if you instead see "green, purple, yellow", you'll know you typed it wrong.

## Demo

Actions speak louder than words.  
Try it out at: <tt>[http://mattt.github.com/Chroma-Hash/](http://mattt.github.com/Chroma-Hash/ "Try out Chroma-Hash!")</tt>

## Usage

<code>
  $("input:password").chromaHash({number: 3});
</code>

- <tt>number</tt> parameter controls the number of bars displayed (1,2,3, or 4)

## Requirements
- jQuery 1.3+
- jQuery UI 1.7+

## License

Chroma-Hash is licensed under the MIT License:

  Copyright (c) 2009 Mattt Thompson (http://mattt.me/)

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in
  all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
  THE SOFTWARE.
  
## Credit

Chroma-Hash uses Paul Johnston's Javascript MD5 implementation, and is distributed under the BSD License  
See [http://pajhome.org.uk/crypt/md5](http://pajhome.org.uk/crypt/md5) for more info

Inspired in part by Arc90 Labs' HashMask  
[http://lab.arc90.com/2009/07/hashmask.php](http://lab.arc90.com/2009/07/hashmask.php)