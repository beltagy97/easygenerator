import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { checker } from 'vite-plugin-checker';


const REQUIRED_ENV_VARIABLES = ['VITE_BACKEND_URL', 'VITE_ENV'];

// this function purpose is to make runtime checking on the required env variables and make sure they are defined
// and then strip VITE_ from them so later I can attach them to the global namespace as defined in global.d.ts inside the src folder
const loadEnvCheck = (environmentVariable: Record<string, string>): Record<string, string> => {
  const env: Record<string, string> = {};
  
  for (const key of REQUIRED_ENV_VARIABLES) {

    if (!environmentVariable[key]) {
      throw new Error(`Missing environment variable ${key}`);
    }

    const nameWithoutVITE = key.replace('VITE_', '');
    env[nameWithoutVITE] = JSON.stringify(environmentVariable[key]);
  }
  return env;
}

// https://vitejs.dev/config/

export default defineConfig(({ mode }) => {
  // Load environment variables based on the current mode (development or production)
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [react(),
    checker({ typescript: true })
    ],
    server: { port: 5175, open: true, host: 'localhost' },
    define: loadEnvCheck(env),
  }
});
