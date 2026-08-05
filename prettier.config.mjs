/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
const config = {
  tabWidth: 2,
  semi: false,
  singleQuote: true,
  trailingComma: 'all',
  plugins: ['prettier-plugin-tailwindcss'],
  tailwindFunctions: ['cn', 'clsx', 'twMerge', 'twJoin'],
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.js', '*.jsx', '*.mjs', '*.cjs'],
      options: {
        plugins: [
          '@ianvs/prettier-plugin-sort-imports',
          'prettier-plugin-tailwindcss',
        ],
        importOrder: [
          '^(react/(.*)$)|^(react$)',
          '^(next/(.*)$)|^(next$)',
          '<THIRD_PARTY_MODULES>',
          '',
          '^types$',
          '^@/(.*)$',
          '^[./]',
        ],
        importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
      },
    },
  ],
}

export default config
