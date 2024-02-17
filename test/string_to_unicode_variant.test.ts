import {string_to_unicode_variant} from '../'

test('test basic functionality', () => {
    const testString = "test"
    const expectedTestString = "𝐭𝐞𝐬𝐭"
    const updatedString = string_to_unicode_variant(testString, "bold")
    expect(updatedString).toBe(expectedTestString)
});