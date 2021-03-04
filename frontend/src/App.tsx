import React from 'react';
import { useSelector } from 'react-redux';
import { useRoutes } from 'react-router';
import { AuthState } from './redux/reducers/authReducer';
import { State } from './redux/rootReducer';
import { Routes } from './Routes';

const App: React.FC = () => {

  const { isLoggedIn } = useSelector<State, AuthState>(state => state.auth)

  const routes = useRoutes(Routes({isLoggedIn}))

  return <>
    {routes} 
  </>
}

export default App;
