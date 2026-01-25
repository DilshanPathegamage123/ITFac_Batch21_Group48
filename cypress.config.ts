import { defineConfig } from "cypress";
import createBundler from "@bahmutov/cypress-esbuild-preprocessor";
import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";

export default defineConfig({
  e2e: {
    specPattern: "**/*.feature",
    supportFile: "cypress/support/e2e.ts",
    async setupNodeEvents(on, config) {
      await addCucumberPreprocessorPlugin(on, config);

      on(
        "file:preprocessor",
        createBundler({
          tsconfig: "tsconfig.json",
        })
      );

      return config;
    },
    baseUrl: "http://localhost:8080",
    viewportWidth: 1280,
    viewportHeight: 720,
  },
});
