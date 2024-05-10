import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'http://localhost:8080/graphql',
  // watch: true, // This doesn't seem to work.
  // Because I'm using bun --watch to run the app. When a change is detected, bun restarts the entire app and makes the graphql server temporarily unavailable, which results in type generation failure. Can't find a way to delay regeneration to avoid this.
  // watch: 'src/**/*.ts',
  // hooks: {
  //   onWatchTriggered: async () => {
  //     console.log('---------onWatchTriggered');
  //     await new Promise((resolve) => setTimeout(resolve, 3000));
  //     console.log('---------onWatchTriggered done');
  //   },
  // },
  emitLegacyCommonJSImports: false,
  generates: {
    'src/generated/graphql.ts': {
      plugins: ['typescript', 'typescript-resolvers'],
      config: {
        skipTypename: true,
        contextType: '../resolvers/index.js#ResolverContext',
        scalars: {
          DateTime: 'Date',
        },
      },
    },
  },
};

export default config;
