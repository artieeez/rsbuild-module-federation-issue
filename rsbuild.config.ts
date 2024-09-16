import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { ModuleFederationPlugin } from '@module-federation/enhanced/rspack';

export default defineConfig({
  plugins: [pluginReact()],
  server: {
    port: 3000,
  },
  dev: {
    // It is necessary to configure assetPrefix, and in the production environment, you need to configure output.assetPrefix
    assetPrefix: true,
  },
  tools: {
    rspack: {
      output: {
        // You need to set a unique value that is not equal to other applications
        uniqueName: 'federation_provider'
      },
      plugins: [
        new ModuleFederationPlugin({
          name: 'federation_provider',
          exposes: {
            './foo': './src/components/foo.tsx',
            './bar': './src/components/bar.component.tsx',
          },
          shared: ['react', 'react-dom'],
        }),
      ],
    },
  },
});