import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  compatibilityDate: "2024-12-06",
  modules: [
    "@nuxt/ui",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
    "@pinia/nuxt",
    "@nuxtjs/google-fonts",
  ],
  plugins: ["~/plugins/auth-config.ts"],
  ui: {
    global: true,
  },
  colorMode: {
    preference: "light",
  },
  googleFonts: {
    families: {
      Inter: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    },
  },
  devtools: {
    enabled: false,
  },
  typescript: {
    strict: true,
  },
  runtimeConfig: {
    mongodbUri: process.env.MONGODB_URI,
    jwtSecret: process.env.JWT_SECRET,
    public: {
      dhlApiKey: process.env.DHL_API_KEY,
    },
  },
});
