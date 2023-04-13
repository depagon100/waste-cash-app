module.exports = {
  env: {
    production: {
      plugins: ['react-native-paper/babel', 'react-native-reanimated/plugin'],
    },
  },
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@/atoms': './src/components/atoms',
          '@/components': './src/components',
          '@/constants': './src/constants',
          '@/containers': './src/containers',
          '@/molecules': './src/components/molecules',
          '@/navigations': './src/components/navigations',
          '@/organisms': './src/components/organisms',
          '@/screens': './src/components/screens',
          '@/services': './src/services',
          '@/state': './src/state',
          '@/theme': './src/theme',
          '@/utils': './src/utils',
        },
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        root: ['./src'],
      },
    ],
  ],
  presets: ['module:metro-react-native-babel-preset'],
};
