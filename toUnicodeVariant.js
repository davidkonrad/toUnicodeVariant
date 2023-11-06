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
		f: [0x1F1E6, 0x1d7f6],
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
			'C': 0x2102, 'H': 0x210D, 'N': 0x2115, 'P': 0x2119, 'Q': 0x211A, 'R': 0x211D, 
			'Z': 0x2124
		},
		o: {
			'0': 0x24EA, '1': 0x2460, '2': 0x2461, '3': 0x2462, '4': 0x2463, '5': 0x2464, 
			'6': 0x2465, '7': 0x2466, '8': 0x2467, '9': 0x2468
		},
		on: {
			'0': 0x1F10C
		},
		p: {}, q: {}, qn: {},
		w: {
			'!': 0xFF01, '"': 0xFF02, '#': 0xFF03, '$': 0xFF04, '%': 0xFF05, '&': 0xFF06,
			'\'': 0xFF07, '(': 0xFF08, ')': 0xFF09, '*': 0xFF0A, '+': 0xFF0B, ',': 0xFF0C,
			'-': 0xFF0D, '.': 0xFF0E, '/': 0xFF0F, ':': 0xFF1A, ';': 0xFF1B, '<': 0xFF1C, 
			'=': 0xFF1D, '>': 0xFF1E, '?': 0xFF1F, '@': 0xFF20, '\\': 0xFF3C, '[': 0xFF3B,
			']': 0xFF3D, '^': 0xFF3E, '_': 0xFF3F,'`': 0xFF40, '{': 0xFF5B, '|': 0xFF5C,
			'}': 0xFF5D, '~': 0xFF5E, '｟': 0xFF5F, '｠': 0xFF60, '￠': 0xFFE0, '￡': 0xFFE1,
			'￤': 0xFFE4, '￥': 0xFFE5, '￦': 0xFFE6, '`': 0xFF40, 'ｰ': 0xFF70, '｡': 0xFF70,
			'"': 0xFF02, '､': 0xFF64, '･': 0xFF65, '.': 0xFF0E, '￣': 0xFFE3
		}
	}

	;['p', 'on', 'q', 'qn'].forEach(t => {
		for (var i = 97; i <= 122; i++) {
			special[t][String.fromCharCode(i)] = offsets[t][0] + (i-97)
		}
	})		

	for (var i = 97; i <= 122; i++) {
		special['w'][String.fromCharCode(i)] = 0xFF41 + (i-97)
	}

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
		'cross-above': { 'short': 'ca', 'code': 0x033D },
		'plus-below': { 'short': 'pb', 'code': 0x031F },

		//diacritics supporting special chars
		'umlaut': { 'short': 'umlaut', 'code': 0x0308 },
		'caron': { 'short': 'caron', 'code': 0x030C },
		'perispomeni': { 'short': 'perispomeni', 'code': 0x0342 },
		'circumflex': { 'short': 'circumflex', 'code': 0x0302 }, 
	}

	const special_chars = {
		'ä': { 'char': 'a', 'combine': String.fromCodePoint(diacritics.umlaut.code) },
		'Ä': { 'char': 'A', 'combine': false },
		'â': { 'char': 'a', 'combine': String.fromCodePoint(diacritics.circumflex.code) },
		'Â': { 'char': 'A', 'combine': false },
		'ü': { 'char': 'u', 'combine': String.fromCodePoint(diacritics.umlaut.code) },
		'Ü': { 'char': 'U', 'combine': false },
		'č': { 'char': 'c', 'combine': String.fromCodePoint(diacritics.caron.code) },
		'Ĉ': { 'char': 'C', 'combine': false },
		'õ': { 'char': 'o', 'combine': String.fromCodePoint(diacritics.perispomeni.code) },
		'Õ': { 'char': 'O', 'combine': false },
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
					result += String.fromCodePoint(diacritics[d].code)
				}
			}
		})
		return result
	})()

	let result = ''

	for (let c of str) {
		let index
		const combine_special = (c in special_chars) ? special_chars[c].combine : false 
		if (c in special_chars) c = special_chars[c].char
		if (special[type] && special[type][c]) c = String.fromCodePoint(special[type][c])
		if (type && (index = chars.indexOf(c)) > -1) {
			result += String.fromCodePoint(index + offsets[type][0]) 
		} else if (type && (index = numbers.indexOf(c)) > -1) {
			result += String.fromCodePoint(index + offsets[type][1]) 
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


