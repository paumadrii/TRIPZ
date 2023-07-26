import { createContext, useEffect, useState } from 'react';
import User from '../../models/User/User';
import { setToken } from '../../services/services';

export const UserContext = createContext({
  user: null,
  setUser: () => null
});

const UserContextProvider = ({ children, token }) => {
  const [user, setUser] = useState(new User({ token }));

  useEffect(() => {
    const token = localStorage.getItem('TOKEN');
    setToken(token);
  }, [localStorage.getItem('TOKEN')]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
