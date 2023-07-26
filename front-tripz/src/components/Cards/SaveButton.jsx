import { useState } from 'react';
import styled from 'styled-components';
import { saveCard } from '../../services/user';
import LoadingPanel from '../common/LoadingPanel';

const SaveButton = ({ card, oA, dA, dateOut, dateIn }) => {
  const [saved, setSaved] = useState(false);

  const [loading, setLoading] = useState(false);
  const handleSaveCard = async (card) => {
    setLoading(true);
    const payload = {
      card,
      oA,
      dA,
      dateOut,
      dateIn
    };
    await saveCard(payload);
    setSaved(true);
    setLoading(false);
  };

  return (
    <Container>
      {!loading && (
        <>
          {!saved && <SaveButtonTravel onClick={() => handleSaveCard(card)}>Guardar</SaveButtonTravel>}
          {saved && <SavedButtonTravel>¡Guardado!</SavedButtonTravel>}
        </>
      )}
      {loading && <Loading />}
    </Container>
  );
};

export default SaveButton;

const Container = styled.div``;

const SaveButtonTravel = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid orange;
  border-radius: 4px;
  padding: 8px;
  font-size: 16px;
  color: orange;
  font-weight: 600;
  font-family: Arial, Helvetica, sans-serif;
  text-decoration: none;
  margin-right: 8px;
  cursor: pointer;
  &:hover {
    background-color: orange;
    color: #fff;
  }
`;

const SavedButtonTravel = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #19b8c1;
  border-radius: 4px;
  padding: 8px;
  font-size: 16px;
  background-color: #19b8c1;
  font-weight: 600;
  font-family: Arial, Helvetica, sans-serif;
  text-decoration: none;
  margin-right: 8px;
  pointer-events: none;
  color: #fff;
`;

const Loading = styled(LoadingPanel)`
  width: 88.25px;
`;
