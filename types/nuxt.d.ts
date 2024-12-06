declare module "@nuxt/schema" {
  interface NuxtConfig {
    ui?: {
      global?: boolean;
      icons?: string[];
    };
    colorMode?: {
      preference?: string;
    };
    googleFonts?: {
      families: Record<string, number[]>;
    };
  }
}

export {};
