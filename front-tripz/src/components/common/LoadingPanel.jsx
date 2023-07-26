import Loading from '../../assets/svgs/Loading';
import styled from 'styled-components';

const LoadingPanel = ({ className }) => {
  return (
    <Container className={className}>
      <Loading />
    </Container>
  );
};

export default LoadingPanel;

const Container = styled.div`
  display: flex;
  justify-content: center;
`;
