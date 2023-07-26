import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import Header from '../../components/Header/Header';
import { getTravels } from '../../services/user';
import { UserContext } from '../../contexts/UserContext/UserContext';
import { useContext } from 'react';
import Travel from './Travel';
import LoadingPanel from '../../components/common/LoadingPanel';

const Travels = () => {
  const { user } = useContext(UserContext);

  const [travels, setTravels] = useState();
  const [loading, setLoading] = useState(false);

  const handleGetTravels = async () => {
    setLoading(true);
    const { travels } = await getTravels();
    setTravels(travels);
    setLoading(false);
  };

  useEffect(() => {
    if (user?.isAuthenticated) {
      handleGetTravels();
    }
  }, [user?.isAuthenticated]);

  return (
    <Container>
      <Header />
      <Body>
        <Content>
          <Title>Mis Viajes</Title>
          <Subtitles>Encuentra tus anteriores búsquedas</Subtitles>
          {loading && <Loading />}

          {travels &&
            !loading &&
            Object.values(travels).map((travel, key) => {
              return <Travel key={key} travel={travel} />;
            })}
          {!loading && <RefreshButton onClick={handleGetTravels}>Recargar</RefreshButton>}
        </Content>
      </Body>
    </Container>
  );
};

export default Travels;

const Container = styled.div`
  height: 100%;
  width: 100%;
  background-color: #fafafb;
  font-family: Arial, Helvetica, sans-serif;
`;

const Title = styled.div`
  font-size: 28px;
  margin-top: 28px;
  width: 100%;
  max-width: 990px;
`;
const Subtitles = styled.div`
  max-width: 990px;
  margin-top: 0px;
  margin-bottom: 28px;
  width: 100%;
  font-size: 16px;
  color: #686868;
`;

const RefreshButton = styled.a`
  margin-top: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid orange;
  border-radius: 4px;
  padding: 8px;
  background-color: orange;
  font-size: 16px;
  color: white;
  font-weight: 600;
  font-family: Arial, Helvetica, sans-serif;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    background-color: #df9205;
  }
`;

const Loading = styled(LoadingPanel)`
  margin-top: 100px;
  & svg {
    width: 40px;
    height: 40px;
  }
`;

const Body = styled.div`
  padding: 16px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
`;
