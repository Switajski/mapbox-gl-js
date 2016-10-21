'use strict';

module.exports.allowsIdeographicBreaking = function(chars) {
    for (const char of chars) {
        if (!exports.charAllowsIdeographicBreaking(char.charCodeAt(0))) {
            return false;
        }
    }
    return true;
};

module.exports.charAllowsIdeographicBreaking = function(char) {
    // Return early for characters outside all ideographic ranges.
    if (char < 0x2E80) return false;

    // CJK Radicals Supplement, Kangxi Radicals, Ideographic Description Characters, CJK Symbols and Punctuation: “⺀” to “〿”
    if (char >= 0x2E80 && char <= 0x303F) return true;

    // Hiragana: before “ぁ” to “ゟ”
    if (char >= 0x3040 && char <= 0x309F) return true;

    // Katakana: “゠” to “ヿ”
    if (char >= 0x30A0 && char <= 0x30FF) return true;

    // CJK Strokes: “㇀” to past “㇣”
    if (char >= 0x31C0 && char <= 0x31EF) return true;

    // Katakana Phonetic Extensions: “ㇰ” to “ㇿ”
    if (char >= 0x31F0 && char <= 0x31FF) return true;

    // Enclosed CJK Letters and Months, CJK Compatibility: “㈀” to “㏿”
    if (char >= 0x3200 && char <= 0x33FF) return true;

    // CJK Unified Ideographs Extension A: “㐀” to past “䶵”
    if (char >= 0x3400 && char <= 0x4DBF) return true;

    // CJK Unified Ideographs: “一” to past “鿕”
    if (char >= 0x4E00 && char <= 0x9FFF) return true;

    // Yi Syllables, Yi Radicals: “ꀀ” to past “꓆”
    if (char >= 0xA000 && char <= 0xA4CF) return true;

    // CJK Compatibility Forms: “︰” to “﹏”
    if (char >= 0xFE30 && char <= 0xFE4F) return true;

    // CJK Compatibility Ideographs: “豈” to past “龎”
    if (char >= 0xF900 && char <= 0xFAFF) return true;

    // Halfwidth and Fullwidth Forms: before “！” to past “￮”
    if (char >= 0xFF00 && char <= 0xFFEF) return true;

    return false;
};

const isVerticalWritingModeRegExp = new RegExp([
    '[\u1100-\u11FF]',
    '[\uAC00-\uD7A3]',
    '[\u3131-\u318E]',
    '[\u4E00-\u9FCC]',
    '[\u3400-\u4DB5]',
    '[\u3000-\u303F]',
    '[\uFF01-\uFFEE]',
    '[\u3041-\u309F]',
    '[\u30A0-\u30FF]',
    '[\u31F0-\u31FF]',
    '[\uA000-\uA4C6]',
    '[\u1800-\u18AA]',
    '\uD840[\uDC00-\uFFFF]',
    '[\uD841-\uD872]',
    '\uD873[\u0000-\uDEAF]'
].join('|'));

module.exports.allowsVerticalWritingMode = function(input) {
    return input.search(isVerticalWritingModeRegExp) !== -1;
};
