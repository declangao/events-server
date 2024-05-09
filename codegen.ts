import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'http://localhost:8080/graphql',
  emitLegacyCommonJSImports: false,
  generates: {
    'src/generated/graphql.ts': {
      plugins: ['typescript', 'typescript-resolvers'],
      config: {
        skipTypename: true,
        contextType: '../resolvers/index#ResolverContext',
      },
    },
  },
};

export default config;
