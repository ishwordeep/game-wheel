import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  optimizeDeps: {
    include: ["@phosphor-icons/react", "react-datepicker", "@chakra-ui/react"],
  },
  server: {
    open: true,
    port: 5002,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
