/** @type {import('next-i18next').UserConfig} */
const config = {
    i18n: {
      defaultLocale: "en",
      locales: ["en", "hi", "mr"],
    },
    reloadOnPrerender: process.env.NODE_ENV === "development"
  };
  
  module.exports = config;
  