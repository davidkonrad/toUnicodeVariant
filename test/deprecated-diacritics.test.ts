import {toUnicodeVariant} from "../";

// Regression guard: accented letters have no bold/italic Unicode form, so they are
// built as "base letter + combining accent". The combining accent must be the
// standard, well-supported one (U+0301 / U+0300), NOT the deprecated tone marks
// (U+0340 COMBINING GRAVE TONE MARK / U+0341 COMBINING ACUTE TONE MARK), which many
// font/shaping engines fail to place over Mathematical Alphanumeric Symbols.

const DEPRECATED = [0x0340, 0x0341, 0x0343, 0x0344];

function codepoints(str: string): number[] {
  return [...str].map((c) => c.codePointAt(0) as number);
}

test("acute-accented letter uses standard combining acute U+0301 (not U+0341)", () => {
  const out = toUnicodeVariant("é", "bold");
  const cps = codepoints(out);
  expect(cps).toContain(0x0301);
  expect(cps).not.toContain(0x0341);
});

test("grave-accented letter uses standard combining grave U+0300 (not U+0340)", () => {
  const out = toUnicodeVariant("è", "bold");
  const cps = codepoints(out);
  expect(cps).toContain(0x0300);
  expect(cps).not.toContain(0x0340);
});

test("no deprecated combining mark appears in any bold/italic accented output", () => {
  const sample =
    "áÁéÉíÍóÓúÚýÝàÀèÈìÌòÒùÙâÂêÊîÎôÔûÛäÄëËïÏöÖüÜÿãÃñÑõÕçÇžŽšŠčČćĆđĐåÅ";
  for (const variant of ["bold", "italic", "bold italic", "bold sans"] as const) {
    const out = toUnicodeVariant(sample, variant);
    const cps = codepoints(out);
    for (const dep of DEPRECATED) {
      expect(cps).not.toContain(dep);
    }
  }
});
