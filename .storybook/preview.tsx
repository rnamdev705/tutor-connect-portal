import type { Preview } from "@storybook/nextjs-vite";
import "@fontsource-variable/material-symbols-outlined/index.css";
import "../src/app/globals.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
