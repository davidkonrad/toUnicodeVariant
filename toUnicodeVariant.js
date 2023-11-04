/**
 * (c) David Konrad 2018-
 * MIT License
 *
 * Javascript function to convert plain text to unicode variants
 *
 * Loosely based on the nodejs monotext CLI utility https://github.com/cpsdqs/monotext 
 * (c) cpsdqs 2016
 *
 * For more inspiration see  http://unicode.org/charts/
 *
 */

/*
 * supported unicode variants
 *
 * m: monospace
 * b: bold
 * i: italic
 * c: script (Mathematical Alphanumeric Symbols)
 * g: gothic / fraktur
 * d: double-struck
 * s: sans-serif
 * o: circled text
 * p: parenthesized latin letters
 * q: squared text
 * w: fullwidth
 */

function toUnicodeVariant(str, variant, flags) {

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
		o: [0x24B6, 0x2460],
		on: [0x0001f150, 0x2460],
		p: [0x249c, 0x2474],
		q: [0x1f130, 0x00030],
		qn: [0x0001F170, 0x00030],
		w: [0xff21, 0xff10],
		f: [0x1d670, 0x1d7f6]
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
		'flags': 'f'
	}

	// special characters (absolute values)
	const special = {
		m: {
			' ': 0x2000,
			'-': 0x2013,
		},
		i: {
			'h': 0x210e
		},
		c: {
			'B': 0x212C, 'E': 0x2130, 'F': 0x2131, 'H': 0x210B, 'I': 0x2110, 'L': 0x2112, 'M': 0x2133, 'R': 0x211B, 
			'e': 0x1D4EE, 'g': 0x1D4F0,	'o': 0x1D4F8
		},
		g: {
			'C': 0x212d, 'H': 0x210c, 'I': 0x2111, 'R': 0x211c, 'Z': 0x2128
		},
    d: {
      'C': 0x2102, 'H': 0x210D, 'N': 0x2115, 'P': 0x2119, 'Q': 0x211A, 'R': 0x211D, 'Z': 0x2124
    },
		o: {
			'0': 0x24EA, '1': 0x2460, '2': 0x2461, '3': 0x2462, '4': 0x2463, '5': 0x2464, '6': 0x2465, '7': 0x2466, '8': 0x2467, '9': 0x2468
		},
		on: {
			'0': 0x1F10C
		},
		p: {}, q: {}, qn: {},
		w: {
			'!': 0xFF01, '"': 0xFF02, '#': 0xFF03, '$': 0xFF04, '%': 0xFF05, '&': 0xFF06, "'": 0xFF07, "(": 0xFF08, ")": 0xFF09, 
			"*": 0xFF0A, "+": 0xFF0B, ",": 0xFF0C, "-": 0xFF0D, ".": 0xFF0E, "/": 0xFF0F, ':': 0xFF1A, ';': 0xFF1B, '<': 0xFF1C, 
			'=': 0xFF1D, '>': 0xFF1E, '?': 0xFF1F,	'@': 0xFF20
		},
		f: {
			'A': 0x1F1E6, 'B': 0x1F1E7, 'C': 0x1F1E8, 'D': 0x1F1E9, 'E': 0x1F1EA, 'F': 0x1F1EB, 'G': 0x1F1EC, 'H': 0x1F1ED, 'I': 0x1F1EE,
			'J': 0x1F1EF, 'K': 0x1F1F0,	'L': 0x1F1F1, 'M': 0x1F1F2, 'N': 0x1F1F3, 'O': 0x1F1F4, 'P': 0x1F1F5, 'Q': 0x1F1F6, 'R': 0x1F1F7, 
			'S': 0x1F1F8, 'T': 0x1F1F9,	'U': 0x1F1FA, 'V': 0x1F1FB, 'W': 0x1F1FC, 'X': 0x1F1FD, 'Y': 0x1F1FE, 'Z': 0x1F1FF
		}
	}

	//support for parenthesized latin letters small cases 
	//support for full width latin letters small cases 
	//support for circled negative letters small cases 
	//support for squared letters small cases 
	//support for squared letters negative small cases 
	;['p', 'w', 'on', 'q', 'qn'].forEach(t => {
		for (var i = 97; i <= 122; i++) {
			special[t][String.fromCharCode(i)] = offsets[t][0] + (i-97)
		}
	})		

	const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
	const numbers = '0123456789'

	const getType = function(variant) {
		if (variantOffsets[variant]) return variantOffsets[variant]
		if (offsets[variant]) return variant
		return 'm' //monospace as default
	}
	const getFlag = function(flag, flags) {
		if (!flags) return false
		return flag.split('|').some(f => flags.split(',').indexOf(f) > -1)
	}

	const type = getType(variant)
	const underline = getFlag('underline|u', flags)
	const strike = getFlag('strike|s', flags)
  let result = ''

  for (let c of str) {
    let index
    if (special[type] && special[type][c]) c = String.fromCodePoint(special[type][c])
    if (type && (index = chars.indexOf(c)) > -1) {
      result += String.fromCodePoint(index + offsets[type][0]) 
    } else if (type && (index = numbers.indexOf(c)) > -1) {
      result += String.fromCodePoint(index + offsets[type][1]) 
    } else {
      result += c 
    }
    if (underline) result += '\u0332' // add combining underline
    if (strike) result += '\u0336' // add combining strike
  }
	return result
}


if (typeof module === 'object' && module && typeof module.exports === 'object') {
	module.exports = toUnicodeVariant
}


