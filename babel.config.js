module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"], // Expo 프로젝트 기본 설정
    plugins: [
      // 필요한 Babel 플러그인 추가
      ["@babel/plugin-transform-modules-commonjs"],
    ],
  };
};
