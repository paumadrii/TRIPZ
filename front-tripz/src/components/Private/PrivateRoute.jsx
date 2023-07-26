import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext/UserContext';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element }) => {
  const { user } = useContext(UserContext);

  return (
    <>
      {user?.isAuthenticated && element}
      {!user?.isAuthenticated && <Navigate to="/login" replace={true} />}
    </>
  );
};

export default PrivateRoute;
