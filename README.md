# toUnicodeVariant

Javascript function to convert a string into different kind of **ⓤⓝⓘⓒⓞⓓⓔ** variants. 

#### browser
```html
<script src="path/to/toUnicodeVariant.js"></script>
```
#### nodejs
```javascript
const toUnicodeVariant = require('path/to/toUnicodeVariant.js') 
```
#### usage
```javascript
toUnicodeVariant(string, variant, flags)
...
toUnicodeVariant('monospace', 'm') //like first row below 
```

|Variant     | Alias | Description                   | Example           |
|:--------- |:-----:|:----------------------------- |:----------------- |
| monospace |   m   | Monospace      | 𝚖𝚘𝚗𝚘𝚜𝚙𝚊𝚌𝚎 |
| bold   |   b   | Bold text                        |𝐛𝐨𝐥𝐝  |
| italic  |  i  | Italic text                       | 𝑖𝑡𝑎𝑙𝑖𝑐  |
| bold italic   |   bi   | bold+italic text   | 𝒃𝒐𝒍𝒅 𝒊𝒕𝒂𝒍𝒊𝒄 |
| script<sup>1</sup>     |   c   | Handwriting style         | 𝓈𝒸𝓇𝒾𝓅𝓉    |
| bold script  |  bc   | Bolder handwriting     | 𝓫𝓸𝓵𝓭 𝓼𝓬𝓻𝓲𝓹𝓽      |
| gothic  |   g   |Gothic (fraktur)            | 𝔤𝔬𝔱𝔥𝔦𝔠      |
| gothic bold  |   bg   | Gothic in bold| 𝖌𝖔𝖙𝖍𝖎𝖈 𝖇𝖔𝖑𝖉        |
| doublestruck |   d   | Outlined text        | 𝕕𝕠𝕦𝕓𝕝𝕖𝕤𝕥𝕣𝕦𝕔𝕜 |
| 𝗌𝖺𝗇𝗌   |  s   | Sans-serif style    | 𝗌𝖺𝗇𝗌 |
| bold 𝗌𝖺𝗇𝗌   |  bs   | Bold sans-serif   | 𝗯𝗼𝗹𝗱 𝘀𝗮𝗻𝘀 |
| italic 𝗌𝖺𝗇𝗌   |  is   | Italic sans-serif  | 𝘪𝘵𝘢𝘭𝘪𝘤 𝘴𝘢𝘯𝘴 |
| bold italic sans  |  bis   | Bold italic sans-serif  | 𝙗𝙤𝙡𝙙 𝙞𝙩𝙖𝙡𝙞𝙘 𝙨𝙖𝙣𝙨 |
| circled  |  o   | Letters within circles   | ⓒⓘⓡⓒⓛⓔⓓ |
| circled negative |  on   | -- negative  | 	🅒🅘🅡🅒🅛🅔🅓 |
| squared  |  q   | Letters within squares   | 🅂🅀🅄🄰🅁🄴🄳 |
| squared negative  |  qn   | -- negative  | 🆂🆀🆄🅰🆁🅴🅳
| paranthesis   |  p   | Letters within paranthesis  | ⒫⒜⒭⒠⒩⒯⒣⒠⒮⒤ |
| fullwidth | w   | Wider monospace font   | ｆｕｌｌｗｉｄｔｈ |
| flags | f | Regional codes | 🇩🇰 🇺 🇳 🇮 🇨 🇴 🇩 🇪 |


Besides that, the text can be enriched with underline or strike (or both) through the flags param :

```javascript
toUnicodeVariant('gothic', 'g', 'underline')
```
|Variant     | Flags               | Example           |
|:--------- |:-----|:---------------------------- |
| gothic |   underline   | 𝔤̲𝔬̲𝔱̲𝔥̲𝔦̲𝔠̲|
| doublestruck |   strike   | 𝔸̶𝔹̶ℂ̶𝔻̶𝔼̶𝔽̶𝔾̶ℍ̶𝕀̶𝕁̶𝕂̶𝕃̶ |
| sans |   u,s   | 𝟢̶̲𝟣̶̲𝟤̶̲𝟥̶̲𝟦̶̲𝟧̶̲𝟨̶̲𝟩̶̲ |

### Script, gothic ..?
Must admit that this "variant" concept and their names are a little exotic. In fact they are just collections of varionus kind of mathematical symbols described in details here https://www.unicode.org/charts/PDF/U1D400.pdf.

Almost all of the variants supports A-Z, a-z. Some variants support 0-9 as well. The ```fullwidth``` variant even support the entire ASCII table! So you can safely use that to render plain text in general. 


### 🇫 🇱 🇦 🇬 🇸

```flags``` or ```f``` are a special variant that need to be treated different. It is actually based on the unicode *regional indicator symbol*, see https://www.unicode.org/charts/PDF/U1F100.pdf. If you use that, you'll need to pass a string with whitespace between each character:

```javascript
toUnicodeVariant('U N I C O D E', 'f') //🇺 🇳 🇮 🇨 🇴 🇩 🇪
```
However, if you pass a string that contain a country code, or even the name of some international organizations, many readers nowadays return the corresponding flag :
```javascript
toUnicodeVariant('DK EU UN', 'f') //🇩🇰 🇪🇺 🇺🇳
```

### Test
Browser: `test/browser.html`
Node: `test$ node node.js`

Those tests show all variants and their coverage a-Z, along with flags. For reference, in Chrome (Ubuntu 20.04, 112.x) variants looks like this :<br><br>
<img src="media/variants-chrome-112.png">

### Playground

For now: https://detfrieord.dk/tekst-til-unicode

In danish, sorry. I'll plan to port it to an `.io`-site when I get the time.  


