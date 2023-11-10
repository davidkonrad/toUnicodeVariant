/**
 * (c) David Konrad 2018-
 * MIT License
 *
 * Javascript function to convert plain text to unicode variants
 *
 * For more inspiration see http://unicode.org/charts/ 
 *
 */

function toUnicodeVariant(str, variant, flags) {

	const string = String.fromCodePoint

	const offsets = {
		m: [0x1d670, 0x1d7f6],
		b: [0x1d400, 0x1d7ce],
		i: [0x1d434, 0x00030],
		bi: [0x1d468, 0x00030],
		c: [0x0001d49c, 0x00030],
		bc: [0x1d4d0, 0x00030],
		g: [0x1d504, 0x00030],
		d: [0x1d538, 0x1d7d8],
		bg: [0x1d56c, 0x00030],
		s: [0x1d5a0, 0x1d7e2],
		bs: [0x1d5d4, 0x1d7ec],
		is: [0x1d608, 0x00030],
		bis: [0x1d63c, 0x00030],
		o: [0x24B6, 0x245F],
		on: [0x0001f150, 0x245F],
		p: [0x1F110, 0x1d7f6],
		q: [0x1f130, 0x00030],
		qn: [0x0001F170, 0x00030],
		w: [0xff21, 0xff10],
		//
		f: [0x1F1E6, 0x1d7f6],
		nd: [0x1d670, 0x2487],
		nc: [0x1d670, 0x1F101],
		ndc: [0x1d670, 0x24F4],
		r: [0x1d670, 0x24F4],
	}

	const variantOffsets = {
		'monospace': 'm',
		'bold' : 'b',
		'italic' : 'i',
		'bold italic' : 'bi',
		'script': 'c',
		'bold script': 'bc',
		'gothic': 'g',
		'gothic bold': 'bg',
		'doublestruck': 'd',
		'sans': 's',
		'bold sans' : 'bs',
		'italic sans': 'is',
		'bold italic sans': 'bis',
		'parenthesis': 'p',
		'circled': 'o',
		'circled negative': 'on',
		'squared': 'q',
		'squared negative': 'qn',
		'fullwidth': 'w',
		//
		'flags': 'f',
		'numbers dot': 'nd',
		'numbers comma': 'nc',
		'numbers double circled': 'ndc',
		'roman': 'r'
	}

	const special = {
		m: { 
			' ': 0x2000, '-': 0x2013 
		},
		i: { 
			'h': 0x210e 
		},
		c: { 
			'B': 0x212C, 'E': 0x2130, 'F': 0x2131, 'H': 0x210B, 'I': 0x2110, 'L': 0x2112, 
			'M': 0x2133, 'R': 0x211B, 'e': 0x1D4EE, 'g': 0x1D4F0, 'o': 0x1D4F8
		},
		g: {
			'C': 0x212d, 'H': 0x210c, 'I': 0x2111, 'R': 0x211c, 'Z': 0x2128
		},
		d: {
			'C': 0x2102, 'H': 0x210D, 'N': 0x2115, 'P': 0x2119, 'Q': 0x211A, 'R': 0x211D, 'Z': 0x2124
		},
		o: {
			'0': 0x24EA,'10': 0x2469,	'11': 0x246A, '12': 0x246B, '13': 0x246C, '14': 0x246D,
			'15': 0x246E, '16': 0x246F, '17': 0x2470, '18': 0x2471, '19': 0x2472, '20': 0x2473
		},
		on: {
			'0': 0x24FF, '11': 0x24EB, '12': 0x24EC, '13': 0x24ED, '14': 0x24EE, '15': 0x24EF,
			'16': 0x24F0, '17': 0x24F1, '18': 0x24F2, '19': 0x24F3, '20': 0x24F4
		},
		p: {
			'1': 0x2474, '2': 0x2475, '3': 0x2476, '4': 0x2477, '5': 0x2478, '6': 0x2479, 
			'7': 0x247A, '8': 0x247B, '9': 0x247C, '10': 0x247D, '11': 0x247E, '12': 0x247F,
			'13': 0x2480, '14': 0x2481, '15': 0x2482, '16': 0x2483, '17': 0x2484, '18': 0x2485, 
			'19': 0x2486, '20': 0x2487
		}, 
		q: {
			'hv': 0x1F14A, 'mv': 0x1F14B, 'sd': 0x1F14C, 'ss': 0x1F14D, 'ppv': 0x1F14E, 
			'wc': 0x1F14F, 'cl': 0x1F191, 'cool': 0x1F192, 'free': 0x1F193, 'id': 0x1F194, 
			'new': 0x1F195, 'ng': 0x1F196, 'ok': 0x1F197, 'sos': 0x1F198, 'up!': 0x1F199, 
			'vs': 0x1F19A, '3d': 0x1F19B, '2ndscr': 0x1F19C, '2k': 0x1F19D, '4k': 0x1F19E, 
			'8k': 0x1F19F, '5.1': 0x1F1A0, '7.1': 0x1F1A1, '22.2': 0x1F1A2,	'60p': 0x1F1A3, 
			'120p': 0x1F1A4, 'd': 0x1F1A5, 'hc': 0x1F1A6, 'hdr': 0x1F1A7, 'hi-res': 0x1F1A8,
			'loss-less': 0x1F1A9, 'shv': 0x1F1AA, 'uhd': 0x1F1AB, 'vod': 0x1F1AC
		}, 
		qn: {
			'ic' : 0x1F18B, 'pa' : 0x1F18C, 'sa' : 0x1F18D, 'ab' : 0x1F18E, 'wc' : 0x1F18F
		},
		w: {
			'!': 0xFF01, '"': 0xFF02, '#': 0xFF03, '$': 0xFF04, '%': 0xFF05, '&': 0xFF06,
			'\'': 0xFF07, '(': 0xFF08, ')': 0xFF09, '*': 0xFF0A, '+': 0xFF0B, ',': 0xFF0C,
			'-': 0xFF0D, '.': 0xFF0E, '/': 0xFF0F, ':': 0xFF1A, ';': 0xFF1B, '<': 0xFF1C, 
			'=': 0xFF1D, '>': 0xFF1E, '?': 0xFF1F, '@': 0xFF20, '\\': 0xFF3C, '[': 0xFF3B,
			']': 0xFF3D, '^': 0xFF3E, '_': 0xFF3F,'`': 0xFF40, '{': 0xFF5B, '|': 0xFF5C,
			'}': 0xFF5D, '~': 0xFF5E, '⦅': 0xFF5F, '⦆': 0xFF60, '￠': 0xFFE0, '￡': 0xFFE1,
			'¦': 0xFFE4, '￥': 0xFFE5, '￦': 0xFFE6, '`': 0xFF40, 'ｰ': 0xFF70, '｡': 0xFF70,
			'"': 0xFF02, '､': 0xFF64, '･': 0xFF65, '.': 0xFF0E, '￣': 0xFFE3, '¬': 0xFFE2
		},
		f: {},
		nd: {
			'0': 0x1F100, '10': 0x2491, '11': 0x2492, '12': 0x2493, '13': 0x2494, '14': 0x2495,
			'15': 0x2496, '16': 0x2497, '17': 0x2498, '18': 0x2499, '19': 0x249A, '20': 0x249B
		},
		ndc: { 
			'0': 0x1D7F6, '10': 0x24FE
		},
		r: {
			'I': 0x2160, 'II': 0x2161, 'III': 0x2162, 'IV': 0x2163, 'V': 0x2164, 'VI': 0x2165,
			'VII': 0x2166, 'VIII': 0x2167, 'IX': 0x2168, 'X': 0x2169, 'XI': 0x216A, 'XII': 0x216B,
			'L': 0x216C, 'C': 0x216D, 'D': 0x216E, 'M': 0x216F, 'i': 0x2170, 'ii': 0x2171,
			'iii': 0x2172, 'iv': 0x2173, 'v': 0x2174, 'vi': 0x2175, 'vii': 0x2176, 'viii': 0x2177,
			'ix': 0x2178, 'x': 0x2179, 'xi': 0x217A, 'xii': 0x217B, 'l': 0x217C, 'c': 0x217D,
			'd': 0x217E, 'm': 0x217F
		}
	}

	//paranthesis, support small letters
	//fullwidth, support small letters
	for (var i = 97; i <= 122; i++) {
		special['p'][String.fromCharCode(i)] = 0x249C + (i-97)
		special['w'][String.fromCharCode(i)] = 0xFF41 + (i-97)
	}

	//circled negative, support small letters
	//squared, support small letters
	//squared negative, support small letters
	;['on', 'q', 'qn', 'f'].forEach(t => {
		for (var i = 97; i <= 122; i++) {
			special[t][String.fromCharCode(i)] = offsets[t][0] + (i-97)
		}
	})		

	const diacritics = {
		'strike': { 'short': 's', 'code': 0x0336 },
		'strike-curly': { 'short': 'sc', 'code': 0x0334 },
		'underline': { 'short': 'u', 'code': 0x0332 },
		'underline-curly': { 'short': 'uc', 'code': 0x0330 },
		'underline-sm': { 'short': 'u-sm', 'code': 0x0320 },
		'underline-double': { 'short': 'ud', 'code': 0x0333 },
		'underline-double-sm': { 'short': 'ud-sm', 'code': 0x0347 },
		'overline': { 'short': 'o', 'code': 0x0305 },
		'overline-curly': { 'short': 'oc', 'code': 0x0303 },
		'overline-sm': { 'short': 'o-sm', 'code': 0x0304 },
		'overline-double' : { 'short': 'od', 'code': 0x033F },
		'slash': { 'short': 'sl', 'code': 0x0338 },
		'cross-above': { 'short': 'ca', 'code': 0x033D },
		'plus-below': { 'short': 'pb', 'code': 0x031F },
		'a-above': { 'short': 'a-a', 'code': 0x0363 },
		'c-above': { 'short': 'c-a', 'code': 0x0368 },
		'd-above': { 'short': 'd-a', 'code': 0x0369 },
		'e-above': { 'short': 'e-a', 'code': 0x0364 },
		'h-above': { 'short': 'h-a', 'code': 0x036A },
		'i-above': { 'short': 'i-a', 'code': 0x0365 },
		'm-above': { 'short': 'm-a', 'code': 0x036B },
		'o-above': { 'short': 'o-a', 'code': 0x0366 },
		'r-above': { 'short': 'r-a', 'code': 0x036C },
		'u-above': { 'short': 'u-a', 'code': 0x0367 },
		'v-above': { 'short': 'v-a', 'code': 0x036E },
		'x-above': { 'short': 'x-a', 'code': 0x036F },
		'halo-breve': { 'short': 'hb', 'code': 0x0488 },
		'halo-grave': { 'short': 'hg', 'code': 0x0489 },
		'enclose-circle': { 'short': 'en-c', 'code': 0x20DD },
		'enclose-backslash': { 'short': 'en-cb', 'code': 0x20E0 },
		'enclose-circle-backslash': { 'short': 'en-cb', 'code': 0x20E0 },
		'enclose-square': { 'short': 'en-s', 'code': 0x20DE },
		'enclose-diamond': { 'short': 'en-d', 'code': 0x20DF },
		'enclose-screen': { 'short': 'en-scr', 'code': 0x20E2 },
		'enclose-keycap': { 'short': 'en-key', 'code': 0x20E3 },
		//diacritics supporting special chars
		'diaeresis': { 'code': 0x0308 },
		'caron': { 'code': 0x030C },
		'perispomeni': { 'code': 0x0342 },
		'tilde': { 'code': 0x0303 },
		'tildesm': { 'code': 0x02DC },
		'circumflex': { 'code': 0x0302 }, 
		'ringabove': { 'code': 0x030A },
		'dotabove': { 'code': 0x0307 },
		'dotbelow': { 'code': 0x0323 },
		'grave': { 'code': 0x0340 },
		'gravedouble': { 'code': 0x030F },
		'acute': { 'code': 0x0341 },
		'breve': { 'code': 0x0306 },
		'breveinverted': { 'code': 0x0311 },
		'commabelow': { 'code' : 0x0326 },
		'macron': { 'code': 0x0304 },
		'cedilla': { 'code': 0x0327 },
		'ogonek': { 'code': 0x0328 },
		'solidus': { 'code': 0x0338 },
		'solidussm': { 'code': 0x0337 },
		//spacing combinings
		'space-zero': { 'code': 0xFEFF },
		'space-hair': { 'code': 0x200A },
		'space-thin': { 'code': 0x2009 },
		'space': { 'code': 0x0020 },
		'space-en': { 'code': 0x2000 },
		'space-figure': { 'code': 0x2007 },
		'space-cjk': { 'code': 0x3000 },
		'space-em': { 'code': 0x2001 },
		'space-ogham': { 'code': 0x1680 },
	}

	const special_chars = {
		'ä': { 'char': 'a', 'combine': string(diacritics.diaeresis.code) },
		'â': { 'char': 'a', 'combine': string(diacritics.circumflex.code) },
		'á': { 'char': 'a', 'combine': string(diacritics.acute.code) },
		'å': { 'char': 'a', 'combine': string(diacritics.ringabove.code) },
		'ă': { 'char': 'a', 'combine': string(diacritics.breve.code) },
		'ǟ': { 'char': 'a', 'combine': string(diacritics.diaeresis.code) + string(diacritics.macron.code) },
		'ã': { 'char': 'a', 'combine': string(diacritics.tilde.code) },
		'ā': { 'char': 'a', 'combine': string(diacritics.macron.code) },
		'ȧ': { 'char': 'a', 'combine': string(diacritics.dotabove.code) },
		'ȃ': { 'char': 'a', 'combine': string(diacritics.breveinverted.code) },
		'ḅ': { 'char': 'b', 'combine': string(diacritics.dotbelow.code) },
		'č': { 'char': 'c', 'combine': string(diacritics.caron.code) },
		'ć': { 'char': 'c', 'combine': string(diacritics.acute.code) },
		'ċ': { 'char': 'c', 'combine': string(diacritics.dotabove.code) },
		'ç': { 'char': 'c', 'combine': string(diacritics.cedilla.code) },
		'ḉ': { 'char': 'c', 'combine': string(diacritics.cedilla.code) + string(diacritics.acute.code) },
		'ċ': { 'char': 'c', 'combine': string(diacritics.dotabove.code) },
		'ĉ': { 'char': 'c', 'combine': string(diacritics.circumflex.code) },
		'è': { 'char': 'e', 'combine': string(diacritics.grave.code) },
		'é': { 'char': 'e', 'combine': string(diacritics.acute.code) },
		'ē': { 'char': 'e', 'combine': string(diacritics.macron.code) }, 
		'ĕ': { 'char': 'e', 'combine': string(diacritics.breve.code) }, 
		'ë': { 'char': 'e', 'combine': string(diacritics.diaeresis.code) }, 
		'ě': { 'char': 'e', 'combine': string(diacritics.caron.code) }, 
		'ę': { 'char': 'e', 'combine': string(diacritics.ogonek.code) }, 
		'ȇ': { 'char': 'e', 'combine': string(diacritics.breveinverted.code) }, 
		'ȅ': { 'char': 'e', 'combine': string(diacritics.gravedouble.code) }, 
		'ê': { 'char': 'e', 'combine': string(diacritics.circumflex.code) }, 
		'ğ': { 'char': 'g', 'combine': string(diacritics.breve.code) }, 
		'ǧ': { 'char': 'g', 'combine': string(diacritics.caron.code) }, 
		'ģ': { 'char': 'g', 'combine': string(diacritics.cedilla.code) }, 
		'ġ': { 'char': 'g', 'combine': string(diacritics.dotabove.code) }, 
		'ḥ': { 'char': 'h', 'combine': string(diacritics.dotbelow.code) }, 
		'ĩ': { 'char': 'i', 'combine': string(diacritics.tilde.code) }, 
		'î': { 'char': 'i', 'combine': string(diacritics.circumflex.code) }, 
		'í': { 'char': 'i', 'combine': string(diacritics.acute.code) },
		'ì': { 'char': 'i', 'combine': string(diacritics.grave.code) },
		'ĩ': { 'char': 'i', 'combine': string(diacritics.tilde.code) },
		'ḱ': { 'char': 'k', 'combine': string(diacritics.acute.code) }, 
		'ḳ': { 'char': 'k', 'combine': string(diacritics.dotbelow.code) }, 
		'ņ': { 'char': 'n', 'combine': string(diacritics.ogonek.code) }, 
		'ń': { 'char': 'n', 'combine': string(diacritics.acute.code) }, 
		'õ': { 'char': 'o', 'combine': string(diacritics.tilde.code) },
		'ö': { 'char': 'o', 'combine': string(diacritics.diaeresis.code) },
		'ō': { 'char': 'o', 'combine': string(diacritics.macron.code) },
		'ô': { 'char': 'o', 'combine': string(diacritics.circumflex.code) },
		'ó': { 'char': 'o', 'combine': string(diacritics.acute.code) },
		'ò': { 'char': 'o', 'combine': string(diacritics.grave.code) },
		'ŕ': { 'char': 'r', 'combine': string(diacritics.acute.code) },
		'ş': { 'char': 's', 'combine': string(diacritics.cedilla.code) },
		'ș': { 'char': 's', 'combine': string(diacritics.commabelow.code) },
		'ṩ': { 'char': 's', 'combine': string(diacritics.dotbelow.code) + string(diacritics.dotabove.code) },
		'š': { 'char': 's', 'combine': string(diacritics.caron.code) },
		'ś': { 'char': 's', 'combine': string(diacritics.acute.code) },
		'ü': { 'char': 'u', 'combine': string(diacritics.diaeresis.code) },
		'ù': { 'char': 'u', 'combine': string(diacritics.grave.code) },
		'ú': { 'char': 'u', 'combine': string(diacritics.acute.code) },
		'û': { 'char': 'u', 'combine': string(diacritics.circumflex.code) },
		'ŭ': { 'char': 'u', 'combine': string(diacritics.breve.code) },
		'ȕ': { 'char': 'u', 'combine': string(diacritics.gravedouble.code) },
		'ȗ': { 'char': 'u', 'combine': string(diacritics.breveinverted.code) },
		'ů': { 'char': 'u', 'combine': string(diacritics.ringabove.code) },
		'ū': { 'char': 'u', 'combine': string(diacritics.macron.code) },
		'ẁ': { 'char': 'w', 'combine': string(diacritics.grave.code) },
		'ẃ': { 'char': 'w', 'combine': string(diacritics.acute.code) },
		'ø': { 'char': 'o', 'combine': string(diacritics.solidussm.code) },
		//mimicks that somehow fails
		//'c̆': { 'char': 'c', 'combine': string(diacritics.breve.code) },
		//'c̈': { 'char': 'c', 'combine': string(diacritics.diaeresis.code) },
		//'ę́': { 'char': 'e', 'combine': string(diacritics.ogonek.code) + string(diacritics.acute.code) }, 
		//'m̂': { 'char': 'm', 'combine': string(diacritics.circumflex.code) }, 
		//'n̂': { 'char': 'n', 'combine': string(diacritics.circumflex.code) }, 
		//'ñ': { 'char': 'n', 'combine': string(diacritics.tilde.code) }, 
		//'q̄': { 'char': 'q', 'combine': string(diacritics.macron.code) },
		//'r̃': { 'char': 'r', 'combine': string(diacritics.tilde.code) },
		//'s̈': { 'char': 's', 'combine': string(diacritics.diaeresis.code) },
	}

	//reset special chars, capital letters
	//in the future, some capital speciel chars can be mimicked as well
	for (const char of Object.keys(special_chars)) {
		special_chars[char.toUpperCase()] = { 'char': char, 'combine': false }
	}

	const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
	const numbers = '0123456789'

	const type = (function() {
		if (variantOffsets[variant]) return variantOffsets[variant]
		if (offsets[variant]) return variant
		return 'm' //monospace as default
	})()

	const combine = (function() {
		if (!flags || typeof flags !== 'string') return false
		let result = ''
		flags.split(',').forEach(function(flag) {
			flag = flag.trim().toLowerCase()
			for (const d in diacritics) {
				if (flag === d || flag === diacritics[d].short) {
					result += string(diacritics[d].code)
				}
			}
		})
		return result
	})()

	//if entire sequence is supported
	if (typeof str === 'string' && special[type] && (special[type][str] || special[type][str.toLowerCase()])) {
		return special[type][str] ? string(special[type][str]) : string(special[type][str.toLowerCase()])
	}

	//support for romanization
	if (['roman', 'r'].includes(type)) {
		if (typeof str === 'number') {
			//-- based on https://blog.stevenlevithan.com/archives/javascript-roman-numeral-converter
			const parts = {
				M: 1000, CM: 900, D: 500, CD: 400, C: 100, XC: 90, L: 50, XL: 40, X: 10, IX: 9,	V: 5, IV: 4, I: 1
			}
			let roman = ''
			let num = str
			for (let i in parts) {
				while (num >= parts[i] ) {
					if (special[type][i]) {
						roman += i
					} else {
						for (let d of i) roman += d
					}
					num -= parts[i]
				}
			}
			str = roman
		}
		let result = str
		const romans = ['VIII', 'viii', 'III', 'iii', 'XII', 'xii', 'VII', 'vii', 'IX', 
										'ix', 'XI', 'xi', 'IV', 'iv', 'VI', 'vi', 'II', 'ii', 'I', 'i', 
										'D', 'd', 'M', 'm', 'L', 'l', 'V', 'v', 'C', 'c', 'X', 'x']
		for (number of romans) {
			if (result.indexOf(number.toString()) > -1) {
				result = result.replaceAll(number, string(special[type][number]))
			}
		}
		return result
	}

	let result = ''

	for (let c of str) {
		let index
		const combine_special = (c in special_chars) ? special_chars[c].combine : false 
		c = combine_special ? special_chars[c].char : c.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
		if (special[type] && special[type][c]) c = string(special[type][c])
		if (type && (index = chars.indexOf(c)) > -1) {
			result += string(index + offsets[type][0]) 
		} else if (type && (index = numbers.indexOf(c)) > -1) {
			result += string(index + offsets[type][1]) 
		} else {
			result += c 
		}
		if (combine_special) result += combine_special
		if (combine) result += combine 
	}

	return result
}

if (typeof module === 'object' && module && typeof module.exports === 'object') {
	module.exports = toUnicodeVariant
}


