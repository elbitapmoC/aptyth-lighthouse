import { defineConfig } from "@ladle/react";

const config = defineConfig({
  stories: "./components/**/*.stories.@(js|jsx|ts|tsx)",
  defaultTheme: "light",
  themes: {
    light: {
      name: "Light",
      class: "",
    },
    dark: {
      name: "Dark",
      class: "dark",
    },
  },
  addons: {
    controls: true,
    actions: true,
    a11y: true,
  },
  viteConfig: {
    resolve: {
      alias: {
        "@/components": "/frontend/components",
        "@/lib": "/frontend/lib",
        "@/hooks": "/frontend/hooks",
        "@/utils": "/frontend/lib/utils",
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/app/globals.css";`,
        },
      },
    },
  },
});

export default config;
