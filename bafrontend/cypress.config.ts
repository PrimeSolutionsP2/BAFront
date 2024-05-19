import { defineConfig } from 'cypress'
 
export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {},
  },component: {
    supportFile: false,
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
  },
}

)