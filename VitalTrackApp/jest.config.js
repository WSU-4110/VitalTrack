module.exports = {
  preset: 'react-native',
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-native-firebase)/)',
  ],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '\\.(png|jpg|jpeg|gif|ttf|eot|svg)$': '<rootDir>/__mocks__/fileMock.js',
  },
  globals: {
    'ts-jest': {
      babelConfig: true,
    },
  },
};
