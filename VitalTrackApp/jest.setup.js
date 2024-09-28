import React from 'react';

jest.mock('react-native-gesture-handler', () => {
  return {
    GestureHandlerRootView: props => <div {...props} />,
    Swipeable: jest.fn(),
    DrawerLayout: jest.fn(),
    State: {},
    PanGestureHandler: jest.fn(),
    TouchableOpacity: jest.fn(),
  };
});
jest.mock('@react-native-firebase/auth', () => ({
  signInWithEmailAndPassword: jest.fn(() => Promise.resolve({})),
  createUserWithEmailAndPassword: jest.fn(() => Promise.resolve({})),
  signOut: jest.fn(() => Promise.resolve({})),
}));
