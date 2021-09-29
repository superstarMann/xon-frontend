import { useReactiveVar } from '@apollo/client';
import React from 'react';
import { isLoggedInVar } from './apollo';
import { LoggedInRouter } from './routers/logged-in-router';
import { LoggedOutRouter } from './routers/logged-out-router';

function App() {
  const IsLoggedIn = useReactiveVar(isLoggedInVar);
  return IsLoggedIn ? <LoggedInRouter/> : <LoggedOutRouter/>
}

export default App;
