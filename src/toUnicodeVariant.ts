/**
 * (c) David Konrad 2018-
 * MIT License
 *
 * Javascript function to convert plain text to unicode variants
 *
 * For more inspiration see http://unicode.org/charts/
 *
 * Contributors
 *
 * @anhdung98 https://github.com/anhdung98
 * @degola https://github.com/degola
 *
 */

import { diacritics, offsets, special, special_chars, variantOffsets } from "./constant"

export function toUnicodeVariant(str: string, variant: string, combinings?: string) {
	const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
	const numbers = '0123456789'

	const type = (function() {
		if (variantOffsets[variant]) return variantOffsets[variant]
		if (offsets[variant]) return variant
		return 'm' //monospace as default
	})()

	const combine_with = (function() {
		let array: string[] | null  = null
		if (Array.isArray(combinings)) array = combinings
		if (typeof combinings === 'string') array = combinings.split(',')
		if (!array) return false
		let result = ''
		array.forEach(function(diacritic) {
			diacritic = diacritic.trim().toLowerCase()
			for (const d in diacritics) {
				if (diacritic === d || diacritic === diacritics[d].short) {
					result += String.fromCodePoint(diacritics[d].code) //+ String.fromCodePoint(diacritics.CGJ.code) seem not to have any effect
				}
			}
		})
		return result
	})()

	//if entire sequence is supported
	if (typeof str === 'string' && special[type] && (special[type][str] || special[type][str.toLowerCase()])) {
		return special[type][str] ? String.fromCodePoint(special[type][str]) : String.fromCodePoint(special[type][str.toLowerCase()])
	}

	//support for romanization
	if (['roman', 'r'].includes(type)) {
		if (typeof str === 'number') {
			//-- based on https://blog.stevenlevithan.com/archives/javascript-roman-numeral-converter
			const parts = {
				M: 1000, CM: 900, D: 500, CD: 400, C: 100, XC: 90, L: 50, XL: 40, X: 10, IX: 9,	V: 5, IV: 4, I: 1
			}
			let roman = ''
			let num: number = str
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
		for (const number of romans) {
			if (result.indexOf(number.toString()) > -1) {
				result = result.replaceAll(number, String.fromCodePoint(special[type][number]))
			}
		}
		return result
	}

	let result = ''

	for (let c of str) {
		let index: number;
		const combine_special = (c in special_chars) ? special_chars[c].combine : false
		c = combine_special ? special_chars[c].char : c.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
		if (special[type] && special[type][c]) c = String.fromCodePoint(special[type][c])
		if (type && (index = chars.indexOf(c)) > -1) {
			result += String.fromCodePoint(index + offsets[type][0])
		} else if (type && (index = numbers.indexOf(c)) > -1) {
			result += String.fromCodePoint(index + offsets[type][1])
		} else {
			result += c
		}
		if (combine_special) result += combine_special
		if (combine_with) result += combine_with
	}

	return result
}
