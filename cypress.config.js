const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "http://127.0.0.1:3000",
    viewportWidth: 1920,
    viewportHeight: 1080,
    defaultCommandTimeout: 4000
  },
});
