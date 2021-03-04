import React  from 'react';
import { AuthState } from '../redux/reducers/authReducer';

export const AuthContext = React.createContext<AuthState>({
    isLoggedIn: false
})