import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import Components from "unplugin-vue-components/vite";
import dotenv from "dotenv";

dotenv.config();


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(), Components({})],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  base: '/client/',
  server:{
    port: 8080,
  }
});


