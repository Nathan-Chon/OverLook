import RequestForm from "./pages/RequestForm";
import NavBar from "./components/NavBar";
// import jwtDecode from 'jwt-decode';
import { Route, Routes } from 'react-router-dom';
// import AppContext from './components/AppContext';
import './App.css'
// import { useEffect, useState } from 'react';
import Home from './pages/HomePage';
import RequestPage from "./pages/RequestPage";
// const tokenKey = 'react-context-jwt';
import RequestEdit from "./pages/RequestEdit";
import DataViewPage from "./pages/DataViewPage";
import DataRequestInfo from "./pages/DataRequestInfo";

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
          <Route path="edit" element={<RequestPage/>}/>
          <Route path="edit/requestEdit/:requestId" element={<RequestEdit />} />
          <Route path="dataView" element={<DataViewPage />} />
          <Route path="dataView/dataRequest/:requestId" element={<DataRequestInfo />} />
        </Route>
      </Routes>
  );
}

export default App;
