module.exports = api => {
  api.cache(true)

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {
            esmodules: true,
          },
        },
      ],
    ],
    ignore: [/[/\\]core-js/, /@babel[/\\]runtime/],
    plugins: [
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-proposal-async-generator-functions',
      '@babel/plugin-transform-runtime',
      '@babel/plugin-transform-modules-commonjs',
      // This allows us to use the dynamic alias for modules and still let jest and such work
      [
        'babel-plugin-module-resolver',
        {
          root: ['./src'],
        },
      ],
    ],
  }
}
