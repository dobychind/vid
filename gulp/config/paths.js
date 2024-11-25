const srcFolder = './src';
const buildFolder = './app';

export const paths = {
  base: {
    src: srcFolder,
    build: buildFolder,
  },
  srcSvg: `${srcFolder}/vid/img/svg/**.svg`,
  srcImgFolder: `${srcFolder}/vid/img`,
  buildImgFolder: `${buildFolder}/vid/img`,
  srcScss: `${srcFolder}/scss/**/*.scss`,
  buildCssFolder: `${buildFolder}/css`,
  srcFullJs: `${srcFolder}/js/**/*.js`,
  srcMainJs: `${srcFolder}/js/main.js`,
  buildJsFolder: `${buildFolder}/js`,
  srcPartialsFolder: `${srcFolder}/partials`,
  resourcesFolder: `${srcFolder}/resources`,
};
