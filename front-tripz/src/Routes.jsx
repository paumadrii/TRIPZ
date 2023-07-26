import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './views/Home/Home';
import Register from './views/Register/Register';
import Login from './views/Login/Login';
import PrivateRoute from './components/Private/PrivateRoute';
import Travels from './views/Travels/Travels';
import UserContextProvider from './contexts/UserContext/UserContext';

const RoutesComponent = () => {
  return (
    <BrowserRouter>
      <UserContextProvider token={localStorage.getItem('TOKEN')}>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route exact path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Travel" element={<PrivateRoute element={<Travels />} />} />
        </Routes>
      </UserContextProvider>
    </BrowserRouter>
  );
};

export default RoutesComponent;
