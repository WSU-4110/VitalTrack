import React, {useEffect} from 'react';
import {useAuth} from '../contexts/AuthContext';
import {useNavigation} from '@react-navigation/native';

const ProtectedRoute = ({children}) => {
  const {currentUser, loading} = useAuth();
  const navigation = useNavigation();

  useEffect(() => {
    if (!loading && !currentUser) {
      navigation.navigate('Login');
    }
  }, [currentUser, loading, navigation]);

  return children;
};

export default ProtectedRoute;
