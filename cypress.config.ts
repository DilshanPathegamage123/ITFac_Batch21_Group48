import { defineConfig } from "cypress";
import createBundler from "@bahmutov/cypress-esbuild-preprocessor";
import {
  addCucumberPreprocessorPlugin,
} from "@badeball/cypress-cucumber-preprocessor";
import createEsbuildPlugin from "@badeball/cypress-cucumber-preprocessor/esbuild";
const mysql = require('mysql2');

export default defineConfig({
  e2e: {
    specPattern: "cypress/e2e/**/*.feature",
    supportFile: "cypress/support/e2e.ts",
    env: {
      stepDefinitions: 'cypress/e2e/**/*/*.steps.ts',
    },

    async setupNodeEvents(on, config) {
      await addCucumberPreprocessorPlugin(on, config);

      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin(config)],
          tsconfig: "tsconfig.json",
        })
      );

      on('task', {
        queryDb: (query) => {
          const connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'Malinga2001',
            database: 'qa_training',
          });

          return new Promise((resolve, reject) => {
            // Force a connection check
            connection.connect((err : any) => {
              if (err) {
                console.error('DB Connection Failed:', err.message);
                return reject(err);
              }
              console.log('Database Connected Successfully!');
            });

            connection.query(query, (error : any, results : any) => {
              if (error) reject(error);
              else {
                connection.end();
                resolve(results);
              }
            });
          });
        },
      });

      return config;
    },
    baseUrl: "http://localhost:8080",
    viewportWidth: 1280,
    viewportHeight: 720,
  },
});
