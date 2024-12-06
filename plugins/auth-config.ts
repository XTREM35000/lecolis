// plugins/auth-config.ts

import { defineNuxtPlugin, useRuntimeConfig } from "#app";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  // Fournir la configuration sous un autre nom
  nuxtApp.provide("authConfig", config); // Nous l'appelons 'authConfig' au lieu de '$config'
});
