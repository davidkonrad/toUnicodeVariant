
const toUnicodeVariant = require('../toUnicodeVariant.js')

const Test = {
	variantOffsets: {
		"monospace": "m",
		"bold": "b",
		"italic": "i",
		"bold italic": "bi",
		"script": "c",
		"bold script": "bc",
		"gothic": "g",
		"gothic bold": "bg",
		"doublestruck": "d",
		"sans": "s",
		"bold sans": "bs",
		"italic sans": "is",
		"bold italic sans": "bis",
		"parenthesis": "p",
		"squared": "q",
		"squared negative": "qn",
		"circled": "o",
		"circled negative": "on",
		"fullwidth": "w"
	},
	"str": "ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789"
}

for (const v in Test.variantOffsets) {
	console.log(v, toUnicodeVariant(v, Test.variantOffsets[v]))
	console.log(v, toUnicodeVariant(Test.str, Test.variantOffsets[v]))
	console.log(v + ' underline', toUnicodeVariant(Test.str, Test.variantOffsets[v], 'underline'))
	console.log(v + 'strike', toUnicodeVariant(Test.str, Test.variantOffsets[v], 'strike'))
}





