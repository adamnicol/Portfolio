/* eslint-disable */
const { TsconfigPathsPlugin } = require("tsconfig-paths-webpack-plugin");
const { pathsToModuleNameMapper } = require("ts-jest");
const { compilerOptions } = require("./tsconfig.json");
const { jest } = require("./package.json");

// Overrides config files from create-react-app.
module.exports = {
  webpack: function (config) {
    config.resolve = {
      ...config.resolve,
      // Use path aliases from tsconfig when making a build.
      plugins: [new TsconfigPathsPlugin()],
    };
    return config;
  },

  jest: function (config) {
    return {
      ...config,
      ...jest,
      moduleNameMapper: {
        // Use path aliases from tsconfig when running tests.
        ...pathsToModuleNameMapper(compilerOptions.paths),
        ...jest.moduleNameMapper,
      },
      modulePaths: ["<rootDir>/src"],
    };
  },
};
