import { detectUnicodeVariant } from "../src/detectUnicodeVariant";
import { toUnicodeVariant } from "../src/toUnicodeVariant";
import { Variant } from "../src/constant";

describe("detectUnicodeVariant", () => {
  it("should correctly detect all texts variants", () => {
    const testString = "Hello";
    const variant: Variant[] = [
      "monospace",
      "bold",
      "italic",
      "bold italic",
      "script",
      "bold script",
      "gothic",
      "gothic bold",
      "doublestruck",
      "sans",
      "bold sans",
      "italic sans",
      "bold italic sans",
      "parenthesis",
      "circled",
      "circled negative",
      "squared",
      "squared negative",
      "fullwidth",
    ];
    variant.forEach((variantName) => {
      const unicodeString = toUnicodeVariant(testString, variantName as any);
      const detectedVariant = detectUnicodeVariant(unicodeString);
      expect(detectedVariant).toBe(variantName);
    });
  });

  it("should correctly detect all number variants", () => {
    const testString = "1234";
    const variant: Variant[] = [
      "numbers dot",
      "numbers comma",
      "numbers double circled",
    ];
    variant.forEach((variantName) => {
      const unicodeString = toUnicodeVariant(testString, variantName as any);
      const detectedVariant = detectUnicodeVariant(unicodeString);
      expect(detectedVariant).toBe(variantName);
    });
  });

  it("should return undefined for plain text", () => {
    const plainText = "Hello";
    const detectedVariant = detectUnicodeVariant(plainText);
    expect(detectedVariant).toBeUndefined();
  });

  it("should return undefined for an empty string", () => {
    const emptyText = "";
    const detectedVariant = detectUnicodeVariant(emptyText);
    expect(detectedVariant).toBeUndefined();
  });
});
