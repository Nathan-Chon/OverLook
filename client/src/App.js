import RequestForm from "./pages/RequestForm";
import NavBar from "./components/NavBar";
// import jwtDecode from 'jwt-decode';
import { Route, Routes } from 'react-router-dom';
// import AppContext from './components/AppContext';
import './App.css'
// import { useEffect, useState } from 'react';
import Home from './pages/HomePage';

// const tokenKey = 'react-context-jwt';

function App() {

  // const [user, setUser] = useState();
  // const [isAuthorizing, setIsAuthorizing] = useState(true);

  // useEffect(() => {
  //   const token = localStorage.getItem(tokenKey);
  //   const user = token ? jwtDecode(token) : null;
  //   setUser(user);
  //   setIsAuthorizing(false);
  // }, []);

  // if (isAuthorizing) return null;

  // function handleSignIn(result) {
  //   const { user, token } = result;
  //   localStorage.setItem(tokenKey, token);
  //   setUser(user);
  // }

  // function handleSignOut() {
  //   localStorage.removeItem(tokenKey);
  //   setUser(undefined);
  // }
  // const contextValue = { user, handleSignIn, handleSignOut };
  return (
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route index element={<Home />} />
          <Route path="request" element={<RequestForm/>} />
        </Route>
      </Routes>
  );
}

export default App;
