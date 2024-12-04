import {toUnicodeVariant} from "./toUnicodeVariant";
export {detectUnicodeVariant} from "./detectUnicodeVariant";
export {Variant, VariantKey, diacritics, offsets, special, special_chars, variantOffsets} from './constant';

// Deprecation warning for backward compatibility
export const string_to_unicode_variant = (...args: Parameters<typeof toUnicodeVariant>) => {
  console.warn(
    "⚠️ `string_to_unicode_variant` is deprecated and will be removed in a future release. Use `toUnicodeVariant` instead."
  );
  return toUnicodeVariant(...args);
};
export { toUnicodeVariant };
