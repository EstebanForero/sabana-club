import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import tailwindcss from '@tailwindcss/vite'

import tsconfigPaths from "vite-tsconfig-paths";

// import basicSsl from '@vitejs/plugin-basic-ssl';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [TanStackRouterVite({}), react(), tailwindcss()],
})
