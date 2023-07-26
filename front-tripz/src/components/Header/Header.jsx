import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext/UserContext';
import { useContext, useState, useRef } from 'react';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import useClickOutSide from '../../hooks/useClickOutSide';

const Header = () => {
  const ref = useRef();

  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [showLogout, setShowLogout] = useState(false);

  useClickOutSide(ref, () => setShowLogout(false));

  const handleRegister = () => {
    navigate('/register');
  };

  const handleLogin = () => {
    navigate('/login');
  };
  const handleHome = () => {
    navigate('/home');
  };
  const handleTravels = () => {
    navigate('/travel');
  };

  const handleLogout = () => {
    localStorage.removeItem('TOKEN');
    setUser(null);
    handleHome();
  };

  return (
    <Container>
      <Title>TRIPZ</Title>
      {user?.isAuthenticated && (
        <LeftContainer>
          <SearchTravel onClick={handleHome}>Buscar Viaje</SearchTravel>
          <UserTravels onClick={handleTravels}>Mis Viajes</UserTravels>
        </LeftContainer>
      )}
      <RigthContainer>
        {!user?.isAuthenticated && (
          <>
            <Register onClick={handleRegister}>Registrarse</Register>
            <Login onClick={handleLogin}>Iniciar sesión</Login>
          </>
        )}
        {user?.isAuthenticated && (
          <Profile ref={ref}>
            <ProfileButton onClick={() => setShowLogout(true)}>
              Mi perfíl <AccountBoxIcon />
            </ProfileButton>
            {showLogout && (
              <ProfilePopUp>
                <LogOut onClick={handleLogout}>Cerrar sesion</LogOut>
              </ProfilePopUp>
            )}
          </Profile>
        )}
      </RigthContainer>
    </Container>
  );
};

export default Header;

const Container = styled.div`
  border-bottom: 1px solid rgba(232, 233, 235, 0.9);
  min-height: 56px;
  width: 100%;
  display: flex;
  align-items: center;
  background-color: rgb(254, 254, 254);
  padding: 0px 16px;
  @media (max-width: 600px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-bottom: 16px;
  }
`;
const LeftContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  padding-left: 16px;
  flex: 1;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 16px;
  color: #363636;
  @media (max-width: 600px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-left: 0px;
  }
`;
const RigthContainer = styled.div`
  display: flex;
  justify-content: right;
  align-items: center;
  flex: 1;
  @media (max-width: 600px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-left: 0px;
  }
`;
const Register = styled.div`
  border-bottom: 2px solid rgba(220, 220, 220, 0.986);
  border-radius: 6px;
  width: 150px;
  height: 100%;
  margin-right: 16px;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 16px;
  align-items: center;
  display: flex;
  color: #363636;
  justify-content: center;
  padding: 8px;
  cursor: pointer;
  &:hover {
    background-color: orange;
    color: white;
  }
`;
const Login = styled.div`
  cursor: pointer;
  border-bottom: 2px solid rgba(220, 220, 220, 0.986);
  border-radius: 6px;
  width: 150px;
  height: 100%;
  margin-right: 16px;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 16px;
  align-items: center;
  display: flex;
  color: #363636;
  justify-content: center;
  padding: 8px;
  &:hover {
    background-color: orange;
    color: white;
  }
`;
const ProfileButton = styled.div`
  border: 1px solid rgba(220, 220, 220, 0.986);
  border-radius: 6px;
  width: 150px;
  height: 100%;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 16px;
  align-items: center;
  display: flex;
  color: #363636;
  justify-content: space-between;
  padding: 8px;
  cursor: pointer;

  &:hover {
    background-color: orange;
    color: white;
  }
`;
const Title = styled.h1`
  font-family: Arial, Helvetica, sans-serif;
  font-size: 24px;
  background-color: orange;
  color: white;
  font-weight: 200;
  padding: 8px;
  border-radius: 6px;
  margin-left: 16px;
  margin-right: 16px;
`;

const SearchTravel = styled.div`
  padding: 8px;
  cursor: pointer;
  margin: 0px 4px;
  &:hover {
    text-shadow: 3px 3px 2px rgba(176, 176, 176, 1), 19px -7px 23px rgba(145, 145, 145, 1);
  }
`;
const UserTravels = styled.div`
  padding: 8px;
  margin: 0px 4px;

  cursor: pointer;
  &:hover {
    text-shadow: 3px 3px 2px rgba(176, 176, 176, 1), 19px -7px 23px rgba(145, 145, 145, 1);
  }
`;

const Profile = styled.div`
  position: relative;
  margin-right: 16px;
  @media (max-width: 600px) {
    margin-right: 0px;
  }
`;

const ProfilePopUp = styled.div`
  position: absolute;
  right: 0px;
  top: 100%;
  border: 1px solid rgb(218, 220, 224);
  background-color: #fff;
  padding: 4px 0px;
  width: 150px;
  border-radius: 6px;
  margin-top: 4px;
`;

const LogOut = styled.div`
  padding: 6px 16px;
  &:hover {
    background-color: #ebe9e9;
    cursor: pointer;
  }
`;
