const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

// .mjs 파일을 지원하기 위해 확장자 추가
config.resolver.sourceExts = [...config.resolver.sourceExts, "mjs"];

module.exports = config;
