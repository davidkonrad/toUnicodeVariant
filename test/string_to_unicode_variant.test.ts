import {string_to_unicode_variant} from "../";

test("test basic functionality", () => {
  const testString = "test";
  const expectedTestString = "𝐭𝐞𝐬𝐭";
  const updatedString = string_to_unicode_variant(testString, "bold");
  expect(updatedString).toBe(expectedTestString);
});

test("test accented characters functionality", () => {
  const testString =
    "áÁéÉíÍóÓúÚýÝàÀèÈìÌòÒùÙâÂêÊîÎôÔûÛäÄëËïÏöÖüÜÿãÃñÑõÕçÇæÆœŒžŽšŠčČćĆđĐåÅøØðÐ";
  const expectedTestString =
    "𝐚́𝐀𝐞́𝐄𝐢́𝐈𝐨́𝐎𝐮́𝐔𝐲́𝐘𝐚̀𝐀𝐞̀𝐄𝐢̀𝐈𝐨̀𝐎𝐮̀𝐔𝐚̂𝐀𝐞̂𝐄𝐢̂𝐈𝐨̂𝐎𝐮̂𝐔𝐚̈𝐀𝐞̈𝐄𝐢𝐈𝐨̈𝐎𝐮̈𝐔𝐲𝐚̃𝐀𝐧𝐍𝐨̃𝐎𝐜̧𝐂æÆœŒ𝐳𝐙𝐬̌𝐒𝐜̌𝐂𝐜́𝐂𝐝̄Đ𝐚̊𝐀𝐨̷ØðÐ";

  const updatedString = string_to_unicode_variant(testString, "bold");
  expect(updatedString).toBe(expectedTestString);
});
