import { offsets, special, Variant, variantOffsets } from "./constant";

const keyWithSmallLettersInSpecials = ["on", "q", "qn", "f", "p", "w"]

function variantKeyToVariant(variantKey: string): Variant | undefined {
  return Object.entries(variantOffsets).find(([_, key]) => key === variantKey)?.[0] as Variant | undefined;
}

function detectUnicodeVariant(charCode: number): string | undefined {
  for (const [variantKey, [letterOffset, digitOffset]] of Object.entries(offsets)) {
    if (special[variantKey] !== undefined) {
      const found = Object.values(special[variantKey]).find((value) => {
        if (value === charCode) {
          return variantKey;
        }
      })
      if (found) {
        return variantKeyToVariant(variantKey);
      }
    }
    if (keyWithSmallLettersInSpecials.includes(variantKey)) {
      if (charCode >= letterOffset && charCode <= (letterOffset + 25)) {
        return variantKeyToVariant(variantKey);
      }
    } else {
      if (charCode >= letterOffset && charCode <= (letterOffset + 51)) {
        return variantKeyToVariant(variantKey);
      }
      if (charCode >= digitOffset && charCode <= (digitOffset + 9)) {
        return variantKeyToVariant(variantKey);
      }
    }
  }

  return undefined;
}

export { detectUnicodeVariant };
