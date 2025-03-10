import { defineConfig } from "@ladle/react";

export default defineConfig({
  stories: ["../stories/**/*.stories.@(tsx|jsx|js|ts)"],
  addons: {
    controls: true,
    actions: true,
    backgrounds: true,
    viewport: true,
  },
  theme: {
    darkMode: "class",
  },
  globals: {
    theme: {
      defaultValue: "light",
      toolbar: {
        icon: "circlehollow",
        items: ["light", "dark"],
        showName: true,
      },
    },
  },
});
