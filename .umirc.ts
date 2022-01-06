import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  devtool:'eval',
  routes: [
    { path: '/', component: '@/pages/index' },
  ],
  fastRefresh: {},
});
