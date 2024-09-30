// jest.setup.js

import 'react-native-gesture-handler/jestSetup';

jest.mock('@react-native-firebase/auth', () => ({
  signInWithEmailAndPassword: jest.fn(() =>
    Promise.resolve({user: {uid: '12345'}}),
  ),
  createUserWithEmailAndPassword: jest.fn(() =>
    Promise.resolve({user: {uid: '12345'}}),
  ),
  signOut: jest.fn(() => Promise.resolve()),
  onAuthStateChanged: jest.fn(() => Promise.resolve({user: {uid: '12345'}})),
  currentUser: {uid: '12345'},
}));
