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
toUnicodeVariant(string, variant, combinings)
...
toUnicodeVariant('monospace', 'm') //like first row below 
```

|Variant     | Alias | Description                   | Example           |
|:--------- |:-----:|:----------------------------- |:----------------- |
| monospace |   m   | Monospace      | 𝚖𝚘𝚗𝚘𝚜𝚙𝚊𝚌𝚎 |
| bold   |   b   | Bold text                        |𝐛𝐨𝐥𝐝  |
| italic  |  i  | Italic text                       | 𝑖𝑡𝑎𝑙𝑖𝑐  |
| bold italic   |   bi   | bold+italic text   | 𝒃𝒐𝒍𝒅 𝒊𝒕𝒂𝒍𝒊𝒄 |
| script     |   c   | Handwriting style         | 𝓈𝒸𝓇𝒾𝓅𝓉    |
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

Besides that, the text can be combined with a broad range of diacritics 

```javascript
toUnicodeVariant('gothic', 'g', 'underline')
```

|Combining | Short | Sample (italic variant) |
|:--------- |:-----:|:----------------------------- |
| strike | s | 𝑎̶𝑏̶𝑐̶𝑑̶𝑒̶𝑓̶𝑔̶
| strike-curly | sc | 𝑎̴𝑏̴𝑐̴𝑑̴𝑒̴𝑓̴𝑔̴
| underline | u | 𝑎̲𝑏̲𝑐̲𝑑̲𝑒̲𝑓̲𝑔̲
| underline-sm | u-sm |	𝑎̠𝑏̠𝑐̠𝑑̠𝑒̠𝑓̠𝑔̠
| underline-curly | uc | 𝑎̰𝑏̰𝑐̰𝑑̰𝑒̰𝑓̰𝑔̰
| underline-double | ud | 𝑎̳𝑏̳𝑐̳𝑑̳𝑒̳𝑓̳𝑔̳
| underline-double-sm | ud-sm | 𝑎͇𝑏͇𝑐͇𝑑͇𝑒͇𝑓͇𝑔͇
| overline | o | 𝑎̅𝑏̅𝑐̅𝑑̅𝑒̅𝑓̅𝑔̅
| overline-curly | oc | 𝑎̃𝑏̃𝑐̃𝑑̃𝑒̃𝑓̃𝑔̃
| overline-sm | o-sm | 𝑎̄𝑏̄𝑐̄𝑑̄𝑒̄𝑓̄𝑔̄
| overline-double | od | 𝑎̿𝑏̿𝑐̿𝑑̿𝑒̿𝑓̿𝑔̿
| slash | sl | 𝑎̸𝑏̸𝑐̸𝑑̸𝑒̸𝑓̸𝑔̸
| plus-below | pb | 	𝑎̟𝑏̟𝑐̟𝑑̟𝑒̟𝑓̟𝑔̟
| cross-above | ca | 𝑎̽𝑏̽𝑐̽𝑑̽𝑒̽𝑓̽𝑔̽
|  𝐍-above |  {a,c,d,e,h,i,m,o,r,u,v,x}-a | 𝑎ͣ𝑎ͨ𝑎ͩ𝑎ͤ𝑎ͪ𝑎ͥ𝑎ͫ𝑎ͦ𝑎ͬ𝑎ͧ𝑎ͮ𝑎ͯ

Combinings can be combined as comma separated string :

```javascript
toUnicodeVariant('The quick brown fox jumps over the lazy dog', 'sans', 'underline, slash')
```

 𝖳̸̲𝗁̸̲𝖾̸̲ ̸̲𝗊̸̲𝗎̸̲𝗂̸̲𝖼̸̲𝗄̸̲ ̸̲𝖻̸̲𝗋̸̲𝗈̸̲𝗐̸̲𝗇̸̲ ̸̲𝖿̸̲𝗈̸̲𝗑̸̲ ̸̲𝗃̸̲𝗎̸̲𝗆̸̲𝗉̸̲𝗌̸̲ ̸̲𝗈̸̲𝗏̸̲𝖾̸̲𝗋̸̲ ̸̲𝗍̸̲𝗁̸̲𝖾̸̲ ̸̲𝗅̸̲𝖺̸̲𝗓̸̲𝗒̸̲ ̸̲𝖽̸̲𝗈̸̲𝗀̸̲


### Limits

* None of the *italic*-style variants supports numbers, 0-9
* None of the figurative variants - *squared*, *circled*, *fullwidth* etc - supports complex diacritics
* However, *fullwidth* supports the entire ASCII-table
* No other variant support beyond an a-Z, 0-9 scope

### Special chars
Special chars are almost certainly not supported by unicode "variants". So it is looking odd if we are converting an ```â``` to the *italic* variant entity of ```<none-existing>```. But by using diacritics it is possible to *mimick* many of the special chars. So far :

|Special | Sample bold sans small | Sample bold sans capital |
|:---------:|:-----:|:-----------------------------:|
| ä | 𝗮̈ | 𝗔
| ü | 𝘂̈ | 𝗨
| č | 𝗰̌ | 𝗖
| õ | 𝗼͂ | 𝗢


For most chars, capital letters combined with special diacritics looks even more awkward, so those are just rendered as their corresponding latin capital letter without diacritics.

```javascript
toUnicodeVariant('üničode', 'bold italic') //𝒖̈𝒏𝒊𝒄̌𝒐𝒅𝒆
toUnicodeVariant('ÜNIĈODE', 'bold italic') //𝑼𝑵𝑰𝑪𝑶𝑫𝑬
```

### *flags* variant, f

```flags``` or ```f``` are a special variant that need to be treated differently. It is based on the unicode *regional indicator symbol*, see https://www.unicode.org/charts/PDF/U1F100.pdf. Using that you'll need to pass a string with whitespace between each character :

```javascript
toUnicodeVariant('U N I C O D E', 'f') //🇺 🇳 🇮 🇨 🇴 🇩 🇪
```
However, if you pass a string that contain a country code, or even the name of some international organization, many readers will render the corresponding flag instead :
```javascript
toUnicodeVariant('DK EU UN', 'f') //🇩🇰 🇪🇺 🇺🇳
```

### Resetting a string containing unicode with javascript :
```javascript
'𝖆𝖇𝖈𝖉𝖊𝖋𝖌𝖍𝖎𝖏𝖐𝖑𝖒𝖓𝖔𝖕𝖖𝖗𝖘𝖙𝖚𝖛𝖜𝖝𝖞𝖟'.normalize('NFKC') //or NFKD
```
=== abcdefghijklmnopqrstuvwxyz


### Test
Browser: `test/browser.html`
Node: `test$ node node.js`

These tests show all variants and their coverage az-AZ-09, along with flag combinations For reference, in Chrome (Ubuntu 20.04, 112.x) variants looks like this :<br><br>
<img src="media/variants-chrome-112.png">

-- or you can review a sample output, [test/result-sample.html.txt](test/result-sample.html.txt). Try it out in different browsers - there are significant difference in coverage. 

### References

https://www.unicode.org/charts/PDF/U1D400.pdf.

Almost all of the variants support A-Z, a-z. Some variants support 0-9 as well. The ```fullwidth``` variant even support the entire ASCII table. So you can safely use that variant to render any kind of plain text in general. 


### Playground

For now, visit https://detfrieord.dk/tekst-til-unicode (in danish, sorry)